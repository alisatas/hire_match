// ─────────────────────────────────────────────
// SHARED ANALYSIS ENGINE
// Used by: cv-analyzer.tsx (client) + telegram webhook (server)
// ─────────────────────────────────────────────

export const SKILL_GROUPS: Record<string, string[]> = {
    // Frontend
    react: ["react", "reactjs", "react.js", "react hooks", "usestate", "useeffect"],
    typescript: ["typescript", "ts", "tsx"],
    javascript: ["javascript", "js", "es6", "es2015", "ecmascript"],
    nextjs: ["next.js", "nextjs", "next js", "app router", "pages router"],
    tailwind: ["tailwind", "tailwindcss", "tailwind css"],
    css: ["css", "scss", "sass", "styled-components", "css modules"],
    html: ["html", "html5", "semantic html"],
    vue: ["vue", "vuejs", "vue.js", "nuxt"],
    angular: ["angular", "angularjs"],
    redux: ["redux", "zustand", "recoil", "state management"],
    graphql: ["graphql", "apollo", "relay"],
    // Backend
    nodejs: ["node", "nodejs", "node.js", "express", "expressjs", "fastify"],
    python: ["python", "django", "flask", "fastapi"],
    java: ["java", "spring", "spring boot", "springboot"],
    csharp: ["c#", "csharp", ".net", "dotnet", "asp.net"],
    golang: ["golang", "go lang"],
    rust: ["rust", "rustlang"],
    php: ["php", "laravel", "symfony"],
    ruby: ["ruby", "rails", "ruby on rails"],
    // Database
    sql: ["sql", "mysql", "postgresql", "postgres", "sqlite", "mariadb"],
    mongodb: ["mongodb", "mongo", "nosql", "mongoose"],
    redis: ["redis", "caching", "cache"],
    elasticsearch: ["elasticsearch", "elastic search", "opensearch"],
    // Cloud & DevOps
    aws: ["aws", "amazon web services", "ec2", "s3", "lambda", "cloudformation"],
    gcp: ["gcp", "google cloud", "firebase", "bigquery"],
    azure: ["azure", "microsoft azure"],
    docker: ["docker", "containerization", "dockerfile"],
    kubernetes: ["kubernetes", "k8s", "helm", "kubectl"],
    cicd: ["ci/cd", "ci cd", "github actions", "gitlab ci", "jenkins", "circleci", "pipeline"],
    terraform: ["terraform", "infrastructure as code", "iac"],
    // Testing
    jest: ["jest", "vitest", "unit test", "unit testing"],
    cypress: ["cypress", "playwright", "selenium", "e2e", "end-to-end"],
    testing: ["testing", "tdd", "bdd", "qa", "quality assurance"],
    // Tools & Practices
    git: ["git", "github", "gitlab", "version control"],
    agile: ["agile", "scrum", "kanban", "sprint", "jira"],
    api: ["rest", "restful", "api", "microservices", "openapi", "swagger"],
    linux: ["linux", "unix", "bash", "shell", "terminal"],
    figma: ["figma", "design", "ux", "ui design", "wireframe"],
    // Data & AI
    ml: ["machine learning", "ml", "tensorflow", "pytorch", "scikit-learn"],
    data: ["data analysis", "pandas", "numpy", "data science", "analytics"],
    ai: ["ai", "llm", "openai", "langchain", "rag", "prompt engineering"],
}

const STOP_WORDS = new Set([
    // Common English
    "the","and","for","with","that","this","have","from","will","your","our","are","was","you",
    "they","their","been","has","not","but","can","all","its","also","more","into","other",
    "than","then","some","what","when","which","about","there","would","these","those","such",
    "each","work","team","role","must","able","well","good","strong","skills","experience",
    "looking","join","help","make","build","support","using","used","based","across","within",
    "including","ensure","provide","develop","working","related","required","responsibilities",
    "opportunity","position","candidate","candidates","company","business","level","years",
    "year","knowledge","ability","excellent","great","new","high","part","time","full","plus",
    "nice","have","need","want","like","take","give","seek","love","passion","drive","fast",
    // Job posting page furniture (scraped noise)
    "jobs","job","open","apply","application","applications","apply","posted","days","ago",
    "hiring","hired","save","share","report","back","sign","login","view","see","click","here",
    "easy","easily","just","get","let","use","used","uses","via","per","etc","e.g","i.e",
    "show","shows","shown","find","found","offers","offer","salary","benefits","benefit",
    "send","sent","contact","email","number","phone","address","website","follow","page",
    "similar","related","recommended","promoted","featured","sponsored","paid","free","trial",
    "cookie","privacy","terms","policy","rights","reserved","copyright","legal","disclaimer",
    // Platforms & sites (page chrome noise)
    "linkedin","indeed","glassdoor","monster","ziprecruiter","greenhouse","lever","workday",
    // Directions & generic locations (The Hague → "hague", "south", etc.)
    "north","south","east","west","central","greater","area","city","region","street","road",
    // Numbers-as-words and filler
    "one","two","three","four","five","six","seven","eight","nine","ten","first","second",
    "third","last","next","prev","previous","latest","current","former","senior","junior",
    "lead","head","chief","staff","member","members","people","person","someone","anyone",
    // Generic job-description verbs
    "ensure","maintain","manage","deliver","drive","lead","own","own","design","create",
    "implement","improve","review","define","identify","communicate","collaborate","partner",
    "contribute","coordinate","oversee","monitor","track","report","analyse","analyze",
    "establish","execute","achieve","evaluate","assess","plan","plan","present","write",
])

export function getSkillLabel(key: string): string {
    const labels: Record<string, string> = {
        react: "React", typescript: "TypeScript", javascript: "JavaScript",
        nextjs: "Next.js", tailwind: "Tailwind CSS", css: "CSS/SCSS",
        html: "HTML5", vue: "Vue.js", angular: "Angular", redux: "State Mgmt",
        graphql: "GraphQL", nodejs: "Node.js", python: "Python", java: "Java/Spring",
        csharp: "C# / .NET", golang: "Go", rust: "Rust", php: "PHP/Laravel",
        ruby: "Ruby on Rails", sql: "SQL / PostgreSQL", mongodb: "MongoDB",
        redis: "Redis", elasticsearch: "Elasticsearch", aws: "AWS", gcp: "GCP",
        azure: "Azure", docker: "Docker", kubernetes: "Kubernetes", cicd: "CI/CD",
        terraform: "Terraform", jest: "Jest / Vitest", cypress: "Cypress / Playwright",
        testing: "Testing / QA", git: "Git / GitHub", agile: "Agile / Scrum",
        api: "REST API", linux: "Linux / Bash", figma: "Figma / UX",
        ml: "Machine Learning", data: "Data Analysis", ai: "AI / LLM",
    }
    return labels[key] || key
}

function normalizeText(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9.#+\s]/g, " ")
}

function extractSkills(text: string): Set<string> {
    const normalized = normalizeText(text)
    const found = new Set<string>()
    for (const [key, aliases] of Object.entries(SKILL_GROUPS)) {
        if (aliases.some(alias => normalized.includes(alias))) {
            found.add(key)
        }
    }
    return found
}

// Frequency map: how many times each alias of a skill group appears in text
function extractSkillFrequencies(text: string): Map<string, number> {
    const normalized = normalizeText(text)
    const freq = new Map<string, number>()
    for (const [key, aliases] of Object.entries(SKILL_GROUPS)) {
        let count = 0
        for (const alias of aliases) {
            // count non-overlapping occurrences
            let pos = 0
            while ((pos = normalized.indexOf(alias, pos)) !== -1) {
                count++
                pos += alias.length
            }
        }
        if (count > 0) freq.set(key, count)
    }
    return freq
}

function extractKeywordFrequencies(text: string): Map<string, number> {
    const words = text.toLowerCase().match(/\b[a-z][a-z0-9+#.]{2,}\b/g) || []
    const freq = new Map<string, number>()
    for (const w of words) {
        if (!STOP_WORDS.has(w) && w.length > 4) {
            freq.set(w, (freq.get(w) || 0) + 1)
        }
    }
    return freq
}

function extractKeywords(text: string): Set<string> {
    return new Set(extractKeywordFrequencies(text).keys())
}

function extractYearsRequired(text: string): number {
    const matches = text.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi) || []
    const years = matches.map(m => parseInt(m)).filter(n => !isNaN(n))
    return years.length > 0 ? Math.max(...years) : 0
}

function extractYearsFromCV(text: string): number {
    const matches = text.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi) || []
    const years = matches.map(m => parseInt(m)).filter(n => !isNaN(n))
    return years.length > 0 ? Math.max(...years) : 0
}

function topJobKeywords(freq: Map<string, number>, n = 8): { word: string; freq: number }[] {
    return [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([word, freq]) => ({ word, freq }))
}

export interface MissingSkillWithPriority {
    label: string
    key: string
    freq: number
    priority: "high" | "medium" | "low"
}

export interface AnalysisResult {
    score: number
    matched: string[]
    missing: MissingSkillWithPriority[]
    rawMatched: number
    rawTotal: number
    jobWordCount: number
    yearsRequired: number
    yearsOnCV: number
    topJobSignals: { word: string; freq: number }[]
    summary: string
    persona: { label: string; desc: string; color: string }
    lowQuality: boolean
}

export function analyze(cvText: string, jobText: string): AnalysisResult {
    // ── 1. Skill extraction ──────────────────────────────────────────────────
    const cvSkills = extractSkills(cvText)
    const jobSkillFreq = extractSkillFrequencies(jobText)

    // Math Prof improvement: skills in the job title (first 120 chars) are the
    // strongest signal — double their frequency weight so they surface as
    // high-priority gaps and drive the score more accurately.
    const jobTitle = jobText.slice(0, 120)
    const titleSkills = extractSkills(jobTitle)
    for (const key of titleSkills) {
        jobSkillFreq.set(key, (jobSkillFreq.get(key) || 0) + 2)
    }

    const jobSkills = new Set(jobSkillFreq.keys())
    const matched = [...jobSkills].filter(s => cvSkills.has(s))
    const missingKeys = [...jobSkills].filter(s => !cvSkills.has(s))

    // ── 2. Keyword extraction ────────────────────────────────────────────────
    const cvKeywords = extractKeywords(cvText)
    const jobFreq = extractKeywordFrequencies(jobText)
    const jobKeywords = new Set(jobFreq.keys())
    const rawMatched = [...jobKeywords].filter(w => cvKeywords.has(w)).length
    const rawTotal = jobKeywords.size

    // ── 3. Years of experience ───────────────────────────────────────────────
    const yearsRequired = extractYearsRequired(jobText)
    const yearsOnCV = extractYearsFromCV(cvText)

    const jobWordCount = jobText.trim().split(/\s+/).length
    const lowQuality = jobWordCount < 80 || (jobSkills.size < 3 && rawTotal < 20)

    // ── 4. Component A: Frequency-Weighted Skill Score (0-1) ────────────────
    // Each skill is weighted by how often its aliases appear in the job description.
    // A skill mentioned 5 times carries more weight than one mentioned once.
    // Weight is log-dampened to prevent single skills from dominating.
    let totalSkillWeight = 0
    let matchedSkillWeight = 0
    for (const [key, freq] of jobSkillFreq.entries()) {
        const weight = 1 + Math.log(1 + freq) // log-dampened frequency weight
        totalSkillWeight += weight
        if (cvSkills.has(key)) matchedSkillWeight += weight
    }
    const skillScore = totalSkillWeight > 0 ? matchedSkillWeight / totalSkillWeight : 0

    // ── 5. Component B: TF-Weighted Keyword Score (0-1) ─────────────────────
    // Keywords mentioned more frequently in the job are more important.
    // We weight each matched keyword by its frequency, capped to avoid outliers.
    let totalKwWeight = 0
    let matchedKwWeight = 0
    // Adaptive cap: longer JDs naturally repeat keywords more without implying greater importance.
    // Scale cap with JD length so short JDs stay strict, long JDs reward genuinely dense terms.
    // e.g. 300-word JD → cap 4, 600-word → cap 5, 1500-word → cap 10
    const keywordFreqCap = Math.ceil(Math.max(4, jobWordCount / 150))
    for (const [word, freq] of jobFreq.entries()) {
        const weight = Math.min(freq, keywordFreqCap) // adaptive cap scales with JD length
        totalKwWeight += weight
        if (cvKeywords.has(word)) matchedKwWeight += weight
    }
    const keywordScore = totalKwWeight > 0 ? matchedKwWeight / totalKwWeight : 0

    // ── 6. Component C: Experience Match Score (0-1) ─────────────────────────
    // Maps years of experience to a normalized score.
    let expScore = 0.65 // neutral default when no requirement stated
    if (yearsRequired > 0) {
        if (yearsOnCV === 0) {
            // Math Prof improvement: raised from 0.40 → 0.50. "0 years on CV" more likely means
            // the person didn't write their years explicitly than that they have no experience.
            // 0.50 (neutral) avoids unfairly penalising candidates who omit years from their CV.
            expScore = 0.50 // unknown experience, not confirmed absence of experience
        } else {
            const ratio = yearsOnCV / yearsRequired
            // sigmoid-like mapping: overshooting is capped at 1.0
            expScore = Math.min(ratio, 1.25) / 1.25
        }
    } else if (yearsOnCV > 0) {
        // No requirement stated — experience is a small bonus
        expScore = Math.min(0.65 + yearsOnCV * 0.02, 0.80)
    }

    // ── 7. Component D: High-Priority Skill Coverage Penalty ─────────────────
    // If the job heavily requires skills (freq ≥ 3) and they're ALL missing,
    // apply a penalty. This prevents inflated scores from keyword overlap alone.
    const criticalMissing = missingKeys.filter(k => (jobSkillFreq.get(k) || 0) >= 3)
    const criticalTotal = [...jobSkills].filter(k => (jobSkillFreq.get(k) || 0) >= 3)
    const missingCriticalRatio = criticalTotal.length > 0
        ? criticalMissing.length / criticalTotal.length
        : 0
    // Math Prof improvement: exponential penalty curve — partial misses are penalised
    // less than linear would suggest (e.g. missing 50% of critical skills → 35% penalty,
    // not 50%). Only a near-total critical-skill absence triggers the full -8 hit.
    const coveragePenalty = Math.pow(missingCriticalRatio, 1.5) * 8

    // ── 8. Composite Score ───────────────────────────────────────────────────
    // Weights: Skills 50% (most important), Keywords 35%, Experience 15%
    const rawScore = (skillScore * 50) + (keywordScore * 35) + (expScore * 15)

    // Confidence multiplier: short/low-quality job descriptions are less reliable.
    // Math Prof improvement: two-tier curve — very short JDs (< 50 words) get a
    // hard floor of 0.3 to prevent inflated scores from garbage input; longer JDs
    // ramp from 0.55 → 1.0 over 0–400 words, reaching full confidence at ~400 words.
    const confidence = jobWordCount < 50
        ? Math.max(0.3, jobWordCount / 50 * 0.55)
        : Math.min(0.55 + (jobWordCount / 400) * 0.45, 1.0)

    const adjustedScore = (rawScore * confidence) - coveragePenalty

    // Map to realistic human range: a perfect match rarely exceeds ~95%
    // Floor at 5 to avoid discouraging "0%" results
    const score = Math.min(Math.max(Math.round(adjustedScore), 5), 95)

    // ── 9. Missing skills with priority ──────────────────────────────────────
    const missing: MissingSkillWithPriority[] = missingKeys.map(key => {
        const freq = jobSkillFreq.get(key) || 0
        // Math Prof improvement: skills mentioned in the job title are automatically
        // high-priority regardless of total frequency. The title is the most distilled
        // expression of what the role needs — "React Developer" means React is essential
        // even if the body only mentions it once.
        const priority: "high" | "medium" | "low" =
            (freq >= 3 || titleSkills.has(key)) ? "high" : freq >= 1 ? "medium" : "low"
        return { label: getSkillLabel(key), key, freq, priority }
    }).sort((a, b) => b.freq - a.freq)

    // ── 10. Top missing job signals — skill aliases only ─────────────────────
    // Only surface words that are recognised skill aliases (from SKILL_GROUPS).
    // This prevents location names, company names, and page furniture ("hague",
    // "linkedin", "grade") from appearing. Each signal maps back to a real skill.
    const allSkillAliases = new Set(Object.values(SKILL_GROUPS).flat())
    // Math Prof improvement: adapt signal count to match score — strong matches (≥70)
    // already have enough context; weak matches benefit from more signals to act on.
    const signalCount = score >= 70 ? 5 : score >= 45 ? 7 : 10
    const topJobSignals = topJobKeywords(jobFreq, signalCount + 20)
        .filter(({ word }) => allSkillAliases.has(word) && !cvKeywords.has(word))
        .slice(0, signalCount)

    // ── 11. Persona & summary ─────────────────────────────────────────────────
    const topMissing = missing.filter(m => m.priority === "high").slice(0, 2).map(m => m.label)
    const topMatched = matched.slice(0, 2).map(getSkillLabel)
    const expNote = yearsRequired > 0
        ? yearsOnCV >= yearsRequired
            ? `Your ${yearsOnCV}y experience meets the ${yearsRequired}y requirement.`
            : `The role asks for ${yearsRequired}y — you have ${yearsOnCV}y.`
        : ""

    let persona: AnalysisResult["persona"]
    if (score >= 78) {
        persona = {
            label: "Top Candidate",
            desc: `Strong alignment — ${topMatched.length > 0 ? topMatched.join(" & ") + " are solid matches. " : ""}${topMissing.length > 0 ? `Adding ${topMissing.join(" & ")} would make you near-perfect for this role. ` : ""}${expNote}`,
            color: "text-emerald-400",
        }
    } else if (score >= 58) {
        persona = {
            label: "Strong Contender",
            desc: `Competitive profile — ${topMatched.length > 0 ? topMatched.join(" & ") + " match well. " : ""}${topMissing.length > 0 ? `This job heavily emphasises ${topMissing.join(" & ")} which aren't prominent on your CV. ` : ""}${expNote}`,
            color: "text-violet-400",
        }
    } else if (score >= 38) {
        persona = {
            label: "Emerging Talent",
            desc: `${topMatched.length > 0 ? topMatched.join(" & ") + " are in your favour. " : ""}${topMissing.length > 0 ? `This role specifically needs ${topMissing.join(" & ")} — high-priority gaps. ` : ""}${expNote}`,
            color: "text-amber-400",
        }
    } else {
        persona = {
            label: "Upskilling Phase",
            desc: `${topMissing.length > 0 ? `This job requires ${topMissing.join(" & ")} which are missing from your CV. ` : ""}${expNote || "Focus on the high-priority skills below to close the gap."}`,
            color: "text-rose-400",
        }
    }

    const summary = lowQuality
        ? `Only ${jobWordCount} words extracted — paste the full job description for accurate results.`
        : `${matched.length}/${jobSkills.size} skill categories matched · ${rawMatched} of ${rawTotal} job keywords found on your CV.`

    return {
        score,
        matched: matched.map(getSkillLabel),
        missing,
        rawMatched,
        rawTotal,
        jobWordCount,
        yearsRequired,
        yearsOnCV,
        topJobSignals,
        summary,
        persona,
        lowQuality,
    }
}

// ─────────────────────────────────────────────
// HR CV AUDIT — standalone CV review, no JD required
// Surfaces what hiring managers scan for before reading a word
// ─────────────────────────────────────────────

export interface CVAuditCategory {
    key: string
    label: string
    icon: string
    status: 'good' | 'warn' | 'missing'
    found: string[]
    missing: string[]   // specific terms/keywords to add — shown as chips in UI
    suggestions: string[]
    tip: string
}

export interface CVAuditResult {
    categories: CVAuditCategory[]
    grade: 'strong' | 'average' | 'weak'
}

export function auditCV(cvText: string): CVAuditResult {
    const text = cvText.toLowerCase()

    // ── 1. Quantified Impact ───────────────────────────────────────────────
    // Google/FAANG rubric: every bullet should answer "so what?" with a number.
    // Signals: percentages, money, multipliers, team/user/request scale.
    const hasPercent    = /\d+\s*%/.test(text)
    const hasMoney      = /[\$£€]\s*\d|\d\s*(million|billion|k\b)/.test(text)
    const hasMultiplier = /\d+x\b|\d+×/.test(text)
    const hasTeamSize   = /team of \d+|\d+[\s-]person|\d+ engineers?|\d+ developers?|\d+ reports?/i.test(cvText)
    const hasUserScale  = /\d+[mk]?\+?\s*(users?|customers?|clients?|dau|mau|requests?|transactions?)/i.test(cvText)
    const resultVerbs   = ['increased','decreased','reduced','improved','grew','saved','generated',
                           'delivered','achieved','exceeded','accelerated','doubled','tripled','cut']
    const foundResultVerbs = resultVerbs.filter(v => text.includes(v))

    const quantSignals  = [hasPercent, hasMoney, hasMultiplier, hasTeamSize, hasUserScale].filter(Boolean).length
    const quantStatus   = quantSignals >= 3 ? 'good' : quantSignals >= 1 ? 'warn' : 'missing'
    const quantMissing  = [
        ...(!hasPercent                          ? ['"improved latency by 40%" — add %'] : []),
        ...(!hasMoney                            ? ['"saved $200k/yr" — add money/scale'] : []),
        ...(!hasMultiplier                       ? ['"3× faster" — add a multiplier'] : []),
        ...(!hasTeamSize                         ? ['"team of 6" — mention team size'] : []),
        ...(!hasUserScale                        ? ['"10M users" — mention users/scale'] : []),
        ...(foundResultVerbs.length < 3          ? ['use: increased, reduced, delivered'] : []),
    ].slice(0, 3)
    const quantSuggestions = quantMissing.length > 0 ? [quantMissing[0]] : []

    // ── 2. Action Verbs — grouped by type ─────────────────────────────────
    // FAANG scorecards look for ownership (led/owned), technical depth
    // (architected/shipped), and business impact (scaled/drove).
    const leadershipVerbs = ['led','managed','owned','directed','oversaw','mentored','hired','grew','coached']
    const technicalVerbs  = ['architected','engineered','built','designed','automated','deployed',
                             'migrated','integrated','shipped','refactored','optimised','optimized']
    const impactVerbs     = ['launched','scaled','spearheaded','pioneered','transformed','streamlined',
                             'negotiated','drove','championed','consolidated','established','secured']

    const foundLeadership = leadershipVerbs.filter(v => text.includes(v))
    const foundTechnical  = technicalVerbs.filter(v => text.includes(v))
    const foundImpact     = impactVerbs.filter(v => text.includes(v))
    const totalVerbs      = foundLeadership.length + foundTechnical.length + foundImpact.length
    const verbStatus      = totalVerbs >= 7 ? 'good' : totalVerbs >= 3 ? 'warn' : 'missing'

    const verbMissing = [
        ...(foundLeadership.length === 0
            ? [`leadership: ${leadershipVerbs.filter(v => !text.includes(v)).slice(0,2).join(', ')}`] : []),
        ...(foundTechnical.length === 0
            ? [`technical: ${technicalVerbs.filter(v => !text.includes(v)).slice(0,2).join(', ')}`] : []),
        ...(foundImpact.length === 0
            ? [`impact: ${impactVerbs.filter(v => !text.includes(v)).slice(0,2).join(', ')}`] : []),
    ]
    const verbSuggestions = verbMissing.length > 0
        ? [`Try stronger verbs: ${[...leadershipVerbs,...technicalVerbs,...impactVerbs].filter(v => !text.includes(v)).slice(0,4).join(', ')}`]
        : []
    const foundVerbs = [...foundLeadership, ...foundTechnical, ...foundImpact]

    // ── 3. Business & ATS Keywords ────────────────────────────────────────
    // Standard vocabulary that ATS systems and senior HRs scan for.
    // Source: Google, Meta, Amazon job description language analysis.
    const proTerms: { term: string; label: string }[] = [
        { term: 'stakeholder',      label: 'stakeholder management' },
        { term: 'cross-functional', label: 'cross-functional teams'  },
        { term: 'roadmap',          label: 'product roadmap'         },
        { term: 'kpi',              label: 'KPIs'                    },
        { term: 'okr',              label: 'OKRs'                    },
        { term: 'prioriti',         label: 'prioritisation'          }, // catches both spellings
        { term: 'data-driven',      label: 'data-driven'             },
        { term: 'alignment',        label: 'alignment'               },
        { term: 'strategy',         label: 'strategy'                },
        { term: 'ownership',        label: 'ownership'               },
        { term: 'agile',            label: 'agile'                   },
        { term: 'impact',           label: 'business impact'         },
        { term: 'collaboration',    label: 'collaboration'           },
        { term: 'scalab',           label: 'scalability'             }, // catches scalable/scalability
        { term: 'executive',        label: 'executive exposure'      },
    ]
    const foundPro   = proTerms.filter(t => text.includes(t.term)).map(t => t.label)
    const missingPro = proTerms.filter(t => !text.includes(t.term)).map(t => t.label).slice(0, 4)
    const proStatus  = foundPro.length >= 7 ? 'good' : foundPro.length >= 3 ? 'warn' : 'missing'
    const proSuggestions = missingPro.length > 0 ? [`Add: ${missingPro.join(', ')}`] : []

    // ── 4. Career Progression & Scope Signals ─────────────────────────────
    // Senior HRs look for trajectory, not just a list of jobs.
    // Explicit: promoted/principal/staff. Implicit: expanded/took on/grew team.
    const progressionTerms = [
        'promoted','promotion','senior','staff','principal','lead','head of','director','vp','vice president',
        'expanded','grew','took on','additional responsibility','new responsibilities',
        'managed up','reported to','c-suite','c suite','board',
    ]
    const foundProgression    = progressionTerms.filter(t => text.includes(t))
    const progressionStatus   = foundProgression.length >= 3 ? 'good' : foundProgression.length >= 1 ? 'warn' : 'missing'
    const progressionMissing  = [
        ...(!text.includes('promot') && !text.includes('senior') && !text.includes('principal')
            ? ['mention title progression (e.g. "promoted to Senior")'] : []),
        ...(!text.includes('responsib') && !text.includes('expanded') && !text.includes('grew')
            ? ['show how scope grew in each role'] : []),
        ...(!text.includes('managed') && !text.includes('led') && !text.includes('head')
            ? ['show who you led or reported to'] : []),
    ].slice(0, 2)
    const progressionSuggestions = progressionMissing.length > 0 ? [progressionMissing[0]] : []

    // ── 5. Online Presence & Contact Completeness ─────────────────────────
    const hasLinkedIn  = text.includes('linkedin')
    const hasGithub    = text.includes('github') || text.includes('gitlab')
    const hasPortfolio = text.includes('portfolio') || text.includes('website') || /https?:\/\//.test(text)
    const hasEmail     = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(text)
    const presenceFound = [
        hasLinkedIn  && 'LinkedIn',
        hasGithub    && 'GitHub',
        hasPortfolio && 'Portfolio/URL',
        hasEmail     && 'Email',
    ].filter(Boolean) as string[]
    const presenceMissing = [
        !hasLinkedIn  && 'add your LinkedIn URL',
        !hasEmail     && 'add your email address',
        !hasGithub    && 'add a GitHub profile',
        !hasPortfolio && 'add a portfolio or website',
    ].filter(Boolean) as string[]
    const presenceStatus = presenceFound.length >= 3 ? 'good' : presenceFound.length >= 2 ? 'warn' : 'missing'
    const presenceSuggestions = presenceMissing.slice(0, 2).map(p => `${(p as string)[0].toUpperCase()}${(p as string).slice(1)}`)

    const categories: CVAuditCategory[] = [
        {
            key: 'quant',
            label: 'Quantified Impact',
            icon: '📊',
            status: quantStatus,
            found: foundResultVerbs,
            missing: quantMissing,
            suggestions: quantSuggestions,
            tip: 'HRs spend 7 seconds on a CV — numbers make them stop.',
        },
        {
            key: 'verbs',
            label: 'Action Verbs',
            icon: '⚡',
            status: verbStatus,
            found: foundVerbs,
            missing: verbMissing,
            suggestions: verbSuggestions,
            tip: 'Strong verbs signal ownership. Weak verbs (worked on, helped with) signal support roles.',
        },
        {
            key: 'pro',
            label: 'Professional Keywords',
            icon: '🏢',
            status: proStatus,
            found: foundPro,
            missing: missingPro,
            suggestions: proSuggestions,
            tip: 'ATS systems and HRs scan for these terms before reading a single bullet.',
        },
        {
            key: 'progression',
            label: 'Career Progression',
            icon: '📈',
            status: progressionStatus,
            found: foundProgression,
            missing: progressionMissing,
            suggestions: progressionSuggestions,
            tip: 'Show trajectory — HRs look for upward movement, not just job history.',
        },
        {
            key: 'presence',
            label: 'Online Presence',
            icon: '🔗',
            status: presenceStatus,
            found: presenceFound,
            missing: presenceMissing,
            suggestions: presenceSuggestions,
            tip: 'HRs Google you. Make it easy — include LinkedIn, GitHub, and portfolio links.',
        },
    ]

    const goodCount = categories.filter(c => c.status === 'good').length
    const grade = goodCount >= 4 ? 'strong' : goodCount >= 2 ? 'average' : 'weak'

    return { categories, grade }
}
