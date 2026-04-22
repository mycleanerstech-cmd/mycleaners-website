import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_PHONE_DISPLAY,
  SITE_EMAIL,
  FOOTER_LINKS,
  SOCIAL_LINKS,
  APP_LINKS,
} from "@/lib/constants";
import {
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterXIcon,
  WhatsAppIcon,
  LinkedinIcon,
} from "@/components/ui/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white" aria-label="Site footer">
      {/* Main Footer Grid */}
      <div className="container py-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-6">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <Link href="/" aria-label={`${SITE_NAME} — Home`}>
              <Image
                src="/images/My_Cleaners_Final_Logo.png"
                alt={`${SITE_NAME} logo`}
                width={224}
                height={56}
                style={{ width: "auto" }}
                className="h-12 w-auto select-none md:h-14"
              />
            </Link>

            <p className="text-body-sm text-white/60 max-w-xs leading-normal">
              {SITE_TAGLINE}. Experience top-notch laundry and dry cleaning with
              advanced technology and expert care.
            </p>

            {/* Contact + Social */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 flex-wrap">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:gap-4">
                <a
                  href="tel:9711711011"
                  className="flex items-center gap-2.5 text-body-sm text-white/70 hover:text-primary transition-colors"
                >
                  <PhoneIcon size={16} className="text-primary shrink-0" />
                  {SITE_PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="flex items-center gap-2.5 text-body-sm text-white/70 hover:text-primary transition-colors"
                >
                  <MailIcon size={16} className="text-primary shrink-0" />
                  {SITE_EMAIL}
                </a>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {[
                  {
                    href: SOCIAL_LINKS.facebook,
                    icon: FacebookIcon,
                    label: "Facebook",
                    className:
                      "bg-[#1877F2] text-white hover:bg-[#166fe0] shadow-[0_6px_16px_rgba(24,119,242,0.35)]",
                  },
                  {
                    href: SOCIAL_LINKS.instagram,
                    icon: InstagramIcon,
                    label: "Instagram",
                    className:
                      "bg-[linear-gradient(135deg,#F58529_0%,#DD2A7B_45%,#8134AF_70%,#515BD4_100%)] text-white hover:brightness-110 shadow-[0_6px_16px_rgba(221,42,123,0.35)]",
                  },
                  {
                    href: SOCIAL_LINKS.linkedin,
                    icon: LinkedinIcon,
                    label: "LinkedIn",
                    className:
                      "bg-[#0A66C2] text-white hover:bg-[#084f99] shadow-[0_6px_16px_rgba(10,102,194,0.35)]",
                  },
                  {
                    href: SOCIAL_LINKS.twitter,
                    icon: TwitterXIcon,
                    label: "Twitter / X",
                    className:
                      "bg-black text-white hover:bg-black/85 shadow-[0_6px_16px_rgba(0,0,0,0.35)]",
                  },
                  {
                    href: SOCIAL_LINKS.whatsapp,
                    icon: WhatsAppIcon,
                    label: "WhatsApp",
                    className:
                      "bg-[#25D366] text-white hover:bg-[#22c55e] shadow-[0_6px_16px_rgba(37,211,102,0.35)]",
                  },
                ].map(({ href, icon: Icon, label, className }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`p-1.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${className}`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          {/* <FooterLinkGroup title="Services" links={FOOTER_LINKS.services} /> */}

          {/* Company */}
          <FooterLinkGroup title="Company" links={FOOTER_LINKS.company} />

          {/* More */}
          <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-start md:justify-between lg:col-span-2 lg:gap-6">
            <div className="lg:flex-none">
              <FooterLinkGroup title="More" links={FOOTER_LINKS.more} />
            </div>

            {/* App Badges */}
            <div className="flex flex-col w-full md:w-auto md:items-end">
              
              <div className="flex flex-col gap-2 w-full items-stretch md:w-[220px] md:items-end">
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-black border border-white/30 hover:bg-black/85 transition-colors text-white whitespace-nowrap"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M2.4 1.8c-.2.2-.4.6-.4 1.1V21c0 .5.2.9.4 1.1l10.4-10.1L2.4 1.8z" fill="#00A0FF" />
                    <path d="M13.2 12l2.7-2.6-9.6-5.5L13.2 12z" fill="#EA4335" />
                    <path d="M13.2 12l2.7 2.6-9.6 5.5L13.2 12z" fill="#34A853" />
                    <path d="M16.4 9.8l3.8 2.2c.8.5.8 1.3 0 1.8l-3.8 2.2-3.2-3.1 3.2-3.1z" fill="#FBBC04" />
                  </svg>
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[9px] tracking-wide uppercase text-white/80">Get it on</span>
                    <span className="text-[13px] font-semibold">Google Play</span>
                  </span>
                </a>
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-black border border-white/30 hover:bg-black/85 transition-colors text-white whitespace-nowrap"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[9px] tracking-wide text-white/80">Download on the</span>
                    <span className="text-[13px] font-semibold">App Store</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 py-3 sm:py-4">
          <p className="text-caption text-white/40">
            © {currentYear} {SITE_NAME} Solutions Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-body-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <ul className="flex flex-col gap-1.5" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-body-sm text-white/55 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
