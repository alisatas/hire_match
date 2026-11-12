import { test, expect, type APIRequestContext, type Page } from "@playwright/test";
import { dismissConsent } from "./helpers";

// Attack-surface tests: they replay the attacks a real adversary would try first and fail the
// build if any of them gets through. Runs against the production build in CI.

const XSS_PAYLOADS = [
  `<img src=x onerror="window.__xss=1">`,
  `<svg onload="window.__xss=1"></svg>`,
  `<script>window.__xss=1</script>`,
  `"><iframe src="javascript:window.__xss=1"></iframe>`,
  `javascript:window.__xss=1`,
  `<a href="javascript:window.__xss=1">click</a>`,
  `{{constructor.constructor('window.__xss=1')()}}`,
  `<details open ontoggle="window.__xss=1">`,
];

/** Fails the test if any script ran or any dialog opened. */
async function trapExecution(page: Page) {
  const dialogs: string[] = [];
  page.on("dialog", async (d) => { dialogs.push(d.message()); await d.dismiss(); });
  return async () => {
    expect(dialogs, "a dialog was opened by injected content").toEqual([]);
    expect(await page.evaluate(() => (window as unknown as { __xss?: number }).__xss)).toBeUndefined();
    // No element that came from the payload may exist as real markup
    expect(await page.locator("#analyzer iframe, #analyzer svg[onload], #analyzer img[onerror], #analyzer details[ontoggle]").count()).toBe(0);
    expect(await page.locator('#analyzer a[href^="javascript:" i]').count()).toBe(0);
  };
}

const b64url = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
const SHARE = {
  s: 62, pl: "Competitive", pd: "desc", pc: "text-primary", m: ["React"],
  ms: [["Docker", "docker", 2, "high"]], rm: 3, rt: 5, yr: 2, yc: 3,
  ts: [["react", 3]], lq: false, jw: 300, sm: "summary",
};

test.describe("XSS", () => {
  test.beforeEach(async ({ page }) => dismissConsent(page));

  test("payloads pasted as CV and job text are rendered as text, never executed", async ({ page }) => {
    const check = await trapExecution(page);
    await page.goto("/");
    const payload = XSS_PAYLOADS.join("\n");
    await page.getByRole("button", { name: "No PDF? Paste the text" }).click();
    await page.getByLabel("CV text").fill(`Frontend developer, 5 years React and TypeScript.\n${payload}\n`.repeat(3));
    await page.locator("#analyzer").getByText("Paste text", { exact: true }).click();
    await page.getByLabel("Job description text").fill(
      `Senior React developer. Requirements: React, TypeScript, Docker, 3+ years of experience.\n${payload}\n`.repeat(4),
    );
    await page.getByRole("button", { name: /Analyze match/ }).click();
    await expect(page.getByRole("heading", { name: "Your match results" })).toBeAttached();
    await check();
  });

  test("a share link carrying script payloads renders them as plain text", async ({ page }) => {
    const check = await trapExecution(page);
    const evil = { ...SHARE, pl: XSS_PAYLOADS[0], pd: XSS_PAYLOADS[1], pc: `x" onmouseover="window.__xss=1`,
      m: XSS_PAYLOADS, sm: XSS_PAYLOADS[2], ts: [[XSS_PAYLOADS[3], 3]], ms: [[XSS_PAYLOADS[5], "docker", 2, "high"]] };
    await page.goto(`/#s=${b64url(evil)}`);
    await expect(page.getByRole("heading", { name: "Your match results" })).toBeAttached();
    await page.mouse.move(400, 400);
    await check();
  });

  // The translated pages rebuild the verdict from the link's fields and look labels up in
  // a dictionary — a second path from the same untrusted input to the page.
  for (const path of ["/tr", "/zh"]) {
    test(`a share link with script payloads is plain text on ${path} too`, async ({ page }) => {
      const check = await trapExecution(page);
      const evil = { ...SHARE, s: 85, pl: XSS_PAYLOADS[0], pd: XSS_PAYLOADS[1], pc: `x" onmouseover="window.__xss=1`,
        m: [...XSS_PAYLOADS, "__proto__", "constructor", "toString"], sm: XSS_PAYLOADS[2], ts: [[XSS_PAYLOADS[3], 3]],
        ms: [[XSS_PAYLOADS[5], "docker", 2, "high"], ["__proto__", "react", 3, "high"]] };
      const pageErrors: string[] = [];
      page.on("pageerror", (e) => pageErrors.push(e.message));
      await page.goto(`${path}#s=${b64url(evil)}`);
      await expect(page.locator('#analyzer svg[role="img"]')).toBeVisible();
      await page.mouse.move(400, 400);
      await check();
      expect(pageErrors).toEqual([]);
    });
  }
});

test.describe("crafted share links cannot break the page", () => {
  test.beforeEach(async ({ page }) => dismissConsent(page));

  const cases: [string, string][] = [
    ["object where a number belongs", b64url({ ...SHARE, rt: { a: 1 } })],
    ["array where a number belongs", b64url({ ...SHARE, yr: [1, 2] })],
    ["prototype keys as skill keys", b64url({ ...SHARE, ms: [["X", "__proto__", 3, "high"], ["Y", "constructor", 3, "high"]] })],
    ["unknown priority", b64url({ ...SHARE, ms: [["Docker", "docker", 2, "<b>urgent</b>"]] })],
    ["non-finite score", Buffer.from('{"s":1e999}').toString("base64url")],
    ["not JSON", "%%%not-base64%%%"],
    ["huge payload", b64url({ ...SHARE, m: Array(20000).fill("React") })],
  ];
  for (const [name, hash] of cases) {
    test(name, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on("pageerror", (e) => pageErrors.push(e.message));
      // English and a translated page: the same link is decoded by both
      for (const path of ["/", "/de"]) {
        await page.goto(`${path}#s=${hash}`);
        // The analyzer must still be usable: either the shared result or the empty form
        await expect(page.locator("#analyzer")).toBeVisible();
        await expect(page.getByText("This page couldn’t load")).toHaveCount(0);
        expect(await page.locator('#analyzer a[href="undefined"], #analyzer a:not([href])').count()).toBe(0);
      }
      expect(pageErrors).toEqual([]);
    });
  }
});

// /<lang> is a dynamic segment: only the four published languages may answer.
test.describe("language segment", () => {
  for (const path of ["/en", "/TR", "/__proto__", "/constructor", "/toString", "/tr%00", "/tr/admin", "/xx", "/zh-Hans", "/%E4%B8%AD%E6%96%87"]) {
    test(`${path} is a plain 404`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(404);
      expectNoLeak(await res.text());
    });
  }
});

test.describe("security headers", () => {
  const PATHS = ["/", "/tr", "/zh", "/resume-keywords/ai-engineer", "/blog/how-ats-reads-your-cv", "/privacy", "/this-page-does-not-exist"];
  for (const path of PATHS) {
    test(`${path} sends hardened headers`, async ({ request }) => {
      const res = await request.get(path);
      const h = res.headers();
      expect(h["x-frame-options"]).toBe("DENY");
      expect(h["x-content-type-options"]).toBe("nosniff");
      expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(h["strict-transport-security"]).toMatch(/max-age=\d{8,}; includeSubDomains; preload/);
      expect(h["cross-origin-opener-policy"]).toBe("same-origin");
      expect(h["permissions-policy"]).toContain("camera=()");
      expect(h["x-powered-by"]).toBeUndefined();
      const csp = h["content-security-policy"] ?? "";
      for (const directive of ["default-src 'self'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", "form-action 'self'"]) {
        expect(csp, `CSP is missing ${directive}`).toContain(directive);
      }
      // eval stays allowed only in the dev server, never in a production build
      if (process.env.CI) expect(csp).not.toContain("unsafe-eval");
      expect(csp).not.toMatch(/script-src[^;]*\s\*(\s|;|$)/);
    });
  }
});

// Every API route: what an attacker can send without a browser
const POST_ROUTES = ["/api/scrape", "/api/extract-pdf", "/api/orchestrate", "/api/reddit-comment", "/api/csp-report", "/api/client-error"];

function expectNoLeak(body: string) {
  // No stack traces, file paths or framework internals in any response body
  expect(body).not.toMatch(/\bat \S+ \(|node_modules|\/var\/task|\/Users\/|webpack|TypeError|SyntaxError|ReferenceError/);
}

// The rate limiter keys on x-real-ip. Off Vercel (CI, local) the header comes from the client,
// so each request gets its own address: otherwise the limiter answers 429 before the route's
// own checks are reached and those checks would go untested. On Vercel the platform sets it.
let ipCounter = 0;
const freshIp = () => `203.0.113.${(ipCounter = (ipCounter % 250) + 1)}`;

async function post(request: APIRequestContext, path: string, data: string | Buffer, headers: Record<string, string> = {}) {
  return request.post(path, { data, headers: { "content-type": "application/json", "x-real-ip": freshIp(), ...headers }, failOnStatusCode: false });
}

test.describe("API hardening", () => {
  for (const path of POST_ROUTES) {
    test(`${path} survives malformed input without errors or leaks`, async ({ request }) => {
      const bodies = ["", "{", "null", "[]", '"str"', "1e999", '{"url":{"$gt":""}}', '{"__proto__":{"admin":true}}',
        JSON.stringify({ url: "x".repeat(5000), text: "<script>alert(1)</script>" })];
      for (const body of bodies) {
        const res = await post(request, path, body);
        expect(res.status(), `${path} answered ${res.status()} to ${body.slice(0, 30)}`).toBeLessThan(500);
        expectNoLeak(await res.text());
      }
    });

    test(`${path} refuses cross-site and oversized requests`, async ({ request }) => {
      for (const origin of ["https://evil.example", "null"]) {
        const res = await post(request, path, "{}", { origin });
        expect(res.status()).toBe(403);
      }
      const big = await post(request, path, "x".repeat(6 * 1024 * 1024));
      expect(big.status()).toBe(413);
    });
  }

  for (const path of ["/api/orchestrate", "/api/reddit-comment"]) {
    test(`${path} rejects missing, wrong and malformed owner keys`, async ({ request }) => {
      for (const auth of [{}, { "x-agent-key": "wrong" }, { authorization: "Bearer " }, { authorization: "Bearer " + "a".repeat(600) },
        { "x-agent-key": "undefined" }, { "x-agent-key": "null" }]) {
        const res = await post(request, path, JSON.stringify({ agent: "seo", postId: "abc", text: "hi" }), auth as Record<string, string>);
        expect(res.status()).toBe(401);
      }
    });
  }

  test("PDF route rejects files that are not PDFs and never leaks parser errors", async ({ request }) => {
    for (const [name, mimeType, buffer] of [
      ["cv.pdf", "application/pdf", Buffer.from("not a pdf at all")],
      ["cv.pdf", "application/pdf", Buffer.from("%PDF-1.7\n" + "A".repeat(2000))],
      ["evil.html", "text/html", Buffer.from("<script>alert(1)</script>")],
      ["evil.svg", "image/svg+xml", Buffer.from('<svg onload="alert(1)"/>')],
    ] as const) {
      const res = await request.post("/api/extract-pdf", { multipart: { file: { name, mimeType, buffer } }, headers: { "x-real-ip": freshIp() }, failOnStatusCode: false });
      expect(res.status()).toBeGreaterThanOrEqual(400);
      expect(res.status()).toBeLessThan(500);
      expectNoLeak(await res.text());
    }
  });

  test("scraper blocks SSRF tricks end to end", async ({ request }) => {
    for (const url of [
      "http://127.0.0.1/", "http://localhost/", "http://[::1]/", "http://2130706433/", "http://0x7f000001/",
      "http://0177.0.0.1/", "http://127.1/", "http://169.254.169.254/latest/meta-data/", "http://[::ffff:169.254.169.254]/",
      "http://metadata.google.internal/", "http://[fd00:ec2::254]/", "file:///etc/passwd", "gopher://127.0.0.1:6379/_INFO",
      "http://user:pass@example.com/", "http://example.com:6379/", "http://localhost./", "http://LOCALHOST/",
    ]) {
      const res = await post(request, "/api/scrape", JSON.stringify({ url }));
      expect(res.status(), `scraper accepted ${url}`).toBe(400);
      expectNoLeak(await res.text());
    }
  });

  test("rate limiter cuts off a flood from one address", async ({ request }) => {
    const ip = "198.51.100.77";
    const statuses: number[] = [];
    for (let i = 0; i < 20; i++) {
      const res = await post(request, "/api/scrape", JSON.stringify({ url: "http://127.0.0.1/" }), { "x-real-ip": ip });
      statuses.push(res.status());
    }
    // limit is 15 a minute for the scraper
    expect(statuses.slice(0, 15).every((s) => s === 400)).toBe(true);
    expect(statuses.slice(15).every((s) => s === 429)).toBe(true);
    const last = await post(request, "/api/scrape", "{}", { "x-real-ip": ip });
    expect(Number(last.headers()["retry-after"])).toBeGreaterThan(0);
  });

  test("API responses are never cached or indexed", async ({ request }) => {
    const res = await post(request, "/api/scrape", JSON.stringify({ url: "http://127.0.0.1/" }));
    expect(res.headers()["cache-control"]).toContain("no-store");
    expect(res.headers()["x-robots-tag"]).toContain("noindex");
  });

  test("POST-only routes refuse GET", async ({ request }) => {
    for (const path of ["/api/scrape", "/api/extract-pdf", "/api/orchestrate", "/api/reddit-comment"]) {
      const res = await request.get(path, { headers: { "x-real-ip": freshIp() }, failOnStatusCode: false });
      expect([404, 405]).toContain(res.status());
    }
  });

  test("interview search rejects oversized and control-character input", async ({ request }) => {
    for (const company of ["", "a", "x".repeat(200)]) {
      const res = await request.get(`/api/interview-questions?company=${encodeURIComponent(company)}`, { headers: { "x-real-ip": freshIp() }, failOnStatusCode: false });
      expect(res.status()).toBe(400);
    }
  });
});

test.describe("open redirects", () => {
  for (const path of [
    "//evil.example/", "/\\evil.example", "/%2F%2Fevil.example", "/https://evil.example",
    // the share-image redirects copy a path segment into Location
    "/resume-keywords/%2F%2Fevil.example/opengraph-image", "/blog/%5Cevil.example/opengraph-image", "/resume-keywords/https:%2F%2Fevil.example/opengraph-image",
  ]) {
    test(`${path} does not redirect off-site`, async ({ baseURL }) => {
      // Raw fetch: Playwright's request client would itself read "//evil.example" as a host
      const res = await fetch(`${baseURL}${path}`, { redirect: "manual" });
      const location = res.headers.get("location") ?? "";
      expect(location).not.toMatch(/^(https?:)?\/\/(?!cvxray\.com|localhost)/i);
    });
  }
});
