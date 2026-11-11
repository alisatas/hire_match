import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/consent/consent-banner";

/**
 * Brand mark: a CV page with a scan beam passing through it.
 * Drawn as inline SVG so it stays crisp at any size; `src/app/icon.svg` is the same artwork.
 */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cvx-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b6cf6" />
          <stop offset="1" stopColor="#1b3a9e" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#cvx-mark)" />
      <path
        d="M11.5 7h6.2L22 11.3V23.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 10 23.5v-15A1.5 1.5 0 0 1 11.5 7Z"
        fill="#fff"
        fillOpacity="0.14"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M17.5 7.2v4.3h4.3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 21h6" stroke="#fff" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.5 16.5h19" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">
        CV<span className="text-primary">Xray</span>
      </span>
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
          <Link href="/blog" className={navLink}>Guides</Link>
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-border sm:inline">|</span>
            <span>&copy; 2026 · Nothing you upload is stored or shared.</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/resume-keywords" className="transition-colors hover:text-foreground">Keywords by role</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">Guides</Link>
            <Link href="/#faq" className="transition-colors hover:text-foreground">FAQ</Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/refund-policy" className="transition-colors hover:text-foreground">Refunds</Link>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}
