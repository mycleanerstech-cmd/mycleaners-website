import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Blogs | ${SITE_NAME}`,
  description:
    "Read the latest laundry and dry cleaning tips, fabric care guides, and updates from MyCleaners.",
};

export default function BlogPage() {
  redirect("/blogs");
}
