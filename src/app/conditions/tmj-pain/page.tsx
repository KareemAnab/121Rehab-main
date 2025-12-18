import ConditionPage from "@/components/ConditionPage";

export default function TMJPainPage() {
  return (
    <ConditionPage
      title="TMJ Pain"
      description="Targeted care for jaw pain, clicking, and tension that can contribute to headaches or neck tightness."
      heroImage="/images/conditions/tmj.jpg"
      commonCauses={[
        "Jaw muscle tension / clenching",
        "TMJ irritation or inflammation",
        "Stress-related grinding (bruxism)",
        "Neck/upper back posture strain",
        "Movement pattern issues with chewing/speaking",
      ]}
      symptoms={[
        "Jaw pain or tightness",
        "Clicking/popping with opening or chewing",
        "Headaches or temple pain",
        "Neck stiffness alongside jaw discomfort",
        "Limited jaw opening or locking sensation",
      ]}
      treatment={[
        "Manual therapy for jaw/neck mobility",
        "Posture + movement retraining",
        "Soft tissue techniques for tension relief",
        "Education on safe jaw mechanics",
        "Home exercises for control and mobility",
      ]}
    />
  );
}
