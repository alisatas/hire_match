// Courses and guides for missing skills. Shared by the website analyzer and the mobile app.

// ─────────────────────────────────────────────
// SKILL RESOURCES (UI-only: links for missing skills)
// ─────────────────────────────────────────────

export interface SkillResource {
    label: string
    url: string
    platform: string
    type: "certification" | "course" | "guide" | "docs"
    duration: string
    free: boolean
}

export const SKILL_RESOURCES: Record<string, SkillResource> = {
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
/** "Self-paced", "~6 hrs", "~2 months" in the page language. */
export function localizeDuration(duration: string, t: { courseSelfPaced: string; courseHours: string; courseMonths: string }): string {
    if (duration === "Self-paced") return t.courseSelfPaced
    const hours = /^~(\d+) hrs$/.exec(duration)
    if (hours) return t.courseHours.replace("{n}", hours[1])
    const months = /^~(\d+) months$/.exec(duration)
    if (months) return t.courseMonths.replace("{n}", months[1])
    return duration
}

export const resourceFor = (key: string): SkillResource | undefined =>
    Object.hasOwn(SKILL_RESOURCES, key) ? SKILL_RESOURCES[key] : undefined
