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

export default function LaundryTemplate({ city, service, localData }: Props) {
  const displayCity = city.name;
  const displayService = service.name;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-blue-50/50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
          {localData?.localTagline || `The Best ${displayService} Service in ${displayCity}`}
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Affordable, premium {displayService.toLowerCase()} delivered right to your doorstep in {displayCity}. 
          Enjoy fresh, crisp clothes without lifting a finger.
        </p>

        {localData?.customImage && (
          <div className="mb-10 max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={localData.customImage} 
              alt={`${displayService} in ${displayCity}`} 
              width={1200}
              height={800}
              unoptimized
              className="w-full object-cover"
            />
          </div>
        )}

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
          Book {displayService} Pickup in {displayCity}
        </button>

        {localData?.localTestimonial && (
          <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-blue-100 max-w-2xl mx-auto">
            <div className="text-blue-500 mb-4 text-4xl">&quot;</div>
            <p className="text-xl italic text-gray-600 font-medium">
              {localData.localTestimonial}
            </p>
          </div>
        )}

        {/* Global Laundry Benefits Block */}
        <div className="mt-20 text-left max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Why choose our Laundry Service?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-50">
                    <h3 className="font-bold mb-2 text-blue-800">Free Pickup & Drop</h3>
                    <p className="text-gray-600 text-sm">We collect and deliver from anywhere in {displayCity}.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-50">
                    <h3 className="font-bold mb-2 text-blue-800">Premium Detergents</h3>
                    <p className="text-gray-600 text-sm">Safe, eco-friendly chemicals that protect the fabric.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-50">
                    <h3 className="font-bold mb-2 text-blue-800">Express Delivery</h3>
                    <p className="text-gray-600 text-sm">Get your clothes back exactly when you need them.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
