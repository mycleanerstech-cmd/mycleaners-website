"use client";

import { useEffect, useMemo, useState } from "react";
import testimonialsData from "@/mock/franchise_testimonials.json";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "@/components/ui/icons";

type FranchiseTestimonial = {
  name: string;
  location: string;
  quote: string;
};

function getRelativePosition(index: number, activeIndex: number, total: number): -1 | 0 | 1 | 2 {
  const forward = (index - activeIndex + total) % total;
  if (forward === 0) return 0;
  if (forward === 1) return 1;
  if (forward === total - 1) return -1;
  return 2;
}

export function Franchise_Testimonials() {
  const items = useMemo(
    () => (testimonialsData.franchise_testimonials ?? []) as FranchiseTestimonial[],
    [],
  );
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (total <= 1) return;
    const timerId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2800);

    return () => window.clearInterval(timerId);
  }, [total]);

  if (total === 0) return null;

  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  return (
    <section className="w-full bg-white">
      <div className="container pt-12 pb-5 sm:pt-16 sm:pb-6">
        <h2 className="text-center text-[32px] font-bold leading-[1.2] text-dark sm:text-[42px]">
          What Our Franchise Partners Say
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-body-md text-dark-muted">
          Real stories from partners growing with Mycleaners.
        </p>

        <div className="relative mx-auto mt-8 h-[400px] w-full max-w-[1100px] sm:h-[430px] lg:h-[470px]">
          {items.map((item, index) => {
            const pos = getRelativePosition(index, activeIndex, total);
            const isActive = pos === 0;
            const isSide = pos === -1 || pos === 1;

            const positionClasses =
              pos === 0
                ? "left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100"
                : pos === -1
                  ? "left-[18%] z-20 hidden -translate-x-1/2 -translate-y-1/2 scale-95 opacity-35 md:block lg:left-[24%]"
                  : pos === 1
                    ? "left-[82%] z-20 hidden -translate-x-1/2 -translate-y-1/2 scale-95 opacity-35 md:block lg:left-[76%]"
                    : "left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0";

            return (
              <article
                key={`${item.name}-${item.location}-${index}`}
                className={`absolute top-1/2 w-[92vw] max-w-[520px] rounded-3xl border bg-white p-5 transition-all duration-700 ease-smooth sm:p-7 md:w-[82vw] md:max-w-[410px] ${
                  isActive
                    ? "border-primary/70 shadow-[0_0_0_1px_rgba(245,130,32,0.35),0_16px_38px_rgba(245,130,32,0.25)]"
                    : "border-border-light shadow-card"
                } ${positionClasses}`}
                aria-hidden={!isActive && !isSide}
              >
                <div className="text-center">
                  <QuoteIcon size={22} className={isActive ? "mx-auto text-dark" : "mx-auto text-dark/35"} />
                </div>

                <p
                  className={`mt-4 text-center text-[1.02rem] leading-8 ${
                    isActive ? "text-dark" : "text-dark/45"
                  }`}
                >
                  {item.quote}
                </p>

                <div className="mt-7 flex items-center justify-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isActive ? "bg-dark/8 text-dark" : "bg-dark/5 text-dark/45"
                    }`}
                  >
                    <span className="text-sm font-semibold">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className={`font-semibold ${isActive ? "text-dark" : "text-dark/45"}`}>{item.name}</p>
                    <p className={`text-sm ${isActive ? "text-dark-muted" : "text-dark/35"}`}>
                      {item.location}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            className="absolute left-1 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary p-2 text-white shadow-btn transition-all hover:scale-105 hover:bg-primary-dark sm:left-2"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            className="absolute right-1 top-1/2 z-40 -translate-y-1/2 rounded-full bg-primary p-2 text-white shadow-btn transition-all hover:scale-105 hover:bg-primary-dark sm:right-2"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
