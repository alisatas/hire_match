import { type Page, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** Hide the cookie banner so it can't cover what a test clicks. */
export async function dismissConsent(page: Page) {
  await page.addInitScript(() => {
    try { localStorage.setItem("cvxray_consent", "denied"); } catch {}
  });
}

/** Fails on serious or critical WCAG 2 A/AA violations. */
export async function expectAccessible(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  const summary = serious.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
  expect(summary, summary.join("\n")).toEqual([]);
}

/** Console errors that come from our own code (third-party and dev-only noise ignored). */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // _vercel/insights only exists on Vercel; a local production server answers 404
    if (/va\.vercel-scripts|_vercel\/insights|googletagmanager|google-analytics|_next\/hmr|WebSocket|Failed to load resource/.test(text)) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}
