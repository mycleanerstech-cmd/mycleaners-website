"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
      <div className="text-[4rem] leading-none">⚠️</div>
      <div className="flex flex-col gap-2">
        <h2 className="text-heading-lg text-dark font-bold">Something went wrong</h2>
        <p className="text-body-md text-dark-muted max-w-sm">
          We encountered an unexpected error. Please try again.
        </p>
      </div>
      <Button variant="primary" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
