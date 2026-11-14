# 🧪 QA Agent — Knowledge Log

Each entry records findings, edge-case tests, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/qa.md`.

---

## 2026-11-14 — Push 39 (Brazilian Portuguese at /pt)

**Status:** ✅ PASS (0 critical, 1 note)

Engine additions are data (stop words, aliases, headings, years, months). Pathological-input tests still finish quickly; Portuguese fixtures (frontend, nurse, logistics) score within 10 points of English with the same years. 🟡 Note: the month prefixes `set`/`out` (setembro/outubro) only apply directly before a year in a date range, so "set 2019 – 2021" reads as September; an English "out 2019" before a range would read as October — harmless (month precision only).

- 220 unit / browser tests green on the production build (verify passed on a9a45d7); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 40 (French at /fr)

**Status:** ✅ PASS (0 critical)

French fixtures (frontend, nurse, logistics) score within 10 points of English with the same years. French stop words ("plus", "missions", "minimum", "profil" …) also apply to English text: all 105 English CV × posting pairs compared with the previous engine, 0 changed. "juin"/"juillet" share the prefix "jui" and are left out on purpose — the year still counts, only month precision is lost.

- 234 unit / browser tests green on the production build (verify passed on 80eb754); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 41 (Flags in the language menu)

**Status:** ✅ PASS (0 critical)

`LOCALE_INFO.flag` and the SVG map are both `Record`-typed, so a language or country without a flag fails `tsc` instead of rendering nothing. Title-seniority words in DE/ES/PT/FR/TR unit-tested (7 titles), plus a test that leadership words below the title line do not count. Engine comparison: 48 English CV × posting pairs (fixtures × fixture and sample jobs) and every intl fixture unchanged.

- verify on the pushed commit (see report); tsc 0 (web + mobile), ESLint 0; no tracked `.env`
