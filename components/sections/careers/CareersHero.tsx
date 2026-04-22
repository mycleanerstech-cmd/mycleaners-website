import { SITE_NAME } from "@/lib/constants";

export function CareersHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border-light bg-surface-alt"
      aria-labelledby="careers-hero-heading"
    >
      <div className="container relative py-14 sm:py-20 lg:py-24">
        <p className="text-caption font-semibold uppercase tracking-[0.2em] text-primary">
          Careers
        </p>
        <h1
          id="careers-hero-heading"
          className="mt-3 max-w-3xl text-display-sm text-dark sm:text-display-md"
        >
          Build the future of laundry with {SITE_NAME}
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-dark-secondary">
          Real roles, real growth, and a team that actually moves fast—whether you are on the road,
          behind campaigns, or running ops.
        </p>
      </div>
    </section>
  );
}
