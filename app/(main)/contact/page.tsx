import type { Metadata } from "next";

import { About_Contact } from "@/components/sections/about/About_Contact";
import { Contact_Office_Info } from "@/components/sections/contact/Contact_Office_Info";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description: `Get in touch with ${SITE_NAME} for pickups, service support, and partnerships. Call ${SITE_PHONE_DISPLAY} or email ${SITE_EMAIL}.`,
};

export default function ContactPage() {
  return (
    <>
      <About_Contact />
      <Contact_Office_Info />
      <City_We_Work
        title="Cities where we work"
        containerClassName="pt-4 sm:pt-6"
      />
    </>
  );
}
