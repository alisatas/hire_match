# 🔐 Security Agent — Knowledge Log

Each entry records findings, improvements, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/security.md`.

---

## 2026-11-14 — Push 40 (French at /fr)

**Status:** ✅ PASS (0 critical)

No API, proxy, header or analyzer change. New content is plain strings rendered as text nodes; legal.fr.tsx uses the same `CONTACT_EMAIL` constant and Lemon Squeezy links as the other languages. 404 language regex gained `fr` only. The years regex change (`d['’]` before the experience word) is bounded — pathological-input tests still finish quickly. No new sinks in the diff; attack suite green.

- 234 unit / browser tests green on the production build (verify passed on 80eb754); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 41 (Flags in the language menu)

**Status:** ✅ PASS (0 critical)

No API, proxy, header or analyzer-input change. `Flag` renders static SVG from a typed map — no user input, no new sinks. The title-seniority regex gained alternatives only (`mudur\w*` is a single bounded run on a ≤120-char line); attack suite green.

- verify on the pushed commit (see report); tsc 0 (web + mobile), ESLint 0; no tracked `.env`

---

## 2026-11-14 — Push 42 (App settings screen)

**Status:** ✅ PASS (0 critical)

App-only push, `mobile/` read. Settings links are built from a hard-coded `https://cvxray.com` plus `localePath()` of a typed locale — no user input reaches `Linking.openURL`. `prefs.json` lives in the app's private document folder, holds only the language, and every read is validated with `isLocale` (a tampered file falls back to the phone's language). No secrets, no logging, no new network calls. `@/lib/site` is deliberately not imported in the app (reads `process.env` at load).

- verify on the pushed commit (see report); no tracked `.env`
