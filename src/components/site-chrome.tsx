import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/consent/consent-banner";
import { ROLES } from "@/lib/roles";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--foreground)_10%,transparent)_inset]">
        CV
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">CVXray</span>
    </span>
  );
}

const navLink =
  "hidden rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="CVXray home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Link href="/#how-it-works" className={navLink}>How it works</Link>
          <Link href="/resume-keywords" className={navLink}>Keywords by role</Link>
          <Link href="/#faq" className={navLink}>FAQ</Link>
          <Link
            href="/#analyzer"
            className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
          >
            Check my CV
            <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 text-[13px] text-muted-foreground sm:px-6 lg:px-8">
        <nav aria-label="Resume keywords by role" className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-border pb-6">
          <Link href="/resume-keywords" className="inline-flex min-h-11 items-center font-medium text-foreground transition-colors hover:text-primary sm:min-h-0">
            Resume keywords by role
          </Link>
          {ROLES.map((role) => (
            <Link key={role.slug} href={`/resume-keywords/${role.slug}`} className="inline-flex min-h-11 items-center transition-colors hover:text-foreground sm:min-h-0">
              {role.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-border sm:inline">|</span>
            <span>&copy; 2026 · Nothing you upload is stored or shared.</span>
          </div>
          <nav aria-label="Footer" className="flex items-center gap-5">
            <Link href="/#how-it-works" className="transition-colors hover:text-foreground">How it works</Link>
            <Link href="/#faq" className="transition-colors hover:text-foreground">FAQ</Link>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}
