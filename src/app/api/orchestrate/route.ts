import { anthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"
import { NextRequest } from "next/server"
import { AGENTS, type AgentKey } from "@/lib/agents-config"
import { isOwnerRequest } from "@/lib/server/auth"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req: NextRequest) {
    if (!isOwnerRequest(req)) {
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 })
    }

    let body: { agentKey?: string; swarm?: AgentKey[] }
    try {
        body = await req.json()
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
    }

    const { agentKey, swarm } = body

    // ── Swarm mode: run agents sequentially, multiplexed over one SSE stream ──
    if (swarm && Array.isArray(swarm)) {
        // Own-property check (not `in`, which also matches "toString", "__proto__"…),
        // de-duplicated and capped so one request cannot queue unbounded model calls
        const valid = [...new Set(swarm)].filter((k): k is AgentKey => typeof k === "string" && Object.hasOwn(AGENTS, k)).slice(0, 10)
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
                        console.error("Agent run failed:", key, err instanceof Error ? err.message : "unknown")
                        send({ type: "agent_error", key, error: "Agent run failed" })
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
    if (typeof agentKey !== "string" || !Object.hasOwn(AGENTS, agentKey)) {
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
