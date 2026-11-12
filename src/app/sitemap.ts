import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";
import { TRANSLATED_LOCALES, homeAlternates } from "@/lib/i18n";
import { ROLES } from "@/lib/roles";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  // hreflang for the home page in every language, repeated on each version as required
  const languages = Object.fromEntries(
    Object.entries(homeAlternates()).map(([code, path]) => [code, `${SITE_URL}${path === "/" ? "" : path}`]),
  );
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    ...TRANSLATED_LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages },
    })),
    { url: `${SITE_URL}/resume-keywords`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...["/terms", "/privacy", "/refund-policy"].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...ROLES.map((role) => ({
      url: `${SITE_URL}/resume-keywords/${role.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
