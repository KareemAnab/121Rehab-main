// src/components/home/ServicesSection.tsx
"use client";

import Section, { Item } from "@/components/home/Section";

const services: Item[] = [
  {
    label: "Specialty Services",
    href: "/services#specialty",
  },
  {
    label: "Orthopedic Physical Therapy",
    href: "/services#orthopedic-pt",
  },
  {
    label: "Pelvic Therapy",
    href: "/services#pelvic-therapy",
  },
  {
    label: "Sports Rehab & Performance",
    href: "/services#sports-rehab",
  },
];

export default function ServicesSection() {
  return (
    <Section
      eyebrow="Strength in every step"
      title="Our Services"
      description="From injury recovery to performance enhancement, we're here to help you reach your goals."
      items={services}
      cta={{ label: "View All Services", href: "/services" }}
    />
  );
}
