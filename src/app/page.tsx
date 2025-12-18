// src/app/page.tsx
import HomeHero from "@/components/home/HomeHero";
import ServicesSection from "@/components/home/ServicesSection";
import ConditionsTabs from "@/components/home/ConditionsTabs";
import AboutClinicSection from "@/components/home/AboutClinicSection";
import LocationsSection from "@/components/home/LocationsSection";
import InsuranceSection from "@/components/home/InsuranceSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero (gradient banner) */}
      <HomeHero />

      {/* 2. Our Services */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <ServicesSection />
        </div>
      </section>

      {/* 3. Where does it hurt? (tabs) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <ConditionsTabs />
        </div>
      </section>

      {/* 4. About Our Clinic split section */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <AboutClinicSection />
        </div>
      </section>

      {/* 5. Locations search + map */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <LocationsSection />
        </div>
      </section>

      {/* 6. Insurance teaser (home version) */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <InsuranceSection />
        </div>
      </section>
    </>
  );
}
