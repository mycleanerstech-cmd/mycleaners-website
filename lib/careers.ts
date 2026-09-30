import { SITE_EMAIL, SITE_WHATSAPP_LINK } from "@/lib/constants";

export type CareerRole = {
  id: string;
  title: string;
  /** Short line under title (education, level, etc.) */
  meta?: string;
  description: string;
};

export type CareerJoinPath = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
};

export const CAREER_JOIN_PATHS: readonly CareerJoinPath[] = [
  {
    id: "open-roles",
    title: "Pick a role & apply",
    description:
      "Browse open positions, read the brief, and apply—straightforward, no corporate maze.",
    ctaLabel: "See open roles",
    href: "#open-roles",
  },
  {
    id: "email",
    title: "Drop your CV",
    description:
      "Nothing listed for you yet? Send your resume and a line about what you’d love to do.",
    ctaLabel: "Email us",
    href: `mailto:${SITE_EMAIL}?subject=${encodeURIComponent("Career inquiry – Mycleaners")}`,
    external: true,
  },
  {
    id: "whatsapp",
    title: "DM us on WhatsApp",
    description:
      "Quick questions about shifts, locations, or how teams work here—we reply fast.",
    ctaLabel: "Chat now",
    href: SITE_WHATSAPP_LINK,
    external: true,
  },
  {
    id: "franchise",
    title: "Go bigger: franchise",
    description:
      "Dreaming of running your own hub? See how partners grow with Mycleaners.",
    ctaLabel: "Explore franchise",
    href: "/franchise",
  },
];

export const CAREER_ROLES: readonly CareerRole[] = [
  {
    id: "rider",
    title: "Mycleaners My Rider",
    description:
      "Flexible shifts picking up and dropping off orders. Earn shift-based pay plus tips, with mileage support—perfect if you like being on the move and meeting people across the city.",
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    meta: "Bachelor’s in digital marketing, engineering, or MBA preferred",
    description:
      "Own our growth story across SEM, SEO, PPC, social, website updates, and email—experiment, measure, and scale campaigns that bring more customers to Mycleaners.",
  },
  {
    id: "supply-chain",
    title: "Supply Chain Managers",
    description:
      "Lead logistics and vendor relationships so every hub runs smoothly. You’ll shape strategy, tighten processes, and keep partners aligned as we scale.",
  },
  {
    id: "operations",
    title: "Operations Manager",
    description:
      "Deep know-how of running laundry & dry-cleaning stores, fabric care, and chemicals. Build playbooks, coach teams, and lift performance across locations.",
  },
] as const;
