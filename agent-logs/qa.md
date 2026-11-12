# 🧪 QA Agent — Knowledge Log

Each entry records findings, edge-case tests, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Data integrity checks:**
- `analyze()` returns `matched: []` and `missing: []` → UI renders empty sections gracefully — ✅
- `results.topJobSignals` empty → keywords section hidden — ✅
- `results.score` = 0 → SVG strokeDashoffset = 283 (full circle) renders correctly — ✅
- `results.score` = 100 → strokeDashoffset = 0 renders correctly — ✅
- PDF returning 100% whitespace → triggers "no text extracted" error, does NOT pass empty string to `analyze()` — ✅

**Race conditions & async:**
- 🟡 Double-click "Analyze" can queue two concurrent analyses — stale results possible (not blocking, no crash)
- `setIsLoading(false)` called in finally block, so abandoned requests always unlock UI — ✅
- PDF handler uses `pdfStatus` state to indicate in-progress; second upload overwrites safely — ✅

**LocalStorage:**
- `try/catch` wraps all localStorage reads and writes — ✅
- Malformed JSON from `JSON.parse` is caught and returns empty array — ✅

**Edge inputs:**
- CV text of 1 character: `analyze()` returns score ~5 (floor), no division-by-zero — ✅
- Job description with only stop words: `rawTotal = 0` → `keywordScore = 0` correctly without division-by-zero (guarded by `|| 0`) — ✅
- URL `http://` (no domain): rejected by `new URL()` parse before reaching scraper — ✅

**Fixed this cycle:**
- Next Steps amber tier (45-69%): was showing "close 0 gaps" when `highGaps.length === 0` — fixed to show "Good match — apply and highlight your strengths" instead

**Known warnings:**
- 🟡 Race condition on double-click Analyze — low severity, no data corruption

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- WebGL canvas hidden in production — FIXED: body was opaque (#0d0b1a), changed to transparent
- Analyze button invisible in disabled state — FIXED: now uses teal gradient at opacity-50
- Panel readability — FIXED: bg-background/40 → bg-background/75
- Flash on refresh still prevented: html keeps #0d0b1a inline style ✅
- No regressions in analyze flow, results display, or HR Quick Scan

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- Swarm SSE stream: `controller.close()` called after all agents complete — loading state never stuck ✅
- Per-agent `try/catch` in swarm loop: one agent error doesn't crash the full swarm stream ✅
- Single agent mode: `toTextStreamResponse()` handles Anthropic errors gracefully ✅
- Client-side error catch: sets status → "error", appends `[Error: ...]` — always shows feedback ✅
- `statuses[agentKey] === "running"` guard prevents concurrent runs on same agent ✅
- Empty swarm input `[]` → filtered to `valid` → returns 400 before any processing ✅
- `outputRef.current` null-checked before auto-scroll ✅
- TypeScript: 0 errors after fixing `maxOutputTokens` (was `maxTokens`) and removing spurious `await` ✅

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- Course list IIFE: `highPriorityGaps` correctly counts only skills with a resource entry ✅
- `courseLimit = Math.min(Math.max(6, highPriorityGaps + 2), 10)` — floor 6, ceiling 10 ✅
- `})()}` closure correct, TypeScript 0 errors confirmed ✅
- `digital-loom-background.tsx`: useEffect returns cleanup (cancelAnimationFrame + removeEventListener) ✅
- New `Thread` class: constructor initialises all fields before `reset()` — no strict-mode issues ✅
- Orchestration SSE stream: cleanup paths unchanged from Push 3 ✅

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- `etheral-shadow.tsx`: component is purely presentational — no data flow, no user input ✅
- framer-motion cleanup: `hueRotateAnimation.current?.stop()` called in useEffect return — no memory leak ✅
- `animationEnabled` guard: SVG filter only rendered when `animation.scale > 0` — no crash on undefined animation ✅
- 🟡 SVG filter graph ordering: `feColorMatrix in="dist"` references a result produced by a later primitive. Browser fallback handles this silently (no crash), but visual output may differ from design intent. Non-blocking — cosmetic only.
- `analyze.ts` keyword fix: `w.length >= 4` now includes "java", "rust", "html", "node" in keyword scoring — calibration improvement, no data integrity risk ✅
- No new async flows, no new loading states, no new localStorage access ✅
- All previous QA checks unchanged ✅

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical)

- `analyze()` now throws on >200KB CV or >100KB JD — UI users cannot hit this (PDF capped at 150KB, pasting 200KB manually impossible) ✅
- Rate limiting (429): existing catch blocks in UI surface the error correctly ✅
- `extract-pdf` text cap at 150KB: `analyze()` receives truncated but valid text — no parsing errors ✅
- No new async flows introduced; all existing loading/error states unchanged ✅
- 🟡 Telegram bot does not pre-check text length before calling analyze() — throw would propagate; low risk as 200KB Telegram input is pathological

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (0 critical)

- `shader-background.tsx`: Canvas 2D, `cancelAnimationFrame` + `removeEventListener` in cleanup — no memory leak ✅
- `initDots()` called inside `resize()` which runs on mount — correct initialization order ✅
- `encodeResults` / `decodeResults`: both guarded by try/catch, return "" / null on failure — ✅
- URL hash loading useEffect: only fires on mount, skips if hash absent or malformed — ✅
- Share button: only rendered inside `{results && ...}` block — `results` always non-null when called ✅
- "Copy all" button: `navigator.clipboard.writeText(...).catch(() => {})` — failure silent but not blocking ✅
- Feature chips: non-interactive, flex-wrap — no logic, no crash vector ✅
- Missing skill sort: now priority-first then frequency — no division-by-zero, no null access ✅
- TypeScript: 0 errors confirmed ✅

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (0 critical)

- `applyUrl = jobUrl || (validUrl ? jobInput.trim() : "")` — correctly handles all states:
  - No URL entered: `applyUrl = ""` → banner shows "Paste a job URL on the left to enable" ✅
  - URL typed but not yet fetched: `validUrl = true` → `applyUrl = jobInput.trim()` ✅
  - URL fetched successfully: `jobUrl` set by scraper → `applyUrl = jobUrl` ✅
- Banner only renders when `results` is truthy — no phantom banner on empty state ✅
- Apply Now button: active `<a>` link when URL present, greyed `<div>` when not — correct state handling ✅
- No division by zero, no null crashes in new code ✅
- All previous edge input guards unchanged ✅
- TypeScript: 0 errors confirmed ✅

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (0 critical)

- expNote fix: `yearsOnCV === 0` now renders "experience not stated on CV" — no null/crash risk ✅
- All edge input paths and loading states unchanged ✅

---

## 2026-11-10 — Push 10 (Whole-term skill matching + SEO entity links)

**Status:** ✅ PASS (0 critical, 3 medium)

- New `countAlias()` in `analyze.ts`: `indexOf` loop always advances by `alias.length` (≥ 1) — no infinite loop; out-of-range index reads return `undefined`, handled by `isAlnum()` ✅
- Division guards unchanged: `totalSkillWeight > 0`, `totalKwWeight > 0`, `criticalTotal.length > 0` ✅
- Verified by running the engine (old vs new) on 6 sample jobs × 4 CVs: no NaN, all scores within [5, 95] ✅
- 🟡 Shared-result links (`#r=`): `decodeResults` does not validate shape. A hash that is valid JSON but lacks `m` (e.g. `#r={"ms":[],"ts":[]}`) sets `results.matched = undefined` and the render crashes on `.length`/`.slice`. Guard with `Array.isArray` checks.
- 🟡 CV "Paste text instead": the textarea is rendered only while `cvText` is empty, so typing the first character swaps it for the "CV loaded" badge. Pasting works; typing does not.
- 🟡 `fetchJobPost` has no stale-request guard — clearing/changing the URL mid-fetch still applies the old response (carried forward)

- `tsc --noEmit`: 0 errors ✅ (Node 22.23.4). ESLint: 3 errors, all `react-hooks/set-state-in-effect` in `cv-analyzer.tsx` (lines 313, 322, 329) — not from this cycle's changes; the husky hook treats ESLint as non-blocking.

---

## 2026-11-10 — Push 12 (Lint clean-up, shared-link hardening, stale robots.txt removed)

**Status:** ✅ PASS (0 critical, 1 medium)

- Shared-link crash fixed: `decodeResults` now validates every field it reads; a hash like `#r={"ms":[],"ts":[]}` falls back to the empty state instead of crashing (verified in the browser) ✅
- Interview fetch now has a stale-response guard (`cancelled` flag) and only refetches when the detected company changes ✅
- History load validates the stored array shape; malformed localStorage no longer reaches render ✅
- "Change" now also clears the `#r=` hash, so a reset never brings back the previous result ✅
- 🟡 CV textarea still swaps to the "CV loaded" badge after the first typed character (carried forward)

---

## 2026-11-10 — Push 13 (Score calibration, accessibility, FAQ markup)

**Status:** ✅ PASS (0 critical)

- Typing into the CV textarea keeps focus and value (previously unmounted after one character) ✅
- Score tier boundaries consistent across `analyze.ts` and `cv-analyzer.tsx` — no "Strong Contender" next to a "close gaps" card ✅

---

## 2026-11-10 — Push 14 (UI redesign: Daylight theme)

**Status:** ✅ PASS (0 critical)

- Markup-only rewrite of the analyzer: state, handlers and analysis logic unchanged ✅
- Apply link now shown inside the recommendation only when a job URL exists (no disabled placeholder banner) ✅

---

## 2026-11-11 — Push 17 (SEO: role keyword pages, score explainer, AI crawler access)

**Status:** ✅ PASS (0 critical)

- New pages are static server components with no state or async paths; unknown role slug → 404 (verified) ✅
- Header/footer extracted to `site-chrome.tsx` and shared by all pages; home nav anchors changed to `/#…` links so they work from sub-pages ✅
- `analyze()` title change: empty job text → `split()[0]` is `""` → no title skills, no crash ✅
- Analyzer component untouched this cycle

---

## 2026-11-11 — Push 18 (New logo, card grid + breadcrumb fixes, HowTo moved, alias clean-up)

**Status:** ✅ PASS (0 critical)

- Alias change only narrows matching; empty / non-technical job text still returns a valid result (sales job → 0 skills detected, score 10, no crash) ✅
- Home page "How it works" still renders 3 steps; HowTo steps are generated from the same `STEPS` array, so markup and structured data cannot drift ✅
- Analyzer component untouched

---

## 2026-11-11 — Push 19 (Security hardening, 2 role guides, business skill groups)

**Status:** ✅ PASS (0 critical)

- Scrape client handles the new status codes (400 / 415 / 502) — it only reads `data.text`; 429 plain text still lands in the catch ✅
- Full analyze flow in the browser after the security changes: paste CV → job URL fetched → report rendered, no console errors ✅
- New skill groups all have labels; generic-alias regressions checked ("dashboards" in a frontend post, "Google Analytics" in the analyst sample) and fixed ✅

---

## 2026-11-11 — Push 20 (Legal pages, optional support, 2 business role guides, short-CV calibration)

**Status:** ✅ PASS (0 critical)

- Support button has two states: active link when the checkout URL is set, inert "Support payments open soon" otherwise (verified) ✅
- Refund page drops the email bullet cleanly when no contact email is configured ✅
- Dev incident: after appending `SUPPORT` to `site.ts`, the dev server served a stale module (`SUPPORT` undefined → 500 on `/`, `/terms`, `/refund-policy`). `tsc` and `next build` were clean; a dev-server restart fixed it. Not a production risk

---

## 2026-11-11 — Push 21 (Support section removed, legal-page JSON-LD, date-range experience)

**Status:** ✅ PASS (0 critical)

- Home page renders without the support section; no leftover `SUPPORT` import ✅
- `yearsFromDateRanges`: 9 cases pass (present/heden/since, month names, education lines skipped, phone numbers and future years ignored, multiple ranges → earliest start to latest end)

---

## 2026-11-11 — Push 22 (Corporate hardening: technical SEO assets, CSP reporting, CI gate)

**Status:** ✅ PASS (0 critical)

- `yearsFromDateRanges` now merges periods: 12 parser cases pass (career break 2005–2010 + 2020–now → 11, overlapping freelance not double-counted, adjacent jobs merged)
- CSP report endpoint: 204 valid legacy / Reporting API bodies, 415 wrong type, 400 bad JSON ✅
- Custom 404 returns a real 404 status with `noindex` ✅

---

## 2026-11-11 — Push 23 (AI Engineer sample job + guide, AI skill vocabulary)

**Status:** ✅ PASS (0 critical)

- "AI Engineer" is the first sample button and loads as "Sample job: AI Engineer" (verified in the browser) ✅
- New groups `vectordb`, `mlops` have labels and course entries ✅
- False-positive sweep on non-AI posts (sales, finance, operations, recruiting): bare "fine tuning" flagged AI on a sales post ("fine tuning your pitch") — replaced with model-specific phrases; re-tested clean ✅

---

## 2026-11-11 — Push 24 (Cross-sector samples, Financial Analyst guide, month-precise experience)

**Status:** ✅ PASS (0 critical)

- Samples: UX Designer removed; Account Executive, Digital Marketer, Financial Analyst added; order alternates tech / business; "Financial Analyst" loads as "Sample job: Financial Analyst" (verified) ✅
- `yearsFromDateRanges` month precision: 17 cases pass (English + Dutch months, numeric "03/2018", unknown words before a year ignored, one-month job = 0.2)
- Dev-only: a new role slug 404'd once until the dev server picked up the updated list; production build prerenders it

---

## 2026-11-11 — Push 25 (Suggestions, score card, funnel events, 4 guides, blog, tests, monitoring, global rate limit)

**Status:** ✅ PASS (0 critical)

- **Automated tests now exist**: `npm test` (vitest, 76 tests: calibration bands, priority ordering, 6 generic-word false positives, 10 date-range cases, suggestions, SSRF, scrubbing) and `npm run test:e2e` (Playwright, 13 tests: analyzer flow, score card PNG download, 8 pages render + JSON-LD + canonical, real 404, API guards). Both green locally on the dev server and on a production build (CI mode)
- Found while testing: desktop Chrome on macOS opened the system share sheet for the score card (hang) → share sheet now only on touch devices, desktop downloads
- Found while testing: `upgrade-insecure-requests` would break the CI production build on http://localhost → Vercel-only
- Suggestions only appear for a live analysis (shared links have no CV text) and reset with the result

---

## 2026-11-11 — Push 26 (CI runner fix, HR skill group, per-article share images)

**Status:** ✅ PASS (0 critical)

- Found while adding per-article OG images: the image renderer rejects a `div` with two text children (500). Fixed, and the suite now checks that every share image endpoint (site, role, article, logo, apple icon) returns a PNG — this class of bug is caught automatically from now on
- 80 unit tests, 18 browser tests — green on dev and on a production build (CI mode)

---

## 2026-11-11 — Push 27 (CI uses the runner's Chrome, boilerplate-proof scoring, RSS feed)

**Status:** ✅ PASS (0 critical)

- 86 unit tests (+6: boilerplate invariance incl. boilerplate 4× longer than the job, section resume after "About the role", Dutch headings, no-heading fallback), 19 browser tests (+RSS)
- Exactly the CI sequence verified locally: audit → typecheck → lint → unit → build → Chrome check → browser tests on the production build
- Note for future edits: write regex-bearing TS through heredocs or raw strings, never Python non-raw strings

---

## 2026-11-11 — Push 28 (CSP fix for Google Ads conversions, nice-to-have weighting, site-wide feed link)

**Status:** ✅ PASS (0 critical)

- The e2e analyzer test's CV covered every required skill, so after the nice-to-have change its only gaps were low priority and the suggestions section (high/medium only) correctly disappeared. CV now omits two required skills (Redux, GraphQL)
- 89 unit tests (+3 nice-to-have), 19 browser tests — green on dev and CI-mode production build

---

## 2026-11-11 — Push 29 (GitHub security features, dependency clean-up, SECURITY.md, years-required parsing)

**Status:** ✅ PASS (0 critical)

- vitest 5 runs the suite unchanged: 99 unit tests (+10 years-required cases); Playwright 19/19 on the production build (1 worker, to avoid parallel Chrome windows locally)

---

## 2026-11-11 — Push 30 (CodeQL findings fixed, shared HTML-to-text module)

**Status:** ✅ PASS (0 critical)

- 108 unit tests (+9 html-text / link encoding), 19 browser tests on the production build
- Live smoke tests: scraper still returns clean text (no "<"), interview search returns the same results with old and new code

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

- Paste box opens automatically on too-large and unreadable PDFs; the error stays visible above it in paste mode; 'Upload a PDF instead' returns to the drop zone and keeps the message
- Verified with a deliberately broken PDF in the browser: textarea focused, error shown, no dev-overlay issue
- 111 unit / 19 browser tests green on the production build; tsc 0, ESLint 0

---

## 2026-11-12 — Push 34 (Automated attack + SEO crawl suites, IndexNow, healthcare/logistics courses)

**Status:** ✅ PASS (0 critical)

- Share-link decoding now rejects any field with the wrong type instead of crashing; 7 crafted-link cases in e2e
- PDF route error statuses corrected (400 / 422)
- 119 unit / 64 browser tests green on the production build (was 111 / 19); tsc 0, ESLint 0; prod audit 0 high/critical

---

## 2026-11-12 — Push 35 (SEO log only: AI visibility baseline, GA4 AI channel, Search Console data)

**Status:** ✅ PASS (0 critical) — documentation-only push (`agent-logs/seo.md`), no code change. 119 unit / 64 browser tests green on the production build; tsc 0, ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-12 — Push 36 (Multilingual: engine reads 5 languages, home pages in TR / DE / ES / ZH, nurse & logistics guides)

**Status:** ✅ PASS (0 critical)

- Empty and odd inputs after the Unicode rewrite: `countWords("")` is 0 (was 1 from `"".split`) — no division uses it; 1-character CV, stop-word-only job and whitespace-only text still score without NaN
- Regression guard: all 12 English fixture pairs score exactly as before the language layer
- 🔧 Fixed: a one-line extra ("Nice to have: Kubernetes", "Tercih sebebi: SQL") was dropped as a heading, so its skill was neither required nor optional
- 🔧 Fixed: the CV quality check reported "Weak" for any CV not written in English; it now runs on English CVs only (`looksEnglish`)
- Status texts stay English tokens internally and are translated on display, so the state machine (`startsWith("✓")`, `includes("paste")`) is unchanged
- 🟡 Recent-scans history keeps the label in the language it was saved in (mixed languages if a visitor switches); cosmetic
- 🟡 Very short German postings: compounds count as one word, so the under-50-words damping starts earlier than for the same text in English
- 189 unit / 91 browser tests green on the production build (was 119 / 64); tsc 0, ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`
