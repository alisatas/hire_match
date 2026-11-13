import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { LOCALE_INFO, alternatesFor, fmt, localePath, type Locale } from "@/lib/i18n";
import { getPages, getRoles } from "@/lib/i18n/content";
import { OG_IMAGE, SITE_URL, jsonLdScript } from "@/lib/site";

const PATH = "/resume-keywords";

export function guidesIndexMetadata(locale: Locale): Metadata {
  const { title, description } = getPages(locale).guides;
  const path = localePath(locale, PATH);
  return {
    title,
    description,
    alternates: { canonical: path, languages: alternatesFor(PATH) },
    openGraph: { type: "website", siteName: "CVXray", locale: LOCALE_INFO[locale].ogLocale, url: path, title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/** The list of keyword guides, in one language. */
export function GuidesIndexPage({ locale }: { locale: Locale }) {
  const t = getPages(locale).guides;
  const roles = getRoles(locale);
  const url = `${SITE_URL}${localePath(locale, PATH)}`;
  const home = localePath(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: t.title,
        description: t.description,
        inLanguage: LOCALE_INFO[locale].htmlLang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        hasPart: roles.map((r) => ({
          "@type": "WebPage",
          url: `${url}/${r.slug}`,
          name: fmt(t.cardTitle, { role: r.name }),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: `${SITE_URL}${home === "/" ? "" : home}` },
          { "@type": "ListItem", position: 2, name: t.breadcrumb, item: url },
        ],
      },
    ],
  };

  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader locale={locale} path={PATH} />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">{t.lead}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <li key={role.slug}>
              <Link
                href={localePath(locale, `${PATH}/${role.slug}`)}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
              >
                <h2 className="flex items-center justify-between gap-3 text-lg font-semibold tracking-tight text-foreground">
                  {fmt(t.cardTitle, { role: role.name })}
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {fmt(t.cardMore, { keywords: role.groups.flatMap((g) => g.keywords).slice(0, 7).join(", ") })}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 text-center sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{t.notListedTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.notListedText}</p>
          <Link
            href={`${home}?ref=guides#analyzer`}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.notListedCta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} path={PATH} />
    </div>
  );
}
