# 🧪 QA Agent — Knowledge Log

Each entry records findings, edge-case tests, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/qa.md`.

---

## 2026-11-13 — Push 36b (Guides and articles in TR / DE / ES / ZH, 20 → 90+ indexable pages)

**Status:** ✅ PASS (0 critical)

- 🔧 Fixed (Push 36 warning): recent-scans label is derived from the score in the page language
- 🔧 Fixed (Push 36 warning): German compounds of 15+ letters count as two words; German nurse fixture 36 → 70, no English fixture changed
- Translated nurse and logistics guides unit-tested against the engine's aliases in all four languages
- 195 unit / 91 browser tests green on the production build; tsc 0, ESLint 0; no tracked `.env`

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
