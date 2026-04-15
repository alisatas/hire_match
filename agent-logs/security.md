# 🔐 Security Agent — Knowledge Log

Each entry records findings, improvements, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Checks performed:**
- `dangerouslySetInnerHTML`: not used anywhere in the app — ✅
- User input (CV text, job text) rendered as React text nodes only — ✅
- `stripHtml()` in scrape route strips tags before returning to UI — ✅
- No `eval()`, `new Function()`, `innerHTML`, `document.write()` patterns found — ✅
- SSRF block: private ranges (127.x, 10.x, 172.16-31.x, 192.168.x, 169.254.x, ::1, localhost, metadata.google.internal) all blocked in `/api/scrape/route.ts` — ✅
- `Content-Type` on scrape response validated before processing — ✅
- `.env` files not tracked by git (`git ls-files .env*` = empty) — ✅
- Secrets accessed via `process.env` only — ✅
- No `console.log` leaking CV text or tokens — ✅
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `CSP`) present in `next.config.ts` — ✅
- CSP does NOT include `unsafe-inline` or `unsafe-eval` — ✅
- Telegram webhook protected by secret token validation — ✅
- PDF size capped before buffer read — ✅
- MIME type validated server-side — ✅

**Warnings (non-blocking):**
- 🟡 `/api/scrape` and `/api/extract-pdf` lack rate limiting — open to abuse but not exploitable for injection

**Known improvements needed:**
- Add rate limiting to `/api/scrape` and `/api/extract-pdf` (medium priority)

**LINKEDIN_ACCESS_TOKEN removed from `cvxray-company/.env`** — was a hardcoded secret, now deleted ✅

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- body `style={{ backgroundColor: 'transparent' }}` — no security impact, purely visual
- html `style={{ backgroundColor: '#0d0b1a' }}` — no security impact
- No new API routes, no new user inputs, no new dangerouslySetInnerHTML
- `bg-background/75` panel opacity change — purely visual
- Button disabled state change — purely visual
- All previous security controls unchanged
