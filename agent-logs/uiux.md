# 🎨 UI/UX Agent — Knowledge Log

Each entry records findings, user journey audits, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical, 2 medium warnings)

**User journey audit (land → upload → analyze → results → share):**
- Landing state: Sparkles icon + "Your results will appear here" — clear, action-oriented — ✅
- PDF upload: loading indicator shows "Reading PDF..." immediately — ✅
- Job URL fetch: spinner shown while scraping — ✅
- Analyze: button disabled during load, spinner visible — ✅
- Error state: error message shown in red, user can clear and retry — ✅
- "Paste text instead" toggle: visible as underlined link below textarea — ✅ (discoverable)

**Loading & async feedback:**
- All async actions covered by visible loading indicators — ✅
- Loading vs error states are visually distinct (spinner vs red text) — ✅

**Mobile (375px):**
- Two-column grid collapses to single column — ✅
- Results panel scroll works on mobile — ✅
- 🟡 Some tap targets may be under 44px (file input overlay area)
- Sample job buttons row may wrap on narrow screens — 🟡

**Accessibility:**
- File input has `aria-label="Upload PDF CV"` — ✅
- URL input has `aria-label` — ✅
- Score circle missing `aria-label` for screen readers — 🟡
- FAQ `<details>/<summary>` elements are keyboard-navigable — ✅
- Error messages NOT associated via `aria-describedby` — 🟡

**Visual consistency:**
- Border-radius: rounded-xl / rounded-2xl used consistently — ✅
- No hardcoded pixel widths that overflow on narrow screens — ✅
- Colour system: cyan = primary, emerald = success, amber = warning, rose = error, violet = HR/audit — consistent — ✅

**Changes this cycle:**
- HR Quick Scan card moved to right panel (results side) — cleaner UX: left panel stays focused on input
- HR Quick Scan compacted: single-line rows, smaller text, less padding — less visual noise
- Next Steps amber tier: "close 0 gaps" copy bug fixed

**Known warnings:**
- 🟡 Score circle has no `aria-label`
- 🟡 Some tap targets under 44px on mobile

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- WebGL shader background: was hidden on production — FIXED
- Analyze button disabled state: was invisible against dark panel — FIXED (teal gradient opacity-50)
- Panel backgrounds: raised to 75% opacity — content clearly readable against shader
- Footer: · separators, text-xs — mobile-friendly ✅
- Page: added How It Works 3-step strip, stats row (40+ skills, 100% free, 0 signups, <3s), 7 FAQ items
- 🟡 Score circle still missing aria-label (known)

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- New live orchestration dashboard: every async action (single agent, swarm) has visible loading state ✅
- `animate-pulse` on running status badge — visually distinct from idle/done/error ✅
- Error state shown in badge + appended to output panel — no silent failures ✅
- "Run all agents" + individual "Run agent" buttons both correctly disabled during any running state ✅
- Output panel auto-scrolls via `requestAnimationFrame` ✅
- Agent tab switcher appears only when multiple outputs exist — not shown prematurely ✅
- Full-width "Run agent" buttons: adequate tap targets on mobile ✅
- Ruflo badge on page with attribution link ✅
- Architecture note explains the streaming setup in plain terms ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, not introduced this cycle)

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- Course list adaptive limit: shows 6–10 courses based on high-priority gap count — more actionable feedback for weak matches ✅
- `DigitalLoomBackground`: full-screen canvas behind content, `overflow-y-auto` on content div allows scroll ✅
- Weekly cadence cards on /orchestration: tap targets adequate, readable on mobile ✅
- All existing UI/UX controls unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, not introduced this cycle)

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- `etheral-shadow.tsx` added to `src/components/ui/` — not yet imported in any page, so no user-facing changes this cycle ✅
- When integrated: component renders 100% width/height of parent — consumer must size the parent container appropriately
- Existing user journey (land → upload → analyze → results) unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, scheduled for next UI cycle)

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical)

- No UI/UX changes this cycle — all backend hardening only ✅
- Existing user journey, loading states, mobile layout, accessibility unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, tracked for next UI cycle)

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (0 critical)

- Background replaced: WebGL shader → Canvas 2D particle dots. Visual change only — no UX regression ✅
- Feature chips row added below subtitle: non-interactive, `flex-wrap`, visible at all widths — no overflow risk ✅
- "🔗 Share results" button: only rendered inside `{results && ...}` — never visible on empty state ✅
- "Copy all" button in keywords section: visible feedback via `keywordsCopied` state (2s flash) ✅
- URL hash loading: fires on mount only, silent skip if hash absent/malformed — no UX impact on normal load ✅
- User journey unchanged: land → upload → analyze → read results — all steps still functional ✅
- 🟡 Score circle still missing `aria-label` (pre-existing — add in next UI cycle)

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement: "Still want to apply?" banner now auto-populates from left-side job URL input**

- Replaced editable `<input>` in banner with read-only `<span>` — users no longer confused by an editable field that has no effect on anything
- When job URL entered on the left: banner right-side shows the URL automatically ✅
- When no URL: italic placeholder "Paste a job URL on the left to enable" guides the user clearly ✅
- Apply Now button: active emerald `<a>` link when URL present, greyed non-interactive `<div>` when absent ✅
- Subheadline updated: "free, instant ATS match score" — clearer value proposition with "free" explicitly stated ✅
- All existing loading indicators, error states, and mobile layout behaviour unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, carried forward)

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (0 critical)

- Subheadline: "ATS match score" → "instantly see how well you fit the role, what keywords you're missing" — clearer to non-technical job seekers ✅
- No layout changes, no tap target regressions ✅

---

## 2026-11-10 — Push 10 (Whole-term skill matching + SEO entity links)

**Status:** ⚠️ WARN (0 critical, 3 medium)

- No UI changes this cycle. Skill chips will change for users: phantom "TypeScript" / "AI / LLM" / "Machine Learning" matches no longer appear (see math log) ✅
- Score circle `aria-label` is now present (`Match score: N%`, `role="img"`) — recurring warning from Pushes 5–8 is fixed ✅
- 🟡 Tap targets under 44px: "Paste text instead" (10px text, no padding), "Change", "Share results", "Copy all"
- 🟡 Error text (`{error}`) has no `role="alert"` / `aria-live`, so screen readers are not told about validation errors
- 🟡 Score tiers disagree: persona labels switch at 78/58/38, the Next Steps card and FAQ at 70/45 — a 60% result reads "Strong Contender" next to "Decent match — close gaps"

- `tsc --noEmit`: 0 errors ✅ (Node 22.23.4). ESLint: 3 errors, all `react-hooks/set-state-in-effect` in `cv-analyzer.tsx` (lines 313, 322, 329) — not from this cycle's changes; the husky hook treats ESLint as non-blocking.

---

## 2026-11-10 — Push 12 (Lint clean-up, shared-link hardening, stale robots.txt removed)

**Status:** ⚠️ WARN (0 critical, 3 medium)

- No visual changes. Shared links can only set one of the four known persona colours; anything else renders neutral ✅
- 🟡 Tap targets under 44px, error text without `role="alert"`, and the 70/45 vs 78/58/38 score-tier mismatch carried forward

---

## 2026-11-10 — Push 13 (Score calibration, accessibility, FAQ markup)

**Status:** ✅ PASS (0 critical, 0 medium)

- CV paste textarea now stays visible while typing (was replaced by the "CV loaded" badge after the first keystroke) ✅ verified in browser
- Tap targets: "Paste text instead", "Change", "Share results", "Copy all" and the Job URL / Paste Text tabs are all ≥ 44px tall, with negative margins so the visual layout is unchanged ✅ measured 44px in browser
- Validation errors use `role="alert"` ✅
- Score tiers now agree everywhere (persona label, Next Steps card, history colours, FAQ): 70+ strong, 45–69 competitive, < 45 gaps ✅

---

## 2026-11-10 — Push 14 (UI redesign: Daylight theme)

**Status:** ✅ PASS (0 critical) — full redesign

- New visual system: Daylight theme (white surfaces, near-black text, single blue accent); success/warning/danger used only for meaning
- Fixed a long-standing bug: Geist was never applied (font token referenced itself) — the site rendered in Times
- Removed emojis from UI chrome, bouncing/pulsing animations, the oversized coffee card and the animated canvas background
- New structure: sticky header with nav + CTA, hero, numbered input steps with a sticky input panel, results report (score ring, 3 stat tiles, recommendation, skills, keywords, training, CV quality, company), skeleton loading state, "How it works", FAQ accordion, footer
- Owner picked Daylight after comparing four themes (Graphite, Midnight, Mono, Daylight) live on localhost
- Verified at 1440px and 375px: no horizontal overflow; tap targets ≥ 44px; segmented control uses tab roles; rating uses radio roles

---

## 2026-11-11 — Push 16 (Sample jobs as a fallback, not a step)

**Status:** ✅ PASS (0 critical)

- Six always-visible sample-role buttons replaced by one collapsed line ("No job post handy? Try a sample job") — the fallback no longer outweighs the real input
- A chosen sample now shows as a card ("Sample job: Frontend Dev") with a Remove button, instead of an empty URL field with a green tick
- Samples offered once per mode and hidden as soon as the visitor starts typing a link
- `analysis_complete` now reports `job_source: "sample"` so demo runs can be separated from real postings in GA4
- Verified in browser: collapsed by default, expands, loads, Remove restores the inputs, no overflow


---

## 2026-11-11 — Push 17 (SEO: role keyword pages, score explainer, AI crawler access)

**Status:** ⚠️ WARN (0 critical, 1 medium)

- New: `/resume-keywords` index + 6 role guides (breadcrumb, keyword groups, 3 tips, FAQ, two CTAs back to the analyzer, links to other roles)
- New on home: "How your CV match score is calculated" (50 / 35 / 15 cards + score bands) and "Resume keywords by role" link grid
- Header gains "Keywords by role" (≥ sm); footer gains a role-link row with 44px targets on mobile
- Verified role page at desktop and 375px: no horizontal overflow
- 🟡 Breadcrumb links on role pages are 13px text with no padding — under the 44px tap target
- Not screenshotted: the two new home sections (present in the DOM, same card styles as "How it works")

---

## 2026-11-11 — Push 18 (New logo, card grid + breadcrumb fixes, HowTo moved, alias clean-up)

**Status:** ✅ PASS (0 critical) — closes last cycle's breadcrumb warning

- New brand mark: CV page with a scan beam (the "X-ray"), blue gradient tile, 32px; wordmark two-tone "CV" + "Xray". Replaces the plain "CV" letter tile the owner found too basic
- Same artwork used for the favicon (`src/app/icon.svg`) and the share image; share image recoloured from cyan to the site blue, ✓ glyphs (rendered as boxes) removed
- Score and "How it works" cards now go 3-up from 640px (`sm`) instead of 768px (`md`) — at ~740px they stacked into one tall column
- Breadcrumb links on role pages now 44px tall (measured) ✅
- 🟡 Cookie banner covers the bottom of the footer until dismissed (not changed)

---

## 2026-11-11 — Push 19 (Security hardening, 2 role guides, business skill groups)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Two new role guides use the existing template; Software Engineer page checked at 375px — keyword chips wrap, no overflow ✅
- `/resume-keywords` index shows 8 cards ✅
- New skill labels appear in the report (e.g. "BI / Dashboards (Tableau, Power BI)", "CRM (Salesforce, HubSpot)"); six new free course links for those gaps
- 🟡 Cookie banner covers the bottom of the footer until dismissed (carried)

---

## 2026-11-11 — Push 20 (Legal pages, optional support, 2 business role guides, short-CV calibration)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- New "CVXray is free. Support it if it helped." section above the FAQ: states minimum (€3), one-time, Lemon Squeezy checkout and 14-day refund next to the button
- Inactive state is a non-interactive status (`aria-disabled`), not a dead link
- Terms / Privacy / Refund pages share one readable layout (breadcrumb with 44px targets, numbered sections, last-updated date); footer gains Terms · Privacy · Refunds and now wraps on narrow screens
- Verified at 375px: no horizontal overflow on home, legal pages and the new role guides
- 🟡 Carried: cookie banner covers the bottom of the footer until dismissed

---

## 2026-11-11 — Push 21 (Support section removed, legal-page JSON-LD, date-range experience)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Owner removed the "Support it if it helped" section from the home page; the role guides now flow straight into the FAQ
- Terms and Refund Policy reworded to "CVXray may offer…" so they stay accurate without a visible support button

---

## 2026-11-11 — Push 22 (Corporate hardening: technical SEO assets, CSP reporting, CI gate)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Custom 404: clear message, "Check my CV" CTA and links to six keyword guides instead of the framework default
- Per-guide share cards (role name + top keywords) for LinkedIn / X previews
- Apple touch icon and web manifest: home-screen installs show the brand mark

---

## 2026-11-11 — Push 23 (AI Engineer sample job + guide, AI skill vocabulary)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Sample chooser now 7 buttons, AI Engineer first; wraps cleanly at narrow widths
- AI Engineer guide first on `/resume-keywords`, home and footer; own share card
- New report labels: "Vector DBs / Embeddings", "MLOps / Evals"

---

## 2026-11-11 — Push 24 (Cross-sector samples, Financial Analyst guide, month-precise experience)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Owner asked for samples beyond IT: 9 sample buttons now mix tech with sales, marketing and finance; wraps cleanly at narrow widths
- UX Designer sample removed (its keyword guide page stays — it is an SEO asset)
- Experience tile can now show one decimal ("3.9y / 5y")

---

## 2026-11-11 — Push 25 (Suggestions, score card, funnel events, 4 guides, blog, tests, monitoring, global rate limit)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- **"How to add the missing skills"** (report): up to 5 high/medium gaps, each with the job-post line that asks for it, where it belongs on this CV (detects a Skills section and dated roles) and an example bullet with a measurable result; copy reminds users to add only real experience
- **Score card** button next to "Share result": 1200×630 PNG (score ring, label, role, top matched skills); share sheet on phones, download on desktop
- Header gains "Guides"; footer gains "Guides"
- **Accessibility audit (#14)**: axe WCAG 2 A/AA on home, guides index, two role guides, blog index, a blog post, Terms, Privacy and the cookie banner — 0 serious/critical violations; now enforced in CI
- 🟡 Carried: cookie banner covers the bottom of the footer until dismissed

---

## 2026-11-11 — Push 26 (CI runner fix, HR skill group, per-article share images)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Shared blog links now preview with the article headline and reading time instead of the generic site card
- Recruiter reports gain a "Recruiting / HR Tools" skill line, an example bullet and a course link
