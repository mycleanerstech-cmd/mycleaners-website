import type { Metadata } from "next";

import { About_First } from "@/components/sections/about/About_First";
import { About_Contact } from "@/components/sections/about/About_Contact";
import { About_Four } from "@/components/sections/about/About_Four";
import { About_Two } from "@/components/sections/about/About_Two";
import { About_Vision } from "@/components/sections/about/About_Vision";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description:
    "Learn about MyCleaners—our mission, vision, and commitment to premium laundry and dry cleaning with convenient doorstep pickup and delivery.",
};

export default function AboutPage() {
  return (
    <>
      <About_First />
      <About_Two />
      <About_Vision />
      <About_Four />
      <About_Contact />
      <City_We_Work title="Cities where we work" />
    </>
  );
}
