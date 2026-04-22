import { HeartIcon, LeafIcon, ShieldIcon, SparkleIcon } from "@/components/ui/icons";
import { SITE_NAME } from "@/lib/constants";

export function DoYouKnowSection() {
  return (
    <section className="w-full bg-white">
      <div className="container py-8 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-border-light bg-surface/55 px-3 py-1 text-sm font-semibold text-primary">
            Did you know
          </p>

          <h2 className="mt-4 text-[24px] font-bold leading-[1.15] text-dark sm:text-[40px]">
            Better cleaning for people and planet
          </h2>

          <p className="mt-3 text-body-sm leading-relaxed text-dark-muted sm:text-body-md sm:text-[18px]">
            At {SITE_NAME}, we focus on safer cleaning choices and community impact, so you can feel good about every pickup and delivery.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:gap-5">
          <article className="group relative h-full overflow-hidden rounded-2xl border border-border-light bg-linear-to-b from-white to-surface p-5 shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover sm:p-6">
            <div className="relative flex items-start gap-3">
              <div className="mt-1 rounded-full bg-primary-light p-2 text-primary">
                <ShieldIcon size={20} />
              </div>

              <div>
                <h3 className="text-[17px] font-semibold leading-tight text-dark sm:text-[20px]">
                  MyCleaners is Perc free
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-dark-secondary sm:text-body-md">
                  We avoid Perchloroethylene (Perc) and use safer processes so your clothes are cleaned with less environmental impact.
                </p>
              </div>
            </div>
          </article>

          <article className="group relative h-full overflow-hidden rounded-2xl border border-border-light bg-linear-to-b from-white to-surface p-5 shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover sm:p-6">
            <div className="relative flex items-start gap-3">
              <div className="mt-1 rounded-full bg-primary-light p-2 text-primary">
                <HeartIcon size={20} />
              </div>

              <div>
                <h3 className="text-[17px] font-semibold leading-tight text-dark sm:text-[20px]">
                  We accept clothing donations
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-dark-secondary sm:text-body-md">
                  Tell us what you’d like to donate. We’ll collect your items and work with charitable organizations in your community.
                </p>
              </div>
            </div>
          </article>

          <article className="group relative h-full overflow-hidden rounded-2xl border border-border-light bg-linear-to-b from-white to-surface p-5 shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover sm:p-6">
            <div className="relative flex items-start gap-3">
              <div className="mt-1 rounded-full bg-primary-light p-2 text-primary">
                <SparkleIcon size={20} />
              </div>

              <div>
                <h3 className="text-[17px] font-semibold leading-tight text-dark sm:text-[20px]">
                  Mycleaners uses less water and less energy
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-dark-secondary sm:text-body-md">
                  Our cleaning partners use high-efficiency washing machines, which means up to 70% less
                  water is used when compared to traditional at-home washing machines. Additionally, cold
                  water washing and high-speed spin cycles significantly reduce energy costs and carbon
                  emissions associated with cleaning.
                </p>
              </div>
            </div>
          </article>

          <article className="group relative h-full overflow-hidden rounded-2xl border border-border-light bg-linear-to-b from-white to-surface p-5 shadow-card transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover sm:p-6">
            <div className="relative flex items-start gap-3">
              <div className="mt-1 rounded-full bg-primary-light p-2 text-primary">
                <LeafIcon size={20} />
              </div>

              <div>
                <h3 className="text-[17px] font-semibold leading-tight text-dark sm:text-[20px]">
                  Mycleaners uses biodegradable poly bags
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-dark-secondary sm:text-body-md">
                  Traditional Dry Cleaning and Wash &amp; Fold practices use plastic to ensure your clean
                  clothes stay clean when they’re delivered to you. Mycleaners does this too, however,
                  much of the plastic wrapping that Mycleaners uses is biodegradable, meaning it will
                  naturally decompose without tough harming the environment. We’re happy to collect the
                  plastic and recycle it for you - just give it to our My Rider on your next pickup.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

