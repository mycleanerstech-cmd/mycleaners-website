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
import { AppComingSoonSection } from "@/components/sections/home/AppComingSoonSection";
// import { Contact_For_Franchise } from "@/components/sections/home/Contact_For_Franchise";

export const metadata: Metadata = {
  // Title intentionally omitted: the root layout default already renders
  // "Mycleaners — India's Largest Dry Clean And Laundry Chain". Setting it here
  // would double the brand via the layout title template.
  description:
    "Doorstep laundry and dry cleaning with convenient pickup & delivery. Book online with Mycleaners for expert garment care, transparent pricing, and reliable service across India.",
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
      {/* Booking lives on its own page (see /schedule-pickup), so the homepage
          carries no inline form — only CTAs that route there. */}
      <AppComingSoonSection />
      <MapSection />
      <CustomerTestimonialsCarousel />
      <City_We_Work />
      <FAQs />
    </>
  );
}
