import Image from "next/image";
import type { ClinicLocation } from "@/app/data/locations";

export default function LocationCard({
  location,
}: {
  location: ClinicLocation;
}) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* IMAGE */}
      <div className="relative w-full h-45 md:h-48">
        <Image
          src={location.imageUrl}
          alt={location.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-semibold text-rose-700">{location.name}</h3>

        <p className="mt-1 text-sm text-slate-700">
          {location.addressLine1}
          <br />
          {location.city}, {location.state} {location.zip}
        </p>

        <p className="mt-2 text-sm font-medium">
          Phone: <span className="text-rose-600">{location.phoneDisplay}</span>
        </p>
        <p className="mt-2 text-sm font-medium">
          Email: <span className="text-rose-600">{location.emailDisplay}</span>
        </p>

        <div className="mt-4 flex gap-3">
          <a
            href={location.googleMapsUrl}
            target="_blank"
            className="rounded-full border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Get Directions
          </a>

          <a
            href={`tel:${location.phone}`}
            className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
          >
            Call Clinic
          </a>
        </div>
      </div>
    </article>
  );
}
