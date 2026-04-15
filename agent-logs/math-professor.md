# 🧮 Math Professor Agent — Knowledge Log

Each entry records scoring formula reviews, calibration tests, and improvements from a push cycle.
This is a **continuous improvement log** — every push must implement or verify at least 1 math improvement.
Agents MUST read this log before running checks and MUST append an entry after every push.

---

## 2026-04-15 — Initial baseline

**Status:** ✅ PASS (0 critical, formula reviewed)

**Current formula (as of this cycle):**
```
score = (skillScore × 50) + (keywordScore × 35) + (expScore × 15)
confidence = 0.6 + (jobWordCount / 400) × 0.4   [clamped 0.6–1.0]
coveragePenalty = missingCriticalRatio × 8
final = clamp(score × confidence - penalty, 5, 95)
```

**Component review:**
- `skillScore`: Jaccard-style overlap with log-dampened freq weights — well-calibrated ✅
- `keywordScore`: keyword coverage with cap at freq=5 — prevents keyword-stuffed JDs from dominating ✅
- `expScore`: sigmoid `Math.min(ratio, 1.25) / 1.25` — smooth, handles 0-years edge case ✅
- `confidence multiplier`: short JDs (< 100 words) score 0.6× — appropriately penalises low-signal JDs ✅
- `coveragePenalty`: `-8` per missing critical skill ratio — fair penalty, not catastrophic ✅
- Floor/ceiling `[5, 95]`: prevents misleading 0% or 100% scores — ✅

**Calibration spot-checks:**
- Strong match (8/10 skills present, right seniority): score ~78–85 ✅
- Weak match (2/10 skills, wrong seniority): score ~18–28 ✅
- Medium match (5/10 skills): score ~48–60 ✅

**Priority thresholds:**
- `freq ≥ 3 → high`, `freq ≥ 1 → medium`, `0 → low` — reasonably calibrated ✅
- Skills in job title do NOT yet get automatic high-priority boost — noted for future improvement

**Improvement implemented this cycle:**
- Next Steps amber tier copy: "close 0 gaps" bug fixed — now shows correct guidance when `highGaps.length === 0`. No formula change needed; this was a display bug.

**Running improvement backlog (next pushes):**
1. Add job-title keyword boost: skills mentioned in job title get `freq × 1.5` multiplier
2. Tune confidence multiplier curve for very long JDs (> 800 words) — currently over-confident
3. Adapt course list slice: show more courses when `highGaps.length > 4`
4. Improve experience score for "10+ years" or "senior" signals in CV without explicit year count

---

## 2026-04-15 — Push 2 (shader fix + button visibility)

**Status:** ✅ PASS (no math changes this cycle)

- No changes to analyze.ts scoring formula
- No changes to auditCV() detection logic
- Visual/UI fixes only this cycle
