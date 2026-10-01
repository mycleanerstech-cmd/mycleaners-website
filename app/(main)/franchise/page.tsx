import type { Metadata } from "next";

import { FranchiseForm } from "@/components/sections/franchise/FranchiseForm";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { BecomeFranchisePartner } from "@/components/sections/BecomeFranchisePartner";
import { Franchise_Testimonials } from "@/components/sections/franchise_testimonials";
import { Franchise_Faqs } from "@/components/sections/franchise_faqs";

export const metadata: Metadata = {
  title: "Franchise",
  description:
    "Partner with Mycleaners and start your franchise. Learn about the franchise model, support, and how to become a franchise partner.",
};
export default function FranchisePage() {
  return (
    <>
      {/* The live enquiry form. Was `Contact_For_Franchise`, a static section with
          no form — this is the one that reaches the CRM. The state-images
          carousel used to sit above it and is gone: it pushed the form below the
          fold on mobile for no buying signal. */}
      <FranchiseForm />
      {/* <CleaningServicesMarquee /> */}
      <Franchise_Testimonials />
      <BecomeFranchisePartner />
      <City_We_Work />
      <Franchise_Faqs />
    </>
  );
}
