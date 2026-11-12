import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

// Search Console / Bing Webmaster ownership tokens — set in the Vercel project env.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

/** Metadata every root layout shares, whatever the language. */
export const sharedMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "CVXray" }],
  creator: "CVXray",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  }),
};
