import type { Metadata } from "next";
import { notFound } from "next/navigation";

import blogs from "@/mock/blogs.json";
import type { BlogPost } from "@/types/content";
import { BlogPostSection } from "@/components/sections/blog/BlogPostSection";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return (blogs as BlogPost[]).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (blogs as BlogPost[]).find((p) => p.slug === slug);

  // No brand suffix here: the root layout title template appends "| Mycleaners".
  if (!post) {
    return { title: "Blogs" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = (blogs as BlogPost[]).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostSection post={post} />;
}

