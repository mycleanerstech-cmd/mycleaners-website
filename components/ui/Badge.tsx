import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "success" | "outline" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary font-semibold",
  secondary: "bg-dark text-white",
  success: "bg-green-100 text-green-700 font-medium",
  outline: "border border-border text-dark-secondary",
  muted: "bg-surface text-dark-muted",
};

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-caption font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
