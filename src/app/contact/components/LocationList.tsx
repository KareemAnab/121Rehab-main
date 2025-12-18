// src/app/contact/components/LocationList.tsx
import LocationCard from "./LocationCard";
import { clinicLocations } from "@/app/data/locations";

export default function LocationList() {
  return (
    <section className="mx-auto max-w-6xl px-5 mt-10 pb-21">
      <h2 className="text-xl font-semibold">Our Locations</h2>
      <p className="mt-1 text-sm text-slate-600">
        We currently have two convenient locations. Choose the clinic that’s
        closest to you.
      </p>

      {/*THIS is the important part */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {clinicLocations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </section>
  );
}
