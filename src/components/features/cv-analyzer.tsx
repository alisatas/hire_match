"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RatingInteraction } from "@/components/ui/emoji-rating"
import {
    Sparkles,
    FileText,
    UploadCloud,
    ArrowRight,
    Shield,
    Cpu,
    RotateCcw,
    ExternalLink,
    BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { analyze, auditCV, type AnalysisResult, type CVAuditResult } from "@/lib/analyze"
import { extractCompanyName, extractCultureSignals, getInterviewLinks } from "@/lib/insights"

// Decode common HTML entities returned by search APIs
function decodeHtmlEntities(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
}

// ─────────────────────────────────────────────
// SKILL RESOURCES (UI-only: links for missing skills)
// ─────────────────────────────────────────────

interface SkillResource {
    label: string
    url: string
    platform: string
    type: "certification" | "course" | "guide" | "docs"
    duration: string
    free: boolean
}

const SKILL_RESOURCES: Record<string, SkillResource> = {
    react: { label: "React — Official Learn Path", url: "https://react.dev/learn", platform: "react.dev", type: "guide", duration: "~8 hrs", free: true },
    typescript: { label: "TypeScript for JS Programmers", url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html", platform: "typescriptlang.org", type: "guide", duration: "~6 hrs", free: true },
    javascript: { label: "JavaScript — The Complete Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", platform: "MDN", type: "docs", duration: "Self-paced", free: true },
    nextjs: { label: "Next.js — App Router Course", url: "https://nextjs.org/learn", platform: "Vercel / Next.js", type: "course", duration: "~4 hrs", free: true },
    tailwind: { label: "Tailwind CSS From Scratch", url: "https://tailwindcss.com/docs", platform: "Tailwind Labs", type: "docs", duration: "~3 hrs", free: true },
    css: { label: "CSS Foundations", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", platform: "MDN", type: "docs", duration: "Self-paced", free: true },
    vue: { label: "Vue.js Official Tutorial", url: "https://vuejs.org/tutorial/", platform: "Vue.js", type: "guide", duration: "~5 hrs", free: true },
    angular: { label: "Angular — First App Tutorial", url: "https://angular.dev/tutorials/first-app", platform: "Google / Angular", type: "guide", duration: "~6 hrs", free: true },
    redux: { label: "Redux Toolkit — Fundamentals", url: "https://redux-toolkit.js.org/tutorials/fundamentals/part-1-overview", platform: "Redux", type: "guide", duration: "~4 hrs", free: true },
    graphql: { label: "GraphQL — How to GraphQL", url: "https://www.howtographql.com/", platform: "Prisma", type: "course", duration: "~10 hrs", free: true },
    nodejs: { label: "Node.js — Introduction to Node", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", platform: "Node.js", type: "guide", duration: "~5 hrs", free: true },
    python: { label: "Python for Everybody — Coursera", url: "https://www.coursera.org/specializations/python", platform: "Coursera / UMich", type: "course", duration: "~32 hrs", free: false },
    java: { label: "Spring Boot — Building REST Services", url: "https://spring.io/guides/tutorials/rest", platform: "Spring", type: "guide", duration: "~4 hrs", free: true },
    csharp: { label: "C# Learning Path — Microsoft", url: "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/", platform: "Microsoft Learn", type: "course", duration: "~12 hrs", free: true },
    golang: { label: "Go — A Tour of Go", url: "https://go.dev/tour/welcome/1", platform: "go.dev", type: "guide", duration: "~4 hrs", free: true },
    rust: { label: "The Rust Book — Official", url: "https://doc.rust-lang.org/book/", platform: "Rust Foundation", type: "guide", duration: "~20 hrs", free: true },
    php: { label: "Laravel Bootcamp", url: "https://bootcamp.laravel.com/", platform: "Laravel", type: "course", duration: "~8 hrs", free: true },
    sql: { label: "SQL for Data Analysis — Mode", url: "https://mode.com/sql-tutorial/", platform: "Mode Analytics", type: "course", duration: "~6 hrs", free: true },
    mongodb: { label: "MongoDB University — M001 Basics", url: "https://university.mongodb.com/courses/M001/about", platform: "MongoDB University", type: "certification", duration: "~10 hrs", free: true },
    redis: { label: "Redis University — RU101", url: "https://university.redis.com/courses/ru101/", platform: "Redis University", type: "certification", duration: "~8 hrs", free: true },
    aws: { label: "AWS Cloud Practitioner Essentials", url: "https://skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", platform: "AWS Skill Builder", type: "certification", duration: "~6 hrs", free: true },
    gcp: { label: "Google Cloud Digital Leader", url: "https://cloudskillsboost.google/paths/9", platform: "Google Cloud", type: "certification", duration: "~8 hrs", free: true },
    azure: { label: "AZ-900 — Azure Fundamentals", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", platform: "Microsoft Learn", type: "certification", duration: "~8 hrs", free: true },
    docker: { label: "Docker — Get Started", url: "https://docs.docker.com/get-started/", platform: "Docker", type: "guide", duration: "~3 hrs", free: true },
    kubernetes: { label: "CKAD Prep — Kubernetes.io", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", platform: "CNCF / k8s", type: "certification", duration: "~15 hrs", free: true },
    cicd: { label: "GitHub Actions — Full Course", url: "https://docs.github.com/en/actions/learn-github-actions", platform: "GitHub", type: "guide", duration: "~4 hrs", free: true },
    terraform: { label: "HashiCorp Certified: Terraform Associate", url: "https://developer.hashicorp.com/terraform/tutorials/certification-003", platform: "HashiCorp", type: "certification", duration: "~12 hrs", free: true },
    jest: { label: "Jest — Testing JavaScript", url: "https://jestjs.io/docs/getting-started", platform: "Jest", type: "docs", duration: "~3 hrs", free: true },
    cypress: { label: "Cypress — Real World Testing", url: "https://learn.cypress.io/", platform: "Cypress", type: "course", duration: "~6 hrs", free: true },
    testing: { label: "Testing Library — Core Principles", url: "https://testing-library.com/docs/guiding-principles", platform: "Testing Library", type: "docs", duration: "~2 hrs", free: true },
    git: { label: "Git & GitHub — The Full Course", url: "https://rogerdudler.github.io/git-guide/", platform: "Community", type: "guide", duration: "~2 hrs", free: true },
    agile: { label: "Professional Scrum Master I (PSM I)", url: "https://www.scrum.org/assessments/professional-scrum-master-i-certification", platform: "Scrum.org", type: "certification", duration: "~10 hrs", free: false },
    api: { label: "REST API Design Best Practices", url: "https://restfulapi.net/", platform: "restfulapi.net", type: "guide", duration: "~2 hrs", free: true },
    linux: { label: "Linux Foundation — Intro to Linux", url: "https://training.linuxfoundation.org/training/introduction-to-linux/", platform: "Linux Foundation", type: "course", duration: "~60 hrs", free: true },
    figma: { label: "Figma — UI Design Essentials", url: "https://www.figma.com/resources/learn-design/", platform: "Figma", type: "course", duration: "~5 hrs", free: true },
    ml: { label: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", platform: "Google", type: "course", duration: "~15 hrs", free: true },
    data: { label: "Kaggle — Intro to ML", url: "https://www.kaggle.com/learn/intro-to-machine-learning", platform: "Kaggle", type: "course", duration: "~5 hrs", free: true },
    ai: { label: "Prompt Engineering — Anthropic", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", platform: "Anthropic", type: "guide", duration: "~3 hrs", free: true },
}

// ─────────────────────────────────────────────
// SAMPLE JOBS
// ─────────────────────────────────────────────

const SAMPLE_JOBS = [
    {
        label: "Frontend Dev",
        emoji: "🎨",
        desc: "React, TypeScript, Next.js, Tailwind, GraphQL, Jest, CI/CD",
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
        desc: "Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, Redis, Terraform",
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
        desc: "SQL, Python, Pandas, Tableau, Power BI, BigQuery, Redshift, A/B Testing",
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
    {
        label: "Product Manager",
        emoji: "📋",
        desc: "Product strategy, roadmap, Agile, Jira, analytics, stakeholder management",
        text: `Senior Product Manager — London (Hybrid)

We are looking for an experienced Product Manager to lead our core product area and drive growth across our platform.

Requirements:
- 4+ years of product management experience in a B2B or B2C SaaS environment
- Strong ability to define product vision, strategy, and roadmap
- Experience running agile sprints — Jira, Confluence, and backlog grooming
- Data-driven mindset: comfortable with SQL, Google Analytics, Mixpanel, or Amplitude
- Excellent stakeholder management and communication skills
- Proven track record of shipping features from ideation to launch
- Experience writing PRDs, user stories, and acceptance criteria
- Understanding of UX design principles and working with Figma

Nice to have:
- Prior experience in fintech, marketplace, or SaaS
- A/B testing and experimentation experience
- Basic technical knowledge (APIs, system design)
- Experience with OKRs and product-led growth

Join a fast-moving team where product decisions have real impact.`,
    },
    {
        label: "DevOps Engineer",
        emoji: "⚙️",
        desc: "Kubernetes, Terraform, AWS, CI/CD, Docker, Linux, monitoring, security",
        text: `DevOps Engineer — Berlin (Remote-friendly)

We are hiring a DevOps Engineer to own our infrastructure, deployment pipelines, and cloud operations.

Requirements:
- 3+ years of DevOps or platform engineering experience
- Deep expertise with Kubernetes (EKS or GKE preferred) and Helm
- Strong Terraform skills for infrastructure as code
- AWS or GCP cloud infrastructure — VPCs, IAM, S3, RDS, Lambda
- Docker containerisation and image optimisation
- CI/CD pipelines — GitHub Actions, ArgoCD, or Jenkins
- Linux system administration and shell scripting (Bash)
- Monitoring and observability: Prometheus, Grafana, Datadog, or similar
- Security best practices: secrets management (Vault, AWS Secrets Manager), network policies

Nice to have:
- Service mesh experience (Istio, Linkerd)
- Experience with multi-region deployments
- Cost optimisation mindset (FinOps)
- Python or Go for automation scripting

We run fully on AWS with a large Kubernetes cluster and need someone who can own it end-to-end.`,
    },
    {
        label: "UX Designer",
        emoji: "🎨",
        desc: "Figma, user research, wireframing, prototyping, usability testing, design systems",
        text: `UX/Product Designer — Amsterdam (Hybrid)

We are looking for a UX Designer to craft intuitive, beautiful product experiences for our growing user base.

Requirements:
- 3+ years of UX or product design experience in a digital product environment
- Expert-level Figma skills — components, auto-layout, prototyping
- Strong portfolio demonstrating end-to-end design process
- Experience conducting user research, interviews, and usability testing
- Ability to translate research insights into wireframes and high-fidelity designs
- Familiarity with design systems and component libraries
- Understanding of accessibility standards (WCAG)
- Close collaboration with product managers and engineers

Nice to have:
- Motion design and micro-interactions (Framer, Principle)
- Basic front-end knowledge (HTML, CSS, React)
- Experience with Maze, Hotjar, or FullStory for research
- Mobile app design (iOS/Android HIG)

We care deeply about craft and ship thoughtful, user-tested features.`,
    },
]

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function CVAnalyzer() {
    const [cvText, setCvText] = useState("")
    const [jobText, setJobText] = useState("")
    const [jobInput, setJobInput] = useState("")
    const [jobUrl, setJobUrl] = useState("")
    const [fetchStatus, setFetchStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<AnalysisResult | null>(null)
    const [pdfStatus, setPdfStatus] = useState("")
    const [error, setError] = useState("")
    const [showCvPaste, setShowCvPaste] = useState(false)
    const [cvAudit, setCvAudit] = useState<CVAuditResult | null>(null)

    const [jobInputMode, setJobInputMode] = useState<"url" | "paste">("url")
    const [history, setHistory] = useState<{ score: number; label: string; matched: number; missing: number; date: string }[]>([])
    const [interviewResults, setInterviewResults] = useState<{ title: string; snippet: string; url: string; source: string }[]>([])
    const [interviewLoading, setInterviewLoading] = useState(false)
    const [scrapedCompanyName, setScrapedCompanyName] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        try {
            const stored = localStorage.getItem("cvxray_history")
            if (stored) setHistory(JSON.parse(stored))
        } catch { /* ignore */ }
    }, [])

    useEffect(() => {
        if (!results || !jobText) return
        const company = scrapedCompanyName || extractCompanyName(jobText)
        if (!company) return
        setInterviewResults([])
        setInterviewLoading(true)
        fetch(`/api/interview-questions?company=${encodeURIComponent(company)}`)
            .then(r => r.json())
            .then(data => { setInterviewResults(data.results ?? []) })
            .catch(() => {})
            .finally(() => setInterviewLoading(false))
    }, [results, jobText, scrapedCompanyName])

    const processPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || file.type !== "application/pdf") return

        if (file.size > 5 * 1024 * 1024) {
            setPdfStatus("File too large (max 5MB). Paste your CV text below.")
            return
        }

        setPdfStatus("Reading PDF...")
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await fetch("/api/extract-pdf", { method: "POST", body: formData })
            const data = await res.json()
            if (!res.ok || !data.text) throw new Error(data.error || "No text extracted")
            setCvText(data.text)
            setCvAudit(auditCV(data.text))
            setPdfStatus(`✓ ${file.name} loaded`)
        } catch (err: unknown) {
            console.error("PDF Read Error:", err)
            setPdfStatus("Error reading PDF. Paste your CV text below.")
        }
    }

    const fetchJobPost = async () => {
        const url = jobInput.trim()
        if (!url.startsWith("http")) {
            setJobText(jobInput)
            setJobUrl("")
            return
        }

        setJobUrl(url)
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
                setScrapedCompanyName(data.companyName || "")
                setFetchStatus("✓ Job post fetched")
            } else {
                setFetchStatus("Could not fetch — paste the text below")
            }
        } catch {
            setFetchStatus("Could not fetch — paste the text below")
        }
    }

    const doAnalyze = async () => {
        if (!cvText || !cvText.trim()) {
            setError("Upload a PDF or paste your CV text first.")
            return
        }

        setError("")
        setIsLoading(true)
        setResults(null)

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
                    setScrapedCompanyName(data.companyName || "")
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
            setIsLoading(false)
            return
        }

        const result = analyze(cvText, effectiveJobText)
        setResults(result)
        setIsLoading(false)

        // Save to history (last 3)
        try {
            const entry = {
                score: result.score,
                label: result.persona.label,
                matched: result.matched.length,
                missing: result.missing.length,
                date: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }),
            }
            const updated = [entry, ...history].slice(0, 3)
            setHistory(updated)
            localStorage.setItem("cvxray_history", JSON.stringify(updated))
        } catch { /* ignore */ }
    }

    // "Try Another Job" — clear only the job field, keep CV + existing results visible
    const resetForNewJob = () => {
        setJobText("")
        setJobInput("")
        setJobUrl("")
        setScrapedCompanyName("")
        setFetchStatus("")
        setError("")
        // NOTE: results intentionally NOT cleared — stays visible until new analysis runs
    }

    // "Change CV" — explicit CV reset
    const resetCV = () => {
        setCvText("")
        setPdfStatus("")
        setResults(null)
        setCvAudit(null)
        setError("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const validUrl = jobInput.trim().startsWith("http")
    const canAnalyze = !!cvText && (!!jobText || validUrl)

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                <a href="https://cvxray.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Sparkles className="text-primary h-8 w-8" />
                    <span className="text-2xl font-bold tracking-tight text-white">CVXray</span>
                </a>
            </header>

            <section className="text-center mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter text-white">
                    Does Your CV{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 drop-shadow-sm">
                        Match the Job?
                    </span>
                </h1>
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
                                    <button
                                        type="button"
                                        onClick={() => setShowCvPaste(v => !v)}
                                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-widest transition-colors"
                                    >
                                        {showCvPaste ? "↑ Upload PDF instead" : "Paste text instead"}
                                    </button>
                                </div>
                                {showCvPaste ? (
                                    <Textarea
                                        placeholder="Paste your full CV text here..."
                                        className="min-h-[140px] max-h-[220px] h-[220px] resize-none overflow-y-auto [field-sizing:fixed] bg-muted/20 border-border/40 rounded-xl text-white placeholder:text-white/30 text-sm"
                                        value={cvText}
                                        onChange={(e) => { setCvText(e.target.value); setPdfStatus("✓ CV text loaded"); if (e.target.value.length > 100) setCvAudit(auditCV(e.target.value)) }}
                                        autoFocus
                                    />
                                ) : (
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
                                            aria-label="Upload PDF CV"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={processPdf}
                                        />
                                    </div>
                                )}
                                {pdfStatus && !showCvPaste && (
                                    <p className="text-xs text-center font-semibold text-white/70 animate-pulse">{pdfStatus}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
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

                            </div>
                        )}

                        {/* Job Description — URL or Paste */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase tracking-widest text-primary/90">Job Description</label>
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                            </div>

                            {/* Tab toggle */}
                            <div className="flex rounded-xl bg-muted/20 border border-border/40 p-0.5 gap-0.5">
                                <button
                                    type="button"
                                    onClick={() => { setJobInputMode("url"); setJobText(""); setFetchStatus(""); setScrapedCompanyName(""); }}
                                    className={cn(
                                        "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                                        jobInputMode === "url"
                                            ? "bg-primary/20 text-primary"
                                            : "text-white/40 hover:text-white/70"
                                    )}
                                >
                                    🔗 Job URL
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setJobInputMode("paste"); setJobInput(""); setJobUrl(""); setFetchStatus(""); setScrapedCompanyName(""); }}
                                    className={cn(
                                        "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                                        jobInputMode === "paste"
                                            ? "bg-primary/20 text-primary"
                                            : "text-white/40 hover:text-white/70"
                                    )}
                                >
                                    📋 Paste Text
                                </button>
                            </div>

                            {jobInputMode === "url" ? (
                                <>
                                    <p className="text-xs text-cyan-300/80">Paste a job URL from LinkedIn, Indeed, or any job board &mdash; we&apos;ll fetch it automatically.</p>
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
                                            aria-label="Job description URL"
                                            className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
                                            placeholder="https://linkedin.com/jobs/..."
                                            value={jobInput}
                                            onChange={(e) => { setJobInput(e.target.value); setJobText(""); setFetchStatus(""); setScrapedCompanyName(""); if (e.target.value.startsWith("http")) setJobUrl(e.target.value); }}
                                            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.value.trim().startsWith("http") && fetchJobPost()}
                                            onBlur={() => jobInput && !jobInput.trim().startsWith("http") && setError("Please paste a valid job URL (must start with https://)")}
                                            onFocus={() => setError("")}
                                        />
                                        {fetchStatus.startsWith("✓") && (
                                            <span className="text-emerald-400 text-xs font-bold shrink-0">✓</span>
                                        )}
                                    </div>

                                    {jobInput && !jobInput.trim().startsWith("http") && (
                                        <p className="text-rose-400 text-xs font-semibold">Please paste a valid job URL starting with https://</p>
                                    )}

                                    {fetchStatus && (
                                        <p className={cn(
                                            "text-xs font-semibold break-words",
                                            fetchStatus.startsWith("✓") ? "text-emerald-400" : fetchStatus.includes("paste") ? "text-amber-400" : "text-white/60"
                                        )}>{fetchStatus.includes("paste") ? "Couldn't fetch — switch to Paste Text tab above." : fetchStatus}</p>
                                    )}

                                    {/* Sample job buttons */}
                                    {!jobText && !fetchStatus.startsWith("✓") && (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-cyan-300/80">
                                                No job description? Click a role to X-ray your CV against it:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {SAMPLE_JOBS.map((job) => (
                                                    <button
                                                        key={job.label}
                                                        type="button"
                                                        title={job.desc}
                                                        onClick={() => {
                                                            setJobInput("")
                                                            setJobText(job.text)
                                                            setFetchStatus(`✓ ${job.label} sample loaded`)
                                                            setError("")
                                                        }}
                                                        className="group px-3 py-2.5 text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-300 rounded-full transition-all flex items-center gap-1.5"
                                                    >
                                                        {job.emoji} {job.label}
                                                        <span className="text-cyan-500/50 text-[10px] group-hover:text-cyan-400 transition-colors">↓</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-xs text-cyan-300/80">Copy the full job description and paste it here.</p>
                                    <Textarea
                                        placeholder="Paste job description text here..."
                                        className="min-h-[120px] max-h-[220px] h-[220px] resize-none overflow-y-auto [field-sizing:fixed] bg-muted/20 border-border/40 rounded-xl text-white placeholder:text-white/30 text-sm"
                                        value={jobText}
                                        onChange={(e) => { setJobText(e.target.value); setFetchStatus(e.target.value.length > 50 ? "✓ Job description ready" : ""); }}
                                        autoFocus
                                    />
                                    {jobText.length > 50 && (
                                        <p className="text-emerald-400 text-xs font-semibold">✓ Job description ready</p>
                                    )}

                                    {/* Sample job buttons in paste mode too */}
                                    {!jobText && (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-cyan-300/80">Or try a sample role:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {SAMPLE_JOBS.map((job) => (
                                                    <button
                                                        key={job.label}
                                                        type="button"
                                                        title={job.desc}
                                                        onClick={() => {
                                                            setJobText(job.text)
                                                            setFetchStatus(`✓ ${job.label} sample loaded`)
                                                            setError("")
                                                        }}
                                                        className="group px-3 py-2.5 text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-300 rounded-full transition-all flex items-center gap-1.5"
                                                    >
                                                        {job.emoji} {job.label}
                                                        <span className="text-cyan-500/50 text-[10px] group-hover:text-cyan-400 transition-colors">↓</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {error && (
                            <p className="text-rose-400 text-sm font-semibold">{error}</p>
                        )}

<div className="space-y-3 pt-2">
                            {/* Always show Analyze button — when results exist, also show Try Another */}
                            {results && !jobText && !jobInput ? (
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
                                            : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-cyan-500/30 text-white"
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
                    <CardContent className="h-full flex flex-col p-0">
                    {results && (
                        <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-950/95 to-teal-950/95 backdrop-blur border-b border-emerald-400/30 px-4 py-3 shadow-lg shadow-emerald-900/30">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="animate-bounce text-lg">👋</span>
                                <p className="text-sm font-extrabold text-emerald-300 tracking-wide">Still want to apply?</p>
                                <span className="text-lg animate-bounce">🚀</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex items-center gap-2 bg-emerald-900/40 border border-emerald-400/30 rounded-xl px-3 py-2 focus-within:border-emerald-400/70 focus-within:ring-1 focus-within:ring-emerald-400/30 transition-all">
                                    <span className="text-emerald-500 text-xs">🔗</span>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={jobUrl}
                                        onChange={e => setJobUrl(e.target.value)}
                                        className="flex-1 bg-transparent text-xs text-emerald-200 placeholder:text-emerald-700 outline-none min-w-0"
                                    />
                                </div>
                                {jobUrl ? (
                                    <a
                                        href={jobUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold transition-all active:scale-95 shrink-0 shadow-lg shadow-emerald-500/30 animate-pulse"
                                    >
                                        Apply Now 🎯
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900/50 border border-emerald-500/20 text-emerald-700 text-xs font-extrabold shrink-0">
                                        Apply Now 🎯
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="overflow-y-auto lg:max-h-[85vh] p-6 sm:p-8 lg:p-10 flex flex-col h-full">
                        {!results && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in-95">
                                <Sparkles className="h-12 w-12 text-cyan-400/50 mb-5" />
                                <p className="text-lg font-bold mb-2 text-cyan-200/90">Your results will appear here</p>
                                <p className="text-white/80 text-sm">Fill in your CV and job description on the left, then hit Analyze.</p>
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
                                <h2 className="sr-only">Your Match Results</h2>

                                {/* Next Steps — score-tiered action card (shown first, replaces HR Quick Scan) */}
                                {(() => {
                                    const s = results.score
                                    const highGaps = results.missing.filter(m => m.priority === "high")
                                    if (s >= 70) return (
                                        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 to-teal-950/30 px-5 py-4 space-y-2">
                                            <p className="text-sm font-black text-emerald-300 flex items-center gap-2">✅ You&apos;re a strong match — apply now</p>
                                            <ul className="space-y-1.5 text-xs text-white/70">
                                                <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0 mt-0.5">→</span>Tailor your cover letter to mention: <span className="text-emerald-300 font-semibold">{results.matched.slice(0, 3).join(", ")}</span></li>
                                                {highGaps.length > 0 && <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">→</span>Briefly address your gap in <span className="text-amber-300 font-semibold">{highGaps[0].label}</span> — show learning in progress</li>}
                                                <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0 mt-0.5">→</span>Click <strong>Apply Now</strong> above before the role closes</li>
                                            </ul>
                                        </div>
                                    )
                                    if (s >= 45) return (
                                        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-orange-950/20 px-5 py-4 space-y-2">
                                            <p className="text-sm font-black text-amber-300 flex items-center gap-2">
                                                {highGaps.length > 0
                                                    ? `⚡ Decent match — close ${Math.min(highGaps.length, 2)} gap${Math.min(highGaps.length, 2) !== 1 ? "s" : ""} to be competitive`
                                                    : "⚡ Good match — apply and highlight your strengths"}
                                            </p>
                                            <ul className="space-y-1.5 text-xs text-white/70">
                                                {highGaps.slice(0, 2).map((g, i) => (
                                                    <li key={i} className="flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">→</span>Add <span className="text-amber-300 font-semibold">{g.label}</span> to your CV — even a side project counts</li>
                                                ))}
                                                <li className="flex items-start gap-2"><span className="text-cyan-400 shrink-0 mt-0.5">→</span>You can still apply — your existing skills in <span className="text-cyan-300 font-semibold">{results.matched.slice(0, 2).join(", ")}</span> are solid</li>
                                            </ul>
                                        </div>
                                    )
                                    return (
                                        <div className="rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-950/40 to-slate-900/60 px-5 py-4 space-y-2">
                                            <p className="text-sm font-black text-rose-300 flex items-center gap-2">🎯 Below threshold — build skills before applying</p>
                                            <ul className="space-y-1.5 text-xs text-white/70">
                                                {highGaps.slice(0, 3).map((g, i) => (
                                                    <li key={i} className="flex items-start gap-2"><span className="text-rose-400 shrink-0 mt-0.5">→</span>Priority: learn <span className="text-rose-300 font-semibold">{g.label}</span> — see course below</li>
                                                ))}
                                                <li className="flex items-start gap-2"><span className="text-cyan-400 shrink-0 mt-0.5">→</span>Try a similar role that fits better — use <strong>Try Another Job</strong> below</li>
                                            </ul>
                                        </div>
                                    )
                                })()}

                                {/* Score Header */}
                                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-border/30">
                                    <div className="relative h-28 w-28 shrink-0">
                                        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full" aria-label={`Match score: ${results.score}%`} role="img">
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
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs text-white/60">
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

                                {/* HR Quick Scan — CV quality breakdown, shown after analysis */}
                                {cvAudit && (
                                    <div className="space-y-3 animate-in fade-in duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-base">👔</span>
                                                <p className="text-xs font-black uppercase tracking-widest text-violet-300">HR Quick Scan</p>
                                            </div>
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                                                cvAudit.grade === 'strong' ? "bg-emerald-500/20 text-emerald-300" :
                                                cvAudit.grade === 'average' ? "bg-amber-500/20 text-amber-300" :
                                                "bg-rose-500/20 text-rose-300"
                                            )}>
                                                {cvAudit.grade === 'strong' ? '✓ Strong' : cvAudit.grade === 'average' ? '⚡ Needs work' : '⚠ Weak'}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {cvAudit.categories.map(cat => (
                                                <div key={cat.key} className="rounded-lg border border-white/6 bg-white/3 px-3 py-2.5 space-y-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm shrink-0">{cat.icon}</span>
                                                        <span className="text-xs font-semibold text-white/85 shrink-0">{cat.label}</span>
                                                        <span className={cn(
                                                            "w-1.5 h-1.5 rounded-full shrink-0",
                                                            cat.status === 'good' ? "bg-emerald-400" :
                                                            cat.status === 'warn' ? "bg-amber-400" :
                                                            "bg-rose-400"
                                                        )} />
                                                        {cat.status === 'good' && (
                                                            <span className="text-[11px] text-emerald-400/80">Looks good</span>
                                                        )}
                                                    </div>
                                                    {cat.status !== 'good' && cat.missing.length > 0 && (
                                                        <div className="pl-6 space-y-1.5">
                                                            <p className="text-[11px] text-white/40">Try adding:</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {cat.missing.map((kw, i) => (
                                                                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-full border border-amber-400/25 bg-amber-500/10 text-amber-200 font-medium">
                                                                        {kw}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Skills card */}
                                <div className="rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-teal-950/20 p-4 space-y-5">

                                    {/* Matched Skills */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-cyan-300 mb-3">
                                            <Cpu className="h-4 w-4" /> Matched Skills
                                        </h3>
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

                                    <div className="border-t border-white/5" />

                                    {/* Skills to Add */}
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-teal-300 mb-3">
                                            <Shield className="h-4 w-4" /> Skills to Add
                                        </h3>
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
                                            <p className="text-xs mt-2 flex items-center gap-2 flex-wrap">
                                                <span className="flex items-center gap-1"><span className="text-rose-400">●</span><span className="text-white/60">High priority</span></span>
                                                <span className="text-white/20">·</span>
                                                <span className="flex items-center gap-1"><span className="text-amber-400">●</span><span className="text-white/60">Mentioned</span></span>
                                                <span className="text-white/20">·</span>
                                                <span className="flex items-center gap-1"><span className="text-teal-400">●</span><span className="text-white/60">Nice to have</span></span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Job-specific keywords */}
                                    {results.topJobSignals.length > 0 && (
                                        <>
                                            <div className="border-t border-white/5" />
                                            <div>
                                                <div className="mb-3">
                                                    <h3 className="text-sm font-semibold text-teal-300 mb-0.5">Words the Recruiter Is Looking For</h3>
                                                    <p className="text-xs text-cyan-300/80">These exact words are in the job posting but missing from your CV. Recruiters search by these terms — if they&apos;re not there, your application may be filtered out automatically.</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {results.topJobSignals.map(({ word, freq }, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                                                                freq >= 3
                                                                    ? "bg-red-500/10 border-red-500/25 text-red-300"
                                                                    : freq === 2
                                                                    ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                                                                    : "bg-teal-500/10 border-teal-500/20 text-teal-200"
                                                            }`}
                                                        >
                                                            {word}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-white/60 mt-2 flex items-center gap-3 flex-wrap">
                                                    <span className="flex items-center gap-1"><span className="text-red-400">■</span> Used often</span>
                                                    <span className="flex items-center gap-1"><span className="text-amber-400">■</span> Used sometimes</span>
                                                    <span className="flex items-center gap-1"><span className="text-teal-400">■</span> Used once</span>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Recommended Training */}
                                {results.missing.length > 0 && (
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-cyan-300 mb-2">
                                            <BookOpen className="h-4 w-4" /> Recommended Training
                                        </h3>
                                        <p className="text-xs text-cyan-200/80 mb-3">Courses & guides for your skill gaps — sorted by priority.</p>
                                        <div className="space-y-1.5">
                                            {results.missing
                                                .filter(m => SKILL_RESOURCES[m.key])
                                                .slice(0, 6)
                                                .map((m, i) => {
                                                    const resource = SKILL_RESOURCES[m.key]
                                                    const priorityColor = m.priority === "high"
                                                        ? "bg-red-500"
                                                        : m.priority === "medium"
                                                        ? "bg-amber-500"
                                                        : "bg-white/20"
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex min-w-0 items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all group"
                                                        >
                                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${priorityColor}`} />
                                                            <span className="shrink-0 text-[10px] font-bold text-cyan-400/70 uppercase tracking-wider w-16 truncate">{m.label}</span>
                                                            <span className="min-w-0 text-xs text-white/80 group-hover:text-cyan-300 transition-colors truncate flex-1">{resource.label}</span>
                                                            <ExternalLink className="shrink-0 w-3 h-3 text-white/30 group-hover:text-cyan-400 transition-colors" />
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
                                            <p className="text-xl font-black text-amber-400 mb-1">Buy me a coffee!</p>
                                            <p className="text-sm text-white/70 font-semibold mb-5">
                                                Helped you land an interview? Support the creator ❤️
                                            </p>
                                            {/* PayPal-style Pay Now widget */}
                                            <button
                                                onClick={() => window.open("https://www.paypal.com/ncp/payment/PJQ645FWEKYAU", "_blank")}
                                                className="w-full rounded-2xl overflow-hidden shadow-xl active:scale-95 transition-transform"
                                            >
                                                {/* Pay Now button */}
                                                <div className="bg-[#FFC439] hover:bg-[#f0b429] transition-colors px-6 py-3.5 flex items-center justify-center rounded-2xl">
                                                    <span className="text-[#003087] font-black text-base tracking-wide">Pay Now</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Insights */}
                                {jobText && (() => {
                                    const company = scrapedCompanyName || extractCompanyName(jobText)
                                    const culture = extractCultureSignals(jobText)
                                    if (!company && culture.length === 0) return null
                                    return (
                                        <div className="rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-950/40 via-slate-900/60 to-cyan-950/30 p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            {/* Card header */}
                                            <div className="flex items-center gap-2 min-w-0">
                                                <div className="flex shrink-0 items-center justify-center w-7 h-7 rounded-lg bg-teal-500/15 border border-teal-500/25 text-base">🏢</div>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-semibold text-teal-400/70 uppercase tracking-widest">Company Insights</p>
                                                    {company && <p className="text-sm font-bold text-white leading-tight truncate">{company}</p>}
                                                </div>
                                            </div>

                                            {/* Culture signals */}
                                            {culture.length > 0 && (
                                                <div>
                                                    <p className="text-xs text-cyan-200/90 mb-2 font-semibold">Culture signals</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {culture.map(({ label, color }) => (
                                                            <span key={label} className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${color}`}>
                                                                {label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Interview resources */}
                                            {company && (
                                                <div>
                                                    <p className="text-xs text-cyan-200/90 mb-2 font-semibold">Interview resources</p>
                                                    {interviewLoading && (
                                                        <p className="text-xs text-white/40 animate-pulse">Searching the web…</p>
                                                    )}
                                                    {!interviewLoading && interviewResults.length === 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {getInterviewLinks(company).map(({ label, url, icon, color }) => (
                                                                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${color}`}>
                                                                    {icon} {label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {!interviewLoading && interviewResults.length > 0 && (
                                                        <div className="space-y-1.5">
                                                            {interviewResults.map((result, i) => (
                                                                <a key={i} href={result.url} target="_blank" rel="noopener noreferrer"
                                                                    className="flex min-w-0 items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group">
                                                                    <span className="shrink-0 text-[10px] font-bold text-teal-400/70 uppercase tracking-wider w-16 truncate">{result.source}</span>
                                                                    <span className="min-w-0 text-xs text-white/80 group-hover:text-teal-300 transition-colors truncate flex-1">{decodeHtmlEntities(result.title)}</span>
                                                                    <ExternalLink className="shrink-0 w-3 h-3 text-white/30 group-hover:text-teal-400 transition-colors" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })()}

                                {/* Emoji Rating */}
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-teal-950/20 p-5 flex flex-col items-center text-center">
<p className="text-base font-bold text-white mb-1">🎯 Rate this analysis</p>
                                        <p className="text-xs text-cyan-200/70 mb-4">Was the match score accurate for this role?</p>
                                        <RatingInteraction />
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
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
