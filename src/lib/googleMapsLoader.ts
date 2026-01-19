// src/lib/googleMapsLoader.ts
type LoadOpts = { libraries?: string[] };

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

  if (hasGoogle(libs)) return Promise.resolve();
  if (loaderPromise && loaderLibKey === libsKey) return loaderPromise;

  loaderLibKey = libsKey;

  loaderPromise = new Promise<void>((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!key) {
      reject(
        new Error(
          "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing at runtime (Vercel env var not baked into build). Redeploy after adding it.",
        ),
      );
      return;
    }

    // ✅ Catch Google auth failures (referrer/billing/API disabled)
    (window as any).gm_authFailure = () => {
      reject(
        new Error(
          "gm_authFailure: Google blocked the Maps script. This is almost always ReferrerNotAllowed, Billing disabled, or Maps JavaScript API not enabled.",
        ),
      );
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps="true"]',
    );

    const finish = () => {
      if (hasGoogle(libs)) resolve();
      else {
        reject(
          new Error(
            "Maps script loaded but google.maps (or required libraries) are missing. Check console for Google Maps JavaScript API error details.",
          ),
        );
      }
    };

    if (existing) {
      if (existing.dataset.loaded === "true") {
        finish();
        return;
      }

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
        () =>
          reject(
            new Error(
              "Failed to load Google Maps JavaScript API (network/script error)",
            ),
          ),
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
      reject(
        new Error(
          "Failed to load Google Maps JavaScript API (script tag error)",
        ),
      ),
    );

    document.head.appendChild(script);
  });

  return loaderPromise;
}
