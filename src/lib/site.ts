export const SITE_URL = "https://cvxray.com";

// Bump when public page content changes — used as <lastmod> in the sitemap.
// A fixed date is deliberate: `new Date()` makes every crawl look "just modified",
// which teaches search engines to ignore the field.
export const CONTENT_UPDATED = "2026-11-12";

/** Serialise JSON-LD for an inline <script>, escaping "<" so content can never close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// A page that sets its own `openGraph` replaces the root one wholesale, which drops the
// share image — so sub-pages pass this explicitly.
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "CVXray — free CV and resume matcher" };

// ── Optional support payments (Lemon Squeezy) ───────────────────────────────
const DEFAULT_CHECKOUT_URL = ""
// The tool is free. Visitors can make a one-time, pay-what-you-want support payment.
// Kept here so the home page, Terms and Refund Policy always state the same terms.
export const SUPPORT = {
  minimumEur: 3,
  refundDays: 14,
  // "Buy me a coffee" checkout (Lemon Squeezy). The link is public, so it lives here;
  // NEXT_PUBLIC_SUPPORT_CHECKOUT_URL can override it per deployment. Only an https
  // lemonsqueezy.com URL is accepted, so a typo can never point visitors elsewhere.
  // When no valid link is set, the coffee links are simply not shown.
  checkoutUrl: lemonCheckoutUrl(process.env.NEXT_PUBLIC_SUPPORT_CHECKOUT_URL || DEFAULT_CHECKOUT_URL),
} as const;

function lemonCheckoutUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw.trim());
    const host = url.hostname.toLowerCase();
    return url.protocol === "https:" && (host === "lemonsqueezy.com" || host.endsWith(".lemonsqueezy.com"))
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

// Shown on the legal pages. Optional: without it, visitors are pointed to the
// Lemon Squeezy receipt for anything payment-related.
export const CONTACT_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "")
  ? (process.env.NEXT_PUBLIC_CONTACT_EMAIL as string)
  : null;

export const LEGAL_UPDATED = "11 November 2026";
// The same date in ISO form, formatted per language on the translated legal pages
export const LEGAL_UPDATED_ISO = "2026-11-11";
