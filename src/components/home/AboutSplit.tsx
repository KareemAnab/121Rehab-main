import Link from "next/link";
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
        <img
          src={imageUrl}
          alt=""
          className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-md"
        />
        <div>
          <p className="text-gray-700 leading-relaxed">{description}</p>
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex mt-6 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
