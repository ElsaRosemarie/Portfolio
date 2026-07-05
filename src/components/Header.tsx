"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { content } from "@/lib/content";
import { asset } from "@/lib/paths";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = content.navigation;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-light/60 bg-white/95 backdrop-blur-sm md:static md:border-none md:bg-transparent">
      <div className="page-shell py-3 md:py-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="relative block h-12 w-44 shrink-0 -ml-1 sm:h-14 sm:w-52 md:h-[9.1rem] md:w-[32.76rem] md:-ml-[2.91rem]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={asset("/images/HOME/Logo.png")}
              alt="Elsa van Dam"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 176px, 524px"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-neutral-800 transition-all duration-200 ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 bg-neutral-800 transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-neutral-800 transition-all duration-200 ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </span>
          </button>

          <nav className="hidden items-center justify-end gap-x-6 text-sm uppercase tracking-[0.2em] md:flex md:gap-x-8 md:text-base">
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

        <nav
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <ul className="flex flex-col border-t border-brand-light/60 py-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    tabIndex={menuOpen ? undefined : -1}
                    className={`block py-3 text-sm uppercase tracking-[0.15em] transition-colors ${
                      active
                        ? "text-brand"
                        : "text-neutral-800 hover:text-brand"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
