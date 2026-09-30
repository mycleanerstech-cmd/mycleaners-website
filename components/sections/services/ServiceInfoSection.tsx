import type { ReactNode } from "react";
import Image from "next/image";
import { CheckIcon, SparkleIcon, TruckIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { SITE_PHONE } from "@/lib/constants";
import { SchedulePickupButton } from "@/components/ui/SchedulePickupButton";
import { cn } from "@/lib/utils";

type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

type PricingItem = {
  name: string;
  price: number;
  unit?: string;
  description?: string;
};

type Service = {
  slug: string;
  name: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;
  process?: ProcessStep[];
  pricing?: PricingItem[];
};
export type { Service };

function getStepIcon(stepTitle: string) {
  const t = stepTitle.toLowerCase();
  if (t.includes("pickup")) return TruckIcon;
  if (t.includes("delivery")) return TruckIcon;
  if (t.includes("washing")) return SparkleIcon;
  if (t.includes("sorting")) return CheckIcon;
  return CheckIcon;
}

export function ServiceInfoSection({
  service,
  heroImageSrc,
  heroMedia,
  headline,
  description,
  showHowItWorks = true,
  titleClassName,
  descriptionClassName,
  className,
  ctaText = "Pickup order",
}: {
  service: Service;
  heroImageSrc?: string;
  heroMedia?: ReactNode;
  headline?: string;
  description?: ReactNode;
  showHowItWorks?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
  ctaText?: string;
}) {
  const process = (service.process ?? []).slice(0, 4);
  const imageSrc = heroImageSrc ?? service.image ?? "/images/laundry_section_info.jpg";

  return (
    <section className={cn("w-full bg-white", className)}>
      <div className="container pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <h1
              className={cn(
                "text-[2.15rem] leading-tight font-bold text-primary sm:text-[2.65rem]",
                titleClassName
              )}
            >
              {headline ?? service.name}
            </h1>
            <p
              className={cn(
                "mt-3 max-w-prose text-[0.975rem] leading-relaxed text-dark-secondary sm:text-[1.05rem]",
                descriptionClassName
              )}
            >
              {description ?? service.longDescription ?? service.shortDescription}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Button asChild className="w-full sm:w-auto h-12 text-[16px] px-8 rounded-full">
                <a href={`tel:${SITE_PHONE}`}>
                  {ctaText}
                </a>
              </Button>
              {/* Was "Download App" → dead store link. Now the pickup CTA,
                  outlined so it stays secondary to the call button. */}
              <SchedulePickupButton
                size="md"
                className="h-12 w-full border-2 border-primary bg-transparent text-primary shadow-none hover:bg-primary hover:text-white sm:w-auto sm:px-8"
              />
            </div>

            {showHowItWorks && process.length > 0 && (
              <div className="mt-10">
                <h2 className="text-[1.5rem] font-semibold tracking-tight text-dark sm:text-[1.75rem]">
                  How it works
                </h2>

                <div className="relative mt-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-6 right-6 top-7 hidden border-t-2 border-dashed border-border-light sm:block"
                  />

                  <ol className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
                    {process.map((step) => {
                      const Icon = getStepIcon(step.title);
                      return (
                        <li key={step.step} className="flex flex-col items-start gap-3">
                          <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-light bg-white text-primary shadow-[0_6px_20px_rgba(0,0,0,0.06)] sm:mx-auto">
                            <Icon size={20} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-dark sm:text-[0.95rem]">
                              {step.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-dark-muted sm:text-sm">
                              {step.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-border-light bg-surface shadow-card">
              <div className="relative aspect-16/10 w-full sm:aspect-video lg:aspect-16/10">
                {heroMedia ?? (
                  <Image
                    src={imageSrc}
                    alt={`${service.name} service`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

