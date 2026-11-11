import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
// E2E_PORT lets the production-build run (CI mode) coexist with a local dev server
const port = Number(process.env.E2E_PORT ?? 3000);

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      // Google Chrome is used both locally and in CI (GitHub's Ubuntu runners ship it), so
      // no browser download is ever needed — `playwright install` timed out in CI.
      use: { ...devices["Desktop Chrome"], channel: process.env.E2E_CHANNEL ?? "chrome" },
    },
  ],
  // CI builds first, then serves the production build; locally a running dev server is reused
  webServer: {
    command: isCI ? `npm run start -- -p ${port}` : "npm run dev",
    url: `http://localhost:${port}`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
