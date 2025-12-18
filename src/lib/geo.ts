// src/lib/geo.ts

export type LatLng = {
  lat: number;
  lng: number;
};

export type HasLatLng = {
  lat: number;
  lng: number;
};

/**
 * Simple squared distance between two lat/lng pairs.
 * Squared is fine because we only compare distances.
 */
export function distanceSq(a: LatLng, b: LatLng): number {
  const dLat = a.lat - b.lat;
  const dLng = a.lng - b.lng;
  return dLat * dLat + dLng * dLng;
}

/**
 * Find the nearest location object (anything that has lat/lng)
 * to the given coords. Returns null if list is empty.
 */
export function findNearestLocation<T extends HasLatLng>(
  coords: LatLng,
  locations: T[]
): T | null {
  if (!locations.length) return null;

  let best: T = locations[0];
  let bestDist = distanceSq(coords, best);

  for (let i = 1; i < locations.length; i++) {
    const loc = locations[i];
    const dist = distanceSq(coords, loc);
    if (dist < bestDist) {
      bestDist = dist;
      best = loc;
    }
  }

  return best;
}
