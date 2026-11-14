# 🧮 Math Professor Agent — Knowledge Log

Each entry records scoring formula reviews, calibration tests, and improvements from a push cycle.
This is a **continuous improvement log** — every push must implement or verify at least 1 math improvement.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/math-professor.md`.

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (1 improvement)

**Improvement:** Chinese year counts may name the skill before "经验" ("3 年以上 React 和 TypeScript 开发经验"): the gap allowed between count and 经验 grew from 10 to 30 characters, still stopping at a comma or full stop. Found by the translated sample postings; unit-tested.

**Running improvement backlog (next pushes):**
1. Extend alias lists from real postings per language
2. CV quality check in other languages
3. Seniority words in TR/DE/ES/ZH titles

- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-14 — Push 39 (Brazilian Portuguese at /pt)

**Status:** ✅ PASS (1 improvement)

**Improvement:** Portuguese language layer in `languages.ts` (stop words, skill aliases, headings, "pelo menos / no mínimo N anos", months, "até o momento", education words). Shared nurse case 32 → 75 (English 75), logistics 59 → 69 (CV years 0 → 7.8), frontend 71 → 76; all 105 English CV × posting pairs unchanged (compared with the previous engine).

**Running improvement backlog (next pushes):**
1. Extend alias lists from real postings per language
2. CV quality check in other languages
3. Seniority words in TR/DE/ES/PT/ZH titles

- 220 unit / browser tests green on the production build (verify passed on a9a45d7); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 40 (French at /fr)

**Status:** ✅ PASS (1 improvement)

**Improvement:** French years of experience are read. "ans" is a year unit and the years pattern accepts the elided "d'" (`YEARS_TAIL`, `CV_YEARS_RE` in analyze.ts), plus "au moins", French aliases, headings, months and "aujourd'hui"/"depuis". French postings now report the years asked for (0 → 3/5); nurse 31 → 76 (English 75), logistics 65 → 71 (CV years 0 → 7.8), frontend 69 → 74; 105 English pairs unchanged.

**Running improvement backlog (next pushes):**
1. Extend alias lists from real postings per language
2. CV quality check in other languages
3. Seniority words in TR/DE/ES/PT/FR/ZH titles

- 234 unit / browser tests green on the production build (verify passed on 80eb754); tsc 0 (web + mobile), ESLint 0; no tracked `.env`
