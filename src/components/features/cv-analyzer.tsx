"use client"

import React, { useState, useRef, useEffect, useMemo, useSyncExternalStore } from "react"
import {
    ArrowRight,
    ArrowUpRight,
    Briefcase,
    ImageDown,
    PencilLine,
    Building2,
    Check,
    ChevronDown,
    CircleAlert,
    CircleCheck,
    CircleX,
    ClipboardPaste,
    CloudUpload,
    Copy,
    FileSearch,
    FileText,
    Gauge,
    GraduationCap,
    History,
    Link2,
    ListChecks,
    LoaderCircle,
    Lock,
    RotateCcw,
    ScanSearch,
    Share2,
    ShieldCheck,
    Target,
    TriangleAlert,
    Zap,
} from "lucide-react"
import { cn, safeHttpUrl } from "@/lib/utils"
import { track } from "@/lib/analytics"
import { Badge, Chip, Divider, FeedbackRating, Panel, ScoreRing, Section, SegmentedControl, StatTile, StepLabel, toneDot, toneForScore, toneText, type Tone } from "./analyzer-ui"
import { SKILL_GROUPS, analyze, auditCV, type AnalysisResult, type CVAuditResult, type MissingSkillWithPriority } from "@/lib/analyze"
import { buildSuggestions, type KeywordSuggestion } from "@/lib/suggestions"
import { renderScoreCard, shareOrDownloadCard } from "@/lib/score-card"
import { decodeEntities } from "@/lib/html-text"
import { CoffeeLink } from "@/components/coffee-link"
import type { Locale } from "@/lib/i18n"
import type { AnalyzerStrings, Dictionary } from "@/lib/i18n/en"
import { fmt } from "@/lib/i18n/format"
import { countWords, looksEnglish } from "@/lib/languages"
import { extractCompanyName, extractCultureSignals, getInterviewLinks } from "@/lib/insights"

// ─── Share URL helpers ───────────────────────────────────────────────────────

// Share links carry the result as base64url JSON in the hash (#s=...). The older format
// (#r= + percent-encoded JSON) produced unreadable %7B%22… URLs; it is still decoded so
// links that were already shared keep working.
const SHARE_PREFIX = "#s="
const LEGACY_SHARE_PREFIX = "#r="

const hasShareHash = (hash: string) => hash.startsWith(SHARE_PREFIX) || hash.startsWith(LEGACY_SHARE_PREFIX)

function toBase64Url(text: string): string {
    let binary = ""
    new TextEncoder().encode(text).forEach(b => { binary += String.fromCharCode(b) })
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(encoded: string): string {
    const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"))
    return new TextDecoder().decode(Uint8Array.from(binary, ch => ch.charCodeAt(0)))
}

function encodeResults(r: AnalysisResult): string {
    try {
        return toBase64Url(JSON.stringify({
            s: r.score, pl: r.persona.label, pd: r.persona.desc, pc: r.persona.color,
            m: r.matched,
            ms: r.missing.map(x => [x.label, x.key, x.freq, x.priority]),
            rm: r.rawMatched, rt: r.rawTotal, yr: r.yearsRequired, yc: r.yearsOnCV,
            ts: r.topJobSignals.map(x => [x.word, x.freq]),
            lq: r.lowQuality, jw: r.jobWordCount, sm: r.summary,
        }))
    } catch { return "" }
}

function decodeResults(hash: string): AnalysisResult | null {
    try {
        const json = hash.startsWith(SHARE_PREFIX)
            ? fromBase64Url(hash.slice(SHARE_PREFIX.length))
            : decodeURIComponent(hash.slice(LEGACY_SHARE_PREFIX.length))
        const c = JSON.parse(json)
        // Shared links are untrusted input — reject anything that is not the shape we wrote,
        // otherwise rendering calls .length / .map on undefined and the page crashes
        if (!c || typeof c !== "object") return null
        if (typeof c.s !== "number" || !Number.isFinite(c.s)) return null
        if (typeof c.pl !== "string" || typeof c.pd !== "string" || typeof c.pc !== "string") return null
        if (!Array.isArray(c.m) || !c.m.every((x: unknown) => typeof x === "string")) return null
        if (!Array.isArray(c.ms) || !c.ms.every((x: unknown) => Array.isArray(x) && x.length === 4)) return null
        if (!Array.isArray(c.ts) || !c.ts.every((x: unknown) => Array.isArray(x) && x.length === 2)) return null
        if (typeof c.sm !== "string") return null
        // Every field that is rendered must have the type the UI expects. A crafted link with an
        // object where a number belongs ("rt": {"a": 1}) used to crash the whole page, so a
        // shared link could make the site look broken for whoever opened it.
        const num = (v: unknown) => typeof v === "number" && Number.isFinite(v)
        if (![c.rm, c.rt, c.yr, c.yc, c.jw].every(num) || typeof c.lq !== "boolean") return null
        const priorities = ["high", "medium", "low"]
        if (!c.ms.every(([label, key, freq, priority]: unknown[]) =>
            typeof label === "string" && typeof key === "string" && Object.hasOwn(SKILL_GROUPS, key) && num(freq) && priorities.includes(priority as string))) return null
        if (!c.ts.every(([word, freq]: unknown[]) => typeof word === "string" && num(freq))) return null
        return {
            score: c.s,
            persona: { label: c.pl, desc: c.pd, color: c.pc },
            matched: c.m,
            missing: (c.ms as [string, string, number, string][]).map(
                ([label, key, freq, priority]) => ({ label, key, freq, priority: priority as MissingSkillWithPriority["priority"] })
            ),
            rawMatched: c.rm, rawTotal: c.rt, yearsRequired: c.yr, yearsOnCV: c.yc,
            topJobSignals: (c.ts as [string, number][]).map(([word, freq]) => ({ word, freq })),
            lowQuality: c.lq, jobWordCount: c.jw, summary: c.sm,
        }
    } catch { return null }
}

// Only a fixed set of persona colours is ever produced by analyze(); anything else from a
// shared link falls back to neutral so the link cannot inject arbitrary class names
const PERSONA_COLORS = new Set(["text-emerald-400", "text-violet-400", "text-amber-400", "text-rose-400"])

// ─── External stores (localStorage history, URL hash) ────────────────────────
// Read through useSyncExternalStore instead of setState-in-effect: the server
// snapshot is empty, the client snapshot is read after hydration, and there is
// no extra render pass.

type HistoryEntry = { score: number; label: string; matched: number; missing: number; date: string }

const HISTORY_KEY = "cvxray_history"
const historyListeners = new Set<() => void>()

function subscribeHistory(onChange: () => void) {
    historyListeners.add(onChange)
    window.addEventListener("storage", onChange)
    return () => {
        historyListeners.delete(onChange)
        window.removeEventListener("storage", onChange)
    }
}

function readHistoryRaw(): string {
    try { return localStorage.getItem(HISTORY_KEY) ?? "" } catch { return "" }
}

function parseHistory(raw: string): HistoryEntry[] {
    if (!raw) return []
    try {
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.filter((h): h is HistoryEntry =>
            !!h && typeof h.score === "number" && typeof h.label === "string" && typeof h.date === "string"
        ).slice(0, 3)
    } catch { return [] }
}

function saveHistory(entries: HistoryEntry[]) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(entries)) } catch { /* storage blocked or full */ }
    historyListeners.forEach(l => l())
}

function subscribeHash(onChange: () => void) {
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
}

const readHash = () => window.location.hash
const readServerSnapshot = () => ""

type InterviewResult = { title: string; snippet: string; url: string; source: string }

// Search-result titles are decoded with the shared single-pass decoder (src/lib/html-text.ts)
const decodeHtmlEntities = decodeEntities

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
    ruby: { label: "The Odin Project — Ruby Path", url: "https://www.theodinproject.com/paths/full-stack-ruby-on-rails", platform: "The Odin Project", type: "course", duration: "~40 hrs", free: true },
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
    bi: { label: "Power BI — Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/", platform: "Microsoft Learn", type: "docs", duration: "Self-paced", free: true },
    excel: { label: "Excel help & learning", url: "https://support.microsoft.com/en-us/excel", platform: "Microsoft", type: "guide", duration: "Self-paced", free: true },
    crm: { label: "Salesforce Trailhead", url: "https://trailhead.salesforce.com/", platform: "Salesforce", type: "course", duration: "Self-paced", free: true },
    seo: { label: "SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", platform: "Google Search Central", type: "guide", duration: "~2 hrs", free: true },
    marketing: { label: "HubSpot Academy", url: "https://academy.hubspot.com/", platform: "HubSpot", type: "course", duration: "Self-paced", free: true },
    // Math Prof improvement (Push 34): the healthcare and logistics groups added in Push 33
    // surfaced high-priority gaps with no course to close them, so the training list was empty
    // for those roles. Both links verified live before adding.
    healthcare: { label: "CDC Project Firstline — infection control training", url: "https://www.cdc.gov/project-firstline/hcp/training/index.html", platform: "CDC", type: "course", duration: "Self-paced", free: true },
    logistics: { label: "Supply Chain Management Specialization", url: "https://www.coursera.org/specializations/supply-chain-management", platform: "Coursera / Rutgers", type: "course", duration: "~2 months", free: false },
    hr: { label: "LinkedIn Talent Blog — recruiting guides", url: "https://www.linkedin.com/business/talent/blog", platform: "LinkedIn", type: "guide", duration: "Self-paced", free: true },
    sales: { label: "HubSpot Academy — sales courses", url: "https://academy.hubspot.com/", platform: "HubSpot", type: "course", duration: "Self-paced", free: true },
    vectordb: { label: "Pinecone Learning Center — vector search & RAG", url: "https://www.pinecone.io/learn/", platform: "Pinecone", type: "guide", duration: "Self-paced", free: true },
    mlops: { label: "Made With ML — MLOps course", url: "https://madewithml.com/", platform: "Made With ML", type: "course", duration: "Self-paced", free: true },
    ai: { label: "Prompt Engineering — Anthropic", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", platform: "Anthropic", type: "guide", duration: "~3 hrs", free: true },
}

// Own keys only: a key like "__proto__" or "constructor" must never resolve to a built-in
const resourceFor = (key: string): SkillResource | undefined =>
    Object.hasOwn(SKILL_RESOURCES, key) ? SKILL_RESOURCES[key] : undefined

// ─────────────────────────────────────────────
// SAMPLE JOBS
// ─────────────────────────────────────────────

// Mixed on purpose: tech roles alternate with sales, marketing and finance so the
// samples show that CVXray is not only for IT jobs. Every role here has skill groups
// in analyze.ts, so its sample produces a meaningful score.
const SAMPLE_JOBS = [
    {
        label: "AI Engineer",
        emoji: "🤖",
        desc: "Python, LLMs, RAG, embeddings, vector databases, LangChain, evals, FastAPI, AWS",
        text: `AI Engineer — Amsterdam (Hybrid)

We are hiring an AI Engineer to build LLM-powered features used by thousands of customers. You will take generative AI from prototype to production: retrieval, evaluation, deployment and monitoring.

Requirements:
- 3+ years of experience as a software or machine learning engineer, with strong Python
- Hands-on experience building LLM applications with the OpenAI or Anthropic APIs
- Retrieval-augmented generation (RAG): embeddings, chunking and a vector database such as pgvector, Pinecone or Weaviate
- Frameworks such as LangChain or LlamaIndex; AI agents and function calling
- Evals: designing LLM evaluation sets and measuring quality, latency and cost
- Model deployment behind APIs (FastAPI), Docker and AWS
- Prompt engineering and fine-tuning with Hugging Face
- CI/CD, Git and working in Agile teams

Nice to have:
- MLOps experience (MLflow, SageMaker or Vertex AI)
- TypeScript for internal tools
- SQL and PostgreSQL

We offer a competitive salary, a learning budget and a hybrid work culture.`,
    },
    {
        label: "Account Executive",
        emoji: "🤝",
        desc: "B2B SaaS sales, prospecting, quota, Salesforce, HubSpot, negotiation",
        text: `Account Executive — B2B SaaS Sales, Rotterdam (Hybrid)

We are hiring an Account Executive to own the full sales cycle for mid-market customers across the Benelux. You will run prospecting and lead generation, manage your pipeline in Salesforce and close deals against a quarterly quota.

Requirements:
- 3+ years of experience in B2B sales or SaaS sales, ideally as an account executive
- Proven track record of quota attainment and closing deals
- Hands-on experience with Salesforce or HubSpot CRM
- Strong negotiation, discovery and account management skills
- Comfortable with cold calling and outbound prospecting
- Business development mindset and excellent communication in English and Dutch

Nice to have:
- Experience with marketing automation and Excel forecasting
- Familiarity with LinkedIn Sales Navigator

We offer an uncapped commission plan, a hybrid work culture and a training budget.`,
    },
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
        label: "Digital Marketer",
        emoji: "📣",
        desc: "SEO, Google Ads, content and email marketing, GA4, HubSpot, campaign management",
        text: `Digital Marketing Specialist — Utrecht (Hybrid)

We are looking for a Digital Marketing Specialist to grow our online customer acquisition. You will own SEO and paid search, run campaigns across channels and report on what works.

Requirements:
- 2+ years of experience in digital marketing
- Strong SEO skills: keyword research, on-page optimisation and content briefs
- Hands-on Google Ads (PPC / SEM) campaign management with a monthly budget
- Content marketing and email marketing experience
- Social media marketing on LinkedIn and Meta
- Comfortable with Google Analytics and Google Tag Manager for reporting
- Experience with HubSpot or another marketing automation tool
- Data-driven: A/B testing and conversion rate optimisation

Nice to have:
- Growth marketing experience at a scale-up
- Basic Excel or Looker Studio skills

We offer a marketing budget you can experiment with, flexible hours and a hybrid office.`,
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
        label: "Financial Analyst",
        emoji: "💶",
        desc: "Financial modelling, FP&A, budgeting, forecasting, Excel, Power BI, IFRS",
        text: `Financial Analyst (FP&A) — Amsterdam

Our finance team is looking for a Financial Analyst to support budgeting, forecasting and business decisions across the company.

Requirements:
- 3+ years of experience in FP&A, financial analysis or corporate finance
- Strong financial modelling skills in Excel (pivot tables, advanced formulas)
- Experience leading the annual budgeting cycle and monthly forecasting
- Variance analysis and management reporting for senior stakeholders
- Knowledge of IFRS; month-end close and reconciliation experience is a plus
- Comfortable building dashboards in Power BI
- Strong stakeholder management and communication skills

Nice to have:
- SQL for pulling data from the warehouse
- Experience in a fast-growing company or at a Big Four firm

We offer a competitive salary, a study budget for CFA or RA certification and a hybrid work week.`,
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
]

// ─────────────────────────────────────────────
// LANGUAGE HELPERS
// ─────────────────────────────────────────────

/** Renders a dictionary string with one highlighted value in place of {x}. */
function Rich({ text, children }: { text: string; children: React.ReactNode }) {
    const [before, after = ""] = text.split("{x}")
    return <>{before}{children}{after}</>
}

// Own keys only — labels can come from a shared link
const lookup = (map: Record<string, string>, key: string): string =>
    Object.hasOwn(map, key) ? map[key] : key

/**
 * The headline and one-line verdict in the page language. analyze() writes them in
 * English; the translated pages rebuild the same sentences from the numbers instead.
 */
function localizePersona(r: AnalysisResult, t: AnalyzerStrings): { label: string; desc: string } {
    const p = t.persona
    const tier = r.score >= 80 ? "top" : r.score >= 70 ? "strong" : r.score >= 45 ? "emerging" : "upskilling"
    const label = (name: string) => lookup(t.skillLabels, name)
    const matched = r.matched.slice(0, 2).map(label).join(p.joiner)
    const missing = r.missing.filter(m => m.priority === "high").slice(0, 2).map(m => label(m.label)).join(p.joiner)
    const exp = r.yearsRequired > 0
        ? fmt(r.yearsOnCV === 0 ? p.expNotStated : r.yearsOnCV >= r.yearsRequired ? p.expMeets : p.expBelow, { r: r.yearsRequired, c: r.yearsOnCV })
        : ""
    const desc = p.intro[tier]
        + (matched ? fmt(p.matched[tier], { x: matched }) : "")
        + (missing ? fmt(p.missing[tier], { x: missing }) : "")
        + (tier === "upskilling" ? (exp || p.fallback) : exp)
    return { label: p.labels[tier], desc: desc.trim() }
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

// `t` holds every visible string in the page language (src/lib/i18n). The status
// fields below keep short English tokens internally and are translated when shown.
export default function CVAnalyzer({ locale, t, coffee }: { locale: Locale; t: AnalyzerStrings; coffee: Dictionary["coffee"] }) {
    const [cvText, setCvText] = useState("")
    const [jobText, setJobText] = useState("")
    // "Where and how to add it" — only for a live analysis, never for a shared link (no CV text)
    const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([])
    const [cardState, setCardState] = useState<"idle" | "working" | "done">("idle")
    const [jobInput, setJobInput] = useState("")
    const [jobUrl, setJobUrl] = useState("")
    const [fetchStatus, setFetchStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [analysisResults, setResults] = useState<AnalysisResult | null>(null)
    const [pdfStatus, setPdfStatus] = useState("")
    const [error, setError] = useState("")
    const [showCvPaste, setShowCvPaste] = useState(false)
    const [cvAudit, setCvAudit] = useState<CVAuditResult | null>(null)

    const [jobInputMode, setJobInputMode] = useState<"url" | "paste">("url")
    // Name of the built-in sample job in use ("" when the visitor supplied their own)
    const [sampleRole, setSampleRole] = useState("")
    const [showSamples, setShowSamples] = useState(false)
    const [interview, setInterview] = useState<{ company: string; results: InterviewResult[] } | null>(null)
    const [scrapedCompanyName, setScrapedCompanyName] = useState("")
    const [keywordsCopied, setKeywordsCopied] = useState(false)
    const [shareCopied, setShareCopied] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isPdfLoadingRef = useRef(false)

    // Scan history lives in localStorage
    const historyRaw = useSyncExternalStore(subscribeHistory, readHistoryRaw, readServerSnapshot)
    const history = useMemo(() => parseHistory(historyRaw), [historyRaw])

    // Shared results from the URL hash (#s=...). A fresh analysis takes precedence.
    const hash = useSyncExternalStore(subscribeHash, readHash, readServerSnapshot)
    const sharedResults = useMemo(() => {
        if (!hasShareHash(hash)) return null
        const decoded = decodeResults(hash)
        if (decoded && !PERSONA_COLORS.has(decoded.persona.color)) decoded.persona.color = "text-[#cccccc]"
        return decoded
    }, [hash])
    const results = analysisResults ?? sharedResults
    const persona = useMemo(
        () => !results ? null : locale === "en" ? { label: results.persona.label, desc: results.persona.desc } : localizePersona(results, t),
        [results, locale, t],
    )
    const skillLabel = (label: string) => lookup(t.skillLabels, label)
    // The CV quality check looks for English verbs and phrases, so it only runs on a CV
    // written in English; on any other CV it reported "Weak" whatever the content.
    const audit = (text: string) => looksEnglish(text) ? auditCV(text) : null

    // Status tokens → text in the page language
    const statusText = (status: string): string => {
        if (status === "✓ CV text loaded") return t.cvTextLoaded
        if (status === "✓ Job post fetched") return t.fetched
        if (status === "✓ Job description ready") return t.jobReady
        if (status.startsWith("File too large")) return t.pdfTooLarge
        if (status.startsWith("Error")) return t.pdfError
        const sample = /^✓ (.+) sample loaded$/.exec(status)
        if (sample) return fmt(t.sampleLoaded, { role: sample[1] })
        const file = /^✓ (.+) loaded$/.exec(status)
        if (file) return fmt(t.fileLoaded, { name: file[1] })
        return status.replace("✓ ", "")
    }

    // Interview resources for the detected company. Results are keyed by company, so
    // "loading" is derived (no synchronous setState) and a stale response is ignored.
    const interviewCompany = results && jobText ? (scrapedCompanyName || extractCompanyName(jobText)) : ""
    useEffect(() => {
        if (!interviewCompany) return
        let cancelled = false
        fetch(`/api/interview-questions?company=${encodeURIComponent(interviewCompany)}`)
            .then(r => r.json())
            .then(data => { if (!cancelled) setInterview({ company: interviewCompany, results: data.results ?? [] }) })
            .catch(() => { if (!cancelled) setInterview({ company: interviewCompany, results: [] }) })
        return () => { cancelled = true }
    }, [interviewCompany])
    const interviewLoading = !!interviewCompany && interview?.company !== interviewCompany
    const interviewResults = interview && interview.company === interviewCompany ? interview.results : []

    // Where the visitor came from inside the site (role guide, blog, 404). Only a short
    // slug from our own links is accepted; the parameter is removed after it is read.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const ref = params.get("ref")
        if (!ref) return
        if (/^[a-z0-9-]{1,48}$/.test(ref)) track("entry", { ref })
        params.delete("ref")
        const query = params.toString()
        window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : "") + window.location.hash)
    }, [])

    const processPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || file.type !== "application/pdf") return
        if (isPdfLoadingRef.current) return  // prevent concurrent uploads

        if (file.size > 5 * 1024 * 1024) {
            setPdfStatus("File too large (max 5MB). Paste your CV text below.")
            setShowCvPaste(true)
            track("cv_upload_failed", { reason: "too_large" })
            return
        }

        isPdfLoadingRef.current = true
        setPdfStatus("Reading PDF...")
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await fetch("/api/extract-pdf", { method: "POST", body: formData })
            const data = await res.json()
            if (!res.ok || !data.text) throw new Error(data.error || "No text extracted")
            setCvText(data.text)
            setCvAudit(audit(data.text))
            setPdfStatus(`✓ ${file.name} loaded`)
            track("cv_upload", { method: "pdf" })
        } catch {
            // An unreadable PDF is a user-input case, not a bug: it is shown in the UI and tracked,
            // so it is not logged as a console error (which would raise the dev error overlay)
            setPdfStatus("Error reading PDF. Paste your CV text below.")
            setShowCvPaste(true)
            track("cv_upload_failed", { reason: "unreadable" })
        } finally {
            isPdfLoadingRef.current = false
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
                track("job_fetch", { result: "success" })
            } else {
                setFetchStatus("Could not fetch — paste the text below")
                track("job_fetch", { result: "failed" })
            }
        } catch {
            setFetchStatus("Could not fetch — paste the text below")
            track("job_fetch", { result: "failed" })
        }
    }

    const doAnalyze = async () => {
        if (!cvText || !cvText.trim()) {
            setError(t.errNoCv)
            return
        }

        track("analyze_click", { cv_source: showCvPaste ? "paste" : "pdf", job_source: jobInputMode })
        setError("")
        setIsLoading(true)
        setResults(null)
        setSuggestions([])

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
                    track("job_fetch", { result: "success" })
                } else {
                    setFetchStatus("Could not fetch — paste the text below")
                    track("job_fetch", { result: "failed" })
                    setIsLoading(false)
                    return
                }
            } catch {
                setFetchStatus("Could not fetch — paste the text below")
                track("job_fetch", { result: "failed" })
                setIsLoading(false)
                return
            }
        } else if (!effectiveJobText) {
            effectiveJobText = jobInput
        }

        if (!effectiveJobText) {
            setError(t.errNoJob)
            setIsLoading(false)
            return
        }

        let result
        try {
            result = analyze(cvText, effectiveJobText)
            setResults(result)
            const nextSuggestions = buildSuggestions(cvText, effectiveJobText, result.missing, 5, locale === "en" ? undefined : t.where)
            setSuggestions(nextSuggestions)
            // Score and coarse counts only — never CV or job text
            track("analysis_complete", {
                score: result.score,
                score_band: result.score >= 70 ? "strong" : result.score >= 45 ? "competitive" : "gaps",
                job_source: sampleRole ? "sample" : jobUrl ? "url" : "text",
                missing_skills: result.missing.length,
                suggestions: nextSuggestions.length,
            })
            // Keep the address bar clean: the share link is only built when the user asks
            // for it. Drop a stale shared-result hash so it cannot outlive this analysis.
            if (hasShareHash(window.location.hash)) {
                window.history.replaceState(null, "", window.location.pathname + window.location.search)
                window.dispatchEvent(new HashChangeEvent("hashchange"))
            }
        } catch {
            setError(t.errFailed)
            setIsLoading(false)
            return
        }
        setIsLoading(false)

        // Save to history (last 3)
        try {
            const entry = {
                score: result.score,
                label: locale === "en" ? result.persona.label : localizePersona(result, t).label,
                matched: result.matched.length,
                missing: result.missing.length,
                date: new Date().toLocaleString(locale === "en" ? "en-GB" : locale, { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }),
            }
            saveHistory([entry, ...history].slice(0, 3))
        } catch { /* ignore */ }
    }

    // "Try Another Job" — clear only the job field, keep CV + existing results visible
    const resetForNewJob = () => {
        setJobText("")
        setJobInput("")
        setJobUrl("")
        setScrapedCompanyName("")
        setFetchStatus("")
        setSampleRole("")
        setShowSamples(false)
        setError("")
        // NOTE: results intentionally NOT cleared — stays visible until new analysis runs
    }

    // "Change CV" — explicit CV reset
    const resetCV = () => {
        setCvText("")
        setPdfStatus("")
        setResults(null)
        setSuggestions([])
        setCvAudit(null)
        setError("")
        if (hasShareHash(window.location.hash)) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search)
            window.dispatchEvent(new HashChangeEvent("hashchange"))
        }
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const validUrl = jobInput.trim().startsWith("http")
    const canAnalyze = !!cvText && (!!jobText || validUrl)
    // Only an http(s) URL is ever turned into the Apply link
    const applyUrl = safeHttpUrl(jobUrl || (validUrl ? jobInput.trim() : "")) ?? ""

    const tone = results ? toneForScore(results.score) : "neutral"
    const highGaps = results ? results.missing.filter(m => m.priority === "high") : []
    const totalSkills = results ? results.matched.length + results.missing.length : 0
    const company = jobText ? (scrapedCompanyName || extractCompanyName(jobText)) : ""
    const culture = jobText ? extractCultureSignals(jobText) : []
    const priorityTone = (p: MissingSkillWithPriority["priority"]): Tone => p === "high" ? "danger" : p === "medium" ? "warning" : "neutral"

    const loadSample = (job: typeof SAMPLE_JOBS[number]) => {
        setJobInput("")
        setJobUrl("")
        setScrapedCompanyName("")
        setJobText(job.text)
        setSampleRole(job.label)
        setFetchStatus(`✓ ${job.label} sample loaded`)
        setShowSamples(false)
        setError("")
        track("sample_job_select", { role: job.label })
    }

    // Samples are a fallback, not a step: one quiet line that expands on request
    const sampleChooser = (
        <div className="space-y-2">
            <button
                type="button"
                onClick={() => setShowSamples(v => !v)}
                aria-expanded={showSamples}
                className="-my-2 inline-flex min-h-11 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
                {t.noJob}
                <span className="font-medium text-primary">{t.trySample}</span>
                <ChevronDown className={cn("size-3.5 text-primary transition-transform", showSamples && "rotate-180")} />
            </button>
            {showSamples && (
                <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_JOBS.map(job => (
                        <button
                            key={job.label}
                            type="button"
                            title={job.desc}
                            onClick={() => loadSample(job)}
                            className="inline-flex min-h-9 items-center rounded-md border border-border bg-foreground/[0.02] px-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.05] hover:text-foreground"
                        >
                            {job.label}
                        </button>
                    ))}
                    {t.samplesNote && <p className="w-full text-xs text-muted-foreground">{t.samplesNote}</p>}
                </div>
            )}
        </div>
    )

    const inputClass = "w-full rounded-lg border border-input bg-inset px-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary/50 focus:outline-none focus:ring-3 focus:ring-primary/15"

    return (
        <section id="analyzer" className="relative mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">

                {/* ── Input panel ─────────────────────────────────────────── */}
                <Panel className="p-5 sm:p-6 lg:sticky lg:top-20">
                    <div className="mb-6">
                        <h2 className="text-base font-semibold tracking-tight text-foreground">{t.title}</h2>
                        <p className="mt-1 text-[13px] text-muted-foreground">{t.subtitle}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 — CV */}
                        <div className="space-y-3">
                            <StepLabel n={1}>{t.step1}</StepLabel>

                            {!cvText || showCvPaste ? (
                                showCvPaste ? (
                                    <textarea
                                        placeholder={t.cvPlaceholder}
                                        aria-label={t.cvAria}
                                        className={cn(inputClass, "h-44 resize-none py-2.5 leading-relaxed [field-sizing:fixed]")}
                                        value={cvText}
                                        onChange={(e) => { setCvText(e.target.value); setPdfStatus("✓ CV text loaded"); if (e.target.value.length > 100) setCvAudit(audit(e.target.value)) }}
                                        autoFocus
                                    />
                                ) : (
                                    <div className="group relative flex h-36 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-foreground/15 bg-inset text-center transition-colors hover:border-primary/40 hover:bg-primary/[0.04] focus-within:border-primary/50">
                                        <span className="flex size-10 items-center justify-center rounded-full border border-border bg-foreground/[0.04] text-muted-foreground transition-colors group-hover:text-primary">
                                            <CloudUpload className="size-4.5" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t.dropA} <span className="text-primary">{t.dropB}</span></p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">{t.dropHint}</p>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf"
                                            aria-label={t.uploadAria}
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                            onChange={processPdf}
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="flex items-center justify-between gap-3 rounded-xl border border-success/25 bg-success/[0.07] px-3.5 py-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
                                            <FileText className="size-4" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">{statusText(pdfStatus) || t.cvLoaded}</p>
                                            <p className="text-xs text-muted-foreground">{fmt(t.wordsExtracted, { n: countWords(cvText).toLocaleString() })}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetCV}
                                        className="-my-3 -mr-3 inline-flex min-h-11 shrink-0 items-center px-3 py-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {t.replace}
                                    </button>
                                </div>
                            )}
                            {pdfStatus && !cvText && (!showCvPaste || pdfStatus.startsWith("Error") || pdfStatus.startsWith("File too large")) && (
                                <p className={cn("text-xs", pdfStatus.startsWith("Error") || pdfStatus.startsWith("File too large") ? "text-danger" : "text-muted-foreground")} aria-live="polite">
                                    {pdfStatus === "Reading PDF..." ? <span className="inline-flex items-center gap-1.5"><LoaderCircle className="size-3 animate-spin" />{t.readingPdf}</span> : statusText(pdfStatus)}
                                </p>
                            )}
                            {/* Secondary path: most people upload a PDF, so pasting stays a quiet link */}
                            {(!cvText || showCvPaste) && (
                                <button
                                    type="button"
                                    onClick={() => setShowCvPaste(v => !v)}
                                    className="-my-2 inline-flex min-h-11 items-center text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                                >
                                    {showCvPaste ? t.usePdf : t.usePaste}
                                </button>
                            )}
                        </div>

                        {/* Step 2 — Job description */}
                        <div className="space-y-3">
                            <StepLabel n={2}>{t.step2}</StepLabel>
                            {sampleRole ? (
                                <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/[0.06] px-3.5 py-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                            <Briefcase className="size-4" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">{fmt(t.sampleJob, { role: sampleRole })}</p>
                                            <p className="text-xs text-muted-foreground">{t.sampleNote}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={resetForNewJob}
                                        className="-my-3 -mr-3 inline-flex min-h-11 shrink-0 items-center px-3 py-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {t.remove}
                                    </button>
                                </div>
                            ) : (
                            <>
                            <SegmentedControl
                                label={t.jobInputAria}
                                value={jobInputMode}
                                onChange={(mode) => {
                                    setJobInputMode(mode)
                                    setFetchStatus("")
                                    setScrapedCompanyName("")
                                    if (mode === "url") setJobText("")
                                    else { setJobInput(""); setJobUrl("") }
                                }}
                                options={[
                                    { value: "url", label: t.jobLink, icon: <Link2 /> },
                                    { value: "paste", label: t.pasteText, icon: <ClipboardPaste /> },
                                ]}
                            />

                            {jobInputMode === "url" ? (
                                <div className="space-y-3">
                                    <div className="relative">
                                        <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="url"
                                            aria-label={t.urlAria}
                                            aria-invalid={!!jobInput && !jobInput.trim().startsWith("http")}
                                            className={cn(
                                                inputClass,
                                                "h-11 pl-9 pr-9",
                                                jobInput && !jobInput.trim().startsWith("http") && "border-danger/50 focus:border-danger/60 focus:ring-danger/15",
                                            )}
                                            placeholder="https://www.linkedin.com/jobs/view/…"
                                            value={jobInput}
                                            onChange={(e) => { setJobInput(e.target.value); setJobText(""); setFetchStatus(""); setScrapedCompanyName(""); if (e.target.value.startsWith("http")) setJobUrl(e.target.value); }}
                                            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.value.trim().startsWith("http") && fetchJobPost()}
                                            onBlur={() => jobInput && !jobInput.trim().startsWith("http") && setError(t.urlBlurError)}
                                            onFocus={() => setError("")}
                                        />
                                        {fetchStatus.startsWith("✓") && (
                                            <Check className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-success" />
                                        )}
                                    </div>
                                    {jobInput && !jobInput.trim().startsWith("http") ? (
                                        <p role="alert" className="text-xs text-danger">{t.urlInvalid}</p>
                                    ) : !fetchStatus && (
                                        <p className="text-xs text-muted-foreground">{t.urlHint}</p>
                                    )}
                                    {fetchStatus && (
                                        <p className={cn("text-xs", fetchStatus.startsWith("✓") ? "text-success" : fetchStatus.includes("paste") ? "text-warning" : "text-muted-foreground")} aria-live="polite">
                                            {fetchStatus.includes("paste")
                                                ? t.cantRead
                                                : fetchStatus.startsWith("Fetching")
                                                ? <span className="inline-flex items-center gap-1.5"><LoaderCircle className="size-3 animate-spin" />{t.fetching}</span>
                                                : statusText(fetchStatus)}
                                        </p>
                                    )}
                                    {!jobText && !jobInput && sampleChooser}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <textarea
                                        placeholder={t.jobPlaceholder}
                                        aria-label={t.jobAria}
                                        className={cn(inputClass, "h-44 resize-none py-2.5 leading-relaxed [field-sizing:fixed]")}
                                        value={jobText}
                                        onChange={(e) => { setJobText(e.target.value); setFetchStatus(e.target.value.length > 50 ? "✓ Job description ready" : ""); }}
                                        autoFocus
                                    />
                                    {jobText.length > 50 && (
                                        <p className="inline-flex items-center gap-1.5 text-xs text-success"><Check className="size-3.5" />{statusText(fetchStatus) || t.jobReady}</p>
                                    )}
                                    {!jobText && sampleChooser}
                                </div>
                            )}
                            </>
                            )}
                        </div>

                        {error && (
                            <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger/[0.08] px-3 py-2.5 text-[13px] text-danger">
                                <CircleAlert className="mt-0.5 size-3.5 shrink-0" />{error}
                            </p>
                        )}

                        {/* Primary action */}
                        <div className="space-y-3">
                            {results && !jobText && !jobInput ? (
                                <button
                                    type="button"
                                    onClick={resetForNewJob}
                                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-foreground/[0.03] text-sm font-semibold text-foreground transition-colors hover:bg-foreground/[0.06]"
                                >
                                    <RotateCcw className="size-4" />
                                    {t.tryAnother}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={doAnalyze}
                                    disabled={isLoading || !canAnalyze}
                                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklch,var(--primary)_55%,transparent)] transition-all hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:bg-foreground/[0.06] disabled:text-muted-foreground disabled:shadow-none"
                                >
                                    {isLoading ? (
                                        <><LoaderCircle className="size-4 animate-spin" />{t.analyzing}</>
                                    ) : (
                                        <>{results ? t.reanalyze : t.analyze}<ArrowRight className="size-4 transition-transform group-enabled:group-hover:translate-x-0.5" /></>
                                    )}
                                </button>
                            )}
                            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                                <Lock className="size-3" />{t.privateNote}
                            </p>
                        </div>

                        {/* Recent scans */}
                        {history.length > 0 && (
                            <div className="space-y-2 border-t border-border pt-5">
                                <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    <History className="size-3" />{t.recent}
                                </p>
                                <ul className="space-y-1">
                                    {history.map((h, i) => (
                                        <li key={i} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] hover:bg-foreground/[0.03]">
                                            <span className={cn("w-9 font-semibold tabular-nums", toneText(toneForScore(h.score)))}>{h.score}%</span>
                                            <span className="flex-1 truncate text-foreground/80">{h.label}</span>
                                            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{h.date}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Panel>

                {/* ── Results panel ───────────────────────────────────────── */}
                <Panel className="min-h-[560px] overflow-hidden" aria-live="polite" aria-busy={isLoading}>
                    {!results && !isLoading && (
                        <div className="flex h-full min-h-[560px] flex-col items-center justify-center px-6 py-16 text-center">
                            <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-foreground/[0.03] text-primary">
                                <ScanSearch className="size-5" />
                            </span>
                            <h2 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{t.emptyTitle}</h2>
                            <p className="mt-1.5 max-w-sm text-sm text-muted-foreground text-pretty">{t.emptyText}</p>
                            <ul className="mt-8 grid w-full max-w-md gap-2 text-left">
                                {[<Gauge key="score" />, <Target key="gaps" />, <GraduationCap key="next" />].map((icon, i) => ({ icon, ...t.emptyItems[i] })).map(item => (
                                    <li key={item.title} className="flex items-start gap-3 rounded-xl border border-border bg-foreground/[0.02] px-4 py-3">
                                        <span className="mt-0.5 text-muted-foreground [&_svg]:size-4">{item.icon}</span>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">{item.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {isLoading && !results && (
                        <div className="space-y-6 p-6 sm:p-8" aria-label={t.analyzingAria}>
                            <div className="flex items-center gap-6">
                                <div className="size-[124px] animate-pulse rounded-full bg-foreground/[0.05]" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 w-40 animate-pulse rounded bg-foreground/[0.06]" />
                                    <div className="h-3 w-full animate-pulse rounded bg-foreground/[0.04]" />
                                    <div className="h-3 w-4/5 animate-pulse rounded bg-foreground/[0.04]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map(i => <div key={i} className="h-20 animate-pulse rounded-xl bg-foreground/[0.04]" />)}
                            </div>
                            <div className="h-40 animate-pulse rounded-xl bg-foreground/[0.03]" />
                        </div>
                    )}

                    {results && (
                        <div className={cn("transition-opacity duration-300", isLoading && "pointer-events-none opacity-40")}>
                            <h2 className="sr-only">{t.resultsHeading}</h2>

                            {/* Summary */}
                            <div className="border-b border-border p-6 sm:p-8">
                                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                                    <ScoreRing score={results.score} label={fmt(t.scoreAria, { n: results.score })} caption={t.scoreCaption} />
                                    <div className="min-w-0 flex-1 text-center sm:text-left">
                                        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                            <p className={cn("text-xl font-semibold tracking-tight", toneText(tone))}>{persona?.label}</p>
                                            {results.lowQuality && <Badge tone="warning">{t.lowConfidence}</Badge>}
                                        </div>
                                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{persona?.desc}</p>
                                        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 sm:justify-start">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const encoded = encodeResults(results)
                                                if (!encoded) return
                                                const url = `${window.location.origin}${window.location.pathname}${SHARE_PREFIX}${encoded}`
                                                navigator.clipboard.writeText(url).catch(() => {})
                                                setShareCopied(true)
                                                track("share_result", { score: results.score })
                                                setTimeout(() => setShareCopied(false), 2000)
                                            }}
                                            className="-ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {shareCopied ? <><Check className="size-3.5 text-success" />{t.linkCopied}</> : <><Share2 className="size-3.5" />{t.share}</>}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={cardState === "working"}
                                            onClick={async () => {
                                                setCardState("working")
                                                try {
                                                    const blob = await renderScoreCard({
                                                        score: results.score,
                                                        label: persona?.label ?? results.persona.label,
                                                        role: sampleRole ? fmt(t.cardRoleSample, { role: sampleRole }) : (scrapedCompanyName ? fmt(t.cardRoleCompany, { company: scrapedCompanyName }) : t.cardRoleDefault),
                                                        matched: results.matched.map(skillLabel),
                                                    }, getComputedStyle(document.body).fontFamily || "sans-serif")
                                                    const outcome = await shareOrDownloadCard(blob)
                                                    track("score_card", { method: outcome, score: results.score })
                                                    setCardState(outcome === "cancelled" ? "idle" : "done")
                                                    setTimeout(() => setCardState("idle"), 2500)
                                                } catch {
                                                    setCardState("idle")
                                                }
                                            }}
                                            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
                                        >
                                            {cardState === "done"
                                                ? <><Check className="size-3.5 text-success" />{t.cardReady}</>
                                                : cardState === "working"
                                                    ? <><LoaderCircle className="size-3.5 animate-spin" />{t.cardCreating}</>
                                                    : <><ImageDown className="size-3.5" />{t.card}</>}
                                        </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                                    <StatTile
                                        label={t.statSkills}
                                        value={<>{results.matched.length}<span className="text-muted-foreground">/{totalSkills}</span></>}
                                        hint={t.statSkillsHint}
                                    />
                                    <StatTile
                                        label={t.statKeywords}
                                        value={<>{results.rawMatched}<span className="text-muted-foreground">/{results.rawTotal}</span></>}
                                        hint={t.statKeywordsHint}
                                    />
                                    <StatTile
                                        label={t.statExperience}
                                        value={results.yearsRequired > 0
                                            ? <>{results.yearsOnCV || "—"}<span className="text-muted-foreground">/{results.yearsRequired}{t.years}</span></>
                                            : results.yearsOnCV > 0 ? `${results.yearsOnCV}${t.years}` : "—"}
                                        hint={results.yearsRequired > 0 ? (results.yearsOnCV >= results.yearsRequired ? t.expMeets : results.yearsOnCV === 0 ? t.expNotStated : t.expBelow) : t.expNone}
                                        tone={results.yearsRequired > 0 ? (results.yearsOnCV >= results.yearsRequired ? "success" : "warning") : "neutral"}
                                    />
                                </div>
                            </div>

                            <div className="space-y-8 p-6 sm:p-8">
                                {/* Recommendation */}
                                <div className={cn(
                                    "rounded-xl border p-4",
                                    tone === "success" ? "border-success/25 bg-success/[0.06]" : tone === "warning" ? "border-warning/25 bg-warning/[0.06]" : "border-danger/25 bg-danger/[0.06]",
                                )}>
                                    <p className={cn("flex items-center gap-2 text-sm font-semibold", toneText(tone))}>
                                        {tone === "success" ? <CircleCheck className="size-4" /> : tone === "warning" ? <Zap className="size-4" /> : <Target className="size-4" />}
                                        {tone === "success"
                                            ? t.recStrong
                                            : tone === "warning"
                                            ? (highGaps.length > 0 ? fmt(Math.min(highGaps.length, 2) !== 1 ? t.recCompetitiveGaps : t.recCompetitiveGap, { n: Math.min(highGaps.length, 2) }) : t.recCompetitive)
                                            : t.recGaps}
                                    </p>
                                    <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-foreground/80">
                                        {tone === "success" && (
                                            <>
                                                {results.matched.length > 0 && <li className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span><Rich text={t.tipMention}><span className="font-medium text-foreground">{results.matched.slice(0, 3).map(skillLabel).join(", ")}</span></Rich></span></li>}
                                                {highGaps.length > 0 && <li className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span><Rich text={t.tipAddress}><span className="font-medium text-foreground">{skillLabel(highGaps[0].label)}</span></Rich></span></li>}
                                                <li className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span>{t.tipApply}</span></li>
                                            </>
                                        )}
                                        {tone === "warning" && (
                                            <>
                                                {highGaps.slice(0, 2).map(g => (
                                                    <li key={g.key} className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span><Rich text={t.tipAdd}><span className="font-medium text-foreground">{skillLabel(g.label)}</span></Rich></span></li>
                                                ))}
                                                {results.matched.length > 0 && <li className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span><Rich text={t.tipLead}><span className="font-medium text-foreground">{results.matched.slice(0, 2).map(skillLabel).join(t.and)}</span></Rich></span></li>}
                                            </>
                                        )}
                                        {tone === "danger" && (
                                            <>
                                                {highGaps.slice(0, 3).map(g => (
                                                    <li key={g.key} className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span><Rich text={t.tipLearn}><span className="font-medium text-foreground">{skillLabel(g.label)}</span></Rich></span></li>
                                                ))}
                                                <li className="flex gap-2"><ArrowRight className="mt-1 size-3 shrink-0 text-muted-foreground" /><span>{t.tipCompare}</span></li>
                                            </>
                                        )}
                                    </ul>
                                    {applyUrl && (
                                        <div className="mt-4 flex flex-col gap-2 border-t border-foreground/[0.08] pt-4 sm:flex-row sm:items-center">
                                            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{applyUrl}</p>
                                            <a
                                                href={applyUrl}
                                                onClick={() => track("job_post_open", { score: results.score })}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-foreground px-3.5 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
                                            >
                                                {t.openJob}<ArrowUpRight className="size-3.5" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {results.lowQuality && (
                                    <p className="flex items-start gap-2 rounded-xl border border-warning/25 bg-warning/[0.06] px-4 py-3 text-[13px] text-warning">
                                        <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
                                        <span><Rich text={t.lowQuality}><strong className="font-semibold">{fmt(t.lowQualityWords, { n: results.jobWordCount })}</strong></Rich></span>
                                    </p>
                                )}

                                {/* Skills */}
                                <Section icon={<ListChecks />} title={t.skillsTitle} description={fmt(t.skillsDesc, { a: results.matched.length, b: totalSkills })}>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className="space-y-2.5">
                                            <p className="text-xs font-medium text-muted-foreground">{t.onCv}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {results.matched.length > 0
                                                    ? results.matched.map(s => <Chip key={s} tone="success"><Check className="size-3" />{skillLabel(s)}</Chip>)
                                                    : <p className="text-xs text-muted-foreground">{t.noMatch}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <p className="text-xs font-medium text-muted-foreground">{t.missing}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {results.missing.length > 0
                                                    ? results.missing.map(s => <Chip key={s.key} tone={priorityTone(s.priority)} dot>{skillLabel(s.label)}</Chip>)
                                                    : <p className="text-xs text-muted-foreground">{t.noGaps}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    {results.missing.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                            <span className="inline-flex items-center gap-1.5"><span className={cn("size-1.5 rounded-full", toneDot("danger"))} />{t.legendHigh}</span>
                                            <span className="inline-flex items-center gap-1.5"><span className={cn("size-1.5 rounded-full", toneDot("warning"))} />{t.legendMentioned}</span>
                                            <span className="inline-flex items-center gap-1.5"><span className={cn("size-1.5 rounded-full", toneDot("neutral"))} />{t.legendNice}</span>
                                        </div>
                                    )}
                                </Section>

                                {/* Where and how to add the missing skills */}
                                {suggestions.length > 0 && (
                                    <>
                                        <Divider />
                                        <Section
                                            icon={<PencilLine />}
                                            title={t.sugTitle}
                                            description={t.sugDesc}
                                        >
                                            <ol className="space-y-3">
                                                {suggestions.map((sug) => (
                                                    <li key={sug.key} className="rounded-xl border border-border bg-foreground/[0.015] p-4">
                                                        <div className="flex items-center gap-2">
                                                            <Chip tone={priorityTone(sug.priority)} dot>{skillLabel(sug.skill)}</Chip>
                                                            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                                {sug.priority === "high" ? t.legendHigh : t.sugMentioned}
                                                            </span>
                                                        </div>
                                                        {sug.jobQuote && (
                                                            <p className="mt-3 border-l-2 border-border pl-3 text-[13px] italic leading-relaxed text-muted-foreground">
                                                                &ldquo;{sug.jobQuote}&rdquo;
                                                            </p>
                                                        )}
                                                        <p className="mt-3 text-sm leading-relaxed text-foreground/90">{sug.where}</p>
                                                        {/* Example on demand — keeps each card short. The example bullets are
                                                            written in English only, so translated pages leave them out. */}
                                                        {t.showExample && <details className="group/ex mt-2">
                                                            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 text-[13px] font-medium text-primary [&::-webkit-details-marker]:hidden sm:min-h-0">
                                                                {t.showExample}
                                                                <ChevronDown className="size-3.5 transition-transform group-open/ex:rotate-180" />
                                                            </summary>
                                                            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{sug.example}</p>
                                                        </details>}
                                                    </li>
                                                ))}
                                            </ol>
                                        </Section>
                                    </>
                                )}

                                {/* Keywords */}
                                {results.topJobSignals.length > 0 && (
                                    <>
                                        <Divider />
                                        <Section
                                            icon={<FileSearch />}
                                            title={t.kwTitle}
                                            description={t.kwDesc}
                                            action={
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(results.topJobSignals.map(s => s.word).join(", ")).catch(() => {})
                                                        setKeywordsCopied(true)
                                                        track("keywords_copy", { count: results.topJobSignals.length })
                                                        setTimeout(() => setKeywordsCopied(false), 2000)
                                                    }}
                                                    className="-m-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 p-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    {keywordsCopied ? <><Check className="size-3.5 text-success" />{t.copied}</> : <><Copy className="size-3.5" />{t.copyAll}</>}
                                                </button>
                                            }
                                        >
                                            <div className="flex flex-wrap gap-1.5">
                                                {results.topJobSignals.map(({ word, freq }) => (
                                                    <Chip key={word} tone={freq >= 3 ? "danger" : freq === 2 ? "warning" : "neutral"}>
                                                        {word}
                                                        <span className="tabular-nums opacity-60">×{freq}</span>
                                                    </Chip>
                                                ))}
                                            </div>
                                        </Section>
                                    </>
                                )}

                                {/* Training */}
                                {results.missing.some(m => resourceFor(m.key)) && (
                                    <>
                                        <Divider />
                                        <Section icon={<GraduationCap />} title={t.trainTitle} description={t.trainDesc}>
                                            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                                                {(() => {
                                                    const highPriorityGaps = results.missing.filter(m => m.priority === "high" && resourceFor(m.key)).length
                                                    // Show more courses when there are more high-priority gaps (6–10)
                                                    const courseLimit = Math.min(Math.max(6, highPriorityGaps + 2), 10)
                                                    return results.missing
                                                        .filter(m => resourceFor(m.key))
                                                        .slice(0, courseLimit)
                                                        .map(m => {
                                                            const resource = resourceFor(m.key)!
                                                            return (
                                                                <li key={m.key}>
                                                                    <a
                                                                        href={resource.url}
                                                                        onClick={() => track("course_click", { skill: m.key, priority: m.priority })}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="group flex items-center gap-3 bg-foreground/[0.01] px-4 py-3 transition-colors hover:bg-foreground/[0.04]"
                                                                    >
                                                                        <span className={cn("size-1.5 shrink-0 rounded-full", toneDot(priorityTone(m.priority)))} />
                                                                        <div className="min-w-0 flex-1">
                                                                            <p className="truncate text-sm font-medium text-foreground">{resource.label}</p>
                                                                            <p className="truncate text-xs text-muted-foreground">{skillLabel(m.label)} · {resource.platform} · {resource.duration}</p>
                                                                        </div>
                                                                        {resource.free && <Badge tone="accent">{t.free}</Badge>}
                                                                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                })()}
                                            </ul>
                                        </Section>
                                    </>
                                )}

                                {/* CV quality */}
                                {cvAudit && (
                                    <>
                                        <Divider />
                                        <Section
                                            icon={<ShieldCheck />}
                                            title={t.auditTitle}
                                            description={t.auditDesc}
                                            action={
                                                <Badge tone={cvAudit.grade === "strong" ? "success" : cvAudit.grade === "average" ? "warning" : "danger"}>
                                                    {cvAudit.grade === "strong" ? t.gradeStrong : cvAudit.grade === "average" ? t.gradeAverage : t.gradeWeak}
                                                </Badge>
                                            }
                                        >
                                            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                                                {cvAudit.categories.map(cat => (
                                                    <li key={cat.key} className="bg-foreground/[0.01] px-4 py-3">
                                                        <div className="flex items-center gap-2.5">
                                                            {cat.status === "good"
                                                                ? <CircleCheck className="size-4 shrink-0 text-success" />
                                                                : cat.status === "warn"
                                                                ? <CircleAlert className="size-4 shrink-0 text-warning" />
                                                                : <CircleX className="size-4 shrink-0 text-danger" />}
                                                            <span className="text-sm font-medium text-foreground">{Object.hasOwn(t.auditLabels, cat.key) ? t.auditLabels[cat.key] : cat.label}</span>
                                                            <span className="ml-auto text-xs text-muted-foreground">
                                                                {cat.status === "good" ? t.statusGood : cat.status === "warn" ? t.statusWarn : t.statusMissing}
                                                            </span>
                                                        </div>
                                                        {cat.status !== "good" && cat.missing.length > 0 && (
                                                            <div className="mt-2.5 flex flex-wrap gap-1.5 pl-6.5">
                                                                {cat.missing.map((kw, i) => <Chip key={i}>{kw}</Chip>)}
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Section>
                                    </>
                                )}

                                {/* Company insights */}
                                {(company || culture.length > 0) && (
                                    <>
                                        <Divider />
                                        <Section icon={<Building2 />} title={company ? fmt(t.aboutCompany, { company }) : t.companySignals} description={t.companyDesc}>
                                            {culture.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {culture.map(({ label }) => <Chip key={label} tone="accent">{lookup(t.cultureLabels, label)}</Chip>)}
                                                </div>
                                            )}
                                            {company && (
                                                <div className="space-y-2">
                                                    <p className="text-xs font-medium text-muted-foreground">{t.interviewResearch}</p>
                                                    {interviewLoading && (
                                                        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><LoaderCircle className="size-3 animate-spin" />{t.searching}</p>
                                                    )}
                                                    {!interviewLoading && interviewResults.length === 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {getInterviewLinks(company).map(({ label, url }) => (
                                                                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                                                                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-foreground/[0.02] px-3 text-[13px] font-medium text-foreground/85 transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
                                                                    {label}<ArrowUpRight className="size-3.5 text-muted-foreground" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {!interviewLoading && interviewResults.length > 0 && (
                                                        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                                                            {interviewResults.filter(r => safeHttpUrl(r.url)).map((r, i) => (
                                                                <li key={i}>
                                                                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-foreground/[0.01] px-4 py-3 transition-colors hover:bg-foreground/[0.04]">
                                                                        <span className="w-20 shrink-0 truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{r.source}</span>
                                                                        <span className="min-w-0 flex-1 truncate text-sm text-foreground/85">{decodeHtmlEntities(r.title)}</span>
                                                                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                        </Section>
                                    </>
                                )}
                            </div>

                            {/* Feedback + optional coffee */}
                            <div className="space-y-5 border-t border-border bg-inset p-6 sm:px-8">
                                <FeedbackRating t={t} />
                                <CoffeeLink where="report" variant="card" t={coffee} />
                            </div>
                        </div>
                    )}
                </Panel>
            </div>
        </section>
    )
}
