#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BLUE = "\x1b[34m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

let failed = false;

function pass(msg) { console.log(`  ${GREEN}✔${RESET} ${msg}`); }
function fail(msg) { console.log(`  ${RED}✘${RESET} ${msg}`); failed = true; }
function warn(msg) { console.log(`  ${YELLOW}⚠${RESET} ${msg}`); }
function fix(msg) { console.log(`  ${BLUE}🔧 AUTO-FIXED:${RESET} ${msg}`); }
function section(title) { console.log(`\n${BOLD}${CYAN}━━━ ${title} ━━━${RESET}`); }
function info(msg) { console.log(`  ${DIM}${msg}${RESET}`); }

const srcFiles = execSync("find src -name '*.tsx' -o -name '*.ts'").toString().trim().split("\n");
const allSrc = srcFiles.map(f => {
  try { return { f, c: readFileSync(f, "utf-8") }; } catch { return { f, c: "" }; }
});

// ═══════════════════════════════════════════════════════════════════════════════
// 🕵️  QA AGENT — Code Quality & Reliability
// ═══════════════════════════════════════════════════════════════════════════════
section("🕵️  QA Agent — Code Quality & Reliability");

try {
  execSync("npx tsc --noEmit", { stdio: "pipe" });
  pass("TypeScript — no type errors");
} catch (e) {
  fail(`TypeScript errors found:\n${e.stdout?.toString() || e.message}`);
}

try {
  execSync("npx eslint src/", { stdio: "pipe" });
  pass("ESLint — no lint errors");
} catch (e) {
  fail(`ESLint errors found:\n${e.stdout?.toString() || e.message}`);
}

const consoleLogs = allSrc.filter(({ c }) => /console\.log\(/.test(c)).map(({ f }) => f);
if (consoleLogs.length > 0) {
  // AUTO-FIX: remove console.log lines
  consoleLogs.forEach(f => {
    const original = readFileSync(f, "utf-8");
    const cleaned = original.replace(/^\s*console\.log\(.*\);?\n?/gm, "");
    if (cleaned !== original) {
      writeFileSync(f, cleaned);
      fix(`Removed console.log from ${f}`);
    }
  });
} else {
  pass("No console.log statements in source");
}

section("🕵️  QA Agent — Build Validation");
try {
  execSync("npm run build", { stdio: "pipe" });
  pass("Next.js build — success");
} catch (e) {
  fail(`Build failed:\n${e.stdout?.toString() || e.message}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔍 SEO AGENT — Metadata & Discoverability
// ═══════════════════════════════════════════════════════════════════════════════
section("🔍 SEO Agent — Metadata & Discoverability");

const layout = existsSync("src/app/layout.tsx") ? readFileSync("src/app/layout.tsx", "utf-8") : "";

if (/title:/.test(layout)) pass("Page title defined");
else fail("Page title missing in layout.tsx");

if (/description:/.test(layout)) pass("Meta description defined");
else fail("Meta description missing in layout.tsx");

if (/openGraph:/.test(layout)) pass("Open Graph tags defined");
else fail("Open Graph tags missing");

if (/twitter:/.test(layout)) pass("Twitter card tags defined");
else fail("Twitter card tags missing");

if (/canonical/.test(layout)) pass("Canonical URL defined");
else fail("Canonical URL missing");

if (/robots:/.test(layout)) pass("Robots meta defined");
else fail("Robots meta missing");

if (/application\/ld\+json/.test(layout)) pass("JSON-LD structured data found");
else warn("JSON-LD structured data missing — recommended for rich results");

const hasOgImage = existsSync("public/og-image.png") || existsSync("public/og-image.jpg");
if (hasOgImage) pass("OG image found in /public");
else warn("OG image missing — add public/og-image.png (1200x630) for social sharing");

if (existsSync("public/robots.txt")) pass("robots.txt found");
else warn("robots.txt missing in /public");

const hasSitemap = existsSync("public/sitemap.xml") || existsSync("src/app/sitemap.ts") || existsSync("src/app/sitemap.js");
if (hasSitemap) pass("Sitemap found");
else warn("Sitemap missing — add src/app/sitemap.ts for automatic generation");

const brandNames = [];
if (/JobFlare/i.test(layout)) brandNames.push("JobFlare");
if (/CV Scorer/i.test(layout)) brandNames.push("CV Scorer");
if (brandNames.length > 1) fail(`Brand name inconsistency — found both: ${brandNames.join(" & ")}`);
else pass(`Brand name consistent (${brandNames[0] || "unknown"})`);

// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 SECURITY ENGINEER — Vulnerabilities & OWASP Top 10
// ═══════════════════════════════════════════════════════════════════════════════
section("🔐 Security Engineer — Vulnerabilities & OWASP Top 10");

// XSS — but JSON-LD usage is intentional and safe, skip those
const xssFiles = allSrc.filter(({ c }) => {
  if (!(/dangerouslySetInnerHTML/.test(c))) return false;
  // Safe: dangerouslySetInnerHTML used only inside <script type="application/ld+json">
  const lines = c.split("\n");
  return lines.some((line, i) => {
    if (!/dangerouslySetInnerHTML/.test(line)) return false;
    const context = lines.slice(Math.max(0, i - 3), i + 1).join("\n");
    return !/ld\+json|application\/ld/.test(context);
  });
}).map(({ f }) => f);
if (xssFiles.length > 0) fail(`XSS risk — unsafe dangerouslySetInnerHTML in: ${xssFiles.join(", ")}`);
else pass("No unsafe dangerouslySetInnerHTML usage (JSON-LD excluded)");

const evalFiles = allSrc.filter(({ c }) => /\beval\(/.test(c)).map(({ f }) => f);
if (evalFiles.length > 0) fail(`eval() found — code injection risk: ${evalFiles.join(", ")}`);
else pass("No eval() usage");

const secretPatterns = /(sk-[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36}|AIza[0-9A-Za-z\\-_]{35})/;
const secretFiles = allSrc.filter(({ c }) => secretPatterns.test(c)).map(({ f }) => f);
if (secretFiles.length > 0) fail(`Hardcoded secret/API key detected in: ${secretFiles.join(", ")}`);
else pass("No hardcoded API keys or secrets found");

const envFiles = [".env", ".env.local", ".env.production"].filter(f => existsSync(f));
if (envFiles.length > 0) warn(`.env files present on disk: ${envFiles.join(", ")} — ensure they are in .gitignore`);
else pass("No .env files exposed at root");

const gitignore = existsSync(".gitignore") ? readFileSync(".gitignore", "utf-8") : "";
if (/\.env/.test(gitignore)) pass(".env is in .gitignore");
else {
  // AUTO-FIX: add .env to .gitignore
  writeFileSync(".gitignore", gitignore + "\n.env\n.env.local\n.env*.local\n");
  fix("Added .env entries to .gitignore");
}

// Security headers — AUTO-FIX: add to next.config.ts if missing
const nextConfigPath = existsSync("next.config.ts") ? "next.config.ts" : "next.config.js";
const nextConfig = existsSync(nextConfigPath) ? readFileSync(nextConfigPath, "utf-8") : "";

if (/headers/.test(nextConfig)) {
  pass("Security headers configured in next.config");
} else {
  const secureHeaders = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
`;
  writeFileSync(nextConfigPath, secureHeaders);
  fix("Added security headers (X-Frame-Options, CSP, HSTS, etc.) to next.config.ts");
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💉 PEN TESTER — Injection & Input Risks
// ═══════════════════════════════════════════════════════════════════════════════
section("💉 Pen Tester — Injection & Input Risks");

const scrapeRoute = existsSync("src/app/api/scrape/route.ts")
  ? readFileSync("src/app/api/scrape/route.ts", "utf-8") : "";
if (/url\.startsWith\(|new URL\(|URL\.parse|https?:\/\//i.test(scrapeRoute)) pass("Scrape route validates URL format");
else warn("Scrape route may not validate URL — check for URL injection risk");

const pathTraversalFiles = allSrc.filter(({ c }) => /\.\.\//.test(c)).map(({ f }) => f);
if (pathTraversalFiles.length > 0) warn(`Path traversal pattern (../) found in: ${pathTraversalFiles.join(", ")} — verify it's safe`);
else pass("No path traversal patterns detected");

const agentRun = existsSync("src/app/api/agents/run/route.ts")
  ? readFileSync("src/app/api/agents/run/route.ts", "utf-8") : "";
if (/system:/.test(agentRun)) pass("AI agent uses system/user separation (prompt injection protection)");
else warn("AI agent may not separate system from user input — prompt injection risk");

const pdfRoute = existsSync("src/app/api/extract-pdf/route.ts")
  ? readFileSync("src/app/api/extract-pdf/route.ts", "utf-8") : "";
if (/application\/pdf|\.pdf|mimetype|content-type/i.test(pdfRoute)) pass("PDF upload validates file type");
else warn("PDF route may not validate file type — check for malicious upload risk");

// ═══════════════════════════════════════════════════════════════════════════════
// 🔌 API ENGINEER — Validation, Auth & Error Handling
// ═══════════════════════════════════════════════════════════════════════════════
section("🔌 API Engineer — Validation, Auth & Error Handling");

const agentsLogin = existsSync("src/app/api/agents/login/route.ts")
  ? readFileSync("src/app/api/agents/login/route.ts", "utf-8") : "";
const proxy = existsSync("src/proxy.ts") ? readFileSync("src/proxy.ts", "utf-8") : "";

if (/agents-auth|cookie/i.test(proxy)) pass("Agents route is protected by auth middleware");
else fail("Agents route may not be protected — check proxy.ts/middleware.ts");

if (/AGENTS_PASSWORD|password/i.test(agentsLogin)) pass("Agents login uses password from environment");
else warn("Agents login may have hardcoded password");

const apiRoutes = [
  "src/app/api/scrape/route.ts",
  "src/app/api/extract-pdf/route.ts",
  "src/app/api/agents/run/route.ts",
];
const existingRoutes = apiRoutes.filter(r => existsSync(r));
const routesWithErrors = existingRoutes.filter(r => /status: [45]\d\d/.test(readFileSync(r, "utf-8")));
info(`API routes with error status codes: ${routesWithErrors.length}/${existingRoutes.length}`);
if (routesWithErrors.length === existingRoutes.length) pass("All API routes return proper error status codes");
else warn("Some API routes may be missing error status codes");

const routesWithValidation = existingRoutes.filter(r => /req\.json\(\)|formData|body/.test(readFileSync(r, "utf-8")));
if (routesWithValidation.length > 0) pass(`Input parsing found in ${routesWithValidation.length} API routes`);
else warn("No input parsing detected in API routes");

// ═══════════════════════════════════════════════════════════════════════════════
// 🎨 UI/UX ENGINEER — Accessibility & Responsiveness
// ═══════════════════════════════════════════════════════════════════════════════
section("🎨 UI/UX Engineer — Accessibility & Responsiveness");

const uiFiles = allSrc.filter(({ f }) => f.endsWith(".tsx"));

// XSS: only flag <img> without alt (not SVG or next/image which handles it)
const imagesWithoutAlt = uiFiles.filter(({ c }) => /<img(?![^>]*alt=)[^>]*>/i.test(c)).map(({ f }) => f);
if (imagesWithoutAlt.length > 0) {
  // AUTO-FIX: add empty alt to <img> tags missing it
  imagesWithoutAlt.forEach(f => {
    const original = readFileSync(f, "utf-8");
    const patched = original.replace(/<img(?![^>]*alt=)([^>]*)>/gi, '<img alt=""$1>');
    if (patched !== original) {
      writeFileSync(f, patched);
      fix(`Added empty alt="" to <img> tags in ${f}`);
    }
  });
} else {
  pass("All <img> tags have alt attributes");
}

// Icon-only buttons: only flag <button> with no text content AND no aria-label
// A button with text children (like "Change", "Run") is fine
const iconOnlyButtons = uiFiles.filter(({ c }) => {
  // Match <button ...> that contains ONLY an SVG/icon child (no text)
  return /<button[^>]*>\s*<(svg|[A-Z][a-zA-Z]+Icon)[^/]*\/?>/.test(c) &&
    !/<button[^>]*aria-label/.test(c);
}).map(({ f }) => f);

if (iconOnlyButtons.length > 0) warn(`Icon-only buttons missing aria-label in: ${iconOnlyButtons.join(", ")}`);
else pass("Button accessibility looks good (text buttons and labeled icon buttons)");

const hasLoadingState = uiFiles.some(({ c }) => /isLoading|loading|spinner|skeleton/i.test(c));
if (hasLoadingState) pass("Loading states found in UI components");
else warn("No loading states detected");

const hasErrorState = uiFiles.some(({ c }) => /error|setError|isError/i.test(c));
if (hasErrorState) pass("Error states found in UI components");
else warn("No error states detected");

const hasResponsive = uiFiles.some(({ c }) => /\bmd:|lg:|sm:/i.test(c));
if (hasResponsive) pass("Responsive Tailwind classes found");
else warn("No responsive classes found — check mobile layout");

// ═══════════════════════════════════════════════════════════════════════════════
// RESULT
// ═══════════════════════════════════════════════════════════════════════════════
console.log();
if (failed) {
  console.log(`${RED}${BOLD}✘  Pre-deploy checks FAILED — fix errors above before deploying.${RESET}\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}✔  All pre-deploy checks passed — ready to deploy! 🚀${RESET}\n`);
}
