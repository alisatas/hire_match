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

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- New `/api/orchestrate/route.ts`: `agentKey` validated via `in AGENTS` guard before use — no arbitrary key injection ✅
- Swarm array: filtered with `(k): k is AgentKey => k in AGENTS` before any processing ✅
- No `dangerouslySetInnerHTML` in `orchestration-live.tsx` — all agent output in `<pre>` text node ✅
- ANTHROPIC_API_KEY consumed server-side only, never sent to client ✅
- No stack traces returned — `String(err)` only in error responses ✅
- `.mcp.json` ruflo entry uses `npx -y @claude-flow/cli@latest` — no secrets passed, sandboxed ✅
- All previous security controls unchanged (SSRF, webhook auth, PDF validation, headers) ✅
- 🟡 No rate limiting on `/api/orchestrate` — same medium risk as existing routes

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- `digital-loom-background.tsx`: canvas animation only, no user input, no innerHTML ✅
- `orchestration-live.tsx`: all agent output in `<pre>` text node ✅
- `framer-motion@12.38.0`: reputable library, no security concerns ✅
- `cv-analyzer.tsx` IIFE change: computed value only, no user input reaches it ✅
- All previous security controls unchanged (SSRF, CSP, webhook auth, PDF validation) ✅
- ⚠️ `graphify-out/` not committed — correctly omitted from staging
- 🟡 No rate limiting on `/api/orchestrate` (pre-existing medium warning)
