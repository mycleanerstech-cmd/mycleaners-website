import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CheckIcon, RupeeIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SITE_WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PricingItem = {
  name: string;
  price: number;
  unit?: string;
  description?: string;
};

const dryCleanBenefitsByPlan: Record<string, string[]> = {
  'Tops': [
    'Shirt - ₹79*',
    'Kurta - ₹79*',
    'Blouse - ₹69*',
    'Sweater - ₹99*',
    'Jacket - ₹149*'
  ],
  'Bottoms': [
    'Trouser - ₹89*',
    'Boxer - ₹59*',
    'Salwar - ₹69*',
    'Skirt - ₹89*'
  ],
  'Household': [
    'Bedsheet - ₹89*',
    'Mats - ₹79*',
    'Table cloth - ₹79*',
    'Cushion cover - ₹59*'
  ],
  'Full body': [
    'Coat - ₹249*',
    'Jacket - ₹199*',
    'Overcoat Medium - ₹299*'
  ],
  'Accessories': [
    'Hood - ₹79*',
    'Tie - ₹99*',
    'Stole - ₹69*'
  ],
};

function formatINR(value: number) {
  try {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
  } catch {
    return String(value);
  }
}

function getAccent(name: string) {
  const t = name.toLowerCase();
  if (t.includes("premium")) return "from-primary/10 via-white to-white";
  if (t.includes("iron")) return "from-sky-500/10 via-white to-white";
  return "from-emerald-500/10 via-white to-white";
}

export function DryCleaningPricingSection({
  pricing,
  className,
}: {
  pricing: PricingItem[];
  className?: string;
}) {
  if (!pricing || pricing.length === 0) return null;

  const preferredPlan =
    pricing.find((p) => p.name.toLowerCase().includes("wash & fold")) ?? pricing[0];

  return (
    <section id="dry-cleaning-pricing" className={cn("w-full bg-white", className)}>
      <div className="container py-12 sm:py-16">
        <div className="flex flex-col items-center gap-6">
          <SectionHeader
            title="Premium dry cleaning pricing"
            subtitle="Free pickup & drop on minimum order of ₹300. Prices may vary by city — contact the store in your area for exact rates."
            align="center"
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-light bg-surface px-3 py-1.5 text-sm font-semibold text-dark sm:px-4 sm:py-2">
              <RupeeIcon size={16} className="text-primary" />
              Free pickup & drop above ₹300
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-light bg-white px-3 py-1.5 text-sm text-dark-secondary sm:px-4 sm:py-2">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              24–48 hrs turnaround
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricing.map((plan) => {
            const isPreferred = plan.name === preferredPlan.name;
            const unit = plan.unit ? `/${plan.unit}` : "";
            const benefits =
              dryCleanBenefitsByPlan[plan.name] ??
              [
                "Free doorstep pickup & drop",
                "Professional cleaning & hygiene",
                "Neat folding / finishing",
                "Careful packaging",
              ];

            return (
              <article
                key={plan.name}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
                  isPreferred ? "border-primary/40" : "border-border-light"
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-b opacity-100",
                    getAccent(plan.name)
                  )}
                />

                {isPreferred && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-btn">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="relative flex h-full flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-dark sm:text-xl">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-dark-secondary">
                    {plan.description ?? "Great value for everyday laundry"}
                  </p>

                  <div className="mt-5 flex items-end gap-2">
                    <div className="flex items-start gap-1">
                      <span className="mt-1 text-base font-semibold text-dark">₹</span>
                      <span className="text-3xl font-bold leading-none text-dark sm:text-4xl">
                        {formatINR(plan.price)}
                      </span>
                    </div>
                    <span className="pb-1 text-sm font-semibold text-dark-secondary">
                      {unit}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-dark-secondary">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckIcon size={14} strokeWidth={2.5} />
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-7 sm:pt-8">
                    <Button asChild variant={isPreferred ? "primary" : "outline"} fullWidth>
                      <Link href={SITE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon size={18} />
                        Pickup order
                      </Link>
                    </Button>
                    <p className="text-xs text-dark-muted">
                      Minimum order ₹300 for free pickup & drop.
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

