import type { Metadata } from "next";
import Link from "next/link";
import CVAnalyzer from "@/components/features/cv-analyzer";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { FAQS } from "@/lib/faqs";
import { ROLES } from "@/lib/roles";
import { jsonLdScript } from "@/lib/site";
import { ArrowRight, ChevronDown, FileText, Gauge, Link2, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";

// The canonical lives on each page (not the root layout) so sub-pages never
// inherit a canonical that points back at the home page.
export const metadata: Metadata = { alternates: { canonical: "/" } };

const STEPS = [
  {
    icon: FileText,
    title: "Add your CV",
    text: "Upload a PDF or paste the text. It is read once and never stored.",
  },
  {
    icon: Link2,
    title: "Add the job",
    text: "Paste a LinkedIn, Indeed or careers-page link — or the description itself.",
  },
  {
    icon: Gauge,
    title: "Get your report",
    text: "A match score, missing skills by priority, keywords to add and free courses.",
  },
];

const STEPS_LD = STEPS.map((step) => ({ "@type": "HowToStep", name: step.title, text: step.text }));

// Home-page-only structured data. HowTo used to sit in the root layout, which emitted
// it on every route — including the role guides, where no such steps are shown.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "HowTo",
      name: "How to check if your CV matches a job description",
      description: "Use CVXray to score your resume against any job description and find missing keywords.",
      step: STEPS_LD,
      tool: [{ "@type": "HowToTool", name: "CVXray — free CV matcher at cvxray.com" }],
      totalTime: "PT1M",
    },
  ],
};

// Mirrors the weights in src/lib/analyze.ts — update both together.
const SCORE_PARTS = [
  {
    weight: "50%",
    title: "Skills",
    text: "Skills the job names that also appear on your CV, across 40+ categories. Skills the posting repeats, or puts in its title, count for more.",
  },
  {
    weight: "35%",
    title: "Keywords",
    text: "The wording of the posting itself — the terms it uses most — compared with the wording of your CV.",
  },
  {
    weight: "15%",
    title: "Experience",
    text: "Years of experience on your CV against the years the job asks for. Leaving years off your CV is treated as unknown, not as zero.",
  },
];



export default function Home() {
  return (
    <div className="relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homeJsonLd) }}
      />

      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-14 lg:pb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Free CV &amp; resume matcher — no sign-up
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-foreground text-balance sm:text-5xl lg:text-6xl">
            Does your CV{" "}
            <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">match the job?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">
            Upload your CV and drop in a job link. See how well you fit the role, which keywords you&apos;re missing, and free courses to close every gap.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <li className="inline-flex items-center gap-1.5"><Lock className="size-3.5 text-primary" />Private — your CV is never stored</li>
            <li className="inline-flex items-center gap-1.5"><Zap className="size-3.5 text-primary" />Results in seconds</li>
            <li className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary" />No sign-up, no limits</li>
          </ul>
        </section>

        <CVAnalyzer />

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              From CV to clear next steps in under a minute
            </h2>
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-border bg-card/60 p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-foreground/[0.03] text-primary">
                    <step.icon className="size-4.5" />
                  </span>
                  <span className="text-xs font-medium tabular-nums text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* How the score is calculated */}
        <section id="match-score" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">The match score</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              How your CV match score is calculated
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              No black box. The score is a weighted comparison of your CV with the job description, built from
              three parts.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {SCORE_PARTS.map((part) => (
              <li key={part.title} className="rounded-2xl border border-border bg-card/60 p-6">
                <p className="text-3xl font-semibold tracking-tight tabular-nums text-primary">{part.weight}</p>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">{part.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{part.text}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground text-pretty">
            Missing a skill the posting mentions three or more times lowers the score further, and very short job
            descriptions or CVs are scored more cautiously. Results run from 5% to 95%:{" "}
            <strong className="font-semibold text-foreground">70% or more</strong> is a strong match,{" "}
            <strong className="font-semibold text-foreground">45–69%</strong> is competitive, and below 45% means
            there are significant gaps to close first.
          </p>
        </section>

        {/* Resume keywords by role — internal links to the role guides */}
        <section id="roles" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Keyword guides</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              Resume keywords by role
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              Not applying yet? See what employers ask for most in your field.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/resume-keywords/${role.slug}`}
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40"
                >
                  <span>
                    <span className="block text-[15px] font-semibold tracking-tight text-foreground">{role.name} resume keywords</span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      {role.groups[0].keywords.slice(0, 4).join(", ")}…
                    </span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — visible to users and identical to the FAQPage structured data */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 pb-28 pt-28 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Questions, answered</h2>
          </div>
          <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/60">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:bg-foreground/[0.02] [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
