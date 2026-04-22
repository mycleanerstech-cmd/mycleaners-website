"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_LINKS, NAV_LINKS, SITE_WHATSAPP_LINK } from "@/lib/constants";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  useScrollLock(isOpen);
  const [servicesOpen, setServicesOpen] = useState(false);

  const servicesDropdownLinks = [
    { label: "Laundry", href: "/services/laundry" },
    { label: "Dry Cleaning", href: "/services/dry-cleaning" },
    { label: "Home Service", href: "/services/home-services" },
  ] as const;

  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white flex flex-col",
          "shadow-2xl transition-transform duration-300 ease-smooth",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="text-heading-sm font-bold text-dark">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 rounded-lg text-dark-secondary hover:bg-surface hover:text-dark transition-colors"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

              if (link.href === "/services") {
                return (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((prev) => !prev)}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 rounded-lg font-medium text-body-md transition-colors",
                        isActive ? "bg-primary-light text-primary font-semibold" : "text-dark-secondary hover:bg-surface hover:text-dark"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDownIcon
                        size={18}
                        className={cn("transition-transform", servicesOpen && "rotate-180", isActive ? "text-primary" : "text-dark-secondary")}
                      />
                    </button>

                    {servicesOpen && (
                      <ul className="mt-1 space-y-1 pl-4" role="menu" aria-label="Services submenu">
                        {servicesDropdownLinks.map((s) => {
                          const isSubActive = pathname === s.href || pathname.startsWith(s.href + "/");
                          return (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                onClick={onClose}
                                role="menuitem"
                                className={cn(
                                  "block px-4 py-3 rounded-lg font-medium text-body-md transition-colors",
                                  isSubActive
                                    ? "bg-primary-light text-primary font-semibold"
                                    : "text-dark-secondary hover:bg-surface hover:text-dark"
                                )}
                              >
                                {s.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg font-medium text-body-md transition-colors",
                      isActive
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-dark-secondary hover:bg-surface hover:text-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div className="px-6 py-6 border-t border-border space-y-3">
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
            <span className="text-[13px] font-semibold leading-none">Android App</span>
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
            <span className="text-[13px] font-semibold leading-none">iOS App</span>
          </a>
          <a
            href={SITE_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#25D366]/10 text-[#128C7E] font-medium text-body-sm hover:bg-[#25D366]/20 transition-colors"
          >
            <WhatsAppIcon size={18} className="shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
