import type { Metadata } from "next";

import { OurServicesSection } from "@/components/sections/home/OurServicesSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Services | ${SITE_NAME}`,
  description:
    "Explore MyCleaners services including laundry, dry cleaning, and home services with doorstep pickup and delivery. Choose a service and book in minutes.",
};

export default function ServicesPage() {
  return (
    <>
      <OurServicesSection />
    </>
  );
}
