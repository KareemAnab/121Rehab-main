import ConditionPage from "@/components/ConditionPage";

export default function KneePainPage() {
  return (
    <ConditionPage
      title="Knee Pain"
      description="Knee pain can develop from overuse, sports injury, weakness, or structural changes within the joint. Our tailored knee rehabilitation targets mobility, alignment, and strength to restore pain-free movement."
      heroImage="/images/conditions/knee.jpg"
      commonCauses={[
        "Patellofemoral pain syndrome",
        "Tendonitis or overuse injuries",
        "ACL, MCL, or meniscus injuries",
        "Arthritis or cartilage wear",
        "Muscle imbalances",
        "Poor running or squat mechanics",
      ]}
      symptoms={[
        "Pain with bending or squatting",
        "Swelling or stiffness",
        "Clicking or catching",
        "Instability or giving way",
        "Pain during walking or stairs",
      ]}
      treatment={[
        "Strengthening of quads, glutes, and hips",
        "Manual therapy for joint mobility",
        "Running or squat form correction",
        "Balance and neuromuscular training",
        "Inflammation reduction techniques",
        "Custom exercise programming",
      ]}
    />
  );
}
