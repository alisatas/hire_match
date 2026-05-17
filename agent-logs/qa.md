# 🧪 QA Agent — Knowledge Log

Each entry records findings, edge-case tests, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Data integrity checks:**
- `analyze()` returns `matched: []` and `missing: []` → UI renders empty sections gracefully — ✅
- `results.topJobSignals` empty → keywords section hidden — ✅
- `results.score` = 0 → SVG strokeDashoffset = 283 (full circle) renders correctly — ✅
- `results.score` = 100 → strokeDashoffset = 0 renders correctly — ✅
- PDF returning 100% whitespace → triggers "no text extracted" error, does NOT pass empty string to `analyze()` — ✅

**Race conditions & async:**
- 🟡 Double-click "Analyze" can queue two concurrent analyses — stale results possible (not blocking, no crash)
- `setIsLoading(false)` called in finally block, so abandoned requests always unlock UI — ✅
- PDF handler uses `pdfStatus` state to indicate in-progress; second upload overwrites safely — ✅

**LocalStorage:**
- `try/catch` wraps all localStorage reads and writes — ✅
- Malformed JSON from `JSON.parse` is caught and returns empty array — ✅

**Edge inputs:**
- CV text of 1 character: `analyze()` returns score ~5 (floor), no division-by-zero — ✅
- Job description with only stop words: `rawTotal = 0` → `keywordScore = 0` correctly without division-by-zero (guarded by `|| 0`) — ✅
- URL `http://` (no domain): rejected by `new URL()` parse before reaching scraper — ✅

**Fixed this cycle:**
- Next Steps amber tier (45-69%): was showing "close 0 gaps" when `highGaps.length === 0` — fixed to show "Good match — apply and highlight your strengths" instead

**Known warnings:**
- 🟡 Race condition on double-click Analyze — low severity, no data corruption

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- WebGL canvas hidden in production — FIXED: body was opaque (#0d0b1a), changed to transparent
- Analyze button invisible in disabled state — FIXED: now uses teal gradient at opacity-50
- Panel readability — FIXED: bg-background/40 → bg-background/75
- Flash on refresh still prevented: html keeps #0d0b1a inline style ✅
- No regressions in analyze flow, results display, or HR Quick Scan

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- Swarm SSE stream: `controller.close()` called after all agents complete — loading state never stuck ✅
- Per-agent `try/catch` in swarm loop: one agent error doesn't crash the full swarm stream ✅
- Single agent mode: `toTextStreamResponse()` handles Anthropic errors gracefully ✅
- Client-side error catch: sets status → "error", appends `[Error: ...]` — always shows feedback ✅
- `statuses[agentKey] === "running"` guard prevents concurrent runs on same agent ✅
- Empty swarm input `[]` → filtered to `valid` → returns 400 before any processing ✅
- `outputRef.current` null-checked before auto-scroll ✅
- TypeScript: 0 errors after fixing `maxOutputTokens` (was `maxTokens`) and removing spurious `await` ✅

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- Course list IIFE: `highPriorityGaps` correctly counts only skills with a resource entry ✅
- `courseLimit = Math.min(Math.max(6, highPriorityGaps + 2), 10)` — floor 6, ceiling 10 ✅
- `})()}` closure correct, TypeScript 0 errors confirmed ✅
- `digital-loom-background.tsx`: useEffect returns cleanup (cancelAnimationFrame + removeEventListener) ✅
- New `Thread` class: constructor initialises all fields before `reset()` — no strict-mode issues ✅
- Orchestration SSE stream: cleanup paths unchanged from Push 3 ✅

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- `etheral-shadow.tsx`: component is purely presentational — no data flow, no user input ✅
- framer-motion cleanup: `hueRotateAnimation.current?.stop()` called in useEffect return — no memory leak ✅
- `animationEnabled` guard: SVG filter only rendered when `animation.scale > 0` — no crash on undefined animation ✅
- 🟡 SVG filter graph ordering: `feColorMatrix in="dist"` references a result produced by a later primitive. Browser fallback handles this silently (no crash), but visual output may differ from design intent. Non-blocking — cosmetic only.
- `analyze.ts` keyword fix: `w.length >= 4` now includes "java", "rust", "html", "node" in keyword scoring — calibration improvement, no data integrity risk ✅
- No new async flows, no new loading states, no new localStorage access ✅
- All previous QA checks unchanged ✅

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical)

- `analyze()` now throws on >200KB CV or >100KB JD — UI users cannot hit this (PDF capped at 150KB, pasting 200KB manually impossible) ✅
- Rate limiting (429): existing catch blocks in UI surface the error correctly ✅
- `extract-pdf` text cap at 150KB: `analyze()` receives truncated but valid text — no parsing errors ✅
- No new async flows introduced; all existing loading/error states unchanged ✅
- 🟡 Telegram bot does not pre-check text length before calling analyze() — throw would propagate; low risk as 200KB Telegram input is pathological
