import { NextRequest } from "next/server"
import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { createHash } from "crypto"
import { AGENTS } from "@/lib/agents-config"

function sessionToken(password: string): string {
    return createHash("sha256").update(password + (process.env.AGENTS_PASSWORD ?? "")).digest("hex")
}

export async function POST(req: NextRequest) {
    const { agent } = await req.json()
    const config = AGENTS[agent as keyof typeof AGENTS]

    if (!config) return new Response("Unknown agent", { status: 400 })

    const auth = req.cookies.get("agents-auth")?.value
    const expected = sessionToken(process.env.AGENTS_PASSWORD ?? "")
    if (auth !== expected) {
        return new Response("Unauthorized", { status: 401 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return new Response("Agents unavailable", { status: 503 })
    }

    const result = streamText({
        model: anthropic("claude-sonnet-4.6"),
        system: config.system,
        prompt: `Review the following project files:\n\n${config.getContext()}`,
    })

    return result.toTextStreamResponse()
}
