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
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 md:px-10 md:py-8">
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
            className="flex shrink-0 items-center gap-2 rounded border border-neutral-300 px-3 py-2 text-sm font-medium uppercase tracking-[0.15em] text-neutral-800 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="flex flex-col gap-1" aria-hidden>
              <span
                className={`block h-px w-4 bg-neutral-800 transition-transform ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-neutral-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-neutral-800 transition-transform ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
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

        {menuOpen && (
          <nav className="mt-3 border-t border-brand-light pt-3 md:hidden">
            <ul className="grid grid-cols-2 gap-2">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded px-3 py-3 text-center text-sm uppercase tracking-[0.12em] transition-colors ${
                        active
                          ? "bg-brand-light font-medium text-brand"
                          : "text-neutral-800 hover:bg-brand-light/60 hover:text-brand"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
