"use client";

import { useState } from "react";
import { CareerApplyModal } from "@/components/sections/careers/CareerApplyModal";
import { Button } from "@/components/ui/Button";

/**
 * Top hero for the Careers page: full-width background image with a light wash
 * so headline and supporting copy stay readable on the left.
 */
export function Careers_Hero() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <section
      className="relative isolate flex min-h-[min(72vh,820px)] w-full items-center"
      aria-labelledby="careers-hero-heading"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/careers-hero.png)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-1 bg-linear-to-r from-white/90 via-white/82 to-white/65"
        aria-hidden
      />
      <div className="container relative z-10 flex flex-col justify-center py-16 sm:py-20">
        <div className="max-w-xl lg:max-w-[min(42rem,calc(50vw-2rem))]">
          <h1
            id="careers-hero-heading"
            className="text-display-sm text-dark sm:text-display-md lg:text-display-lg"
          >
            Join MyCleaners team
          </h1>
          <p className="mt-5 text-body-lg text-dark/95 leading-relaxed">
            Join the team of passionate and hardworking people trying to build
            the best clothing care brand and provide high quality cleaning
            services to every household.
          </p>
          <div className="mt-8">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => setApplyOpen(true)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      <CareerApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </section>
  );
}
