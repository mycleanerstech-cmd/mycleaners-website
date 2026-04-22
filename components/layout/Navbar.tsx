"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { APP_LINKS, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useIsScrolled } from "@/lib/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, MenuIcon } from "@/components/ui/icons";
import { MobileMenu } from "./MobileMenu";
import cities from "@/mock/cities.json";

type City = {
  id: string;
  name: string;
  slug: string;
  state: string;
  storeCount?: number;
  isComingSoon?: boolean;
};

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled(12);
  const [isHeroNavbar, setIsHeroNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesWrapperRef = useRef<HTMLLIElement | null>(null);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const locationsWrapperRef = useRef<HTMLLIElement | null>(null);
  const [locationsQuery, setLocationsQuery] = useState("");

  const servicesDropdownLinks = [
    { label: "Laundry", href: "/services/laundry" },
    { label: "Dry Cleaning", href: "/services/dry-cleaning" },
    { label: "Home Service", href: "/services/home-services" },
  ] as const;

  useEffect(() => {
    // Close dropdown when route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setServicesOpen(false);
    setLocationsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;

    const onMouseDown = (event: MouseEvent) => {
      const wrapper = servicesWrapperRef.current;
      if (!wrapper) return;

      const target = event.target as Node | null;
      if (!target) return;

      // Close only if click happened outside the dropdown wrapper.
      if (!wrapper.contains(target)) setServicesOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [servicesOpen]);

  useEffect(() => {
    if (!locationsOpen) return;

    const onMouseDown = (event: MouseEvent) => {
      const wrapper = locationsWrapperRef.current;
      if (!wrapper) return;

      const target = event.target as Node | null;
      if (!target) return;

      // Close only if click happened outside the dropdown wrapper.
      if (!wrapper.contains(target)) setLocationsOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [locationsOpen]);

  useLayoutEffect(() => {
    const update = () => {
      if (pathname !== "/") {
        setIsHeroNavbar(false);
        return;
      }

      const el = document.getElementById("intro-video-hero");
      if (!el) {
        setIsHeroNavbar(false);
        return;
      }

      const rect = el.getBoundingClientRect();
      // Turn white only after the entire intro hero section is out of view.
      setIsHeroNavbar(rect.bottom > 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const orderedCities = useMemo(() => cities as City[], []);

  const filteredCities = useMemo(() => {
    const q = locationsQuery.trim().toLowerCase();
    if (!q) return orderedCities;

    return orderedCities.filter((city) => city.name.toLowerCase().includes(q));
  }, [locationsQuery, orderedCities]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 w-full transition-shadow duration-300",
          isHeroNavbar
            ? "bg-transparent shadow-none border-b-0"
            : "bg-white",
          !isHeroNavbar && (isScrolled ? "shadow-nav" : "border-b border-transparent")
        )}
      >
        <nav
          aria-label="Main navigation"
          className="container flex items-center justify-between h-[72px]"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label={`${SITE_NAME} — Home`}
            className="flex items-center gap-2 shrink-0"
          >
            <Image
              src="/images/My_Cleaners_Final_Logo.png"
              alt={`${SITE_NAME} logo`}
              width={256}
              height={64}
              style={{ width: "auto" }}
              className="h-16 w-auto select-none"
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href.length === 0
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");

              if (link.href === "/services") {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    ref={servicesWrapperRef}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((prev) => !prev)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-body-sm font-medium transition-colors duration-150 inline-flex items-center gap-1",
                        isActive
                          ? "text-primary bg-primary-light"
                          : isHeroNavbar
                            ? "text-white/80 hover:text-white hover:bg-white/10"
                            : "text-dark-secondary hover:text-dark hover:bg-surface"
                      )}
                    >
                      {link.label}
                      <ChevronDownIcon
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          servicesOpen && "rotate-180",
                          isActive ? "text-primary" : isHeroNavbar ? "text-white/80" : "text-dark-secondary"
                        )}
                      />
                    </button>

                    <div
                      role="menu"
                      aria-label="Services submenu"
                      className={cn(
                        "absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-xl border border-border-light bg-white shadow-nav transition-all",
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      )}
                    >
                      <ul className="py-2" role="list">
                        {servicesDropdownLinks.map((s) => {
                          const isSubActive =
                            pathname === s.href || pathname.startsWith(s.href + "/");

                          return (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                onClick={() => setServicesOpen(false)}
                                role="menuitem"
                                className={cn(
                                  "block px-4 py-2.5 text-body-sm font-medium transition-colors",
                                  isSubActive
                                    ? "text-primary bg-primary-light"
                                    : "text-dark-secondary hover:text-dark hover:bg-surface"
                                )}
                              >
                                {s.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }

              if (link.href === "/locations") {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    ref={locationsWrapperRef}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={locationsOpen}
                      onClick={() => setLocationsOpen((prev) => !prev)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-body-sm font-medium transition-colors duration-150 inline-flex items-center gap-1",
                        isActive
                          ? "text-primary bg-primary-light"
                          : isHeroNavbar
                            ? "text-white/80 hover:text-white hover:bg-white/10"
                            : "text-dark-secondary hover:text-dark hover:bg-surface"
                      )}
                    >
                      {link.label}
                      <ChevronDownIcon
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          locationsOpen && "rotate-180",
                          isActive
                            ? "text-primary"
                            : isHeroNavbar
                              ? "text-white/80"
                              : "text-dark-secondary"
                        )}
                      />
                    </button>

                    <div
                      role="menu"
                      aria-label="Locations submenu"
                      className={cn(
                        "absolute left-0 top-full z-50 mt-2 min-w-[320px] rounded-xl border border-border-light bg-white shadow-nav transition-all",
                        locationsOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="p-3 border-b border-border">
                        <label htmlFor="locations-search" className="sr-only">
                          Search cities
                        </label>
                        <input
                          id="locations-search"
                          value={locationsQuery}
                          onChange={(e) => setLocationsQuery(e.target.value)}
                          placeholder="Search for cities..."
                          type="search"
                          autoComplete="off"
                          className="w-full rounded-lg border border-border-light bg-surface px-3 py-2 text-body-sm outline-none focus:border-primary focus:bg-white"
                        />
                      </div>

                      <ul
                        className="py-2 max-h-[320px] overflow-y-auto"
                        role="list"
                      >
                        {filteredCities.length === 0 ? (
                          <li className="px-4 py-2.5 text-body-sm text-dark-secondary">
                            No cities found
                          </li>
                        ) : (
                          filteredCities.map((city) => {
                            const cityHref = `/locations/${city.slug}`;
                            return (
                              <li key={city.id}>
                                <Link
                                  href={cityHref}
                                  onClick={() => {
                                    setLocationsOpen(false);
                                  }}
                                  role="menuitem"
                                  className={cn(
                                    "block px-4 py-2.5 text-body-sm font-medium transition-colors",
                                    pathname === cityHref
                                      ? "text-primary bg-primary-light"
                                      : "text-dark-secondary hover:text-dark hover:bg-surface"
                                  )}
                                >
                                  {city.name}
                                </Link>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-body-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-primary bg-primary-light"
                        : isHeroNavbar
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-dark-secondary hover:text-dark hover:bg-surface"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop App Buttons ── */}
          <div className="hidden md:flex items-center gap-3">
            {isHeroNavbar ? (
              <>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-body-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  Android App
                </a>
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-body-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  iOS App
                </a>
              </>
            ) : (
              <>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-black border border-white/30 hover:bg-black/85 transition-colors text-white whitespace-nowrap"
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
                  className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-black border border-white/30 hover:bg-black/85 transition-colors text-white whitespace-nowrap"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-[13px] font-semibold leading-none">iOS App</span>
                </a>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              "md:hidden p-2 -mr-1 rounded-lg transition-colors",
              isHeroNavbar ? "text-white/90 hover:bg-white/10" : "text-dark hover:bg-surface"
            )}
          >
            <MenuIcon size={24} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
