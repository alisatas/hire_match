import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleGuidePage, roleGuideMetadata } from "@/components/pages/role-guide";
import { ROLES, getRole } from "@/lib/roles";

// Only the roles in ROLES exist; anything else is a 404 rather than an on-demand render.
export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((role) => ({ role: role.slug }));
}

type Props = { params: Promise<{ role: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return roleGuideMetadata("en", (await params).role);
}

export default async function RoleKeywordsPage({ params }: Props) {
  const { role } = await params;
  if (!getRole(role)) notFound();
  return <RoleGuidePage locale="en" slug={role} />;
}
