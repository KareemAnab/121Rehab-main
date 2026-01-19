// src/app/about/page.tsx
import Image from "next/image";
import { HERO_GRADIENT } from "@/lib/theme";
import {
  MotionArticle,
  MotionDiv,
  MotionLinkButton,
  liftIn,
  enter,
  hover,
} from "@/components/motion/Motion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      "They helped me recover from a back injury and navigate the process. The team truly cared about getting me back safely.",
  },
  {
    name: "Ana P.",
    label: "Pelvic therapy",
    quote:
      "I finally felt listened to. The care was discreet, respectful, and made a huge difference in my everyday life.",
  },
];

const whyChooseUs = [
  {
    title: "One-on-one, hands-on care",
    description:
      "Every visit is focused on you. We don’t bounce between multiple patients, your therapist is by your side the entire session.",
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
      "We accept many commercial and government insurance plans. You can visit our Insurance page or call us and we’ll help confirm your coverage.",
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

function stripHtmlToText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Fetch testimonials from WP *Posts* category slug = "testimonials"
 * This is easiest for the client (normal WP Posts workflow).
 */
async function getTestimonialsFromPostsCategory(
  limit = 3,
): Promise<UITestimonial[]> {
  const base =
    process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || "";

  if (!base) return [];

  // 1) Find the category ID by slug
  const catRes = await fetch(
    `${base.replace(/\/$/, "")}/wp-json/wp/v2/categories?slug=testimonials`,
    { cache: "no-store" },
  );

  if (!catRes.ok) return [];
  const cats = (await catRes.json()) as Array<{ id: number }>;
  const catId = cats?.[0]?.id;
  if (!catId) return [];

  // 2) Fetch posts in that category
  const postsRes = await fetch(
    `${base.replace(
      /\/$/,
      "",
    )}/wp-json/wp/v2/posts?per_page=${limit}&categories=${catId}`,
    { cache: "no-store" },
  );

  if (!postsRes.ok) return [];

  const posts = (await postsRes.json()) as any[];

  return posts.map((p) => ({
    name: stripHtmlToText(p?.title?.rendered ?? "") || "Patient",
    label: "",
    quoteHtml: p?.content?.rendered ?? "",
  }));
}

export default async function AboutPage() {
  let cmsTestimonials: UITestimonial[] = [];

  try {
    cmsTestimonials = await getTestimonialsFromPostsCategory(3);
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
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/80">
            About 121 Rehab
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Evidence-based physical therapy with one-on-one care.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
            Our mission is simple: help you move with confidence again. We blend
            hands-on therapy, personalized exercise, and clear education so you
            understand your body and your path to recovery.
          </p>
        </div>
      </section>

      {/* MAIN CARD */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 pb-20 relative">
        {/* subtle glow behind card (theme-based) */}
        <div className="pointer-events-none absolute left-1/2 h-80 w-[650px] -translate-x-1/2 rounded-full bg-[var(--brand-soft)] opacity-50 blur-3xl" />

        <MotionDiv
          className="relative rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] px-4 sm:px-6 lg:px-8 pt-10 pb-12 space-y-16"
          initial="initial"
          animate="animate"
          variants={liftIn}
          transition={enter}
        >
          {/* HOW WE MAKE A DIFFERENCE */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-brand">
              How we make a difference
            </h2>

            <div className="mt-3 grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                Recovery isn&apos;t just about pain going away, it&apos;s about
                getting back to the activities that make you feel like yourself.
                We take the time to understand your story, your goals, and the
                demands of your work, sport, and home life.{" "}
                <span className="font-semibold">
                  Then we build a plan that fits your real world, not just a
                  protocol on paper.
                </span>
              </p>

              <MotionDiv
                className="rounded-2xl bg-[var(--brand-soft)] p-5 text-sm text-slate-900 border border-neutral-200"
                whileHover={{ y: -2 }}
                transition={hover}
              >
                <p className="font-semibold text-brand">
                  What matters to you, matters to us.
                </p>
                <p className="mt-2 text-slate-700">
                  Whether it&apos;s lifting your kids, returning to your sport,
                  or simply walking without fear, we&apos;ll define success
                  together and celebrate each step toward it.
                </p>
              </MotionDiv>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-brand">
              Why patients choose 121 Rehab
            </h2>

            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {whyChooseUs.map((item) => (
                <MotionDiv
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/90 p-5 hover:border-[color:var(--brand)] hover:bg-[var(--brand-soft)] transition-colors"
                  whileHover={{ y: -3 }}
                  transition={hover}
                >
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200">
                    <span className="text-xs font-bold text-brand">✓</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </section>

          {/* TEAM */}
          <section id="team" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
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

              <div className="mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                    <Image
                      src="/images/team/121rehabteam.jpg"
                      alt="The 121 Rehab care team"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority
                    />
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Collaborative, evidence-based care
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                      Your therapist might lead your sessions, but there’s an
                      entire team behind the scenes reviewing progress, sharing
                      ideas, and making sure your plan fits your life.
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      <li>
                        • Board-certified physical therapists with specialized
                        training
                      </li>
                      <li>• One-on-one, hands-on sessions</li>
                      <li>• Coordinated care between locations</li>
                    </ul>

                    <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-brand">
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
              <MotionLinkButton
                href="/insurance"
                className="group rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 flex flex-col justify-between hover:border-[color:var(--brand)] hover:bg-[var(--brand-soft)] transition-colors"
              >
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-brand">
                    Insurance &amp; coverage
                  </h2>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    Learn about coverage and how to confirm eligibility before
                    starting care.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand group-hover:underline">
                  Go to Insurance page →
                </span>
              </MotionLinkButton>

              <MotionLinkButton
                href="/blog"
                className="group rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 flex flex-col justify-between hover:border-[color:var(--brand)] hover:bg-[var(--brand-soft)] transition-colors"
              >
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-brand">
                    Our research &amp; education
                  </h2>
                  <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                    Articles, movement tips, and patient stories to keep you
                    informed.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand group-hover:underline">
                  Visit the Blog →
                </span>
              </MotionLinkButton>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-brand">
              What our patients say
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              These are real stories from our patients. You can add or edit them
              any time in WordPress by creating a Post in the “Testimonials”
              category.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {testimonialsToRender.map((t) => (
                <MotionArticle
                  key={t.name + (t.label ?? "")}
                  className="relative rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 pt-7"
                  whileHover={{ y: -3 }}
                  transition={hover}
                >
                  <div className="absolute -top-3 left-5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand)] text-white text-sm shadow">
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
                </MotionArticle>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-brand">
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
                    <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 text-xs text-neutral-500 group-open:border-[color:var(--brand)] group-open:text-brand">
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
                <h2 className="text-sm font-semibold tracking-[0.16em] uppercase text-brand">
                  Ready to get started?
                </h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Tell us what&apos;s going on and we&apos;ll help you schedule
                  your first visit at the location that works best for you.
                </p>
              </div>

              <MotionLinkButton
                href="/contact"
                className="inline-flex items-center justify-center rounded-full btn-primary px-6 py-2.5 text-sm font-semibold shadow-sm"
              >
                Contact us
              </MotionLinkButton>
            </div>
          </section>
        </MotionDiv>
      </section>
    </div>
  );
}
