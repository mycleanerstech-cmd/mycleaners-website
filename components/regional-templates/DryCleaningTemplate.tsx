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

export default function DryCleaningTemplate({ city, service, localData }: Props) {
  const displayCity = city.name;
  const displayService = service.name;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-100/50 text-slate-900 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Left Text Block */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              {localData?.localTagline || `Premium ${displayService} in ${displayCity}`}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Expert care for your specialized garments, suits, sarees, and delicate fabrics. 
              Trust the top-rated professionals in all of {displayCity}.
            </p>
            <button className="bg-slate-950 hover:bg-slate-800 text-white px-10 py-4 font-bold tracking-wide rounded-md transition-all shadow-md">
              Schedule Your Pickup
            </button>

            {localData?.localTestimonial && (
              <blockquote className="mt-12 pl-6 py-4 border-l-4 border-slate-900 italic text-slate-700 bg-slate-50/80 rounded-r-xl shadow-sm text-lg">
                &quot;{localData.localTestimonial}&quot;
              </blockquote>
            )}
          </div>

          {/* Right Image Block */}
          {localData?.customImage ? (
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-yellow-600 blur rounded-3xl opacity-20 transform group-hover:scale-105 transition-transform duration-500"></div>
              <Image
                src={localData.customImage} 
                alt={`${displayService} in ${displayCity}`} 
                width={1200}
                height={900}
                unoptimized
                className="relative w-full rounded-2xl shadow-xl z-10 border border-slate-200" 
              />
            </div>
          ) : (
            <div className="w-full md:w-1/2 bg-slate-200 aspect-4/3 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
              [Global Dry Cleaning Image Slot]
            </div>
          )}
        </div>
        
        {/* Global Dry Cleaning Benefits Block */}
        <div className="mt-32 pb-10">
          <h2 className="mb-8 text-center text-3xl font-bold">The {displayService} Difference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="mb-3 text-xl font-bold text-yellow-700">100% Inspection</h3>
              <p className="text-slate-600">Every garment is checked for stains and treated with specific eco-friendly solvents before the actual wash.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="mb-3 text-xl font-bold text-yellow-700">Crisp Packaging</h3>
              <p className="text-slate-600">Your clothes are returned pristine, on-hanger, wrapped tightly to preserve the press until you need it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
