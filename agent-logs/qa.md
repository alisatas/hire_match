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
