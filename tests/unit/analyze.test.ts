import { describe, expect, it } from "vitest";
import { analyze, yearsFromDateRanges } from "@/lib/analyze";
import { CHEF_CV, FRONTEND_CV, FRONTEND_JOB, SALES_CV, SALES_JOB } from "./fixtures";

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
