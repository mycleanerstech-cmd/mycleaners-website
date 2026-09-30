"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SchedulePickupButton } from "@/components/ui/SchedulePickupButton";
import { PICKUP_HREF } from "@/lib/constants";

/**
 * The services the hero advertises.
 *
 * These used to be four glass pills, which is roughly a full row of height for a
 * row of navigation. As a single quiet line they cost a line instead, and the
 * video gets the vertical space back. They stay real links: the row is low
 * contrast until hover, but it is still the fastest route for a visitor who
 * already knows what they need. "Doorstep Pickup" is a process rather than a
 * service, so it points at the booking flow instead of a service page.
 */
const SERVICE_LINKS = [
  { label: "Laundry", href: "/services/laundry" },
  { label: "Dry Cleaning", href: "/services/dry-cleaning" },
  { label: "Home Cleaning", href: "/services/home-services" },
  { label: "Doorstep Pickup", href: PICKUP_HREF },
] as const;

export function IntroVideo() {
  return (
    <section
      id="intro-video-hero"
      // Offset the hero up so the sticky navbar background doesn't reveal the white body.
      className="relative w-full overflow-hidden bg-black -mt-[72px] mb-0"
    >
      <div className="flex flex-col relative min-h-[calc(100svh+72px)] bg-black">
        <video
          src="/videos/Intro_video.mov"
          className="absolute inset-0 w-full h-full object-cover object-center bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Readability wash. Deliberately not flat: see `.hero-scrim` in
            globals.css — the left column is pushed down for contrast while the
            right half, where the person stands, is left bright enough to still
            read as photography. */}
        <div className="hero-scrim pointer-events-none absolute inset-0" />

        {/* Bottom shadow gradient, softening the cut from video to the white
            section below. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/75 to-transparent" />

        {/* Content layout: Flows naturally on mobile, absolute center on desktop */}
        <div className="absolute inset-0 flex items-center pt-[104px] pb-12 sm:pt-[128px] md:pb-0 md:pt-[72px]">
          <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto text-left">
            <div className="max-w-[33rem] break-words [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
              {/* Eyebrow. One line of uppercase sets the hierarchy: category,
                  promise, then explanation. */}
              <p className="flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/70">
                <span className="h-px w-8 shrink-0 bg-primary" aria-hidden="true" />
                Cleaning made simple
              </p>

              {/* Only one phrase is orange, so the accent reads as emphasis
                  instead of half the headline. */}
              <h1 className="mt-5 text-[2.125rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.75rem] lg:text-[3.125rem]">
                Simplifying Home &amp; Life
                <span className="mt-1 block text-white/90">
                  with <span className="text-primary">effortless cleaning.</span>
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-[1.0625rem]">
                Laundry, dry cleaning &amp; home cleaning — picked up from your
                doorstep and delivered back fresh.
              </p>

              {/* Leading dots rather than " · " between items: the row wraps on
                  narrow phones, and a separator that ends up at the start of the
                  second line reads as a typo. A dot owned by its own item always
                  travels with its label. */}
              <ul className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-sm font-medium text-white/70">
                {SERVICE_LINKS.map(({ label, href }) => (
                  <li key={label} className="flex items-center gap-2">
                    <span
                      className="size-1 shrink-0 rounded-full bg-white/35"
                      aria-hidden="true"
                    />
                    <Link
                      href={href}
                      className="underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Secondary action points at the human, not another product page:
                  a visitor who is not ready to book wants to ask a question.
                  "Explore Services" is already one tap away in the navbar. */}
              <div className="mt-8 sm:mt-9 pointer-events-auto">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-4">
                  <SchedulePickupButton
                    label="Schedule a Pickup"
                    size="md"
                    className="h-12 w-full justify-center text-base sm:w-auto sm:px-7"
                  />
                  <Link
                    href="/contact"
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/[0.06] px-7 text-base font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:border-white/60 hover:bg-white/15 sm:w-auto"
                  >
                    Contact Us
                    <ArrowRightIcon
                      size={17}
                      strokeWidth={2.2}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
