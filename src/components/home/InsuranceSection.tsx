"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function InsuranceSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 items-center">
          {/* Left side: text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-brand">
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

            <motion.div
              className="inline-flex mt-6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            >
              <Link
                href="/insurance"
                className="btn-primary px-6 py-3 rounded-full font-semibold text-sm shadow"
              >
                Check coverage
              </Link>
            </motion.div>

            <p className="mt-3 text-xs text-neutral-500">
              *Coverage varies by plan and payer requirements.
            </p>
          </motion.div>

          {/* Right side: themed callout box */}
          <div className="hidden md:block">
            <motion.div
              className="rounded-2xl callout-box px-6 py-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wide callout-title">
                Not sure if you’re covered?
              </p>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                We work with most major insurance plans. Because benefits vary
                by plan, our team is happy to help you understand your coverage
                options.
              </p>

              <p className="mt-2 text-sm">
                <motion.span
                  className="inline-block"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  <Link href="/contact" className="text-brand underline">
                    Reach out to our clinic
                  </Link>
                </motion.span>{" "}
                and we’ll walk you through the next steps.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
