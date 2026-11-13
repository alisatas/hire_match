import { GuidesIndexPage, guidesIndexMetadata } from "@/components/pages/guides-index";

export const metadata = guidesIndexMetadata("en");

export default function ResumeKeywordsIndex() {
  return <GuidesIndexPage locale="en" />;
}
