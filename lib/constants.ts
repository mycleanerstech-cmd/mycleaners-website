export const SITE_NAME = "Mycleaners";
export const SITE_TAGLINE = "India's Largest Dry Clean And Laundry Chain";
export const SITE_PHONE = "9711711011";
export const SITE_PHONE_DISPLAY = "97117 11011";
export const SITE_EMAIL = "support@mycleaners.in";
export const SITE_WHATSAPP_LINK = "https://wa.me/919711711011";
export const SITE_URL = "https://www.mycleaners.in";

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

export const APP_LINKS = {
  ios: "https://apps.apple.com/in/app/mycleaners",
  android: "https://play.google.com/store/apps/details?id=com.mycleaners",
} as const;

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
    description: "Schedule your pickup using our website or the MyCleaners app.",
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
