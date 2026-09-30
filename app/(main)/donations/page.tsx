import type { Metadata } from "next";

import { Donations } from "@/components/sections/donations/Donations";

export const metadata: Metadata = {
  title: "Donations",
  description:
    "Donate old clothes with Mycleaners and Raise India Foundation. Arrange items in a bag labeled 'Donation' and we’ll collect it on your next pickup or delivery.",
};

export default function DonationsPage() {
  return <Donations />;
}

