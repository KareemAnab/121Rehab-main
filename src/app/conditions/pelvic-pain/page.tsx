import ConditionPage from "@/components/ConditionPage";

export default function PelvicPainPage() {
  return (
    <ConditionPage
      title="Pelvic Pain"
      description="Pelvic pain can be related to muscles, joints, nerves, or pressure changes in the pelvic floor. We provide a private, supportive environment to assess your symptoms and create a plan that supports daily comfort and function."
      heroImage="/images/conditions/pelvic.jpg"
      commonCauses={[
        "Pelvic floor muscle tension or weakness",
        "Postpartum changes",
        "Hip or low back mechanics",
        "Scar tissue or prior surgery",
        "Bladder or bowel-related strain",
        "Core and pelvic instability",
      ]}
      symptoms={[
        "Deep pelvic or groin discomfort",
        "Pain with sitting, standing, or walking",
        "Discomfort with certain movements or positions",
        "Pressure or heaviness in the pelvis",
        "Hip or low back pain linked to pelvic motion",
      ]}
      treatment={[
        "Pelvic floor relaxation and strengthening",
        "Breathing and pressure management strategies",
        "Gentle manual therapy and mobility work",
        "Core and hip stability training",
        "Education on posture and daily habits",
        "Individualized home program for long-term relief",
      ]}
    />
  );
}
