"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE_WHATSAPP_LINK, APP_LINKS } from "@/lib/constants";

export function IntroVideo() {
  return (
    <section
      id="intro-video-hero"
      // Offset the hero up so the sticky navbar background doesn't reveal the white body.
      className="relative w-full overflow-hidden bg-black -mt-[72px] mb-0"
    >
      {/* Responsive hero container: Stacked on mobile, full-screen overlay on desktop */}
      <div className="flex flex-col relative min-h-[calc(100svh+72px)] bg-black">
        <video
          src="/videos/Intro_video.mov"
          className="absolute inset-0 w-full h-full object-cover object-center bg-black"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-black/40 xl:bg-gradient-to-t from-black/60 via-black/30 md:from-black/70 md:via-black/40 to-transparent" />
        
        {/* Bottom shadow gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 to-transparent" />

        {/* Content layout: Flows naturally on mobile, absolute center on desktop */}
        <div className="absolute inset-0 flex items-center pt-[104px] pb-12 sm:pt-[128px] md:pb-0 md:pt-[72px] bg-transparent">
          <div className="container relative z-10 w-full px-4 sm:px-6 mx-auto text-left overflow-hidden sm:overflow-visible">
            <div className="max-w-2xl pt-8 pb-12 break-words">
              <h1 className="text-3xl leading-[1.1] sm:text-4xl md:text-[56px] md:leading-[1.05] font-bold text-white drop-shadow-lg">
                <span className="block text-primary drop-shadow-2xl">Simplifying Life With  </span>
                <span className="block text-white/90 pt-2">EffortLess Cleaning Services</span>
              </h1>

              <p className="mt-4 text-[14px] font-medium leading-6 sm:text-[16px] sm:leading-7 text-white/90 drop-shadow-md">
                MyCleaners picks up, cleans, and delivers your laundry and dry cleaning.
              </p>

              <div className="mt-8 sm:mt-10 pointer-events-auto">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <Link
                    href={`${SITE_WHATSAPP_LINK}?text=Hello%2C%20I%20am%20interested%20in%20your%20services%20%0Akindly%20take%20a%20look`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3 text-center text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/30 transition-all duration-200"
                  >
                    Pickup Order
                  </Link>
                  <Button variant="outline" size="md" className="w-full sm:w-auto px-8 py-3 text-lg bg-black/20 hover:bg-black/40 text-white border-white/50 backdrop-blur-sm shadow-xl" asChild>
                    <a href={APP_LINKS.android} target="_blank" rel="noopener noreferrer">
                      Download App
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

