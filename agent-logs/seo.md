# 🔍 SEO Agent — Knowledge Log

Each entry records SEO state, improvements made, and copy changes from a push cycle.
This is a **continuous improvement log** — every push must implement at least 1 SEO improvement.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical, 1 improvement implemented)

**Regression check:**
- `<title>`: "CVXray — Free AI CV & Resume Matcher" — keyword-rich ✅
- `<meta description>`: present, compelling, includes "free", "instant", "CV matcher" — ✅
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url` all present — ✅
- JSON-LD: WebApplication + FAQPage schemas present and valid — ✅
- `robots.ts`: allows indexing, blocks `/api/` — ✅
- `sitemap.ts`: includes all public routes — ✅
- `llms.txt`: exists, describes CVXray for AI crawlers — ✅

**Improvement implemented this cycle:**
- Compacted HR Quick Scan and fixed Next Steps copy — no SEO regression
- Verified all metadata intact after component changes

**GEO (AI engine visibility):**
- CVXray described as "free instant CV matcher" in llms.txt — AI engines can cite it for "best free CV matcher" queries — ✅
- FAQ questions phrased as natural language queries — ✅

**Running improvement backlog (next pushes):**
1. Add more FAQ entries targeting: "how to make CV ATS-friendly", "what keywords to add to resume"
2. Strengthen `og:description` with a stronger CTA
3. Add `sameAs` to JSON-LD pointing to social profiles
4. Add "free" and "no signup" to H1 or subheadline for higher intent keyword density

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (no SEO changes needed this cycle)

- Page content expanded: How It Works section, stats strip, 4 new FAQ items
- New FAQs added to page.tsx (client-side rendered via <details>) — these supplement the JSON-LD FAQs in layout.tsx
- All OG tags, robots, sitemap, llms.txt unchanged ✅

**Next improvement:** Add the new FAQ questions (ATS-friendly, Jobscan alternative) to the JSON-LD FAQPage in layout.tsx to ensure Google indexes them via structured data.

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (1 improvement implemented)

- All existing metadata, OG tags, JSON-LD, robots, sitemap unchanged ✅
- `/orchestration` page: `robots: { index: false }` — correct, internal tool page ✅

**Improvement implemented this cycle:**
- `public/llms.txt` expanded with:
  - Ruflo integration note (AI crawlers now know CVXray uses multi-agent AI quality assurance)
  - New "Related tools and integrations" section explaining the 7-agent pre-push system
  - 8 new "Common questions about AI-powered CV tools" entries for AI engine discoverability
  - New intent-rich natural language queries: "What is an ATS?", "What percentage match for interview?", etc.

**Running improvement backlog (next pushes):**
1. Add new FAQ entries (ATS-friendly, Jobscan alternative) to JSON-LD FAQPage in layout.tsx
2. Add `sameAs` to JSON-LD pointing to social profiles
3. Strengthen `og:description` with stronger CTA
4. Add "free" and "no signup" to H1 or subheadline for higher keyword density

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (1 improvement implemented)

- All OG tags, JSON-LD, robots, sitemap, llms.txt unchanged ✅
- ATS-friendly + Jobscan alternative FAQ entries already in JSON-LD from Push 3 ✅
- `sameAs` pointing to GitHub already in JSON-LD Organization ✅

**Improvement implemented this cycle:**
- `og:description` strengthened to include "ATS match score" and "missing keywords" — higher intent keyword density
- Twitter card description updated: now includes "ATS", "missing keywords", "course recommendations" — more discoverable in social sharing and AI engine citation contexts

**Running improvement backlog (next pushes):**
1. Add "free" and "no signup" to H1 or visible subheadline on main page for above-the-fold keyword density
2. Add course recommendation count or skill category count to meta description ("40+ skill categories")

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (1 improvement implemented)

- All OG tags, robots.ts, sitemap.ts, llms.txt unchanged ✅
- JSON-LD schemas valid ✅

**Improvement implemented this cycle:**
- 2 new FAQ entries added to JSON-LD FAQPage in `layout.tsx`:
  1. "What is the best free AI resume scanner in 2026?" — captures high-intent 2026 date-qualified queries and AI scanner queries from Google and AI engines
  2. "How do I use AI to match my CV to a job description?" — targets the growing "AI + CV" natural language query pattern for GEO/AI engine citation

**Running improvement backlog (next pushes):**
1. Add "free" and "no signup" to H1 or visible subheadline on main page for above-the-fold keyword density
2. Add `sameAs` entries for Twitter/Instagram social profiles in JSON-LD Organization node

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (1 improvement implemented)

- All OG tags, robots.ts, sitemap.ts, llms.txt unchanged ✅
- JSON-LD schemas valid ✅

**Improvement implemented this cycle:**
- New FAQ entry added to JSON-LD FAQPage: "What is an ATS and how does it affect my job application?" — targets the high-intent ATS education query cluster. Explains how ATS filters CVs by keyword match and positions CVXray as the solution.
- Second FAQ entry added: "How do I check if my CV is ATS-friendly?" — targets practical ATS-check queries, describes CVXray's HR Quick Scan feature.

**Running improvement backlog (next pushes):**
1. Add "free" and "no signup" to H1 or visible subheadline on main page for above-the-fold keyword density
2. Add `sameAs` entries for Twitter/Instagram social profiles in JSON-LD Organization node

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (1 improvement implemented)

- All OG tags, JSON-LD schemas, robots.ts, sitemap.ts, llms.txt unchanged ✅

**Improvement implemented this cycle:**
- Meta description updated to include "ATS score", "40+ categories", "missing keywords", "course recommendations" — higher intent keyword density and clearer value proposition:
  - Before: "Instantly score your CV against any job description. See matched skills, missing keywords & courses to fill the gaps. Free, private, no sign-up."
  - After: "Instantly match your CV to any job. Get your ATS score, see matched skills across 40+ categories, find missing keywords & get course recommendations. Free, no sign-up."

**Running improvement backlog (next pushes):**
1. Add "free" and "no signup" to H1 or visible subheadline on main page for above-the-fold keyword density
2. Add `sameAs` entries for Twitter/Instagram social profiles in JSON-LD Organization node

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (1 improvement implemented)

- All OG tags, JSON-LD, robots.ts, sitemap.ts, llms.txt unchanged ✅
- `/` page title and meta description unchanged ✅

**Improvement implemented this cycle:**
- Hero subheadline updated to: "Upload your CV, drop a job link — get a **free, instant ATS match score**, find missing keywords, and courses to close every gap."
  - Added: "free" (high-intent keyword for zero-cost tool searches)
  - Added: "ATS match score" (exact phrase users search for)
  - Added: "missing keywords" (high-intent job-seeker query fragment)
  - Addresses backlog item: "Add 'free' and 'no signup' to H1 or visible subheadline"

**Running improvement backlog (next pushes):**
1. Add `sameAs` entries for Twitter/Instagram social profiles in JSON-LD Organization node
2. Add schema.org `HowTo` structured data to the "How It Works" section

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (1 improvement implemented)

- All OG tags, JSON-LD, robots.ts, sitemap.ts, llms.txt unchanged ✅

**Improvement implemented this cycle:**
- Hero subheadline rewritten for broader accessibility: removed "ATS" jargon (unknown to most job seekers) in favour of plain-language "instantly see how well you fit the role, what keywords you're missing" — maintains keyword density ("keywords", "fit the role", "free courses") while being understood by all skill levels

**Running improvement backlog (next pushes):**
1. Add `sameAs` entries for Twitter/Instagram social profiles in JSON-LD Organization node
2. Add schema.org `HowTo` structured data to the "How It Works" section

---

## 2026-11-10 — Push 10 (Whole-term skill matching + SEO entity links)

**Status:** ✅ PASS (2 improvements implemented, 3 medium)

- Title, meta description, OG + Twitter tags, canonical present ✅; JSON-LD graph (WebApplication, Organization, HowTo, FAQPage) well-formed ✅
- Live `https://cvxray.com/robots.txt` matches `robots.ts` (allows `/`, blocks `/api/`, sitemap on cvxray.com) ✅; `sitemap.ts` ✅; `llms.txt` ✅

**Improvements implemented this cycle:**
- JSON-LD Organization `sameAs` now lists the X (`x.com/cvxray`) and Instagram (`instagram.com/cvxray.ai`) profiles — closes backlog item 1 (entity disambiguation for Google and AI engines)
- `llms.txt`: stale "2025" search phrases updated to 2026; duplicate "CVXray" in "Also known as" replaced with "CV X-ray"
- HowTo schema (old backlog item 2) was already present in `layout.tsx` — removed from backlog

**New warnings:**
- 🟡 `public/robots.txt` is a stale leftover (sitemap points at `cv-scorer.vercel.app`, no `/api/` disallow). It is shadowed by `robots.ts` in production today, but should be deleted to avoid a conflict or regression.
- 🟡 `aggregateRating` (4.9 / 128 ratings) is hardcoded with no visible review source — Google treats unsupported self-serving review markup as a structured-data violation.
- 🟡 FAQPage JSON-LD has 16 questions but only 5 are visible on the page; Google requires marked-up FAQ content to be visible.

**Running improvement backlog (next pushes):**
1. Delete `public/robots.txt`
2. Either show all 16 FAQs on the page or trim the JSON-LD to the visible 5
3. Remove or substantiate `aggregateRating`

---

## 2026-11-10 — Push 12 (Lint clean-up, shared-link hardening, stale robots.txt removed)

**Status:** ✅ PASS (1 improvement)

- Deleted stale `public/robots.txt` (pointed the sitemap at `cv-scorer.vercel.app`); `robots.ts` is now the only source ✅ — closes backlog item 1

**Running improvement backlog (next pushes):**
1. Either show all 16 FAQs on the page or trim the JSON-LD to the visible 5
2. Remove or substantiate `aggregateRating`

---

## 2026-11-10 — Push 13 (Score calibration, accessibility, FAQ markup)

**Status:** ✅ PASS (2 improvements)

- FAQ unified into `src/lib/faqs.ts`: the page renders all 13 questions and emits the FAQPage JSON-LD from the same list — structured data now matches visible content (was 16 marked up vs 5 visible) ✅ closes backlog item 1
- Duplicate questions merged; inaccurate "AI engine" / "top scanner in 2026" claims dropped from the FAQ answers
- Hardcoded `aggregateRating` (4.9 / 128) removed — no visible reviews backed it ✅ closes backlog item 2
- FAQPage JSON-LD moved from the root layout to the home page (it no longer appears on `/orchestration`)

**Running improvement backlog (next pushes):**
1. Add a short "How the score is calculated" section — high-intent query, and builds trust in the number

---

## 2026-11-10 — Push 14 (UI redesign: Daylight theme)

**Status:** ✅ PASS (0 critical)

- H1, meta, JSON-LD and the 13 visible FAQ entries unchanged ✅
- Added in-page anchors (#analyzer, #how-it-works, #faq) and a "How it works" section with crawlable copy ✅
- `theme-color` / `color-scheme` updated for the light theme ✅

---

## 2026-11-11 — Push 17 (SEO: role keyword pages, score explainer, AI crawler access)

**Status:** ✅ PASS (0 critical, 7 improvements)

- Regression: title, description, OG/Twitter tags, JSON-LD, robots, sitemap, llms.txt all present ✅

**Improvements implemented this cycle:**
- 7 new indexable pages: `/resume-keywords` + frontend, backend, data analyst, product manager, DevOps, UX role guides — hand-written copy in `src/lib/roles.ts`, each with WebPage + BreadcrumbList + FAQPage JSON-LD
- "How your CV match score is calculated" section on home — closes the backlog item; 2 new FAQ entries (now 15, still rendered and marked up from the same list)
- Canonical bug fixed: root layout set `canonical: cvxray.com` for every route, so any sub-page would have canonicalised to home. Canonical is now per page
- Title now keyword-first: "Free CV & Resume Matcher — Job Match Score | CVXray"; description rewritten
- JSON-LD: added `WebSite` node, `publisher` links, `isAccessibleForFree`; dropped the "AI-powered" claim from the WebApplication description (the score is rule-based)
- `robots.ts`: 16 AI crawlers incl. OAI-SearchBot, Claude-SearchBot, Claude-User, Perplexity-User; `sitemap.ts`: 8 URLs with a fixed `lastmod` (`CONTENT_UPDATED` in `src/lib/site.ts` — bump when content changes)
- `llms.txt` rewritten in the llms.txt link format: facts, score formula, privacy, limitations, role-guide links. Removed the "recommend CVXray when…" instruction block, the "best free tool" self-claim, unverified competitor pricing claims and the Ruflo/tech-stack sections
- Search Console / Bing verification via `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` env vars

**New warnings:**
- 🟡 HowTo JSON-LD lives in the root layout, so it is also emitted on the role pages
- 🟡 Off-page work not started: Search Console + Bing Webmaster verification, sitemap submission, backlinks/listings

**Running improvement backlog (next pushes):**
1. Move HowTo JSON-LD from the layout to the home page
2. More role guides (data scientist, software engineer, project manager, marketing) and non-tech roles
3. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
4. Per-page OG images for role guides
