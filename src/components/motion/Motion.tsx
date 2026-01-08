"use client";

import Link from "next/link";
import { motion, type Transition } from "framer-motion";

// Typed easing (cubic-bezier). Avoids TS errors for string easings like "easeOut".
export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

/**
 * Motion speeds (tweak these in ONE place).
 * - enter: section/page entrances (subtle lift)
 * - hover: card hover lift
 * - press: buttons hover/tap micro-interactions
 */
export const enter: Transition = { duration: 1.6, ease: EASE_OUT };
export const hover: Transition = { duration: 0.45, ease: EASE_OUT };
export const press: Transition = { duration: 0.35, ease: EASE_OUT };
export const enterSmall: Transition = { duration: 0.35, ease: EASE_OUT };

// Keep content visible (opacity stays 1). Only a gentle lift-in.
export const liftIn = {
  initial: { y: 14, opacity: 1 },
  animate: { y: 0, opacity: 1 },
};

// Backwards compatibility: if pages still import `fast`, it will now use `enter`
export const fast: Transition = enter;

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionArticle = motion.article;

// Consistent CTA micro-interaction
export function MotionLinkButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="inline-flex"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={press}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
