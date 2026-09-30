"use client";

import { useMemo } from "react";
import { HOW_IT_WORKS_STEPS, SITE_NAME } from "@/lib/constants";

export function HowItWorksSection() {
  const steps = useMemo(() => HOW_IT_WORKS_STEPS, []);

  return (
    <section className="w-full bg-[#eef1f7]">
      <div className="container py-10 sm:py-14">
        <h2 className="text-[28px] font-semibold leading-[1.2] text-primary sm:text-[36px] lg:text-[46px]">
          How {SITE_NAME} Work?
        </h2>
        <p className="mt-4 text-[18px] font-semibold leading-[1.35] text-dark sm:text-[24px] lg:text-[34px]">
          We collect, clean, and deliver your laundry and dry cleaning at your doorstep
        </p>

        <div className="mt-12 sm:mt-16 overflow-hidden">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:flex lg:flex-nowrap lg:items-stretch lg:justify-start lg:gap-0">
            {steps.map((step, index) => {
              return (
                <div key={step.step} className="flex w-full items-center lg:w-auto">
                  {index > 0 && (
                    <div
                      aria-hidden="true"
                      className="hidden h-1 origin-left rounded-full bg-primary xl:w-10 w-8 lg:block"
                    />
                  )}

                  <article className="group relative w-full overflow-hidden rounded-2xl border border-white/70 bg-linear-to-b from-white to-[#f8fafc] p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover lg:w-[220px] xl:w-[240px]">
                    <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />

                    <h3 className="mt-1 text-[1.35rem] font-semibold leading-tight text-dark sm:text-[1.5rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-body-md leading-relaxed text-dark-secondary">
                      {step.description}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

