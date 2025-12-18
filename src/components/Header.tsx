"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type NavLink = { href: string; label: string };

const primaryLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/insurance", label: "Insurance" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const conditionsLinks: NavLink[] = [
  { href: "/conditions/back-pain", label: "Back" },
  { href: "/conditions/neck-pain", label: "Neck" },
  { href: "/conditions/hand-pain", label: "Hand" },
  { href: "/conditions/shoulder-pain", label: "Shoulder" },
  { href: "/conditions/knee-pain", label: "Knee" },
  { href: "/conditions/ankle-pain", label: "Ankle" },
  { href: "/conditions/tmj-pain", label: "TMJ" },
  { href: "/conditions/hip-pain", label: "Hip" },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const conditionsActive = useMemo(
    () => pathname?.startsWith("/conditions"),
    [pathname]
  );

  // Close dropdown on route change (and close mobile menu too)
  useEffect(() => {
    setConditionsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Click outside + ESC to close dropdown
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!conditionsOpen) return;
      const target = e.target as Node | null;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setConditionsOpen(false);
      }
    }

    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setConditionsOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [conditionsOpen]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setConditionsOpen(false);
    }, 140);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="121 Rehab Home" className="shrink-0">
          <div className="relative h-8 w-[160px]">
            <Image
              src="/images/logo/logo.png"
              alt="121 Rehab"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="block h-0.5 w-6 bg-black mb-1" />
          <span className="block h-0.5 w-6 bg-black mb-1" />
          <span className="block h-0.5 w-6 bg-black" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Home + Services */}
          {primaryLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                isActive(link.href)
                  ? "text-red-600"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Conditions Dropdown (after Services) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => {
              clearCloseTimer();
              setConditionsOpen(true);
            }}
            onMouseLeave={() => {
              scheduleClose();
            }}
          >
            <button
              type="button"
              onClick={() => setConditionsOpen((v) => !v)}
              className={`text-sm font-medium flex items-center gap-1 ${
                conditionsActive
                  ? "text-red-600"
                  : "text-neutral-700 hover:text-black"
              }`}
              aria-haspopup="menu"
              aria-expanded={conditionsOpen}
            >
              Conditions <span className="text-xs">▼</span>
            </button>

            {conditionsOpen && (
              <div
                className="absolute left-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 z-50"
                role="menu"
              >
                {conditionsLinks.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    role="menuitem"
                    onClick={() => setConditionsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm ${
                      pathname === c.href
                        ? "bg-neutral-100 text-red-600"
                        : "text-neutral-800 hover:bg-neutral-100"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Remaining Links */}
          {primaryLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                isActive(link.href)
                  ? "text-red-600"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu (simple + consistent) */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-4 space-y-2">
            {primaryLinks.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block py-2 text-sm font-medium ${
                  isActive(l.href) ? "text-red-600" : "text-neutral-800"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setConditionsOpen((v) => !v)}
                className={`w-full flex items-center justify-between py-2 text-sm font-medium ${
                  conditionsActive ? "text-red-600" : "text-neutral-800"
                }`}
                aria-expanded={conditionsOpen}
              >
                <span>Conditions</span>
                <span className="text-xs">▼</span>
              </button>

              {conditionsOpen && (
                <div className="mt-2 rounded-xl border border-neutral-200 p-2">
                  {conditionsLinks.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => {
                        setConditionsOpen(false);
                        setMobileOpen(false);
                      }}
                      className={`block px-3 py-2 rounded-lg text-sm ${
                        pathname === c.href
                          ? "bg-neutral-100 text-red-600"
                          : "text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {primaryLinks.slice(2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block py-2 text-sm font-medium ${
                  isActive(l.href) ? "text-red-600" : "text-neutral-800"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
