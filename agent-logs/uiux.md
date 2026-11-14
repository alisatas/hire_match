# 🎨 UI/UX Agent — Knowledge Log

Each entry records findings, user journey audits, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/uiux.md`.

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (0 critical)

- Every page now follows the chosen language: legal (with "English prevails" notice), samples, course durations, score card, 404
- 🟡 Course titles stay in English (proper names of external English courses)
- 🟡 Legal and Chinese translations not reviewed by a native speaker or lawyer
- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-14 — Push 39 (Brazilian Portuguese at /pt)

**Status:** ✅ PASS (0 critical)

/pt home flow checked by hand: paste CV, sample job, analyze → results fully in Portuguese (15/17 skills, 6/3 years). Header menu and footer hold six languages with no horizontal overflow at 375 px (/pt/resume-keywords/registered-nurse). Copy uses Brazilian terms (vaga, currículo, você).

- 220 unit / browser tests green on the production build (verify passed on a9a45d7); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 40 (French at /fr)

**Status:** ✅ PASS (0 critical)

/fr home flow checked by hand: French nurse CV + posting → "Candidat solide" 75 %, "Clinique / soins aux patients" matched, all copy in French ("vous", "offre d'emploi"). Seven languages in the header menu and footer (browser test at 375 px green).

- 234 unit / browser tests green on the production build (verify passed on 80eb754); tsc 0 (web + mobile), ESLint 0; no tracked `.env`
