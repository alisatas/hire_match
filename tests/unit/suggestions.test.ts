import { describe, expect, it } from "vitest";
import { analyze, findSkillMention } from "@/lib/analyze";
import { buildSuggestions } from "@/lib/suggestions";
import { CHEF_CV, FRONTEND_JOB } from "./fixtures";

describe("keyword suggestions", () => {
  const result = analyze(CHEF_CV, FRONTEND_JOB);
  const suggestions = buildSuggestions(CHEF_CV, FRONTEND_JOB, result.missing);

  it("returns at most five, high priority first, no low-priority items", () => {
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.length).toBeLessThanOrEqual(5);
    expect(suggestions.every((s) => s.priority !== "low")).toBe(true);
    const firstMedium = suggestions.findIndex((s) => s.priority === "medium");
    if (firstMedium >= 0) expect(suggestions.slice(firstMedium).every((s) => s.priority === "medium")).toBe(true);
  });

  it("quotes a job post line for every suggestion, not the title when a requirement exists", () => {
    for (const s of suggestions) {
      expect(s.jobQuote).toBeTruthy();
      expect(s.jobQuote).not.toBe("Frontend Developer — Amsterdam (Hybrid)");
    }
  });

  it("writes grammatical examples (no 'a AI', no label soup)", () => {
    for (const s of suggestions) expect(s.example).not.toMatch(/\ba [AEIOU]/);
  });

  it("tells the user the CV has no Skills section when it hasn't", () => {
    expect(suggestions[0].where).toMatch(/doesn't have one yet/);
  });

  it("recognises an existing Skills section", () => {
    const cv = "Jane Doe\nSkills\nCooking, menus\nExperience\nChef 2018 – present";
    const [first] = buildSuggestions(cv, FRONTEND_JOB, result.missing);
    expect(first.where).toMatch(/your Skills section/);
    expect(first.where).toMatch(/most recent role/);
  });

  it("returns nothing without CV or job text (shared links)", () => {
    expect(buildSuggestions("", FRONTEND_JOB, result.missing)).toEqual([]);
  });

  it("findSkillMention returns null for an unknown skill", () => {
    expect(findSkillMention(FRONTEND_JOB, "does-not-exist")).toBeNull();
  });
});
