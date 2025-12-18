import Link from "next/link";
import Section from "@/components/home/Section";
import { HERO_GRADIENT } from "@/lib/theme";

export default function HomeHero() {
  return (
    <div className="bg-gradient-to-r from-[#ff1959] to-[#ff5a7a] text-white">
      <Section className="pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          {/* Left: main message */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              Strength in Every Step
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Evidence-based physical therapy in West Covina &amp; Colton.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-white/90">
              Recover from injury, reduce pain, and move with confidence. Our
              one-on-one treatment plans are tailored to your goals— whether
              you’re getting back to sport or everyday life.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#ff1959] shadow-sm transition hover:bg-slate-100"
              >
                Contact Us
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View all services
              </Link>
            </div>

            <dl className="mt-6 grid max-w-md grid-cols-2 gap-4 text-sm text-white/90">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-white/70">
                  Two convenient locations
                </dt>
                <dd className="mt-1 text-base font-semibold">
                  West Covina &amp; Colton
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: mini info card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur shadow-lg border border-white/20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Why patients choose 121 Rehab
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                  <span>One-on-one, hands-on physical therapy.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                  <span>Most major insurance plans accepted.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
