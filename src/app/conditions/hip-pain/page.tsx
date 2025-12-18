import ConditionPage from "@/components/ConditionPage";

export default function HipPainPage() {
  return (
    <ConditionPage
      title="Hip Pain"
      description="Improve mobility, strength, and comfort with a plan built around your movement goals."
      heroImage="/images/conditions/hip.jpg"
      commonCauses={[
        "Hip flexor or glute irritation",
        "Overuse from running/squatting",
        "Limited hip mobility or stiffness",
        "Hip impingement-like mechanics",
        "Low-back/hip movement compensation patterns",
      ]}
      symptoms={[
        "Pain when walking, running, or sitting",
        "Pinching in the front of the hip",
        "Stiffness with rotation or deep bending",
        "Weakness with climbing stairs",
        "Pain during squats or lunges",
      ]}
      treatment={[
        "Manual therapy to restore mobility",
        "Strengthening for glutes/hips/core",
        "Movement retraining (squat, hinge, gait)",
        "Activity modification guidance",
        "Gradual return-to-sport progression",
        "Home exercise plan for long-term control",
      ]}
    />
  );
}
