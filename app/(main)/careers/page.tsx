import type { Metadata } from "next";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersHowToJoin } from "@/components/sections/careers/CareersHowToJoin";
import { CareersOpenRoles } from "@/components/sections/careers/CareersOpenRoles";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${SITE_NAME}—open roles, flexible paths to apply, and teams across India.`,
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersHowToJoin />
      <CareersOpenRoles />
      <City_We_Work title="Cities where we work" containerClassName="pt-4 sm:pt-6" />
    </>
  );
}
