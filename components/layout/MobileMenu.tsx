"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, CONTACT_HREF, PICKUP_HREF, SCHEDULE_PICKUP_LABEL } from "@/lib/constants";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";

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
        {/* The two actions that matter on a phone. The app badge that used to
            sit here was a dead chip, and the nav already overflowed on small
            screens, so booking gets the primary slot and the enquiry form the
            secondary one. */}
        <div className="space-y-3 border-t border-border px-6 py-6">
          <Link
            href={PICKUP_HREF}
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-body-md font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {SCHEDULE_PICKUP_LABEL}
          </Link>
          <Link
            href={CONTACT_HREF}
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary-light px-5 py-3.5 text-body-md font-semibold text-primary-dark transition-colors hover:border-primary/50 hover:bg-primary/15"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
