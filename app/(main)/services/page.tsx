import type { Metadata } from "next";

import { OurServicesSection } from "@/components/sections/home/OurServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Mycleaners services including laundry, dry cleaning, and home services with doorstep pickup and delivery. Choose a service and book in minutes.",
};

export default function ServicesPage() {
  return (
    <>
      <OurServicesSection />
    </>
  );
}
