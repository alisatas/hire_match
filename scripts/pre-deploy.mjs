#!/usr/bin/env node
import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";

let failed = false;

function pass(msg) { console.log(`  ${GREEN}✔${RESET} ${msg}`); }
function fail(msg) { console.log(`  ${RED}✘${RESET} ${msg}`); failed = true; }
function warn(msg) { console.log(`  ${YELLOW}⚠${RESET} ${msg}`); }
function section(title) { console.log(`\n${BOLD}${CYAN}${title}${RESET}`); }

// ─── 🕵️ QA AGENT ────────────────────────────────────────────────────────────
section("🕵️  QA Agent — Code Quality & Reliability");

// TypeScript check
try {
  execSync("npx tsc --noEmit", { stdio: "pipe" });
  pass("TypeScript — no type errors");
} catch (e) {
  fail(`TypeScript errors found:\n${e.stdout?.toString() || e.message}`);
}

// Lint check
try {
  execSync("npx eslint src/", { stdio: "pipe" });
  pass("ESLint — no lint errors");
} catch (e) {
  fail(`ESLint errors found:\n${e.stdout?.toString() || e.message}`);
}

// No console.log in production code
const srcFiles = execSync("find src -name '*.tsx' -o -name '*.ts'").toString().trim().split("\n");
const consoleLogs = srcFiles.filter(f => {
  try {
    const content = readFileSync(f, "utf-8");
    return /console\.log\(/.test(content);
  } catch { return false; }
});
if (consoleLogs.length > 0) {
  warn(`console.log found in: ${consoleLogs.join(", ")} — remove before production`);
} else {
  pass("No console.log statements in source");
}

// Build check
section("🕵️  QA Agent — Build Validation");
try {
  execSync("npm run build", { stdio: "pipe" });
  pass("Next.js build — success");
} catch (e) {
  fail(`Build failed:\n${e.stdout?.toString() || e.message}`);
}

// ─── 🔍 SEO AGENT ───────────────────────────────────────────────────────────
section("🔍 SEO Agent — Metadata & Discoverability");

const layout = existsSync("src/app/layout.tsx")
  ? readFileSync("src/app/layout.tsx", "utf-8")
  : "";

// Title
if (/title:/.test(layout)) pass("Page title defined");
else fail("Page title missing in layout.tsx");

// Description
if (/description:/.test(layout)) pass("Meta description defined");
else fail("Meta description missing in layout.tsx");

// OG tags
if (/openGraph:/.test(layout)) pass("Open Graph tags defined");
else fail("Open Graph tags missing");

// Twitter card
if (/twitter:/.test(layout)) pass("Twitter card tags defined");
else fail("Twitter card tags missing");

// Canonical URL
if (/canonical/.test(layout)) pass("Canonical URL defined");
else fail("Canonical URL missing");

// Robots
if (/robots:/.test(layout)) pass("Robots meta defined");
else fail("Robots meta missing");

// JSON-LD structured data
if (/application\/ld\+json/.test(layout)) pass("JSON-LD structured data found");
else warn("JSON-LD structured data missing — recommended for rich results");

// OG image
const hasOgImage = existsSync("public/og-image.png") || existsSync("public/og-image.jpg");
if (hasOgImage) pass("OG image found in /public");
else fail("OG image missing — add public/og-image.png (1200x630)");

// robots.txt
if (existsSync("public/robots.txt")) pass("robots.txt found");
else warn("robots.txt missing in /public — recommended for SEO");

// sitemap
const hasSitemap = existsSync("public/sitemap.xml") || existsSync("src/app/sitemap.ts") || existsSync("src/app/sitemap.js");
if (hasSitemap) pass("Sitemap found");
else warn("Sitemap missing — add src/app/sitemap.ts for automatic generation");

// Brand name consistency (JobFlare vs CV Scorer)
const brandNames = [];
if (/JobFlare/i.test(layout)) brandNames.push("JobFlare");
if (/CV Scorer/i.test(layout)) brandNames.push("CV Scorer");
if (brandNames.length > 1) {
  fail(`Brand name inconsistency in layout.tsx — found both: ${brandNames.join(" & ")}`);
} else {
  pass(`Brand name consistent (${brandNames[0] || "unknown"})`);
}

// ─── RESULT ─────────────────────────────────────────────────────────────────
console.log();
if (failed) {
  console.log(`${RED}${BOLD}✘ Pre-deploy checks FAILED — fix errors above before deploying.${RESET}\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}✔ All pre-deploy checks passed — ready to deploy!${RESET}\n`);
}
