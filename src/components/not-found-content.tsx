"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

// A 404 has no route, so no language parameter either. The language is read from the
// address instead ("/de/…" → German); anything else is English. The server renders
// English and the browser switches after hydration, without a mismatch warning.
const TEXT: Record<Locale, { h1: string; text: string }> = {
  en: { h1: "This page doesn't exist", text: "The link may be old or mistyped. You can check your CV against a job right away, or browse the keyword guides." },
  tr: { h1: "Bu sayfa mevcut değil", text: "Bağlantı eski ya da hatalı yazılmış olabilir. CV'nizi hemen bir ilanla karşılaştırabilir veya anahtar kelime rehberlerine göz atabilirsiniz." },
  de: { h1: "Diese Seite gibt es nicht", text: "Der Link ist vielleicht veraltet oder falsch geschrieben. Prüfen Sie Ihren Lebenslauf direkt an einer Stelle oder stöbern Sie in den Keyword-Ratgebern." },
  es: { h1: "Esta página no existe", text: "Puede que el enlace sea antiguo o tenga un error. Puedes comparar tu CV con una oferta ahora mismo o consultar las guías de palabras clave." },
  pt: { h1: "Esta página não existe", text: "O link pode estar desatualizado ou com erro de digitação. Você pode comparar seu currículo com uma vaga agora mesmo ou ver os guias de palavras-chave." },
  fr: { h1: "Cette page n'existe pas", text: "Le lien est peut-être ancien ou mal saisi. Vous pouvez comparer votre CV à une offre tout de suite ou parcourir les guides de mots-clés." },
  zh: { h1: "此页面不存在", text: "链接可能已过期或输入有误。你可以立即用职位描述检查简历，或浏览各职位的关键词指南。" },
};

const readLocale = (): Locale => {
  const code = /^\/(tr|de|es|pt|fr|zh)(\/|$)/.exec(window.location.pathname)?.[1];
  return (code as Locale | undefined) ?? "en";
};
const noop = () => () => {};

export function NotFoundContent() {
  const locale = useSyncExternalStore(noop, readLocale, () => "en" as Locale);
  const nav = getDictionary(locale).nav;
  // The <title> comes from static metadata (English); follow the page language
  useEffect(() => { if (locale !== "en") document.title = `${TEXT[locale].h1} | CVXray` }, [locale]);
  const home = localePath(locale);
  const link = "inline-flex min-h-11 items-center rounded-lg border border-border bg-card/60 px-3.5 text-sm text-foreground transition-colors hover:border-primary/40";
  return (
    <div className="relative z-10">
      <SiteHeader locale={locale} />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 text-center sm:px-6 sm:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">{TEXT[locale].h1}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{TEXT[locale].text}</p>
        <Link
          href={`${home}?ref=404#analyzer`}
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          {nav.cta}
          <ArrowRight className="size-4" />
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          <li><Link href={localePath(locale, "/resume-keywords")} className={link}>{nav.keywords}</Link></li>
          <li><Link href={localePath(locale, "/blog")} className={link}>{nav.guides}</Link></li>
        </ul>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
