import type { Metadata } from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read the latest laundry and dry cleaning tips, fabric care guides, and updates from Mycleaners.",
};

export default function BlogPage() {
  redirect("/blogs");
}
