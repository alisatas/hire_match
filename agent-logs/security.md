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


---

## 2026-11-11 — Push 17 (SEO: role keyword pages, score explainer, AI crawler access)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- 3 new `dangerouslySetInnerHTML` sinks (JSON-LD on `/resume-keywords` and `/resume-keywords/[role]`) — all built from static data in `roles.ts` and passed through the shared `jsonLdScript()` which escapes `<`; the root-layout JSON-LD now uses the same helper ✅
- `[role]` param is only used as a lookup key against the static `ROLES` list (`dynamicParams = false` → unknown slugs 404); it is never rendered or fetched ✅
- `robots.ts`: named AI-crawler group now repeats `Disallow: /api/` — previously those bots matched only their own group and were not told to stay out of the API ✅
- `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` are public ownership tokens read from env, not secrets ✅
- No new routes, inputs, or console logging; `git ls-files .env*` empty ✅
- 🟡 CSP still allows `unsafe-inline` (carried forward — required by GTM / inline JSON-LD)

---

## 2026-11-11 — Push 18 (New logo, card grid + breadcrumb fixes, HowTo moved, alias clean-up)

**Status:** ✅ PASS (0 critical, 1 medium carried)

- Logo is inline SVG with static paths; `src/app/icon.svg` is a static file — no user input reaches either ✅
- Removed the `data:` SVG favicon from `metadata.icons`; favicon now served as `/icon.svg` via the file convention ✅
- HowTo JSON-LD moved to `page.tsx`, still static and passed through `jsonLdScript()` ✅
- No new routes, inputs or logging ✅
- 🟡 CSP still allows `unsafe-inline` (carried forward)

---

## 2026-11-11 — Security hardening pass (senior security review of the whole project)

**Status:** ✅ PASS (0 critical open, 2 medium open)

Full read of `src/app/api/**`, `src/proxy.ts`, `next.config.ts`, client link rendering, share-link decoding, scripts and dependencies. Every fix below was exercised against the running server with attack inputs.

**Fixed — high**
- **SSRF via DNS rebinding (`/api/scrape`)**: the old guard resolved DNS, then `fetch()` resolved again — a rebinding DNS server could answer the check with a public IP and the connection with 127.0.0.1 / 169.254.169.254. New `src/lib/server/safe-fetch.ts` resolves once, requires *every* record to be public, and pins the socket to that address (no second lookup). Redirects re-validated per hop.
- **Unbounded body read (`/api/scrape`)**: `response.text()` read the whole body when `Content-Length` was absent (chunked). Now streamed with a 2 MB cap counted *after* decompression (gzip/deflate/br bomb safe).
- **Vulnerable dependency**: `pdfjs-dist@5.7` (GHSA-hq66-cqwq-w95j, JS execution from a malicious PDF) was a direct dependency used nowhere — removed. `unpdf` bundles PDF.js 6.4.299 (patched).

**Fixed — medium**
- SSRF range gaps: added NAT64 `64:ff9b::`, 6to4 `2002::`, IPv4-mapped/compatible forms judged by their embedded IPv4, TEST-NETs, benchmarking, IPv6 multicast/discard/documentation. Non-80/443 ports, credentials in URL, `.lan` hosts refused. DNS has its own 3 s deadline.
- **Cross-site request forgery on API writes**: other sites could make visitors' browsers drive the scraper (text/plain form post of a JSON body). `proxy.ts` now refuses non-GET requests with a foreign `Origin` or `Sec-Fetch-Site: cross-site`; `/api/scrape` requires `application/json` (forces a preflight).
- **PDF upload buffered before the size check**: `formData()` ran before the 5 MB check. Now refused from `Content-Length` (proxy + route; missing length → 411). Page cap 30 (a tiny PDF can declare thousands of pages); fonts/XFA disabled; document destroyed after use.
- **Third-party URLs in `href`**: interview-search result links (scraped from DuckDuckGo HTML) and the Apply link went straight into `<a href>` — a `javascript:` URL would run in our origin. Server now unwraps `uddg` redirects and keeps only http(s); client filters through `safeHttpUrl()` as a second layer.
- **Owner-route auth**: two copies of the key check, one with odd padding logic and a length leak. Replaced by `src/lib/server/auth.ts` — SHA-256 both sides + `timingSafeEqual`, key < 24 chars never authorises.
- `/api/orchestrate`: `in` check matched prototype keys (`toString`, `__proto__`) → `Object.hasOwn`; swarm de-duplicated and capped at 10; raw error text no longer streamed to the client.
- `/api/reddit-comment`: `postId` accepted any thing type (`t1_` comment, `t4_` message…) → only `[t3_]<id>`.
- Rate limiter: keyed on the client-controlled first `X-Forwarded-For` entry → `x-real-ip` first; tracked-key map capped at 10 000.
- `scripts/instagram-post.mjs` printed the live Instagram access token in its expiry warning (CI logs) → placeholder.

**Fixed — low / hardening**
- CSP: added `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `worker-src`, `manifest-src`, `upgrade-insecure-requests` (prod); `connect-src` narrowed from any `https:` to the Google tag hosts — limits exfiltration if script is ever injected.
- Added `Cross-Origin-Opener-Policy: same-origin`, `X-Permitted-Cross-Domain-Policies: none`, wider `Permissions-Policy`, `poweredByHeader: false`; `/api/*` responses `X-Robots-Tag: noindex` + `no-store`.
- `NEXT_PUBLIC_GTM_ID` is interpolated into an inline script → validated against `^GTM-[A-Z0-9]{4,12}$`.
- `/api/interview-questions`: company length 2–80, control characters stripped, result fields truncated.

**Verified (dev server):** 16 SSRF inputs → 400 (loopback, metadata, `[::ffff:7f00:1]`, decimal/hex/short IPv4, port 22, credentials, `localtest.me`, `*.nip.io`, `file:`); public page → 200; cross-site Origin / Sec-Fetch-Site → 403; text/plain → 415; 100 KB JSON → 413; 6.5 MB PDF → 413; fake PDF → 400; real 2-page PDF → 200; 40-page PDF → 422; owner routes without/with wrong key → 401; 200-char company → 400; 16th request/min → 429. Full analyze flow in the browser works, no new CSP violations.

**Still open**
- 🟡 CSP `script-src 'unsafe-inline'` — needs per-request nonces (proxy-generated) for the GTM bootstrap and JSON-LD; GTM would need nonce-aware config
- 🟡 Rate limiting is per server instance (in memory); a shared store (Upstash / Vercel KV) is needed for a real global limit
- 🟢 Remaining `npm audit`: moderate/low only, in dev tooling (`shadcn` CLI chain) and `@anthropic-ai/sdk` (used by a local script; the advisory concerns a feature not used)
- Not verified: Google tag traffic under the narrowed `connect-src` (GTM did not load locally without consent) — check the browser console on production after deploy
- `/orchestration` page is public (noindex); its API is key-protected

---

## 2026-11-11 — Push 19 (Security hardening, 2 role guides, business skill groups)

**Status:** ✅ PASS (0 critical, 2 medium open)

- Ships the hardening pass logged above (commit 8ce51d7): DNS-rebinding-safe scraper, cross-site write blocking, pre-parse PDF size checks, safe hrefs, shared constant-time auth, `pdfjs-dist` removed, tighter CSP
- This cycle's other changes are static data (role guides, skill aliases, course links) — no new inputs or sinks; new course URLs are fixed https links ✅
- `git ls-files .env*` empty ✅
- 🟡 Open: CSP `unsafe-inline`; per-instance rate limiting
- After deploy: check the production console for CSP blocks on Google tag traffic (narrowed `connect-src`)

---

## 2026-11-11 — Push 20 (Legal pages, optional support, 2 business role guides, short-CV calibration)

**Status:** ✅ PASS (0 critical, 2 medium carried)

- Support checkout link comes only from `NEXT_PUBLIC_SUPPORT_CHECKOUT_URL` and is accepted only as an `https` `lemonsqueezy.com` URL — a typo or tampered value cannot send visitors to another site; opens with `rel="noopener noreferrer"` ✅
- `NEXT_PUBLIC_CONTACT_EMAIL` validated before it reaches a `mailto:` link ✅
- Legal pages and role guides are static; no new inputs, routes or `dangerouslySetInnerHTML` ✅
- No personal data (name, address, email) published on the legal pages without the owner's choice
- 🟡 Carried: CSP `unsafe-inline`; per-instance rate limiting

---

## 2026-11-11 — Push 21 (Support section removed, legal-page JSON-LD, date-range experience)

**Status:** ✅ PASS (0 critical, 2 medium carried)

- Support section removed from the home page; the checkout-URL allowlist in `site.ts` stays for future use ✅
- New JSON-LD on legal pages is static and passes through `jsonLdScript()` ✅
- Date-range parser: bounded regexes on line-split CV text, no nested quantifiers — no ReDoS risk at the 200 000-char input cap ✅

---

## 2026-11-11 — Push 22 (Corporate hardening: technical SEO assets, CSP reporting, CI gate)

**Status:** ✅ PASS (0 critical, 2 medium carried)

- `/orchestration` (internal agent dashboard) now 404s in production unless `ENABLE_ORCHESTRATION_PAGE=1` — verified in the production build (prerendered as the 404 page) ✅
- **CSP violation reporting**: `report-uri` + `report-to` → `/api/csp-report`. Accepts legacy and Reporting API formats, 16 KB cap, rate-limited (10/min/IP), logs directive + blocked origin + page path only (query strings dropped — verified a `?q=secret` never reaches the log), extension noise skipped, nothing stored ✅
- `Cross-Origin-Resource-Policy: same-origin` on `/api/*`; `Reporting-Endpoints` header ✅
- `/.well-known/security.txt` (RFC 9116) served once `NEXT_PUBLIC_CONTACT_EMAIL` is set; 404 until then so no dead contact is published ✅
- **CI gate** (`.github/workflows/ci.yml`): typecheck, lint, build and `npm audit --omit=dev --audit-level=high` on every push / PR, read-only token ✅
- Decision recorded: nonce-based CSP not adopted — it forces every page to dynamic rendering (no static output, no CDN cache), which costs Core Web Vitals. Revisit if compliance requires removing `unsafe-inline`
- 🟡 Carried: CSP `unsafe-inline`; per-instance rate limiting

---

## 2026-11-11 — Push 23 (AI Engineer sample job + guide, AI skill vocabulary)

**Status:** ✅ PASS (0 critical, 2 medium carried)

- Static data only (sample job text, role guide, skill aliases); two new fixed https course links (pinecone.io, madewithml.com) rendered with `rel="noopener noreferrer"` ✅
- No new inputs, routes or sinks; `git ls-files .env*` empty ✅
- 🟡 Carried: CSP `unsafe-inline`; per-instance rate limiting

---

## 2026-11-11 — Push 24 (Cross-sector samples, Financial Analyst guide, month-precise experience)

**Status:** ✅ PASS (0 critical, 2 medium carried)

- Static content only (sample job texts, role guide, month table); new regex groups are bounded (`[a-z]{3,9}`, `\d{1,2}`) on line-split input — no ReDoS risk ✅
- No new inputs, routes or sinks; `git ls-files .env*` empty ✅
- 🟡 Carried: CSP `unsafe-inline`; per-instance rate limiting
