import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { homeAlternates, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

// Each language version is its own canonical page; hreflang ties them together so search
// engines show the right one per language instead of treating them as duplicates.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { alternates: { canonical: `/${lang}`, languages: homeAlternates() } };
}

export default async function LocalizedHome({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <HomePage locale={lang} />;
}
