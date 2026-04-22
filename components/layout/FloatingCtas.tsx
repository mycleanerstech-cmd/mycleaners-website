"use client";

import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SITE_PHONE, SITE_WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingCtas() {
  return (
    <div
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-6"
      aria-label="Quick contact actions"
    >
      <Link
        href={`tel:${SITE_PHONE}`}
        aria-label="Call us now"
        className={cn(
          "cta-float-pulse group inline-flex items-center justify-center rounded-full",
          "h-10 min-w-10 md:h-12 md:min-w-12 px-3 md:px-4",
          "bg-primary text-white shadow-[0_10px_24px_rgba(245,130,32,0.4)]",
          "hover:bg-primary-dark transition-colors duration-200"
        )}
      >
        <PhoneIcon size={18} className="shrink-0" />
        {/* <span className="ml-2 hidden md:inline text-body-sm font-semibold">Call Now</span> */}
      </Link>

      <Link
        href={`${SITE_WHATSAPP_LINK}?text=Hello%2C%20I%20am%20interested%20in%20your%20services%20%0Akindly%20take%20a%20look`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{ animationDelay: "0.55s" }}
        className={cn(
          "cta-float-pulse group inline-flex items-center justify-center rounded-full",
          "h-10 min-w-10 md:h-12 md:min-w-12 px-3 md:px-4",
          "bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.45)]",
          "hover:bg-[#1EBB58] transition-colors duration-200"
        )}
      >
        <WhatsAppIcon size={18} className="shrink-0" />
        {/* <span className="ml-2 hidden md:inline text-body-sm font-semibold">WhatsApp</span> */}
      </Link>
    </div>
  );
}
