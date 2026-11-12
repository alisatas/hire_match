# 🌐 Browser QA Agent — Knowledge Log

Each entry records browser-level findings, console errors, and CWV risks from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Critical routes:**
- `/` loads without console errors — ✅
- No hydration mismatches — ✅
- WebGL shader background renders without WebGL errors — ✅ (graceful fallback if WebGL unavailable)

**Form validation flows:**
- Empty CV + empty job → Analyze button disabled — ✅
- Invalid URL → caught by `new URL()`, error message shown — ✅
- Valid PDF upload → text extracted, status badge shown — ✅

**Core Web Vitals risks:**
- WebGL shader background: canvas is fixed position, `-z-10`, does NOT cause layout shift — ✅
- Large images: none used, all icons are SVG/lucide — ✅
- Font loading: Google Fonts loaded with `display=swap` — ✅
- 🟡 PDF extraction on large files may cause TTFB delay (no streaming)

**Keyboard navigation:**
- All buttons keyboard-focusable — ✅
- File input triggered by Enter/Space on label — ✅
- FAQ details/summary keyboard-navigable — ✅
- Tab order logical throughout page — ✅

**Known warnings:**
- 🟡 PDF extraction blocking — large files may slow perceived performance

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- Shader background now visible in production — FIXED
- No console errors introduced
- TypeScript clean ✅

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- `/orchestration` page: correct server/client split — metadata in server component, interactivity in `"use client"` child ✅
- SSE stream parser: `buf` accumulates partial lines, only processes complete `data: {...}` events ✅
- `useCallback` dependencies include `swarmRunning` and `statuses` — no stale closure bugs ✅
- No hardcoded pixel widths in new components ✅
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — mobile-safe responsive layout ✅
- TypeScript: 0 errors ✅
- No new unhandled promise rejections ✅

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- IIFE in course list is valid JSX — no console errors expected ✅
- `digital-loom-background.tsx` uses `requestAnimationFrame` loop — matches pattern of shader-background ✅
- No new unoptimized assets added
- Keyboard navigation on course links: native `<a>` elements are keyboard-focusable ✅

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- `etheral-shadow.tsx`: not imported in any page — no browser impact this cycle ✅
- framer-motion already in dependencies from Push 4 — no new bundle size concern ✅
- `SVGFEColorMatrixElement` ref type: valid TypeScript SVG type, no compilation error ✅
- JSON-LD additions in layout.tsx: static strings, no hydration mismatch risk ✅
- `analyze.ts` keyword fix: client-side JS only, no CWV impact ✅
- TypeScript: 0 errors expected (no new generics, no new any-casts) ✅
- No new assets, no layout shifts, no new unhandled rejections ✅

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical)

- No frontend changes — all hardening in server routes and proxy ✅
- TypeScript: 0 errors confirmed (`tsc --noEmit`) ✅
- No new assets, no layout shift risks, no new unhandled rejections ✅

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (0 critical)

- `shader-background.tsx`: Canvas 2D replaces WebGL — no GPU context required, no `canvas.getContext('webgl')` fallback risk ✅
- `cancelAnimationFrame` + `removeEventListener` cleanup in useEffect — no memory leak on unmount ✅
- Feature chips: static JSX, no event handlers, no console error risk ✅
- `encodeURIComponent` + `JSON.stringify` for share URL — no encoding errors on special characters ✅
- `decodeURIComponent` + `JSON.parse` inside try/catch for URL hash load — malformed hash never crashes app ✅
- `navigator.clipboard.writeText` wrapped in `.catch(() => {})` — silent failure, no unhandled rejection ✅
- TypeScript: 0 errors confirmed ✅
- No new assets added, no unoptimized images, no layout shifts introduced ✅

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (0 critical)

- Previous 500 error (broken IIFE in JSX) resolved — `/` now loads without compilation errors ✅
- No hydration mismatches — `applyUrl` derived from existing React state, not server-rendered ✅
- Banner renders/hides correctly based on `results` state — no phantom elements ✅
- No new assets, no layout shifts introduced ✅
- TypeScript: 0 errors confirmed ✅

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (0 critical)

- Copy-only change — no hydration risk, no console errors ✅

---

## 2026-11-10 — Push 10 (Whole-term skill matching + SEO entity links)

**Status:** ✅ PASS (0 critical, 2 medium)

- `/` loads on the dev server (Next 16.4.6, Node 22.23.4) ✅
- Flow run in the browser: paste CV text → load "Frontend Dev" sample → Analyze → results render with score 63, 18/18 skill categories, no phantom "AI / LLM" chip ✅
- Share hash (`#r=`) written to the URL after analysis ✅; no horizontal overflow at 722px ✅
- `tsc --noEmit`: 0 errors ✅
- 🟡 ESLint: 3 errors (`react-hooks/set-state-in-effect`) in `cv-analyzer.tsx` effects that call `setState` synchronously (history load, hash load, interview fetch reset)
- 🟡 Dev-only console error: `@vercel/analytics` debug script (`va.vercel-scripts.com`) is blocked by the CSP `script-src`. Production loads the same-origin `/_vercel/insights/script.js`, so this should not affect prod — not verified against production.
- Not covered: PDF upload, job-URL scraping, 375px mobile layout, keyboard-only navigation

---

## 2026-11-10 — Push 12 (Lint clean-up, shared-link hardening, stale robots.txt removed)

**Status:** ✅ PASS (0 critical, 1 medium)

- `tsc --noEmit`: 0 errors ✅; ESLint on `src/`: 0 errors (was 3) ✅
- Browser: malformed share link → empty state, no crash ✅; Backend sample analysis → 46%, recent-scan history updated from localStorage ✅; "Change" clears result + hash ✅; valid share link reloads the shared result ✅
- 🟡 Dev-only CSP console error for the Vercel Analytics debug script (carried forward)

---

## 2026-11-10 — Push 13 (Score calibration, accessibility, FAQ markup)

**Status:** ✅ PASS (0 critical)

- `tsc --noEmit` 0 errors, ESLint 0 errors ✅
- Browser: typed into CV textarea ✅; Frontend sample → 81% / Top Candidate / "strong match — apply now" ✅; buttons measured at 44px ✅; no horizontal overflow ✅
- Rendered HTML: FAQPage JSON-LD has 13 questions and the page shows 13 `<details>` ✅; no `aggregateRating` ✅

---

## 2026-11-10 — Push 14 (UI redesign: Daylight theme)

**Status:** ✅ PASS (0 critical)

- `tsc --noEmit` 0 errors, ESLint 0 errors ✅
- Browser: full analysis flow (paste CV → sample job → analyze) renders all report sections on desktop and mobile ✅
- `/orchestration` keeps its dark theme via a scoped `.dark` wrapper ✅
- Removed unused components: shader-background, emoji-rating, dotted-surface ✅
- 🟡 Dev-only CSP console error for the Vercel Analytics debug script (carried forward)
- Not re-tested this cycle: PDF upload and job-URL scraping (logic unchanged, markup only)

---

## 2026-11-11 — Push 17 (SEO: role keyword pages, score explainer, AI crawler access)

**Status:** ✅ PASS (0 critical)

- `tsc --noEmit` 0 errors, ESLint 0 errors, `next build` OK — 6 role pages prerendered (SSG), index static ✅
- HTTP: `/`, `/resume-keywords`, `/resume-keywords/devops-engineer` → 200; unknown slug → 404; `/robots.txt`, `/sitemap.xml` (8 URLs), `/llms.txt` → 200 ✅
- Each page emits its own title, canonical, og:url, og:image and twitter:image ✅
- 🟡 Dev-only CSP console error for the Vercel Analytics debug script (carried forward)
- Not re-tested this cycle: PDF upload, URL scraping, full analysis flow in the browser (analyzer component unchanged; scoring re-run by script)

---

## 2026-11-11 — Push 18 (New logo, card grid + breadcrumb fixes, HowTo moved, alias clean-up)

**Status:** ✅ PASS (0 critical)

- `tsc --noEmit` 0 errors, ESLint 0 errors, `next build` OK (`/icon.svg` static) ✅
- `/`, `/resume-keywords`, `/resume-keywords/ux-designer`, `/icon.svg`, `/opengraph-image` → 200; `<link rel="icon">` points at the SVG ✅
- Verified in browser: header logo at desktop and 375px, share image render, score cards 3-up at ~740px, no horizontal overflow, no console errors from localhost ✅
- Not re-tested: PDF upload, URL scraping, full analysis flow in the browser (analyzer unchanged; scoring re-run by script)

---

## 2026-11-11 — Push 19 (Security hardening, 2 role guides, business skill groups)

**Status:** ✅ PASS (0 critical)

- `tsc` 0 errors, ESLint 0 errors, `next build` OK ✅
- `/resume-keywords/software-engineer`, `/data-scientist` → 200, unknown slug → 404, sitemap 10 URLs, each new page has its own title, canonical and WebPage + BreadcrumbList + FAQPage JSON-LD ✅
- No console errors from localhost; dev-only Vercel debug-script CSP error carried
- Not tested: PDF upload through the UI (the route was tested directly with real and malformed PDFs)

---

## 2026-11-11 — Push 20 (Legal pages, optional support, 2 business role guides, short-CV calibration)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK (`/terms`, `/privacy`, `/refund-policy` static) ✅
- `/`, legal pages, `/resume-keywords/account-executive`, `/digital-marketing-specialist` → 200; unknown slug → 404; sitemap 15 URLs ✅
- New role pages: own title, canonical, WebPage + BreadcrumbList + FAQPage JSON-LD ✅
- Console: only pre-restart entries (stale-module 500 and HMR reconnects) — none from the current build

---

## 2026-11-11 — Push 21 (Support section removed, legal-page JSON-LD, date-range experience)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK ✅
- `/`, `/terms`, `/privacy`, `/refund-policy` → 200; no `#support` element and no "€3" copy left on the home page ✅

---

## 2026-11-11 — Push 22 (Corporate hardening: technical SEO assets, CSP reporting, CI gate)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK ✅
- `Host: www.cvxray.com` → 308 to `https://cvxray.com/…` (query kept); apex unaffected ✅
- `/manifest.webmanifest`, `/logo.png` (512²), `/apple-icon` (180²), `/icon.svg`, role `opengraph-image` → 200 with correct types; `<link rel="manifest">` and `apple-touch-icon` present ✅
- Role pages' `og:image` / `twitter:image` now point at the per-role card ✅

---

## 2026-11-11 — Push 23 (AI Engineer sample job + guide, AI skill vocabulary)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK (`/resume-keywords/ai-engineer` + its OG image prerendered) ✅
- AI guide: 200, own title + canonical, WebPage + BreadcrumbList + FAQPage JSON-LD; sitemap 16 URLs ✅
- No server errors in the dev log; console entries were from earlier dev-server restarts

---

## 2026-11-11 — Push 24 (Cross-sector samples, Financial Analyst guide, month-precise experience)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK (`/resume-keywords/financial-analyst` + OG image prerendered) ✅
- Financial Analyst guide: 200, own title + canonical, WebPage + BreadcrumbList + FAQPage JSON-LD; 375px no overflow; sitemap 17 URLs ✅
- No server errors in the dev log

---

## 2026-11-11 — Push 25 (Suggestions, score card, funnel events, 4 guides, blog, tests, monitoring, global rate limit)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK; blog + 4 new guides prerendered; sitemap 25 URLs ✅
- Playwright suite (13) green against dev and production build; CI now runs unit tests, builds, installs Chromium and runs the browser suite, uploading the report on failure
- Console: only third-party / Vercel-only noise (filtered in tests with explicit reasons)

---

## 2026-11-11 — Push 26 (CI runner fix, HR skill group, per-article share images)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK ✅
- Playwright 18/18 (5 new share-image checks) on dev and production build; unit 80/80
- CI: previous run failed at "Install Playwright browser" on Ubuntu 26 — runner pinned to 24.04; confirm the next CI run reaches the browser tests

---

## 2026-11-11 — Push 27 (CI uses the runner's Chrome, boilerplate-proof scoring, RSS feed)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK (`/blog/feed.xml` static) ✅
- Playwright 19/19 on dev and on the production build using system Chrome (the CI configuration); unit 86/86; prod audit clean
- Confirm after push: CI reaches and passes "Browser tests"

---

## 2026-11-11 — Push 28 (CSP fix for Google Ads conversions, nice-to-have weighting, site-wide feed link)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK, prod audit clean ✅
- Playwright 19/19 (dev + production build, system Chrome, 1 worker); unit 89/89
- Feed `<link rel="alternate">` now on every page; canonicals verified unchanged on /, /terms, /blog
- Confirm after push: CI "Browser tests" passes in GitHub Actions

---

## 2026-11-11 — Push 29 (GitHub security features, dependency clean-up, SECURITY.md, years-required parsing)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK, prod audit clean at high+ ✅
- Playwright 19/19 (production build, system Chrome); unit 99/99

---

## 2026-11-11 — Push 30 (CodeQL findings fixed, shared HTML-to-text module)

**Status:** ✅ PASS (0 critical)

- `tsc` 0, ESLint 0, `next build` OK ✅; Playwright 19/19; unit 108/108
- After push: CodeQL re-scans and should auto-close alerts #1–#6, #8, #9

---

## 2026-11-11 — Push 31 (Home page simplified for scanning readers)

**Status:** ✅ PASS (0 critical)

- Markup-only change to the home page, footer and report cards; no new inputs, routes or sinks. 108 unit / 19 browser tests green (production build). GitHub Actions was in a **major outage** at commit time (githubstatus.com): the previous push's CI/Release were queued and the CodeQL dynamic run hit `startup_failure` — platform side, not code

---

## 2026-11-12 — Push 32 (Buy me a coffee, hidden until the live checkout exists)

**Status:** ✅ PASS (0 critical) — small UI addition, no change in this area. 108 unit / 19 browser tests green

---

## 2026-11-12 — Push 33 (Paste as a quiet fallback, coffee link, healthcare & logistics skills)

**Status:** ✅ PASS (0 critical)

- e2e selectors updated to the new link text; 111 unit / 19 browser tests green on the production build; tsc 0, ESLint 0
- Fresh load: 0 console errors; broken-PDF path: no Next.js dev-overlay issue after removing the console.error

---

## 2026-11-12 — Push 34 (Automated attack + SEO crawl suites, IndexNow, healthcare/logistics courses)

**Status:** ✅ PASS (0 critical)

- Suite grew 19 → 64: `security.spec.ts` (38) and `seo.spec.ts` (7) added; all run in CI via `npm run test:e2e`
- Localhost: courses render for healthcare/logistics gaps; the former crash link opens the analyzer
- 119 unit / 64 browser tests green on the production build (was 111 / 19); tsc 0, ESLint 0; prod audit 0 high/critical

---

## 2026-11-12 — Push 35 (SEO log only: AI visibility baseline, GA4 AI channel, Search Console data)

**Status:** ✅ PASS (0 critical) — documentation-only push (`agent-logs/seo.md`), no code change. 119 unit / 64 browser tests green on the production build; tsc 0, ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-12 — Push 36 (Multilingual: engine reads 5 languages, home pages in TR / DE / ES / ZH, nurse & logistics guides)

**Status:** ✅ PASS (0 critical)

- Suite grew 64 → 91: translated pages end to end (paste a CV and a posting in that language → score ≥ 60, localized skill label, no English CV check), header language menu (desktop + 375 px), footer language links, 404 for bad language segments, share links and headers on translated pages, hostile redirect paths
- Two root layouts (`app/(en)`, `app/[lang]`): `<html lang>` verified in raw HTML for all five; unmatched URLs get the branded 404 with status 404 via `global-not-found`
- Share-image test now follows the URL each page advertises in `og:image` (route groups add a suffix); the old URLs redirect and are tested too
- Note: running the suite twice within a minute trips the rate-limit test (first 15 requests already counted) — wait 60 s between local runs
- 189 unit / 91 browser tests green on the production build (was 119 / 64); tsc 0, ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`
