import type { Metadata } from "next";

import blogs from "@/mock/blogs.json";

import type { BlogPost } from "@/types/content";
import { BlogListingSection } from "@/components/sections/blog/BlogListingSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Blogs | ${SITE_NAME}`,
  description:
    "Read the latest laundry and dry cleaning tips, fabric care guides, and updates from MyCleaners.",
};

export default function BlogsPage() {
  const posts = (blogs as BlogPost[]).slice().sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return <BlogListingSection posts={posts} />;
}

