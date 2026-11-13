import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage, blogPostMetadata } from "@/components/pages/blog";
import { POSTS, getPost } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return blogPostMetadata("en", (await params).slug);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return <BlogPostPage locale="en" slug={slug} />;
}
