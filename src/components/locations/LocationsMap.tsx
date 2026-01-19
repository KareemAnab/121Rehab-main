"use client";

import { useEffect, useRef } from "react";
import type { ClinicLocation } from "@/app/data/locations";
import { loadGoogleMaps } from "@/lib/googleMapsLoader";

declare const google: any;

type Props = {
  selectedLocation: ClinicLocation;
};

export default function LocationsMap({ selectedLocation }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: google.maps.Map | null = null;
    let marker: google.maps.Marker | null = null;

    (async () => {
      try {
        await loadGoogleMaps({ libraries: ["places"] });

        if (!mapRef.current) return;
        if (!(window as any).google?.maps) return;

        const center = { lat: selectedLocation.lat, lng: selectedLocation.lng };

        map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 14,
          disableDefaultUI: true,
          clickableIcons: false,
        });

        marker = new google.maps.Marker({
          position: center,
          map,
          title: selectedLocation.name,
        });
      } catch (err) {
        console.error("Google Maps failed to load:", err);
      }
    })();

    return () => {
      map = null;
      marker = null;
    };
  }, [
    selectedLocation.id,
    selectedLocation.lat,
    selectedLocation.lng,
    selectedLocation.name,
  ]);

  // ✅ IMPORTANT: explicit height so it can render inside a normal div
  return (
    <div
      ref={mapRef}
      className="h-[420px] w-full rounded-3xl bg-slate-100 lg:h-[520px]"
    />
  );
}
