"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export type Item = {
  label: string;
  href: string;
};

type SectionProps = {
  eyebrow?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Optional list of items (used on Services, etc.) */
  items?: Item[];
  /** Optional primary call-to-action button */
  cta?: {
    label: string;
    href: string;
  };
  /** Extra content (cards, grids, etc.) */
  children?: React.ReactNode;
};

export default function Section({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  items,
  cta,
  children,
}: SectionProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const hasHeader = eyebrow || title || description;
  const hasStructuredContent = (items && items.length > 0) || cta != null;

  const header = hasHeader ? (
    <header className={`${alignCls} max-w-3xl`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-4 leading-relaxed text-gray-600">{description}</p>
      )}
    </header>
  ) : null;

  // Layout when we have list/CTA but no extra children (Services section style)
  if (hasStructuredContent && !children) {
    return (
      <section className={`container mx-auto px-5 py-16 ${className}`}>
        {header}
        <div className={hasHeader ? "mt-10" : ""}>
          {items && items.length > 0 && (
            <ul className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              {items.map((item) => (
                <li key={item.href} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full dot-brand" />
                  <Link
                    href={item.href}
                    className="hover:text-brand transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <div className="mt-6">
              <motion.div
                className="inline-flex"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                <Link
                  href={cta.href}
                  className="inline-flex rounded-full btn-primary px-5 py-2.5 text-sm font-semibold shadow-sm"
                >
                  {cta.label}
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Layout when we have list/CTA *and* children (two-column layout)
  if (hasStructuredContent && children) {
    return (
      <section className={`container mx-auto px-5 py-16 ${className}`}>
        {header}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1.3fr] items-start">
          <div>
            {items && items.length > 0 && (
              <ul className="grid gap-3 text-sm text-slate-700">
                {items.map((item) => (
                  <li key={item.href} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full dot-brand" />
                    <Link
                      href={item.href}
                      className="hover:text-brand transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <div className="mt-6">
                <motion.div
                  className="inline-flex"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  <Link
                    href={cta.href}
                    className="inline-flex rounded-full btn-primary px-5 py-2.5 text-sm font-semibold shadow-sm"
                  >
                    {cta.label}
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <div>{children}</div>
        </div>
      </section>
    );
  }

  // Original simple layout: just header + children
  return (
    <section className={`container mx-auto px-5 py-16 ${className}`}>
      {header}
      <div className={hasHeader ? "mt-10" : ""}>{children}</div>
    </section>
  );
}
