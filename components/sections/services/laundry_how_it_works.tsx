"use client";

import { useMemo } from "react";

type HowStep = {
  step: number;
  title: string;
  description: string;
};

export function LaundryHowItWorks() {
  const steps = useMemo<HowStep[]>(
    () => [
      {
        step: 1,
        title: "Detailed inspection",
        description:
          "Your pockets and clothes are inspected so nothing ends up in the wash that shouldn't.",
      },
      {
        step: 2,
        title: "Premium cleaning",
        description:
          "Your lights and darks are separated and all your clothes are washed using cold water to preserve color (and save energy).",
      },
      {
        step: 3,
        title: "Your preferences",
        description:
          "Need antiseptic wash? Want fabric softener? No problem - just select the laundry preferences that are right for you.",
      },
      {
        step: 4,
        title: "Neatly folded",
        description:
          "Your clothes are crisply folded and your socks are paired, ready to be put away upon delivery.",
      },
    ],
    []
  );

  return (
    <section id="laundry_how_it_works" className="w-full bg-[#eef1f7]">
      <div className="container py-10 sm:py-14">
        <h2 className="text-[28px] font-semibold leading-[1.2] text-dark sm:text-[36px] lg:text-[46px]">
          How it works
        </h2>

        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => {
              return (
                <div key={step.step} className="relative flex h-full w-full">
                  {/* Connecting Line - absolutely positioned so it doesn't affect card width */}
                  {index > 0 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute -left-6 top-1/2 h-1 w-6 -translate-y-1/2 rounded-full bg-primary"
                    />
                  )}

                  <article
                    className="group relative flex h-full min-h-[230px] w-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-linear-to-b from-white to-[#f8fafc] p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  >
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

