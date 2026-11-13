import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { LOCALE_INFO, alternatesFor, fmt, localePath, type Locale } from "@/lib/i18n";
import { getPages, getRole, getRoles } from "@/lib/i18n/content";
import { OG_IMAGE, SITE_URL, jsonLdScript } from "@/lib/site";

const pathOf = (slug: string) => `/resume-keywords/${slug}`;

/**
 * Google shows about 60 characters of a title and the layout adds " | CVXray" (9), so the
 * longest wording that still fits in 51 is used; long role names fell to 71–81 characters
 * and lost the brand in search results.
 */
function titleFor(candidates: string[], role: string): string {
  const filled = candidates.map((c) => fmt(c, { role }));
  return filled.find((t) => t.length + 9 <= 60) ?? filled[filled.length - 1];
}

export function roleGuideMetadata(locale: Locale, slug: string): Metadata {
  const role = getRole(locale, slug);
  if (!role) return {};
  const title = titleFor(getPages(locale).role.titles, role.name);
  const path = localePath(locale, pathOf(slug));
  return {
    title,
    description: role.metaDescription,
    alternates: { canonical: path, languages: alternatesFor(pathOf(slug)) },
    // English: the share image comes from the colocated opengraph-image.tsx (per-role card).
    // Translated guides use the site image.
    openGraph: {
      type: "article", siteName: "CVXray", locale: LOCALE_INFO[locale].ogLocale, url: path, title, description: role.metaDescription,
      ...(locale !== "en" && { images: [OG_IMAGE] }),
    },
    twitter: { card: "summary_large_image", title, description: role.metaDescription, ...(locale !== "en" && { images: [OG_IMAGE.url] }) },
  };
}

// A collapsed row: the title is always visible, the text opens on tap. Native <details>,
// so it works without JavaScript and the text stays in the HTML for search engines.
function Disclosure({ title, text, prefix }: { title: string; text: string; prefix?: string }) {
  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-4 text-left text-[15px] font-medium text-foreground transition-colors hover:bg-foreground/[0.02] [&::-webkit-details-marker]:hidden">
        {prefix && <span className="text-xs font-medium tabular-nums text-muted-foreground">{prefix}</span>}
        <span className="flex-1">{title}</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden />
      </summary>
      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">{text}</p>
    </details>
  );
}

/** One keyword guide, in one language. The caller has checked that the slug exists. */
export function RoleGuidePage({ locale, slug }: { locale: Locale; slug: string }) {
  const role = getRole(locale, slug);
  if (!role) return null;
  const pages = getPages(locale);
  const t = pages.role;
  const path = pathOf(slug);
  const home = localePath(locale);
  const indexPath = localePath(locale, "/resume-keywords");
  const url = `${SITE_URL}${localePath(locale, path)}`;
  // The role as it reads inside a sentence
  const inText = pages.lowercaseRole ? role.name.toLowerCase() : role.name;
  const others = getRoles(locale).filter((r) => r.slug !== role.slug);
  const analyzer = `${home}?ref=guide-${role.slug}#analyzer`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: fmt(t.h1, { role: role.name }),
        description: role.metaDescription,
        inLanguage: LOCALE_INFO[locale].htmlLang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Occupation", name: role.name, skills: role.groups.flatMap((g) => g.keywords).join(", ") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: `${SITE_URL}${home === "/" ? "" : home}` },
          { "@type": "ListItem", position: 2, name: pages.guides.breadcrumb, item: `${SITE_URL}${indexPath}` },
          { "@type": "ListItem", position: 3, name: role.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: LOCALE_INFO[locale].htmlLang,
        mainEntity: role.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader locale={locale} path={path} />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label={pages.breadcrumbLabel} className="-ml-1 flex flex-wrap items-center gap-x-1 text-[13px] text-muted-foreground">
          <Link href={home} className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-foreground">CVXray</Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <Link href={indexPath} className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-foreground">{pages.guides.breadcrumbShort}</Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span aria-current="page" className="text-foreground">{role.name}</span>
        </nav>

        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">
          {fmt(t.h1, { role: role.name })}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {fmt(t.alsoCalled, { names: role.alsoCalled.join(", ") })}
        </p>

        {/* Keywords first: it is what the visitor searched for. The longer reading
            (role background, tips, questions) sits below, collapsed but still in the HTML. */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {fmt(t.keywordsTitle, { role: inText })}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.keywordsNote}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {role.groups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-border bg-card/60 p-5">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.keywords.map((kw) => (
                    <li key={kw} className="rounded-md border border-border bg-foreground/[0.03] px-2 py-1 text-[13px] text-foreground">
                      {kw}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-primary/25 bg-primary/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-foreground">
            <strong className="font-semibold">{fmt(t.ctaQuestion, { role: inText })}</strong>{" "}
            {t.ctaText}
          </p>
          <Link
            href={analyzer}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.ctaButton}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {fmt(t.howTitle, { role: inText })}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{role.intro}</p>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/60">
            {role.tips.map((tip, i) => (
              <Disclosure key={tip.title} title={tip.title} text={tip.text} prefix={`0${i + 1}`} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.faqTitle}</h2>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/60">
            {role.faqs.map((faq) => (
              <Disclosure key={faq.q} title={faq.q} text={faq.a} />
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card/60 p-6 text-center sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground text-balance">
            {fmt(t.finalTitle, { role: inText })}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.finalText}</p>
          <Link
            href={analyzer}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.finalButton}
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <nav aria-label={t.othersLabel} className="mt-14">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">{t.othersTitle}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((r) => (
              <li key={r.slug}>
                <Link
                  href={localePath(locale, pathOf(r.slug))}
                  className="inline-flex min-h-11 items-center rounded-lg border border-border bg-card/60 px-3.5 text-sm text-foreground transition-colors hover:border-primary/40"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <SiteFooter locale={locale} path={path} />
    </div>
  );
}
