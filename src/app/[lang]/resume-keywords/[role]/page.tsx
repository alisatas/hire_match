import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleGuidePage, roleGuideMetadata } from "@/components/pages/role-guide";
import { isLocale } from "@/lib/i18n";
import { getRole } from "@/lib/i18n/content";
import { ROLES } from "@/lib/roles";

// Every guide exists in every language under the same slug; nothing else is rendered.
export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.slug }));
}

type Props = { params: Promise<{ lang: string; role: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, role } = await params;
  return isLocale(lang) ? roleGuideMetadata(lang, role) : {};
}

export default async function LocalizedRoleGuide({ params }: Props) {
  const { lang, role } = await params;
  if (!isLocale(lang) || lang === "en" || !getRole(lang, role)) notFound();
  return <RoleGuidePage locale={lang} slug={role} />;
}
