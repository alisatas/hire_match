// ─────────────────────────────────────────────
// SHARED ANALYSIS ENGINE
// Used by: cv-analyzer.tsx (client)
// ─────────────────────────────────────────────

import {
    INTL_AT_LEAST, INTL_BOILERPLATE_HEADING, INTL_DATE_SEP, INTL_EDUCATION, INTL_EXPERIENCE_WORD,
    INTL_JOB_HEADING, INTL_MONTHS, INTL_NICE_HEADING, INTL_NICE_INLINE, INTL_PRESENT, INTL_RANGE_SEP,
    INTL_SINCE, INTL_STOP_WORDS, INTL_YEARS_UNIT, LOCALIZED_SKILL_ALIASES, NONLATIN_BOILERPLATE_HEADING,
    NONLATIN_EDUCATION, NONLATIN_JOB_HEADING, NONLATIN_NICE_HEADING, NONLATIN_NICE_INLINE,
    NONLATIN_SENIORITY, canonicalDates, countWords, foldText, hanBigrams, isWordChar, nonLatinYears,
    withoutHan,
} from "./languages"

// Math Prof improvement (Push 18): generic aliases removed or made specific.
// "rest" matched "the rest of the team", "pipeline" matched "sales pipeline",
// "cache"/"caching" credited Redis to anyone who mentioned browser caching,
// and "terminal"/"shell" fired on "airport terminal" or "shell company". Each now
// needs its technical context ("rest api", "ci pipeline", "shell scripting"). "node"
// stays: job posts routinely write "Node" for Node.js and the false-positive rate is low.
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
    redis: ["redis"],
    elasticsearch: ["elasticsearch", "elastic search", "opensearch"],
    // Cloud & DevOps
    aws: ["aws", "amazon web services", "ec2", "s3", "lambda", "cloudformation"],
    gcp: ["gcp", "google cloud", "firebase", "bigquery"],
    azure: ["azure", "microsoft azure"],
    docker: ["docker", "containerization", "dockerfile"],
    kubernetes: ["kubernetes", "k8s", "helm", "kubectl"],
    cicd: ["ci/cd", "ci cd", "github actions", "gitlab ci", "jenkins", "circleci", "ci pipeline", "cd pipeline", "deployment pipeline", "build pipeline"],
    terraform: ["terraform", "infrastructure as code", "iac"],
    // Testing
    jest: ["jest", "vitest", "unit test", "unit testing"],
    // "end-to-end" alone is a generic phrase ("own it end-to-end") — require the testing context
    cypress: ["cypress", "playwright", "selenium", "e2e", "end-to-end test", "end-to-end testing"],
    testing: ["testing", "tdd", "bdd", "qa", "quality assurance"],
    // Tools & Practices
    git: ["git", "github", "gitlab", "version control"],
    agile: ["agile", "scrum", "kanban", "sprint", "jira"],
    api: ["rest api", "restful", "rest endpoint", "api", "microservices", "openapi", "swagger"],
    linux: ["linux", "unix", "bash", "shell scripting", "shell script"],
    // bare "design" removed: as a verb ("design and build services") it flagged Figma / UX
    // as a gap on backend and DevOps roles
    figma: ["figma", "ux", "ui design", "ux design", "product design", "design system", "wireframe"],
    // Data & AI
    ml: ["machine learning", "ml", "tensorflow", "pytorch", "scikit-learn"],
    data: ["data analysis", "pandas", "numpy", "data science", "analytics"],
    // Math Prof improvement (Push 23): AI engineering vocabulary. The old group knew only
    // "ai / llm / openai / langchain / rag / prompt engineering", so an AI Engineer post
    // scored a generic Python ML engineer almost the same as someone who had shipped
    // RAG systems. Retrieval and deployment now have their own groups.
    ai: ["ai", "llm", "llms", "large language models", "generative ai", "genai", "openai", "anthropic",
        "langchain", "llamaindex", "rag", "retrieval-augmented generation", "prompt engineering",
        // bare "fine-tuning" left out: "fine-tuning your pitch" flagged AI on a sales post
        "model fine-tuning", "llm fine-tuning", "fine-tuning llms", "peft", "qlora",
        "hugging face", "huggingface", "ai agents", "agentic",
        "function calling", "tool calling"],
    vectordb: ["vector database", "vector databases", "vector search", "embeddings", "semantic search",
        "pgvector", "pinecone", "weaviate", "qdrant", "chromadb", "faiss", "milvus"],
    mlops: ["mlops", "llmops", "model deployment", "model serving", "mlflow", "kubeflow", "sagemaker",
        "vertex ai", "model monitoring", "evals", "llm evaluation", "experiment tracking"],
    // Math Prof improvement (Push 19): BI, spreadsheet, product and business-role groups.
    // Before this, Tableau / Power BI / Excel were invisible, so an analyst CV that matched
    // the Data Analyst sample almost line for line scored 31%; and sales or marketing jobs
    // had no skill groups at all, so the score could not separate a matching sales CV (22%)
    // from a chef's CV (11%). Aliases are multi-word or tool names on purpose — single
    // generic words ("sales", "marketing", "budget") fire on almost any posting.
    // bare "dashboards" left out: "we build dashboards in React" is a frontend task, not BI
    bi: ["tableau", "power bi", "powerbi", "looker", "qlik", "data visualization", "data visualisation"],
    excel: ["excel", "microsoft excel", "vlookup", "pivot tables", "pivot table", "power query"],
    product: ["product management", "product roadmap", "product strategy", "product discovery", "roadmap", "user stories", "okrs", "go-to-market"],
    projectmgmt: ["project management", "pmp", "prince2", "stakeholder management", "risk management"],
    sales: ["b2b sales", "b2c sales", "saas sales", "account executive", "lead generation", "prospecting", "cold calling", "quota", "closing deals", "business development", "account management"],
    crm: ["crm", "salesforce", "hubspot", "pipedrive", "zoho crm", "microsoft dynamics"],
    marketing: ["digital marketing", "content marketing", "email marketing", "social media marketing", "performance marketing", "growth marketing", "marketing automation", "brand marketing", "campaign management"],
    // Google Analytics / GA4 deliberately not here: analyst and PM postings use them, and
    // listing them under SEO flagged "SEO / SEM" as a gap on the Data Analyst sample
    seo: ["seo", "sem", "search engine optimization", "search engine optimisation", "google ads", "ppc", "keyword research"],
    // Math Prof improvement (Push 26): recruiting / HR. Recruiter postings had no skill
    // group, so the score for that role rested on raw keyword overlap alone. Tool names
    // and multi-word phrases only — "hiring" or "talent" alone appear in every posting.
    // "workday", "greenhouse" and "lever" alone are everyday words ("a typical workday",
    // "greenhouse gas", "a key lever") — only their ATS forms count.
    hr: ["applicant tracking system", "greenhouse ats", "workday recruiting", "workday hcm", "lever ats",
        "smartrecruiters", "bamboohr",
        "linkedin recruiter", "boolean search", "full-cycle recruiting", "full cycle recruiting",
        "talent acquisition", "candidate sourcing", "sourcing candidates", "time to hire", "employer branding",
        "onboarding programme", "onboarding program", "hris"],
    finance: ["financial modelling", "financial modeling", "financial analysis", "fp&a", "ifrs", "gaap", "accounts payable", "accounts receivable", "reconciliation", "budgeting"],
    // Math Prof improvement (Push 33): healthcare and logistics. Neither sector had a skill
    // group, so a nurse CV that matched a ward-nurse posting almost line for line scored 33%
    // (skills, half the score, read as "nothing detected"). Same rule as the other business
    // groups: tool names and multi-word phrases only. Left out on purpose because they fire on
    // tech postings: "triage" (bug / incident triage), "acls" (access control lists), bare
    // "epic" (agile epics), bare "supply chain" (software supply-chain security).
    healthcare: ["patient care", "electronic health records", "electronic health record", "ehr", "emr", "epic emr",
        "epic systems", "hipaa", "clinical documentation", "medication administration", "infection control",
        "care plans", "care planning", "basic life support", "vital signs", "wound care"],
    logistics: ["supply chain management", "supply chain planning", "supply chain operations", "logistics coordination",
        "inventory management", "warehouse management", "wms", "demand planning", "procurement",
        "freight", "3pl", "fleet management", "last-mile delivery", "s&op", "sap mm"],
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
    // Turkish, German, Spanish and Hindi — see languages.ts
    ...INTL_STOP_WORDS,
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
        vectordb: "Vector DBs / Embeddings", mlops: "MLOps / Evals",
        bi: "BI / Dashboards (Tableau, Power BI)", excel: "Excel", product: "Product Management",
        projectmgmt: "Project Management", sales: "B2B Sales", crm: "CRM (Salesforce, HubSpot)",
        marketing: "Digital Marketing", seo: "SEO / SEM", finance: "Finance & Accounting",
        hr: "Recruiting / HR Tools", healthcare: "Clinical / Patient Care", logistics: "Supply Chain & Logistics",
    }
    return labels[key] || key
}

// Math Prof improvement (Push 36): every script, not only a–z. The old pattern deleted
// any character outside a–z, so "hasta bakımı" became "hasta bak m" and Chinese or Hindi
// text disappeared entirely. Letters, digits and combining marks of any script are kept;
// Latin diacritics are folded (foldText) so "yönetimi" and "yonetimi" compare equal.
function normalizeText(text: string): string {
    return foldText(text).replace(/[^\p{L}\p{M}\p{N}.#+\s]/gu, " ")
}

// Math Prof improvement: whole-term alias matching.
// Aliases used to be matched with a raw substring test, so short aliases fired
// inside unrelated words: "ts" in "requirements", "ai" in "maintain", "ml" in
// "html", "java" in "javascript", "rust" in "trust", "rag" in "leverage".
// Almost every job and CV therefore "contained" TypeScript, AI, etc., which
// inflated both the matched list and the missing list and blurred the score.
// An alias now only counts when it is not glued to other letters/digits.
// A trailing plural "s" is tolerated for aliases of 3+ chars ("apis", "pipelines").
// Chinese is written without spaces: in "熟悉React和TypeScript" the characters around
// "React" are letters too, but they do not make it part of a longer word. isWordChar
// therefore excludes them, which also lets Chinese aliases match anywhere in a sentence.
const isAlnum = isWordChar

function countAlias(normalized: string, alias: string): number {
    let count = 0
    let pos = 0
    while ((pos = normalized.indexOf(alias, pos)) !== -1) {
        const end = pos + alias.length
        const after = normalized[end]
        const startOk = !isAlnum(normalized[pos - 1])
        const endOk = !isAlnum(after) || PREFIX_ALIASES.has(alias) ||
            (alias.length >= 3 && after === "s" && !isAlnum(normalized[end + 1]))
        if (startOk && endOk) count++
        pos = end
    }
    return count
}

// Aliases are normalised the same way as the text, so aliases containing "-" or
// "/" ("end-to-end", "scikit-learn", "ci/cd") can actually match; before this
// they never did, because normalizeText() turns those characters into spaces.
// De-duplicated so "ci/cd" and "ci cd" are not counted twice.
// Localised aliases (languages.ts) join the English ones of the same group. One written
// with a trailing "*" matches as a stem — "hasta bakım*" covers "hasta bakımı" and
// "hasta bakımında" — because Turkish and German attach endings to the word.
const PREFIX_ALIASES = new Set<string>()
const NORMALIZED_SKILL_GROUPS: [string, string[]][] = Object.entries(SKILL_GROUPS).map(
    ([key, aliases]) => {
        const localized = (LOCALIZED_SKILL_ALIASES[key] ?? []).map(alias => {
            const normalized = normalizeText(alias.replace(/\*$/, "")).trim()
            if (alias.endsWith("*")) PREFIX_ALIASES.add(normalized)
            return normalized
        })
        return [key, [...new Set([...aliases.map(a => normalizeText(a).trim()), ...localized])]]
    }
)

/**
 * The first line or sentence of `text` that mentions one of the skill's aliases,
 * trimmed for display. Used to quote the job post back to the user.
 */
export function findSkillMention(text: string, key: string): string | null {
    const aliases = NORMALIZED_SKILL_GROUPS.find(([k]) => k === key)?.[1]
    if (!aliases) return null
    const pieces = text.split(/\n|(?<=[.!?])\s+/).map(p => p.replace(/^[\s\-•*·]+/, "").trim()).filter(p => p.length > 8)
    const hits = pieces
        .map((piece, index) => ({ piece, index }))
        .filter(({ piece }) => { const n = normalizeText(piece); return aliases.some(alias => countAlias(n, alias) > 0) })
    if (hits.length === 0) return null
    // The job title ("AI Engineer — Amsterdam") says little; prefer a requirement line
    const best = hits.length > 1 && hits[0].index === 0 ? hits[1].piece : hits[0].piece
    return best.length > 180 ? best.slice(0, 177).trimEnd() + "…" : best
}

// Every single-word skill alias ("redux", "salesforce", "pgvector"), used to tell real
// requirements apart from boilerplate when weighting job keywords.
const SKILL_ALIAS_WORDS = new Set(
    NORMALIZED_SKILL_GROUPS.flatMap(([, aliases]) => aliases).filter(a => !a.includes(" ")),
)

function extractSkills(text: string): Set<string> {
    const normalized = normalizeText(text)
    const found = new Set<string>()
    for (const [key, aliases] of NORMALIZED_SKILL_GROUPS) {
        if (aliases.some(alias => countAlias(normalized, alias) > 0)) {
            found.add(key)
        }
    }
    return found
}

// Frequency map: how many times each alias of a skill group appears in text
function extractSkillFrequencies(text: string): Map<string, number> {
    const normalized = normalizeText(text)
    const freq = new Map<string, number>()
    for (const [key, aliases] of NORMALIZED_SKILL_GROUPS) {
        let count = 0
        for (const alias of aliases) {
            count += countAlias(normalized, alias)
        }
        if (count > 0) freq.set(key, count)
    }
    return freq
}

// Math Prof improvement (Push 27): skip boilerplate sections when reading job keywords.
// Postings wrap the actual job in company story, benefits, hiring process, diversity and
// privacy text — hundreds of words that are not requirements. Those sections almost
// always sit under recognisable headings, so lines under them are dropped until a
// job-content heading ("Requirements", "About the role", "Wat ga je doen") starts again.
const BOILERPLATE_HEADING = new RegExp(String.raw`^(about (?!the role\b|the job\b|the position\b|this role\b|you\b)[\w&.' -]{1,40}|who we are|our (story|mission|culture|values|company|team|offices|hiring process|benefits)|what we offer|we offer|what('|’)s in it for you|benefits|perks|compensation|why (join|work|you('|’)ll love)\b.*|(the )?(hiring|interview|recruitment|application) process|how to apply|next steps|diversity|equal opportunit|inclusion|privacy|data protection|legal|disclaimer|over ons|wie zijn wij|wij bieden|wat bieden wij|arbeidsvoorwaarden|sollicitatieprocedure)\b`, "i")
const JOB_HEADING = new RegExp(String.raw`^(requirements?|responsibilities|key responsibilities|what you('|’)ll do|what you will do|what you('|’)ll bring|what you bring|your role|the role|about the role|about the job|about this role|about you|qualifications|must[- ]haves?|nice[- ]to[- ]haves?|bonus points|skills|your profile|who you are|you have|you are|we('|’)re looking for|what we('|’)re looking for|what we are looking for|tasks|duties|functie-eisen|wat ga je doen|wat vragen wij|wie ben jij|jouw profiel)\b`, "i")

// Math Prof improvement (Push 28): "nice to have" skills weigh less.
// Postings separate must-haves from extras ("Nice to have:", "Bonus points", "is a plus").
// A skill that appears ONLY in those places was weighted and prioritised exactly like a
// hard requirement, so missing an optional extra cost as much as missing the core stack.
const NICE_HEADING = /^(nice[- ]to[- ]haves?|good[- ]to[- ]haves?|bonus( points)?|pluspunten|preferred( qualifications)?|desirable|a plus)\b/i
const NICE_INLINE = /\b(is a (big )?plus|are a plus|a bonus|nice to have|preferred|is een pr?e)\b/i
// Headings in Turkish, German and Spanish (tested on the folded line), Chinese and Hindi.
const INTL_JOB_HEADING_RE = new RegExp(String.raw`^(${INTL_JOB_HEADING})\b`)
const INTL_BOILERPLATE_HEADING_RE = new RegExp(String.raw`^(${INTL_BOILERPLATE_HEADING})\b`)
const INTL_NICE_HEADING_RE = new RegExp(String.raw`^(${INTL_NICE_HEADING})\b`)
const INTL_NICE_INLINE_RE = new RegExp(String.raw`\b(${INTL_NICE_INLINE})\b`)

interface PostingLine { isHeading: boolean; job: boolean; boilerplate: boolean; nice: boolean; niceInline: boolean }

/** Classifies one line of a posting: is it a heading, and of which kind of section. */
function readPostingLine(raw: string): PostingLine & { line: string } {
    const line = raw.trim().replace(/^[#*\-•\s]+/, "")
    const folded = foldText(line)
    const isHeading = line.length > 0 && line.length <= 60 && line.split(/\s+/).length <= 8 && !/[.!?。]$/.test(folded.replace(/:$/, ""))
    return {
        line,
        isHeading,
        job: JOB_HEADING.test(line) || INTL_JOB_HEADING_RE.test(folded) || NONLATIN_JOB_HEADING.test(folded),
        boilerplate: BOILERPLATE_HEADING.test(line) || INTL_BOILERPLATE_HEADING_RE.test(folded) || NONLATIN_BOILERPLATE_HEADING.test(folded),
        nice: NICE_HEADING.test(line) || INTL_NICE_HEADING_RE.test(folded) || NONLATIN_NICE_HEADING.test(folded),
        niceInline: NICE_INLINE.test(line) || INTL_NICE_INLINE_RE.test(folded) || NONLATIN_NICE_INLINE.test(folded),
    }
}

/** Splits a posting into its required and explicitly optional lines. */
export function splitOptional(jobText: string): { required: string; optional: string } {
    const required: string[] = []
    const optional: string[] = []
    let inNice = false
    for (const raw of jobText.split("\n")) {
        const l = readPostingLine(raw)
        if (l.isHeading && l.nice) { inNice = true; continue }
        if (l.isHeading && (l.job || l.boilerplate)) inNice = false
        ;(inNice || l.niceInline ? optional : required).push(raw)
    }
    return { required: required.join("\n"), optional: optional.join("\n") }
}

export function stripBoilerplate(jobText: string): string {
    const kept: string[] = []
    let skipping = false
    for (const raw of jobText.split("\n")) {
        const { line, isHeading, job, boilerplate } = readPostingLine(raw)
        if (isHeading && job) skipping = false
        else if (isHeading && boilerplate) skipping = true
        // Stand-alone legal sentences outside any heading
        if (/equal opportunity employer|acquisition in response to this vacancy/i.test(line)) continue
        if (!skipping) kept.push(raw)
    }
    const stripped = kept.join("\n")
    // Safety net: a posting that opens with "About Acme" and never uses a job heading
    // would lose its requirements. If too little is left, use the full text instead.
    // (A ratio test was tried and rejected: long boilerplate is exactly the case where
    // most of the text should go.)
    return countWords(stripped) < 25 ? jobText : stripped
}

// Math Prof improvement (Push 36): keywords in any script. The pattern used to be
// /\b[a-z][a-z0-9+#.]{2,}\b/, which cut "geliştirici" into "geli" + "tirici" and found
// nothing at all in Chinese or Hindi. A word is now a run of letters of any
// space-separated script (same shape as before: starts with a letter, may contain + # .
// inside, 4+ characters); Chinese is read as two-character windows (see hanBigrams).
const WORD_RE = /(?<![\p{L}\p{M}\p{N}_])\p{L}[\p{L}\p{M}\p{N}+#.]*[\p{L}\p{M}\p{N}](?![\p{L}\p{M}\p{N}_])/gu

function extractKeywordFrequencies(text: string): Map<string, number> {
    const folded = foldText(text)
    const freq = new Map<string, number>()
    for (const w of withoutHan(folded).match(WORD_RE) || []) {
        if (!STOP_WORDS.has(w) && w.length >= 4) {
            freq.set(w, (freq.get(w) || 0) + 1)
        }
    }
    for (const gram of hanBigrams(folded)) freq.set(gram, (freq.get(gram) || 0) + 1)
    return freq
}

function extractKeywords(text: string): Set<string> {
    return new Set(extractKeywordFrequencies(text).keys())
}

// Math Prof improvement (Push 29): read the requirement the way postings phrase it.
// The old pattern only knew "N years of experience": a range "3-5 years of experience"
// was read as 5 (the bar is 3), and "at least 4 years in a similar role", "2+ years’
// experience" (curly apostrophe) and Dutch "3 jaar werkervaring" were missed entirely,
// so the experience part fell back to the neutral default. Ranges now use the lower
// bound; a year count counts when experience words follow it or "at least / minimum"
// precede it. Values outside 1–25 are ignored (e.g. "founded 40 years ago").
// Math Prof improvement (Push 36): Turkish, German, Spanish, Chinese and Hindi wording —
// "en az 5 yıl deneyim", "mindestens 5 Jahren Berufserfahrung", "al menos 5 años de
// experiencia", "3年以上工作经验", "5 वर्ष का अनुभव". None of these was read before, so the
// experience part of the score always fell back to its neutral default. The text is
// folded first, which is why the patterns below are written without diacritics.
const YEARS_UNIT = String.raw`(?:years?|yrs?|jaar|${INTL_YEARS_UNIT})`
const YEARS_SEP = String.raw`(?:-|–|—|to|tot|${INTL_RANGE_SEP})`
const YEARS_TAIL = String.raw`['’]?\s+(?:of\s+|de\s+)?(?:[\w-]+\s+){0,4}?(?:experience|exp|ervaring|werkervaring|expertise|working|in\s+(?:a|an|the)\b|${INTL_EXPERIENCE_WORD})`
const YEARS_RANGE_RE = new RegExp(String.raw`\b(\d{1,2})\s*${YEARS_SEP}\s*\d{1,2}\+?\s*${YEARS_UNIT}${YEARS_TAIL}`, "gi")
const YEARS_SINGLE_RE = new RegExp(String.raw`\b(\d{1,2})\+?\s*${YEARS_UNIT}${YEARS_TAIL}`, "gi")
const YEARS_MINIMUM_RE = new RegExp(String.raw`\b(?:at\s+least|minimum(?:\s+of)?|min\.?|minimaal|ten\s+minste|${INTL_AT_LEAST})\s+(\d{1,2})\+?\s*${YEARS_UNIT}\b`, "gi")
const YEARS_UPPER_BOUND_RE = new RegExp(String.raw`\d\s*${YEARS_SEP}\s*$`)

export function extractYearsRequired(rawText: string): number {
    const text = foldText(rawText)
    const found: number[] = nonLatinYears(text)
    const ranged = new Set<number>() // start index of numbers already read as a range
    for (const m of text.matchAll(YEARS_RANGE_RE)) {
        found.push(Number(m[1]))
        ranged.add(m.index ?? -1)
    }
    for (const m of text.matchAll(YEARS_SINGLE_RE)) {
        // "3-5 years" also matches "5 years …" — skip the upper bound of a range
        const before = text.slice(Math.max(0, (m.index ?? 0) - 6), m.index ?? 0)
        if (YEARS_UPPER_BOUND_RE.test(before)) continue
        found.push(Number(m[1]))
    }
    for (const m of text.matchAll(YEARS_MINIMUM_RE)) found.push(Number(m[1]))
    const years = found.filter(n => n >= 1 && n <= 25)
    return years.length > 0 ? Math.max(...years) : 0
}

// Math Prof improvement (Push 21): read career length from date ranges.
// Most CVs list jobs as "2019 – present" or "Mar 2018 – Jan 2022" and never write
// "N years of experience", so those candidates fell through to the title heuristic
// (or to 0 → the 0.50 "unknown" experience score). Career length is taken from the
// earliest start to the latest end of the work ranges found. Lines that look like
// education ("BSc 2014 – 2018", "University …") are skipped so a degree does not
// count as work experience. Capped at 40 years. (Push 22: periods are now merged
// and summed — see yearsFromDateRanges.)
const YEAR = String.raw`(?:19[6-9]\d|20[0-4]\d)`
// Optional month before a year: a word ("Mar", "maart", "Sept.") or a number ("03/").
// Captured so the period can be measured in months; unknown words ("Acme 2019") are ignored.
const MONTH = String.raw`(?:([a-z]{3,9})\.?\s+|(\d{1,2})[./]\s*)?`
const RANGE_RE = new RegExp(
    String.raw`${MONTH}(${YEAR})\s*(?:-|–|—|to|until|tot|${INTL_DATE_SEP})\s*${MONTH}(${YEAR}|present|current|now|today|heden|nu|${INTL_PRESENT})\b`,
    "gi",
)
const SINCE_RE = new RegExp(String.raw`\b(?:since|sinds|${INTL_SINCE})\s+${MONTH}(${YEAR})\b`, "gi")
// Turkish puts "since" after the year: "2019'dan beri", "2019'dan itibaren"
const SINCE_TR_RE = new RegExp(String.raw`${MONTH}(${YEAR})\s*['’]?\s*[dt][ae]n\s+(?:beri|itibaren|bu\s+yana)\b`, "gi")
const EDUCATION_RE = new RegExp(String.raw`\b(university|universiteit|college|school|bachelor|master|bsc|msc|ba|ma|phd|degree|diploma|education|opleiding|hbo|mbo|wo|thesis|graduated|student|${INTL_EDUCATION})\b`, "i")

// Month prefixes: English and Dutch here, Turkish, German and Spanish from languages.ts
const MONTHS: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, mrt: 3, maa: 3, apr: 4, may: 5, mei: 5, jun: 6, jul: 7,
    aug: 8, sep: 9, oct: 10, okt: 10, nov: 11, dec: 12,
    ...INTL_MONTHS,
}

function monthOf(name: string | undefined, num: string | undefined): number | null {
    if (num) {
        const n = Number(num)
        return n >= 1 && n <= 12 ? n : null
    }
    return name ? MONTHS[name.slice(0, 3)] ?? null : null
}

// A date as a fractional year. Without a month the middle of the year is assumed, so a
// year-only range "2018 – 2020" still measures 2 years. With a month, a start counts from
// the beginning of that month and an end through the end of it ("Mar 2018 – Jan 2022"
// = 47 months = 3.9 years).
function yearPoint(year: number, month: number | null, edge: "start" | "end"): number {
    if (month === null) return year + 0.5
    return edge === "start" ? year + (month - 1) / 12 : year + month / 12
}

// Math Prof improvement (Push 22): sum the merged work periods instead of measuring
// earliest start → latest end. "2010–2012, then 2015–2016" is 3 years of work, not 6.
// Gaps of up to a year are merged (job changes, notice periods, year-only dates); only
// longer career breaks are subtracted.
// Math Prof improvement (Push 24): month precision. Months are read when the CV gives
// them, so "Mar 2018 – Jan 2022" is 3.9 years instead of 4, and "present" runs to the
// current month. Results are rounded to one decimal.
export function yearsFromDateRanges(text: string, now: Date = new Date()): number {
    const nowPoint = now.getFullYear() + (now.getMonth() + 1) / 12
    const periods: [number, number][] = []
    // Folded and with Chinese / Hindi date wording rewritten ("2018年3月 至今" → "3/2018 - present")
    for (const line of canonicalDates(foldText(text)).split(/\n|•|·|\|/)) {
        if (EDUCATION_RE.test(line) || NONLATIN_EDUCATION.test(line)) continue
        for (const m of line.matchAll(RANGE_RE)) {
            const start = yearPoint(Number(m[3]), monthOf(m[1], m[2]), "start")
            const end = /^\d/.test(m[6]) ? yearPoint(Number(m[6]), monthOf(m[4], m[5]), "end") : nowPoint
            if (start > nowPoint || end < start) continue
            periods.push([start, Math.min(end, nowPoint)])
        }
        for (const m of [...line.matchAll(SINCE_RE), ...line.matchAll(SINCE_TR_RE)]) {
            const start = yearPoint(Number(m[3]), monthOf(m[1], m[2]), "start")
            if (start <= nowPoint) periods.push([start, nowPoint])
        }
    }
    if (periods.length === 0) return 0

    periods.sort((a, b) => a[0] - b[0])
    let total = 0
    let [curStart, curEnd] = periods[0]
    for (const [start, end] of periods.slice(1)) {
        if (start <= curEnd + 1) {
            curEnd = Math.max(curEnd, end)
        } else {
            total += curEnd - curStart
            ;[curStart, curEnd] = [start, end]
        }
    }
    total += curEnd - curStart
    return Math.round(Math.min(Math.max(total, 0), 40) * 10) / 10
}

// "6 years of experience" and its Turkish, German and Spanish forms ("6 yıl deneyim",
// "6 Jahre Erfahrung", "6 años de experiencia"); Chinese and Hindi via nonLatinYears.
const CV_YEARS_RE = new RegExp(String.raw`(\d+)\+?\s*(?:years?|${INTL_YEARS_UNIT})\s*(?:of\s*|de\s*)?(?:experience|exp|${INTL_EXPERIENCE_WORD})`, "gi")

function extractYearsFromCV(text: string): number {
    const folded = foldText(text)
    const years = [
        ...[...folded.matchAll(CV_YEARS_RE)].map(m => parseInt(m[1])),
        ...nonLatinYears(folded),
    ].filter(n => !isNaN(n))
    if (years.length > 0) return Math.max(...years)

    const fromRanges = yearsFromDateRanges(text)
    if (fromRanges > 0) return fromRanges

    // Math Prof improvement: infer seniority from title/role signals when no
    // explicit year count is written. "Senior React Developer" is far more
    // likely to have 5+ years than a 0-year default suggests, so we avoid
    // the 0.50 neutral-penalty for candidates who simply didn't write their years.
    const lower = folded
    if (/\b(principal|architect|vp|vice.?president|director|fellow)\b/.test(lower)) return 10
    if (/\b(staff|senior|sr\.|lead|kidemli)\b/.test(lower)) return 5
    if (/\b(mid.?level|intermediate)\b/.test(lower)) return 3
    if (/\b(junior|jr\.|entry.?level|graduate|intern)\b/.test(lower)) return 1
    for (const [pattern, years] of NONLATIN_SENIORITY) if (pattern.test(lower)) return years
    return 0
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
    if (cvText.length > 200_000 || jobText.length > 100_000) {
        throw new Error("Input text too large")
    }

    // ── 1. Skill extraction ──────────────────────────────────────────────────
    const cvSkills = extractSkills(cvText)
    const jobSkillFreq = extractSkillFrequencies(jobText)

    // Math Prof improvement: skills in the job title are the strongest signal — they
    // get +2 frequency so they surface as high-priority gaps and drive the score.
    // Math Prof improvement (Push 17): the title is the first non-empty line, capped at
    // 120 chars. The old fixed 120-char window spilled into the body whenever the title
    // was short ("UX Designer\nWe use Figma, Jira…"), so body-only skills were boosted
    // and marked high-priority as if they were in the title. Scraped text that arrives
    // as one long line still falls back to the 120-char cap.
    const jobTitle = (jobText.trim().split("\n", 1)[0] ?? "").slice(0, 120)
    const titleSkills = extractSkills(jobTitle)
    for (const key of titleSkills) {
        jobSkillFreq.set(key, (jobSkillFreq.get(key) || 0) + 2)
    }

    const jobSkills = new Set(jobSkillFreq.keys())
    // Skills that only ever appear in "nice to have" lines (and not in the title)
    const { required: requiredText, optional: optionalText } = splitOptional(jobText)
    const requiredSkills = extractSkills(requiredText)
    const optionalOnly = new Set(
        [...extractSkills(optionalText)].filter(k => !requiredSkills.has(k) && !titleSkills.has(k)),
    )
    const matched = [...jobSkills].filter(s => cvSkills.has(s))
    const missingKeys = [...jobSkills].filter(s => !cvSkills.has(s))

    // ── 2. Keyword extraction ────────────────────────────────────────────────
    const cvKeywords = extractKeywords(cvText)
    // Requirements only: company story, benefits and legal sections are left out of the
    // keyword pool AND of the length used for the confidence factor below — otherwise
    // boilerplate both diluted the keywords and made a posting look more "substantial".
    const jobContent = stripBoilerplate(jobText)
    const jobFreq = extractKeywordFrequencies(jobContent)
    const jobKeywords = new Set(jobFreq.keys())
    const rawMatched = [...jobKeywords].filter(w => cvKeywords.has(w)).length
    const rawTotal = jobKeywords.size

    // ── 3. Years of experience ───────────────────────────────────────────────
    const yearsRequired = extractYearsRequired(jobText)
    const yearsOnCV = extractYearsFromCV(cvText)

    // countWords also handles text without spaces (Chinese)
    const jobWordCount = countWords(jobContent)
    const cvWordCount = countWords(cvText)
    const lowQuality = jobWordCount < 80 || (jobSkills.size < 3 && rawTotal < 20)

    // ── 4. Component A: Frequency-Weighted Skill Score (0-1) ────────────────
    // Each skill is weighted by how often its aliases appear in the job description.
    // A skill mentioned 5 times carries more weight than one mentioned once.
    // Weight is log-dampened to prevent single skills from dominating.
    let totalSkillWeight = 0
    let matchedSkillWeight = 0
    for (const [key, freq] of jobSkillFreq.entries()) {
        // log-dampened frequency weight; optional-only skills count half
        const weight = (1 + Math.log(1 + freq)) * (optionalOnly.has(key) ? 0.5 : 1)
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
    // Hard ceiling at 10: prevents keyword-stuffed JDs (>1200 words) from extreme weight disparities.
    // e.g. 300-word JD → cap 4, 600-word → cap 4, 1200-word → cap 8, 2000-word → cap 10 (capped)
    const keywordFreqCap = Math.min(Math.ceil(Math.max(4, jobWordCount / 150)), 10)
    // Math Prof improvement (Push 27): boilerplate dampening. Scraped postings carry
    // hundreds of words of company story, benefits, hiring process and legal text, almost
    // all mentioned once. Every one of them counted as a "keyword", so adding ~380 words of
    // boilerplate to the Frontend sample dropped a fitting CV from 81 to 72. In postings
    // over 250 words, a word mentioned once now weighs 250 / words (floor 0.25) — unless it
    // is a recognised skill term ("redux", "salesforce"), because real requirements are
    // often listed once too. Repeated words keep full weight; short postings are unchanged.
    const singleMentionWeight = jobWordCount <= 250 ? 1 : Math.max(0.25, 250 / jobWordCount)
    for (const [word, freq] of jobFreq.entries()) {
        const weight = freq === 1 && !SKILL_ALIAS_WORDS.has(word) ? singleMentionWeight : Math.min(freq, keywordFreqCap)
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
            // sigmoid-like mapping: overshooting is capped at 1.0.
            // Overqualification discount: ratio > 3.0 (e.g. 6yr for 2yr role) slightly reduces
            // expScore to reflect reduced hiring likelihood — each unit above 3.0 costs 0.03.
            const base = Math.min(ratio, 1.25) / 1.25
            const overqualDiscount = ratio > 3.0 ? Math.min((ratio - 3.0) * 0.03, 0.12) : 0
            expScore = Math.max(base - overqualDiscount, 0.50)
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
    // Very short JDs (< 50 words) keep a hard floor of 0.3 so garbage input can't score high.
    // Math Prof improvement (Push 13): the ramp now reaches full confidence at 200 words
    // instead of 400. A typical real posting is 120–250 words; under the old curve a CV that
    // matched every skill in a 130-word JD was capped at ~63%, so "strong match" (70+) was
    // unreachable for most real jobs. Now: 50 words → 0.775, 130 → 0.895, 200+ → 1.0.
    const confidence = jobWordCount < 50
        ? Math.max(0.3, jobWordCount / 50 * 0.55)
        : Math.min(0.7 + (jobWordCount / 200) * 0.3, 1.0)

    // CV quality factor: a very short paste is probably incomplete (or a bare keyword
    // list), so its score is dampened to stop a 10-word list of buzzwords hitting 90%.
    // Math Prof improvement (Push 20): the ramp now runs 25 → 50 words instead of 40 → 80.
    // The old curve dampened genuine concise CVs: a 50-word analyst CV that covered the
    // Data Analyst sample almost line for line was cut to ×0.625 and scored 33%. Now
    // ≤ 25 words → ×0.5 (keyword lists and fragments stay dampened), 50+ words → ×1.0.
    const cvConfidence = Math.min(1.0, Math.max(0.5, 0.5 + (cvWordCount - 25) / 50))

    const adjustedScore = (rawScore * confidence * cvConfidence) - coveragePenalty

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
            titleSkills.has(key) ? "high"
                : optionalOnly.has(key) ? "low"
                    : freq >= 3 ? "high" : freq >= 1 ? "medium" : "low"
        return { label: getSkillLabel(key), key, freq, priority }
    }).sort((a, b) => {
        // Math Prof improvement: sort by priority first (high → medium → low), then by
        // frequency within each tier. Previously sorted by freq only, which buried
        // title-boosted high-priority skills (freq=1) below medium-priority ones (freq=2).
        const rank = { high: 0, medium: 1, low: 2 } as const
        if (rank[a.priority] !== rank[b.priority]) return rank[a.priority] - rank[b.priority]
        return b.freq - a.freq
    })

    // ── 10. Top missing job signals — skill aliases only ─────────────────────
    // Only surface words that are recognised skill aliases (from SKILL_GROUPS).
    // This prevents location names, company names, and page furniture ("hague",
    // "linkedin", "grade") from appearing. Each signal maps back to a real skill.
    const allSkillAliases = new Set([...Object.values(SKILL_GROUPS).flat(), ...SKILL_ALIAS_WORDS])
    // Math Prof improvement: adapt signal count to match score — strong matches (≥70)
    // already have enough context; weak matches benefit from more signals to act on.
    const signalCount = score >= 70 ? 5 : score >= 45 ? 7 : 10
    const topJobSignals = topJobKeywords(jobFreq, signalCount + 20)
        .filter(({ word }) => allSkillAliases.has(word) && !cvKeywords.has(word))
        .slice(0, signalCount)

    // ── 11. Persona & summary ─────────────────────────────────────────────────
    const topMissing = missing.filter(m => m.priority === "high").slice(0, 2).map(m => m.label)
    const topMatched = matched.slice(0, 2).map(getSkillLabel)
    // yearsOnCV === 0 means no signals found, not literally zero experience — avoid misleading "you have 0y"
    const expNote = yearsRequired > 0
        ? yearsOnCV === 0
            ? `The role asks for ${yearsRequired}y — experience not stated on CV.`
            : yearsOnCV >= yearsRequired
                ? `Your ${yearsOnCV}y experience meets the ${yearsRequired}y requirement.`
                : `The role asks for ${yearsRequired}y — you have ${yearsOnCV}y.`
        : ""

    let persona: AnalysisResult["persona"]
    // Tiers match the UI (Next Steps card, history colours, FAQ): 70+ strong, 45–69 competitive, < 45 gaps
    if (score >= 80) {
        persona = {
            label: "Top Candidate",
            desc: `Strong alignment — ${topMatched.length > 0 ? topMatched.join(" & ") + " are solid matches. " : ""}${topMissing.length > 0 ? `Adding ${topMissing.join(" & ")} would make you near-perfect for this role. ` : ""}${expNote}`,
            color: "text-emerald-400",
        }
    } else if (score >= 70) {
        persona = {
            label: "Strong Contender",
            desc: `Competitive profile — ${topMatched.length > 0 ? topMatched.join(" & ") + " match well. " : ""}${topMissing.length > 0 ? `This job heavily emphasises ${topMissing.join(" & ")} which aren't prominent on your CV. ` : ""}${expNote}`,
            color: "text-violet-400",
        }
    } else if (score >= 45) {
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
    if (cvText.length > 200_000) throw new Error("Input text too large")
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
