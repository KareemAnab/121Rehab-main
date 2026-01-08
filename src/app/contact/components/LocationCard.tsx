"use client";

import Image from "next/image";
import type { ClinicLocation } from "@/app/data/locations";
import { MotionArticle, MotionDiv, hover } from "@/components/motion/Motion";

export default function LocationCard({
  location,
}: {
  location: ClinicLocation;
}) {
  return (
    <MotionArticle
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
      whileHover={{ y: -4 }}
      transition={hover}
    >
      {/* IMAGE */}
      <div className="relative w-full h-44 md:h-52 overflow-hidden">
        <MotionDiv
          whileHover={{ scale: 1.03 }}
          transition={hover}
          className="h-full w-full"
        >
          <Image
            src={location.imageUrl}
            alt={location.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </MotionDiv>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {location.name}
        </h3>

        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
          {location.addressLine1}
          <br />
          {location.city}, {location.state} {location.zip}
        </p>

        <div className="mt-4 grid gap-1 text-sm">
          <p className="text-slate-900">
            <span className="font-semibold">Phone:</span>{" "}
            <span className="text-brand font-semibold">
              {location.phoneDisplay}
            </span>
          </p>
          <p className="text-slate-900">
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-brand font-semibold">
              {location.emailDisplay}
            </span>
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={location.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:border-[color:var(--brand)] transition-colors"
          >
            Get Directions
          </a>

          <a
            href={`tel:${location.phone}`}
            className="rounded-full btn-primary px-4 py-2 text-sm font-semibold shadow-sm"
          >
            Call Clinic
          </a>
        </div>
      </div>
    </MotionArticle>
  );
}
