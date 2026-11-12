# 🔌 API Agent — Knowledge Log

Each entry records findings, validation checks, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Scrape route (`/api/scrape`):**
- URL validated with `new URL()` parse, not just `startsWith` — ✅
- No maximum URL length check — 🟡 low risk, note for future
- Response body size capped before `response.text()` — ✅ (checked in route)
- `Content-Type` of scraped response validated — 🟡 partial: type checked but not strictly enforced
- 15s `AbortController` timeout present — ✅ (server-side fetch may continue but client gets timeout response)

**Extract-PDF route (`/api/extract-pdf`):**
- File size check (5MB limit) done before `arrayBuffer()` — ✅
- Page count limit not explicitly set — 🟡 very large PDFs could be slow
- Raw `err.message` from `unpdf` NOT returned in response — ✅ (generic error message returned)

**Telegram webhook (`/api/telegram/webhook`):**
- Secret token validated on every request — ✅
- String comparison is NOT constant-time — 🟡 timing attack theoretically possible, low practical risk for webhook secret
- `TELEGRAM_BOT_TOKEN` undefined → route returns 500 safely — ✅
- `after()` background task has error handling — ✅

**Response hygiene:**
- No stack traces returned to caller — ✅
- All error paths return correct HTTP status codes — ✅
- Sensitive endpoints return `Cache-Control: no-store` — ✅

**Known warnings (non-blocking):**
- 🟡 No rate limiting on `/api/scrape` and `/api/extract-pdf`
- 🟡 No constant-time token comparison on webhook (low practical risk)
- 🟡 No explicit URL length cap on scrape route

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- New `/api/orchestrate` route: `agentKey` validated against `AGENTS` object — no uncontrolled access ✅
- `swarm` array filtered with type guard before processing ✅
- Input is minimal JSON (key name only) — no body size risk ✅
- No stack traces in responses — `String(err)` only ✅
- Status codes correct: 400 on bad input ✅
- `maxDuration: 60` set on SSE streaming route ✅
- `runtime: "nodejs"` explicit ✅
- Existing routes (scrape, extract-pdf, telegram) unchanged — all previous API checks still pass ✅
- 🟡 No `Cache-Control: no-store` on orchestrate error responses (low risk, not sensitive data)

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- Content-type validation added to scrape route (diff confirmed) — previously a 🟡 warning, now resolved ✅
- PDF magic bytes validation added to extract-pdf route (diff confirmed) — MIME spoofing guard ✅
- No new API routes added this cycle
- Orchestrate route unchanged from Push 3 ✅

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- No new API routes added this cycle ✅
- `analyze.ts` keyword length fix: arithmetic-only change, no route or response impact ✅
- `layout.tsx` JSON-LD additions: server-rendered static strings, `Cache-Control: no-store` not needed (not a sensitive endpoint) ✅
- All previous API checks (auth, SSRF, rate limiting, body size caps, timeout guards, content-type validation) unchanged ✅

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical)

- `/api/orchestrate`: auth guard with `isAuthorized()` — 401 returned for unauthenticated requests ✅
- `/api/extract-pdf`: text capped at 150KB after extraction — memory exhaustion risk removed ✅
- `/api/tweet`: `AbortSignal.timeout(15_000)` added — no more hanging functions ✅
- `/api/reddit-comment`: `AbortSignal.timeout(10_000)` on both OAuth token fetch and comment post fetch ✅
- `/api/scrape`: 500KB pre-regex HTML cap + lazy script/style patterns — ReDoS risk bounded ✅
- Telegram webhook `after()`: try/catch in both deploy blocks — failures message the user ✅
- All previous API checks (SSRF, content-type, body size cap, magic bytes, stack trace guard) unchanged ✅
- Rate limiting now in `proxy.ts` — all routes covered ✅

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (0 critical)

- `shader-background.tsx` rewritten to Canvas 2D — no API route changes, purely client-side ✅
- `encodeResults` / `decodeResults`: client-side only, URL hash manipulation — no server route impact ✅
- `navigator.clipboard.writeText`: browser API, no server call ✅
- No new API routes added this cycle ✅
- All previous API checks (auth, SSRF, rate limiting, body size caps, timeout guards, content-type validation) unchanged ✅

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle ✅
- `applyUrl` derivation is client-side only — no new server endpoints ✅
- All previous API controls unchanged (auth guards, SSRF blocks, rate limiting, body size caps, timeouts, content-type validation) ✅

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (0 critical)

- No API route changes ✅

---

## 2026-11-10 — Push 10 (Whole-term skill matching + SEO entity links)

**Status:** ✅ PASS (0 critical, 3 medium)

- No API route changes this cycle ✅
- 🟡 `/api/scrape`: redirects followed without re-validating the target host (see security log); `response.text()` reads the whole body when `Content-Length` is absent (chunked responses bypass the 2MB pre-check)
- 🟡 `/api/extract-pdf`: no page-count limit; the 500 path omits `Cache-Control: no-store`
- 🟡 `/api/interview-questions`: no upper bound on `company` length; results whose href contains `duckduckgo.com` are dropped — DuckDuckGo's HTML endpoint commonly wraps result links in a `duckduckgo.com/l/?uddg=` redirect, so this may filter out every result (not verified live)
- `.husky/post-push` is not a real git hook name — git never runs it, so the Instagram/X auto-post does not fire on push

- `tsc --noEmit`: 0 errors ✅ (Node 22.23.4). ESLint: 3 errors, all `react-hooks/set-state-in-effect` in `cv-analyzer.tsx` (lines 313, 322, 329) — not from this cycle's changes; the husky hook treats ESLint as non-blocking.

---

## 2026-11-10 — Push 12 (Lint clean-up, shared-link hardening, stale robots.txt removed)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle ✅

---

## 2026-11-10 — Push 13 (Score calibration, accessibility, FAQ markup)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle ✅

---

## 2026-11-10 — Push 14 (UI redesign: Daylight theme)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle ✅

---

## 2026-11-11 — Push 17 (SEO: role keyword pages, score explainer, AI crawler access)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle; scrape and extract-pdf re-read — size caps, content-type check, SSRF guard and no-store headers unchanged ✅
- 🟡 Carried forward: `/api/interview-questions` has no upper bound on `company` length

---

## 2026-11-11 — Push 18 (New logo, card grid + breadcrumb fixes, HowTo moved, alias clean-up)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle ✅
- 🟡 Carried forward: `/api/interview-questions` has no upper bound on `company` length

---

## 2026-11-11 — Security hardening pass (senior security review of the whole project)

**Status:** ✅ PASS (0 critical)

- `/api/scrape`: SSRF-safe fetch (resolve once + pinned IP), streamed 2 MB cap after decompression, JSON content type required, URL ≤ 2048 chars, all responses `no-store`, upstream errors → generic 502
- `/api/extract-pdf`: `Content-Length` checked before parsing (411/413), 30-page cap, `no-store` on every path incl. 500
- `/api/interview-questions`: bounded company input, http(s)-only result URLs (DDG `uddg` redirects unwrapped — previously every result was dropped), `no-store`. Closes the carried-forward `company` length warning
- `/api/orchestrate`, `/api/reddit-comment`: shared constant-time auth, strict input validation
- Proxy: body-size limits per route, cross-site write blocking

---

## 2026-11-11 — Push 19 (Security hardening, 2 role guides, business skill groups)

**Status:** ✅ PASS (0 critical)

- Route changes are the security pass logged above; all attack cases re-verified against the dev server (SSRF 400, cross-site 403, oversize 413, fake / 40-page PDF 400 / 422, owner routes 401, 429 on the 16th call)
- Closes the carried-forward `/api/interview-questions` company-length warning

---

## 2026-11-11 — Push 20 (Legal pages, optional support, 2 business role guides, short-CV calibration)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle ✅

---

## 2026-11-11 — Push 21 (Support section removed, legal-page JSON-LD, date-range experience)

**Status:** ✅ PASS (0 critical)

- No API route changes ✅

---

## 2026-11-11 — Push 22 (Corporate hardening: technical SEO assets, CSP reporting, CI gate)

**Status:** ✅ PASS (0 critical)

- New `POST /api/csp-report`: content-type checked, 16 KB body cap, proxy cross-site/body/rate limits apply, 204 with no body, `no-store` + CORP via `next.config`

---

## 2026-11-11 — Push 23 (AI Engineer sample job + guide, AI skill vocabulary)

**Status:** ✅ PASS (0 critical)

- No API route changes ✅

---

## 2026-11-11 — Push 24 (Cross-sector samples, Financial Analyst guide, month-precise experience)

**Status:** ✅ PASS (0 critical)

- No API route changes ✅

---

## 2026-11-11 — Push 25 (Suggestions, score card, funnel events, 4 guides, blog, tests, monitoring, global rate limit)

**Status:** ✅ PASS (0 critical)

- New `POST /api/client-error`: JSON body ≤ 8 KB, 204/400/413, proxy cross-site + body-size + rate limits, `no-store` + CORP via config
- `proxy.ts` is now async (Upstash call), unchanged behaviour when Upstash is not configured

---

## 2026-11-11 — Push 26 (CI runner fix, HR skill group, per-article share images)

**Status:** ✅ PASS (0 critical)

- No API route changes ✅

---

## 2026-11-11 — Push 27 (CI uses the runner's Chrome, boilerplate-proof scoring, RSS feed)

**Status:** ✅ PASS (0 critical)

- New static route `GET /blog/feed.xml` (RSS 2.0, `application/rss+xml`); no API changes

---

## 2026-11-11 — Push 28 (CSP fix for Google Ads conversions, nice-to-have weighting, site-wide feed link)

**Status:** ✅ PASS (0 critical)

- No API changes ✅

---

## 2026-11-11 — Push 29 (GitHub security features, dependency clean-up, SECURITY.md, years-required parsing)

**Status:** ✅ PASS (0 critical)

- No API changes ✅

---

## 2026-11-11 — Push 30 (CodeQL findings fixed, shared HTML-to-text module)

**Status:** ✅ PASS (0 critical)

- `/api/scrape` and `/api/interview-questions` use the shared `html-text` helpers; result-source labels now come from the parsed hostname; behaviour otherwise unchanged

---

## 2026-11-11 — Push 31 (Home page simplified for scanning readers)

**Status:** ✅ PASS (0 critical)

- Markup-only change to the home page, footer and report cards; no new inputs, routes or sinks. 108 unit / 19 browser tests green (production build). GitHub Actions was in a **major outage** at commit time (githubstatus.com): the previous push's CI/Release were queued and the CodeQL dynamic run hit `startup_failure` — platform side, not code

---

## 2026-11-12 — Push 32 (Buy me a coffee, hidden until the live checkout exists)

**Status:** ✅ PASS (0 critical) — small UI addition, no change in this area. 108 unit / 19 browser tests green

---

## 2026-11-12 — Push 33 (Paste as a quiet fallback, coffee link, healthcare & logistics skills)

**Status:** ✅ PASS (0 critical) — no API changes. 111 unit / 19 browser tests green on the production build; tsc 0, ESLint 0
