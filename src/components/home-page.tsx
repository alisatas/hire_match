import Link from "next/link";
import CVAnalyzer from "@/components/features/cv-analyzer";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { LOCALE_INFO, fmt, getDictionary, type Locale } from "@/lib/i18n";
import { ROLES } from "@/lib/roles";
import { jsonLdScript } from "@/lib/site";
import { ArrowRight, ChevronDown, FileText, Gauge, Link2, Lock, ShieldCheck, Zap } from "lucide-react";

const STEP_ICONS = [FileText, Link2, Gauge];
const BULLET_ICONS = [Lock, Zap, ShieldCheck];

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

/**
 * The home page in one language. English renders it at "/", the translations at
 * "/tr", "/de", "/es" and "/zh" — same layout, strings from src/lib/i18n.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home;
  const faqs = dict.faqs;
  const inLanguage = LOCALE_INFO[locale].htmlLang;
  // Role guides and articles exist in English only; say so next to links that lead there
  const englishNote = dict.nav.inEnglish ? ` (${dict.nav.inEnglish})` : "";

  // Home-page-only structured data. HowTo used to sit in the root layout, which emitted
  // it on every route — including the role guides, where no such steps are shown.
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        inLanguage,
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "HowTo",
        inLanguage,
        name: t.howToName,
        description: t.howToDescription,
        step: t.steps.map((step) => ({ "@type": "HowToStep", name: step.title, text: step.text })),
        tool: [{ "@type": "HowToTool", name: t.howToTool }],
        totalTime: "PT1M",
      },
    ],
  };

  return (
    <div className="relative z-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homeJsonLd) }}
      />

      <SiteHeader locale={locale} />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-14 lg:pb-10">
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-foreground text-balance sm:text-5xl lg:text-6xl">
            {t.h1a}{" "}
            <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">{t.h1b}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">
            {t.lead}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            {t.bullets.map((bullet, i) => {
              const Icon = BULLET_ICONS[i % BULLET_ICONS.length];
              return <li key={bullet} className="inline-flex items-center gap-1.5"><Icon className="size-3.5 text-primary" />{bullet}</li>;
            })}
          </ul>
        </section>

        <CVAnalyzer locale={locale} t={dict.analyzer} coffee={dict.coffee} />

        {/* How it works + how the score works — one compact section */}
        <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl">
            {t.howTitle}
          </h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {t.steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-foreground/[0.03] text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      <span className="mr-1.5 tabular-nums text-muted-foreground">{i + 1}.</span>{step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          {/* The score in one line; the full explanation lives in the guide */}
          <p id="match-score" className="mx-auto mt-6 flex max-w-4xl scroll-mt-20 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{t.scoreLabel}</span>
            <span>{t.skills} <strong className="font-semibold text-foreground">50%</strong></span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>{t.keywords} <strong className="font-semibold text-foreground">35%</strong></span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span>{t.experience} <strong className="font-semibold text-foreground">15%</strong></span>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span><strong className="font-semibold text-foreground">70%+</strong> {t.strong}</span>
            <Link href="/blog/what-is-a-good-cv-match-score" hrefLang="en" className="inline-flex min-h-11 items-center gap-1 font-medium text-primary hover:underline sm:min-h-0">
              {t.details}{englishNote} <ArrowRight className="size-3.5" />
            </Link>
          </p>
        </section>

        {/* Resume keywords by role — six featured guides, the rest one click away */}
        <section id="roles" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{t.rolesTitle}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.rolesLead}{englishNote}</p>
            </div>
            <Link href="/resume-keywords" hrefLang="en" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              {fmt(t.rolesAll, { n: ROLES.length })} <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.filter((role) => FEATURED_ROLES.includes(role.slug)).map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/resume-keywords/${role.slug}`}
                  hrefLang="en"
                  className="group flex h-full min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-primary/40"
                >
                  <span lang="en" className="text-[15px] font-medium tracking-tight text-foreground">{role.name}</span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — the first questions open on the page, the rest behind "More questions".
            Every question stays in the FAQPage structured data above. */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 pb-24 pt-20 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{t.faqTitle}</h2>
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/60">
            {faqs.slice(0, FAQ_VISIBLE).map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
            {faqs.length > FAQ_VISIBLE && (
              <details className="group/more">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-center gap-2 px-5 py-4 text-sm font-medium text-primary transition-colors hover:bg-foreground/[0.02] [&::-webkit-details-marker]:hidden">
                  <span className="group-open/more:hidden">{fmt(t.moreQuestions, { n: faqs.length - FAQ_VISIBLE })}</span>
                  <span className="hidden group-open/more:inline">{t.fewerQuestions}</span>
                  <ChevronDown className="size-4 transition-transform duration-200 group-open/more:rotate-180" />
                </summary>
                <div className="divide-y divide-border border-t border-border">
                  {faqs.slice(FAQ_VISIBLE).map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
              </details>
            )}
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
