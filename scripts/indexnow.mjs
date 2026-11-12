#!/usr/bin/env node
// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, …) that the site's pages changed,
// so they recrawl within minutes instead of waiting for their next crawl. Bing's index also
// feeds ChatGPT search and Copilot answers.
//
// Usage: node scripts/indexnow.mjs [--dry-run]
// Runs from .github/workflows/indexnow.yml after a production deploy that changed content.
//
// The key is public by design: search engines fetch https://cvxray.com/<key>.txt to confirm
// the submitter controls the site. The worst anyone can do with it is ask for a recrawl of
// our own URLs.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://cvxray.com";
const HOST = "cvxray.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const dryRun = process.argv.includes("--dry-run");

const keyFile = readdirSync(join(import.meta.dirname, "..", "public")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file (public/<32 hex>.txt) not found");
const key = readFileSync(join(import.meta.dirname, "..", "public", keyFile), "utf8").trim();
const keyLocation = `${SITE}/${keyFile}`;

async function get(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000), headers: { "cache-control": "no-cache" } });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return res.text();
}

// The key must already be live, or the search engines reject the submission
const served = (await get(keyLocation)).trim();
if (served !== key) throw new Error(`${keyLocation} does not serve the key yet`);

const sitemap = await get(`${SITE}/sitemap.xml`);
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => new URL(u).host === HOST);
if (urlList.length === 0) throw new Error("sitemap has no URLs");

console.log(`IndexNow: ${urlList.length} URLs from the sitemap${dryRun ? " (dry run, nothing sent)" : ""}`);
if (dryRun) {
  console.log(urlList.join("\n"));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
  signal: AbortSignal.timeout(20_000),
});

// 200 = accepted, 202 = accepted and the key is still being verified
const meaning = { 200: "accepted", 202: "accepted, key verification pending", 400: "bad request", 403: "key not valid for this host",
  422: "URLs do not belong to the host", 429: "too many requests" }[res.status] ?? "unexpected";
console.log(`IndexNow responded ${res.status} (${meaning})`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
