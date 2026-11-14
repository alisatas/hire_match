import { test, expect, type APIRequestContext } from "@playwright/test";

// Crawls every URL in the sitemap the way a search engine or AI crawler would (raw HTML, no
// JavaScript) and fails on anything that would hurt indexing or citation.

const SITE = "https://cvxray.com";
const toPath = (url: string) => url.replace(SITE, "") || "/";

interface PageFacts {
  path: string; html: string; title: string; description: string; canonical: string; h1Count: number;
}

const meta = (html: string, attr: "name" | "property", key: string) =>
  html.match(new RegExp(`<meta[^>]+${attr}="${key}"[^>]+content="([^"]*)"`, "i"))?.[1] ??
  html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+${attr}="${key}"`, "i"))?.[1] ?? "";

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => toPath(m[1]));
}

async function facts(request: APIRequestContext, path: string): Promise<PageFacts> {
  const res = await request.get(path);
  expect(res.status(), `${path} status`).toBe(200);
  const html = await res.text();
  return {
    path, html,
    title: decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ""),
    description: decode(meta(html, "name", "description")),
    canonical: html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? "",
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
  };
}

test.describe("SEO crawl", () => {
  test("every sitemap page is indexable, unique and fully described", async ({ request }) => {
    const paths = await sitemapPaths(request);
    expect(paths.length).toBeGreaterThanOrEqual(20);
    const pages = await Promise.all(paths.map((p) => facts(request, p)));
    const problems: string[] = [];

    for (const p of pages) {
      const say = (msg: string) => problems.push(`${p.path}: ${msg}`);
      // Google truncates titles near 60 characters and descriptions near 160
      if (p.title.length < 15 || p.title.length > 65) say(`title length ${p.title.length} ("${p.title}")`);
      if (p.description.length < 70 || p.description.length > 160) say(`description length ${p.description.length}`);
      if (p.canonical !== `${SITE}${p.path === "/" ? "" : p.path}` && p.canonical !== `${SITE}${p.path}`) say(`canonical ${p.canonical}`);
      if (p.h1Count !== 1) say(`${p.h1Count} <h1> elements`);
      if (/<meta[^>]+name="robots"[^>]+noindex/i.test(p.html)) say("noindex");
      // Pages under /tr, /de, /es, /pt, /fr and /zh declare their own language
      const lang = /^\/(tr|de|es|pt|fr|zh)(\/|$)/.exec(p.path)?.[1] ?? "en";
      if (!new RegExp(`<html[^>]+lang="${lang}`, "i").test(p.html)) say(`html lang is not "${lang}"`);
      // Every page exists in every language and lists all the versions
      for (const code of ["en", "tr", "de", "es", "pt", "fr", "zh", "x-default"]) {
        if (!new RegExp(`<link[^>]+rel="alternate"[^>]+hrefLang="${code}"`, "i").test(p.html)) say(`missing hreflang ${code}`);
      }
      for (const key of ["og:title", "og:description", "og:url", "og:image", "og:type"]) {
        if (!meta(p.html, "property", key)) say(`missing ${key}`);
      }
      if (!meta(p.html, "name", "twitter:card")) say("missing twitter:card");

      // Structured data must parse and declare schema.org types
      const blocks = [...p.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
      if (blocks.length === 0) say("no JSON-LD");
      for (const raw of blocks) {
        try {
          const data = JSON.parse(raw);
          const nodes = Array.isArray(data) ? data : data["@graph"] ?? [data];
          if (!JSON.stringify(data).includes("schema.org")) say("JSON-LD without schema.org context");
          for (const node of nodes) if (!node["@type"]) say("JSON-LD node without @type");
        } catch {
          say("JSON-LD does not parse");
        }
      }
    }

    // Duplicate titles or descriptions make pages compete with each other in search
    for (const field of ["title", "description"] as const) {
      const seen = new Map<string, string>();
      for (const p of pages) {
        const prev = seen.get(p[field]);
        if (prev) problems.push(`duplicate ${field}: ${prev} and ${p.path}`);
        else seen.set(p[field], p.path);
      }
    }
    expect(problems, problems.join("\n")).toEqual([]);
  });

  test("internal links resolve and every linked page is in the sitemap", async ({ request }) => {
    const paths = await sitemapPaths(request);
    const inSitemap = new Set(paths);
    const linked = new Set<string>();
    for (const path of paths) {
      const html = await (await request.get(path)).text();
      for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) linked.add(m[1].replace(/\/$/, "") || "/");
    }
    const problems: string[] = [];
    for (const path of linked) {
      if (path.startsWith("/api/") || path.startsWith("/_next/") || /\.(xml|txt|png|svg)$/.test(path)) continue;
      const res = await request.get(path, { failOnStatusCode: false });
      if (res.status() !== 200) problems.push(`${path} → ${res.status()}`);
      else if (!inSitemap.has(path)) problems.push(`${path} is linked but missing from the sitemap`);
    }
    expect(problems, problems.join("\n")).toEqual([]);
  });

  test("home page carries the structured data AI answers rely on", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const types = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
    for (const t of ["WebApplication", "FAQPage", "Organization", "HowTo"]) {
      expect(types, `home page JSON-LD is missing ${t}`).toContain(t);
    }
    // FAQ answers must be present in the HTML itself, not only after JavaScript runs
    expect((html.match(/"@type":"Question"/g) ?? []).length).toBeGreaterThanOrEqual(10);
  });
});

test.describe("crawler access", () => {
  test("robots.txt welcomes search and AI crawlers but keeps them out of the API", async ({ request }) => {
    const txt = await (await request.get("/robots.txt")).text();
    for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"]) {
      expect(txt, `${bot} not listed`).toContain(bot);
    }
    expect(txt).toMatch(/Disallow: \/api\//);
    expect(txt).not.toMatch(/Disallow: \/\s*$/m);
    expect(txt).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  test("llms.txt is served as text and every link in it works", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const txt = await res.text();
    expect(txt.length).toBeGreaterThan(2000);
    const links = [...txt.matchAll(/https:\/\/cvxray\.com(\/[^\s)#]*)?/g)].map((m) => (m[1] ?? "/").replace(/\/$/, "") || "/");
    const broken: string[] = [];
    for (const path of new Set(links)) {
      const r = await request.get(path, { failOnStatusCode: false });
      if (r.status() !== 200) broken.push(`${path} → ${r.status()}`);
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  test("IndexNow key file is served so search engines accept our submissions", async ({ request }) => {
    const fs = await import("node:fs");
    const keyFile = fs.readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
    expect(keyFile, "public/<32 hex>.txt missing").toBeTruthy();
    const res = await request.get(`/${keyFile}`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    expect((await res.text()).trim()).toBe(keyFile!.replace(".txt", ""));
  });

  test("pages render their main content without JavaScript", async ({ browser }) => {
    // Most AI crawlers do not run JavaScript: the answer must be in the server HTML
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    for (const [path, text] of [["/", "match the job"], ["/resume-keywords/ai-engineer", "RAG"], ["/blog/how-ats-reads-your-cv", "applicant tracking"]]) {
      await page.goto(path);
      await expect(page.locator("main")).toContainText(new RegExp(text, "i"));
    }
    await context.close();
  });
});
