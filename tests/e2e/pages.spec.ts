import { test, expect } from "@playwright/test";
import { collectConsoleErrors, dismissConsent, expectAccessible } from "./helpers";

const PAGES: [string, RegExp][] = [
  ["/", /match the job/],
  ["/resume-keywords", /Resume keywords by job role/],
  ["/resume-keywords/ai-engineer", /AI Engineer resume keywords/],
  ["/resume-keywords/recruiter", /Recruiter resume keywords/],
  ["/blog", /CV and job search guides/],
  ["/blog/how-ats-reads-your-cv", /applicant tracking systems/],
  ["/terms", /Terms of Service/],
  ["/privacy", /Privacy Policy/],
];

test.describe("public pages", () => {
  test.beforeEach(async ({ page }) => dismissConsent(page));

  for (const [path, heading] of PAGES) {
    test(`${path} renders, has structured data and passes accessibility checks`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
      expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThan(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https:\/\/cvxray\.com/);
      await expectAccessible(page);
      expect(errors).toEqual([]);
    });
  }

  test("unknown pages return a real 404 with a way back", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/doesn.t exist/);
    await expect(page.getByRole("link", { name: /Check my CV/ }).last()).toBeVisible();
  });

  test("cookie banner is accessible", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie consent" });
    if (await banner.count()) {
      await expect(banner.getByRole("button", { name: "Reject all" })).toBeVisible();
      await expectAccessible(page);
    }
  });
});

test.describe("API guards", () => {
  test("scraper refuses private addresses and cross-site posts", async ({ request }) => {
    const priv = await request.post("/api/scrape", { data: { url: "http://169.254.169.254/latest/meta-data/" } });
    expect(priv.status()).toBe(400);
    const cross = await request.post("/api/scrape", {
      data: { url: "https://example.com" },
      headers: { Origin: "https://evil.example" },
    });
    expect(cross.status()).toBe(403);
  });
});
