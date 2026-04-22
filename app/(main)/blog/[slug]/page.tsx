import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return { title: `Blogs — ${SITE_NAME}`, alternates: { canonical: `/blogs/${slug}` } };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/blogs/${slug}`);
}
