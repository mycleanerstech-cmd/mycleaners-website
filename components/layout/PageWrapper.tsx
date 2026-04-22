import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("flex flex-col flex-1", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  noPadding = false,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(!noPadding && "section-py", className)}>
      <div className="container">{children}</div>
    </Tag>
  );
}
