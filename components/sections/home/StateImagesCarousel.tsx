"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/Assam.jpg", alt: "Assam" },
  { src: "/images/HimachalPradesh.jpg", alt: "Himachal Pradesh" },
  { src: "/images/UttarPradesh.jpg", alt: "Uttar Pradesh" },
  { src: "/images/Uttarakhand.jpg", alt: "Uttarakhand" },
  { src: "/images/Jharkhand.jpg", alt: "Jharkhand" },
  { src: "/images/Maharashtra.jpg", alt: "Maharashtra" },
  { src: "/images/Tripura.jpg", alt: "Tripura" },
] as const;

export function StateImagesCarousel() {
  const slides = useMemo(() => SLIDES, []);
  const total = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      goNext();
    }, 2000);

    return () => window.clearInterval(timerId);
  }, [goNext]);

  return (
    <section className="overflow-x-clip pt-0 pb-5 sm:pb-7">
      <div className="relative left-1/2 w-dvw max-w-dvw -translate-x-1/2 overflow-hidden shadow-card">
        {/* Images */}
        <div className="relative h-[200px] w-full sm:h-[300px] md:h-[390px] lg:h-[480px]">
          {slides.map((slide, index) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className={`
                  h-full w-full
                  object-cover object-center
                  transition-all duration-700 ease-in-out
                  ${
                    index === activeIndex
                      ? "relative opacity-100 z-10 scale-100"
                      : "absolute inset-0 opacity-0 z-0 scale-110"
                  }
                `}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/30 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent sm:h-32" />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-dark shadow-nav transition-colors hover:bg-white sm:right-4 sm:h-10 sm:w-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Prev Button */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-dark shadow-nav transition-colors hover:bg-white sm:left-4 sm:h-10 sm:w-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${slide.alt}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-5 bg-white"
                  : "w-2 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

