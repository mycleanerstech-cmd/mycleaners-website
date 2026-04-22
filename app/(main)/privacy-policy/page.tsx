import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/sections/privacy/PrivacyPolicy";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy Policy for ${SITE_NAME} services, including how we collect, use, and protect your data.`,
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

