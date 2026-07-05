"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/work", label: "work" },
  { href: "/research", label: "research" },
  { href: "/workshops", label: "workshops" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:px-10 md:py-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="relative block h-10 w-36 shrink-0 sm:h-11 sm:w-40 md:h-12 md:w-48">
          <Image
            src="/images/HOME/Logo.png"
            alt="Elsa van Dam"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 144px, 192px"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-neutral-800 transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-neutral-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-neutral-800 transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>

        <nav className="hidden items-center justify-end gap-x-6 text-xs uppercase tracking-[0.2em] md:flex md:gap-x-8 md:text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active
                    ? "text-brand"
                    : "text-neutral-800 hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen && (
        <nav className="mt-4 flex flex-col gap-3 border-t border-brand-light pt-4 text-sm uppercase tracking-[0.15em] md:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-1 transition-colors ${
                  active
                    ? "font-medium text-brand"
                    : "text-neutral-800 hover:text-brand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
