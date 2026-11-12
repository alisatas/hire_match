import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";
import { RootShell } from "@/components/root-shell";

// The site has two root layouts (app/(en) and app/[lang]), so there is no single layout
// a 404 for an unmatched URL could render inside. This file is that page: a complete
// document, built from the same shell and content as the English not-found page.
export const metadata: Metadata = {
  title: "Page not found | CVXray",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootShell locale="en">
      <NotFoundContent />
    </RootShell>
  );
}
