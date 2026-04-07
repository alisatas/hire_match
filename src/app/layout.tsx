import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DottedSurface } from "@/components/ui/dotted-surface";

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

const siteUrl = "https://cv-scorer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CV Scorer — Free AI Resume Matcher & Job Fit Analyzer",
    template: "%s | CV Scorer",
  },
  description:
    "Upload your CV and paste a job description to instantly see your match score, matched skills, missing keywords, and personalized course recommendations. Free, no sign-up, no API key.",
  keywords: [
    "cv scorer", "resume matcher", "job fit analyzer", "cv analyzer",
    "resume scanner", "job match score", "ATS checker", "skill gap analysis",
    "resume keywords", "job description match", "cv match percentage",
    "free resume checker", "ai resume analyzer",
  ],
  authors: [{ name: "CV Scorer" }],
  creator: "CV Scorer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CV Scorer",
    title: "CV Scorer — Free AI Resume Matcher & Job Fit Analyzer",
    description:
      "Instantly match your CV to any job description. Get a score, see matched skills, spot gaps, and get course recommendations — free & private.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CV Scorer - AI Resume Matcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Scorer — Free AI Resume Matcher",
    description: "Upload your CV, paste a job link, get your match score instantly. No sign-up.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📄</text></svg>",
  },
  alternates: { canonical: siteUrl },
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
        "@type": "WebApplication",
        "@id": `${siteUrl}/#app`,
        name: "CV Scorer",
        url: siteUrl,
        description:
          "Free AI-powered resume and CV matcher. Upload your PDF CV, paste a job description or LinkedIn URL, and get an instant match score with skill gap analysis and course recommendations.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "CV to job description match scoring",
          "Skill gap analysis",
          "Keyword overlap detection",
          "Personalized course recommendations",
          "LinkedIn job URL support",
          "No sign-up required",
          "100% private — no data stored",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does CV Scorer work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CV Scorer extracts text from your PDF CV and compares it against a job description using a local skill-matching engine. It detects 40+ skill categories and thousands of raw keywords, then calculates a match percentage based on overlap.",
            },
          },
          {
            "@type": "Question",
            name: "Is CV Scorer free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, CV Scorer is completely free. No account, no API key, and no data is sent to external servers. All analysis runs locally in the browser.",
            },
          },
          {
            "@type": "Question",
            name: "Does CV Scorer work with LinkedIn job posts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can paste a LinkedIn job URL and CV Scorer will attempt to fetch the job description automatically. Since LinkedIn blocks some scraping, you can also copy and paste the job description text directly for best results.",
            },
          },
          {
            "@type": "Question",
            name: "What skills does CV Scorer detect?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CV Scorer detects 40+ skill categories including React, TypeScript, Python, AWS, Docker, Kubernetes, SQL, machine learning, agile, CI/CD, and more — plus thousands of raw keywords from the job description.",
            },
          },
          {
            "@type": "Question",
            name: "Is my CV data private?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Your CV text is processed entirely in the browser. It is never stored, logged, or sent to any server. The only network request is the optional job URL fetch.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DottedSurface />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
