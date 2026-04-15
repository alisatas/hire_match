# 🔌 API Agent — Knowledge Log

Each entry records findings, validation checks, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Scrape route (`/api/scrape`):**
- URL validated with `new URL()` parse, not just `startsWith` — ✅
- No maximum URL length check — 🟡 low risk, note for future
- Response body size capped before `response.text()` — ✅ (checked in route)
- `Content-Type` of scraped response validated — 🟡 partial: type checked but not strictly enforced
- 15s `AbortController` timeout present — ✅ (server-side fetch may continue but client gets timeout response)

**Extract-PDF route (`/api/extract-pdf`):**
- File size check (5MB limit) done before `arrayBuffer()` — ✅
- Page count limit not explicitly set — 🟡 very large PDFs could be slow
- Raw `err.message` from `unpdf` NOT returned in response — ✅ (generic error message returned)

**Telegram webhook (`/api/telegram/webhook`):**
- Secret token validated on every request — ✅
- String comparison is NOT constant-time — 🟡 timing attack theoretically possible, low practical risk for webhook secret
- `TELEGRAM_BOT_TOKEN` undefined → route returns 500 safely — ✅
- `after()` background task has error handling — ✅

**Response hygiene:**
- No stack traces returned to caller — ✅
- All error paths return correct HTTP status codes — ✅
- Sensitive endpoints return `Cache-Control: no-store` — ✅

**Known warnings (non-blocking):**
- 🟡 No rate limiting on `/api/scrape` and `/api/extract-pdf`
- 🟡 No constant-time token comparison on webhook (low practical risk)
- 🟡 No explicit URL length cap on scrape route
