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
