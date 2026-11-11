export const SITE_URL = "https://cvxray.com";

// Bump when public page content changes — used as <lastmod> in the sitemap.
// A fixed date is deliberate: `new Date()` makes every crawl look "just modified",
// which teaches search engines to ignore the field.
export const CONTENT_UPDATED = "2026-11-11";

/** Serialise JSON-LD for an inline <script>, escaping "<" so content can never close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// A page that sets its own `openGraph` replaces the root one wholesale, which drops the
// share image — so sub-pages pass this explicitly.
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "CVXray — free CV and resume matcher" };
