"use client"
import { useState } from "react"

const AGENTS = [
    {
        id: "ceo",
        emoji: "🏢",
        title: "CEO",
        subtitle: "Brand & Strategy",
        description: "Reviews brand voice, naming consistency, and market positioning.",
        color: "from-violet-500/20 to-purple-500/10 border-violet-500/30",
        badge: "bg-violet-500/20 text-violet-300",
    },
    {
        id: "pm",
        emoji: "📊",
        title: "Product Manager",
        subtitle: "Features & UX",
        description: "Audits feature gaps, confusing flows, and prioritizes improvements.",
        color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-300",
    },
    {
        id: "qa",
        emoji: "🕵️",
        title: "QA Engineer",
        subtitle: "Bugs & Edge Cases",
        description: "Finds bugs, null risks, broken logic, and rates issue severity.",
        color: "from-rose-500/20 to-pink-500/10 border-rose-500/30",
        badge: "bg-rose-500/20 text-rose-300",
    },
    {
        id: "seo",
        emoji: "🔍",
        title: "SEO Specialist",
        subtitle: "Metadata & Content",
        description: "Audits metadata, keyword gaps, structured data, and copy quality.",
        color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
        badge: "bg-emerald-500/20 text-emerald-300",
    },
    {
        id: "security",
        emoji: "🔐",
        title: "Security Engineer",
        subtitle: "Security Test",
        description: "Checks XSS, CSRF, exposed secrets, unsafe inputs, and OWASP Top 10.",
        color: "from-red-500/20 to-orange-500/10 border-red-500/30",
        badge: "bg-red-500/20 text-red-300",
    },
    {
        id: "injection",
        emoji: "💉",
        title: "Pen Tester",
        subtitle: "Injection Test",
        description: "Tests prompt injection, path traversal, URL injection, and PDF exploits.",
        color: "from-orange-500/20 to-yellow-500/10 border-orange-500/30",
        badge: "bg-orange-500/20 text-orange-300",
    },
    {
        id: "api",
        emoji: "🔌",
        title: "API Engineer",
        subtitle: "API Test",
        description: "Audits validation, rate limiting, auth, status codes, and error handling.",
        color: "from-sky-500/20 to-indigo-500/10 border-sky-500/30",
        badge: "bg-sky-500/20 text-sky-300",
    },
    {
        id: "ui",
        emoji: "🎨",
        title: "UI/UX Engineer",
        subtitle: "UI Test",
        description: "Reviews accessibility, responsive layout, loading states, and UX flows.",
        color: "from-pink-500/20 to-fuchsia-500/10 border-pink-500/30",
        badge: "bg-pink-500/20 text-pink-300",
    },
]

function AgentCard({ agent }: { agent: typeof AGENTS[0] }) {
    const [output, setOutput] = useState("")
    const [running, setRunning] = useState(false)
    const [done, setDone] = useState(false)

    const run = async () => {
        setOutput("")
        setDone(false)
        setRunning(true)

        const res = await fetch("/api/agents/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ agent: agent.id }),
        })

        if (!res.ok || !res.body) {
            setOutput("Error: " + (await res.text()))
            setRunning(false)
            return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
            const { done: streamDone, value } = await reader.read()
            if (streamDone) break
            setOutput(prev => prev + decoder.decode(value))
        }

        setRunning(false)
        setDone(true)
    }

    return (
        <div className={`bg-gradient-to-br ${agent.color} border rounded-2xl p-6 flex flex-col gap-4`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{agent.emoji}</span>
                    <div>
                        <h2 className="text-white font-black text-lg leading-tight">{agent.title}</h2>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${agent.badge}`}>{agent.subtitle}</span>
                    </div>
                </div>
                <button
                    onClick={run}
                    disabled={running}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-extrabold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {running ? "Running..." : done ? "Re-run ↺" : "Run Agent →"}
                </button>
            </div>

            <p className="text-white/50 text-xs">{agent.description}</p>

            {(running || output) && (
                <div className="bg-black/30 rounded-xl p-4 text-sm text-white/80 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto font-mono">
                    {output}
                    {running && <span className="inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse" />}
                </div>
            )}
        </div>
    )
}

export default function AgentsPage() {
    const [runningAll, setRunningAll] = useState(false)

    return (
        <div className="min-h-screen bg-[#0a0f0f] p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-white">🏢 Agent HQ</h1>
                        <p className="text-white/40 text-sm mt-1">Your AI company — run any agent to review the project</p>
                    </div>
                    <a href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">← Back to app</a>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {AGENTS.map(agent => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </div>
    )
}
