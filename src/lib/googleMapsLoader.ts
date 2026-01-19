// src/lib/googleMapsLoader.ts
type LoadOpts = {
  libraries?: string[];
};

let loaderPromise: Promise<void> | null = null;
let loaderLibKey = "";

function hasGoogle(libs: string[]) {
  const g = (window as any).google;
  if (!g?.maps) return false;
  if (libs.includes("places") && !g.maps.places) return false;
  return true;
}

export function loadGoogleMaps(opts: LoadOpts = {}): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const libs = (opts.libraries?.length ? opts.libraries : ["places"])
    .slice()
    .sort();
  const libsKey = libs.join(",");

  // If already loaded with required libs, resolve immediately
  if (hasGoogle(libs)) return Promise.resolve();

  // If we already started a load with the same libs, reuse it
  if (loaderPromise && loaderLibKey === libsKey) return loaderPromise;

  loaderLibKey = libsKey;

  loaderPromise = new Promise<void>((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!key) {
      reject(
        new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing at runtime"),
      );
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="true"]',
    );

    const finish = () => {
      if (hasGoogle(libs)) resolve();
      else {
        reject(
          new Error(
            "Google Maps script loaded but google.maps (or requested libraries) not available. Check console for InvalidKey/RefererNotAllowed/Billing/API-not-enabled.",
          ),
        );
      }
    };

    if (existing) {
      // Script exists: if it's already loaded, finish immediately (prevents deadlock)
      if (existing.dataset.loaded === "true") {
        finish();
        return;
      }

      // Otherwise wait for it
      existing.addEventListener(
        "load",
        () => {
          existing.dataset.loaded = "true";
          finish();
        },
        { once: true },
      );
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps JavaScript API")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.dataset.googleMaps = "true";

    const params = new URLSearchParams({
      key,
      libraries: libs.join(","),
      v: "weekly",
    });

    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;

    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      finish();
    });
    script.addEventListener("error", () =>
      reject(new Error("Failed to load Google Maps JavaScript API")),
    );

    document.head.appendChild(script);
  });

  return loaderPromise;
}
