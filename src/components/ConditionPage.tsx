import Image from "next/image";
import { HERO_GRADIENT } from "@/lib/theme";

interface ConditionPageProps {
  title: string;
  description: string;
  heroImage: string;
  commonCauses: string[];
  symptoms: string[];
  treatment: string[];
}

export default function ConditionPage({
  title,
  description,
  heroImage,
  commonCauses,
  symptoms,
  treatment,
}: ConditionPageProps) {
  return (
    <main className="bg-white">
      {/* HERO TEXT */}
      <section className={`${HERO_GRADIENT} text-white`}>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-3">
            Where it hurts
          </p>
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          <p className="max-w-2xl text-white/90">{description}</p>
        </div>
      </section>

      {/* IMAGE */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 bg-white">
            <div className="relative h-[420px]">
              <Image
                src={heroImage}
                alt={title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="bg-white">
        <div className="bg-white">
          <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
            <div className="grid gap-10 md:grid-cols-3 rounded-3xl border border-neutral-100 bg-white shadow-lg px-8 py-10">
              <div>
                <h2 className="font-semibold mb-3">Common Causes</h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {commonCauses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold mb-3">Symptoms</h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold mb-3">How We Treat It</h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {treatment.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
