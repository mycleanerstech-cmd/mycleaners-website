import Image from "next/image";
import type { ReactElement } from "react";
import { APP_COMING_SOON, APP_FEATURES, SITE_NAME } from "@/lib/constants";
import { AppComingSoonBadge } from "@/components/ui/AppComingSoonBadge";
import { SchedulePickupButton } from "@/components/ui/SchedulePickupButton";
import {
  BellIcon,
  CalendarIcon,
  GridIcon,
  TruckIcon,
  type IconProps,
} from "@/components/ui/icons";

const FEATURE_ICONS: Record<
  (typeof APP_FEATURES)[number]["icon"],
  (props: IconProps) => ReactElement
> = {
  calendar: CalendarIcon,
  truck: TruckIcon,
  grid: GridIcon,
  bell: BellIcon,
};

/**
 * Landing page banner teasing the upcoming Mycleaners Mobile App.
 *
 * Placement: directly after How It Works, so it lands while the visitor is
 * already thinking "how do I book?" and hands them the Schedule Pickup CTA
 * before the map / testimonials / FAQ tail of the page.
 *
 * Layout — one full-bleed artwork, two treatments:
 * - Desktop (xl+): the landscape artwork *is* the background of the whole band
 *   and the copy sits on top of its left side, which is intentionally empty
 *   textured white. `object-right` means the only part a taller band ever
 *   crops is that blank left margin, never the phones.
 * - Phone / tablet: the portrait artwork becomes a banner strip on top, cropped
 *   to `center 64%` so both phones stay in frame, with the copy stacked below.
 *
 * Sizing is deliberately not fluid. The copy has to stay inside the artwork's
 * empty left third, and every extra pixel of band height costs ~1.5px of that
 * room (the art is 2.81:1, so height is bought by cropping width). Hence the
 * fixed `max-w` steps: 460px at xl, 480px from 1536px. Widening the copy box
 * or adding a line of copy pushes the text over the plant/towels. The widest
 * tier is an arbitrary `min-[1536px]:` variant rather than `2xl:` because the
 * legacy `tailwind.config.ts` loaded via `@config` exposes no `2xl` screen, so
 * `2xl:` utilities silently generate nothing.
 *
 * Hide this section entirely once APP_AVAILABLE flips to `true`.
 */
export function AppComingSoonSection() {
  return (
    <section
      id={APP_COMING_SOON.bannerId}
      aria-labelledby="app-coming-soon-title"
      className="relative w-full bg-[#f7f3ee]"
    >
      {/* Desktop: the artwork becomes the band's whole background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden xl:block"
      >
        <Image
          src="/images/app-banner-desktop.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
        />
        {/* Feathers the artwork's blank left side into the page surface so the
            copy always has a clean, high-contrast backdrop. */}
        <div className="absolute inset-0 bg-linear-to-r from-[#f7f3ee] from-0% via-[#f7f3ee]/80 via-36% to-transparent to-70%" />
      </div>

      {/* Phone / tablet: the portrait artwork as a strip above the copy. */}
      <div className="relative h-[230px] w-full sm:h-[300px] lg:h-[340px] xl:hidden">
        <Image
          src="/images/app-banner-mobile.png"
          alt={`${SITE_NAME} Mobile App screens showing pickup booking and order tracking`}
          fill
          // Portrait strip: biased onto the phones rather than the empty wall.
          className="object-cover object-[center_64%]"
          sizes="(max-width: 1279px) 100vw, 0px"
        />
      </div>

      {/* ── Copy ── */}
      <div className="container relative py-8 sm:py-10 xl:py-10 min-[1536px]:py-14">
        <div className="max-w-[440px] sm:max-w-[520px] xl:max-w-[460px] min-[1536px]:max-w-[480px]">
          <div className="flex flex-wrap items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-primary" />
            <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-dark-secondary">
              {APP_COMING_SOON.eyebrow}
            </span>
            <AppComingSoonBadge withIcon={false} />
          </div>

          <h2
            id="app-coming-soon-title"
            className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-dark sm:text-[34px] lg:text-[38px] min-[1536px]:text-[42px]"
          >
            Your Laundry.
            <span className="block text-primary">One Tap Away.</span>
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-dark-secondary sm:text-[16px] xl:text-[15px] min-[1536px]:text-[16px]">
            {/* One template literal, not bare JSX text around `{SITE_NAME}`:
                split this way the React Compiler eats the spaces next to the
                expression ("Mycleaners Mobile Appis on its way"). */}
            {`Book pickups, track orders, and manage your cleaning services from your phone. The ${SITE_NAME} Mobile App is on its way — schedule your first pickup now and we'll take it from there.`}
          </p>

          <div className="mt-6 sm:mt-7">
            <SchedulePickupButton className="w-full sm:w-auto sm:px-9" />
          </div>

          <ul
            className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 sm:mt-8 sm:grid-cols-4 sm:gap-x-3"
            role="list"
          >
            {APP_FEATURES.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <li
                  key={feature.label}
                  className="flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-2.5"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary xl:size-9">
                    <Icon size={18} strokeWidth={2.1} />
                  </span>
                  <span className="text-[13px] font-semibold leading-tight text-dark sm:text-[13.5px]">
                    {feature.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
