import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/sections/privacy/PrivacyPolicy";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME} services, including how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}

