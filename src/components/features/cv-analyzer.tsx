"use client"

import React, { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RatingInteraction } from "@/components/ui/emoji-rating"
import {
    Sparkles,
    FileText,
    UploadCloud,
    ArrowRight,
    Search,
    Shield,
    Cpu,
    RotateCcw,
    ExternalLink,
    BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// LOCAL SKILL ENGINE — no API key needed
// ─────────────────────────────────────────────

const SKILL_GROUPS: Record<string, string[]> = {
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

const SKILL_RESOURCES: Record<string, { label: string; url: string }> = {
    react: { label: "React Official Docs", url: "https://react.dev/learn" },
    typescript: { label: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    javascript: { label: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    nextjs: { label: "Next.js Learn", url: "https://nextjs.org/learn" },
    tailwind: { label: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" },
    css: { label: "CSS on MDN", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    vue: { label: "Vue.js Guide", url: "https://vuejs.org/guide/introduction" },
    angular: { label: "Angular Tutorial", url: "https://angular.dev/tutorials" },
    redux: { label: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org/introduction/getting-started" },
    graphql: { label: "GraphQL How to", url: "https://graphql.org/learn/" },
    nodejs: { label: "Node.js Docs", url: "https://nodejs.org/en/docs" },
    python: { label: "Python Tutorial", url: "https://docs.python.org/3/tutorial/" },
    java: { label: "Spring Boot Guide", url: "https://spring.io/guides" },
    csharp: { label: ".NET Learning Path", url: "https://dotnet.microsoft.com/en-us/learn" },
    golang: { label: "Go Tour", url: "https://go.dev/tour/welcome/1" },
    rust: { label: "The Rust Book", url: "https://doc.rust-lang.org/book/" },
    php: { label: "Laravel Docs", url: "https://laravel.com/docs" },
    sql: { label: "SQL Tutorial — Mode", url: "https://mode.com/sql-tutorial/" },
    mongodb: { label: "MongoDB University", url: "https://university.mongodb.com/" },
    redis: { label: "Redis University", url: "https://university.redis.com/" },
    aws: { label: "AWS Skill Builder", url: "https://skillbuilder.aws/" },
    gcp: { label: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google/" },
    azure: { label: "Microsoft Learn Azure", url: "https://learn.microsoft.com/en-us/azure/" },
    docker: { label: "Docker Get Started", url: "https://docs.docker.com/get-started/" },
    kubernetes: { label: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
    cicd: { label: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
    terraform: { label: "Terraform Learn", url: "https://developer.hashicorp.com/terraform/tutorials" },
    jest: { label: "Jest Docs", url: "https://jestjs.io/docs/getting-started" },
    cypress: { label: "Cypress Guides", url: "https://docs.cypress.io/guides/overview/why-cypress" },
    testing: { label: "Testing Library Docs", url: "https://testing-library.com/docs/" },
    git: { label: "Git — the simple guide", url: "https://rogerdudler.github.io/git-guide/" },
    agile: { label: "Scrum Guide", url: "https://scrumguides.org/scrum-guide.html" },
    api: { label: "REST API Tutorial", url: "https://restfulapi.net/" },
    linux: { label: "Linux Command Line Course", url: "https://linuxcommand.org/lc3_learning_the_shell.php" },
    figma: { label: "Figma Learn Design", url: "https://www.figma.com/resources/learn-design/" },
    ml: { label: "ML Crash Course — Google", url: "https://developers.google.com/machine-learning/crash-course" },
    data: { label: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
    ai: { label: "Anthropic Prompt Engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
}

// Common words to ignore in raw keyword overlap
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

// Extract meaningful keywords from any text (beyond our skill dictionary)
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

function getSkillLabel(key: string): string {
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

// Extract keyword frequencies from job text (how often each word appears)
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

// Top N repeated keywords from a job post (job-specific signals)
function topJobKeywords(freq: Map<string, number>, n = 8): string[] {
    return [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([w]) => w)
}

interface MissingSkillWithPriority {
    label: string
    key: string
    freq: number      // how many times this skill's aliases appeared in job text
    priority: "high" | "medium" | "low"
}

interface AnalysisResult {
    score: number
    matched: string[]
    missing: MissingSkillWithPriority[]
    rawMatched: number
    rawTotal: number
    jobWordCount: number
    yearsRequired: number
    yearsOnCV: number
    topJobSignals: string[]   // top repeated keywords unique to this job
    summary: string
    persona: { label: string; desc: string; color: string }
    lowQuality: boolean
}

function analyze(cvText: string, jobText: string): AnalysisResult {
    // ── Skill-dictionary matching ──────────────────────────────────
    const cvSkills = extractSkills(cvText)
    const jobSkills = extractSkills(jobText)
    const matched = [...jobSkills].filter(s => cvSkills.has(s))
    const missingKeys = [...jobSkills].filter(s => !cvSkills.has(s))

    // ── Raw keyword overlap ────────────────────────────────────────
    const cvKeywords = extractKeywords(cvText)
    const jobFreq = extractKeywordFrequencies(jobText)
    const jobKeywords = new Set(jobFreq.keys())
    const rawMatched = [...jobKeywords].filter(w => cvKeywords.has(w)).length
    const rawTotal = jobKeywords.size

    // ── Experience ─────────────────────────────────────────────────
    const yearsRequired = extractYearsRequired(jobText)
    const yearsOnCV = extractYearsFromCV(cvText)

    // ── Job text quality ───────────────────────────────────────────
    const jobWordCount = jobText.trim().split(/\s+/).length
    const lowQuality = jobWordCount < 80 || (jobSkills.size < 3 && rawTotal < 20)

    // ── Scoring ────────────────────────────────────────────────────
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

    // ── Missing skills with job-specific frequency/priority ────────
    const missing: MissingSkillWithPriority[] = missingKeys.map(key => {
        const aliases = SKILL_GROUPS[key] || []
        const freq = aliases.reduce((sum, alias) => {
            const words = alias.split(" ")
            const minCount = Math.min(...words.map(w => jobFreq.get(w) || 0))
            return sum + (words.every(w => jobFreq.has(w)) ? minCount : 0)
        }, 0)
        const priority: "high" | "medium" | "low" = freq >= 3 ? "high" : freq >= 1 ? "medium" : "low"
        return { label: getSkillLabel(key), key, freq, priority }
    }).sort((a, b) => b.freq - a.freq)  // sort by how heavily the job emphasises each skill

    // ── Top job-specific signals (most repeated unique terms) ──────
    // Filter out generic words, keep things that characterise THIS job
    const topJobSignals = topJobKeywords(jobFreq, 10)
        .filter(w => !cvKeywords.has(w))  // only show what's NOT already on the CV
        .slice(0, 6)

    // ── Dynamic persona description ────────────────────────────────
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

    // ── Summary ────────────────────────────────────────────────────
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
// SAMPLE JOBS
// ─────────────────────────────────────────────

const SAMPLE_JOBS = [
    {
        label: "Frontend Dev",
        emoji: "🎨",
        text: `Frontend Developer — Amsterdam (Hybrid)

We are looking for a skilled Frontend Developer to join our product team. You will build responsive, performant web applications used by thousands of users daily.

Requirements:
- 3+ years of experience with React and TypeScript
- Strong knowledge of Next.js, Tailwind CSS, and modern CSS
- Experience with state management (Redux, Zustand, or similar)
- Familiarity with REST APIs and GraphQL
- Git version control and CI/CD pipelines (GitHub Actions)
- Understanding of accessibility (WCAG) and cross-browser compatibility
- Experience with Jest and Cypress for testing is a plus
- Agile/Scrum team experience

Nice to have:
- Figma and UX design collaboration
- Node.js for BFF patterns
- Docker for local development

We offer a competitive salary, flexible hybrid work, and a collaborative team culture.`,
    },
    {
        label: "Backend Engineer",
        emoji: "⚙️",
        text: `Backend Engineer — Remote (EU)

Join our engineering team to design and build scalable backend services powering our SaaS platform.

Requirements:
- 4+ years experience with Node.js or Python (FastAPI, Django)
- Strong SQL skills — PostgreSQL preferred
- Experience designing REST APIs and microservices
- Familiarity with Docker and Kubernetes
- AWS or GCP cloud infrastructure experience
- CI/CD pipeline experience (GitHub Actions, Jenkins)
- Redis for caching and queues
- Git and code review practices

Nice to have:
- Terraform for infrastructure as code
- Elasticsearch for search
- GraphQL API design
- Experience with message queues (RabbitMQ, Kafka)

We're a fully remote team with async-first culture and 5+ years of runway.`,
    },
    {
        label: "Data Analyst",
        emoji: "📊",
        text: `Data Analyst — Utrecht, Netherlands

We're looking for a data-driven analyst to turn complex datasets into actionable insights for our growth and product teams.

Requirements:
- 2+ years experience in data analysis
- Strong SQL — able to write complex queries across large datasets
- Python with Pandas and NumPy for data manipulation
- Experience with data visualisation tools (Tableau, Power BI, or similar)
- Understanding of statistics and A/B testing methodology
- Familiarity with Google Analytics and BigQuery or AWS Redshift
- Excellent communication and data storytelling skills

Nice to have:
- Machine learning basics (scikit-learn)
- Experience with dbt for data modelling
- Agile/Scrum environment experience
- Knowledge of GDPR data handling

You will work closely with product managers, engineers, and the marketing team in a fast-growing scale-up.`,
    },
]

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function CVAnalyzer() {
    const [cvText, setCvText] = useState("")
    const [jobText, setJobText] = useState("")
    const [jobInput, setJobInput] = useState("")
    const [fetchStatus, setFetchStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<AnalysisResult | null>(null)
    const [pdfStatus, setPdfStatus] = useState("")
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const processPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || file.type !== "application/pdf") return

        setPdfStatus("Reading PDF...")
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await fetch("/api/extract-pdf", { method: "POST", body: formData })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setCvText(data.text)
            setPdfStatus(`✓ ${file.name} loaded`)
        } catch (err: any) {
            console.error("PDF Read Error:", err)
            setPdfStatus("Error reading PDF. Paste your CV text below.")
        }
    }

    const fetchJobPost = async () => {
        const url = jobInput.trim()
        if (!url.startsWith("http")) {
            setJobText(jobInput)
            return
        }

        setFetchStatus("Fetching job post...")
        try {
            const res = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            })
            const data = await res.json()
            if (data.text && data.text.length > 50) {
                setJobText(data.text)
                setFetchStatus("✓ Job post fetched")
            } else {
                setFetchStatus("Could not fetch — paste the text below")
            }
        } catch {
            setFetchStatus("Could not fetch — paste the text below")
        }
    }

    const doAnalyze = async () => {
        if (!cvText) {
            setError("Upload a PDF or paste your CV text first.")
            return
        }

        // Auto-fetch job post if URL is set but text not yet loaded
        let effectiveJobText = jobText
        if (!effectiveJobText && jobInput.trim().startsWith("http")) {
            setFetchStatus("Fetching job post...")
            try {
                const res = await fetch("/api/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: jobInput.trim() }),
                })
                const data = await res.json()
                if (data.text && data.text.length > 50) {
                    effectiveJobText = data.text
                    setJobText(data.text)
                    setFetchStatus("✓ Job post fetched")
                } else {
                    setFetchStatus("Could not fetch — paste the text below")
                    setIsLoading(false)
                    return
                }
            } catch {
                setFetchStatus("Could not fetch — paste the text below")
                setIsLoading(false)
                return
            }
        } else if (!effectiveJobText) {
            effectiveJobText = jobInput
        }

        if (!effectiveJobText) {
            setError("Add a job description or URL.")
            return
        }

        setError("")
        setIsLoading(true)
        setResults(null)

        setTimeout(() => {
            const result = analyze(cvText, effectiveJobText)
            setResults(result)
            setIsLoading(false)
        }, 600)
    }

    // "Try Another Job" — clear only the job field, keep CV + existing results visible
    const resetForNewJob = () => {
        setJobText("")
        setJobInput("")
        setFetchStatus("")
        setError("")
        // NOTE: results intentionally NOT cleared — stays visible until new analysis runs
    }

    // "Change CV" — explicit CV reset
    const resetCV = () => {
        setCvText("")
        setPdfStatus("")
        setResults(null)
        setError("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const validUrl = jobInput.trim().startsWith("http")
    const canAnalyze = !!cvText && (!!jobText || validUrl)

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                <div className="flex items-center gap-3">
                    <Sparkles className="text-primary h-8 w-8" />
                    <h1 className="text-2xl font-bold tracking-tight text-white">CV Scorer</h1>
                </div>
            </header>

            <section className="text-center mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter text-white">
                    Does Your CV{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 drop-shadow-sm">
                        Match the Job?
                    </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/80 font-semibold max-w-4xl mx-auto px-2 drop-shadow-sm">
                    Upload your CV, drop a job link — get an instant match score, skill gaps, and courses to close them.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Input Panel */}
                <Card className="bg-background/40 backdrop-blur-xl border-border/50 overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="text-primary h-5 w-5" />
                            <CardTitle className="font-black uppercase tracking-tighter text-white">The Essentials 🎒</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* CV — upload zone OR loaded badge */}
                        {!cvText ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold uppercase tracking-widest text-primary/90">Your CV</label>
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">PDF</span>
                                </div>
                                <div className="border-2 border-dashed border-border/60 rounded-xl h-[140px] flex flex-col items-center justify-center gap-4 transition-colors hover:border-primary/40 hover:bg-primary/5 cursor-pointer relative">
                                    <UploadCloud className="h-10 w-10 text-white/60" />
                                    <div className="text-center">
                                        <p className="font-semibold text-white">Drop your PDF or click to browse</p>
                                        <p className="text-xs text-white/60 mt-1 font-medium">Files up to 5MB supported</p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={processPdf}
                                    />
                                </div>
                                {pdfStatus && (
                                    <p className="text-xs text-center font-semibold text-white/70 animate-pulse">{pdfStatus}</p>
                                )}
                                <Textarea
                                    placeholder="Or paste your CV text here..."
                                    className="min-h-[80px] bg-muted/20 border-border/40 rounded-xl text-white placeholder:text-white/40"
                                    value={cvText}
                                    onChange={(e) => setCvText(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                                    <span className="text-sm font-bold text-emerald-400 truncate">{pdfStatus.replace("✓ ", "") || "CV loaded"}</span>
                                </div>
                                <button
                                    onClick={resetCV}
                                    className="text-[11px] font-bold text-white/40 hover:text-white/70 uppercase tracking-widest shrink-0 ml-3 transition-colors"
                                >
                                    Change
                                </button>
                            </div>
                        )}

                        {/* Job Description — URL only */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase tracking-widest text-primary/90">Job Link</label>
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-2 bg-muted/20 border rounded-xl px-3 transition-colors",
                                jobInput && !jobInput.trim().startsWith("http")
                                    ? "border-rose-500/50"
                                    : fetchStatus.startsWith("✓")
                                    ? "border-emerald-500/40"
                                    : "border-border/40 focus-within:border-primary/50"
                            )}>
                                <span className="text-white/30 text-sm shrink-0">🔗</span>
                                <input
                                    type="url"
                                    className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
                                    placeholder="https://linkedin.com/jobs/..."
                                    value={jobInput}
                                    onChange={(e) => { setJobInput(e.target.value); setJobText(""); setFetchStatus("") }}
                                    onKeyDown={(e) => e.key === "Enter" && e.currentTarget.value.trim().startsWith("http") && fetchJobPost()}
                                    onBlur={() => jobInput && !jobInput.trim().startsWith("http") && setError("Please paste a valid job URL (must start with https://)")}
                                    onFocus={() => setError("")}
                                />
                                {fetchStatus.startsWith("✓") && (
                                    <span className="text-emerald-400 text-xs font-bold shrink-0">✓</span>
                                )}
                            </div>

                            {/* URL validation hint */}
                            {jobInput && !jobInput.trim().startsWith("http") && (
                                <p className="text-rose-400 text-xs font-semibold">Please paste a valid job URL starting with https://</p>
                            )}

                            {fetchStatus && (
                                <p className={cn(
                                    "text-xs font-semibold",
                                    fetchStatus.startsWith("✓") ? "text-emerald-400" : "text-white/60"
                                )}>{fetchStatus}</p>
                            )}

                            {/* Sample job buttons */}
                            {!jobText && !fetchStatus.startsWith("✓") && (
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-white/40 self-center">Try example:</span>
                                    {SAMPLE_JOBS.map((job) => (
                                        <button
                                            key={job.label}
                                            type="button"
                                            onClick={() => {
                                                setJobInput("")
                                                setJobText(job.text)
                                                setFetchStatus(`✓ Sample: ${job.label}`)
                                                setError("")
                                            }}
                                            className="px-3 py-1 text-xs font-medium bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-300 rounded-full transition-colors"
                                        >
                                            {job.emoji} {job.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Fallback paste area — only shown when scraping fails */}
                            {fetchStatus.includes("paste") && (
                                <div className="space-y-1.5">
                                    <p className="text-[11px] text-amber-400 font-semibold">LinkedIn blocked the fetch — copy the job description and paste it below:</p>
                                    <Textarea
                                        placeholder="Paste job description text here..."
                                        className="min-h-[80px] bg-muted/20 border-border/40 rounded-xl text-white placeholder:text-white/40"
                                        value={jobText}
                                        onChange={(e) => setJobText(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {error && (
                            <p className="text-rose-400 text-sm font-semibold">{error}</p>
                        )}

                        <div className="space-y-3 pt-2">
                            {/* Always show Analyze button — when results exist, also show Try Another */}
                            {results && !jobText ? (
                                <Button
                                    variant="outline"
                                    className="w-full py-7 text-lg font-black group transition-all rounded-2xl border-border/50 text-white/70 hover:text-white hover:border-primary/50"
                                    onClick={resetForNewJob}
                                >
                                    <RotateCcw className="mr-2 h-5 w-5 group-hover:-rotate-180 transition-transform duration-500" />
                                    Try Another Job
                                </Button>
                            ) : (
                                <Button
                                    className={cn(
                                        "w-full py-8 text-xl font-black group transition-all rounded-2xl shadow-xl active:scale-95",
                                        !canAnalyze
                                            ? "bg-muted text-muted-foreground cursor-not-allowed grayscale"
                                            : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-cyan-500/30"
                                    )}
                                    onClick={doAnalyze}
                                    disabled={isLoading || !canAnalyze}
                                >
                                    <span>{isLoading ? "Analyzing..." : results ? "Re-Analyze" : "Analyze My CV"}</span>
                                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Results Panel */}
                <Card className="bg-background/40 backdrop-blur-xl border-border/50 h-full">
                    <CardContent className="h-full flex flex-col p-8 lg:p-10">
                        {!results && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in-95">
                                <Search className="h-16 w-16 text-white/20 mb-6" />
                                <h3 className="text-xl font-black mb-2 uppercase tracking-widest text-white/40">Launch Your Future 🚀</h3>
                                <p className="text-white/60 text-sm font-semibold">Upload your CV and drop a job link to get started.</p>
                            </div>
                        )}

                        {/* Spinner overlaid while re-analyzing — old results stay underneath */}
                        {isLoading && !results && (
                            <div className="flex flex-col items-center justify-center h-full py-12 animate-in fade-in">
                                <div className="relative h-20 w-20">
                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <p className="mt-8 text-lg font-black animate-pulse text-indigo-400">Analyzing your profile...</p>
                            </div>
                        )}

                        {results && (
                            <div className={cn("transition-opacity duration-300", isLoading && "opacity-40 pointer-events-none")}>
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-8">
                                {/* Score Header */}
                                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-border/30">
                                    <div className="relative h-28 w-28 shrink-0">
                                        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/10" />
                                            <circle
                                                cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"
                                                strokeDasharray="283"
                                                strokeDashoffset={283 - (283 * results.score) / 100}
                                                className="text-primary transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-black text-white">{results.score}%</span>
                                            <span className="text-[10px] text-white/50">match</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className={cn("text-xl font-bold mb-1", results.persona.color)}>
                                            {results.persona.label}
                                        </p>
                                        <p className="text-white/70 text-sm leading-relaxed mb-2">{results.persona.desc}</p>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs text-white/40">
                                            <span>{results.rawMatched}/{results.rawTotal} keywords matched</span>
                                            <span>·</span>
                                            <span>{results.matched.length}/{results.matched.length + results.missing.length} skill categories</span>
                                            {results.yearsRequired > 0 && (
                                                <>
                                                    <span>·</span>
                                                    <span className={results.yearsOnCV >= results.yearsRequired ? "text-emerald-400" : "text-rose-400"}>
                                                        {results.yearsOnCV}y exp · {results.yearsRequired}y required
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Low quality warning */}
                                {results.lowQuality && (
                                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-300 text-xs flex items-start gap-2">
                                        <span>⚠️</span>
                                        <span>Only <strong>{results.jobWordCount} words</strong> extracted — paste the full job description for accurate results.</span>
                                    </div>
                                )}

                                {/* Matched Skills */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-300 mb-3">
                                        <Cpu className="h-4 w-4" /> Matched Skills
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {results.matched.length > 0 ? results.matched.map((s, i) => (
                                            <span key={i} className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-xs font-medium">
                                                {s}
                                            </span>
                                        )) : (
                                            <span className="text-xs text-white/50 italic">No matched skills found.</span>
                                        )}
                                    </div>
                                </div>

                                {/* Skills to Add */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-teal-300 mb-3">
                                        <Shield className="h-4 w-4" /> Skills to Add
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {results.missing.length > 0 ? results.missing.map((s, i) => (
                                            <span
                                                key={i}
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5",
                                                    s.priority === "high" ? "bg-rose-500/25 text-rose-200" :
                                                    s.priority === "medium" ? "bg-amber-500/20 text-amber-200" :
                                                    "bg-teal-500/15 text-teal-200"
                                                )}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                                                    style={{ background: s.priority === "high" ? "#f87171" : s.priority === "medium" ? "#fbbf24" : "#5eead4" }}
                                                />
                                                {s.label}
                                            </span>
                                        )) : (
                                            <span className="text-xs text-cyan-300/70 italic">Great coverage — no major gaps!</span>
                                        )}
                                    </div>
                                    {results.missing.some(m => m.priority !== "low") && (
                                        <p className="text-xs text-white/40 mt-2">● High priority · ● Mentioned · ● Nice to have</p>
                                    )}
                                </div>

                                {/* Job-specific keywords */}
                                {results.topJobSignals.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold text-teal-300 mb-3">Keywords missing from your CV</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.topJobSignals.map((w, i) => (
                                                <span key={i} className="px-3 py-1 bg-teal-500/10 text-teal-200 rounded-full text-xs font-medium">
                                                    {w}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* How to Improve */}
                                {results.missing.length > 0 && (
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-300 mb-3">
                                            <BookOpen className="h-4 w-4" /> How to Improve
                                        </h4>
                                        <div className="space-y-2">
                                            {results.missing
                                                .filter(m => SKILL_RESOURCES[m.key])
                                                .slice(0, 6)
                                                .map((m, i) => {
                                                    const resource = SKILL_RESOURCES[m.key]
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between px-4 py-3 bg-cyan-500/8 hover:bg-cyan-500/15 border border-cyan-500/10 hover:border-cyan-500/25 rounded-xl transition-colors group"
                                                        >
                                                            <div>
                                                                <p className="text-xs text-teal-400/80 mb-0.5">
                                                                    {m.label}{m.freq > 0 && ` · mentioned ${m.freq}× in job`}
                                                                </p>
                                                                <p className="text-sm text-white/85 group-hover:text-white transition-colors">{resource.label}</p>
                                                            </div>
                                                            <ExternalLink className="h-4 w-4 text-cyan-400/50 group-hover:text-cyan-300 shrink-0 ml-3" />
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )}

                                {/* Buy Me a Coffee */}
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                                    <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 p-7 rounded-3xl border border-amber-500/30 text-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-amber-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-3xl" />
                                        <div className="relative flex flex-col items-center">
                                            <div
                                                className="text-7xl mb-4 drop-shadow-2xl"
                                                style={{ animation: "coffeeFloat 2s ease-in-out infinite" }}
                                            >
                                                ☕
                                            </div>
                                            <h4 className="text-xl font-black text-amber-400 mb-1">Buy me a coffee!</h4>
                                            <p className="text-sm text-white/70 font-semibold mb-5">
                                                Helped you land an interview? Support the creator ❤️
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                                                <Button
                                                    className="flex-1 bg-[#635BFF] hover:bg-[#4f46e5] text-white font-extrabold text-sm shadow-xl shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 rounded-2xl h-12"
                                                    onClick={() => window.open("https://buy.stripe.com/test_3cI5kF1mw3Td2IHf0c2B200", "_blank")}
                                                >
                                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                                                    </svg>
                                                    Stripe
                                                </Button>
                                                <Button
                                                    className="flex-1 bg-[#003087] hover:bg-[#001f5e] text-white font-extrabold text-sm shadow-xl shadow-blue-900/40 transition-all active:scale-95 flex items-center justify-center gap-2 rounded-2xl h-12"
                                                    onClick={() => window.open("https://paypal.me/alisatass", "_blank")}
                                                >
                                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                                                    </svg>
                                                    PayPal
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Emoji Rating */}
                                <div className="pt-6 border-t border-border/30 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 flex flex-col items-center">
                                    <p className="text-sm font-black mb-5 text-white/80 uppercase tracking-widest">
                                        How accurate was this analysis?
                                    </p>
                                    <RatingInteraction />
                                </div>
                            </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <style jsx global>{`
                @keyframes coffeeFloat {
                    0%, 100% { transform: translateY(0px) rotate(-3deg); }
                    50% { transform: translateY(-10px) rotate(3deg); }
                }
            `}</style>

        </div>
    )
}
