// ─────────────────────────────────────────────
// "Where and how to add it" — concrete guidance for each missing skill.
// Rule-based and fully client-side: it quotes the job post, looks at how the CV is
// structured, and offers an example bullet the user can adapt. It never invents
// experience — the copy tells the user to add only what they have actually done.
// ─────────────────────────────────────────────

import { findSkillMention, yearsFromDateRanges, type MissingSkillWithPriority } from "./analyze"
import { foldText } from "./languages"

export interface KeywordSuggestion {
    key: string
    skill: string
    priority: MissingSkillWithPriority["priority"]
    /** The line in the job post that asks for this skill */
    jobQuote: string | null
    /** Where on this CV to add it */
    where: string
    /** An example bullet to adapt — a pattern, not a claim */
    example: string
}

type Category = "frontend" | "backend" | "data" | "cloud" | "quality" | "practice" | "ai" | "design" | "sales" | "marketing" | "finance" | "product"

const CATEGORY: Record<string, Category> = {
    react: "frontend", typescript: "frontend", javascript: "frontend", nextjs: "frontend", tailwind: "frontend",
    css: "frontend", html: "frontend", vue: "frontend", angular: "frontend", redux: "frontend", graphql: "backend",
    nodejs: "backend", python: "backend", java: "backend", csharp: "backend", golang: "backend", rust: "backend",
    php: "backend", ruby: "backend", api: "backend", sql: "data", mongodb: "data", redis: "data", elasticsearch: "data",
    aws: "cloud", gcp: "cloud", azure: "cloud", docker: "cloud", kubernetes: "cloud", cicd: "cloud", terraform: "cloud",
    linux: "cloud", jest: "quality", cypress: "quality", testing: "quality", git: "practice", agile: "practice",
    figma: "design", ml: "ai", ai: "ai", vectordb: "ai", mlops: "ai", data: "data", bi: "data", excel: "finance",
    product: "product", projectmgmt: "product", sales: "sales", crm: "sales", marketing: "marketing", seo: "marketing",
    finance: "finance", hr: "sales",
}

// Patterns with a measurable result — the shape recruiters respond to.
const EXAMPLE: Record<Category, (skill: string) => string> = {
    frontend: (s) => `Rebuilt the checkout flow with ${s}, cutting page load time by 35% for 20k daily users.`,
    backend: (s) => `Built a ${s} service handling 1M requests a day with 99.9% uptime.`.replace(/^Built a (?=[AEIOU])/, "Built an "),
    data: (s) => `Built ${s} reporting that replaced 6 manual spreadsheets and saved the team 8 hours a week.`,
    cloud: (s) => `Automated infrastructure with ${s}, reducing release time from 45 to 8 minutes.`,
    quality: (s) => `Introduced ${s} for the core flows, raising test coverage from 40% to 85% and halving production bugs.`,
    practice: (s) => `Worked in a 6-person team using ${s}, delivering every two-week release on time for a year.`,
    ai: (s) => `Shipped a ${s} feature to production, improving answer accuracy from 71% to 89% on our eval set.`,
    design: (s) => `Led ${s} work for the onboarding redesign, lifting activation from 31% to 44%.`,
    sales: (s) => `Used ${s} to run a full-cycle B2B pipeline, closing €900k at 128% of quota.`,
    marketing: (s) => `Ran ${s} for our main product line, growing qualified leads 60% in six months.`,
    finance: (s) => `Built ${s} models for the annual budget, improving forecast accuracy to within 3%.`,
    product: (s) => `Owned ${s} for a B2B product, shipping 4 releases that lifted retention by 9 points.`,
}

function sectionSignals(cvText: string) {
    // Folded, so "Fähigkeiten", "Yetenekler" and "Habilidades" match without diacritics
    const lines = foldText(cvText).split(/\n/).map(l => l.trim())
    const isHeading = (re: RegExp) => lines.some(l => l.length < 40 && re.test(l))
    return {
        hasSkills: isHeading(/^(technical\s+)?(skills|competencies|tools|tech stack|technologies|vaardigheden|core skills|yetenekler|beceriler|teknik beceriler|kenntnisse|fahigkeiten|kompetenzen|habilidades|competencias|aptitudes)\b/)
            || isHeading(/^(专业技能|技能|技术栈)/),
        hasProjects: isHeading(/^(projects|side projects|portfolio|projecten|projeler|projekte|proyectos)\b/) || isHeading(/^(项目经历|项目经验|项目)/),
        // Any language: the same date reader the experience score uses ("Mart 2019 - halen")
        hasDatedRoles: /\b(19|20)\d{2}\s*(?:-|–|—|to)\s*((19|20)\d{2}|present|current|now|heden)\b/i.test(cvText)
            || yearsFromDateRanges(cvText) > 0,
    }
}

/** The sentence fragments of whereToAdd() in another language (dictionary: analyzer.where). */
export interface WhereStrings {
    skillsHas: string; skillsNone: string; roleDated: string; roleAny: string
    high: string; medium: string; mediumProject: string; low: string
}

const fill = (template: string, values: Record<string, string>) =>
    template.replace(/\{(\w+)\}/g, (whole, key: string) => Object.hasOwn(values, key) ? values[key] : whole)

function whereToAdd(priority: KeywordSuggestion["priority"], cv: ReturnType<typeof sectionSignals>, w?: WhereStrings): string {
    if (w) {
        const skills = cv.hasSkills ? w.skillsHas : w.skillsNone
        const role = cv.hasDatedRoles ? w.roleDated : w.roleAny
        if (priority === "high") return fill(w.high, { skills, role })
        if (priority === "medium") return fill(w.medium, { skills, project: cv.hasProjects ? w.mediumProject : "" })
        return fill(w.low, { skills })
    }
    const skillsPart = cv.hasSkills ? "your Skills section" : "a short Skills section (your CV doesn't have one yet)"
    const rolePart = cv.hasDatedRoles ? "a bullet under your most recent role" : "a bullet in your experience"
    if (priority === "high") {
        return `The job leans on this. If you've used it, add it to ${skillsPart} and prove it in ${rolePart}.`
    }
    if (priority === "medium") {
        return `Add it to ${skillsPart} if you've used it${cv.hasProjects ? ", and mention it in a project" : ""}.`
    }
    return `A nice-to-have. Add it to ${skillsPart} only if it's genuinely part of your work.`
}

// Skills whose label doesn't read naturally inside the category pattern
const EXAMPLE_BY_KEY: Record<string, string> = {
    ai: "Shipped an LLM-powered support assistant to production, answering 3k questions a day with 89% accuracy on our eval set.",
    vectordb: "Built semantic search over 40k documents with embeddings in a vector database, raising answer relevance by 30%.",
    mlops: "Set up model evaluation and deployment pipelines, cutting the time to ship a model update from two weeks to two days.",
    ml: "Trained and deployed a churn model that flagged at-risk customers two months earlier, saving €400k in revenue.",
    sales: "Ran the full B2B sales cycle for mid-market accounts, closing €900k at 128% of quota.",
    crm: "Managed a 60-account pipeline in Salesforce, raising forecast accuracy to within 5%.",
    seo: "Grew organic traffic 180% in nine months through keyword research and technical SEO fixes.",
    marketing: "Ran multi-channel digital campaigns that grew qualified leads 60% in six months.",
    finance: "Owned the monthly close and variance reporting, delivering management accounts in five working days.",
    excel: "Built the Excel model behind the annual budget, used by 12 department heads.",
    bi: "Built Power BI dashboards that replaced weekly manual reports for the leadership team.",
    product: "Owned the roadmap for a B2B product, shipping four releases that lifted retention by 9 points.",
    projectmgmt: "Managed a nine-month project across four teams, delivered on time and 6% under budget.",
    testing: "Introduced automated tests for the core flows, halving production bugs within a quarter.",
    cicd: "Built CI/CD pipelines that cut release time from 45 to 8 minutes.",
    api: "Designed REST APIs used by three client apps and 40k monthly users.",
    healthcare: "Delivered patient care to 8 patients per shift on a 30-bed ward, keeping clinical documentation audit scores at 98%.",
    logistics: "Coordinated freight for 120 shipments a month across 6 carriers, cutting late deliveries by 25%.",
    hr: "Ran full-cycle recruiting for 45 roles a year in Greenhouse, cutting time to hire from 52 to 34 days.",
    data: "Analysed product usage data to find the drop-off step in onboarding, leading to a fix that lifted conversion 12%.",
}

export function buildSuggestions(cvText: string, jobText: string, missing: MissingSkillWithPriority[], max = 5, where?: WhereStrings): KeywordSuggestion[] {
    if (!cvText.trim() || !jobText.trim()) return []
    const cv = sectionSignals(cvText)
    return missing
        .filter(m => m.priority !== "low")
        .slice(0, max)
        .map(m => {
            const shortName = m.label.split(/\s*[/(]/)[0].trim() || m.label
            return {
                key: m.key,
                skill: m.label,
                priority: m.priority,
                jobQuote: findSkillMention(jobText, m.key),
                where: whereToAdd(m.priority, cv, where),
                example: EXAMPLE_BY_KEY[m.key] ?? EXAMPLE[CATEGORY[m.key] ?? "practice"](shortName),
            }
        })
}
