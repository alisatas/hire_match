import { describe, expect, it } from "vitest";
import { analyze, yearsFromDateRanges } from "@/lib/analyze";
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
