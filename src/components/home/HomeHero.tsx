"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/home/Section";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function HomeHero() {
  return (
    <div className="text-white bg-gradient-to-r from-[var(--hero-from)] to-[var(--hero-to)]">
      <Section className="pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          {/* Left: main message */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              Strength in Every Step
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              121 Rehab physical therapy serving the Inland Empire &amp; Los
              Angeles County.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-white/90">
              For over 10 years, 121 Rehab has been committed to helping our
              community recover, heal, and move better. Through personalized,
              one-on-one care, we’ve guided thousands of patients back to
              pain-free movement, improved mobility, and confidence in their
              everyday lives.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="inline-flex"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:bg-slate-100 text-brand"
                >
                  Contact Us
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="inline-flex"
              >
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View all services
                </Link>
              </motion.div>
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
          </motion.div>

          {/* Right: mini info card */}
          <div className="hidden lg:block">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              className="rounded-2xl bg-white/10 p-6 backdrop-blur shadow-lg border border-white/20"
            >
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
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
