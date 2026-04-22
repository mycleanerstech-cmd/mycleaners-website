"use client";

import { useEffect } from "react";

export function DryCleaningHeroAnimation() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Avoid adding the script multiple times
    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.8/dist/dotlottie-wc.js"]'
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.8/dist/dotlottie-wc.js";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* dotlottie web component provided by the user */}
      {/* @ts-expect-error - custom element not in JSX intrinsic elements */}
      <dotlottie-wc
        src="https://lottie.host/4ae48311-cc49-4d1c-b5a1-d0ad35c19bfd/e9qCGxHHp1.lottie"
        style={{ width: "100%", height: "100%" }}
        autoplay
        loop
      />
    </div>
  );
}

