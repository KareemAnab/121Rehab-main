import Link from "next/link";

export default function YouTubeBanner() {
  return (
    <section className="mb-10 rounded-2xl border border-neutral-200 bg-gradient-to-r from-red-500 via-red-400 to-pink-400 px-6 py-6 text-white shadow-md">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-90">
            Video Education
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Explore our physical therapy video library
          </h2>
          <p className="mt-2 max-w-xl text-sm md:text-base opacity-95">
            Watch guided exercises, mobility tips, and explanations from our
            clinicians to support your recovery between sessions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* YouTube icon + channel button */}
          <Link
            href="https://youtube.com" // 🔁 replace with real channel URL
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-neutral-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-red-600"
              aria-hidden="true"
            >
              <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.7 2.5 12 2.5 12 2.5h-.1s-4.7 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 7.9.3 7.9.3s4.7 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V8.4l6.1 3.1-6.1 3.1z" />
            </svg>
            <span>Visit our YouTube channel</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
