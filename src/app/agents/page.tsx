"use client"
import { useState } from "react"
import Link from "next/link"

const AGENTS = [
    {
        id: "ceo",
        emoji: "🏢",
        title: "CEO",
        subtitle: "Brand & Strategy",
        description: "Reviews brand voice, naming consistency, and market positioning.",
        color: "from-violet-500/20 to-purple-500/10 border-violet-500/30",
        badge: "bg-violet-500/20 text-violet-300",
        glow: "shadow-violet-500/20",
    },
    {
        id: "pm",
        emoji: "📊",
        title: "Product Manager",
        subtitle: "Features & UX",
        description: "Audits feature gaps, confusing flows, and prioritizes improvements.",
        color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-300",
        glow: "shadow-blue-500/20",
    },
    {
        id: "qa",
        emoji: "🕵️",
        title: "QA Engineer",
        subtitle: "Bugs & Edge Cases",
        description: "Finds bugs, null risks, broken logic, and rates issue severity.",
        color: "from-rose-500/20 to-pink-500/10 border-rose-500/30",
        badge: "bg-rose-500/20 text-rose-300",
        glow: "shadow-rose-500/20",
    },
    {
        id: "seo",
        emoji: "🔍",
        title: "SEO Specialist",
        subtitle: "Metadata & Content",
        description: "Audits metadata, keyword gaps, structured data, and copy quality.",
        color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
        badge: "bg-emerald-500/20 text-emerald-300",
        glow: "shadow-emerald-500/20",
    },
    {
        id: "security",
        emoji: "🔐",
        title: "Security Engineer",
        subtitle: "Security Test",
        description: "Checks XSS, CSRF, exposed secrets, unsafe inputs, and OWASP Top 10.",
        color: "from-red-500/20 to-orange-500/10 border-red-500/30",
        badge: "bg-red-500/20 text-red-300",
        glow: "shadow-red-500/20",
    },
    {
        id: "injection",
        emoji: "💉",
        title: "Pen Tester",
        subtitle: "Injection Test",
        description: "Tests prompt injection, path traversal, URL injection, and PDF exploits.",
        color: "from-orange-500/20 to-yellow-500/10 border-orange-500/30",
        badge: "bg-orange-500/20 text-orange-300",
        glow: "shadow-orange-500/20",
    },
    {
        id: "api",
        emoji: "🔌",
        title: "API Engineer",
        subtitle: "API Test",
        description: "Audits validation, rate limiting, auth, status codes, and error handling.",
        color: "from-sky-500/20 to-indigo-500/10 border-sky-500/30",
        badge: "bg-sky-500/20 text-sky-300",
        glow: "shadow-sky-500/20",
    },
    {
        id: "ui",
        emoji: "🎨",
        title: "UI/UX Engineer",
        subtitle: "UI Test",
        description: "Reviews accessibility, responsive layout, loading states, and UX flows.",
        color: "from-pink-500/20 to-fuchsia-500/10 border-pink-500/30",
        badge: "bg-pink-500/20 text-pink-300",
        glow: "shadow-pink-500/20",
    },
]

function AgentCard({ agent }: { agent: typeof AGENTS[0] }) {
    const [output, setOutput] = useState("")
    const [running, setRunning] = useState(false)
    const [done, setDone] = useState(false)
    const [error, setError] = useState("")

    const run = async () => {
        setOutput("")
        setError("")
        setDone(false)
        setRunning(true)

        try {
            const res = await fetch("/api/agents/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ agent: agent.id }),
            })

            if (!res.ok || !res.body) {
                const errText = await res.text()
                setError(errText || "Something went wrong. Check your API key.")
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

            setDone(true)
        } catch (e) {
            setError("Network error: " + String(e))
        }

        setRunning(false)
    }

    return (
        <div className={`bg-gradient-to-br ${agent.color} border rounded-2xl p-6 flex flex-col gap-4 shadow-lg ${agent.glow} transition-all duration-300 ${running ? "ring-2 ring-white/20" : ""}`}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
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
                    className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-extrabold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap border border-white/10"
                >
                    {running ? "⏳ Running..." : done ? "↺ Re-run" : "▶ Run Agent"}
                </button>
            </div>

            <p className="text-white/50 text-xs">{agent.description}</p>

            {/* Running indicator */}
            {running && !output && (
                <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 text-white/70">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-sm font-semibold">{agent.emoji} {agent.title} is analyzing the codebase...</span>
                    </div>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-300 text-sm font-semibold mb-1">❌ Error</p>
                    <p className="text-red-200/80 text-xs font-mono whitespace-pre-wrap">{error}</p>
                </div>
            )}

            {/* Output */}
            {output && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                            {done ? "✅ Report Complete" : "📡 Live Output"}
                        </p>
                        {done && (
                            <span className="text-xs text-white/30">{output.length} chars</span>
                        )}
                    </div>
                    <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white/85 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto font-mono">
                        {output}
                        {running && <span className="inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse" />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AgentsPage() {
    return (
        <div className="min-h-screen bg-[#0a0f0f] p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-white">🏢 Agent HQ</h1>
                        <p className="text-white/40 text-sm mt-1">Click <span className="text-white/70 font-bold">▶ Run Agent</span> on any card to get an AI review of the codebase</p>
                    </div>
                    <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">← Back to app</Link>
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
