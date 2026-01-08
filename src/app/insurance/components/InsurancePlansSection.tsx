import { HERO_GRADIENT } from "@/lib/theme";
import {
  MotionDiv,
  MotionSection,
  MotionLinkButton,
  liftIn,
  enter,
} from "@/components/motion/Motion";

export default function InsurancePlansSection() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <MotionSection
        className={`${HERO_GRADIENT} text-white`}
        initial="initial"
        animate="animate"
        variants={liftIn}
        transition={enter}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/80">
            Insurance &amp; coverage
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Insurance
          </h1>
        </div>
      </MotionSection>

      {/* CONTENT */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="flex flex-col gap-8">
            {/* Main card */}
            <MotionDiv
              className="rounded-2xl border border-neutral-300 bg-white p-6 sm:p-7"
              initial="initial"
              animate="animate"
              variants={liftIn}
              transition={enter}
            >
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                Most insurance plans accepted
              </h2>

              <p className="text-sm leading-relaxed text-neutral-700">
                We accept most major insurance plans. Coverage varies by policy,
                so our team can help confirm your benefits and any requirements
                before you begin care.
              </p>

              <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                To confirm whether your specific plan is accepted, please
                contact our team.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <MotionLinkButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full btn-primary px-5 py-2 text-sm font-semibold shadow-sm transition-colors"
                >
                  Contact us
                </MotionLinkButton>

                <MotionLinkButton
                  href="tel:+19097832204"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:border-[color:var(--brand)] transition-colors"
                >
                  Call clinic
                </MotionLinkButton>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                *Coverage varies by plan and payer requirements.
              </p>
            </MotionDiv>

            {/* Callout */}
            <MotionDiv
              className="rounded-2xl callout-box p-6 sm:p-7"
              initial="initial"
              animate="animate"
              variants={liftIn}
              transition={{ ...enter, delay: 0.08 }}
            >
              <p className="text-xs font-semibold tracking-[0.16em] uppercase callout-title">
                Not sure what your plan covers?
              </p>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                Bring your insurance card and we’ll help confirm coverage
                details before your first visit. You can also reach us any time
                with questions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <MotionLinkButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:border-[color:var(--brand)] transition-colors"
                >
                  Contact us
                </MotionLinkButton>

                <MotionLinkButton
                  href="tel:+19097832204"
                  className="inline-flex items-center justify-center rounded-full btn-primary px-5 py-2 text-sm font-semibold shadow-sm transition-colors"
                >
                  Call now
                </MotionLinkButton>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
