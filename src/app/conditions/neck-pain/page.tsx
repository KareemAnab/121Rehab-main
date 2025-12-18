import ConditionPage from "@/components/ConditionPage";

export default function NeckPainPage() {
  return (
    <ConditionPage
      title="Neck Pain"
      description="Neck pain can stem from posture habits, muscle strain, nerve irritation, or underlying joint issues. Whether your pain started suddenly or developed over time, our team identifies the root cause and builds a tailored recovery plan to restore mobility and reduce discomfort."
      heroImage="/images/conditions/neck.jpg"
      commonCauses={[
        "Poor posture from desk or phone use",
        "Muscle strain and tightness",
        "Pinched nerves",
        "Whiplash injuries",
        "Arthritis or joint degeneration",
        "Sleeping position stress",
      ]}
      symptoms={[
        "Stiffness or limited range of motion",
        "Pain radiating to shoulders or arms",
        "Headaches at the base of the skull",
        "Tingling or numbness",
        "Sharp pain with turning the head",
      ]}
      treatment={[
        "Hands-on manual therapy",
        "Posture and ergonomic correction",
        "Neck mobility restoration exercises",
        "Strengthening of stabilizing muscles",
        "Heat, ice, and tension-relief techniques",
        "Customized home exercise plan",
      ]}
    />
  );
}
