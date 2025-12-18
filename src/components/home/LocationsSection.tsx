"use client";

import { useState, useEffect } from "react";
import Section from "@/components/home/Section";
import { clinicLocations } from "@/app/data/locations";
import { findNearestLocation } from "@/lib/geo";
import LocationsMap from "@/components/locations/LocationsMap";
import LocationSearchBar from "@/components/locations/LocationSearchBar";
import LocationCard from "@/app/contact/components/LocationCard";

export default function LocationsSection() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    clinicLocations[0]?.id ?? null
  );

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleUserLocationChange = (coords: { lat: number; lng: number }) => {
    const nearest = findNearestLocation(coords, clinicLocations);

    if (!nearest) return;

    if (nearest.id !== activeLocationId) {
      setActiveLocationId(nearest.id);
      setStatusMessage(`Nearest clinic updated: ${nearest.name}`);
    } else {
      setStatusMessage(`Still nearest: ${nearest.name}`);
    }
  };

  useEffect(() => {
    if (!statusMessage) return;
    const timer = setTimeout(() => setStatusMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const activeLocation =
    clinicLocations.find((l) => l.id === activeLocationId) ??
    clinicLocations[0];

  return (
    <Section
      eyebrow="Our Locations"
      title="Find the 121 Rehab clinic closest to you"
      description="Search by address or use your current location to see which clinic is nearest."
      className="pt-16 pb-20"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="space-y-4">
          <LocationSearchBar onLocationChange={handleUserLocationChange} />

          {/* Subtle feedback message under the search bar */}
          {statusMessage && (
            <p className="text-xs text-slate-500">{statusMessage}</p>
          )}

          <div className="mt-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
              Nearest location
            </p>

            <div className="mt-3">
              <LocationCard location={activeLocation} />
            </div>
          </div>
        </div>

        {/* RIGHT: MAP */}
        <div>
          <LocationsMap selectedLocation={activeLocation} />
        </div>
      </div>
    </Section>
  );
}
