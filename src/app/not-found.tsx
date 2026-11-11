import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ROLES } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// A real 404 (status code included) with useful next steps, instead of a dead end.
export default function NotFound() {
  return (
    <div className="relative z-10">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 text-center sm:px-6 sm:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">This page doesn&apos;t exist</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The link may be old or mistyped. You can check your CV against a job right away, or browse the keyword guides.
        </p>
        <Link
          href="/?ref=404#analyzer"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Check my CV
          <ArrowRight className="size-4" />
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {ROLES.slice(0, 6).map((role) => (
            <li key={role.slug}>
              <Link
                href={`/resume-keywords/${role.slug}`}
                className="inline-flex min-h-11 items-center rounded-lg border border-border bg-card/60 px-3.5 text-sm text-foreground transition-colors hover:border-primary/40"
              >
                {role.name} keywords
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
