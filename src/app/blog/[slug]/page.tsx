import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { PostBlock } from "@/components/post-body";
import { POSTS, getPost } from "@/lib/posts";
import { getRole } from "@/lib/roles";
import { SITE_URL, jsonLdScript } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article", siteName: "CVXray", url: path, title: post.seoTitle ?? post.title, description: post.description,
      publishedTime: post.published, modifiedTime: post.updated,
    },
    // Share image comes from the colocated opengraph-image.tsx (per-article card)
    twitter: { card: "summary_large_image", title: post.seoTitle ?? post.title, description: post.description },
  };
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = post.relatedRoles.map(getRole).filter((r): r is NonNullable<typeof r> => !!r);
  const others = POSTS.filter((p) => p.slug !== post.slug);

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
        inLanguage: "en",
        image: `${url}/opengraph-image`,
        author: { "@id": `${SITE_URL}/#org` },
        publisher: { "@id": `${SITE_URL}/#org` },
        isPartOf: { "@id": `${SITE_URL}/blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className="-ml-1 flex flex-wrap items-center gap-x-1 text-[13px] text-muted-foreground">
          <Link href="/" className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-foreground">CVXray</Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <Link href="/blog" className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-foreground">Guides</Link>
        </nav>

        <article>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={post.published}>{fmt(post.published)}</time> · {post.minutes} min read
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Check your CV against a real job</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Upload your CV, paste the job link and see your match score, missing skills and where to add them. Free, and your CV is never stored.
          </p>
          <Link
            href={`/?ref=blog-${post.slug}#analyzer`}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Check my CV
            <ArrowRight className="size-4" />
          </Link>
        </section>

        {related.length > 0 && (
          <nav aria-label="Related keyword guides" className="mt-12">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Resume keywords by role</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/resume-keywords/${r.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-border bg-card/60 px-3.5 text-sm text-foreground transition-colors hover:border-primary/40">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav aria-label="More guides" className="mt-10">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">More guides</h2>
          <ul className="mt-3 space-y-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
