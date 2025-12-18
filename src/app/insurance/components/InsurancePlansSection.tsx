// src/components/insurance/InsurancePlansSection.tsx
import Link from "next/link";
import { HERO_GRADIENT } from "@/lib/theme";

export default function InsurancePlansSection() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className={`${HERO_GRADIENT} text-white`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/80">
            Verify your coverage
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Insurance
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-24">
          <div className="flex flex-col gap-8">
            {/* Left */}
            <div className="rounded-2xl border border-neutral-300 bg-white p-6 sm:p-7">
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                Most insurance plans accepted
              </h2>

              <p className="text-sm leading-relaxed text-neutral-700">
                We accept most major insurance plans. Coverage varies by policy,
                so our team can verify your benefits before you start care.
              </p>

              <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                If you’d like to confirm whether your specific plan is accepted,
                please contact our team.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
                >
                  Contact us
                </Link>

                <Link
                  href="tel:+19097832204"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:border-rose-300 transition-colors"
                >
                  Call clinic
                </Link>
              </div>

              <p className="mt-4 text-xs text-neutral-500">
                *Coverage varies by plan and payer requirements.
              </p>
            </div>

            {/* Right callout (keeps your “box on the right” look) */}
            <div className="rounded-2xl border border-rose-300/60 bg-rose-50 p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-rose-700">
                Not sure if you’re covered?
              </p>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                Bring your insurance card and we’ll help confirm your benefits
                before your first visit. You can also reach us any time with
                questions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-5 py-2 text-sm font-semibold text-rose-700 shadow-sm hover:border-rose-300 transition-colors"
                >
                  Contact us
                </Link>
                <Link
                  href="tel:+19097832204"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:border-rose-300 transition-colors"
                >
                  Call now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
