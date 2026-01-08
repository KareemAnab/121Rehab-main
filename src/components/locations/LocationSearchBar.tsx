"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

declare const google: any;

// Single shared loader for the Maps JS (with Places library)
let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMapsWithPlaces(): Promise<void> {
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    // If script already present & loaded, resolve immediately
    if ((window as any).google?.maps?.places) {
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
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
  onLocationChange: (coords: { lat: number; lng: number }) => void;
};

export default function LocationSearchBar({ onLocationChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Set up Places Autocomplete on the input
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        await loadGoogleMapsWithPlaces();
        if (!isMounted) return;
        if (!inputRef.current || !google?.maps?.places) return;

        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            fields: ["geometry", "formatted_address"],
            types: ["geocode"],
          }
        );

        // only update the input text; actual search happens on button / Enter
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const formatted = place?.formatted_address;
          if (formatted && inputRef.current) {
            inputRef.current.value = formatted;
          }
        });
      } catch (err) {
        console.error("Failed to init Places Autocomplete", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [onLocationChange]);

  // Manual search button (geocoding whatever is typed)
  const handleSearchClick = async () => {
    const value = inputRef.current?.value?.trim();
    if (!value) return;

    try {
      await loadGoogleMapsWithPlaces();
      if (!google?.maps) return;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: value }, (results: any, status: string) => {
        if (status !== "OK" || !results?.length) return;
        const loc = results[0].geometry?.location;
        if (!loc) return;

        onLocationChange({
          lat: loc.lat(),
          lng: loc.lng(),
        });
      });
    } catch (err) {
      console.error("Manual geocode failed", err);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocationChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error", err);
      }
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[color:var(--brand)] focus:ring-1 focus:ring-[color:var(--brand)]"
          placeholder="Enter an address or city"
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-3 sm:w-auto">
          <motion.button
            type="button"
            onClick={handleSearchClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="inline-flex flex-1 items-center justify-center rounded-full btn-primary px-5 py-3 text-sm font-semibold shadow-sm sm:flex-none"
          >
            Search
          </motion.button>

          <motion.button
            type="button"
            onClick={handleUseMyLocation}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 sm:flex-none"
          >
            Use my location
          </motion.button>
        </div>
      </div>
    </div>
  );
}
