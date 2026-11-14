import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootShell } from "@/components/root-shell";
import { LOCALE_INFO, TRANSLATED_LOCALES, getDictionary, isLocale } from "@/lib/i18n";
import { sharedMetadata } from "@/lib/metadata";
import { OG_IMAGE } from "@/lib/site";

// Root layout for the translated home pages (/tr, /de, /es, /pt, /zh). English keeps its own
// root layout in app/(en), so <html lang> is right in the static HTML of each language.
// Only the listed languages exist; any other single-segment path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSLATED_LOCALES.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    ...sharedMetadata,
    title: { default: meta.title, template: "%s | CVXray" },
    description: meta.description,
    openGraph: {
      type: "website",
      locale: LOCALE_INFO[lang].ogLocale,
      url: `/${lang}`,
      siteName: "CVXray",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <RootShell locale={lang}>{children}</RootShell>;
}
