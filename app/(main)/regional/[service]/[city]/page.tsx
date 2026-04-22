import { notFound } from "next/navigation";
import citiesData from "@/mock/cities.json";
import servicesData from "@/mock/services.json";
import regionalContent from "@/mock/regional-content.json";

// Import our new isolated templates
import LaundryTemplate from "@/components/regional-templates/LaundryTemplate";
import DryCleaningTemplate from "@/components/regional-templates/DryCleaningTemplate";
import HomeServiceTemplate from "@/components/regional-templates/HomeServiceTemplate";

type Params = {
  service: string;
  city: string;
};

type RegionalOverride = {
  localTagline?: string;
  localTestimonial?: string;
  customImage?: string;
};

// 1. Generate Metadata for SEO (Runs for every combination)
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const { service, city } = resolvedParams;

  const isValidCity = citiesData.find((c) => c.slug === city || c.name.toLowerCase() === city);
  const isValidService = servicesData.find((s) => s.slug === service || s.name.toLowerCase() === service);

  if (!isValidCity || !isValidService) {
    return { title: 'Not Found' };
  }

  const serviceName = isValidService.name;
  const cityName = isValidCity.name;

  return {
    title: `Best ${serviceName} Service in ${cityName} | Ycleaners`,
    description: `Looking for top-rated ${serviceName} services in ${cityName}? Ycleaners offers premium, affordable, and fast home delivery.`,
    alternates: {
      canonical: `https://ycleaners.in/best-${service}-in-${city}`,
    }
  };
}
export default async function RegionalSeoPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const { service, city } = resolvedParams;

  const isValidCity = citiesData.find((c) => c.slug === city || c.name.toLowerCase() === city);
  const isValidService = servicesData.find((s) => s.slug === service || s.name.toLowerCase() === service);

  if (!isValidCity || !isValidService) {
    notFound(); // Security check
  }

  // 1. Create unique key to grab local override data (e.g. "navi-mumbai-laundry")
  const specificKey = `${city}-${service}`;
  const localData = (regionalContent as Record<string, RegionalOverride | undefined>)[specificKey];

  // 2. The DISPATCHER - Route to the proper stylistic template
  switch (service) {
    case "laundry":
      return <LaundryTemplate city={isValidCity} service={isValidService} localData={localData} />;
    case "dry-cleaning":
      return <DryCleaningTemplate city={isValidCity} service={isValidService} localData={localData} />;
    case "home-cleaning":
    case "home-service": // Add your exact slug here
      return <HomeServiceTemplate city={isValidCity} service={isValidService} localData={localData} />;
    default:
      // Fallback if we add new services in the future but haven't built a template yet
      return <LaundryTemplate city={isValidCity} service={isValidService} localData={localData} />;
  }
}

// 3. Static Generation (Crucial for 100/100 PageSpeed)
export async function generateStaticParams() {
  const paths: Params[] = [];
  
  // Multiply every service by every city
  servicesData.forEach((serviceObj) => {
    citiesData.forEach((cityObj) => {
      paths.push({
        service: serviceObj.slug,
        city: cityObj.slug,
      });
    });
  });

  return paths; 
}
