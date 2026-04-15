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
