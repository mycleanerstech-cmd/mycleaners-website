import type { Metadata } from "next";

// import { CleaningServicesMarquee } from "@/components/sections/home/CleaningServicesMarquee";
import { OurServicesSection } from "@/components/sections/home/OurServicesSection";
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/sections/home/HowItWorksSection";
import { MapSection } from "@/components/sections/home/MapSection";
import { FAQs } from "@/components/sections/home/FAQs";
import { CustomerTestimonialsCarousel } from "@/components/sections/home/CustomerTestimonialsCarousel";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { IntroVideo } from "@/components/sections/home/IntroVideo";
// import { Contact_For_Franchise } from "@/components/sections/home/Contact_For_Franchise";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description:
    "Doorstep laundry and dry cleaning with convenient pickup & delivery. Book online with MyCleaners for expert garment care, transparent pricing, and reliable service across India.",
};

export default function HomePage() {
  return (
    <>
      <IntroVideo />
      {/* <Contact_For_Franchise /> */}
      <OurServicesSection />
      {/* <CleaningServicesMarquee /> */}
      <WhyChooseUsSection />
      <HowItWorksSection />
      <MapSection />
      <CustomerTestimonialsCarousel />
      <City_We_Work />
      <FAQs />
    </>
  );
}
