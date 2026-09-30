import { cn } from "@/lib/utils";
import { APP_COMING_SOON } from "@/lib/constants";
import { MobileIcon } from "@/components/ui/icons";

type Tone = "light" | "dark";

/**
 * Static (non-clickable) stand-in for the store badges.
 *
 * The old Android/iOS links pointed at retired listings, so the app is
 * teased as "Coming Soon" everywhere instead. Rendered as a `<span>` rather
 * than a link/button on purpose: there is nowhere to send the user yet, and a
 * dead control is worse than an honest status chip.
 *
 * `tone` picks the palette for the surface it sits on:
 * - `light`: white/light surfaces (default navbar, mobile drawer)
 * - `dark`:  dark surfaces (hero navbar over the video, footer)
 */
export function AppComingSoonBadge({
  tone = "light",
  withIcon = true,
  className,
}: {
  tone?: Tone;
  withIcon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[13px] font-semibold leading-none select-none",
        tone === "light"
          ? "border-primary/30 bg-primary-light text-primary-dark"
          : "border-white/25 bg-white/10 text-white",
        className
      )}
    >
      {withIcon ? (
        <MobileIcon size={15} strokeWidth={2.2} className="shrink-0" />
      ) : (
        <span
          aria-hidden="true"
          className="app-soon-dot relative size-1.5 shrink-0 rounded-full bg-current"
        />
      )}
      {APP_COMING_SOON.badge}
    </span>
  );
}
