// src/components/home/InsuranceSection.tsx
import Link from "next/link";

export default function InsuranceSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-center">
          {/* Left side: text + CTA */}
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-pink-500">
              Verify your coverage
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-900">
              Most insurance plans accepted
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
              We accept most major insurance plans. Coverage varies by policy,
              so our team can verify your benefits before you start care.
            </p>

            <p className="mt-3 text-sm text-neutral-600">
              If you’d like to confirm whether your specific plan is accepted,
              you can contact our team.
            </p>

            <Link
              href="/insurance"
              className="inline-flex mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-semibold text-sm shadow"
            >
              Check coverage
            </Link>

            <p className="mt-3 text-xs text-neutral-500">
              *Coverage varies by plan and payer requirements.
            </p>
          </div>

          {/* Right side: pink callout box */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 px-6 py-8">
              <p className="text-sm font-semibold text-rose-700 uppercase tracking-wide">
                Not sure if you’re covered?
              </p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                Share your insurance information on our{" "}
                <Link href="/insurance" className="text-rose-700 underline">
                  insurance verification
                </Link>{" "}
                page and our team will review your benefits before your first
                visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
