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

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- `etheral-shadow.tsx`: no `dangerouslySetInnerHTML`, no user input, no eval/innerHTML — ✅
- Hardcoded Framer CDN URLs in CSS `maskImage` / `backgroundImage` — not user-controlled, no SSRF risk ✅
- CSS resource URLs (`framerusercontent.com`) served over HTTPS — covered by existing `img-src 'self' data: https:` CSP ✅
- framer-motion `animate()` usage: JS animation only, no DOM injection ✅
- No new API routes, no new user-input surfaces, no new auth changes ✅
- `analyze.ts` keyword length fix (`>= 4`): only affects scoring arithmetic — no security impact ✅
- JSON-LD additions in `layout.tsx`: static server-controlled strings — no XSS vector ✅
- All previous controls unchanged (SSRF, webhook auth, PDF magic bytes, rate limiting, CSP) ✅
- 🟡 CSP `script-src` still includes `'unsafe-inline'` in production — pre-existing, required for JSON-LD script tag

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical, 0 warnings — all previous 🟡s resolved)

- `/api/orchestrate`: auth guard added via `isAuthorized()` — closes 🟡 from Pushes 3–4 ✅
- `proxy.ts`: per-IP rate limiter added (5/min orchestrate, 10/min PDF/tweet/reddit, 15/min scrape, 30/min default) — closes all rate-limiting 🟡s ✅
- `analyze.ts`: input size guards (>200KB CV / >100KB JD throws) — prevents memory exhaustion from Telegram bot ✅
- `extract-pdf`: extracted text capped at 150KB — prevents pathological PDF OOM ✅
- `scrape`: script/style regex replaced with lazy quantifiers + 500KB pre-regex cap — ReDoS risk bounded ✅
- `tweet` + `reddit-comment`: AbortSignal.timeout added — functions can no longer hang indefinitely ✅
- Telegram `after()` blocks: both wrapped in try/catch — deploy failures now message the user ✅
- All previous checks (dangerouslySetInnerHTML, SSRF, CSP, headers, webhook auth, PDF magic bytes) unchanged ✅

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (0 critical)

- `shader-background.tsx`: Canvas 2D animation only, no user input, no innerHTML, no eval — ✅
- `encodeResults`: `JSON.stringify` + `encodeURIComponent` on server-controlled result object — no injection vector ✅
- `decodeResults`: `JSON.parse` inside try/catch, result only reaches React state (text nodes) — no XSS ✅
- `window.location.hash` passed through `decodeURIComponent` + `JSON.parse` with catch — safe ✅
- `window.history.replaceState`: URL manipulation only, no DOM write — ✅
- `navigator.clipboard.writeText`: requires user gesture, no security concern ✅
- `@radix-ui/react-slot`: reputable Radix UI library, no security concerns ✅
- Background color change in `globals.css` / `layout.tsx`: no security impact ✅
- `etheral-shadow.tsx` deleted — removes dead code, no security impact ✅
- All previous controls unchanged (SSRF, CSP, webhook auth, PDF magic bytes, rate limiting) ✅

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (0 critical)

- `applyUrl` derived as `jobUrl || (validUrl ? jobInput.trim() : "")` — `validUrl` requires `startsWith("http")`, ruling out `javascript:` protocol injection ✅
- `href={applyUrl}` in `<a>` tag: URL always starts with http/https — no XSS via protocol injection ✅
- `target="_blank"` with `rel="noopener noreferrer"` present ✅
- URL displayed in `<span>` as text node, never as HTML — no XSS ✅
- All previous controls unchanged (SSRF, CSP, webhook auth, rate limiting, PDF magic bytes) ✅
- No new API routes added this cycle ✅

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (0 critical)

- No API routes, no new inputs, no dangerouslySetInnerHTML — purely copy change ✅
- All previous security controls unchanged ✅

---

## 2026-11-10 — Push 10 (Whole-term skill matching + SEO entity links)

**Status:** ⚠️ WARN (0 critical, 3 medium — all pre-existing, none introduced this cycle)

- This cycle changes `src/lib/analyze.ts` (pure string matching), `layout.tsx` JSON-LD (static strings) and `public/llms.txt` — no new inputs, routes, or `dangerouslySetInnerHTML` sinks ✅
- `git ls-files` shows no tracked `.env*` files ✅; webhook secret + agent keys use `timingSafeEqual` ✅
- 🟡 `/api/scrape` SSRF guard is bypassable: `fetch()` follows redirects, so a public URL that 302s to `http://169.254.169.254/` or `http://localhost/` is fetched and its body returned. Hostname is also only string-checked (no DNS resolution), and `hostname === "::1"` never matches because `URL.hostname` returns `[::1]` with brackets. Low blast radius on Vercel serverless (no internal network), would be 🔴 on a self-hosted/VPC deployment. Fix: `redirect: "manual"` with re-validation per hop, and bracket-aware IPv6 checks.
- 🟡 Telegram bot has no chat/user allowlist: the webhook secret proves the request came from Telegram, not who sent the message. Any Telegram user who finds the bot can run `/status` (lists preview deployment URLs) and `/deploy` / `/deploy prod` (triggers Vercel deploy hooks). Fix: compare `chat.id` against an allowed-ID env var before handling commands.
- 🟡 CSP still allows `script-src 'unsafe-inline'`; `connect-src 'self' https:` is broad (carried forward)

- `tsc --noEmit`: 0 errors ✅ (Node 22.23.4). ESLint: 3 errors, all `react-hooks/set-state-in-effect` in `cv-analyzer.tsx` (lines 313, 322, 329) — not from this cycle's changes; the husky hook treats ESLint as non-blocking.

---

## 2026-11-10 — Push 11 (SSRF guard rewrite + Telegram and Twitter integrations removed)

**Status:** ✅ PASS (0 critical, 1 medium)

Fixes for the two 🟡 findings from Push 10:

- `/api/scrape`: redirects are now followed by hand (`redirect: "manual"`, max 5 hops) and every hop goes through `toPublicUrl()` before it is fetched ✅
- `toPublicUrl()` strips IPv6 brackets, rejects non-http(s) schemes, blocks loopback / private / link-local / CGNAT / IPv4-mapped ranges, and resolves hostnames via DNS so a public-looking name pointing at a private IP is rejected (3s DNS deadline) ✅
- Tested against the dev server: `localhost`, `[::1]`, `[::ffff:127.0.0.1]`, `169.254.169.254`, `127.0.0.1.nip.io`, `localtest.me` → all 400; a public http→https redirect is followed and returns 200 ✅
- Not exercised live: a public URL redirecting to a private address (the public redirector services tried returned 403). Covered by construction — each hop runs the same check.
- Telegram bot removed entirely (`/api/telegram/webhook` deleted) at the owner's request — the unauthenticated `/deploy` finding no longer applies ✅
- Twitter/X posting removed: `/api/tweet`, `scripts/twitter-post.mjs`, `scripts/twitter-campaign.mjs` and the `twitter:post` npm script deleted — two fewer credential-bearing endpoints ✅
- Follow-up outside the repo: delete the bot's webhook with Telegram, and remove the `TELEGRAM_*`, `TWITTER_*` and deploy-hook variables from Vercel if nothing else uses them
- 🟡 Residual: DNS rebinding between the check and the fetch is still theoretically possible (the fetch resolves the name again). Closing it needs pinning the connection to the checked IP.
- 🟡 CSP `unsafe-inline` carried forward
- `tsc --noEmit`: 0 errors; ESLint on `src/app/api`: clean ✅

---

## 2026-11-10 — Push 12 (Lint clean-up, shared-link hardening, stale robots.txt removed)

**Status:** ✅ PASS (0 critical, 2 medium)

- Shared-link input is now validated before use; persona colour restricted to an allowlist so a crafted link cannot inject class names ✅
- 🟡 DNS rebinding window in `/api/scrape` and CSP `unsafe-inline` carried forward
- Vercel environment variables (`TWITTER_*`, `TELEGRAM_BOT_TOKEN`, deploy hooks, `VERCEL_TOKEN`) left in place at the owner's request — unused by the code

---

## 2026-11-10 — Push 13 (Score calibration, accessibility, FAQ markup)

**Status:** ✅ PASS (0 critical)

- FAQ JSON-LD is built from static strings and `<` is escaped before `dangerouslySetInnerHTML` ✅
- No new inputs or routes ✅

---

## 2026-11-10 — Push 14 (UI redesign: Daylight theme)

**Status:** ✅ PASS (0 critical)

- No new inputs, routes or `dangerouslySetInnerHTML` sinks; external links keep `rel="noopener noreferrer"` ✅

---

## 2026-11-10 — Push 15 (Google Tag Manager + consent banner)

**Status:** ✅ PASS (0 critical, 1 medium)

- GTM loads only when `NEXT_PUBLIC_GTM_ID` is set; without it no third-party script, cookie or banner is added ✅
- Google Consent Mode v2: all storage types default to `denied` before GTM loads; `granted` only after "Accept all"; "Reject all" and the footer "Cookie settings" link let visitors change their choice ✅
- Event parameters contain only scores, counts and labels — never CV or job-description text ✅
- CSP `script-src` widened to googletagmanager.com, googleadservices.com, googleads.g.doubleclick.net, google.com; `frame-src` added for GTM/DoubleClick ✅
- 🟡 Any tag added later inside GTM (e.g. Meta Pixel) needs its domains added to the CSP, and must be configured to respect consent in GTM
- Privacy copy updated (FAQ, hero, llms.txt) so "private" claims refer to the CV, with analytics disclosed as consent-based ✅

