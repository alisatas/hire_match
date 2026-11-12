import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { homeAlternates } from "@/lib/i18n";

// The canonical lives on each page (not the root layout) so sub-pages never
// inherit a canonical that points back at the home page. `languages` emits the
// hreflang links to the translated home pages (/tr, /de, /es, /zh).
export const metadata: Metadata = { alternates: { canonical: "/", languages: homeAlternates() } };

export default function Home() {
  return <HomePage locale="en" />;
}
