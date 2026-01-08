"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "./Section";

export default function AboutSplit({
  title = "About Us",
  description,
  imageUrl,
  cta,
  reverse = false,
}: {
  title?: string;
  description: string;
  imageUrl: string;
  cta?: { label: string; href: string };
  reverse?: boolean;
}) {
  return (
    <Section title={title}>
      <div
        className={`grid md:grid-cols-2 gap-8 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.img
          src={imageUrl}
          alt=""
          className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.03 }}
        >
          <p className="text-gray-700 leading-relaxed">{description}</p>

          {cta && (
            <motion.div
              className="inline-flex mt-6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            >
              <Link
                href={cta.href}
                className="inline-flex btn-primary px-6 py-3 rounded-lg font-semibold shadow-sm"
              >
                {cta.label}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
