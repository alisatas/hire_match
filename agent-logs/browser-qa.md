# 🌐 Browser QA Agent — Knowledge Log

Each entry records browser-level findings, console errors, and CWV risks from a push cycle.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical)

**Critical routes:**
- `/` loads without console errors — ✅
- No hydration mismatches — ✅
- WebGL shader background renders without WebGL errors — ✅ (graceful fallback if WebGL unavailable)

**Form validation flows:**
- Empty CV + empty job → Analyze button disabled — ✅
- Invalid URL → caught by `new URL()`, error message shown — ✅
- Valid PDF upload → text extracted, status badge shown — ✅

**Core Web Vitals risks:**
- WebGL shader background: canvas is fixed position, `-z-10`, does NOT cause layout shift — ✅
- Large images: none used, all icons are SVG/lucide — ✅
- Font loading: Google Fonts loaded with `display=swap` — ✅
- 🟡 PDF extraction on large files may cause TTFB delay (no streaming)

**Keyboard navigation:**
- All buttons keyboard-focusable — ✅
- File input triggered by Enter/Space on label — ✅
- FAQ details/summary keyboard-navigable — ✅
- Tab order logical throughout page — ✅

**Known warnings:**
- 🟡 PDF extraction blocking — large files may slow perceived performance
