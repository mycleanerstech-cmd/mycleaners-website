"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function HomeServicesHeroAnimation() {
  return (
    <div className="relative w-full overflow-hidden h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[420px]">
      <DotLottieReact
        src="https://lottie.host/2ff4390f-b5de-495a-90bf-d6adcd2f86e1/0t6zee7JRA.lottie"
        loop
        autoplay
        className="h-full w-full"
      />

      {/* Mask watermark area (e.g. "clean-hme.es") rendered inside the animation. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-22 bg-white sm:h-16 md:h-20 lg:h-20"
      />
    </div>
  );
}

