"use client";

import { WHY_CHOOSE_US, SITE_NAME } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";
import {
  ClockIcon,
  RupeeIcon,
  ShieldIcon,
  SparkleIcon,
  LeafIcon,
  HeartIcon,
} from "@/components/ui/icons";

const ICON_BY_TITLE = {
  Convenience: ClockIcon,
  "Value for Money": RupeeIcon,
  Transparency: ShieldIcon,
  Quality: SparkleIcon,
  "Eco-Friendly": LeafIcon,
  Community: HeartIcon,
} as const;

export function WhyChooseUsSection() {
  const items = useMemo(() => WHY_CHOOSE_US, []);
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth < 640) {
        setCardWidth(264);
        return;
      }
      if (window.innerWidth < 1024) {
        setCardWidth(288);
        return;
      }
      setCardWidth(300);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2200);

    return () => window.clearInterval(timerId);
  }, [total]);

  return (
    <section className="w-full bg-surface/55">
      <div className="container pt-6 pb-10 sm:pt-8 sm:pb-14">
        <h1 className="text-center text-[40px] font-bold uppercase leading-[1.05] tracking-[0.08em] text-primary sm:text-[52px]">
          Why choose us
        </h1>
        <h2 className="mx-auto mt-2 max-w-3xl text-center text-[30px] font-semibold leading-[38px] text-dark sm:text-[38px] sm:leading-[48px]">
          Reliable garment care with the standards of a modern cleaning brand
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-body-md text-dark-muted">
          {SITE_NAME} combines professional processes, transparent service, and doorstep convenience.
        </p>

        <div className="mt-8 overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-700 ease-smooth"
            style={{
              transform: `translateX(calc(50% - ${activeIndex * (cardWidth + 16) + cardWidth / 2}px))`,
            }}
          >
            {items.map((item, index) => {
              const Icon = ICON_BY_TITLE[item.title as keyof typeof ICON_BY_TITLE] ?? ClockIcon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.title}
                  className={`w-[300px] shrink-0 rounded-2xl border p-5 shadow-card transition-all duration-500 ${
                    isActive
                      ? "border-dark/70 bg-dark text-white shadow-card-hover"
                      : "border-border-light bg-white text-dark opacity-65"
                  }`}
                  style={{ width: `${cardWidth}px` }}
                >
                  <div className="flex items-start gap-3">
                    {Icon && (
                      <div
                        className={`mt-0.5 rounded-full p-2 ${
                          isActive ? "bg-white/15" : "bg-primary-light"
                        }`}
                      >
                        <Icon
                          size={20}
                          className={isActive ? "text-white" : "text-primary"}
                        />
                      </div>
                    )}
                    <div>
                      <h3
                        className={`text-body-lg font-semibold sm:text-[1.125rem] ${
                          isActive ? "text-white" : "text-primary"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`mt-3 text-body-md leading-relaxed sm:leading-7 ${
                      isActive ? "text-white/90" : "text-dark-muted"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "w-6 bg-dark" : "w-2 bg-dark/25 hover:bg-dark/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

