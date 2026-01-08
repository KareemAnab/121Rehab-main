// src/components/home/ConditionsTabs.tsx
"use client";

import { useMemo, useState } from "react";
import Section from "@/components/home/Section";
import { AnimatePresence, motion } from "framer-motion";
import { enter, enterSmall, press, hover } from "@/components/motion/Motion";

type AreaKey =
  | "knee"
  | "back"
  | "shoulder"
  | "hand"
  | "neck"
  | "ankle"
  | "tmj"
  | "hip";

interface AreaContent {
  key: AreaKey;
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const areas: AreaContent[] = [
  {
    key: "back",
    label: "BACK",
    title: "Back Pain",
    description:
      "Personalized treatment plans to reduce pain, improve posture, and restore function.",
    ctaLabel: "Back Pain Page",
    ctaHref: "/conditions/back-pain",
  },
  {
    key: "neck",
    label: "NECK",
    title: "Neck Pain",
    description:
      "Gentle, targeted treatment to relieve neck stiffness, headaches, and discomfort.",
    ctaLabel: "Neck Pain Page",
    ctaHref: "/conditions/neck-pain",
  },
  {
    key: "hand",
    label: "HAND",
    title: "Hand Pain",
    description:
      "Specialized care for hand and wrist rehab to restore grip strength, dexterity, and comfort in everyday activities.",
    ctaLabel: "Hand Pain Page",
    ctaHref: "/conditions/hand-pain",
  },
  {
    key: "shoulder",
    label: "SHOULDER",
    title: "Shoulder Pain",
    description:
      "Whether from overuse or injury, we help you restore reach, rotation, and strength.",
    ctaLabel: "Shoulder Pain Page",
    ctaHref: "/conditions/shoulder-pain",
  },
  {
    key: "knee",
    label: "KNEE",
    title: "Knee Pain",
    description:
      "From arthritis to sports injuries, regain stability, strength, and freedom of movement.",
    ctaLabel: "Knee Pain Page",
    ctaHref: "/conditions/knee-pain",
  },
  {
    key: "ankle",
    label: "ANKLE",
    title: "Ankle Pain",
    description:
      "Reduce pain and improve stability after sprains, overuse injuries, or ongoing irritation.",
    ctaLabel: "Ankle Pain Page",
    ctaHref: "/conditions/ankle-pain",
  },
  {
    key: "tmj",
    label: "TMJ",
    title: "TMJ Pain",
    description:
      "Targeted care for jaw pain, clicking, and tension that can contribute to headaches or neck tightness.",
    ctaLabel: "TMJ Page",
    ctaHref: "/conditions/tmj-pain",
  },
  {
    key: "hip",
    label: "HIP",
    title: "Hip Pain",
    description:
      "Improve mobility, strength, and comfort with a plan built around your movement goals.",
    ctaLabel: "Hip Pain Page",
    ctaHref: "/conditions/hip-pain",
  },
];

export default function ConditionsTabs() {
  const [activeKey, setActiveKey] = useState<AreaKey>("knee");

  const activeArea = useMemo(() => {
    return areas.find((a) => a.key === activeKey) ?? areas[0];
  }, [activeKey]);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 lg:flex-row">
        {/* Left tab list */}
        <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500 shadow-sm">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-brand">
            Where does it hurt?
          </p>

          <nav className="relative flex flex-col gap-1">
            {areas.map((area) => {
              const isActive = area.key === activeKey;

              return (
                <motion.button
                  key={area.key}
                  type="button"
                  onClick={() => setActiveKey(area.key)}
                  className={[
                    "relative w-full rounded-xl px-4 py-3 text-left",
                    "outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2",
                    // Only color transitions here (avoid snappy transform CSS)
                    "transition-colors",
                    isActive
                      ? "text-brand"
                      : "text-slate-800 hover:bg-neutral-50",
                  ].join(" ")}
                  whileHover={!isActive ? { y: -1 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  transition={press}
                >
                  {/* Active background that glides smoothly */}
                  {isActive && (
                    <motion.span
                      layoutId="conditionsTabsActive"
                      className="absolute inset-0 rounded-xl bg-[var(--brand-soft)]"
                      transition={hover}
                    />
                  )}

                  <span className="relative z-10">{area.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Right content card */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea.key}
              initial={{ y: 14, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 1 }}
              transition={enterSmall}
            >
              <Section
                eyebrow="Where does it hurt?"
                title={activeArea.title}
                description={activeArea.description}
                cta={{ label: activeArea.ctaLabel, href: activeArea.ctaHref }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
