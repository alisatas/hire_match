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

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- No API route changes this cycle

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- New `/api/orchestrate` route: `agentKey` validated against `AGENTS` object — no uncontrolled access ✅
- `swarm` array filtered with type guard before processing ✅
- Input is minimal JSON (key name only) — no body size risk ✅
- No stack traces in responses — `String(err)` only ✅
- Status codes correct: 400 on bad input ✅
- `maxDuration: 60` set on SSE streaming route ✅
- `runtime: "nodejs"` explicit ✅
- Existing routes (scrape, extract-pdf, telegram) unchanged — all previous API checks still pass ✅
- 🟡 No `Cache-Control: no-store` on orchestrate error responses (low risk, not sensitive data)

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- Content-type validation added to scrape route (diff confirmed) — previously a 🟡 warning, now resolved ✅
- PDF magic bytes validation added to extract-pdf route (diff confirmed) — MIME spoofing guard ✅
- No new API routes added this cycle
- Orchestrate route unchanged from Push 3 ✅
