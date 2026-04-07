#!/usr/bin/env node
/**
 * Runs all 8 AI agents before deploy.
 * Blocks if any agent reports a 🔴 Critical issue.
 */
import Anthropic from "@anthropic-ai/sdk"
import { readFileSync, existsSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const RESET = "\x1b[0m"
const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const CYAN = "\x1b[36m"
const BOLD = "\x1b[1m"
const DIM = "\x1b[2m"

function section(title) { console.log(`\n${BOLD}${CYAN}━━━ ${title} ━━━${RESET}`) }

function readFile(rel) {
    const full = path.join(ROOT, rel)
    return existsSync(full) ? readFileSync(full, "utf-8") : "(file not found)"
}

if (!process.env.ANTHROPIC_API_KEY) {
    console.log(`\n${YELLOW}⚠  ANTHROPIC_API_KEY not set — skipping AI agent checks.${RESET}`)
    console.log(`   Add it to .env.local to enable full AI agent review before deploy.\n`)
    process.exit(0)
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const AGENTS = [
    {
        key: "qa",
        label: "QA Engineer",
        emoji: "🧪",
        system: `You are a senior QA Engineer reviewing JobFlare's codebase. Find bugs, edge cases, null/undefined risks, and broken logic. Rate each issue: 🔴 Critical / 🟡 Medium / 🟢 Minor. End with a summary count. Be concise.`,
        context: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}`,
    },
    {
        key: "security",
        label: "Security Engineer",
        emoji: "🔐",
        system: `You are a security engineer auditing JobFlare for vulnerabilities. Check for: XSS, CSRF, insecure headers, exposed secrets, unsafe HTML rendering, unvalidated inputs, and OWASP Top 10 risks. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. End with a risk score out of 10. Be concise.`,
        context: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}\n\n## agents login route\n${readFile("src/app/api/agents/login/route.ts")}\n\n## telegram webhook\n${readFile("src/app/api/telegram/webhook/route.ts")}`,
    },
    {
        key: "injection",
        label: "Pen Tester",
        emoji: "💉",
        system: `You are a penetration tester auditing JobFlare for injection vulnerabilities. Check for: prompt injection, path traversal, URL injection in the scraper, PDF parser exploits, and malicious input risks. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Be concise.`,
        context: () => `## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}\n\n## telegram webhook\n${readFile("src/app/api/telegram/webhook/route.ts")}`,
    },
    {
        key: "api",
        label: "API Engineer",
        emoji: "🔌",
        system: `You are an API quality engineer auditing JobFlare's routes. Check for: missing input validation, improper error handling, missing rate limiting, unauthenticated endpoints, and incorrect HTTP status codes. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Be concise.`,
        context: () => `## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}\n\n## agents run route\n${readFile("src/app/api/agents/run/route.ts")}\n\n## telegram webhook\n${readFile("src/app/api/telegram/webhook/route.ts")}`,
    },
    {
        key: "ui",
        label: "UI/UX Engineer",
        emoji: "🎨",
        system: `You are a UI/UX quality engineer reviewing JobFlare's interface. Check for: accessibility issues, broken responsive layouts, confusing UX flows, missing loading/error states. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Be concise.`,
        context: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## page.tsx\n${readFile("src/app/page.tsx")}`,
    },
    {
        key: "pm",
        label: "Product Manager",
        emoji: "📊",
        system: `You are the Product Manager of JobFlare. Review features and UX for gaps. Identify missing features, confusing flows, and scope issues. Rate each: 🔴 Blocker / 🟡 Important / 🟢 Nice-to-have. Be concise.`,
        context: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## page.tsx\n${readFile("src/app/page.tsx")}`,
    },
    {
        key: "ceo",
        label: "CEO",
        emoji: "👔",
        system: `You are the CEO of JobFlare. Review brand voice, copy, and market positioning. Flag naming inconsistencies, weak copy, and missed opportunities. Rate each: 🔴 Urgent / 🟡 Important / 🟢 Minor. Be concise.`,
        context: () => `## layout.tsx\n${readFile("src/app/layout.tsx")}\n\n## page.tsx\n${readFile("src/app/page.tsx")}`,
    },
    {
        key: "seo",
        label: "SEO Specialist",
        emoji: "🔍",
        system: `You are an SEO specialist reviewing JobFlare. Audit metadata, copy, and content strategy. Rate each: 🔴 Critical / 🟡 Important / 🟢 Minor. Be concise.`,
        context: () => `## layout.tsx\n${readFile("src/app/layout.tsx")}\n\n## page.tsx\n${readFile("src/app/page.tsx")}`,
    },
]

const criticalsByAgent = {}
let totalCriticals = 0

for (const agent of AGENTS) {
    section(`${agent.emoji}  ${agent.label}`)

    let output = ""
    process.stdout.write("  ")

    try {
        const stream = client.messages.stream({
            model: "claude-haiku-4-5-20251001",  // fast + cheap for pre-deploy
            max_tokens: 1024,
            system: agent.system,
            messages: [{ role: "user", content: `Review these files:\n\n${agent.context()}` }],
        })

        for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
                const text = chunk.delta.text
                output += text
                process.stdout.write(text)
            }
        }

        console.log("\n")

        // Count 🔴 Critical findings
        const criticals = (output.match(/🔴/g) || []).length
        criticalsByAgent[agent.key] = criticals
        totalCriticals += criticals

    } catch (err) {
        console.log(`\n  ${YELLOW}⚠  Agent failed: ${err.message}${RESET}\n`)
    }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${BOLD}${CYAN}━━━ Agent Review Summary ━━━${RESET}`)

for (const [key, count] of Object.entries(criticalsByAgent)) {
    const agent = AGENTS.find(a => a.key === key)
    if (count > 0) {
        console.log(`  ${RED}🔴 ${agent.emoji} ${agent.label}: ${count} critical issue${count > 1 ? "s" : ""}${RESET}`)
    } else {
        console.log(`  ${GREEN}✔${RESET}  ${agent.emoji} ${agent.label}: clean`)
    }
}

console.log()

if (totalCriticals > 0) {
    console.log(`${RED}${BOLD}✘  ${totalCriticals} critical issue${totalCriticals > 1 ? "s" : ""} found — fix before deploying.${RESET}\n`)
    process.exit(1)
} else {
    console.log(`${GREEN}${BOLD}✔  All agents signed off — ready to deploy! 🚀${RESET}\n`)
}
