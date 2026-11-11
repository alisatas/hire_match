import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { POSTS } from "@/lib/posts";
import { OG_IMAGE, SITE_URL, jsonLdScript } from "@/lib/site";

const title = "CV & Job Search Guides — How to Get Past the ATS";
const description = "Practical guides on how applicant tracking systems read your CV, how to tailor a CV to a job description, and what your CV match score means.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", siteName: "CVXray", url: "/blog", title, description, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
};

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog`,
        url: `${SITE_URL}/blog`,
        name: "CVXray guides",
        description,
        publisher: { "@id": `${SITE_URL}/#org` },
        blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.published })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CVXray", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };
  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Guides</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">CV and job search guides</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">
          How CVs are screened, and what to change so the right recruiter finds yours.
        </p>
        <ul className="mt-10 space-y-4">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40">
                <p className="text-xs text-muted-foreground">{fmt(post.published)} · {post.minutes} min read</p>
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
      <SiteFooter />
    </div>
  );
}
