import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  titleClassName?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm uppercase tracking-widest">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
          <span className="h-px w-6 bg-primary" />
        </span>
      )}

      <h2
        className={cn(
          "text-display-sm md:text-display-md font-bold text-dark leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-body-lg text-dark-muted max-w-xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
