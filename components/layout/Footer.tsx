import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  LEGAL_NAME,
  SITE_TAGLINE,
  SITE_PHONE_DISPLAY,
  SITE_EMAIL,
  FOOTER_LINKS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { AppComingSoonBadge } from "@/components/ui/AppComingSoonBadge";
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
              {/* Same scale steps as the navbar so the brand mark reads at an
                  identical size in both places. */}
              <Image
                src="/images/white-logo.png"
                alt={`${SITE_NAME} logo`}
                width={218}
                height={32}
                className="h-6 sm:h-7 xl:h-8 w-auto select-none"
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

            {/* App Status */}
            {/* Not a link: the old store badges pointed at retired listings, so
                the app is teased as "Coming Soon". Swap back for the two store
                badges when APP_AVAILABLE flips to true. */}
            <div className="flex w-full flex-col items-stretch gap-2.5 md:w-[220px] md:items-end">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 md:text-right">
                Mobile App
              </span>
              <AppComingSoonBadge tone="dark" className="w-full justify-center md:w-auto" />
              <p className="text-caption leading-snug text-white/45">
                iOS &amp; Android — launching soon.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 py-3 sm:py-4">
          <p className="text-caption text-white/40">
            © {currentYear} {LEGAL_NAME}. All rights reserved.
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
