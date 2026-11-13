import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalMetadata } from "@/components/legal-page";
import { isLocale } from "@/lib/i18n";
import { getLegal } from "@/lib/i18n/content";

const PATH = "/privacy";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") return {};
  const { title, description } = getLegal(lang).privacy;
  return legalMetadata(lang, PATH, title, description);
}

export default async function LocalizedLegalPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <LegalPage locale={lang} path={PATH} {...getLegal(lang).privacy} />;
}
