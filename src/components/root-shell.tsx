import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { ConsentBanner } from "@/components/consent/consent-banner";
import { ErrorReporter } from "@/components/error-reporter";
import { GTM_ID, consentBootstrapScript, gtmLoaderScript } from "@/lib/analytics";
import { LOCALES, LOCALE_INFO, getDictionary, type Locale } from "@/lib/i18n";
import { SITE_URL, jsonLdScript } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = SITE_URL;

/**
 * The <html> document shared by both root layouts: `app/(en)` for English and
 * `app/[lang]` for the translated home pages. Two root layouts exist only so that
 * <html lang> is correct in the static HTML of every language.
 */
export function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "CVXray",
        alternateName: ["CV Xray", "CVXray.com"],
        description: "Free CV and resume matcher: compare your CV with any job description and see your match score and missing keywords.",
        inLanguage: [...LOCALES],
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#app`,
        name: "CVXray",
        alternateName: ["CV Xray", "CVXray.com"],
        url: siteUrl,
        description:
          "CVXray is a free resume and CV matcher. Upload your PDF CV, paste a job description or LinkedIn URL, and get an instant match score with skill gap analysis and course recommendations. No sign-up, no data stored.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Career Tools",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        featureList: [
          "CV to job description match scoring",
          "Keyword gap analysis — see exactly what's missing from your CV",
          "40+ skill category detection",
          "Missing keyword identification",
          "Personalized course recommendations",
          "Transparent scoring — skills 50%, keywords 35%, experience 15%",
          "Resume keyword guides for 18 job roles, from AI engineer to registered nurse",
          "Where and how to add each missing skill, quoting the job post",
          "Shareable score card image",
          "Ignores company boilerplate and weights nice-to-have skills lower",
          "Experience read from CV date ranges, month-precise",
          "Company Insights — company name, culture signals, and real interview resources",
          "LinkedIn job URL auto-scraping",
          "PDF resume upload support",
          "No sign-up required",
          "100% private — CV data is never stored, logged, or retained",
          "Free forever",
        ],
        screenshot: `${siteUrl}/opengraph-image`,
        isAccessibleForFree: true,
        inLanguage: [...LOCALES],
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "CVXray",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png`, width: 512, height: 512 },
        sameAs: [
          "https://x.com/cvxray",
          "https://www.instagram.com/cvxray.ai",
        ],
      }
    ],
  };

  return (
    <html lang={LOCALE_INFO[locale].htmlLang}>
      {/* This component is the root layout's document, where a plain <head> is correct */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#fafafa" />
        {/* Site-wide feed discovery. Set here rather than in metadata.alternates, which
            each page replaces when it sets its own canonical. */}
        <link rel="alternate" type="application/rss+xml" title="CVXray guides" href="/blog/feed.xml" />
        {/* Consent Mode defaults must run before Google Tag Manager loads */}
        {GTM_ID && <script dangerouslySetInnerHTML={{ __html: consentBootstrapScript() }} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ backgroundColor: 'transparent' }} suppressHydrationWarning>
        <div aria-hidden className="page-backdrop" />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
        <Analytics />
        <ErrorReporter />
        {GTM_ID && (
          <>
            <Script id="gtm-loader" strategy="afterInteractive">{gtmLoaderScript(GTM_ID)}</Script>
            <ConsentBanner t={dict.consent} />
          </>
        )}
      </body>
    </html>
  );
}
