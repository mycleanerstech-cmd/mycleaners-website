import type { Metadata } from "next";

import { City_We_Work } from "@/components/sections/City_We_Work";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Locations | ${SITE_NAME}`,
  description:
    "Find MyCleaners locations near you. Browse cities we serve for doorstep laundry and dry cleaning pickup & delivery.",
};

export default function LocationsPage() {
  return (
    <>
      <City_We_Work className="pt-0" />
    </>
  );
}
