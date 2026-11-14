# 🎨 UI/UX Agent — Knowledge Log

Each entry records findings, user journey audits, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/uiux.md`.

---

## 2026-11-13 — Push 36b (Guides and articles in TR / DE / ES / ZH, 20 → 90+ indexable pages)

**Status:** ✅ PASS (0 critical)

- Keyword guides (18), articles (3), guide and article indexes now in Türkçe, Deutsch, Español, 中文; the language menu opens the same page in the chosen language
- Chinese sample postings translated
- 🟡 Still English: legal pages (linked with hreflang="en"), sample postings for TR / DE / ES, course titles
- 🟡 Chinese home-page dictionary not yet reviewed by a native speaker (AI review stopped at the usage limit)
- 195 unit / 91 browser tests green on the production build; tsc 0, ESLint 0; no tracked `.env`

---

## 2026-11-13 — Push 37 (Native Android app in mobile/, SEO brief, seniority signal)

**Status:** ✅ PASS (0 critical)

- Native app (Expo / React Native): input and report screens in the site's colours, 44–52 px tap targets, accessibility labels on score ring, inputs and tabs; 5 languages with in-app picker
- 🟡 Single-screen state navigation (no Expo Router yet); 74 MB universal test APK (Play bundle splits per device)
- 198 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (0 critical)

- Every page now follows the chosen language: legal (with "English prevails" notice), samples, course durations, score card, 404
- 🟡 Course titles stay in English (proper names of external English courses)
- 🟡 Legal and Chinese translations not reviewed by a native speaker or lawyer
- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`
