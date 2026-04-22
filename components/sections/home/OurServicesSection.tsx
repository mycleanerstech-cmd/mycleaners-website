"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CARDS = [
  { title: "LAUNDRY", src: "/images/Laundry.webp", href: "/services/laundry" },
  { title: "DRY CLEANING", src: "/images/DryCleaning.webp", href: "/services/dry-cleaning" },
  { title: "HOME SERVICES", src: "/images/HomeService.webp", href: "/services/home-services" },
] as const;

export function OurServicesSection() {
  return (
    <section className="w-full bg-white">
      <div className="container pt-4 pb-6 sm:pt-8 sm:pb-8">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="text-[2.1rem] font-bold text-primary sm:text-[2.6rem]">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={cn(
                "block group relative overflow-hidden rounded-2xl border border-border-light bg-linear-to-b from-white to-surface p-5 shadow-card transition-all duration-500 hover:border-primary/45 hover:shadow-[0_0_0_1px_rgba(245,130,32,0.22),0_10px_30px_rgba(245,130,32,0.32)]"
              )}
            >
              <h3
                className={cn(
                  "relative text-center font-semibold tracking-wide text-dark text-[16px] sm:text-[18px]"
                )}
              >
                {card.title}
              </h3>

              <div className="relative mt-2 text-center">
                <span className="inline-flex text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                  Explore more
                </span>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-xl">
                <Image
                  src={card.src}
                  alt={card.title}
                  width={900}
                  height={700}
                  className={cn(
                    "h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  )}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

