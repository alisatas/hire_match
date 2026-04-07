import { NextRequest } from "next/server"
import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { AGENTS } from "@/lib/agents-config"

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
