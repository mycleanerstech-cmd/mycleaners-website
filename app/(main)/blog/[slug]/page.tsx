import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // No brand suffix here: the root layout title template appends "| Mycleaners".
  return { title: "Blogs", alternates: { canonical: `/blogs/${slug}` } };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/blogs/${slug}`);
}
