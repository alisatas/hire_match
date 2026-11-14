# 🌐 Browser QA Agent — Knowledge Log

Each entry records browser-level findings, console errors, and CWV risks from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/browser-qa.md`.

---

## 2026-11-13 — Push 36b (Guides and articles in TR / DE / ES / ZH, 20 → 90+ indexable pages)

**Status:** ✅ PASS (0 critical)

- SEO crawl covers every translated guide and article through the sitemap; it caught 5 descriptions outside 70–160 characters (fixed)
- Note: wait 60 s between local full runs (rate-limit test)
- 195 unit / 91 browser tests green on the production build; tsc 0, ESLint 0; no tracked `.env`

---

## 2026-11-13 — Push 37 (Native Android app in mobile/, SEO brief, seniority signal)

**Status:** ✅ PASS (0 critical) — web unchanged apart from llms.txt; mobile verified on emulator with screenshots

- 198 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (0 critical)

- SEO crawl caught 6 title/description lengths on the new legal pages (fixed); checked /tr 404 and /de/privacy in the browser
- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`
