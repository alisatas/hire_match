# 🧪 QA Agent — Knowledge Log

Each entry records findings, edge-case tests, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/qa.md`.

---

## 2026-11-13 — Push 37 (Native Android app in mobile/, SEO brief, seniority signal)

**Status:** ✅ PASS (0 critical)

- Shared code refactor: `SKILL_RESOURCES` → `src/lib/resources.ts`, localized verdict → `src/lib/i18n/persona.ts`; web behaviour unchanged (e2e green)
- Mobile app driven end to end on an Android 15 emulator: paste CV, sample job, report, switch to Turkish
- 🟡 Not yet tested on device: PDF upload and job-link fetch from the app
- 198 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (0 critical)

- Translated samples unit-tested: every TR/DE/ES/ZH posting yields 3+ skills, a years requirement and full length
- 404 renders English on the server and switches language after hydration (useSyncExternalStore, no mismatch)
- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-14 — Push 39 (Brazilian Portuguese at /pt)

**Status:** ✅ PASS (0 critical, 1 note)

Engine additions are data (stop words, aliases, headings, years, months). Pathological-input tests still finish quickly; Portuguese fixtures (frontend, nurse, logistics) score within 10 points of English with the same years. 🟡 Note: the month prefixes `set`/`out` (setembro/outubro) only apply directly before a year in a date range, so "set 2019 – 2021" reads as September; an English "out 2019" before a range would read as October — harmless (month precision only).

- 220 unit / browser tests green on the production build (verify passed on a9a45d7); tsc 0 (web + mobile), ESLint 0; no tracked `.env`
