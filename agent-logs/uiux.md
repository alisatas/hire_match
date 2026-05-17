# 🎨 UI/UX Agent — Knowledge Log

Each entry records findings, user journey audits, and confirmed-safe decisions from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical, 2 medium warnings)

**User journey audit (land → upload → analyze → results → share):**
- Landing state: Sparkles icon + "Your results will appear here" — clear, action-oriented — ✅
- PDF upload: loading indicator shows "Reading PDF..." immediately — ✅
- Job URL fetch: spinner shown while scraping — ✅
- Analyze: button disabled during load, spinner visible — ✅
- Error state: error message shown in red, user can clear and retry — ✅
- "Paste text instead" toggle: visible as underlined link below textarea — ✅ (discoverable)

**Loading & async feedback:**
- All async actions covered by visible loading indicators — ✅
- Loading vs error states are visually distinct (spinner vs red text) — ✅

**Mobile (375px):**
- Two-column grid collapses to single column — ✅
- Results panel scroll works on mobile — ✅
- 🟡 Some tap targets may be under 44px (file input overlay area)
- Sample job buttons row may wrap on narrow screens — 🟡

**Accessibility:**
- File input has `aria-label="Upload PDF CV"` — ✅
- URL input has `aria-label` — ✅
- Score circle missing `aria-label` for screen readers — 🟡
- FAQ `<details>/<summary>` elements are keyboard-navigable — ✅
- Error messages NOT associated via `aria-describedby` — 🟡

**Visual consistency:**
- Border-radius: rounded-xl / rounded-2xl used consistently — ✅
- No hardcoded pixel widths that overflow on narrow screens — ✅
- Colour system: cyan = primary, emerald = success, amber = warning, rose = error, violet = HR/audit — consistent — ✅

**Changes this cycle:**
- HR Quick Scan card moved to right panel (results side) — cleaner UX: left panel stays focused on input
- HR Quick Scan compacted: single-line rows, smaller text, less padding — less visual noise
- Next Steps amber tier: "close 0 gaps" copy bug fixed

**Known warnings:**
- 🟡 Score circle has no `aria-label`
- 🟡 Some tap targets under 44px on mobile

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (0 critical)

- WebGL shader background: was hidden on production — FIXED
- Analyze button disabled state: was invisible against dark panel — FIXED (teal gradient opacity-50)
- Panel backgrounds: raised to 75% opacity — content clearly readable against shader
- Footer: · separators, text-xs — mobile-friendly ✅
- Page: added How It Works 3-step strip, stats row (40+ skills, 100% free, 0 signups, <3s), 7 FAQ items
- 🟡 Score circle still missing aria-label (known)

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (0 critical)

- New live orchestration dashboard: every async action (single agent, swarm) has visible loading state ✅
- `animate-pulse` on running status badge — visually distinct from idle/done/error ✅
- Error state shown in badge + appended to output panel — no silent failures ✅
- "Run all agents" + individual "Run agent" buttons both correctly disabled during any running state ✅
- Output panel auto-scrolls via `requestAnimationFrame` ✅
- Agent tab switcher appears only when multiple outputs exist — not shown prematurely ✅
- Full-width "Run agent" buttons: adequate tap targets on mobile ✅
- Ruflo badge on page with attribution link ✅
- Architecture note explains the streaming setup in plain terms ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, not introduced this cycle)

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (0 critical)

- Course list adaptive limit: shows 6–10 courses based on high-priority gap count — more actionable feedback for weak matches ✅
- `DigitalLoomBackground`: full-screen canvas behind content, `overflow-y-auto` on content div allows scroll ✅
- Weekly cadence cards on /orchestration: tap targets adequate, readable on mobile ✅
- All existing UI/UX controls unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, not introduced this cycle)

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (0 critical)

- `etheral-shadow.tsx` added to `src/components/ui/` — not yet imported in any page, so no user-facing changes this cycle ✅
- When integrated: component renders 100% width/height of parent — consumer must size the parent container appropriately
- Existing user journey (land → upload → analyze → results) unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, scheduled for next UI cycle)

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (0 critical)

- No UI/UX changes this cycle — all backend hardening only ✅
- Existing user journey, loading states, mobile layout, accessibility unchanged ✅
- 🟡 Score circle still missing `aria-label` (pre-existing, tracked for next UI cycle)

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (0 critical)

- Background replaced: WebGL shader → Canvas 2D particle dots. Visual change only — no UX regression ✅
- Feature chips row added below subtitle: non-interactive, `flex-wrap`, visible at all widths — no overflow risk ✅
- "🔗 Share results" button: only rendered inside `{results && ...}` — never visible on empty state ✅
- "Copy all" button in keywords section: visible feedback via `keywordsCopied` state (2s flash) ✅
- URL hash loading: fires on mount only, silent skip if hash absent/malformed — no UX impact on normal load ✅
- User journey unchanged: land → upload → analyze → read results — all steps still functional ✅
- 🟡 Score circle still missing `aria-label` (pre-existing — add in next UI cycle)
