import type { Metadata } from "next";

import { Donations } from "@/components/sections/donations/Donations";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Donations | ${SITE_NAME}`,
  description:
    "Donate old clothes with MyCleaners and Raise India Foundation. Arrange items in a bag labeled 'Donation' and we’ll collect it on your next pickup or delivery.",
};

export default function DonationsPage() {
  return <Donations />;
}

