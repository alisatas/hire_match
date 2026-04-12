import { NextRequest } from "next/server"
import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { AGENTS } from "@/lib/agents-config"

export async function POST(req: NextRequest) {
    const agentKey = process.env.AGENTS_KEY
    if (agentKey) {
        const incoming = req.headers.get("x-agent-key")
        if (incoming !== agentKey) {
            return new Response("Unauthorized", { status: 401 })
        }
    }

    const { agent } = await req.json()
    const config = AGENTS[agent as keyof typeof AGENTS]

    if (!config) return new Response("Unknown agent", { status: 400 })

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
