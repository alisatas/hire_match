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

---

## 2026-11-11 — Push 18 (New logo, card grid + breadcrumb fixes, HowTo moved, alias clean-up)

**Status:** ✅ PASS (0 critical, 2 improvements)

- Regression: titles, canonicals, OG/Twitter tags, robots, sitemap, llms.txt unchanged ✅

**Improvements implemented this cycle:**
- HowTo JSON-LD moved from the root layout to the home page — it was also emitted on the role guides, which show no such steps. Steps are now generated from the visible "How it works" cards — closes backlog item 1
- Brand favicon (`/icon.svg`) and a share image that matches the site's colours — consistent brand in search results and link previews

**Running improvement backlog (next pushes):**
1. More role guides (data scientist, software engineer, project manager, marketing) and non-tech roles
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Per-page OG images for role guides
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)

---

## 2026-11-11 — Push 19 (Security hardening, 2 role guides, business skill groups)

**Status:** ✅ PASS (0 critical, 3 improvements)

**Improvements implemented this cycle:**
- 2 new role guides — `/resume-keywords/software-engineer` (broadest tech title) and `/resume-keywords/data-scientist` — each with unique copy, keyword groups, tips and FAQ; sitemap now 10 URLs
- llms.txt and the role FAQ answer list both new guides
- "What skills does CVXray detect?" FAQ now covers data and business skills (Tableau, Power BI, Excel, Salesforce, SEO, marketing, finance) — widens the queries the page can answer beyond engineering roles

**Running improvement backlog (next pushes):**
1. Non-tech role guides now that the engine supports them: sales, marketing, project manager, financial analyst
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Per-page OG images for role guides
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)

---

## 2026-11-11 — Push 20 (Legal pages, optional support, 2 business role guides, short-CV calibration)

**Status:** ✅ PASS (0 critical, 3 improvements)

**Improvements implemented this cycle:**
- 2 non-tech role guides — `/resume-keywords/account-executive` and `/resume-keywords/digital-marketing-specialist` — now that the engine detects sales, CRM, marketing and SEO skills (closes backlog item 1, partially). 10 role guides in total
- Trust pages: `/terms`, `/privacy`, `/refund-policy` — linked from every footer, in the sitemap (15 URLs) and llms.txt
- llms.txt and the "Is CVXray free?" FAQ explain the optional pay-what-you-want support (from €3, unlocks nothing, 14-day refund) so AI answers keep describing CVXray as free

**Running improvement backlog (next pushes):**
1. More business guides: project manager, financial analyst, customer success
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Per-page OG images for role guides
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)

---

## 2026-11-11 — Push 21 (Support section removed, legal-page JSON-LD, date-range experience)

**Status:** ✅ PASS (0 critical, 2 improvements)

**Improvements implemented this cycle:**
- Legal pages emit WebPage + BreadcrumbList JSON-LD linked to the `#website` and `#org` entities — trust pages now read as official CVXray policy
- FAQ and llms.txt no longer describe a support payment that the site does not offer — keeps AI answers and structured data consistent with the visible page

**Running improvement backlog (next pushes):**
1. More business guides: project manager, financial analyst, customer success
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Per-page OG images for role guides
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)

---

## 2026-11-11 — Push 22 (Corporate hardening: technical SEO assets, CSP reporting, CI gate)

**Status:** ✅ PASS (0 critical, 5 improvements)

**Improvements implemented this cycle:**
- **Canonical host**: `www.cvxray.com` served a full duplicate (200). Now a permanent 308 to `cvxray.com`
- **Organization logo**: JSON-LD pointed at the 1200×630 share image; now a square 512×512 `/logo.png` ImageObject — eligible for Google's logo / knowledge panel
- **Per-guide OG images** for all 10 role guides — closes backlog item 3
- **Web manifest + Apple touch icon** (brand consistency in search, bookmarks and home screens)
- **Custom 404** with internal links and `noindex` — no soft-404s, crawl paths back into the guides

**Running improvement backlog (next pushes):**
1. More business guides: project manager, financial analyst, customer success
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. Watch Search Console coverage for the 15 sitemap URLs; request indexing for the newest guides

---

## 2026-11-11 — Push 23 (AI Engineer sample job + guide, AI skill vocabulary)

**Status:** ✅ PASS (0 critical, 2 improvements)

**Improvements implemented this cycle:**
- `/resume-keywords/ai-engineer` — the fastest-growing tech title; guide placed first everywhere it is listed, with its own share card (11 guides, 16 sitemap URLs)
- FAQ "What skills does CVXray detect?" and llms.txt now name AI skills (LLMs, RAG, vector databases, MLOps) — matches queries like "AI engineer resume keywords" / "check resume for AI engineer job"

**Running improvement backlog (next pushes):**
1. More AI-era guides: ML engineer, prompt engineer / AI product manager
2. More business guides: project manager, financial analyst, customer success
3. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)

---

## 2026-11-11 — Push 24 (Cross-sector samples, Financial Analyst guide, month-precise experience)

**Status:** ✅ PASS (0 critical, 2 improvements)

**Improvements implemented this cycle:**
- `/resume-keywords/financial-analyst` — first finance guide, matching the new Financial Analyst sample (12 guides, 17 sitemap URLs)
- Sample jobs now cover sales, marketing and finance — the tool visibly serves non-IT job seekers, widening the audience the home page converts; llms.txt, FAQ and the guides index list finance

**Running improvement backlog (next pushes):**
1. More AI-era guides: ML engineer, prompt engineer / AI product manager
2. More business guides: project manager, customer success, HR
3. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)

---

## 2026-11-11 — Push 25 (Suggestions, score card, funnel events, 4 guides, blog, tests, monitoring, global rate limit)

**Status:** ✅ PASS (0 critical, 4 improvements)

**Improvements implemented this cycle:**
- **Blog** (`/blog`) with 3 in-depth guides: how ATS read CVs (debunks the unsourced "75% auto-rejected" claim), tailoring a CV in 15 minutes, what a good match score is. BlogPosting + BreadcrumbList JSON-LD, related role guides, CTA into the analyzer — closes the "blog / content hub" item
- **4 role guides**: Machine Learning Engineer, Project Manager, Recruiter, Customer Success Manager (16 guides)
- Sitemap 25 URLs; header/footer link to Guides; llms.txt lists guides and articles
- **Shareable score card** — every shared card carries "cvxray.com" (organic acquisition)

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. GA4: mark `analysis_complete`, `score_card` and `entry` as key events and build the funnel exploration

---

## 2026-11-11 — Push 26 (CI runner fix, HR skill group, per-article share images)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement implemented this cycle:**
- Per-article share images for the 3 blog guides (headline + reading time); `BlogPosting.image` points at the article's own image

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. GA4: mark `analysis_complete`, `score_card` and `entry` as key events

---

## 2026-11-11 — Push 27 (CI uses the runner's Chrome, boilerplate-proof scoring, RSS feed)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement implemented this cycle:**
- RSS 2.0 feed for the guides (`/blog/feed.xml`) with `<link rel="alternate">` on the blog pages and an entry in llms.txt — feed readers, aggregators and AI crawlers can discover new articles

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. GA4: mark `analysis_complete`, `score_card` and `entry` as key events

---

## 2026-11-11 — Push 28 (CSP fix for Google Ads conversions, nice-to-have weighting, site-wide feed link)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement implemented this cycle:**
- RSS discovery link on every page (in the root `<head>`, not `metadata.alternates` — pages that set a canonical replace that object, which would have dropped the link or, worse, the canonical)

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. GA4: mark `analysis_complete`, `score_card` and `entry` as key events; Ads conversions now unblocked

---

## 2026-11-11 — Push 29 (GitHub security features, dependency clean-up, SECURITY.md, years-required parsing)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement implemented this cycle:**
- WebApplication `featureList` updated with the features shipped since it was written (16 role guides, where-to-add suggestions, score card, boilerplate-proof scoring, month-precise experience) — keeps the structured description AI engines and Google read in line with the product

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. GA4: mark `analysis_complete`, `score_card` and `entry` as key events

---

## 2026-11-11 — Push 30 (CodeQL findings fixed, shared HTML-to-text module)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement implemented this cycle:**
- `SECURITY.md` + private vulnerability reporting are now linked from GitHub's Security tab — a trust signal for the public repository (shipped last push, verified live this cycle); no page changes needed for SEO this cycle beyond keeping structured data accurate

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
4. GA4: mark `analysis_complete`, `score_card` and `entry` as key events

---

## 2026-11-11 — Push 31 (Home page simplified for scanning readers)

**Status:** ✅ PASS (0 critical) — ⚠️ no new SEO improvement this cycle (UX simplification)

- Content preserved for crawlers: all 15 FAQ answers remain in the HTML (collapsed `<details>`) and in FAQPage JSON-LD; role guides stay linked from the header, footer ("Keywords by role"), home (6 featured + all-guides link) and each guide's "other roles" nav; `#match-score` anchor kept (llms.txt links it)
- Trade-off noted: fewer direct home → guide links (16 → 6); /resume-keywords carries the rest. Watch Search Console coverage for the non-featured guides

---

## 2026-11-12 — Push 32 (Buy me a coffee, hidden until the live checkout exists)

**Status:** ✅ PASS (0 critical) — small UI addition, no change in this area. 108 unit / 19 browser tests green

---

## 2026-11-12 — Push 33 (Paste as a quiet fallback, coffee link, healthcare & logistics skills)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement implemented this cycle:**
- New FAQ (page + FAQPage JSON-LD, one source): "Can I check a Word (.docx) resume or a scanned PDF?" — targets a common pre-upload query and explains the PDF/paste options
- llms.txt: new example question about Word/scanned resumes; limitations section now states PDF-only upload with the .docx workaround

**Running improvement backlog (next pushes):**
1. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
2. Dedicated landing pages: "ATS resume checker", "Jobscan alternative"
3. Nurse and logistics role guides now that the engine detects those skills
4. Off-page: Product Hunt + AlternativeTo listings (copy drafted, owner to post)
5. GA4: mark `analysis_complete`, `score_card` and `entry` as key events

---

## 2026-11-12 — Bing Webmaster Tools (off-page, no deploy)

- Site was already in Bing Webmaster Tools (imported from Google Search Console on 2026-11-11) but Bing knew only **8** URLs from the old sitemap
- Sitemap resubmitted (25 URLs); all 25 URLs sent through URL Submission (quota 100/day)
- URL Inspection, home page: **indexed**; stored copy (crawled 2026-11-03) flagged "meta description too long or too short", live test shows **no SEO/GEO issues** — clears on recrawl
- Why it matters: ChatGPT search and Microsoft Copilot answer from Bing's index
- Next: IndexNow (key file + ping on deploy) so new and updated pages reach Bing, Yandex, Seznam and Naver within minutes instead of waiting for a crawl

---

## 2026-11-12 — Push 34 (Automated attack + SEO crawl suites, IndexNow, healthcare/logistics courses)

**Status:** ✅ PASS (0 critical, 3 improvements)

**Improvements implemented this cycle:**
- New `tests/e2e/seo.spec.ts` crawls every sitemap URL as raw HTML (titles, descriptions, canonical, single h1, noindex, lang, OG/Twitter, JSON-LD parse + @type, duplicates, broken internal links, orphan pages, AI crawlers in robots.txt, llms.txt links, no-JS rendering, IndexNow key)
- It found 15 problems, all fixed: 13 role guides + 2 posts had titles (up to 81 chars) or descriptions (up to 186) that Google truncates. Role titles now pick the longest wording ≤ 60 chars incl. " | CVXray"; descriptions rewritten keyword-first ("Top AI engineer resume keywords: …", ≤ 150); posts got a short `seoTitle`
- IndexNow: key file + `.github/workflows/indexnow.yml` submits sitemap URLs after production deploys that change public content (release commit and test-only pushes skipped; runs queue rather than cancel)

**Running improvement backlog (next pushes):**
1. Confirm the first IndexNow run returns 200/202 after this push
2. More articles: "ATS-friendly CV format", "CV keywords vs. skills section", "How to read a job description"
3. Nurse and logistics role guides now that the engine detects those skills
4. Off-page: Product Hunt + AlternativeTo listings, Reddit mentions (copy drafted, owner to post)
5. GA4: mark `analysis_complete`, `score_card` and `entry` as key events

---

## 2026-11-12 — Measuring search and AI visibility (no deploy)

- **Bing AI Performance** (Webmaster Tools → AI Performance): citations of cvxray.com in Microsoft Copilot and partners. Baseline **0 citations** (3 months to 2026-11-11). Bing Search Performance data available ~2026-11-14
- **GA4 channel group "Channels with AI assistants"** (property 563610211): copy of the default group with an `AI assistants` channel at the top — Source matches `.*(chatgpt|openai|perplexity|gemini\.google|bard\.google|copilot\.microsoft|copilot\.com|claude\.ai|deepseek|meta\.ai|grok|mistral|poe\.com|you\.com|phind).*`. Google's built-in `AI Assistant` row stays below it and catches AI sources the regex misses. Not set as primary; pick it as the channel dimension in Acquisition reports
- **Google Search Console** (URL-prefix property `https://cvxray.com/`; the domain property is not ours): first data day 2026-11-10 — **4 clicks, 8 impressions, CTR 50 %, average position 3**; query list empty (Google hides low-volume queries)
- **Search Console → Generative AI features (beta)**: **5 impressions** for `https://cvxray.com/` in Google's AI features on 2026-11-10 — the first measured AI visibility
- Index coverage, Core Web Vitals and enhancements: "data processing" (property is new)
- Manual monthly check: ask ChatGPT, Claude, Perplexity and Copilot "best free CV matcher" and "free tool to check resume against job description"; record whether CVXray is named

---

## 2026-11-12 — Push 35 (SEO log only: AI visibility baseline, GA4 AI channel, Search Console data)

**Status:** ✅ PASS (0 critical) — documentation-only push (`agent-logs/seo.md`), no code change. 119 unit / 64 browser tests green on the production build; tsc 0, ESLint 0; prod audit 0 high/critical; no tracked `.env`
- ⚠️ No new on-site SEO improvement this cycle: the push carries the measurement setup (Bing AI Performance baseline, GA4 "AI assistants" channel, first Search Console and Google AI features numbers), all logged above

---

## 2026-11-12 — Push 36 (Multilingual: engine reads 5 languages, home pages in TR / DE / ES / ZH, nurse & logistics guides)

**Status:** ✅ PASS (0 critical, 5 improvements)

**Improvements implemented this cycle:**
- Four translated home pages — `/tr`, `/de`, `/es`, `/zh` — each with its own title, description, H1, 10-question FAQ, FAQPage + HowTo JSON-LD (`inLanguage`), correct `<html lang>`, self canonical and `hreflang` to every version plus `x-default`; all in the sitemap with `alternates`
- Two role guides: registered nurse, logistics coordinator (18 guides)
- New English FAQ: "Does CVXray work with CVs and job posts that are not in English?"
- `llms.txt`: languages and URLs of each version, native-language example queries, updated limitations
- `seo.spec.ts` now checks the language of each page and the full `hreflang` set on every home-page version

**Running improvement backlog (next pushes):**
1. Submit `/tr`, `/de`, `/es`, `/zh` in Search Console and Bing; confirm IndexNow picked them up
2. Translate the role guides (18 × 4) — the long-tail traffic in each language
3. Native review of the Chinese copy; decide on a Hindi page (engine reads Hindi, postings in India are mostly English)
4. Landing pages: "ATS resume checker", "Jobscan alternative" — and their equivalents ("ATS uyumlu CV", "Lebenslauf ATS-Check")
5. Off-page: Product Hunt + AlternativeTo listings, Reddit mentions (copy drafted, owner to post)
6. GA4: mark `analysis_complete`, `score_card` and `entry` as key events; add language as a dimension

- 189 unit / 91 browser tests green on the production build (was 119 / 64); tsc 0, ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`

---

## 2026-11-13 — Push 36b (Guides and articles in TR / DE / ES / ZH, 20 → 90+ indexable pages)

**Status:** ✅ PASS (0 critical, 1 large improvement)

**Improvement:** 84 new indexable pages — 18 keyword guides, 3 articles and both indexes in TR / DE / ES / ZH, each with self canonical, hreflang to all versions + x-default, `inLanguage` JSON-LD, sitemap alternates. Legal pages stay English-only (no hreflang).

**Running improvement backlog (next pushes):**
1. Submit the translated sitemap URLs in Search Console and Bing; confirm IndexNow
2. Native review of Chinese copy (home dictionary first)
3. Translate sample postings for TR / DE / ES and the legal pages
4. Landing pages: "ATS resume checker", "Jobscan alternative" and local equivalents
5. Off-page listings (owner); GA4 key events + language dimension

- 195 unit / 91 browser tests green on the production build; tsc 0, ESLint 0; no tracked `.env`

---

## 2026-11-13 — Push 37 (Native Android app in mobile/, SEO brief, seniority signal)

**Status:** ✅ PASS (0 critical, 2 improvements)

- `llms.txt`: new "In other languages" section linking the translated guides, articles and home pages (link check green)
- `docs/seo/`: brief for the SEO manager (structure, audience, competitors, target keywords, baseline, open questions) and a 123-page content inventory generated by `scripts/seo-inventory.mjs`

**Running improvement backlog (next pushes):**
1. Submit translated URLs in Search Console / Bing
2. Keyword volume research per language (SEO manager)
3. Landing pages: ATS resume checker, Jobscan alternative
4. Native review of Chinese copy; translate legal pages and TR/DE/ES samples
5. Play Store listing once the app ships (store page as a backlink and brand entity)

- 198 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (0 critical, 1 improvement)

**Improvement:** 12 more indexable pages — legal pages in TR/DE/ES/ZH with hreflang and sitemap alternates (135 pages in total); legal pages now take part in hreflang like every other page.

**Running improvement backlog (next pushes):**
1. Submit translated URLs in Search Console / Bing
2. Keyword volume research per language (SEO manager)
3. Landing pages: ATS resume checker, Jobscan alternative
4. Native review of Chinese copy and legal translations
5. Play Store listing once the app ships

- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-14 — Bing Webmaster Tools check (no deploy)

- **Search Performance:** still "check back in 48 hours while we prepare the data" (site added 2026-11-12)
- **AI Performance:** 0 citations in Microsoft Copilot and partners (3 months to 2026-11-13) — unchanged from the baseline
- **Sitemaps:** 1 sitemap, last crawl 2026-11-12, **25 URLs discovered** — the old count; the sitemap now lists 135 URLs
- **IndexNow:** working — all 135 sitemap URLs (every language) submitted 2026-11-13 19:07 by the deploy workflow
- **Site Explorer:** no indexed URLs listed yet
- **URL Inspection `https://cvxray.com/tr`:** discovered 2026-11-13, crawled 2026-11-13 17:55, stored status "Indexing allowed? No / URL cannot appear on Bing". The **live test passes**: "URL can be indexed by Bing", no SEO/GEO issues, 2 markup types. Live HTML as Bingbot: 200, `index, follow`, self canonical, `lang="tr"`. Read: the stored result predates processing of the new pages; recheck after the next crawl
- Done with owner OK: sitemap resubmitted 2026-11-14 ("submitted for processing", status Processing); the five home pages (`/`, `/tr`, `/de`, `/es`, `/zh`) sent through URL Submission at 10:27 (quota 95/100 left)
- Recheck ~2026-11-16: sitemap URL count (expect 135), `/tr` index status, Search Performance data
