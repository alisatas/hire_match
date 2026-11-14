# 🔐 Security Agent — Knowledge Log

Each entry records findings, improvements, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/security.md`.

---

## 2026-11-13 — Push 37 (Native Android app in mobile/, SEO brief, seniority signal)

**Status:** ✅ PASS (0 critical)

- New route `/.well-known/assetlinks.json`: static, built from `ANDROID_CERT_SHA256`; malformed fingerprints dropped; 404 when unset. Attack-suite case added
- Mobile app calls `/api/extract-pdf` and `/api/scrape` without a browser `Origin`; the cross-site guard and rate limits apply unchanged (native fetch is not a cross-site browser request)
- No secrets in `mobile/`; generated `mobile/android` and signing keys are git-ignored
- 198 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical (2 low, 4 moderate); no tracked `.env`

---

## 2026-11-13 — Push 38 (Legal pages, samples, course details, score card and 404 in every language)

**Status:** ✅ PASS (0 critical)

- New routes `/[lang]/terms|privacy|refund-policy`: static, `isLocale` guard, 404 otherwise; content is server data rendered as JSX text
- 404 page reads the language from `location.pathname` with a fixed regex; no user text reaches the DOM
- 203 unit / 92 browser tests green on the production build; tsc 0 (web + mobile), ESLint 0; prod audit 0 high/critical; no tracked `.env`

---

## 2026-11-14 — Push 39 (Brazilian Portuguese at /pt)

**Status:** ✅ PASS (0 critical)

No API, proxy, header or analyzer change. New content is plain strings rendered as text nodes; legal.pt.tsx uses the same `CONTACT_EMAIL` constant and Lemon Squeezy links as the other languages. 404 language regex gained `pt` only (anchored, no backtracking risk). No new sinks (`dangerouslySetInnerHTML`, `eval`, `console.log`) in the diff; attack suite green.

- 220 unit / browser tests green on the production build (verify passed on a9a45d7); tsc 0 (web + mobile), ESLint 0; no tracked `.env`
