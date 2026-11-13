import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidesIndexPage, guidesIndexMetadata } from "@/components/pages/guides-index";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? guidesIndexMetadata(lang) : {};
}

export default async function LocalizedGuidesIndex({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <GuidesIndexPage locale={lang} />;
}
