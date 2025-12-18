import ConditionPage from "@/components/ConditionPage";

export default function BackPainPage() {
  return (
    <ConditionPage
      title="Back Pain"
      description="Back pain can come from muscle strain, disc issues, posture, or movement imbalance. We perform a detailed movement assessment to identify the root source of your pain and create a long-term rehabilitation strategy."
      heroImage="/images/conditions/back.png"
      commonCauses={[
        "Muscle strain or spasms",
        "Herniated or bulging disc",
        "Poor lifting mechanics",
        "Prolonged sitting or standing",
        "Arthritis or spinal degeneration",
        "Weak core or glute muscles",
      ]}
      symptoms={[
        "Tightness or stiffness",
        "Sharp or shooting pain",
        "Pain radiating down the legs (sciatica)",
        "Difficulty bending or lifting",
        "Back fatigue with activity",
      ]}
      treatment={[
        "Spine mobility and flexibility training",
        "Core strengthening program",
        "Manual therapy and soft tissue release",
        "Posture retraining",
        "Movement pattern correction",
        "Education to prevent recurrence",
      ]}
    />
  );
}
