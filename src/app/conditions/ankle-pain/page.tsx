import ConditionPage from "@/components/ConditionPage";

export default function AnklePainPage() {
  return (
    <ConditionPage
      title="Ankle Pain"
      description="Reduce pain and improve stability after sprains, overuse injuries, or ongoing irritation."
      heroImage="/images/conditions/ankle.jpg"
      commonCauses={[
        "Ankle sprain (ligament strain/tear)",
        "Tendon irritation (Achilles, peroneal tendons)",
        "Overuse from running/jumping",
        "Limited mobility or stiffness after injury",
        "Instability from prior sprains",
      ]}
      symptoms={[
        "Pain with walking, running, or stairs",
        "Swelling or tenderness around the ankle",
        "Stiffness and limited range of motion",
        "Feeling of giving way / instability",
        "Pain when pushing off or changing direction",
      ]}
      treatment={[
        "Manual therapy to restore mobility",
        "Strengthening for ankle/foot stability",
        "Balance + proprioception retraining",
        "Gait/running mechanics education",
        "Gradual return-to-sport progression",
        "Home exercises tailored to your goals",
      ]}
    />
  );
}
