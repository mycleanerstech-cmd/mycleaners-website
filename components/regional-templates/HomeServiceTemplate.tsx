import React from "react";
import Image from "next/image";

type Props = {
  city: { name: string };
  service: { name: string };
  localData?: {
    localTagline?: string;
    localTestimonial?: string;
    customImage?: string;
  };
};

export default function HomeServiceTemplate({ city, service, localData }: Props) {
  const displayCity = city.name;
  const displayService = service.name;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-green-50/50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-emerald-950">
          {localData?.localTagline || `Reliable ${displayService} in ${displayCity}`}
        </h1>
        <p className="text-lg text-emerald-800 mb-10 max-w-2xl mx-auto opacity-90">
          Bringing professional and verified {displayService.toLowerCase()} experts to every neighborhood in {displayCity}.
        </p>

        {localData?.customImage && (
          <div className="mb-12 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl ring-4 ring-emerald-50">
            <Image
              src={localData.customImage} 
              alt={`${displayService} in ${displayCity}`} 
              width={1400}
              height={900}
              unoptimized
              className="w-full object-cover h-64 md:h-96"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
            Book Our Staff Today
          </button>
          <p className="text-sm font-semibold text-emerald-700 mt-2 sm:mt-0 px-4 py-2 bg-emerald-100 rounded-full">
            Available across {displayCity}
          </p>
        </div>

        {localData?.localTestimonial && (
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-md border-t-8 border-emerald-500 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-serif text-emerald-900 pointer-events-none">&quot;</div>
            <p className="text-xl text-emerald-950 font-medium">&quot;{localData.localTestimonial}&quot;</p>
            <div className="mt-4 w-12 h-1 bg-emerald-300 rounded mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
}
