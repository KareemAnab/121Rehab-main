// src/app/contact/page.tsx
import ContactHero from "@/app/contact/components/ContactHero";
import LocationList from "@/app/contact/components/LocationList";

export default function ContactPage() {
  return (
    <div className="bg-neutral-50">
      <ContactHero />

      {/* Keep this section white so gradient doesn't bleed */}
      <section className="bg-neutral-50">
        <LocationList />
      </section>
    </div>
  );
}
