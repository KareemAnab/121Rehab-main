"use client";

import { useEffect, useRef } from "react";
import type { ClinicLocation } from "@/app/data/locations";

declare const google: any;

// Reuse the same loader, but Places library isn't required here
let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if ((window as any).google?.maps) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="true"]'
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "true";

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Maps JavaScript API"));

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

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
        await loadGoogleMaps();
        if (!mapRef.current || !google?.maps) return;

        const center = {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        };

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

  return <div ref={mapRef} className="h-full w-full rounded-3xl" />;
}
