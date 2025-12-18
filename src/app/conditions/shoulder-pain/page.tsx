import ConditionPage from "@/components/ConditionPage";

export default function ShoulderPainPage() {
  return (
    <ConditionPage
      title="Shoulder Pain"
      description="Shoulder pain often comes from tendon irritation, impingement, instability, or stiffness in the joint. We assess how your shoulder moves during daily tasks and exercise to design a treatment plan that restores strength and pain-free mobility."
      heroImage="/images/conditions/shoulder.jpg"
      commonCauses={[
        "Rotator cuff irritation or tears",
        "Shoulder impingement",
        "Poor posture and rounded shoulders",
        "Overhead sports or lifting",
        "Frozen shoulder (adhesive capsulitis)",
        "Joint instability from previous injury",
      ]}
      symptoms={[
        "Pain with reaching or lifting overhead",
        "Weakness when carrying objects",
        "Clicking or catching sensations",
        "Night pain when lying on the shoulder",
        "Limited range of motion",
      ]}
      treatment={[
        "Targeted rotator cuff and scapular strengthening",
        "Manual therapy to improve joint mobility",
        "Posture and movement retraining",
        "Gradual return-to-sport programming",
        "Education on safe lifting and overhead mechanics",
        "Home exercises tailored to your activities",
      ]}
    />
  );
}
