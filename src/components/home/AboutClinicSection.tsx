import AboutSplit from "@/components/home/AboutSplit";

const aboutClinicContent = {
  title: "About Our Clinic",
  description:
    "We combine hands-on therapy with modern techniques to deliver measurable outcomes. Our team focuses on one-on-one care so you can get back to the activities you love.",
  imageUrl: "/images/home/about-clinic.jpg", // update to your real image path
  cta: {
    label: "Learn More",
    href: "/about",
  },
  reverse: false, // flip to true if you want the image on the right / text on the left
};

export default function AboutClinicSection() {
  return <AboutSplit {...aboutClinicContent} />;
}
