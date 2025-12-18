// src/app/about/page.tsx
import Image from "next/image";
import { getTestimonials } from "@/lib/wordpress";
import { HERO_GRADIENT } from "@/lib/theme";

export const revalidate = 60;

const defaultTestimonials = [
  {
    name: "Samantha G.",
    label: "Knee injury rehab",
    quote:
      "121 Rehab got me back to running after my knee surgery. Every session felt purposeful, and they celebrated every small win with me.",
  },
  {
    name: "Michael R.",
    label: "Work injury recovery",
    quote:
      "They helped me recover from a back injury and navigate the workers’ comp process. The team truly cared about getting me back to work safely.",
  },
  {
    name: "Ana P.",
    label: "Women’s health & pelvic rehab",
    quote:
      "I finally felt listened to. The pelvic floor therapy was discreet, respectful, and made a huge difference in my everyday life.",
  },
];

const whyChooseUs = [
  {
    title: "One-on-one, hands-on care",
    description:
      "Every visit is focused on you. We don’t bounce between multiple patients—your therapist is by your side the entire session.",
  },
  {
    title: "Evidence-based treatment",
    description:
      "We combine manual therapy with research-backed exercise progressions so you can feel progress from visit to visit.",
  },
  {
    title: "Two convenient locations",
    description:
      "Our West Covina and Colton clinics are designed to feel welcoming, with flexible scheduling options for busy lives.",
  },
  {
    title: "Team-based communication",
    description:
      "We coordinate with your physician, case manager, or surgeon to keep everyone aligned on your goals and progress.",
  },
];

const team = [
  {
    name: "Dr. Alex Nguyen, DPT",
    role: "Clinic Director – West Covina",
    image: "/images/team-alex.jpg",
  },
  {
    name: "Dr. Maya Rodriguez, DPT",
    role: "Clinic Director – Colton",
    image: "/images/team-maya.jpg",
  },
  {
    name: "Jordan Lee, PTA",
    role: "Physical Therapist Assistant",
    image: "/images/team-jordan.jpg",
  },
  {
    name: "Taylor Kim",
    role: "Patient Care Coordinator",
    image: "/images/team-taylor.jpg",
  },
];

const faqs = [
  {
    question: "Do I need a referral to start physical therapy?",
    answer:
      "In many cases, you can start physical therapy without a physician referral, but insurance requirements vary. Call us and we’ll help you understand your specific plan.",
  },
  {
    question: "What should I expect at my first visit?",
    answer:
      "Your first visit includes a one-on-one evaluation, discussion of your goals, and a personalized plan of care. You’ll usually start treatment and exercises on day one.",
  },
  {
    question: "Do you accept my insurance?",
    answer:
      "We work with many commercial and government insurance plans. You can visit our Insurance page to see commonly accepted plans, or call us and we’ll verify your benefits for you.",
  },
  {
    question: "How long are appointments?",
    answer:
      "Most sessions are 45–60 minutes, depending on your needs and treatment plan. Your therapist will let you know what to expect at your evaluation.",
  },
];

type UITestimonial = {
  name: string;
  label?: string;
  quoteHtml: string;
};

export default async function AboutPage() {
  // Pull testimonials from WordPress, fall back to defaults if anything fails
  let cmsTestimonials: UITestimonial[] = [];

  try {
    const raw = await getTestimonials(3);

    cmsTestimonials = raw.map((t: any) => ({
      name: t.title?.rendered ?? "Patient",
      // Adjust this if your plugin stores the “label” in a different meta field
      label: t.meta?.client_position || t.meta?.role || "",
      quoteHtml: t.content?.rendered ?? "",
    }));
  } catch {
    cmsTestimonials = [];
  }

  const testimonialsToRender: UITestimonial[] =
    cmsTestimonials.length > 0
      ? cmsTestimonials
      : defaultTestimonials.map((t) => ({
          name: t.name,
          label: t.label,
          quoteHtml: t.quote,
        }));

  return (
    <div className="bg-neutral-50">
      {/* HERO */}
      <section className={`${HERO_GRADIENT} text-white`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-rose-100">
            About 121 Rehab
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Evidence-based physical therapy with one-on-one care.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-rose-50/90 leading-relaxed">
            Our mission is simple: help you move with confidence again. We blend
            hands-on therapy, personalized exercise, and clear education so you
            understand your body—and your path to recovery.
          </p>
        </div>
      </section>

      {/* MAIN CARD */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 pb-20 relative">
        {/* glow behind card */}
        <div className="pointer-events-none absolute left-1/2 h-80 w-[650px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] px-4 sm:px-6 lg:px-8 pt-10 pb-12 space-y-16">
          {/* HOW WE MAKE A DIFFERENCE */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-pink-500">
              How we make a difference
            </h2>
            <div className="mt-3 grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                Recovery isn&apos;t just about pain going away—it&apos;s about
                getting back to the activities that make you feel like yourself.
                We take the time to understand your story, your goals, and the
                demands of your work, sport, and home life.{" "}
                <span className="font-semibold">
                  Then we build a plan that fits your real world, not just a
                  protocol on paper.
                </span>
              </p>
              <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 px-5 py-4 text-sm text-rose-900 border border-rose-100">
                <p className="font-semibold">
                  What matters to you, matters to us.
                </p>
                <p className="mt-2 text-rose-800">
                  Whether it&apos;s lifting your kids, returning to your sport,
                  or simply walking without fear of falling, we&apos;ll define
                  success together and celebrate each step toward it.
                </p>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-pink-500">
              Why patients choose 121 Rehab
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {whyChooseUs.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/90 p-5 hover:border-pink-400 hover:bg-rose-50/60 transition-colors"
                >
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-rose-100">
                    <span className="text-xs font-bold text-pink-500">✓</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TEAM */}
          <section id="team" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-rose-500 uppercase">
                Meet your care team
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                A team of therapists who know you by name
              </h2>
              <p className="mt-4 max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed">
                At 121 Rehab, you’re not a chart number. Our therapists work
                together as a close-knit team so your care feels consistent,
                personal, and supportive from your very first visit.
              </p>

              <div className="mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-rose-50/80 via-white to-rose-50/60 shadow-sm">
                <div className="grid gap-0 md:grid-cols-2">
                  {/* Team photo */}
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                    <Image
                      src="/images/team/121RehabTeam.jpg"
                      alt="The 121 Rehab care team"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority
                    />
                  </div>

                  {/* Text copy */}
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Collaborative, evidence-based care
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Your therapist might lead your sessions, but there’s an
                      entire team behind the scenes reviewing progress, sharing
                      ideas, and making sure your plan fits your life — work,
                      family, and everything in between.
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      <li>
                        • Board-certified physical therapists with specialized
                        training
                      </li>
                      <li>
                        • One-on-one, hands-on sessions — no bouncing between
                        multiple patients
                      </li>
                      <li>
                        • Coordinated care between our West Covina and Colton
                        locations
                      </li>
                    </ul>

                    <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-rose-500">
                      Two clinics, one unified team focused on your goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INSURANCE + BLOG */}
          <section>
            <div className="grid gap-6 md:grid-cols-2">
              <a
                href="/insurance"
                className="group rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 flex flex-col justify-between hover:border-pink-500 hover:bg-rose-50 transition-colors"
              >
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-pink-500">
                    Insurance & coverage
                  </h2>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    See examples of the insurance plans we work with and learn
                    how we verify your benefits before you start care.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-pink-600 group-hover:underline">
                  Go to Insurance page →
                </span>
              </a>

              <a
                href="/blog"
                className="group rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 flex flex-col justify-between hover:border-pink-500 hover:bg-rose-50 transition-colors"
              >
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-pink-500">
                    Our research & education
                  </h2>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    We regularly share articles, case stories, and movement tips
                    on our blog to help you stay informed between visits.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-pink-600 group-hover:underline">
                  Visit the Blog →
                </span>
              </a>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-pink-500">
              What our patients say
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              These are real stories from our patients. You can add or edit them
              any time in your WordPress dashboard.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {testimonialsToRender.map((t) => (
                <figure
                  key={t.name + t.label}
                  className="relative rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 pt-7"
                >
                  <div className="absolute -top-3 left-5 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white text-sm shadow">
                    “
                  </div>

                  <blockquote
                    className="text-sm text-neutral-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t.quoteHtml }}
                  />

                  <figcaption className="mt-3 text-xs text-neutral-600">
                    <span className="font-semibold text-neutral-900">
                      {t.name}
                    </span>
                    {t.label && <> • {t.label}</>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-pink-500">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-neutral-200 bg-neutral-50/90 px-4 py-3"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-neutral-900 list-none">
                    <span>{item.question}</span>
                    <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 text-xs text-neutral-500 group-open:border-pink-500 group-open:text-pink-500">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CONTACT CTA */}
          <section className="border-t border-neutral-200 pt-8">
            <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-pink-500">
                  Ready to get started?
                </h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Tell us what&apos;s going on and we&apos;ll help you schedule
                  your first visit at the location that works best for you.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
              >
                Contact us
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
