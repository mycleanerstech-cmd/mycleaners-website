/**
 * Brand name. The "c" is lowercase by design — never capitalise it.
 * All rendered brand copy must use this form; the GST-registered legal
 * entity name below is a separate, longer string.
 */
export const SITE_NAME = "Mycleaners";

/** Full registered legal entity name, exactly as recorded on the GST registration. */
export const LEGAL_NAME = "Mycleaners Solutions Private Limited";

/** GSTIN and registered office address, exactly as recorded on the GST registration. */
export const GSTIN = "07AANCM4940M1ZX";
export const REGISTERED_OFFICE_ADDRESS = [
  "29, Sarai Jullena, New Friends Colony,",
  "South Delhi, Delhi 110025",
];

export const SITE_TAGLINE = "India's Largest Dry Clean And Laundry Chain";
export const SITE_PHONE = "9711711011";
export const SITE_PHONE_DISPLAY = "97117 11011";
/**
 * Public contact mailbox, shown in the footer, on the contact page and in the
 * careers enquiry links.
 *
 * Single source of truth on purpose: these drift apart easily when one surface
 * gets updated and another is missed, which leaves a visitor mailing an address
 * nobody reads.
 *
 * Note: `lib/privacy-policy.ts` hardcodes the old `support@` address inside the
 * published policy text. That is deliberate for now — the policy carries its own
 * effective date, so changing the body needs a deliberate re-issue rather than a
 * drive-by edit.
 */
export const SITE_EMAIL = "contact@mycleaners.in";
export const SITE_WHATSAPP_LINK = "https://wa.me/919711711011";
export const SITE_URL = "https://www.mycleaners.in";

/** Anchor id of the landing page pickup form. Shared by the form and the CTA
 *  that scrolls to it, so the two cannot drift apart. */
/**
 * Where the pickup booking flow lives.
 *
 * Booking has its own page rather than living inline on the homepage: the form
 * is a three-step flow, and every "Schedule Pickup" button on the site points
 * at this one route, so there is a single flow to keep correct.
 */
export const PICKUP_HREF = "/schedule-pickup";

/** The contact page, which carries the general enquiry form. */
export const CONTACT_HREF = "/contact";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Franchise", href: "/franchise" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" }
] as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/mycleaners.in",
  twitter: "#",
  instagram: "https://www.instagram.com/mycleaners.in?igsh=MTgybWc0dTdybm15ZA==",
  linkedin: "https://www.linkedin.com/company/65670238/admin/dashboard/",
  whatsapp: "https://wa.me/919711711011",
} as const;

/**
 * The store listings below belong to the *previous* app, which is no longer
 * available — every CTA used to point here and landed on a dead store page.
 *
 * The rebuilt app is not live yet, so `APP_AVAILABLE` gates all app CTAs:
 * while it is `false` the UI shows a "Coming Soon" badge (navbar, footer,
 * mobile menu) and swaps dead "Download App" buttons for a Schedule Pickup
 * button. Flip it to `true` (and point APP_LINKS at the new listings) once the
 * new app is submitted to both stores.
 */
export const APP_AVAILABLE = false;

export const APP_LINKS = {
  ios: "https://apps.apple.com/in/app/mycleaners",
  android: "https://play.google.com/store/apps/details?id=com.mycleaners",
} as const;

/** Copy used wherever the app is teased before it is live. */
export const APP_COMING_SOON = {
  badge: "App Coming Soon",
  eyebrow: "Mobile App",
  /** Anchor id of the landing page banner, so CTAs can deep-link to it. */
  bannerId: "app-coming-soon",
} as const;

/** Label for the pickup CTA that leads to the booking page. */
export const SCHEDULE_PICKUP_LABEL = "Schedule Pickup";

/** Feature bullets under the app banner headline (mirrors the banner artwork). */
export const APP_FEATURES = [
  { label: "Schedule Pickups", icon: "calendar" },
  { label: "Track Orders", icon: "truck" },
  { label: "Browse Services", icon: "grid" },
  { label: "Get Updates", icon: "bell" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Franchise", href: "/franchise" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  more: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Blogs", href: "/blogs" },
    { label: "Locations", href: "/locations" },
    { label: "Donations", href: "/donations" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Order Online",
    description: "Schedule your pickup online in a couple of taps.",
    icon: "mobile",
  },
  {
    step: 2,
    title: "We Pick Up",
    description: "We pick up your laundry as per your scheduled time — 7 days a week.",
    icon: "truck",
  },
  {
    step: 3,
    title: "Expert Cleaning",
    description: "We expertly launder or dry clean your order with top-quality care.",
    icon: "sparkle",
  },
  {
    step: 4,
    title: "Door Delivery",
    description: "Delivered fresh to your doorstep at a time comfortable to you.",
    icon: "home",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Convenience",
    description: "We pick up and drop off 7 days a week, always between 9 AM to 9 PM.",
    icon: "clock",
  },
  {
    title: "Value for Money",
    description: "High-quality services with eco-friendly equipment at affordable prices.",
    icon: "rupee",
  },
  {
    title: "Transparency",
    description: "With our Live Studio Concept, watch how your clothes transform.",
    icon: "eye",
  },
  {
    title: "Quality",
    description: "We use products that revive your clothes and give them a new feel.",
    icon: "star",
  },
  {
    title: "Eco-Friendly",
    description: "German organic chemicals and softeners for maximum cleaning and fabric care.",
    icon: "leaf",
  },
  {
    title: "Community",
    description: "We collect your donated clothes and spread love & care to those in need.",
    icon: "heart",
  },
] as const;
