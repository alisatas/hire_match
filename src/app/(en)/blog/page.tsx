import { BlogIndexPage, blogIndexMetadata } from "@/components/pages/blog";

export const metadata = blogIndexMetadata("en");

export default function BlogIndex() {
  return <BlogIndexPage locale="en" />;
}
