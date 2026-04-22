"use client";

import { useEffect } from "react";

export function useScrollLock(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lock]);
}
