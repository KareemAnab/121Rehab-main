// src/app/insurance/page.tsx
import InsurancePlansSection from "@/app/insurance/components/InsurancePlansSection";

export default function InsurancePage() {
  return (
    // Make the whole page white so there is no gray band between content and footer
    <main className="bg-neutral-50">
      <InsurancePlansSection />
    </main>
  );
}
