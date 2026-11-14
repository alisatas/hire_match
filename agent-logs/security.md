# 🔐 Security Agent — Knowledge Log

Each entry records findings, improvements, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

Only the latest 3 entries are kept here; older ones are in `archive/security.md`.

---

## 2026-11-13 — Push 36b (Guides and articles in TR / DE / ES / ZH, 20 → 90+ indexable pages)

**Status:** ✅ PASS (0 critical)

- New dynamic routes `/[lang]/resume-keywords/[role]` and `/[lang]/blog/[slug]`: `dynamicParams = false`, slug looked up per language, unknown → 404
- No new sinks: translated content is static server data rendered as text; JSON-LD still through `jsonLdScript()`
- 195 unit / 91 browser tests green on the production build; tsc 0, ESLint 0; no tracked `.env`

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
