import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PICKUP_HREF, SCHEDULE_PICKUP_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

/**
 * The pickup CTA, used wherever the site offers booking.
 *
 * A real link to the booking page rather than a button that scrolls or opens
 * something on the current page. That matters because the hero is the one place
 * the CTA cannot be dead: a visitor who taps "Schedule Pickup" and gets nothing
 * visible happen has no way to recover, and a link is the only version that is
 * keyboard-focusable, middle-clickable, and shareable.
 *
 * It renders through `Button`'s `asChild` so the link inherits the button
 * styling and hover states without nesting a `<button>` inside an `<a>`.
 *
 * No `"use client"`: this holds no state, so it stays usable from both server
 * and client components.
 */
export function SchedulePickupButton({
  label = SCHEDULE_PICKUP_LABEL,
  size = "lg",
  fullWidth = false,
  withArrow = true,
  className,
}: {
  label?: string;
  size?: Size;
  fullWidth?: boolean;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Button
      asChild
      size={size}
      fullWidth={fullWidth}
      className={cn(
        "group whitespace-nowrap rounded-full tracking-[0.01em] shadow-[0_10px_28px_rgba(245,130,32,0.35)]",
        className
      )}
    >
      <Link href={PICKUP_HREF}>
        {label}
        {withArrow ? (
          <ArrowRightIcon
            size={18}
            strokeWidth={2.4}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        ) : null}
      </Link>
    </Button>
  );
}
