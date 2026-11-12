import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Shown when an English page calls notFound(). URLs that match no route at all are
// answered by app/global-not-found.tsx, which renders the same content.
export default function NotFound() {
  return <NotFoundContent />;
}
