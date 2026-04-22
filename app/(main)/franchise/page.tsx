import type { Metadata } from "next";

import { StateImagesCarousel } from "@/components/sections/home/StateImagesCarousel";
import { Contact_For_Franchise } from "@/components/sections/home/Contact_For_Franchise";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { BecomeFranchisePartner } from "@/components/sections/BecomeFranchisePartner";
import { Franchise_Testimonials } from "@/components/sections/franchise_testimonials";
import { Franchise_Faqs } from "@/components/sections/franchise_faqs";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Franchise | ${SITE_NAME}`,
  description:
    "Partner with MyCleaners and start your franchise. Learn about the franchise model, support, and how to become a franchise partner.",
};
export default function FranchisePage() {
  return (
    <>
      <StateImagesCarousel />
      <Contact_For_Franchise />
      {/* <CleaningServicesMarquee /> */}
      <Franchise_Testimonials />
      <BecomeFranchisePartner />
      <City_We_Work />
      <Franchise_Faqs />
    </>
  );
}
