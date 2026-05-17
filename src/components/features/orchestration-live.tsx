"use client"

import { useCallback, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// ── Types ─────────────────────────────────────────────────────────────────────

type AgentStatus = "idle" | "running" | "done" | "error"

interface AgentMeta {
  key: string
  label: string
  emoji: string
  desc: string
  type?: "gate" | "improve"
}

// ── Gate agents that actually run via AI ──────────────────────────────────────

const GATE_AGENTS: AgentMeta[] = [
  { key: "security", label: "Security", emoji: "🔐", desc: "Injection, SSRF, secrets", type: "gate" },
  { key: "qa", label: "QA Engineer", emoji: "🧪", desc: "Null paths, race conditions", type: "gate" },
  { key: "api", label: "API Engineer", emoji: "🔌", desc: "Input validation, response hygiene", type: "gate" },
  { key: "ui", label: "UI/UX", emoji: "🎨", desc: "Mobile, a11y, user journey", type: "gate" },
  { key: "browser-qa", label: "Browser QA", emoji: "🌐", desc: "Console errors, Web Vitals", type: "gate" },
  { key: "seo", label: "SEO", emoji: "🔍", desc: "Checks + actively improves", type: "improve" },
]

const MARKETING_AGENTS: AgentMeta[] = [
  { key: "ceo", label: "CEO", emoji: "👑", desc: "Brand voice, copy & market positioning" },
  { key: "pm", label: "Product Manager", emoji: "📊", desc: "Feature gaps, UX flows & scope" },
]

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AgentStatus }) {
  const map: Record<AgentStatus, { label: string; cls: string }> = {
    idle:    { label: "idle",    cls: "bg-white/5 text-[#4d4d4d] border-white/10" },
    running: { label: "running", cls: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 animate-pulse" },
    done:    { label: "done ✓",  cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
    error:   { label: "error",   cls: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
  }
  const { label, cls } = map[status]
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
      {label}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function OrchestrationLive() {
  const [statuses, setStatuses] = useState<Record<string, AgentStatus>>({})
  const [outputs, setOutputs] = useState<Record<string, string>>({})
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [swarmRunning, setSwarmRunning] = useState(false)
  const outputRef = useRef<HTMLPreElement>(null)

  const setStatus = (key: string, s: AgentStatus) =>
    setStatuses(prev => ({ ...prev, [key]: s }))

  const appendOutput = (key: string, chunk: string) => {
    setOutputs(prev => ({ ...prev, [key]: (prev[key] ?? "") + chunk }))
    // auto-scroll
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    })
  }

  // ── Run single agent ───────────────────────────────────────────────────────
  const runAgent = useCallback(async (agentKey: string) => {
    if (swarmRunning || statuses[agentKey] === "running") return
    setStatus(agentKey, "running")
    setOutputs(prev => ({ ...prev, [agentKey]: "" }))
    setActivePanel(agentKey)

    try {
      const res = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentKey }),
      })
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        appendOutput(agentKey, dec.decode(value, { stream: true }))
      }
      setStatus(agentKey, "done")
    } catch (err) {
      appendOutput(agentKey, `\n[Error: ${err}]`)
      setStatus(agentKey, "error")
    }
  }, [swarmRunning, statuses])

  // ── Run swarm (all gate agents, SSE) ──────────────────────────────────────
  const runSwarm = useCallback(async () => {
    if (swarmRunning) return
    setSwarmRunning(true)
    const keys = GATE_AGENTS.map(a => a.key)
    keys.forEach(k => { setStatus(k, "idle"); setOutputs(prev => ({ ...prev, [k]: "" })) })

    try {
      const res = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swarm: keys }),
      })
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let buf = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += dec.decode(value, { stream: true })
        const lines = buf.split("\n")
        buf = lines.pop() ?? ""

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          try {
            const evt = JSON.parse(line.slice(6))
            if (evt.type === "agent_start") {
              setStatus(evt.key, "running")
              setActivePanel(evt.key)
            } else if (evt.type === "agent_chunk") {
              appendOutput(evt.key, evt.text)
            } else if (evt.type === "agent_done") {
              setStatus(evt.key, "done")
            } else if (evt.type === "agent_error") {
              appendOutput(evt.key, `\n[Error: ${evt.error}]`)
              setStatus(evt.key, "error")
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (err) {
      keys.forEach(k => { if (statuses[k] === "running") setStatus(k, "error") })
      console.error("Swarm error:", err)
    } finally {
      setSwarmRunning(false)
    }
  }, [swarmRunning, statuses])

  const anyRunning = swarmRunning || Object.values(statuses).includes("running")
  const panelAgent = activePanel ? [...GATE_AGENTS, ...MARKETING_AGENTS].find(a => a.key === activePanel) : null
  const panelOutput = activePanel ? (outputs[activePanel] ?? "") : ""

  return (
    <div className="space-y-10">

      {/* ── Gate Agents — live run section ──────────────────────────────────── */}
      <section>
        <div className="border-b border-white/8 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-silver">Pre-Push Gate — Live Run</h2>
            <p className="text-xs text-[#666666] mt-0.5">
              Powered by Ruflo multi-agent orchestration · Each agent reads real source files and audits live
            </p>
          </div>
          <button
            onClick={runSwarm}
            disabled={anyRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold
              bg-cyan-500/15 text-cyan-300 border border-cyan-500/30
              hover:bg-cyan-500/25 transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {swarmRunning ? (
              <><span className="animate-spin">⟳</span> Running swarm…</>
            ) : (
              <><span>⚡</span> Run all agents</>
            )}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GATE_AGENTS.map(agent => {
            const status = statuses[agent.key] ?? "idle"
            const isActive = activePanel === agent.key
            return (
              <Card
                key={agent.key}
                onClick={() => outputs[agent.key] && setActivePanel(agent.key)}
                className={`border transition-colors cursor-pointer
                  ${isActive
                    ? "border-cyan-500/50 bg-cyan-500/8"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15"}
                  ${agent.type === "improve" ? "border-l-2 border-l-cyan-500/40" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{agent.emoji}</span>
                      <div>
                        <CardTitle className="text-silver text-sm">{agent.label}</CardTitle>
                        <CardDescription className="text-[#595959] text-[11px]">{agent.desc}</CardDescription>
                      </div>
                    </div>
                    <StatusBadge status={status} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {agent.type === "improve" && (
                    <span className="text-[9px] font-bold text-cyan-400 tracking-wide uppercase mr-2">+ improves</span>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); runAgent(agent.key) }}
                    disabled={anyRunning}
                    className="mt-2 w-full py-1.5 rounded-md text-[11px] font-semibold
                      bg-white/5 text-[#808080] border border-white/8
                      hover:bg-white/10 hover:text-[#cccccc] transition-colors
                      disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {status === "running" ? "Running…" : "▶ Run agent"}
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ── Live output panel ────────────────────────────────────────────────── */}
      {(activePanel || swarmRunning) && (
        <section>
          <div className="border-b border-white/8 pb-2 flex items-center gap-3">
            <span className="text-lg">{panelAgent?.emoji ?? "📋"}</span>
            <div>
              <h2 className="text-base font-bold text-silver">
                {panelAgent ? `${panelAgent.label} — Output` : "Swarm Output"}
              </h2>
              <p className="text-xs text-[#666666]">Live agent analysis · Ruflo orchestration</p>
            </div>
            {activePanel && Object.keys(outputs).length > 1 && (
              <div className="ml-auto flex gap-1 flex-wrap">
                {[...GATE_AGENTS, ...MARKETING_AGENTS]
                  .filter(a => outputs[a.key] !== undefined)
                  .map(a => (
                    <button
                      key={a.key}
                      onClick={() => setActivePanel(a.key)}
                      className={`px-2 py-0.5 rounded text-[10px] border transition-colors
                        ${activePanel === a.key
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          : "bg-white/5 text-[#4d4d4d] border-white/10 hover:text-[#999999]"}`}
                    >
                      {a.emoji} {a.label}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <pre
            ref={outputRef}
            className="mt-3 rounded-xl border border-white/8 bg-black/40
              p-4 text-[11px] leading-relaxed text-emerald-300/90 font-mono
              max-h-[480px] overflow-y-auto whitespace-pre-wrap break-words"
          >
            {panelOutput || (
              <span className="text-[#333333] animate-pulse">
                {statuses[activePanel ?? ""] === "running" ? "Thinking…" : "Waiting for agent…"}
              </span>
            )}
          </pre>
        </section>
      )}

      {/* ── Marketing agents section ─────────────────────────────────────────── */}
      <section>
        <div className="border-b border-white/8 pb-2">
          <h2 className="text-base font-bold text-silver">Strategic Agents</h2>
          <p className="text-xs text-[#666666] mt-0.5">CEO + PM analysis agents · Run on demand</p>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MARKETING_AGENTS.map(agent => {
            const status = statuses[agent.key] ?? "idle"
            const isActive = activePanel === agent.key
            return (
              <Card
                key={agent.key}
                onClick={() => outputs[agent.key] && setActivePanel(agent.key)}
                className={`border transition-colors cursor-pointer
                  ${isActive ? "border-violet-500/50 bg-violet-500/5" : "border-violet-500/15 bg-violet-500/[0.03] hover:border-violet-500/30"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{agent.emoji}</span>
                      <div>
                        <CardTitle className="text-silver text-sm">{agent.label}</CardTitle>
                        <CardDescription className="text-[#595959] text-[11px]">{agent.desc}</CardDescription>
                      </div>
                    </div>
                    <StatusBadge status={status} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <button
                    onClick={e => { e.stopPropagation(); runAgent(agent.key) }}
                    disabled={anyRunning}
                    className="mt-2 w-full py-1.5 rounded-md text-[11px] font-semibold
                      bg-violet-500/10 text-violet-300/70 border border-violet-500/20
                      hover:bg-violet-500/20 hover:text-violet-300 transition-colors
                      disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {status === "running" ? "Running…" : "▶ Run agent"}
                  </button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

    </div>
  )
}