import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage, blogPostMetadata } from "@/components/pages/blog";
import { isLocale } from "@/lib/i18n";
import { getPost } from "@/lib/i18n/content";
import { POSTS } from "@/lib/posts";

// Every article exists in every language under the same slug; nothing else is rendered.
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  return isLocale(lang) ? blogPostMetadata(lang, slug) : {};
}

export default async function LocalizedPost({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || lang === "en" || !getPost(lang, slug)) notFound();
  return <BlogPostPage locale={lang} slug={slug} />;
}
