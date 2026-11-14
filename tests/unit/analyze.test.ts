import { describe, expect, it } from "vitest";
import { analyze, yearsFromDateRanges } from "@/lib/analyze";
import { getRole } from "@/lib/roles";
import { getRole as getLocalizedRole } from "@/lib/i18n/content";
import { CHEF_CV, FRONTEND_CV, FRONTEND_JOB, RECRUITER_CV, RECRUITER_JOB, SALES_CV, SALES_JOB } from "./fixtures";

describe("match score calibration", () => {
  it("scores a strong match in the 75–95 band", () => {
    const { score } = analyze(FRONTEND_CV, FRONTEND_JOB);
    expect(score).toBeGreaterThanOrEqual(75);
    expect(score).toBeLessThanOrEqual(95);
  });

  it("scores an unrelated CV at the floor", () => {
    expect(analyze(CHEF_CV, FRONTEND_JOB).score).toBeLessThanOrEqual(15);
    expect(analyze(CHEF_CV, SALES_JOB).score).toBeLessThanOrEqual(15);
  });

  it("separates a fitting business CV from a tech CV", () => {
    const fit = analyze(SALES_CV, SALES_JOB).score;
    const tech = analyze(FRONTEND_CV, SALES_JOB).score;
    expect(fit).toBeGreaterThanOrEqual(55);
    expect(tech).toBeLessThanOrEqual(20);
  });

  it("scores a fitting recruiter CV well above an unrelated one", () => {
    const fit = analyze(RECRUITER_CV, RECRUITER_JOB);
    expect(fit.matched).toContain("Recruiting / HR Tools");
    expect(fit.score).toBeGreaterThanOrEqual(50);
    expect(analyze(FRONTEND_CV, RECRUITER_JOB).score).toBeLessThanOrEqual(20);
  });

  it("always stays inside 5–95", () => {
    for (const [cv, job] of [["", FRONTEND_JOB], ["React", "React"], [FRONTEND_CV, "x"]]) {
      const { score } = analyze(cv, job);
      expect(score).toBeGreaterThanOrEqual(5);
      expect(score).toBeLessThanOrEqual(95);
    }
  });

  it("dampens a bare keyword list", () => {
    const list = "React TypeScript Next.js Tailwind GraphQL Jest Cypress Git CI/CD Agile";
    expect(analyze(list, FRONTEND_JOB).score).toBeLessThan(40);
  });

  it("rejects oversized input", () => {
    expect(() => analyze("a".repeat(200_001), FRONTEND_JOB)).toThrow();
  });
});

describe("missing-skill priorities", () => {
  it("never marks a skill the job does not mention as high priority", () => {
    const { missing } = analyze(CHEF_CV, FRONTEND_JOB);
    expect(missing.filter((m) => m.priority === "high" && m.freq === 0)).toHaveLength(0);
  });

  it("sorts high before medium before low", () => {
    const rank = { high: 0, medium: 1, low: 2 } as const;
    const { missing } = analyze(CHEF_CV, FRONTEND_JOB);
    const ranks = missing.map((m) => rank[m.priority]);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });
});

describe("generic words do not count as skills", () => {
  const blankCv = "x ".repeat(80);
  const cases: [string, string][] = [
    ["the rest of the team", "REST API"],
    ["own the sales pipeline", "CI/CD"],
    ["browser caching", "Redis"],
    ["airport terminal operations", "Linux / Bash"],
    ["fine tuning your pitch", "AI / LLM"],
    ["we build dashboards in React", "BI / Dashboards (Tableau, Power BI)"],
    ["a typical workday in our team", "Recruiting / HR Tools"],
    ["cut greenhouse gas emissions", "Recruiting / HR Tools"],
    ["pricing is a key lever for growth", "Recruiting / HR Tools"],
  ];
  for (const [phrase, label] of cases) {
    it(`"${phrase}" is not ${label}`, () => {
      const job = `Some Role\n${phrase}. 3+ years of experience.`;
      const r = analyze(blankCv, job);
      expect([...r.matched, ...r.missing.map((m) => m.label)]).not.toContain(label);
    });
  }
});

describe("years of experience from CV dates", () => {
  const NOW = new Date(2026, 10, 11);
  const cases: [string, number][] = [
    ["Mar 2018 – Jan 2022", 3.9],
    ["03/2018 - 01/2022", 3.9],
    ["Developer 2019 – present\nJunior Developer Jun 2017 - Dec 2018", 9.5],
    ["maart 2020 – heden", 6.8],
    ["Working at Y since 2021", 5.4],
    ["BSc Computer Science, 2014 – 2018\nDeveloper, 2018 – 2020", 2],
    ["Dev 2005 - 2010\nCareer break\nDev 2020 - present", 11.4],
    ["Dev 2019 - 2024\nFreelance 2020 - 2022", 5],
    ["Phone: 06-12345678, born 1992", 0],
    ["Employment 2030 – 2031", 0],
  ];
  for (const [text, expected] of cases) {
    it(`${text.replace(/\n/g, " / ")} → ${expected}`, () => {
      expect(yearsFromDateRanges(text, NOW)).toBe(expected);
    });
  }
});

import { stripBoilerplate } from "@/lib/analyze";

describe("boilerplate sections in job posts", () => {
  const BOILER = `
About us
Founded in 2012, Northwind is a fast-growing scale-up headquartered in Amsterdam with offices across Europe. Our mission is to make everyday logistics simpler for millions of households and thousands of merchants. Our culture is built on ownership, curiosity and kindness.

What we offer
A competitive salary and an annual bonus. Twenty-eight vacation days, a learning budget, a home-office allowance, a pension plan, travel reimbursement, team events and daily lunch at the office. Relocation support including visa sponsorship.

Our hiring process
After you apply, our recruitment team will review your application within five working days, followed by an introductory call, a practical assignment and a final meeting.

Diversity and inclusion
Northwind is an equal opportunity employer. We welcome applications from people of every background.

Privacy notice
By submitting your application you agree that we process your personal data for this recruitment procedure.`;

  it("strips boilerplate even when it is much longer than the job itself", () => {
    const long = FRONTEND_JOB + BOILER.repeat(4);
    expect(analyze(FRONTEND_CV, long).score).toBe(analyze(FRONTEND_CV, FRONTEND_JOB).score);
  });

  it("gives the same score with or without company boilerplate", () => {
    expect(analyze(FRONTEND_CV, FRONTEND_JOB + BOILER).score).toBe(analyze(FRONTEND_CV, FRONTEND_JOB).score);
    expect(analyze(SALES_CV, SALES_JOB + BOILER).score).toBe(analyze(SALES_CV, SALES_JOB).score);
  });

  it("keeps the requirements and drops the boilerplate", () => {
    const out = stripBoilerplate(FRONTEND_JOB + BOILER);
    expect(out).toMatch(/Redux/);
    expect(out).not.toMatch(/vacation days/);
    expect(out).not.toMatch(/equal opportunity/);
  });

  it("resumes at a job heading after a boilerplate section", () => {
    const job = "About Acme\nWe are a friendly company in Utrecht with great coffee and a dog-friendly office.\n\nAbout the role\nYou will build React and TypeScript apps with GraphQL, Jest and Cypress, shipping weekly to thousands of customers across Europe and working closely with designers and product managers every day.";
    const out = stripBoilerplate(job);
    expect(out).toMatch(/GraphQL/);
    expect(out).not.toMatch(/coffee/);
  });

  it("falls back to the full text when no job heading follows", () => {
    const job = "About Acme\nWe build React and TypeScript apps with GraphQL. You will write tests with Jest and Cypress and deploy with Docker on AWS for thousands of customers.";
    expect(stripBoilerplate(job)).toBe(job);
  });

  it("understands Dutch section headings", () => {
    const job = "Wat ga je doen\nJe bouwt webapplicaties met React, TypeScript en Next.js voor duizenden klanten, schrijft tests met Jest en werkt samen met ontwerpers en productmanagers in een agile team van zes ontwikkelaars.\n\nWij bieden\nEen goed salaris, dertig vakantiedagen en een leasefiets.";
    const out = stripBoilerplate(job);
    expect(out).toMatch(/React/);
    expect(out).not.toMatch(/leasefiets/);
  });
});

describe("nice-to-have skills", () => {
  const job = `Backend Engineer
We build APIs for thousands of customers. 3+ years of experience.

Requirements:
- Python and PostgreSQL in production
- Docker and AWS

Nice to have:
- Kubernetes
- Terraform`;
  const cvWithCore = "Backend engineer with 5 years of experience building Python services on PostgreSQL, shipped with Docker on AWS for thousands of customers across Europe, owning APIs end to end, on call, testing and reviews. Engineer, Acme, 2020 – present. " .repeat(1);

  it("marks optional-only skills as low priority", () => {
    const r = analyze(cvWithCore, job);
    const k8s = r.missing.find((m) => m.key === "kubernetes");
    expect(k8s?.priority).toBe("low");
  });

  it("the same gap costs less as a nice-to-have than as a requirement", () => {
    const required = job.replace("Nice to have:", "Also required:");
    expect(analyze(cvWithCore, job).score).toBeGreaterThan(analyze(cvWithCore, required).score);
  });

  it("missing a core requirement costs more than missing a nice-to-have", () => {
    const withoutCore = cvWithCore.replace("PostgreSQL", "spreadsheets");
    expect(analyze(withoutCore, job).score).toBeLessThan(analyze(cvWithCore, job).score);
  });
});

import { extractYearsRequired } from "@/lib/analyze";

describe("years of experience required by the job", () => {
  const cases: [string, number][] = [
    ["3+ years of experience with React", 3],
    ["3-5 years of experience in sales", 3],
    ["2–4 years experience as an analyst", 2],
    ["2+ years’ experience in recruiting", 2],
    ["At least 4 years in a similar role", 4],
    ["A minimum of 6 years working in finance", 6],
    ["Minimaal 3 jaar werkervaring als ontwikkelaar", 3],
    ["Founded 40 years ago in Utrecht", 0],
    ["2 years warranty on all devices", 0],
    ["5+ years of experience overall, including 2 years of experience with Go", 5],
  ];
  for (const [text, expected] of cases) {
    it(`"${text}" → ${expected}`, () => expect(extractYearsRequired(text)).toBe(expected));
  }
});

describe("healthcare and logistics skill groups", () => {
  const NURSE_JOB = `Registered Nurse — Medical Ward
Requirements:
- 3+ years of experience in patient care on a hospital ward
- Experience with electronic health records (Epic EMR)
- Medication administration and clinical documentation
- Infection control procedures and care plans
- Basic Life Support certification
Responsibilities: assess patients, coordinate with physicians, maintain care plans and follow infection control and medication administration protocols. Patient care is at the heart of everything we do.`;
  const NURSE_CV = `Jane Doe — Registered Nurse
Staff Nurse, City Hospital, Jan 2020 – Present
- Delivered patient care to 8 patients per shift on a 30-bed medical ward
- Documented assessments in Epic EMR; clinical documentation audits scored 98%
- Medication administration for high-risk drugs; wrote and updated care plans
- Led the infection control champion programme
Certifications: Basic Life Support`;

  it("scores a fitting nurse CV as a strong match", () => {
    const r = analyze(NURSE_CV, NURSE_JOB);
    expect(r.score).toBeGreaterThanOrEqual(70);
    expect(r.matched).toContain("Clinical / Patient Care");
  });

  it("keeps an unrelated CV low and flags the clinical gap", () => {
    const r = analyze(FRONTEND_CV, NURSE_JOB);
    expect(r.score).toBeLessThanOrEqual(25);
    expect(r.missing.find(m => m.key === "healthcare")?.priority).toBe("high");
  });

  it("does not read tech wording as healthcare or logistics", () => {
    const job = `Senior Backend Engineer
Own incident triage and bug triage, manage access control lists (ACLs), split work into epics, and secure our software supply chain. Node.js, PostgreSQL, AWS, Docker and CI/CD required.`;
    const r = analyze(FRONTEND_CV, job);
    const keys = [...r.matched, ...r.missing.map(m => m.key), ...r.missing.map(m => m.label)];
    expect(keys).not.toContain("healthcare");
    expect(keys).not.toContain("Clinical / Patient Care");
    expect(keys).not.toContain("logistics");
    expect(keys).not.toContain("Supply Chain & Logistics");
  });

  // Same promise for the translated guides
  it.each(["tr", "de", "es", "pt", "fr", "zh"] as const)("the %s nurse and logistics guides use wording the analyzer detects", (lang) => {
    for (const [slug, key] of [["registered-nurse", "healthcare"], ["logistics-coordinator", "logistics"]]) {
      const role = getLocalizedRole(lang, slug)!;
      const job = `${role.name}\n${role.groups.flatMap(g => g.keywords).join(", ")}.`;
      expect(analyze(FRONTEND_CV, job).missing.map(m => m.key), `${lang} ${slug}`).toContain(key);
    }
  });

  // The nurse and logistics role guides promise keywords the analyzer recognises.
  it.each([
    ["registered-nurse", "healthcare"],
    ["logistics-coordinator", "logistics"],
  ])("detects the %s guide's keywords as the %s skill group", (slug, key) => {
    const role = getRole(slug);
    expect(role).toBeDefined();
    const job = `${role!.name}\nRequirements: ${role!.groups.flatMap(g => g.keywords).join(", ")}.`;
    const r = analyze(FRONTEND_CV, job);
    expect(r.missing.map(m => m.key)).toContain(key);
  });
});

describe("seniority in the job title", () => {
  // A full-length posting with no year count, so only the title can carry seniority
  const body = Array(4).fill("Build React and TypeScript web applications with Next.js, Tailwind CSS, Jest and GraphQL for thousands of customers. Work with designers in Figma, review code in Git, ship weekly with CI/CD in an Agile team.").join("\n")
  const job = (title: string) => `${title}\n${body}`
  const cv = (years: number) => `Frontend developer, ${years} years of experience with React, TypeScript, Next.js, Tailwind CSS, Jest, GraphQL, Figma, Git, CI/CD and Agile delivery for web products used by thousands of customers every day. Shipped a checkout redesign that cut load time by forty percent, mentored two developers, wrote unit and end-to-end tests, and worked closely with product managers on weekly releases.`
  const gap = (title: string) => analyze(cv(9), job(title)).score - analyze(cv(1), job(title)).score

  it("separates a junior from a senior CV when the title says Lead", () => {
    expect(gap("Lead Frontend Engineer")).toBeGreaterThanOrEqual(gap("Frontend Engineer") + 2)
  });

  it("does not penalise a CV that meets the implied level", () => {
    expect(analyze(cv(9), job("Lead Frontend Engineer")).score).toBeGreaterThanOrEqual(analyze(cv(9), job("Frontend Engineer")).score - 1)
  });

  it("keeps showing that no years were stated", () => {
    expect(analyze(cv(1), job("Head of Frontend")).yearsRequired).toBe(0)
  });

  // Push 41: the same title words in the other site languages
  it.each(["Teamleiter Frontend", "Líder de Frontend", "Leiter Frontend", "Directeur Frontend", "Diretora de Frontend", "Jefe de Frontend", "Frontend Müdürü"])(
    "separates a junior from a senior CV when the title says %s", (title) => {
      expect(gap(title)).toBeGreaterThanOrEqual(gap("Frontend Engineer") + 2)
    });

  it("ignores leadership words outside the title line", () => {
    expect(gap("Frontend Engineer\nLeitung von Projekten, Teamleiter im Sprint")).toBe(gap("Frontend Engineer"))
  });
});
