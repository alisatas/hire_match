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
