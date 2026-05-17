import type { Metadata } from "next";
import { OrchestrationLive } from "@/components/features/orchestration-live";
import DigitalLoomBackground from "@/components/ui/digital-loom-background";

export const metadata: Metadata = {
  title: "Agent Orchestration — CVXray",
  description: "Live multi-agent orchestration dashboard powered by Ruflo. Run security, QA, SEO, and analysis agents in real time.",
  robots: { index: false },
};

export default function OrchestrationPage() {
  return (
    <DigitalLoomBackground
      backgroundColor="#04050a"
      threadColor="rgba(6, 182, 212, 0.22)"
      threadCount={55}
    >
      {/* Scrollable content layer — sits above the canvas */}
      <div className="w-full h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

          {/* Header */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-1">
              CVXray · Agent Orchestration
            </p>
            <h1 className="text-3xl font-black text-silver">
              Orchestration Dashboard
            </h1>
            <p className="text-sm text-[#666666] mt-1 max-w-2xl">
              Live multi-agent system powered by{" "}
              <span className="text-cyan-300 font-semibold">Ruflo</span> —
              run the 7-agent pre-push gate, strategic analysis, and swarm mode in real time.
              Each agent reads live source files and returns a structured audit.
            </p>
          </div>

          {/* Ruflo badge */}
          <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 w-fit backdrop-blur-sm">
            <span className="text-xl">⚡</span>
            <div>
              <p className="text-xs font-bold text-cyan-300">Ruflo Multi-Agent Orchestration</p>
              <p className="text-[11px] text-[#666666]">
                300+ MCP tools · Swarm coordination · Vector memory · Hierarchical agent topology
              </p>
            </div>
            <a
              href="https://github.com/ruvnet/ruflo"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-[10px] text-[#404040] hover:text-[#808080] underline transition-colors"
            >
              ruflo ↗
            </a>
          </div>

          {/* Live orchestration */}
          <OrchestrationLive />

          {/* Weekly cadence */}
          <section>
            <div className="border-b border-white/8 pb-2">
              <h2 className="text-base font-bold text-silver">Marketing Cadence</h2>
              <p className="text-xs text-[#666666] mt-0.5">Scheduled agent handoffs — zero ad spend growth loop</p>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {[
                { day: "Mon", icon: "📣", agent: "CMO",          task: "Set weekly priorities",       cls: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
                { day: "Tue", icon: "✍️", agent: "Content & SEO", task: "Publish article + SEO audit", cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
                { day: "Wed", icon: "💬", agent: "Social",        task: "Reddit + social engagement",  cls: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
                { day: "Thu", icon: "💬", agent: "Social",        task: "Reddit + social engagement",  cls: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
                { day: "Fri", icon: "📊", agent: "Growth",        task: "Weekly growth report",        cls: "border-orange-500/40 bg-orange-500/10 text-orange-300" },
              ].map(({ day, icon, agent, task, cls }) => (
                <div key={day} className={`rounded-xl border p-3 text-center space-y-1 backdrop-blur-sm ${cls}`}>
                  <p className="text-xs font-black tracking-widest uppercase opacity-60">{day}</p>
                  <p className="text-xl">{icon}</p>
                  <p className="text-[10px] font-semibold">{agent}</p>
                  <p className="text-[10px] opacity-70 leading-tight">{task}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture note */}
          <section className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#4d4d4d] mb-2">
              Architecture
            </p>
            <p className="text-sm text-[#808080] leading-relaxed">
              Each agent call streams through{" "}
              <code className="text-cyan-300 bg-white/5 px-1 rounded">/api/orchestrate</code> →
              AI SDK + Anthropic claude-haiku → real-time SSE to the browser.
              Swarm mode runs agents sequentially via a single persistent stream,
              multiplexing agent chunks via SSE events. The Ruflo MCP server (registered in{" "}
              <code className="text-[#666666] bg-white/5 px-1 rounded">.mcp.json</code>) provides 300+
              coordination tools for memory, swarm topology, and agent lifecycle management.
            </p>
          </section>

          {/* Bottom padding for scroll */}
          <div className="h-8" />

        </div>
      </div>
    </DigitalLoomBackground>
  );
}
