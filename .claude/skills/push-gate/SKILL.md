---
name: push-gate
description: CVXray's mandatory pre-push gate — the 7 review agents (Security, QA, API, UI/UX, Browser QA, SEO, Math Professor), their knowledge logs, the report format and the push procedure. Use before every git push or deploy of this repository, and when the user asks to push.
---

## Scale the gate to the change

Look at `git diff --stat origin/main..HEAD` first and run only what the change can affect:

| What changed | Run |
|---|---|
| Only docs, logs, `PROJECT.md`, `agent-logs/` | `npm run verify`, one short log line per agent, report. No source reading, no SEO/Math improvement. |
| `mobile/` only | verify; QA, UI/UX and Security read `mobile/`; others one line. |
| Site code | the full gate below |

Agents whose files did not change write "no change in scope" in the report and log instead of
re-reading their files. When in doubt, run the agent.

## Logs stay short

Each `agent-logs/<agent>.md` keeps its header and the latest 3 entries. When appending makes it
4, move the oldest entry to the end of `agent-logs/archive/<agent>.md`. Read the archive only to
check a specific past finding.

## Procedure (in order, no exceptions)

1. Commit everything, then run `npm run verify` (types web + app, lint, unit tests, production
   build, browser tests). It must pass on the commit you will push.
2. Read each agent's log in `agent-logs/` (latest entries only) and run the agents below in
   order, reading the files each one names — scaled as above.
3. SEO and Math Professor must each ship at least one concrete improvement in a push that
   changes site code (not for docs-only or app-only pushes).
4. Append a dated entry to all seven logs; update the SEO and Math backlogs; commit.
5. Run `npm run verify` again if code changed in steps 3–4.
6. Print the PRE-PUSH AGENT REPORT. Any 🔴 → stop and list what must be fixed.
7. **All seven ✅ PASS and verify passed on this commit → auto-push**: go straight to step 8
   without asking (owner's standing rule, 2026-11-14). Say in the report that it was pushed
   automatically.
   Otherwise (any ⚠️ WARN or 🔴, or the push would carry work you did not make): make sure
   `npm run dev` is running and tell the owner "Changes are live at http://localhost:3000 —
   please check and confirm before I push." **Do not push until the owner says so.**
8. `git fetch origin && git rebase origin/main`, then `git push origin main`.
   The pre-push hook refuses the push if origin/main is not contained or verify did not pass
   on this exact commit.

# CVXray — Pre-Push Gate

**MANDATORY:** Before every `git push` or deploy, Claude must run ALL agents below in order.
A single 🔴 Critical finding BLOCKS the push. Fix it first.

---

## How to run

Claude runs each agent by reading the relevant source files and applying the agent's checklist.
Results are printed as a structured report. Push only when all agents return ✅ PASS.

---

## Agent Knowledge Logs — MANDATORY

Every agent has a persistent knowledge log in `agent-logs/`:

| Agent | Log file |
|---|---|
| 🔐 Security | `agent-logs/security.md` |
| 🧪 QA | `agent-logs/qa.md` |
| 🔌 API | `agent-logs/api.md` |
| 🎨 UI/UX | `agent-logs/uiux.md` |
| 🌐 Browser QA | `agent-logs/browser-qa.md` |
| 🔍 SEO | `agent-logs/seo.md` |
| 🧮 Math Professor | `agent-logs/math-professor.md` |

**Before each push:**
1. READ the relevant log file before running that agent's checklist — use past findings to inform current checks
2. Note any recurring warnings that have now been fixed

**After each push (before committing):**
1. APPEND a new dated entry to EACH agent's log file with: status, findings, improvements made, and any new warnings
2. Update the "running improvement backlog" in SEO and Math Professor logs with completed/new items

Skipping log reads or writes is NOT allowed. These logs compound knowledge across pushes.

---

## Agent 1 — 🔐 Security Engineer (Senior Team Lead)

Think like a senior engineer who has dealt with real production breaches. Don't just tick boxes — reason about actual exploitability and blast radius.

**Injection & XSS:**
- Every `dangerouslySetInnerHTML` usage — is the value server-controlled only, or could user input ever reach it?
- Are all user-supplied strings (CV text, job text, URL input) rendered as text nodes, never as HTML?
- Does the scraper's `stripHtml()` fully neutralise `<script>`, `<img onerror>`, and SVG-based XSS vectors before the result is used in the UI?
- Are there any `eval()`, `new Function()`, `innerHTML`, or `document.write()` patterns?

**SSRF & URL handling:**
- Does the scrape route block ALL private/loopback/metadata ranges? Check: `127.x`, `10.x`, `172.16-31.x`, `192.168.x`, `169.254.x`, `::1`, `localhost`, `metadata.google.internal`
- Could an attacker bypass the SSRF block using DNS rebinding, IPv6, or URL encoding tricks?
- Is `Content-Type` validated on the scrape response before passing to `stripHtml()`?

**Secrets & supply chain:**
- Run `git ls-files .env*` — are any `.env` files tracked?
- Are all secrets accessed only via `process.env`, never hardcoded or logged?
- Are there any `console.log()` calls that could leak request bodies, tokens, or CV text to Vercel logs?

**HTTP security:**
- Are `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Content-Security-Policy` set in `next.config.ts`?
- Does CSP allow `unsafe-inline` or `unsafe-eval`? If so, flag it.

**File upload:**
- Is PDF size capped before the buffer is read (not after)?
- Is MIME type validated server-side, not just client-side?
- Could a malformed PDF cause `unpdf`/`pdfjs` to throw and leak stack traces in the response?

**Rate limiting:**
- Are the `/api/scrape` and `/api/extract-pdf` routes rate-limited? If not, flag as medium — they're open to abuse.

**Untrusted input beyond forms:**
- Share links (`#s=` hash) are attacker-controlled: is every decoded field type-checked before it is rendered? (An object where a number belongs crashed the whole page until Push 34.)
- Are lookups keyed by untrusted strings own-key only (`Object.hasOwn`)? `__proto__` / `constructor` must never resolve to a built-in.
- Does any route answer 500 to bad input? 5xx on user error hides real incidents in the logs — bad input is 4xx.

**Abuse & platform:**
- Rate limiter: verify against production that spoofed `x-real-ip` / `x-forwarded-for` do not reset the limit (send ~12 requests with rotating fake IPs to `/api/csp-report`; expect 429 after 10).
- Open redirects: `//evil.example`, `/\evil.example`, encoded variants must never produce an off-site `Location`.
- Owner routes (`/api/orchestrate`, `/api/reddit-comment`): 401 for missing, wrong, empty-Bearer and oversized keys.

**Automated attack suite — must be green (runs in CI on every push):**
- `tests/e2e/security.spec.ts`: XSS payloads via paste and share links, crafted share links, security headers on every page type, malformed/oversized/cross-site requests to every API route, owner-key checks, PDF upload abuse, SSRF tricks end to end, rate limiting, open redirects
- `tests/unit/security.test.ts`: SSRF address and URL screening (encoded IPs, IPv6-mapped, cloud metadata hosts), link sanitising, log scrubbing
- When a new route, input or sink is added, add its attack cases to these files in the same commit.

**Files to read:** `src/app/api/**`, `next.config.ts`, `src/proxy.ts`, `src/components/features/cv-analyzer.tsx`
**Blocks push on:** 🔴 Any exploitable injection, SSRF bypass, secret leak, or missing webhook auth; any failure in the automated attack suite
**Warn on:** 🟡 Missing rate limiting, overly permissive CSP, console.log with sensitive data

---

## Agent 2 — 🧪 QA Engineer (Senior Team Lead)

Think like someone who has been paged at 3am because of a null pointer in production. Trace every data path end-to-end.

**Data integrity:**
- What happens if `analyze()` returns `matched: []` and `missing: []`? Does the UI degrade gracefully or render blank sections?
- What if `results.topJobSignals` is empty? Is the keywords section hidden or does it show an empty container?
- What if `results.score` is 0 or 100? Does the SVG circle render correctly (strokeDashoffset of 283 or 0)?
- What if a PDF returns text that is 100% whitespace after trimming? Does it trigger the "no text extracted" error or silently pass an empty string to `analyze()`?

**Race conditions & async:**
- If the user clicks "Analyze" twice quickly, can two concurrent analyses race and set stale results?
- If the user clears the CV while a URL fetch is in-flight, does `setIsLoading(false)` still get called on the abandoned request?
- Does the `processPdf` handler guard against the user uploading a second file before the first finishes?

**LocalStorage:**
- What if `localStorage` is full or blocked (private mode, storage quota exceeded)? Is the `try/catch` tight enough that it never crashes the app?
- What if `JSON.parse` of stored history returns malformed data? Is that guarded?

**Edge inputs:**
- CV text of 1 character — does `analyze()` handle it without dividing by zero?
- Job description with only stop words — `rawTotal` would be 0; does `keywordScore` divide by zero?
- URL input with a valid http prefix but no domain (e.g. `http://`) — does it bypass the URL validation and reach the scraper?

**Error visibility:**
- Are all error states shown to the user? Or do some fail silently (setCopied never triggers, pdfStatus stuck on "Reading PDF...")?
- Is there a timeout on the clipboard fallback `execCommand`? Could it hang?

**Files to read:** `src/components/features/cv-analyzer.tsx`, `src/app/api/scrape/route.ts`, `src/app/api/extract-pdf/route.ts`, `src/lib/analyze.ts`
**Blocks push on:** 🔴 Division by zero, unhandled null crash, broken loading state that locks the UI
**Warn on:** 🟡 Race conditions, silent failures, missing empty-state handling

---

## Agent 3 — 🔌 API Engineer (Senior Team Lead)

Think like someone who has designed APIs at scale and knows exactly how they get abused. Go beyond status codes.

**Input validation — scrape route:**
- Is the URL validated with `new URL()` parse, not just `startsWith("http")`? A string like `http:evil.com` passes `startsWith` but is not a valid URL.
- Is there a maximum URL length check? Extremely long URLs could cause issues.
- Is the response body size capped before `response.text()` is called? A 50MB HTML page would be read into memory.
- Is the `Content-Type` of the scraped response checked? An attacker could serve a binary file, not HTML.
- Does the 15s timeout `AbortController` actually cancel the `fetch` or just stop waiting for it? The server-side fetch may continue running.

**Input validation — extract-pdf route:**
- Is the file size check done before `arrayBuffer()` is called? Reading a 100MB file then rejecting it wastes memory.
- Is there a page count limit on PDFs? A 10,000-page PDF could exhaust memory even if under 5MB compressed.
- Does the route return the raw `err.message` from `unpdf` in any code path? Stack traces in API responses are an information leak.

**Response hygiene:**
- Do any routes return stack traces or internal error messages to the caller?
- Are all `NextResponse.json()` calls using correct `status` codes — no accidental `200` on error paths?
- Do routes set `Cache-Control: no-store` on sensitive endpoints to prevent CDN caching of error responses?

**Files to read:** `src/app/api/scrape/route.ts`, `src/app/api/extract-pdf/route.ts`
**Blocks push on:** 🔴 Stack trace leak, missing body size cap before read
**Warn on:** 🟡 Missing content-type check on scrape response, no response body size limit

---

## Agent 4 — 🎨 UI/UX Engineer (Senior Team Lead)

Think like a senior product designer who has watched real users struggle with the app on a 375px phone with slow 3G. Don't just audit code — simulate the user journey.

**Critical user journey audit:**
- Trace the full flow: land → upload PDF → paste job URL → click Analyze → read results → click "Share CVXray" → scroll to rating. Does every step have clear feedback?
- What does a first-time user see if they land and do nothing? Is the empty state helpful and action-oriented?
- What happens after an error? Is recovery obvious — does the user know what to do next?
- Is the "Paste text instead" toggle discoverable? Would a non-technical user find it?

**Loading & async feedback:**
- Is every async action covered by a visible loading indicator? PDF upload, URL fetch, analyze, clipboard write.
- Are loading states visually distinct from error states? A user should never wonder "did it work or fail?"
- Does the spinner/loading text appear immediately on click, or is there a perceptible delay before feedback?

**Mobile (375px):**
- Does the two-column grid collapse cleanly to single column?
- Does the results panel scroll independently from the page? On mobile, `lg:max-h-[85vh]` is removed — is the scroll experience correct?
- Are all tap targets at least 44×44px? Check buttons, the file input overlay, and the "Paste text instead" toggle.
- Does the "Apply Now" banner sticky header on mobile obscure content when the panel scrolls?
- Is the sample job button row scrollable horizontally if too many buttons wrap?

**Accessibility:**
- File input: does it have `aria-label="Upload PDF CV"`? ✅ (recently added)
- URL input: does it have `aria-label`?
- Does the results score circle have an `aria-label` for screen readers? (e.g. "Match score: 78%")
- Are the FAQ `<details>`/`<summary>` elements keyboard-navigable and screen-reader friendly?
- Are error messages associated with their inputs via `aria-describedby` or `role="alert"`?

**Visual consistency:**
- Are all border-radius values consistent (rounded-xl vs rounded-2xl vs rounded-full)?
- Does any section have hardcoded pixel widths that could overflow on narrow screens?
- Is the colour system consistent — are cyan/teal/emerald/violet used with clear semantic meaning?
- Does the coffee section feel tonally consistent with a precision career tool?

**Files to read:** `src/components/features/cv-analyzer.tsx`, `src/components/home-page.tsx`, `src/components/root-shell.tsx`, `src/lib/i18n/*`
**Blocks push on:** 🔴 Broken user journey, invisible loading state, inaccessible interactive element with no label
**Warn on:** 🟡 Tap targets under 44px, missing aria on score circle, non-obvious error recovery

---

## Agent 5 — 🌐 Browser QA

**Checks:**
- Critical routes load without console errors
- Form validation flows work (empty, invalid, valid submission)
- Core Web Vitals risks: large unoptimized assets, layout shifts
- Keyboard navigation works on all interactive elements

**Files to read:** `src/components/features/cv-analyzer.tsx`, `src/components/home-page.tsx`
**Blocks push on:** 🔴 Critical finding

---

## Agent 6 — 🔍 SEO Continuous Improvement

This agent does not just check — it **improves** SEO on every push. The goal is compounding gains: each push leaves SEO better than before.

**Phase 1 — Regression Check (blocks push if broken):**
- `<title>` and `<meta description>` present, unique, keyword-rich
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) all present
- JSON-LD structured data valid (WebApplication + FAQPage schemas)
- `robots.ts` allows indexing and blocks `/api/`
- `sitemap.ts` includes all public routes
- `llms.txt` exists and describes CVXray clearly for AI crawlers
- Any new pages have title + description (no blank/default metadata)
- Translated home pages (`/tr`, `/de`, `/es`, `/zh`): correct `<html lang>`, self canonical, and `hreflang` links to every language plus `x-default` on each version
- A string added to `src/lib/i18n/en.ts` exists in every other language file (TypeScript enforces the shape; check the wording)

**Phase 2 — Active Improvement (implement before pushing):**
- Strengthen weak title/description copy — more specific, more keyword-rich
- Improve FAQ: rewrite vague questions as exact queries users type ("how to check if my resume matches a job description")
- Add missing FAQ entries targeting high-intent queries not yet covered
- Improve `llms.txt`: add new use cases, sharpen the product description, add new example questions
- Tighten JSON-LD: improve featureList, applicationCategory, description copy
- Improve H1 and page subheadlines for keyword density and clarity
- Add or improve `og:description` copy — should be a compelling call to action
- Check primary keywords present in copy: "CV matcher", "resume matcher", "job fit", "ATS checker", "free", "instant"

**Automated crawl — must be green (runs in CI on every push):** `tests/e2e/seo.spec.ts` fetches every sitemap URL as raw HTML and fails on: title outside 15–65 chars, description outside 70–160, wrong canonical, not exactly one `<h1>`, `noindex`, missing `lang` / OG / Twitter tags, JSON-LD that does not parse or lacks `@type`, duplicate titles or descriptions, broken internal links, linked pages missing from the sitemap, AI crawlers missing from robots.txt, broken links in llms.txt, main content that needs JavaScript to appear. New pages get covered automatically through the sitemap.

**Phase 3 — GEO (AI Engine Visibility):**
- ChatGPT search and Copilot draw on Bing's index: is the site verified in Bing Webmaster Tools and the sitemap submitted there?
- Is the brand described the same way everywhere (site, llms.txt, JSON-LD, listings)? Consistent entity facts make AI answers cite it.
- Is there a direct, quotable one-sentence answer near the top of each guide (what AI answers lift)?
- Is CVXray described clearly enough that an AI would cite it when asked "what's the best free CV matcher"?
- Does `llms.txt` answer the top questions AI engines receive about CV tools?
- Are FAQ questions phrased as natural language queries (not generic headings)?

**Files to read:** `src/app/(en)/layout.tsx`, `src/app/[lang]/layout.tsx`, `src/components/root-shell.tsx`, `src/components/home-page.tsx`, `src/lib/i18n/*`, `src/app/robots.ts`, `src/app/sitemap.ts`, `public/llms.txt`
**Files to improve:** `src/app/(en)/layout.tsx`, `src/components/home-page.tsx`, `src/lib/i18n/*` (every language), `src/lib/faqs.ts`, `public/llms.txt`
**Blocks push on:** 🔴 Critical finding (missing OG tags, broken JSON-LD, robots blocking indexing)
**Required before push:** At least 1 SEO improvement implemented per push cycle

---

## Agent 7 — 🧮 Math Professor (Score & Ranking Engine)

This agent does not just check — it **improves** the scoring math on every push. The goal is a progressively more accurate, fair, and explainable match engine.

**Scope — three systems to review and improve:**

### A. Match Percentage (`src/lib/analyze.ts`)
- Review the composite score formula: `(skillScore × 50) + (keywordScore × 35) + (expScore × 15)`
- Review the confidence multiplier: `0.6 + (jobWordCount / 400) × 0.4`
- Review the coverage penalty: `missingCriticalRatio × 8`
- Review the experience score sigmoid: `Math.min(ratio, 1.25) / 1.25`
- Review log-dampening of skill frequency weights: `1 + Math.log(1 + freq)`
- Review keyword cap: `Math.min(freq, 5)`
- Review score floor/ceiling: clamped `[5, 95]`
- Ask: does the formula produce fair, calibrated scores? Would a 90% score genuinely mean a near-perfect match? Would a 40% score accurately reflect a weak match?

### B. Skills to Add — Priority Ranking (`src/lib/analyze.ts`)
- Review priority thresholds: `freq ≥ 3 → high`, `freq ≥ 1 → medium`, `0 → low`
- Are these thresholds well-calibrated? Should title/description position boost priority?
- Are missing skills sorted in the most useful order for the user?
- Should skills that appear in the job title get an automatic high-priority boost?

### C. Recommended Training — Course Selection & Ordering (`src/components/features/cv-analyzer.tsx` → `SKILL_RESOURCES`)
- Are the most important missing skills (high-priority) shown first? ✅ already sorted by priority
- Are there better/more current resources for any skill?
- Are course duration and free/paid metadata accurate and useful?
- Should there be a maximum of high-priority courses shown before medium/low?
- Is the `.slice(0, 6)` limit optimal, or should it adapt to number of high-priority gaps?

**Phase 1 — Regression Check:**
- Score for a strong-match CV should be in the 75–95 range
- Score for a weak-match CV should be in the 10–45 range
- No skill with `freq = 0` should be marked high-priority
- Course list must show high-priority gaps before low-priority ones

**Phase 2 — Active Improvement (implement before pushing):**
- Improve at least 1 aspect of the math or ranking logic per push cycle
- Document the change with a comment in `analyze.ts` explaining the reasoning
- Examples of valid improvements:
  - Recalibrate score weights based on observed over/under-scoring
  - Add a title-keyword boost (skills in the job title count double)
  - Improve confidence multiplier curve for short vs long JDs
  - Make the coverage penalty scale more smoothly
  - Improve experience score for edge cases (0 years on CV, no requirement stated)
  - Tune the missing-skill priority thresholds
  - Adapt course list slice size to gap count

**Files to read:** `src/lib/analyze.ts`, `src/components/features/cv-analyzer.tsx` (SKILL_RESOURCES section)
**Files to improve:** `src/lib/analyze.ts` (and/or SKILL_RESOURCES in cv-analyzer.tsx)
**Blocks push on:** 🔴 Score formula produces clearly wrong results (e.g. 90%+ for an obvious mismatch)
**Required before push:** At least 1 math/ranking improvement implemented and commented per push cycle

---

## Pre-Push Report Format

Claude must output:

```
═══════════════════════════════════════
  PRE-PUSH AGENT REPORT
═══════════════════════════════════════
🔐 Security ........ ✅ PASS  (0 critical)
🧪 QA .............. ✅ PASS  (0 critical)
🔌 API ............. ✅ PASS  (0 critical)
🎨 UI/UX ........... ⚠️  WARN  (2 medium)
🌐 Browser QA ...... ✅ PASS  (0 critical)
🔍 SEO ............. ✅ PASS  (0 critical)
🧮 Math Prof ....... ✅ PASS  (1 improvement)
───────────────────────────────────────
VERDICT: ✅ SAFE TO PUSH
═══════════════════════════════════════
```

If any agent returns 🔴, verdict is `🔴 BLOCKED — fix before pushing`.

---

## Agent roles

| Agent | Pre-Push Gate |
|---|---|
| QA Engineer | ✅ |
| Security Engineer | ✅ |
| API Engineer | ✅ |
| UI/UX Engineer | ✅ |
| Browser QA | ✅ |
| SEO Specialist | ✅ |
| Math Professor | ✅ |
