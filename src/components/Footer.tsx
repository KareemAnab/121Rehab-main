import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand / blurb */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center">
              <Image
                src="/images/logo/logo.png"
                alt="121 Rehab Logo"
                width={140}
                height={40}
                priority
                className="h-auto w-auto"
              />
            </div>

            <p className="text-sm text-neutral-600">
              Evidence-based physical therapy for pain relief, mobility, and
              performance. Convenient scheduling and personalized care.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-neutral-900 text-neutral-700"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-neutral-900 text-neutral-700"
                  href="/services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-neutral-900 text-neutral-700"
                  href="/insurance"
                >
                  Insurance
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-neutral-900 text-neutral-700"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-neutral-900 text-neutral-700"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-neutral-900 text-neutral-700"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / hours */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700">
              Contact
            </h3>
            <ul className="text-sm text-neutral-700">
              {/* Address */}
              <li className="space-y-0.5">
                <span className="font-medium text-neutral-800">
                  Colton Clinic
                </span>
                <div>1405 W Valley Blvd #101</div>
                <div>Colton, CA 92324</div>
              </li>

              {/* Contact */}
              <li className="mt-3">
                Phone:{" "}
                <a className="hover:text-neutral-900" href="tel:+19097832204">
                  (909) 783-2204
                </a>
              </li>

              <li>
                Email:{" "}
                <a
                  className="hover:text-neutral-900"
                  href="mailto:pt121@yahoo.com"
                >
                  pt121@yahoo.com
                </a>
              </li>

              {/* Hours */}
              <li className="mt-4 font-medium text-neutral-800">
                Clinic Hours
              </li>

              <li className="mt-1">
                <span className="font-medium">Colton:</span> Mon–Fri 7:30 AM –
                1:00 PM
              </li>

              <li>
                <span className="font-medium">West Covina:</span> Mon–Fri 11:00
                AM – 6:00 PM
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.youtube.com/@121rehabpt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-md p-2 hover:bg-neutral-100"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-neutral-700">
                  <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.7 2.5 12 2.5 12 2.5h-.1s-4.7 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 7.9.3 7.9.3s4.7 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V8.4l6.1 3.1-6.1 3.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 text-sm text-neutral-600 md:flex-row">
          <p>© {year} 121 Rehab. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="hover:text-neutral-900" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-neutral-900" href="/terms-of-service">
              Terms of Service
            </Link>

            <a className="hover:text-neutral-900" href="#top">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
