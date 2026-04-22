"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import citiesData from "@/mock/cities.json";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { SectionHeader } from "@/components/ui/SectionHeader";

const InteractiveIndianMap = dynamic(
  () => import("@/components/ui/InteractiveIndianMap").then((mod) => mod.InteractiveIndianMap),
  {
    ssr: false,
    loading: () => <div className="h-[400px] w-full min-h-[500px] rounded-3xl animate-pulse bg-gray-100" />
  }
);

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
};

function useCountUp(target: number, durationMs: number, decimals: number, isVisible: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = target * eased;

      setValue(next);

      if (progress < 1) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    raf = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(raf);
  }, [target, durationMs, isVisible]);

  return useMemo(() => {
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(value * factor) / factor;
    return decimals > 0 ? rounded.toFixed(decimals) : String(Math.round(rounded));
  }, [value, decimals]);
}

function StatCard({ stat, durationMs }: { stat: Stat; durationMs: number }) {
  const decimals = stat.decimals ?? 0;
  const [ref, isVisible] = useIntersectionObserver({ freezeOnceVisible: true, threshold: 0.1 });
  const display = useCountUp(stat.value, durationMs, decimals, isVisible);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col items-center justify-center rounded-2xl bg-white/70 px-5 py-5 shadow-card backdrop-blur-sm sm:px-7">
      <div className="text-center text-[44px] font-light tracking-wide text-dark sm:text-[56px]">
        {display}
        {stat.suffix ?? ""}
      </div>
      <div className="mt-1 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-dark-muted">
        {stat.label}
      </div>
    </div>
  );
}

export function MapSection() {
  const stats = useMemo<Stat[]>(
    () => [
      { value: 50, label: "Cities", suffix: "+", decimals: 0 },
      { value: 150, label: "Stores", suffix: "+", decimals: 0 },
      { value: 4.5, label: "Customers", suffix: "L", decimals: 1 },
      { value: 30.5, label: "Orders", suffix: "L", decimals: 1 },
    ],
    []
  );

  return (
    <section className="w-full bg-white">
      <div className="container py-10 sm:py-14">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-10">
          {/* Map (left half) */}
          <div className="w-full lg:w-3/5 flex justify-center h-[450px] sm:h-[550px] lg:h-[700px]">
            <div className="w-full h-full max-w-[800px] relative">
              <InteractiveIndianMap cities={citiesData} />
            </div>
          </div>

          {/* Heading (right half) */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center px-4 sm:px-0">
            <SectionHeader
              title={
                <>
                  <span className="block text-primary">India&apos;s 1st</span>
                  <span className="block text-primary">organized chain</span>
                  <span className="block mt-2">Of Cleaning services</span>
                </>
              }
              // subtitle="Explore our rapidly expanding footprint across India. Our professional hubs ensure uniform quality and timely deliveries everywhere."
              align="center"
              className="lg:items-start lg:text-left [&_p]:lg:mx-0"
            />
          </div>
        </div>

        {/* Stats row below the map + heading */}
        <div className="mt-2 w-full flex justify-center">
          <div className="grid w-full max-w-[860px] grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} durationMs={2200} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

