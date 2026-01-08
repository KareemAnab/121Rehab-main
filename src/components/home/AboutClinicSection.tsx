import AboutSplit from "@/components/home/AboutSplit";

const aboutClinicContent = {
  title: "About Our Clinic",
  description:
    "For over 10 years, 121 Rehab has helped patients recover from injury, reduce pain, and return to the activities they love. We combine hands-on therapy with modern techniques and one-on-one care to deliver measurable outcomes and lasting confidence in movement.",
  imageUrl: "/images/home/about-clinic.jpg", // update to your real image path
  cta: {
    label: "Learn More",
    href: "/about",
  },
  reverse: false,
};

export default function AboutClinicSection() {
  return <AboutSplit {...aboutClinicContent} />;
}
