// src/components/home/ConditionsTabs.tsx
"use client";

import { useState } from "react";
import Section from "@/components/home/Section";

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
  const activeArea = areas.find((a) => a.key === activeKey) ?? areas[0];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 lg:flex-row">
        {/* Left tab list */}
        <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-rose-500">
            Where does it hurt?
          </p>
          <nav className="flex flex-col gap-1">
            {areas.map((area) => {
              const isActive = area.key === activeKey;
              return (
                <button
                  key={area.key}
                  type="button"
                  onClick={() => setActiveKey(area.key)}
                  className={`w-full rounded-xl px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {area.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right content card */}
        <div className="flex-1">
          <Section
            eyebrow="Where does it hurt?"
            title={activeArea.title}
            description={activeArea.description}
            cta={{ label: activeArea.ctaLabel, href: activeArea.ctaHref }}
          />
        </div>
      </div>
    </section>
  );
}
