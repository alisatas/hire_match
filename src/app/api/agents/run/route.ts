import { NextRequest } from "next/server"
import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { readFileSync, existsSync } from "fs"
import path from "path"

function readFile(rel: string) {
    const full = path.join(process.cwd(), rel)
    return existsSync(full) ? readFileSync(full, "utf-8") : "(file not found)"
}

const AGENTS = {
    ceo: {
        system: `You are the CEO of JobFlare, a CV matching SaaS product. Review the product's brand voice, copy, and market positioning. Identify naming inconsistencies (e.g. "CV Scorer" vs "JobFlare"), weak copy, and brand opportunities. Use bullet points. End with a prioritized action list.`,
        getContext: () => `## layout.tsx\n${readFile("src/app/layout.tsx")}\n\n## page.tsx\n${readFile("src/app/page.tsx")}`,
    },
    pm: {
        system: `You are the Product Manager of JobFlare. Review the feature set and UX for quality gaps. Identify missing features, confusing flows, and scope issues. Suggest prioritized improvements with reasoning. Use bullet points.`,
        getContext: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}`,
    },
    qa: {
        system: `You are a senior QA Engineer reviewing JobFlare's codebase. Find bugs, edge cases, null/undefined risks, and broken logic. Rate each issue: 🔴 Critical / 🟡 Medium / 🟢 Minor. End with a summary count.`,
        getContext: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}`,
    },
    security: {
        system: `You are a security engineer auditing JobFlare for vulnerabilities. Check for: XSS, CSRF, insecure headers, exposed secrets, unsafe HTML rendering, unvalidated inputs, cookie security, and OWASP Top 10 risks. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Be specific with file and line references. End with a risk score out of 10.`,
        getContext: () => `## cv-analyzer.tsx\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}\n\n## agents login route\n${readFile("src/app/api/agents/login/route.ts")}\n\n## proxy.ts\n${readFile("src/proxy.ts")}\n\n## next.config.ts\n${readFile("next.config.ts")}`,
    },
    injection: {
        system: `You are a penetration tester auditing JobFlare for injection vulnerabilities. Check for: prompt injection (in AI calls), SQL injection, command injection, path traversal, URL injection in the scraper, PDF parser exploits, and malicious payload risks in user inputs. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Suggest concrete mitigations for each finding.`,
        getContext: () => `## cv-analyzer.tsx (user inputs)\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## scrape route (URL input)\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route (file input)\n${readFile("src/app/api/extract-pdf/route.ts")}\n\n## agents run route (AI prompt)\n${readFile("src/app/api/agents/run/route.ts")}`,
    },
    api: {
        system: `You are an API quality engineer auditing JobFlare's API routes. Check for: missing input validation, improper error handling, missing rate limiting, unauthenticated endpoints, incorrect HTTP status codes, large payload risks, and missing response sanitization. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Suggest fixes.`,
        getContext: () => `## scrape route\n${readFile("src/app/api/scrape/route.ts")}\n\n## extract-pdf route\n${readFile("src/app/api/extract-pdf/route.ts")}\n\n## agents login route\n${readFile("src/app/api/agents/login/route.ts")}\n\n## agents run route\n${readFile("src/app/api/agents/run/route.ts")}`,
    },
    ui: {
        system: `You are a UI/UX quality engineer reviewing JobFlare's interface. Check for: accessibility issues (missing aria labels, keyboard nav, color contrast), broken responsive layouts, confusing UX flows, missing loading/error states, poor mobile experience, and visual inconsistencies. Rate each: 🔴 Critical / 🟡 Medium / 🟢 Low. Be specific.`,
        getContext: () => `## cv-analyzer.tsx (main UI)\n${readFile("src/components/features/cv-analyzer.tsx")}\n\n## page.tsx (home page)\n${readFile("src/app/page.tsx")}\n\n## layout.tsx\n${readFile("src/app/layout.tsx")}`,
    },
    seo: {
        system: `You are an SEO specialist reviewing JobFlare. Audit metadata, copy, structured data, and content strategy. Identify keyword gaps, weak descriptions, and content improvements. Use bullet points.`,
        getContext: () => `## layout.tsx\n${readFile("src/app/layout.tsx")}\n\n## page.tsx\n${readFile("src/app/page.tsx")}\n\n## robots.txt\n${readFile("public/robots.txt")}`,
    },
}

export async function POST(req: NextRequest) {
    const { agent } = await req.json()
    const config = AGENTS[agent as keyof typeof AGENTS]

    if (!config) return new Response("Unknown agent", { status: 400 })

    if (!process.env.ANTHROPIC_API_KEY) {
        return new Response("❌ ANTHROPIC_API_KEY is not set in .env.local — add it to use agents.", { status: 500 })
    }

    const result = streamText({
        model: anthropic("claude-sonnet-4.6"),
        system: config.system,
        prompt: `Review the following project files:\n\n${config.getContext()}`,
    })

    return result.toTextStreamResponse()
}
