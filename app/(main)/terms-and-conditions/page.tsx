import type { Metadata } from "next";
import { TermsAndConditions } from "@/components/sections/terms/TermsAndConditions";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE_NAME}`,
  description: `Terms & Conditions for using ${SITE_NAME} services, billing, delivery, and claims.`,
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}

