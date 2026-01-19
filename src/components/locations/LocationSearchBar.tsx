"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { loadGoogleMaps } from "@/lib/googleMapsLoader";

declare const google: any;

type Props = {
  onLocationChange: (coords: { lat: number; lng: number }) => void;
};

export default function LocationSearchBar({ onLocationChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // If user selects a place from the dropdown, we store its lat/lng here.
  // Then the Search button can work without Geocoding API.
  const selectedCoordsRef = useRef<{ lat: number; lng: number } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let autocomplete: any = null;

    (async () => {
      try {
        await loadGoogleMaps({ libraries: ["places"] });
        if (!isMounted) return;
        if (!inputRef.current) return;
        if (!(window as any).google?.maps?.places) return;

        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          fields: ["geometry", "formatted_address", "name"],
          types: ["geocode"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const loc = place?.geometry?.location;

          // Update visible input text
          const formatted = place?.formatted_address || place?.name;
          if (formatted && inputRef.current) {
            inputRef.current.value = formatted;
          }

          // Store coords (this is the key fix)
          if (loc) {
            selectedCoordsRef.current = { lat: loc.lat(), lng: loc.lng() };
            setError(null);
          } else {
            selectedCoordsRef.current = null;
          }
        });
      } catch (err) {
        console.error("Failed to init Places Autocomplete:", err);
        setError("Search is unavailable right now.");
      }
    })();

    return () => {
      isMounted = false;
      autocomplete = null;
    };
  }, []);

  const handleSearch = async () => {
    const value = inputRef.current?.value?.trim() || "";
    if (!value) return;

    setError(null);

    // ✅ If user picked a suggestion, use its geometry immediately (no geocode)
    if (selectedCoordsRef.current) {
      onLocationChange(selectedCoordsRef.current);
      return;
    }

    // Fallback: user typed manually (may require Geocoding API + billing)
    try {
      await loadGoogleMaps({ libraries: ["places"] });
      if (!(window as any).google?.maps) return;

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: value }, (results: any, status: string) => {
        if (status !== "OK" || !results?.length) {
          console.error("Geocode failed:", status, results);
          setError(
            status === "ZERO_RESULTS"
              ? "Try adding a city and state (ex: 1561 Main St, West Covina, CA)."
              : "Search failed. Check Maps API key restrictions / billing.",
          );
          return;
        }

        const loc = results[0]?.geometry?.location;
        if (!loc) return;

        onLocationChange({ lat: loc.lat(), lng: loc.lng() });
      });
    } catch (err) {
      console.error("Manual search failed:", err);
      setError("Search failed. Please try again.");
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;

    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocationChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Could not access your location.");
      },
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    // If user edits the text after selecting a suggestion,
    // clear stored coords so Search will geocode the new text.
    selectedCoordsRef.current = null;
    setError(null);
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
          onChange={handleInputChange}
        />

        <div className="flex gap-3 sm:w-auto">
          <motion.button
            type="button"
            onClick={handleSearch}
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

      {error ? <div className="text-sm text-red-600">{error}</div> : null}
    </div>
  );
}
