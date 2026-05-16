import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"
import { NextRequest } from "next/server"
import { AGENTS, type AgentKey } from "@/lib/agents-config"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req: NextRequest) {
    let body: { agentKey?: string; swarm?: AgentKey[] }
    try {
        body = await req.json()
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
    }

    const { agentKey, swarm } = body

    // ── Swarm mode: run agents sequentially, multiplexed over one SSE stream ──
    if (swarm && Array.isArray(swarm)) {
        const valid = swarm.filter((k): k is AgentKey => k in AGENTS)
        if (valid.length === 0) {
            return new Response(JSON.stringify({ error: "No valid agent keys in swarm" }), { status: 400 })
        }

        const encoder = new TextEncoder()
        const stream = new ReadableStream({
            async start(controller) {
                const send = (data: object) =>
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))

                send({ type: "swarm_start", agents: valid.map(k => ({ key: k, label: AGENTS[k].label, emoji: AGENTS[k].emoji })) })

                for (const key of valid) {
                    const agent = AGENTS[key]
                    send({ type: "agent_start", key, label: agent.label, emoji: agent.emoji })

                    try {
                        const context = agent.getContext()
                        const result = streamText({
                            model: anthropic("claude-haiku-4-5-20251001"),
                            system: agent.system,
                            messages: [{ role: "user", content: `Please run your full audit now.\n\n${context}` }],
                            maxOutputTokens: 1200,
                        })

                        for await (const chunk of result.textStream) {
                            send({ type: "agent_chunk", key, text: chunk })
                        }
                        send({ type: "agent_done", key })
                    } catch (err) {
                        send({ type: "agent_error", key, error: String(err) })
                    }
                }

                send({ type: "swarm_done" })
                controller.close()
            },
        })

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                "X-Accel-Buffering": "no",
            },
        })
    }

    // ── Single agent mode ─────────────────────────────────────────────────────
    if (!agentKey || !(agentKey in AGENTS)) {
        return new Response(
            JSON.stringify({ error: `Unknown agent. Valid keys: ${Object.keys(AGENTS).join(", ")}` }),
            { status: 400 },
        )
    }

    const agent = AGENTS[agentKey as AgentKey]
    const context = agent.getContext()

    const result = streamText({
        model: anthropic("claude-haiku-4-5-20251001"),
        system: agent.system,
        messages: [{ role: "user", content: `Please run your full audit now.\n\n${context}` }],
        maxOutputTokens: 1200,
    })

    return result.toTextStreamResponse()
}
