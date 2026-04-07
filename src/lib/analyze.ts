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
    "the","and","for","with","that","this","have","from","will","your","our","are","was","you",
    "they","their","been","has","not","but","can","all","its","also","more","into","other",
    "than","then","some","what","when","which","about","there","would","these","those","such",
    "each","work","team","role","must","able","well","good","strong","skills","experience",
    "looking","join","help","make","build","support","using","used","based","across","within",
    "including","ensure","provide","develop","working","related","required","responsibilities",
    "opportunity","position","candidate","candidates","company","business","level","years",
    "year","knowledge","ability","excellent","great","new","high","part","time","full","plus",
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

function extractKeywords(text: string): Set<string> {
    const words = text.toLowerCase().match(/\b[a-z][a-z0-9+#.]{2,}\b/g) || []
    return new Set(words.filter(w => !STOP_WORDS.has(w) && w.length > 3))
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

function extractKeywordFrequencies(text: string): Map<string, number> {
    const words = text.toLowerCase().match(/\b[a-z][a-z0-9+#.]{2,}\b/g) || []
    const freq = new Map<string, number>()
    for (const w of words) {
        if (!STOP_WORDS.has(w) && w.length > 3) {
            freq.set(w, (freq.get(w) || 0) + 1)
        }
    }
    return freq
}

function topJobKeywords(freq: Map<string, number>, n = 8): string[] {
    return [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([w]) => w)
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
    topJobSignals: string[]
    summary: string
    persona: { label: string; desc: string; color: string }
    lowQuality: boolean
}

export function analyze(cvText: string, jobText: string): AnalysisResult {
    const cvSkills = extractSkills(cvText)
    const jobSkills = extractSkills(jobText)
    const matched = [...jobSkills].filter(s => cvSkills.has(s))
    const missingKeys = [...jobSkills].filter(s => !cvSkills.has(s))

    const cvKeywords = extractKeywords(cvText)
    const jobFreq = extractKeywordFrequencies(jobText)
    const jobKeywords = new Set(jobFreq.keys())
    const rawMatched = [...jobKeywords].filter(w => cvKeywords.has(w)).length
    const rawTotal = jobKeywords.size

    const yearsRequired = extractYearsRequired(jobText)
    const yearsOnCV = extractYearsFromCV(cvText)

    const jobWordCount = jobText.trim().split(/\s+/).length
    const lowQuality = jobWordCount < 80 || (jobSkills.size < 3 && rawTotal < 20)

    const skillRatio = jobSkills.size > 0 ? matched.length / jobSkills.size : 0
    const rawRatio = rawTotal > 0 ? Math.min(rawMatched / rawTotal, 1) : 0
    const baseScore = skillRatio * 60 + rawRatio * 40
    const confidence = Math.min(jobWordCount / 150, 1)
    const dampened = baseScore * confidence + baseScore * 0.5 * (1 - confidence)
    let expAdjust = 0
    if (yearsRequired > 0) {
        expAdjust = Math.max(-8, Math.min(8, (yearsOnCV - yearsRequired) * 2))
    } else if (yearsOnCV > 2) {
        expAdjust = Math.min(yearsOnCV, 5)
    }
    const score = Math.min(Math.max(Math.round(dampened + expAdjust), 5), 97)

    const missing: MissingSkillWithPriority[] = missingKeys.map(key => {
        const aliases = SKILL_GROUPS[key] || []
        const freq = aliases.reduce((sum, alias) => {
            const words = alias.split(" ")
            const minCount = Math.min(...words.map(w => jobFreq.get(w) || 0))
            return sum + (words.every(w => jobFreq.has(w)) ? minCount : 0)
        }, 0)
        const priority: "high" | "medium" | "low" = freq >= 3 ? "high" : freq >= 1 ? "medium" : "low"
        return { label: getSkillLabel(key), key, freq, priority }
    }).sort((a, b) => b.freq - a.freq)

    const topJobSignals = topJobKeywords(jobFreq, 10)
        .filter(w => !cvKeywords.has(w))
        .slice(0, 6)

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
