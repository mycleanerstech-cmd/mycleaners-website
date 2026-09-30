import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

import cities from "@/mock/cities.json";
import { SITE_PHONE, SITE_WHATSAPP_LINK } from "@/lib/constants";
import { HowItWorksSection } from "@/components/sections/home/HowItWorksSection";
import { DoYouKnowSection } from "@/components/sections/home/DoYouKnowSection";
import { OurServicesSection } from "@/components/sections/home/OurServicesSection";

type City = {
  id: string;
  name: string;
  slug: string;
  state: string;
  storeCount?: number;
  isComingSoon?: boolean;
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return (cities as City[]).map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = (cities as City[]).find((c) => c.slug === slug);

  if (!city) {
    return { title: "Location" };
  }

  // No brand suffix here: the root layout title template appends "| Mycleaners".
  return {
    title: city.name,
    description: `Dry cleaning and laundry services in ${city.name}, ${city.state}.`,
  };
}

function getCityImage(cityName: string, citySlug: string) {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images", "locations");
    const searchNames = [
      `${cityName}.jpg`,
      `${cityName.replace(/ /g, '-').replace(/&/g, '')}.jpg`,
      `${citySlug}.jpg`,
      `${cityName.toLowerCase()}.jpg`
    ];
    
    for (const name of searchNames) {
      if (fs.existsSync(path.join(imagesDir, name))) {
        return `/images/locations/${name}`;
      }
    }

    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      const searchLower = cityName.toLowerCase();
      const match = files.find(f => 
        f.toLowerCase() === `${searchLower}.jpg` || 
        f.toLowerCase().replace(/ /g, '-') === `${searchLower.replace(/ /g, '-')}.jpg` ||
        f.toLowerCase() === `${citySlug.toLowerCase()}.jpg` ||
        f.toLowerCase().includes(searchLower)
      );
      if (match) {
        return `/images/locations/${match}`;
      }
    }
  } catch {
    // console.error(e);
  }
  return null;
}

export default async function CityLocationPage({ params }: Props) {
  const { slug } = await params;
  const city = (cities as City[]).find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  const bgImage = getCityImage(city.name, city.slug);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[550px] sm:min-h-[550px] flex items-end sm:items-center pt-8 pb-12 sm:py-20">
        {bgImage && (
          <div className="absolute inset-0">
            <Image
              src={bgImage}
              alt={`${city.name} city`}
              fill
              sizes="100vw"
              className="object-contain sm:object-cover w-full h-auto sm:h-full max-h-full opacity-90 sm:opacity-100 object-top sm:object-center"
            />
            {/* Overlay for readable text */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 sm:bg-none sm:bg-linear-to-r sm:from-black/75 sm:to-transparent" />
          </div>
        )}

        {/* Ensure no image looks okay too */}
        {!bgImage && (
          <div className="absolute inset-0 bg-linear-to-br from-primary/80 to-slate-900" />
        )}

        <div className="container relative z-10 px-4 mx-auto sm:px-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-8 max-w-full sm:max-w-[420px] shadow-2xl relative mx-auto sm:mx-0 text-center sm:text-left mt-32 sm:mt-0">
            <h1 className="text-[26px] sm:text-[32px] font-bold leading-[1.2] text-dark">
              {city.name} Best<br className="hidden sm:block" /> Laundry & Dry Cleaning Services.
            </h1>
            <p className="mt-3 text-[14px] sm:text-[15px] text-dark-muted leading-relaxed">
              Taking care of your clothes has never been easier. Mycleaners picks up, expertly cleans, and delivers your dry cleaning and laundry to your door.
            </p>
            <p className="mt-2 text-[14px] sm:text-[15px] font-medium text-dark hidden sm:block">
              Mycleaners is ready to take care of your clothes.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
              <Button asChild className="w-full sm:w-auto h-11 sm:h-12 text-[15px] sm:text-[16px] px-8 rounded-full">
                <Link href={SITE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Try Mycleaners
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto h-11 sm:h-12 text-[15px] sm:text-[16px] px-8 rounded-full border-primary text-primary hover:bg-primary/5 shadow-sm">
                <a href={`tel:${SITE_PHONE}`}>
                   Pick up call
                </a>
              </Button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Large Embedded Map Section */}
      <div className="container mt-12 mb-12 sm:mt-16 sm:mb-16">
        <h2 className="text-2xl font-bold mb-6 text-dark text-center sm:text-left">{city.name} Coverage Area</h2>
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl bg-gray-100 relative">
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=Mycleaners+${encodeURIComponent(city.name)}&t=m&z=14&ie=UTF8&iwloc=B&output=embed`}
            />
          </div>
        </div>
      </div>

      <HowItWorksSection />
      <DoYouKnowSection />
      <OurServicesSection />
    </>
  );
}
