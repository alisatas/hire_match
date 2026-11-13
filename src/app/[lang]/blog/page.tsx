import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/blog";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? blogIndexMetadata(lang) : {};
}

export default async function LocalizedBlogIndex({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <BlogIndexPage locale={lang} />;
}
