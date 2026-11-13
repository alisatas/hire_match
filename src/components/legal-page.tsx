import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { LOCALE_INFO, dateLocale, fmt, localePath, type Locale } from "@/lib/i18n";
import { getPages } from "@/lib/i18n/content";
import { CONTACT_EMAIL, LEGAL_UPDATED, LEGAL_UPDATED_ISO, OG_IMAGE, SITE_URL, jsonLdScript } from "@/lib/site";

/** Metadata for a legal page in one language: self canonical plus hreflang to the others. */
export function legalMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const local = localePath(locale, path);
  return {
    title,
    description,
    alternates: { canonical: local },
    openGraph: { type: "website", siteName: "CVXray", locale: LOCALE_INFO[locale].ogLocale, url: local, title, description, images: [OG_IMAGE] },
  };
}

export interface LegalSection {
  title: string;
  body: React.ReactNode;
}

/**
 * Shared layout for Terms, Refund Policy and Privacy. `path` is written without a
 * language ("/terms"); the English pages in app/(en) leave `locale` out.
 */
export function LegalPage({ locale = "en", path, title, description, intro, sections }: {
  locale?: Locale; path: string; title: string; description: string; intro: React.ReactNode; sections: LegalSection[];
}) {
  const pages = getPages(locale);
  const t = pages.legal;
  const home = localePath(locale);
  const url = `${SITE_URL}${localePath(locale, path)}`;
  const updated = locale === "en"
    ? LEGAL_UPDATED
    : new Date(LEGAL_UPDATED_ISO).toLocaleDateString(dateLocale(locale), { day: "numeric", month: "long", year: "numeric" });
  // Ties each legal page to the site and organisation entities, so search engines
  // read it as CVXray's official policy rather than a stray page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: title,
        description,
        inLanguage: LOCALE_INFO[locale].htmlLang,
        dateModified: LEGAL_UPDATED_ISO,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: `${SITE_URL}${home === "/" ? "" : home}` },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader locale={locale} />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label={pages.breadcrumbLabel} className="-ml-1 flex flex-wrap items-center gap-x-1 text-[13px] text-muted-foreground">
          <Link href={home} className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-foreground">CVXray</Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span aria-current="page" className="text-foreground">{title}</span>
        </nav>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{fmt(t.updated, { date: updated })}</p>
        {/* A translation is a convenience: the English text is the one that applies */}
        {t.translationNotice && (
          <p className="mt-4 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground">
            {t.translationNotice}{" "}
            <a href={path} hrefLang="en" lang="en" className="font-medium text-primary hover:underline">English</a>
          </p>
        )}
        <div className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">{intro}</div>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {i + 1}. {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground text-pretty [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
          {t.questions}{" "}
          {CONTACT_EMAIL ? (
            <>{t.email} <a className="font-medium text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>
          ) : (
            <>{t.receipt}</>
          )}
        </p>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

/** The "how to reach us" sentence used inside sections. */
export function ContactLine() {
  return CONTACT_EMAIL ? (
    <>email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>
  ) : (
    <>reply to the receipt email Lemon Squeezy sent you</>
  );
}
