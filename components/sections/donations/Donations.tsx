import Link from "next/link";
import {
  ArrowUpRight,
  HandHeart,
  Shirt,
} from "lucide-react";

import { City_We_Work } from "@/components/sections/City_We_Work";
import { cn } from "@/lib/utils";

const RAISE_INDIA_MISSION_URL = "https://www.raiseindiafoundation.org/our-mission/" as const;

function GlassCard({
  className,
  title,
  icon,
  children,
}: {
  className?: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 p-6 shadow-[0_10px_30px_rgba(2,6,23,0.08)] backdrop-blur-xl sm:p-8",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-balance text-[18px] font-semibold tracking-tight text-dark sm:text-[20px]">
            {title}
          </h2>
          <div className="mt-3 space-y-4 text-[15px] leading-7 text-dark/80 sm:text-[16px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Donations({ className }: { className?: string }) {
  return (
    <main className={cn("w-full bg-white", className)}>
      <div className="relative isolate overflow-hidden bg-linear-to-b from-slate-50 via-white to-white">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),rgba(16,185,129,0.10),transparent_62%)] blur-2xl"
          aria-hidden="true"
        />
        <div className="container py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
           
            <h1 className="mt-5 text-balance text-[36px] font-extrabold tracking-tight text-dark sm:text-[44px] md:text-[52px]">
              Donations
            </h1>
            <p className="mt-4 text-pretty text-[15px] leading-7 text-dark/75 sm:text-[16px]">
              MyCleaners has partnered with Raise India Foundation,which is a non-profit organization working for the betterment of the underprivileged. Our aim is to provide garment donations to those in need.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
            <GlassCard
              title="Raise India Foundation"
              icon={<HandHeart className="h-5 w-5" aria-hidden="true" />}
              className="lg:col-span-2"
            >
              <p>
                Raise India Foundation works to provide medical aid to economically weaker cancer patients. Their work also extends in providing child education in rural India. They also work for women empowerment by promoting female education and making the people aware about the menace of domestic violence against women and female feticide.
              </p>
              <p>
                To know more about Raise India Foundation, visit-{" "}
                <Link
                  href={RAISE_INDIA_MISSION_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
                >
                  https://www.raiseindiafoundation.org/our-mission/
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </p>
            </GlassCard>

            <GlassCard
              title="EkPahal"
              icon={<Shirt className="h-5 w-5" aria-hidden="true" />}
            >
              <p>
                This initiative started by us in collaboration with Raise India Foundation is known as ‘EkPahal’. Join this initiative and donate your old clothes to the ones who need them during winters.
              </p>
            </GlassCard>
          </div>

          <div className="mx-auto mt-6 max-w-5xl">
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)] sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="text-balance text-[18px] font-semibold tracking-tight text-dark sm:text-[20px]">
                    How to donate
                  </h2>
                  <p className="mt-3 text-pretty text-[15px] leading-7 text-dark/80 sm:text-[16px]">
                    In order to donate, arrange your clothing items in a plastic or paper bag along with a label stating ‘Donation’. OurMyRider will collect the Donation bag during your next pickup or delivery and deliver it to Raise India
                  </p>
                </div>
                
              </div>
            </section>
          </div>
        </div>

        <City_We_Work
          title="CITIES WE DELIVER TO"
          className="bg-transparent"
          containerClassName="py-12 sm:py-14 lg:py-16"
        />
      </div>
    </main>
  );
}

