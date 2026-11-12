import type { Metadata } from "next";
import { RootShell } from "@/components/root-shell";
import { sharedMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

const siteUrl = SITE_URL;

// Root layout for the English site. The translated home pages have their own root
// layout in app/[lang]; both render the same <html> shell (components/root-shell.tsx).

export const metadata: Metadata = {
  ...sharedMetadata,
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
