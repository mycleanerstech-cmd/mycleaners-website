import type { Metadata } from "next";

import services from "@/mock/services.json";
import { ServiceInfoSection, type Service } from "@/components/sections/services/ServiceInfoSection";
import { LaundryHowItWorks } from "@/components/sections/services/laundry_how_it_works";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { LaundryPricingSection } from "@/components/sections/services/LaundryPricingSection";
import { DryCleaningPricingSection } from "@/components/sections/services/DryCleaningPricingSection";
import { HomeServicesPricingSection } from "@/components/sections/services/HomeServicesPricingSection";
import { SITE_NAME } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = (services as Service[]).find((s) => s.slug === slug);

  if (!service) {
    return {
      title: `Services | ${SITE_NAME}`,
      description: `Explore ${SITE_NAME} services including laundry, dry cleaning, and home services with doorstep pickup and delivery.`,
    };
  }

  return {
    title: `${service.name} | ${SITE_NAME}`,
    description: service.shortDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = (services as Service[]).find((s) => s.slug === slug);
  const isLaundry = slug === "laundry";
  const isDryCleaning = slug === "dry-cleaning";
  const isHomeServices = slug === "home-services";

  if (!service) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold text-dark">Service not found</h1>
        <p className="mt-2 text-dark-muted">Please check the URL and try again.</p>
      </div>
    );
  }

  const heroImageSrc = isLaundry 
    ? "/images/services/Laundry.jpg" 
    : isDryCleaning
      ? "/images/services/Dry_Cleaning.jpg"
      : isHomeServices 
        ? "/images/services/Home_Service.jpg" 
        : undefined;

  const heroMedia = undefined;

  const headline = isLaundry
    ? "Laundry"
    : isDryCleaning
      ? "Dry Cleaning"
      : isHomeServices
        ? "Home Services"
        : undefined;

  const description =
    isLaundry ? (
      <>
        <span>This is the ideal service for your everyday laundry needs.</span>
        <br />
        <br />
        <span>
          Save{" "}
          <span className="font-semibold text-dark">4+ hours per week</span> by having Mycleaners pick up your
          clothes right from your door and return them freshly cleaned and perfectly folded.
        </span>
      </>
    ) : isDryCleaning ? (
      <>
        <span>
          This is the perfect service for items you want professionally cleaned and returned 
          pressed and on a hanger (this service includes both Dry Cleaning and Launder & Press).
        </span>
        <br />
        <br />
        <span>
          Enjoy premium cleaning from the comfort of your home and never go to the dry cleaners again.
        </span>
      </>
    ) : isHomeServices ? (
      <>
        <span>
          Mycleaners&apos; Home Services offers professional cleaning services for your living space, 
          including deep cleaning for sofas, carpets, and cars. Their team of trained cleaners uses 
          eco-friendly products for a thorough, safe clean. They provide regular maintenance and one-time 
          deep cleans. To book top-quality home cleaning services.
        </span>
        <br />
        <br />
        <span>
          Download the Mycleaners app today and experience the convenience of booking top-quality home 
          cleaning services right from your phone.
        </span>
      </>
    ) : undefined;

  const showHowItWorks = !isLaundry && !isDryCleaning && !isHomeServices;

  const descriptionClassName =
    isLaundry || isDryCleaning || isHomeServices
      ? "text-dark-muted text-[1.05rem] leading-relaxed sm:text-[1.2rem]"
      : undefined;

  return (
    <>
      <ServiceInfoSection
        service={service}
        heroImageSrc={heroImageSrc}
        heroMedia={heroMedia}
        headline={headline}
        description={description}
        showHowItWorks={showHowItWorks}
        descriptionClassName={descriptionClassName}
        ctaText={isHomeServices ? "Place order" : "Pickup order"}
      />
      {(isLaundry || isDryCleaning || isHomeServices) && <LaundryHowItWorks />}
      {isLaundry && <LaundryPricingSection pricing={service.pricing ?? []} />}
      {isDryCleaning && <DryCleaningPricingSection pricing={service.pricing ?? []} />}
      {isHomeServices && <HomeServicesPricingSection pricing={service.pricing ?? []} />}
      <City_We_Work />
    </>
  );
}
