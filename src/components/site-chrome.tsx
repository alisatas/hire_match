import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Globe } from "lucide-react";
import { CookieSettingsButton } from "@/components/consent/consent-banner";
import { CoffeeLink } from "@/components/coffee-link";
import { LOCALES, LOCALE_INFO, getDictionary, localePath, type Locale } from "@/lib/i18n";

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

/**
 * Language menu for the header. A native <details>, so it opens without JavaScript and
 * the links are in the HTML for crawlers. Plain <a>: each language has its own root
 * layout (its own <html lang>), so switching is a full page load anyway.
 */
function LanguageMenu({ locale, label, path }: { locale: Locale; label: string; path: string }) {
  return (
    <details className="group relative">
      <summary
        className="flex h-11 cursor-pointer list-none items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:h-9 [&::-webkit-details-marker]:hidden"
      >
        <Globe className="size-4" aria-hidden />
        {/* The accessible name starts with the visible text, as WCAG 2.5.3 asks */}
        <span className="uppercase">{locale}</span>
        <span className="sr-only">{label}: {LOCALE_INFO[locale].name}</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-open:rotate-180" aria-hidden />
      </summary>
      <ul className="absolute right-0 top-full z-50 mt-1.5 min-w-40 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-[var(--panel-shadow)]">
        {LOCALES.map((code) => (
          <li key={code}>
            <a
              href={localePath(code, path)}
              hrefLang={LOCALE_INFO[code].htmlLang}
              lang={LOCALE_INFO[code].htmlLang}
              aria-current={code === locale ? "true" : undefined}
              className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 text-sm text-foreground/85 transition-colors hover:bg-foreground/[0.05] hover:text-foreground aria-[current=true]:font-medium aria-[current=true]:text-foreground sm:min-h-9"
            >
              {LOCALE_INFO[code].name}
              {code === locale && <Check className="size-3.5 text-primary" aria-hidden />}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

// `locale` is the language of the page and `path` its address without a language
// ("/blog/x"), so the language menu can link to the same page in every other language.
// Pages without a translation (404, orchestration) leave both out.
export function SiteHeader({ locale = "en", path = "/" }: { locale?: Locale; path?: string }) {
  const t = getDictionary(locale).nav;
  const home = localePath(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={home} aria-label={t.home} className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
          <Logo />
        </Link>
        <nav aria-label={t.primary} className="flex items-center gap-1">
          <Link href={`${home}#how-it-works`} className={navLink}>{t.how}</Link>
          <Link href={localePath(locale, "/resume-keywords")} className={navLink}>{t.keywords}</Link>
          <Link href={localePath(locale, "/blog")} className={navLink}>{t.guides}</Link>
          <Link href={`${home}#faq`} className={navLink}>{t.faq}</Link>
          <LanguageMenu locale={locale} label={t.language} path={path} />
          <Link
            href={`${home}#analyzer`}
            className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.cta}
            <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ locale = "en", path = "/" }: { locale?: Locale; path?: string }) {
  const dict = getDictionary(locale);
  const t = dict.nav;
  const home = localePath(locale);
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 text-[13px] text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-border sm:inline">|</span>
            <span>&copy; 2026 · {t.footerNote}</span>
          </div>
          <nav aria-label={t.footer} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={localePath(locale, "/resume-keywords")} className="transition-colors hover:text-foreground">{t.keywords}</Link>
            <Link href={localePath(locale, "/blog")} className="transition-colors hover:text-foreground">{t.guides}</Link>
            <Link href={`${home}#faq`} className="transition-colors hover:text-foreground">{t.faq}</Link>
            <Link href="/terms" hrefLang="en" className="transition-colors hover:text-foreground">{t.terms}</Link>
            <Link href="/privacy" hrefLang="en" className="transition-colors hover:text-foreground">{t.privacy}</Link>
            <Link href="/refund-policy" hrefLang="en" className="transition-colors hover:text-foreground">{t.refunds}</Link>
            <CoffeeLink where="footer" t={dict.coffee} />
            <CookieSettingsButton label={t.cookieSettings} />
          </nav>
        </div>
        {/* This page in the other languages. Plain <a>: each language has its own root
            layout (its own <html lang>), so switching is a full page load anyway. */}
        <nav aria-label={t.language} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-4">
          {LOCALES.map((code) => (
            <a
              key={code}
              href={localePath(code, path)}
              hrefLang={LOCALE_INFO[code].htmlLang}
              lang={LOCALE_INFO[code].htmlLang}
              aria-current={code === locale ? "true" : undefined}
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground aria-[current=true]:font-medium aria-[current=true]:text-foreground sm:min-h-0"
            >
              {LOCALE_INFO[code].name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
