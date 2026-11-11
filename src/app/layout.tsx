import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { ConsentBanner } from "@/components/consent/consent-banner";
import { GTM_ID, consentBootstrapScript, gtmLoaderScript } from "@/lib/analytics";
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

// Search Console / Bing Webmaster ownership tokens — set in the Vercel project env.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free CV & Resume Matcher — Job Match Score | CVXray",
    template: "%s | CVXray",
  },
  description:
    "Check your CV or resume against any job description. Free match score, missing keywords, skill gaps and courses to close them — instant, private, no sign-up.",
  keywords: [
    "cv matcher", "resume matcher", "job fit analyzer", "cv analyzer",
    "resume scanner", "job match score", "skill gap analysis",
    "resume keywords", "job description match", "cv match percentage",
    "free resume checker", "ai resume analyzer", "cv scoring tool",
    "resume to job match", "check resume against job description",
    "resume keyword checker", "ats resume checker", "resume keywords by role",
    "cvxray", "cv xray", "resume xray",
  ],
  authors: [{ name: "CVXray" }],
  creator: "CVXray",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CVXray",
    title: "CVXray — Free AI Resume Matcher & Job Fit Analyzer",
    description:
      "Upload your CV, paste a job link — get an instant ATS match score, find missing keywords & get course recommendations. Free, no sign-up, private.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CVXray - Free AI Resume Matcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVXray — Free AI Resume Matcher",
    description: "Upload your CV, paste a job link — get an instant ATS match score, missing keywords & course recommendations. Free, no sign-up, private.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230e7490'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-size='20' font-family='system-ui,sans-serif' font-weight='900' fill='white'%3ECV%3C/text%3E%3C/svg%3E",
  },
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        inLanguage: "en",
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
          "Resume keyword guides by job role",
          "Company Insights — company name, culture signals, and real interview resources",
          "LinkedIn job URL auto-scraping",
          "PDF resume upload support",
          "No sign-up required",
          "100% private — CV data is never stored, logged, or retained",
          "Free forever",
        ],
        screenshot: `${siteUrl}/opengraph-image`,
        isAccessibleForFree: true,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "CVXray",
        url: siteUrl,
        logo: `${siteUrl}/opengraph-image`,
        sameAs: [
          "https://x.com/cvxray",
          "https://www.instagram.com/cvxray.ai",
        ],
      },
      {
        "@type": "HowTo",
        name: "How to check if your CV matches a job description",
        description: "Use CVXray to instantly score your resume against any job description and find missing keywords.",
        step: [
          { "@type": "HowToStep", name: "Upload your CV", text: "Upload your PDF resume or paste your CV text into CVXray." },
          { "@type": "HowToStep", name: "Add the job description", text: "Paste the job description text or a job URL (LinkedIn, Indeed, etc.)." },
          { "@type": "HowToStep", name: "Get your match score", text: "CVXray instantly calculates your match percentage, shows matched skills, and lists missing keywords." },
          { "@type": "HowToStep", name: "Close the skill gaps", text: "Follow the personalized course recommendations to improve your CV for the role." },
        ],
        tool: [{ "@type": "HowToTool", name: "CVXray — free CV matcher at cvxray.com" }],
        totalTime: "PT1M",
      }
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#fafafa" />
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
        {GTM_ID && (
          <>
            <Script id="gtm-loader" strategy="afterInteractive">{gtmLoaderScript(GTM_ID)}</Script>
            <ConsentBanner />
          </>
        )}
      </body>
    </html>
  );
}
