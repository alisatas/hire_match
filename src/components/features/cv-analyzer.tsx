"use client"

import React, { useState, useEffect, useRef } from "react"
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
    CreditCard,
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
// PDF.js loader
// ─────────────────────────────────────────────
let pdfjsLib: any = null

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

    useEffect(() => {
        import("pdfjs-dist").then((pdfjs) => {
            pdfjsLib = pdfjs
            pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                "pdfjs-dist/build/pdf.worker.min.mjs",
                import.meta.url
            ).toString()
        }).catch(err => {
            console.error("Failed to load PDF.js", err)
        })
    }, [])

    const processPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || file.type !== "application/pdf") return

        setPdfStatus("Reading PDF...")
        try {
            if (!pdfjsLib) {
                const pdfjs = await import("pdfjs-dist")
                pdfjsLib = pdfjs
                pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
            }

            const arrayBuffer = await file.arrayBuffer()
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

            let fullText = ""
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const content = await page.getTextContent()

                // Group items by Y coordinate to reconstruct proper lines
                const lineMap = new Map<number, string[]>()
                for (const item of content.items as any[]) {
                    const y = Math.round(item.transform[5])
                    if (!lineMap.has(y)) lineMap.set(y, [])
                    lineMap.get(y)!.push(item.str)
                }

                const sortedYs = [...lineMap.keys()].sort((a, b) => b - a)
                for (const y of sortedYs) {
                    fullText += lineMap.get(y)!.join(" ") + "\n"
                }
                fullText += "\n"
            }

            const cleanedText = fullText.trim()
            if (cleanedText.length < 10) throw new Error("PDF seems empty or non-text")

            setCvText(cleanedText)
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

    const canAnalyze = (!!cvText) && (!!jobText || !!jobInput)

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
                    Get Hired in{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 drop-shadow-sm">
                        Style ✨
                    </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/80 font-semibold max-w-4xl mx-auto px-2 drop-shadow-sm">
                    Stop guessing. Start matching. Let our algorithm vibe-check your resume against your dream job. 🎯
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

                        {/* Job Description */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase tracking-widest text-primary/90">Job Description</label>
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-muted/20 border border-border/40 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                    placeholder="Paste job URL or description..."
                                    value={jobInput}
                                    onChange={(e) => { setJobInput(e.target.value); setJobText(""); setFetchStatus("") }}
                                    onKeyDown={(e) => e.key === "Enter" && fetchJobPost()}
                                />
                                {jobInput.trim().startsWith("http") && !fetchStatus.startsWith("✓") && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="shrink-0 text-white/80 border-border/40"
                                        onClick={fetchJobPost}
                                    >
                                        Fetch
                                    </Button>
                                )}
                            </div>
                            {fetchStatus && (
                                <p className={cn(
                                    "text-xs font-semibold",
                                    fetchStatus.startsWith("✓") ? "text-emerald-400" : "text-white/60"
                                )}>{fetchStatus}</p>
                            )}
                            {(fetchStatus.includes("paste") || (!jobInput.trim().startsWith("http") && jobInput)) && (
                                <Textarea
                                    placeholder="Paste job description text here..."
                                    className="min-h-[80px] bg-muted/20 border-border/40 rounded-xl text-white placeholder:text-white/40"
                                    value={jobText}
                                    onChange={(e) => setJobText(e.target.value)}
                                />
                            )}
                        </div>

                        {error && (
                            <p className="text-rose-400 text-sm font-semibold">{error}</p>
                        )}

                        <div className="space-y-3 pt-2">
                            {/* Always show Analyze button — when results exist, also show Try Another */}
                            {results && !jobInput && !jobText ? (
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
                                <h3 className="text-xl font-black mb-2 uppercase tracking-widest text-white/40">Ready for Launch 🚀</h3>
                                <p className="text-white/60 text-sm font-semibold">Upload your CV and add a job description to start.</p>
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
                                <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-border/50">
                                    <div className="relative h-36 w-36 shrink-0">
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
                                            <span className="text-5xl font-black text-white">{results.score}%</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Match</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className={cn("text-2xl font-black uppercase tracking-tight mb-1", results.persona.color)}>
                                            {results.persona.label}
                                        </p>
                                        <p className="text-white/80 font-semibold leading-relaxed text-sm italic mb-2">
                                            {results.persona.desc}
                                        </p>
                                        <p className="text-white/60 text-sm font-medium">"{results.summary}"</p>
                                    </div>
                                </div>

                                {/* Low quality warning */}
                                {results.lowQuality && (
                                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl px-4 py-3 text-amber-300 text-xs font-semibold flex items-start gap-2">
                                        <span className="text-base leading-none">⚠️</span>
                                        <span>Only <strong>{results.jobWordCount} words</strong> extracted from the job post — LinkedIn blocks scraping. For accurate results, open the job on LinkedIn, copy the full description, and paste it in the job field.</span>
                                    </div>
                                )}

                                {/* Stats row */}
                                <div className="flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-widest">
                                    <span className="px-3 py-1.5 bg-white/5 rounded-xl text-white/50">
                                        {results.rawMatched}/{results.rawTotal} keywords
                                    </span>
                                    <span className="px-3 py-1.5 bg-white/5 rounded-xl text-white/50">
                                        {results.matched.length}/{results.matched.length + results.missing.length} skill categories
                                    </span>
                                    {results.yearsRequired > 0 && (
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-xl",
                                            results.yearsOnCV >= results.yearsRequired
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-rose-500/10 text-rose-400"
                                        )}>
                                            {results.yearsOnCV}y exp · {results.yearsRequired}y required
                                        </span>
                                    )}
                                </div>

                                {/* Matched + Missing Skills */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/20">
                                        <h4 className="flex items-center gap-2 font-black mb-4 text-emerald-400 uppercase tracking-widest text-[11px]">
                                            <Cpu className="h-4 w-4" /> Matched Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.matched.length > 0 ? results.matched.map((s, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-[11px] font-bold uppercase">
                                                    {s}
                                                </span>
                                            )) : (
                                                <span className="text-xs text-white/50 italic">No keyword matches found.</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-rose-500/5 p-6 rounded-3xl border border-rose-500/20">
                                        <h4 className="flex items-center gap-2 font-black mb-4 text-rose-400 uppercase tracking-widest text-[11px]">
                                            <Shield className="h-4 w-4" /> Skills to Add
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.missing.length > 0 ? results.missing.map((s, i) => (
                                                <span
                                                    key={i}
                                                    title={s.priority === "high" ? "High priority for this job" : s.priority === "medium" ? "Mentioned in job" : "Nice to have"}
                                                    className={cn(
                                                        "px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase border",
                                                        s.priority === "high"
                                                            ? "bg-rose-500/20 border-rose-400/40 text-rose-200"
                                                            : s.priority === "medium"
                                                            ? "bg-rose-500/10 border-rose-500/20 text-rose-300"
                                                            : "bg-white/5 border-white/10 text-white/40"
                                                    )}
                                                >
                                                    {s.priority === "high" && <span className="mr-1">🔴</span>}
                                                    {s.priority === "medium" && <span className="mr-1">🟡</span>}
                                                    {s.label}
                                                </span>
                                            )) : (
                                                <span className="text-xs text-white/50 italic">Great coverage — no major gaps!</span>
                                            )}
                                        </div>
                                        {results.missing.some(m => m.priority === "high") && (
                                            <p className="text-[10px] text-white/30 mt-3 font-medium">🔴 High priority · 🟡 Mentioned · ⚫ Nice to have</p>
                                        )}
                                    </div>
                                </div>

                                {/* Top job-specific signals not on CV */}
                                {results.topJobSignals.length > 0 && (
                                    <div className="bg-violet-500/5 p-5 rounded-2xl border border-violet-500/15">
                                        <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-3">Job-specific keywords not on your CV</p>
                                        <div className="flex flex-wrap gap-2">
                                            {results.topJobSignals.map((w, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                                                    {w}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* How to Improve — sorted by job priority */}
                                {results.missing.length > 0 && (
                                    <div className="bg-indigo-500/5 p-6 rounded-3xl border border-indigo-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h4 className="flex items-center gap-2 font-black mb-5 text-indigo-300 uppercase tracking-widest text-[11px]">
                                            <BookOpen className="h-4 w-4" /> How to Improve
                                        </h4>
                                        <div className="space-y-3">
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
                                                            className="flex items-center justify-between p-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl transition-all group"
                                                        >
                                                            <div>
                                                                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-0.5 flex items-center gap-1.5">
                                                                    {m.priority === "high" && <span>🔴</span>}
                                                                    {m.priority === "medium" && <span>🟡</span>}
                                                                    {m.label}
                                                                    {m.freq > 0 && <span className="text-white/25">· mentioned {m.freq}× in job</span>}
                                                                </p>
                                                                <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{resource.label}</p>
                                                            </div>
                                                            <ExternalLink className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 shrink-0 ml-3" />
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
                                            <Button
                                                className="w-full max-w-xs bg-[#6772E5] hover:bg-[#5469d4] text-white font-extrabold text-base shadow-xl shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 rounded-2xl h-12"
                                                onClick={() => window.open("https://buy.stripe.com/your-link-here", "_blank")}
                                            >
                                                <CreditCard className="h-5 w-5" />
                                                Support via Stripe
                                            </Button>
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

            <footer className="text-center py-10 border-t border-border/20 text-white/50 font-semibold text-sm">
                <p>&copy; 2026 CV Scorer — Local Analysis Engine. No data sent to servers.</p>
            </footer>
        </div>
    )
}
