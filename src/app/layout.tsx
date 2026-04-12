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

const siteUrl = "https://cvxray.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CVXray — Free Resume Matcher & ATS Checker (No Sign-Up)",
    template: "%s | CVXray",
  },
  description:
    "Instantly score your CV against any job description. See matched skills, missing keywords, ATS gaps & courses to fill them. Free, private, no sign-up.",
  keywords: [
    "cv matcher", "resume matcher", "job fit analyzer", "cv analyzer",
    "resume scanner", "job match score", "ATS checker", "skill gap analysis",
    "resume keywords", "job description match", "cv match percentage",
    "free resume checker", "ai resume analyzer", "cv scoring tool",
    "resume to job match", "check resume against job description",
    "free ats resume checker", "resume keyword checker", "cvxray",
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
      "Instantly match your CV to any job description. Get a score, see matched skills, spot gaps, and get course recommendations — free & private. No sign-up.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CVXray - Free AI Resume Matcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVXray — Free AI Resume Matcher",
    description: "Upload your CV, paste a job link, get your match score instantly. Free, private, no sign-up.",
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
        name: "CVXray",
        alternateName: ["CV Xray", "CVXray", "CV Scorer", "CVXray.com"],
        url: siteUrl,
        description:
          "CVXray is a free AI-powered resume and CV matcher. Upload your PDF CV, paste a job description or LinkedIn URL, and get an instant match score with skill gap analysis and course recommendations. No sign-up, no data stored.",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Career Tools",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        featureList: [
          "CV to job description match scoring",
          "ATS keyword gap analysis",
          "40+ skill category detection",
          "Missing keyword identification",
          "Personalized course recommendations",
          "LinkedIn job URL auto-scraping",
          "PDF resume upload support",
          "No sign-up required",
          "100% private — CV data never stored or sent to servers",
          "Free forever",
        ],
        screenshot: `${siteUrl}/og-image.png`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "128",
          bestRating: "5",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "CVXray",
        url: siteUrl,
        logo: `${siteUrl}/og-image.png`,
        sameAs: [
          "https://github.com/alisatas/hire_match",
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
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the best free tool to match my CV to a job description?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CVXray (cvxray.com) is a free AI-powered CV matcher that instantly scores your resume against any job description. It detects 40+ skill categories, identifies missing keywords, and suggests courses to close skill gaps — with no sign-up required.",
            },
          },
          {
            "@type": "Question",
            name: "How do I check if my resume matches a job description?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your PDF CV to CVXray at cvxray.com, paste the job description or job URL, and get an instant match percentage with a breakdown of matched skills and missing keywords.",
            },
          },
          {
            "@type": "Question",
            name: "What is CVXray?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CVXray is a free online tool that matches your CV or resume against any job description. It uses a skill-matching engine to detect 40+ skill categories and thousands of keywords, giving you a match score and showing exactly what's missing from your CV.",
            },
          },
          {
            "@type": "Question",
            name: "Is CVXray free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, CVXray is completely free. No account, no credit card, no API key required. All CV analysis is private — your data is never stored or sent to any server.",
            },
          },
          {
            "@type": "Question",
            name: "Does CVXray work with LinkedIn job posts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Paste a LinkedIn job URL into CVXray and it will automatically fetch the job description. You can also paste job text directly from any job board like Indeed, Glassdoor, or company career pages.",
            },
          },
          {
            "@type": "Question",
            name: "What is an ATS checker and how does CVXray help?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An ATS (Applicant Tracking System) checker scans your CV for keywords that match the job description. CVXray acts as a free ATS checker — it compares your resume against the job posting and highlights missing keywords so you can optimize your CV before applying.",
            },
          },
          {
            "@type": "Question",
            name: "What skills does CVXray detect?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CVXray detects 40+ skill categories including React, TypeScript, Python, Node.js, AWS, Docker, Kubernetes, SQL, PostgreSQL, machine learning, agile, CI/CD, GraphQL, Terraform, and many more — plus thousands of raw keywords extracted from the job description.",
            },
          },
          {
            "@type": "Question",
            name: "Is my CV data private when using CVXray?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. CVXray processes your CV entirely in the browser. Your CV text is never stored, logged, or sent to any server. The only external request is the optional job URL fetch.",
            },
          },
          {
            "@type": "Question",
            name: "What are the best free alternatives to Jobscan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CVXray (cvxray.com) is a completely free alternative to Jobscan. Unlike Jobscan which limits free scans, CVXray has no scan limits, no sign-up, and is fully private. Other free alternatives include Resume Worded (limited free tier) and Teal HQ (freemium).",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <DottedSurface />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
