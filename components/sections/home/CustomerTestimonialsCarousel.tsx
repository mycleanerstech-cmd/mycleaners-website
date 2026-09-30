"use client";

import { useEffect, useMemo, useState } from "react";
import testimonials from "@/mock/customer_testimonials.json";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon, StarIcon } from "@/components/ui/icons";

type CustomerTestimonial = {
  name: string;
  rating: number;
  text: string;
};

const MAX_RATING = 5;

function RatingStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`flex items-center gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <StarIcon
          key={index}
          size={14}
          filled={index < rating}
          aria-hidden="true"
          className={index < rating ? "text-primary" : "text-border-light"}
        />
      ))}
    </span>
  );
}

function getRelativePosition(index: number, activeIndex: number, total: number): -1 | 0 | 1 | 2 {
  const forward = (index - activeIndex + total) % total;
  if (forward === 0) return 0;
  if (forward === 1) return 1;
  if (forward === total - 1) return -1;
  return 2;
}

export function CustomerTestimonialsCarousel() {
  const items = useMemo(() => testimonials as CustomerTestimonial[], []);
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
  const activeItem = items[activeIndex];

  return (
    <section className="w-full bg-white">
      <div className="container pt-12 pb-5 sm:pt-16 sm:pb-6">
        <h2 className="text-center text-[32px] font-bold leading-[1.2] text-dark sm:text-[42px]">
          What Our Customers Say
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-body-md text-dark-muted">
          Real experiences from customers who trust us for laundry and dry cleaning.
        </p>

        {/* Mobile: single card (no absolute positioning) */}
        <div className="mx-auto mt-8 w-full max-w-[700px] md:hidden">
          <article className="w-full rounded-3xl border border-primary/70 bg-white p-5 shadow-[0_0_0_1px_rgba(245,130,32,0.35),0_16px_38px_rgba(245,130,32,0.25)] sm:p-7">
            <div className="text-center">
              <QuoteIcon size={22} className="mx-auto text-dark" />
            </div>

            <p className="mt-4 text-center text-[1.02rem] leading-8 text-dark">{activeItem.text}</p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark/8 text-dark">
                <span className="text-sm font-semibold">{activeItem.name.charAt(0)}</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-dark">{activeItem.name}</p>
                <div className="mt-1 flex justify-center">
                  <RatingStars rating={activeItem.rating} />
                </div>
              </div>
            </div>
          </article>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goPrev}
              className="rounded-full bg-primary p-2 text-white shadow-btn transition-all hover:scale-105 hover:bg-primary-dark"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className="rounded-full bg-primary p-2 text-white shadow-btn transition-all hover:scale-105 hover:bg-primary-dark"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>

        {/* Desktop+: stacked carousel with animation (franchise-style) */}
        <div className="relative mx-auto mt-8 hidden h-[430px] w-full max-w-[1100px] md:block lg:h-[470px]">
          {items.map((item, index) => {
            const pos = getRelativePosition(index, activeIndex, total);
            const isActive = pos === 0;
            const isSide = pos === -1 || pos === 1;

            /* The sticky navbar is z-30, so every layer here must stay below it.
               Tying the active card to z-30 (or going higher for the arrows) let
               the cards paint over the nav, because they come later in the DOM
               and the header creates the stacking context they sit beside. */
            const positionClasses =
              pos === 0
                ? "left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100"
                : pos === -1
                  ? "left-[18%] z-10 hidden -translate-x-1/2 -translate-y-1/2 scale-95 opacity-35 md:block lg:left-[24%]"
                  : pos === 1
                    ? "left-[82%] z-10 hidden -translate-x-1/2 -translate-y-1/2 scale-95 opacity-35 md:block lg:left-[76%]"
                    : "left-1/2 z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0";

            return (
              <article
                key={`${item.name}-${index}`}
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
                  {item.text}
                </p>

                <div className="mt-7 flex items-center justify-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      isActive ? "bg-dark/8 text-dark" : "bg-dark/5 text-dark/45"
                    }`}
                  >
                    <span className="text-sm font-semibold">{item.name.charAt(0)}</span>
                  </div>
                  <div className="text-center">
                    <p className={`font-semibold ${isActive ? "text-dark" : "text-dark/45"}`}>
                      {item.name}
                    </p>
                    <div className="mt-1 flex justify-center">
                      <RatingStars rating={item.rating} className={isActive ? undefined : "opacity-60"} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-primary p-2 text-white shadow-btn transition-all hover:scale-105 hover:bg-primary-dark sm:left-2"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full bg-primary p-2 text-white shadow-btn transition-all hover:scale-105 hover:bg-primary-dark sm:right-2"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

