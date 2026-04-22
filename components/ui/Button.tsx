import { cn } from "@/lib/utils";
import { cloneElement, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-btn hover:shadow-btn focus-visible:ring-2 focus-visible:ring-primary/50",
  secondary:
    "bg-dark text-white hover:bg-dark/90 active:bg-dark/80",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:bg-primary-dark",
  ghost:
    "text-dark hover:bg-surface active:bg-border",
  white:
    "bg-white text-dark hover:bg-surface active:bg-surface-alt shadow-card",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-[0.9375rem] gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  asChild = false,
  className,
  children,
  disabled,
  type,
  ...props
}: ButtonProps) {
  const buttonClasses = cn(
    "inline-flex items-center justify-center font-semibold rounded-btn",
    "transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    isLoading && "pointer-events-none",
    className
  );

  // Minimal `asChild` implementation: render the given child element (typically `next/link`)
  // and apply button styles to it, instead of forwarding `asChild` to a DOM `<button>`.
  if (asChild && !isLoading && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...props,
      className: cn(buttonClasses, child.props?.className),
    });
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="h-4 w-4 animate-pulse rounded-full bg-current/20"
            aria-hidden="true"
          />
          <span>Please wait…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
