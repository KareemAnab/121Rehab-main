// src/components/home/ServicesSection.tsx
"use client";

import Section, { Item } from "@/components/home/Section";

const services: Item[] = [
  {
    label: "Specialty Services",
    href: "/services#specialty",
  },
  {
    label: "Online Physical Therapy",
    href: "/services#online-pt",
  },
  {
    label: "Worker’s Comp Rehab",
    href: "/services#workers-comp",
  },
  {
    label: "Women’s Health",
    href: "/services#womens-health",
  },
  {
    label: "Hand Therapy",
    href: "/services#hand-therapy",
  },
];

export default function ServicesSection() {
  return (
    <Section
      eyebrow="Strength in every step"
      title="Our Services"
      description="From injury recovery to performance enhancement, we're here to help you reach your goals—online or in-clinic."
      items={services}
      cta={{ label: "View All Services", href: "/services" }}
    />
  );
}
