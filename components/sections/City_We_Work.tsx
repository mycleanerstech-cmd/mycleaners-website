import Link from "next/link";
import { MapPin } from "lucide-react";

import cities from "@/mock/cities.json";
import { cn } from "@/lib/utils";

type City = {
  id: string;
  name: string;
  slug: string;
  state: string;
  storeCount?: number;
  isComingSoon?: boolean;
};

/**
 * Column order matches the reference layout (left-to-right, top-to-bottom across 5 columns).
 * This keeps the grid visually consistent even if `mock/cities.json` is edited later.
 */
const CITY_ORDER: readonly string[] = [
  "agartala",
  "dehradun",
  "haldwani",
  "meerut",
  "sivasagar",
  "aizawl",
  "dharmanagar",
  "hanumangarh",
  "muzaffarnagar",
  "solan",
  "ayodhya",
  "dibrugarh",
  "hisar",
  "naharlagun",
  "sri-ganganagar",
  "azamgarh",
  "gandhidham",
  "ichalkaranji",
  "nautanwa",
  "thane",
  "bahadurgarh",
  "ghaziabad",
  "jaipur",
  "navi-mumbai",
  "varanasi",
  "belonia",
  "gorakhpur",
  "jaunpur",
  "new-delhi",
  "zirakpur",
  "bhiwani",
  "greater-noida",
  "kanpur",
  "noida",
  "bhopal",
  "gurugram",
  "lakhimpur",
  "raiganj",
  "budaun",
  "guwahati",
  "lucknow",
  "sikar",
  "chandausi",
  "hailakandi",
  "mau",
  "silchar",
] as const;

function getOrderedCities(all: City[]): City[] {
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const ordered: City[] = [];

  for (const slug of CITY_ORDER) {
    const city = bySlug.get(slug);
    if (city) {
      ordered.push(city);
      bySlug.delete(slug);
    }
  }

  // Fallback: append any cities not listed in CITY_ORDER (sorted for stability).
  const remaining = Array.from(bySlug.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return [...ordered, ...remaining];
}

interface CityWeWorkProps {
  className?: string;
  containerClassName?: string;
  title?: string;
}

export function City_We_Work({
  className,
  containerClassName,
  title = "Cities we deliver to",
}: CityWeWorkProps) {
  const items = getOrderedCities(cities as City[]);

  return (
    <section className={cn("w-full bg-white", className)} aria-labelledby="cities-we-work-heading">
      <div className={cn("container py-12 sm:py-16", containerClassName)}>
        <h2
          id="cities-we-work-heading"
          className="text-center text-[28px] font-bold uppercase tracking-[0.08em] text-dark sm:text-[36px] md:text-[42px]"
        >
          {title}
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-1 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-center sm:text-left">
          {items.map((city, index) => {
            const href = `/locations/${city.slug}`;

            return (
              <div key={city.id} className="inline-flex items-center sm:block">
                <Link
                  href={href}
                  className="group inline-flex items-center gap-1 sm:gap-2 sm:rounded-lg sm:px-2 sm:py-2 text-[14px] sm:text-[16px] font-normal text-primary sm:text-dark transition-colors hover:bg-surface-alt sm:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <MapPin
                    className="hidden sm:inline-block sm:mt-0.5 h-4 w-4 shrink-0 text-primary transition-colors group-hover:text-primary-dark"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 text-pretty">{city.name}</span>
                </Link>
                {index < items.length - 1 && (
                  <span className="ml-2 text-primary/40 sm:hidden">|</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
