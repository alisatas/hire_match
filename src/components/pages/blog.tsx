import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PostBlock } from "@/components/post-body";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { LOCALE_INFO, alternatesFor, dateLocale, fmt, localePath, type Locale } from "@/lib/i18n";
import { getPages, getPost, getPosts, getRole } from "@/lib/i18n/content";
import { OG_IMAGE, SITE_URL, jsonLdScript } from "@/lib/site";

const INDEX = "/blog";
const pathOf = (slug: string) => `${INDEX}/${slug}`;

const formatDate = (iso: string, locale: Locale) =>
  new Date(iso).toLocaleDateString(dateLocale(locale), { day: "numeric", month: "long", year: "numeric" });

const absolute = (locale: Locale, path: string = "/") => {
  const local = localePath(locale, path);
  return `${SITE_URL}${local === "/" ? "" : local}`;
};

// ── Index ────────────────────────────────────────────────────────────────────

export function blogIndexMetadata(locale: Locale): Metadata {
  const { title, description } = getPages(locale).blog;
  const path = localePath(locale, INDEX);
  return {
    title,
    description,
    alternates: { canonical: path, languages: alternatesFor(INDEX) },
    openGraph: { type: "website", siteName: "CVXray", locale: LOCALE_INFO[locale].ogLocale, url: path, title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/** The list of articles, in one language. */
export function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = getPages(locale).blog;
  const posts = getPosts(locale);
  const url = absolute(locale, INDEX);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": url,
        url,
        name: t.name,
        description: t.description,
        inLanguage: LOCALE_INFO[locale].htmlLang,
        publisher: { "@id": `${SITE_URL}/#org` },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absolute(locale, pathOf(p.slug)), datePublished: p.published })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: absolute(locale) },
          { "@type": "ListItem", position: 2, name: t.breadcrumb, item: url },
        ],
      },
    ],
  };
  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader locale={locale} path={INDEX} />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">{t.h1}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">{t.lead}</p>
        <ul className="mt-10 space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={localePath(locale, pathOf(post.slug))} className="group block rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40">
                <p className="text-xs text-muted-foreground">{formatDate(post.published, locale)} · {fmt(t.minRead, { n: post.minutes })}</p>
                <h2 className="mt-2 flex items-start justify-between gap-3 text-lg font-semibold tracking-tight text-foreground">
                  {post.title}
                  <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter locale={locale} path={INDEX} />
    </div>
  );
}

// ── Article ──────────────────────────────────────────────────────────────────

export function blogPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getPost(locale, slug);
  if (!post) return {};
  const path = localePath(locale, pathOf(slug));
  const title = post.seoTitle ?? post.title;
  return {
    title,
    description: post.description,
    alternates: { canonical: path, languages: alternatesFor(pathOf(slug)) },
    // English: the share image comes from the colocated opengraph-image.tsx (per-article
    // card). Translated articles use the site image.
    openGraph: {
      type: "article", siteName: "CVXray", locale: LOCALE_INFO[locale].ogLocale, url: path, title, description: post.description,
      publishedTime: post.published, modifiedTime: post.updated,
      ...(locale !== "en" && { images: [OG_IMAGE] }),
    },
    twitter: { card: "summary_large_image", title, description: post.description, ...(locale !== "en" && { images: [OG_IMAGE.url] }) },
  };
}

/** One article, in one language. The caller has checked that the slug exists. */
export function BlogPostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const post = getPost(locale, slug);
  if (!post) return null;
  const pages = getPages(locale);
  const t = pages.blog;
  const path = pathOf(slug);
  const home = localePath(locale);
  const url = absolute(locale, path);
  const related = post.relatedRoles.map((s) => getRole(locale, s)).filter((r): r is NonNullable<typeof r> => !!r);
  const others = getPosts(locale).filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated,
        inLanguage: LOCALE_INFO[locale].htmlLang,
        image: locale === "en" ? `${url}/opengraph-image` : `${SITE_URL}${OG_IMAGE.url}`,
        author: { "@id": `${SITE_URL}/#org` },
        publisher: { "@id": `${SITE_URL}/#org` },
        isPartOf: { "@id": absolute(locale, INDEX) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: absolute(locale) },
          { "@type": "ListItem", position: 2, name: t.breadcrumb, item: absolute(locale, INDEX) },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
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
          <Link href={localePath(locale, INDEX)} className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-foreground">{t.breadcrumb}</Link>
        </nav>

        <article>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={post.published}>{formatDate(post.published, locale)}</time> · {fmt(t.minRead, { n: post.minutes })}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{post.description}</p>

          <div className="mt-10 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted-foreground text-pretty">
                  {section.blocks.map((block, i) => <PostBlock key={i} block={block} />)}
                </div>
              </section>
            ))}
          </div>
        </article>

        <section className="mt-14 rounded-2xl border border-border bg-card/60 p-6 text-center sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{t.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.ctaText}</p>
          <Link
            href={`${home}?ref=blog-${post.slug}#analyzer`}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.ctaButton}
            <ArrowRight className="size-4" />
          </Link>
        </section>

        {related.length > 0 && (
          <nav aria-label={t.relatedLabel} className="mt-12">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">{t.relatedTitle}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={localePath(locale, `/resume-keywords/${r.slug}`)} className="inline-flex min-h-11 items-center rounded-lg border border-border bg-card/60 px-3.5 text-sm text-foreground transition-colors hover:border-primary/40">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav aria-label={t.moreTitle} className="mt-10">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">{t.moreTitle}</h2>
          <ul className="mt-3 space-y-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={localePath(locale, pathOf(p.slug))} className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <SiteFooter locale={locale} path={path} />
    </div>
  );
}
