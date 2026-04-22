"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface InteractiveIndianMapProps {
  cities: { name: string; lat?: number; lng?: number; state?: string }[];
}

const geoUrl = "/india.json";

export function InteractiveIndianMap({ cities }: InteractiveIndianMapProps) {
  const [activeCity, setActiveCity] = useState<{ name: string; lat?: number; lng?: number; state?: string } | null>(null);

  // Territories to exclude so they don't show near Sri Lanka or ocean areas
  const excludedTerritories = ["Andaman and Nicobar", "Andaman & Nicobar", "Lakshadweep", "Puducherry"];

  // Map state colors (Greyish and Primary Orange)
  const realisticColors = [
    "#D1D5DB", // Slightly darker greyish color
    "#ff6a00", // Primary orange
    "#9CA3AF", // Even darker grey for variation
    "#F97316", // Slightly different orange for variation
  ];

  // Helper function to assign a consistent color to each state based on its name length or hash
  const getStateColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return realisticColors[Math.abs(hash) % realisticColors.length];
  };

  return (
    <div className="w-full h-full min-h-[500px] relative pointer-events-auto">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200, // Zoomed in to hide empty ocean areas and make India bigger
          center: [80.5, 23.5] // Adjusted center to focus on contiguous mainland India
        }}
        width={800}
        height={700}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => {
                const stateName = geo.properties.ST_NM || geo.properties.st_nm || geo.properties.name || geo.properties.NAME_1 || "";
                return !excludedTerritories.includes(stateName);
              })
              .map((geo) => {
                const stateName = geo.properties.ST_NM || geo.properties.st_nm || geo.properties.name || geo.properties.NAME_1 || "Unknown";
                const stateColor = getStateColor(stateName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={stateColor}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "all 250ms" },
                      hover: { fill: "#fdba74", outline: "none", transform: "scale(1.002)" }, // Light orange on hover
                      pressed: { fill: "#fb923c", outline: "none" },
                    }}
                  />
                );
            })
          }
        </Geographies>

        {cities.map((city, i) => {
          if (!city.lng || !city.lat) return null;
          return (
            <Marker key={i} coordinates={[city.lng, city.lat]}>
              <circle
                r={4}
                fill="#ff6a00"
                stroke="#fff"
                strokeWidth={1.5}
                data-tooltip-id="city-tooltip"
                onMouseEnter={() => setActiveCity(city)}
                onClick={() => setActiveCity(city)}
                className="cursor-pointer transition-all hover:r-[6px] outline-none"
                style={{
                   filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
                }}
              />
            </Marker>
          );
        })}
      </ComposableMap>
      
      <Tooltip 
        id="city-tooltip" 
        place="top"
        clickable
        className="!p-0 !bg-transparent !opacity-100 !rounded-xl !shadow-2xl !border-0 z-50"
      >
        {activeCity && (
          <div className="w-[300px] bg-white rounded-xl overflow-hidden flex flex-col text-left shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100">
            {/* Header info */}
            <div className="p-3 pb-2 bg-white">
              <h3 className="font-semibold text-[15px] text-dark leading-tight">Mycleaners {activeCity.name}</h3>
              <p className="text-[12px] text-gray-500 mt-1 leading-snug">
                {activeCity.name}, {activeCity.state || "India"}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-[13px] text-gray-600">
                <span className="font-medium text-orange-500">4.8</span>
                <span className="text-orange-500 text-[14px]">★</span>
                <span>({(activeCity.name.length * 13) % 100 + 20})</span>
                <span className="mx-1 text-gray-300">•</span>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=Mycleaners+${encodeURIComponent(activeCity.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View on map
                </a>
              </div>
            </div>
            
            {/* Embedded Google Map */}
            <div className="h-[140px] w-full bg-gray-100 relative border-t border-gray-100">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=Mycleaners+${encodeURIComponent(activeCity.name)}&t=m&z=13&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>
        )}
      </Tooltip>
    </div>
  );
}
