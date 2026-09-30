import type { Metadata } from "next";

import { SchedulePickupForm } from "@/components/sections/pickup/SchedulePickupForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Schedule a Pickup",
  description: `Book a free doorstep laundry and dry cleaning pickup with ${SITE_NAME}. Choose your state, city and nearest store, pick a date and time, and your store confirms the slot.`,
  alternates: { canonical: "/schedule-pickup" },
};

/**
 * The pickup booking page.
 *
 * Booking lives on its own route rather than inline on the homepage because the
 * form is a three-step flow — location, contact, service — and every
 * "Schedule Pickup" button across the site (hero, app banner, service pages)
 * points here. One page means one flow to keep correct, and a customer who
 * abandons the homepage form can be linked straight back to it from anywhere.
 */

const STEPS = [
  {
    step: "01",
    title: "Choose your store",
    body: "Pick your state, then your city, then the branch nearest you. It goes straight to that store.",
  },
  {
    step: "02",
    title: "Tell us what to collect",
    body: "Your address, the service you need, and a date and time window that suits you.",
  },
  {
    step: "03",
    title: "Store confirms the slot",
    body: "Your store calls you to lock in the exact pickup time. Nothing is charged now.",
  },
] as const;

export default function SchedulePickupPage() {
  return (
    <>
      {/* ── Page header ── */}
      <section className="border-b border-border-light bg-surface">
        <div className="container py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <span className="h-px w-6 bg-primary" />
              Free doorstep pickup
              <span className="h-px w-6 bg-primary" />
            </span>

            <h1 className="mt-4 text-display-sm font-bold leading-tight text-dark md:text-display-md">
              Schedule a Pickup
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-body-lg text-dark-muted">
              Three quick steps and your laundry is on its way. Choose the store
              nearest you, tell us what to collect, and they&apos;ll confirm a
              pickup time with you directly.
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                "No payment needed now",
                "Free collection & delivery",
                "Confirmed by your store",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-dark-secondary">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 shrink-0 text-success"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="section-py">
        <div className="container">
          <div className="mx-auto w-full max-w-[880px]">
            <SchedulePickupForm />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-border-light bg-surface">
        <div className="container py-14 sm:py-16">
          <h2 className="text-center text-heading-lg font-bold text-dark">
            How scheduling a pickup works
          </h2>

          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((item) => (
              <li key={item.step} className="relative">
                <span
                  aria-hidden="true"
                  className="text-4xl font-bold text-primary/25"
                >
                  {item.step}
                </span>
                <h3 className="mt-2 text-heading-sm font-semibold text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-body-sm text-dark-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
