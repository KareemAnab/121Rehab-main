"use client";

import { HERO_GRADIENT } from "@/lib/theme";
import { MotionDiv, liftIn, enter } from "@/components/motion/Motion";

export default function ContactHero() {
  return (
    <section className={`${HERO_GRADIENT} text-white`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <MotionDiv
          className="max-w-xl"
          initial="initial"
          animate="animate"
          variants={liftIn}
          transition={enter}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Get in touch with 121 Rehab
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            Have questions about starting physical therapy, insurance coverage,
            or scheduling? Call the clinic that’s closest to you and our team
            will help you take the next step.
          </p>
        </MotionDiv>

        {/* Right card */}
        <MotionDiv
          className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white backdrop-blur shadow-lg"
          initial="initial"
          animate="animate"
          variants={liftIn}
          transition={{ ...enter, delay: 0.08 }}
        >
          <h2 className="text-base font-semibold text-white">
            Same-day &amp; next-day appointments
          </h2>
          <p className="mt-2 text-xs text-white/80">
            Call during business hours and we’ll do our best to find a time that
            works with your schedule.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white" />
              <span>Evidence-based, one-on-one physical therapy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white" />
              <span>Convenient West Covina &amp; Colton locations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white" />
              <span>Most major insurance plans accepted</span>
            </li>
          </ul>
        </MotionDiv>
      </div>
    </section>
  );
}
