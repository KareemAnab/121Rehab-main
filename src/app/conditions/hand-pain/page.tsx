import ConditionPage from "@/components/ConditionPage";

export default function HandPainPage() {
  return (
    <ConditionPage
      title="Hand & Wrist Pain"
      description="Hand and wrist pain can limit work, typing, lifting, and daily tasks. We look at joint mobility, tendon health, and overall mechanics to help you return to comfortable, confident use of your hands."
      heroImage="/images/conditions/hand.jpg"
      commonCauses={[
        "Overuse from typing or repetitive tasks",
        "Tendonitis or tendinopathy",
        "Carpal tunnel–type symptoms",
        "Sprains or previous fractures",
        "Arthritis in the wrist or fingers",
        "Poor wrist and shoulder positioning with activity",
      ]}
      symptoms={[
        "Aching or sharp pain with gripping",
        "Numbness or tingling in the hand",
        "Weakness when carrying or lifting",
        "Stiffness in the wrist or fingers",
        "Swelling after activity",
      ]}
      treatment={[
        "Activity and workstation modifications",
        "Gentle mobility and tendon-gliding exercises",
        "Strengthening for hand, wrist, and forearm muscles",
        "Posture and upper-body alignment training",
        "Education on pacing and load management",
        "Home program to support long-term hand health",
      ]}
    />
  );
}
