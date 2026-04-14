import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Agent Orchestration",
  description: "CVXray's marketing and pre-push agent system — a weekly marketing team and a 7-agent pre-push gate that runs on every deploy.",
  robots: { index: false },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const marketingAgents = [
  {
    id: "ceo",
    role: "CEO",
    icon: "👑",
    color: "violet",
    schedule: "On demand",
    responsibility: "Sets quarterly goals & approves strategy",
    skills: ["strategic-planning", "task-management"],
    reportsTo: null,
  },
  {
    id: "cmo",
    role: "CMO",
    icon: "📣",
    color: "blue",
    schedule: "Monday 9am",
    responsibility: "Translates CEO goals into weekly marketing priorities",
    skills: ["web-search", "vercel-analytics", "task-management", "strategic-planning"],
    reportsTo: "ceo",
  },
  {
    id: "content-seo",
    role: "Content & SEO",
    icon: "✍️",
    color: "green",
    schedule: "Tuesday 9am",
    responsibility: "Writes weekly article, Twitter thread, LinkedIn post, SEO fixes",
    skills: ["web-search", "web-fetch", "seo-analysis", "content-writing", "file-edit"],
    reportsTo: "cmo",
  },
  {
    id: "social-community",
    role: "Social & Community",
    icon: "💬",
    color: "yellow",
    schedule: "Daily 8am",
    responsibility: "Reddit engagement, Twitter/LinkedIn posts, directory monitoring",
    skills: ["web-search", "reddit-engagement", "twitter-post", "linkedin-post", "community-monitoring"],
    reportsTo: "cmo",
  },
  {
    id: "growth-analytics",
    role: "Growth & Analytics",
    icon: "📊",
    color: "orange",
    schedule: "Friday 4pm",
    responsibility: "Vercel Analytics report, conversion funnel, growth experiments",
    skills: ["vercel-analytics", "web-search", "web-fetch", "data-analysis", "competitive-monitoring"],
    reportsTo: "cmo",
  },
];

const weekdayCadence = [
  { day: "Mon", agent: "CMO", icon: "📣", task: "Set weekly priorities", color: "blue" },
  { day: "Tue", agent: "Content & SEO", icon: "✍️", task: "Publish article + SEO audit", color: "green" },
  { day: "Wed", agent: "Social & Community", icon: "💬", task: "Reddit + social engagement", color: "yellow" },
  { day: "Thu", agent: "Social & Community", icon: "💬", task: "Reddit + social engagement", color: "yellow" },
  { day: "Fri", agent: "Growth & Analytics", icon: "📊", task: "Weekly growth report", color: "orange" },
];

const gateAgents = [
  { icon: "🔐", label: "Security", subtitle: "Injection, SSRF, secrets", type: "gate" },
  { icon: "🧪", label: "QA", subtitle: "Null paths, race conditions", type: "gate" },
  { icon: "🔌", label: "API", subtitle: "Input validation, response hygiene", type: "gate" },
  { icon: "🎨", label: "UI/UX", subtitle: "Mobile, a11y, user journey", type: "gate" },
  { icon: "🌐", label: "Browser QA", subtitle: "Console errors, Web Vitals", type: "gate" },
  { icon: "🔍", label: "SEO", subtitle: "Checks + actively improves", type: "improve" },
  { icon: "🧮", label: "Math Prof", subtitle: "Score formula + ranking", type: "improve" },
];

// ── Color helpers ─────────────────────────────────────────────────────────────

const agentColors: Record<string, { border: string; bg: string; badge: string; dot: string }> = {
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    dot: "bg-violet-400",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/20",
    dot: "bg-blue-400",
  },
  green: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  yellow: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    dot: "bg-amber-400",
  },
  orange: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/20",
    dot: "bg-orange-400",
  },
};

const dayColors: Record<string, string> = {
  blue: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  yellow: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  orange: "border-orange-500/40 bg-orange-500/10 text-orange-300",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OrchestrationPage() {
  return (
    <main className="min-h-screen bg-[oklch(0.08_0_0)] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-1">
            CVXray · Agent Orchestration
          </p>
          <h1 className="text-3xl font-black text-white">
            Orchestration Dashboard
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Two agent systems — a marketing team on a weekly cadence and a pre-push gate that runs on every deploy.
            All agents use the <code className="text-cyan-300 bg-white/5 px-1 rounded">paperclip</code> skill for Orkestra coordination.
          </p>
        </div>

        {/* ── Marketing Team ───────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            label="Marketing Team"
            description="Organic growth through SEO, community, and content — zero ad spend."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {marketingAgents.map((agent) => {
              const c = agentColors[agent.color];
              return (
                <Card
                  key={agent.id}
                  className={`border ${c.border} ${c.bg} bg-transparent`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{agent.icon}</span>
                      <div>
                        <CardTitle className="text-white text-sm">{agent.role}</CardTitle>
                        <CardDescription className="text-white/40 text-xs">
                          {agent.schedule}
                        </CardDescription>
                      </div>
                      <span className="ml-auto flex items-center gap-1 text-xs text-white/30">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                        paperclip
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-white/60 leading-relaxed">
                      {agent.responsibility}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {agent.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.badge}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {agent.reportsTo && (
                      <p className="text-[10px] text-white/25">
                        Reports to:{" "}
                        <span className="text-white/40 font-medium uppercase tracking-wide">
                          {agent.reportsTo}
                        </span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Weekly Cadence ───────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            label="Weekly Cadence"
            description="How the marketing agents hand off work each week."
          />
          <div className="mt-4 grid grid-cols-5 gap-2">
            {weekdayCadence.map(({ day, agent, icon, task, color }) => (
              <div
                key={day}
                className={`rounded-xl border p-3 text-center space-y-1 ${dayColors[color]}`}
              >
                <p className="text-xs font-black tracking-widest uppercase opacity-60">{day}</p>
                <p className="text-xl">{icon}</p>
                <p className="text-[10px] font-semibold">{agent}</p>
                <p className="text-[10px] opacity-70 leading-tight">{task}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[10px] text-white/30">
            <span>── Content & SEO passes articles to Social &amp; Community (dashed handoff)</span>
            <span>── Growth Analytics report feeds back to CMO on Monday</span>
          </div>
        </section>

        {/* ── Pre-Push Gate ────────────────────────────────────────────────── */}
        <section>
          <SectionHeading
            label="Pre-Push Gate"
            description="7 agents run in sequence before every git push. One 🔴 blocks the push."
          />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {gateAgents.map((agent, i) => (
              <div key={agent.label} className="flex items-center gap-2">
                <div
                  className={`rounded-xl border px-4 py-3 text-center min-w-[100px] ${
                    agent.type === "improve"
                      ? "border-cyan-500/30 bg-cyan-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <p className="text-xl">{agent.icon}</p>
                  <p className="text-xs font-semibold text-white/80 mt-1">{agent.label}</p>
                  <p className="text-[10px] text-white/35 mt-0.5 leading-tight">{agent.subtitle}</p>
                  {agent.type === "improve" && (
                    <span className="mt-1 inline-block text-[9px] font-bold text-cyan-400 tracking-wide uppercase">
                      + improves
                    </span>
                  )}
                </div>
                {i < gateAgents.length - 1 && (
                  <span className="text-white/20 text-lg">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Verdict */}
          <div className="mt-4 flex gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm font-semibold text-emerald-400">
              ✅ SAFE TO PUSH
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2 text-sm font-semibold text-red-400">
              🔴 BLOCKED — fix before pushing
            </div>
          </div>
        </section>

        {/* ── Orkestra note ────────────────────────────────────────────────── */}
        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">
            Orchestration Layer
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            All agents carry the{" "}
            <code className="text-cyan-300 bg-white/5 px-1 rounded">paperclip</code> skill —
            this is the Orkestra coordination primitive that enables agent-to-agent task handoff,
            scheduling, and shared context. Marketing-specific skills (
            <code className="text-white/40 bg-white/5 px-1 rounded">reddit-engagement</code>,{" "}
            <code className="text-white/40 bg-white/5 px-1 rounded">vercel-analytics</code>, etc.)
            extend each agent&apos;s capabilities on top of the base orchestration.
          </p>
        </section>

      </div>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeading({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="border-b border-white/8 pb-2">
      <h2 className="text-base font-bold text-white">{label}</h2>
      <p className="text-xs text-white/40 mt-0.5">{description}</p>
    </div>
  );
}
