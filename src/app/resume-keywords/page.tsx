import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ROLES } from "@/lib/roles";
import { OG_IMAGE, SITE_URL, jsonLdScript } from "@/lib/site";

const title = "Resume Keywords by Job Role — Free Lists & CV Check";
const description =
  "The keywords employers ask for most in software, data, product, design, sales, marketing and finance job posts — then check your own CV against any job description for free.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resume-keywords" },
  openGraph: { type: "website", siteName: "CVXray", url: "/resume-keywords", title, description, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/resume-keywords`,
      url: `${SITE_URL}/resume-keywords`,
      name: title,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      hasPart: ROLES.map((r) => ({
        "@type": "WebPage",
        url: `${SITE_URL}/resume-keywords/${r.slug}`,
        name: `${r.name} resume keywords`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CVXray", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Resume keywords by role", item: `${SITE_URL}/resume-keywords` },
      ],
    },
  ],
};

export default function ResumeKeywordsIndex() {
  return (
    <div className="relative z-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Resume keywords</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground text-balance sm:text-5xl">
            Resume keywords by job role
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-[17px]">
            The skills and terms job postings ask for most, role by role. Use them as a checklist — then run your
            own CV against a real posting to see exactly which ones you&apos;re missing.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {ROLES.map((role) => (
            <li key={role.slug}>
              <Link
                href={`/resume-keywords/${role.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
              >
                <h2 className="flex items-center justify-between gap-3 text-lg font-semibold tracking-tight text-foreground">
                  {role.name} resume keywords
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {role.groups.flatMap((g) => g.keywords).slice(0, 7).join(", ")} and more.
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 text-center sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Role not listed?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The checker works with any job description, in any field. Paste the posting and it pulls out the
            keywords for you.
          </p>
          <Link
            href="/#analyzer"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Check my CV against a job
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
