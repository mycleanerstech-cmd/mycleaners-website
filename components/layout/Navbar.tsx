"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { NAV_LINKS, PICKUP_HREF, SCHEDULE_PICKUP_LABEL, SITE_NAME } from "@/lib/constants";
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
          "sticky top-0 z-30 w-full transition-[background-color,box-shadow] duration-300",
          // Three states, not two. Over the hero at rest the nav is invisible so
          // the video runs edge to edge; once the page scrolls it turns to glass
          // so it reads as sitting on the footage rather than floating over it.
          isHeroNavbar
            ? isScrolled
              ? "hero-nav-glass border-b border-white/10 shadow-none"
              : "bg-transparent shadow-none border-b-0"
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
            className="relative flex items-center gap-2 shrink-0"
          >
            {/* Both files are cropped to their artwork, so the height classes below
                set the visible wordmark height directly (24 / 28 / 32px). The white
                logo is absolutely positioned and ~8px narrower, so the hero/scrolled
                swap never shifts the nav links. The step up to 32px waits for xl
                because the nav links + app badges need the extra room below a
                1200px container. */}
            <Image
              src="/images/logo.png"
              alt={`${SITE_NAME} logo`}
              width={226}
              height={32}
              className={cn(
                "h-6 sm:h-7 xl:h-8 w-auto select-none transition-opacity duration-300",
                isHeroNavbar ? "opacity-0" : "opacity-100"
              )}
            />
            <Image
              src="/images/white-logo.png"
              alt=""
              aria-hidden="true"
              width={218}
              height={32}
              className={cn(
                "absolute left-0 top-1/2 h-6 sm:h-7 xl:h-8 w-auto -translate-y-1/2 select-none transition-opacity duration-300",
                isHeroNavbar ? "opacity-100" : "opacity-0"
              )}
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
                        "px-3 py-2 xl:px-4 rounded-lg text-body-sm font-medium transition-colors duration-150 inline-flex items-center gap-1",
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
                        "px-3 py-2 xl:px-4 rounded-lg text-body-sm font-medium transition-colors duration-150 inline-flex items-center gap-1",
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
                      "px-3 py-2 xl:px-4 rounded-lg text-body-sm font-medium transition-colors duration-150",
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

          {/* ── App Status ── */}
          {/* Shown from lg up: below 1024px the links + logo already fill the row. */}
          {/* The old Android/iOS links pointed at retired store listings, so the
              app is teased as "Coming Soon" instead of linking anywhere. Swap
              this back for two store badges when APP_AVAILABLE flips to true. */}
          {/* ── Schedule Pickup ── */}
          {/* Booking is the one action that has to stay reachable from every page,
              so it lives in the nav rather than only in the hero. It borrows the
              App badge's chrome — a translucent outlined pill rather than a solid
              fill — so the bar stays light: over the video that glass outline is
              the only thing legible against moving footage, and on the white nav
              the same shape reads as a partial orange rather than a solid block
              of brand colour. It carries a little more weight than the old static
              badge because this one is a real, focusable link. */}
          <Link
            href={PICKUP_HREF}
            className={cn(
              "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-[13px] font-semibold leading-none whitespace-nowrap transition-colors duration-200 xl:h-10 xl:px-5 xl:text-sm",
              isHeroNavbar
                ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                : "border-primary/30 bg-primary-light text-primary-dark hover:border-primary/50 hover:bg-primary/15"
            )}
          >
            {SCHEDULE_PICKUP_LABEL}
          </Link>

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
