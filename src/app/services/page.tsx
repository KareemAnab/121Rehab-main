// src/app/services/page.tsx
import { HERO_GRADIENT } from "@/lib/theme";

const services = [
  {
    title: "Specialty Services",
    description:
      "Advanced, condition-specific programs such as sports performance, post-surgical rehab, and complex orthopedic cases customized to what your body needs most.",
    icon: "🎯",
    focus: "Advanced care",
  },
  {
    title: "Orthopedic Physical Therapy",
    description:
      "Hands-on care for muscle and joint pain to improve strength, mobility, and function—built around your goals and daily demands.",
    icon: "🦴",
    focus: "Orthopedic rehab",
  },
  {
    title: "Hand Therapy",
    description:
      "Targeted therapy for the hand, wrist, and elbow—supporting recovery from tendon/ligament injuries, repetitive strain, fractures, and post-surgical repairs.",
    icon: "✋",
    focus: "Upper extremity",
  },
  {
    title: "Sports Rehab & Performance",
    description:
      "Return-to-sport rehab and performance-focused training to help you move better, rebuild confidence, and reduce re-injury risk.",
    icon: "⚡",
    focus: "Sports performance",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-slate-50">
      {/* Gradient hero */}
      <section className={`${HERO_GRADIENT} text-white`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-rose-100">
            Strength in every step
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-rose-50/90 leading-relaxed">
            121 Rehab provides one-on-one, hands-on physical therapy tailored to
            your goals at our West Covina and Colton locations.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-rose-600 shadow-sm hover:bg-rose-50"
            >
              Contact Us
            </a>
            <a
              href="/insurance"
              className="inline-flex items-center justify-center rounded-full border border-rose-100/80 bg-rose-600/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-500/40"
            >
              Check if we accept your insurance
            </a>
          </div>
        </div>
      </section>

      {/* Services grid card that overlaps the hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20 -mt-8">
        <div className="rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-neutral-200/80 bg-white/90 p-6 sm:p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-lg">
                    <span aria-hidden="true">{service.icon}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-neutral-900">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed">
                  {service.description}
                </p>

                <span className="mt-auto text-xs font-semibold uppercase tracking-wide text-rose-600">
                  {service.focus}
                </span>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs text-neutral-500">
            Don&apos;t see your specific condition listed? Contact us and our
            therapists can let you know if 121 Rehab is the right fit for your
            goals.
          </p>
        </div>
      </section>
    </div>
  );
}
