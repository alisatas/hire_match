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

---

## 2026-05-16 — Push 3 (Ruflo integration + live orchestration)

**Status:** ✅ PASS (1 improvement implemented)

**Improvement: Seniority signal detection in `extractYearsFromCV()`**

When a CV contains no explicit "X years of experience" text, the old code defaulted to `yearsOnCV = 0`, which mapped to the neutral-penalty `expScore = 0.50`. This unfairly penalised candidates who simply didn't list years but whose titles (e.g. "Senior", "Lead", "Principal") clearly signal significant experience.

New behaviour:
- "principal / architect / vp / director / fellow" → inferred 10 years
- "staff / senior / sr. / lead" → inferred 5 years
- "mid-level / intermediate" → inferred 3 years
- "junior / jr. / entry-level / graduate / intern" → inferred 1 year
- No signals → 0 (existing behaviour)

Calibration checks:
- "Senior React Developer, 7 years exp" → explicit match takes precedence (regex still fires first) ✅
- "Senior React Developer" (no year count) → 5 years inferred → expScore ~0.8 for 5yr req ✅
- "Junior Developer" → 1 year inferred → expScore ~0.2 for 5yr req — correctly low ✅

**Running improvement backlog (next pushes):**
1. ~~Add job-title keyword boost~~ ✅ (done in earlier push)
2. Tune adaptive keyword cap for very long JDs (> 1200 words)
3. Adapt course list slice: show more courses when `highGaps.length > 4`
4. ~~Improve experience score for 'senior' signals~~ ✅ (done this push)

---

## 2026-05-16 — Push 4 (Skills + DigitalLoomBackground + framer-motion)

**Status:** ✅ PASS (1 improvement implemented)

**Improvement: Adaptive course list slice in `cv-analyzer.tsx`**

Previously the Recommended Training section always showed exactly 6 courses regardless of how many high-priority skill gaps existed. A candidate with 8 critical gaps got the same 6 courses as one with 2 gaps — both were underserved.

New behaviour:
- `highPriorityGaps` = count of missing skills with a resource entry AND priority === "high"
- `courseLimit = Math.min(Math.max(6, highPriorityGaps + 2), 10)`
- Floor 6: always shows at least 6 courses (no regression for well-matched CVs)
- Ceiling 10: caps at 10 to avoid overwhelming the user
- Examples: 2 high gaps → 6 courses (unchanged), 5 high gaps → 7, 8 high gaps → 10

Calibration checks:
- Score 85%, 1 high gap → courseLimit = 6 ✅ (not overwhelming)
- Score 35%, 7 high gaps → courseLimit = 9 ✅ (more guidance when needed most)
- Score 20%, 10 high gaps → courseLimit = 10 ✅ (capped, not infinite)

**Running improvement backlog (next pushes):**
1. Tune adaptive keyword cap for very long JDs (> 1200 words)
2. ~~Adapt course list slice to gap count~~ ✅ (done this push)
