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
    for (const [word, freq] of jobFreq.entries()) {
        const weight = Math.min(freq, 5) // cap at 5 to prevent runaway terms
        totalKwWeight += weight
        if (cvKeywords.has(word)) matchedKwWeight += weight
    }
    const keywordScore = totalKwWeight > 0 ? matchedKwWeight / totalKwWeight : 0

    // ── 6. Component C: Experience Match Score (0-1) ─────────────────────────
    // Maps years of experience to a normalized score.
    let expScore = 0.65 // neutral default when no requirement stated
    if (yearsRequired > 0) {
        if (yearsOnCV === 0) {
            expScore = 0.40 // no years on CV, can't assess
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
    // Penalty: 0 when nothing critical missing, up to -8 when all critical skills missing
    const coveragePenalty = missingCriticalRatio * 8

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
        const priority: "high" | "medium" | "low" = freq >= 3 ? "high" : freq >= 1 ? "medium" : "low"
        return { label: getSkillLabel(key), key, freq, priority }
    }).sort((a, b) => b.freq - a.freq)

    // ── 10. Top missing job signals — skill aliases only ─────────────────────
    // Only surface words that are recognised skill aliases (from SKILL_GROUPS).
    // This prevents location names, company names, and page furniture ("hague",
    // "linkedin", "grade") from appearing. Each signal maps back to a real skill.
    const allSkillAliases = new Set(Object.values(SKILL_GROUPS).flat())
    const topJobSignals = topJobKeywords(jobFreq, 40)
        .filter(({ word }) => allSkillAliases.has(word) && !cvKeywords.has(word))
        .slice(0, 8)

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
