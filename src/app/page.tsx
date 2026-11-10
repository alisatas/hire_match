import Link from "next/link";
import CVAnalyzer from "@/components/features/cv-analyzer";
import { FAQS } from "@/lib/faqs";
import { ArrowRight, ChevronDown, FileText, Gauge, Link2, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--foreground)_10%,transparent)_inset]">
        CV
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">CVXray</span>
    </span>
  );
}

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

export default function Home() {
  return (
    <div className="relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="CVXray home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-1">
            <a href="#how-it-works" className="hidden rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              How it works
            </a>
            <a href="#faq" className="hidden rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">
              FAQ
            </a>
            <a
              href="#analyzer"
              className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
            >
              Check my CV
              <ArrowRight className="size-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-14 lg:pb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Free CV-to-job match analysis
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-foreground text-balance sm:text-5xl lg:text-6xl">
            Does your CV{" "}
            <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">match the job?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">
            Upload your CV and drop in a job link. See how well you fit the role, which keywords you&apos;re missing, and free courses to close every gap.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <li className="inline-flex items-center gap-1.5"><Lock className="size-3.5 text-primary" />Private — nothing stored</li>
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
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-border sm:inline">|</span>
            <span>&copy; 2026 · Nothing you upload is stored or shared.</span>
          </div>
          <nav aria-label="Footer" className="flex items-center gap-5">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
