import type { MetadataRoute } from "next";
import { ROLES } from "@/lib/roles";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/resume-keywords`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...ROLES.map((role) => ({
      url: `${SITE_URL}/resume-keywords/${role.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
