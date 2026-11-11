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

// The six guides shown on the home page; the rest are one click away on /resume-keywords
const FEATURED_ROLES = ["ai-engineer", "software-engineer", "data-analyst", "product-manager", "account-executive", "digital-marketing-specialist"]
// Questions shown open-ended on the page; the rest sit behind "More questions" (all stay in the FAQ structured data)
const FAQ_VISIBLE = 6



function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:bg-foreground/[0.02] [&::-webkit-details-marker]:hidden">
        {q}
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">{a}</p>
    </details>
  );
}

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

        {/* How it works + how the score works — one compact section */}
        <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl">
            From CV to clear next steps in under a minute
          </h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-foreground/[0.03] text-primary">
                  <step.icon className="size-4" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                    <span className="mr-1.5 tabular-nums text-muted-foreground">{i + 1}.</span>{step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          {/* The score in one line; the full explanation lives in the guide */}
          <p id="match-score" className="mx-auto mt-6 flex max-w-4xl scroll-mt-20 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-muted-foreground">
            <span className="font-medium text-foreground">How the score works:</span>
            <span>Skills <strong className="font-semibold text-foreground">50%</strong></span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>Keywords <strong className="font-semibold text-foreground">35%</strong></span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>Experience <strong className="font-semibold text-foreground">15%</strong></span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span><strong className="font-semibold text-foreground">70%+</strong> is a strong match</span>
            <Link href="/blog/what-is-a-good-cv-match-score" className="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline sm:min-h-0">
              Details <ArrowRight className="size-3.5" />
            </Link>
          </p>
        </section>

        {/* Resume keywords by role — six featured guides, the rest one click away */}
        <section id="roles" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Resume keywords by role</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">What employers ask for most in your field.</p>
            </div>
            <Link href="/resume-keywords" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              All {ROLES.length} guides <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.filter((role) => FEATURED_ROLES.includes(role.slug)).map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/resume-keywords/${role.slug}`}
                  className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-primary/40"
                >
                  <span className="text-[15px] font-medium tracking-tight text-foreground">{role.name}</span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — the first questions open on the page, the rest behind "More questions".
            Every question stays in the FAQPage structured data above. */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 pb-24 pt-20 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Questions, answered</h2>
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/60">
            {FAQS.slice(0, FAQ_VISIBLE).map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
            {FAQS.length > FAQ_VISIBLE && (
              <details className="group/more">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-center gap-2 px-5 py-4 text-sm font-medium text-primary transition-colors hover:bg-foreground/[0.02] [&::-webkit-details-marker]:hidden">
                  <span className="group-open/more:hidden">More questions ({FAQS.length - FAQ_VISIBLE})</span>
                  <span className="hidden group-open/more:inline">Fewer questions</span>
                  <ChevronDown className="size-4 transition-transform duration-200 group-open/more:rotate-180" />
                </summary>
                <div className="divide-y divide-border border-t border-border">
                  {FAQS.slice(FAQ_VISIBLE).map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
              </details>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
