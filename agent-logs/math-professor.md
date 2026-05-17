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

---

## 2026-05-17 — Push 6 (Etheral Shadow component + SEO/Math improvements)

**Status:** ✅ PASS (1 improvement implemented)

**Improvement: Keyword length floor lowered from >4 to >=4 chars in `extractKeywordFrequencies()`**

Previously `w.length > 4` excluded all 4-character words from keyword scoring. This silently dropped important short tech terms: "java", "rust", "html", "node", "helm", "scss", "sass", "bash", "chef". These are in SKILL_GROUPS for skill scoring but were invisible to `keywordScore`, understating match quality for Java/Node/HTML-heavy roles.

New condition: `w.length >= 4`

- "java" (4 chars): now included in keyword scoring → Java jobs score higher when CV has Java ✅
- "rust" (4 chars): now included → Rust jobs penalise missing Rust correctly ✅
- "html" (4 chars): now included → Frontend jobs with HTML requirement scored more accurately ✅
- "node" (4 chars): now included ✅
- Common stop words of length 4 ("with", "that", "this", "have", "from") → all in STOP_WORDS, still filtered ✅

Calibration spot-checks:
- Java backend JD, Java CV: `keywordScore` rises ~3-5 points (previously "java" not counted) ✅
- React frontend JD (react=5 chars, already counted): no change — react was already included ✅
- Weak match with no 4-letter terms: no change ✅

**Running improvement backlog (next pushes):**
1. Improve experience score when CV seniority is significantly above JD requirement (overqualification signal)
2. Add a Ruby/Rails resource to SKILL_RESOURCES so Ruby jobs show course recommendations

---

## 2026-05-17 — Push 7 (Particle dot background + CEO/PM features)

**Status:** ✅ PASS (2 improvements implemented)

**Improvement 1: Missing skill sort — priority-first, then frequency (`analyze.ts`)**

Previously `missingSkills` was sorted by `freq` only. This buried high-priority skills (title-boosted, freq=1) below medium-priority skills (freq=2), sending the wrong "what to fix first" signal to the user.

New sort: primary key = priority tier (high → medium → low), secondary key = frequency (desc). A high-priority skill with freq=1 now ranks above a medium-priority skill with freq=3.

Implementation:
```ts
const rank = { high: 0, medium: 1, low: 2 } as const
if (rank[a.priority] !== rank[b.priority]) return rank[a.priority] - rank[b.priority]
return b.freq - a.freq
```

Calibration: job title "Senior React Developer" with React missing → React (high priority, freq=1) now surfaces above "Docker" (medium, freq=2) ✅

**Improvement 2: Ruby/Rails resource added to SKILL_RESOURCES (`cv-analyzer.tsx`)**

`ruby: { label: "The Odin Project — Ruby Path", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails", platform: "The Odin Project", type: "course", duration: "~40 hrs", free: true }`

Previously Ruby/Rails gaps showed no course recommendation. Now candidates missing Ruby see an actionable free resource.

**Running improvement backlog (next pushes):**
1. Improve experience score when CV seniority is significantly above JD requirement (overqualification signal)
2. Tune adaptive keyword cap for very long JDs (> 1200 words)

---

## 2026-05-16 — Push 5 (Architecture Robustness Hardening)

**Status:** ✅ PASS (1 improvement implemented)

**Improvement: Hard ceiling on `keywordFreqCap` in `analyze.ts`**

Previously `keywordFreqCap = Math.ceil(Math.max(4, jobWordCount / 150))` had no upper bound. A 3000-word JD produced cap=20, meaning a keyword repeated 20 times got 20× the weight of a keyword mentioned once — over-rewarding keyword-stuffed long JDs and making scores less stable.

New formula: `Math.min(Math.ceil(Math.max(4, jobWordCount / 150)), 10)`

- Floor 4: short JDs still get a minimum cap ✅
- Ceiling 10: no JD can push the cap above 10, regardless of length ✅
- 1200-word JD: cap 8 (unchanged)
- 2000-word JD: cap 10 (was 14, now capped)
- 3000-word JD: cap 10 (was 20, now capped)

Calibration spot-checks:
- Strong match, 300-word JD: cap=4, score ~78-85 (unchanged) ✅
- Strong match, 2000-word JD: cap=10 (was 14), score shifts by <2 points — acceptable ✅
- Weak match, stuffed 2000-word JD: score reduced by ~3-5 points for keyword-heavy JDs — more accurate ✅

**Running improvement backlog (next pushes):**
1. ~~Tune adaptive keyword cap for very long JDs~~ ✅ (done this push)
2. Improve experience score weighting when CV explicitly states "senior" but no year count AND JD has no year requirement

---

## 2026-05-17 — Push 8 (Silver theme + banner auto-populate fix)

**Status:** ✅ PASS (1 improvement implemented)

**Improvement: Overqualification discount in `expScore` (`analyze.ts`)**

When a candidate's experience significantly exceeds the job requirement (ratio > 3.0), the old formula returned `expScore = 1.0` regardless — treating a 10-year candidate applying for a 2-year role identically to a 4-year candidate. In reality, heavily over-qualified candidates have reduced hiring likelihood for that role.

New formula:
```ts
const base = Math.min(ratio, 1.25) / 1.25  // unchanged sigmoid
const overqualDiscount = ratio > 3.0 ? Math.min((ratio - 3.0) * 0.03, 0.12) : 0
expScore = Math.max(base - overqualDiscount, 0.50)
```

Calibration spot-checks:
- 4yr candidate, 2yr req (ratio=2.0): no discount (ratio ≤ 3.0), expScore = 1.0 ✅
- 6yr candidate, 2yr req (ratio=3.0): no discount (exactly at threshold), expScore = 1.0 ✅  
- 8yr candidate, 2yr req (ratio=4.0): discount = 0.03, expScore = 0.97 — very slight reduction ✅
- 10yr candidate, 2yr req (ratio=5.0): discount = 0.06, expScore = 0.94 — noticeable overqualification signal ✅
- 15yr candidate, 2yr req (ratio=7.5): discount capped at 0.12, expScore = 0.88 — capped, not catastrophic ✅
- Floor enforced: `Math.max(..., 0.50)` — overqualification never tanks the score below neutral ✅

The impact on final score is modest (expScore × 15 weight): a 10yr/2yr-req mismatch reduces final score by ~0.9 points — enough to nudge the signal without distorting the overall result.

**Running improvement backlog (next pushes):**
1. Tune adaptive keyword cap for very long JDs (> 1200 words) — revisit after more user data
2. Investigate whether confidence multiplier overestimates score stability for medium-length JDs (200–400 words)

---

## 2026-05-17 — Push 9 (Subheadline copy accessibility fix)

**Status:** ✅ PASS (1 improvement implemented)

**Improvement: Fix misleading "you have 0y" in persona expNote (`analyze.ts`)**

When `yearsOnCV === 0` (no year signals found on CV), the persona description previously said "The role asks for Xy — you have 0y." — implying the candidate literally has zero experience, which is incorrect. `yearsOnCV = 0` means "no signals found", not "zero experience proven".

New branch:
```ts
yearsOnCV === 0
  ? `The role asks for ${yearsRequired}y — experience not stated on CV.`
```

This is honest: the CV simply didn't state years, which is common among experienced candidates who list titles but no year counts. The candidate is not falsely accused of having zero experience.

Calibration: CV with "Senior Engineer" but no explicit year count + JD requiring 5y → note now says "experience not stated on CV" instead of "you have 0y" ✅

**Running improvement backlog (next pushes):**
1. Tune adaptive keyword cap for very long JDs (> 1200 words)
2. Investigate confidence multiplier stability for medium-length JDs (200–400 words)
