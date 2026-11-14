# 🎨 UI/UX Agent — Knowledge Log

Each entry records findings, user journey audits, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/uiux.md`.

---

## 2026-11-14 — Push 40 (French at /fr)

**Status:** ✅ PASS (0 critical)

/fr home flow checked by hand: French nurse CV + posting → "Candidat solide" 75 %, "Clinique / soins aux patients" matched, all copy in French ("vous", "offre d'emploi"). Seven languages in the header menu and footer (browser test at 375 px green).

- 234 unit / browser tests green on the production build (verify passed on 80eb754); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 41 (Flags in the language menu)

**Status:** ✅ PASS (0 critical)

Flags next to every language in the header menu and the current flag in the menu button (replaces the globe). Decorative (`aria-hidden`); the button's accessible name still starts with the visible code. At 375 px: no horizontal overflow, menu rows and button 44 px. Footer list left without flags on the owner's request. Flags are inline SVG — emoji flags show as letters on Windows.

- verify on the pushed commit (see report); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 42 (App settings screen)

**Status:** ✅ PASS (0 critical)

App-only push, `mobile/` read. Settings follows the platform grouped-list pattern: uppercase section headers, icon tiles, value + chevron for navigation, external-link mark for browser links, version and © at the bottom; standard nav bar with back label and centred title. Rows 54 px, header buttons 44 px; roles `button` / `link` / `radio` with checked state, headers marked. Checked in 7 languages on the emulator (long German/Portuguese labels fit). Language page uses emoji flags (fine on Android/iOS; the web keeps SVGs for Windows).

- verify on the pushed commit (see report)
