import type { MetadataRoute } from "next";
import { LOCALES, alternatesFor, localePath } from "@/lib/i18n";
import { POSTS } from "@/lib/posts";
import { ROLES } from "@/lib/roles";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);

  // Every page exists in every language under the same path. Each version is listed with
  // hreflang links to all the others, as search engines require.
  const page = (path: string, rest: Pick<Entry, "changeFrequency" | "priority"> & { lastModified?: Date }): Entry[] => {
    const languages = Object.fromEntries(Object.entries(alternatesFor(path)).map(([code, p]) => [code, absolute(p)]));
    return LOCALES.map((locale) => ({
      url: absolute(localePath(locale, path)),
      lastModified,
      ...rest,
      alternates: { languages },
    }));
  };

  return [
    ...page("/", { changeFrequency: "weekly", priority: 1 }),
    ...page("/resume-keywords", { changeFrequency: "monthly", priority: 0.8 }),
    ...page("/blog", { changeFrequency: "weekly", priority: 0.7 }),
    ...POSTS.flatMap((post) => page(`/blog/${post.slug}`, { lastModified: new Date(post.updated), changeFrequency: "monthly", priority: 0.6 })),
    // Legal pages exist in English only
    ...["/terms", "/privacy", "/refund-policy"].map((path) => ({ url: absolute(path), lastModified, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...ROLES.flatMap((role) => page(`/resume-keywords/${role.slug}`, { changeFrequency: "monthly", priority: 0.7 })),
  ];
}
