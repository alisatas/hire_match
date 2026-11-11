import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { collectConsoleErrors, dismissConsent } from "./helpers";

// Deliberately missing two required skills (Redux, GraphQL) so the report has gaps to explain
const CV = `Senior Frontend Developer with 5 years of experience building web applications with React, TypeScript and Next.js.
Skills
React, TypeScript, Next.js, Tailwind CSS, Jest, Cypress, Git
Experience
Frontend Developer, Acme — 2019 – present
Built REST API integrations and CI/CD pipelines with GitHub Actions in Agile Scrum teams; collaborated with designers in Figma.`;

test.describe("analyzer flow", () => {
  test.beforeEach(async ({ page }) => dismissConsent(page));

  test("sample job + pasted CV produces a scored report with suggestions", async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("match the job");

    await page.getByRole("button", { name: "Paste text instead" }).click();
    await page.getByLabel("CV text").fill(CV);
    await page.getByRole("button", { name: /Try a sample job/ }).click();
    const samples = page.locator("#analyzer button[title]");
    await expect(samples.first()).toHaveText("AI Engineer");
    await page.getByRole("button", { name: "Account Executive", exact: true }).isVisible();
    await page.getByRole("button", { name: "Frontend Dev", exact: true }).click();
    await expect(page.getByText("Sample job: Frontend Dev")).toBeVisible();

    await page.getByRole("button", { name: /Analyze match/ }).click();
    await expect(page.getByRole("heading", { name: "Your match results" })).toBeAttached();
    await expect(page.getByText("Skills", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "How to add the missing skills" })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("score card downloads as a PNG", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Paste text instead" }).click();
    await page.getByLabel("CV text").fill(CV);
    await page.getByRole("button", { name: /Try a sample job/ }).click();
    await page.getByRole("button", { name: "Frontend Dev", exact: true }).click();
    await page.getByRole("button", { name: /Analyze match/ }).click();

    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: /Score card/ }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe("cvxray-score.png");
    const path = await file.path();
    const bytes = fs.readFileSync(path);
    expect(bytes.subarray(1, 4).toString()).toBe("PNG");
    if (process.env.E2E_ARTIFACT_DIR) fs.copyFileSync(path, `${process.env.E2E_ARTIFACT_DIR}/score-card.png`);
  });
});
