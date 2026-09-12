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
    <header className="sticky top-0 z-40 border-b border-brand-light/60 bg-white/95 backdrop-blur-sm lg:static lg:border-none lg:bg-transparent">
      <div className="page-shell py-3 lg:py-6">
        <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
          <Link
            href="/"
            className="relative -ml-5 block h-16 w-[14rem] shrink-0 cursor-pointer sm:-ml-5.5 sm:h-[4.5rem] sm:w-64 md:-ml-6 md:h-20 md:w-72 lg:-ml-6.5 lg:h-24 lg:w-[22rem] xl:-ml-7 xl:h-28 xl:w-[25rem] 2xl:h-32 2xl:w-[28rem]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={asset("/images/HOME/Logo.png")}
              alt="Elsa van Dam"
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 448px"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center lg:hidden"
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

          <nav className="hidden min-w-0 shrink items-center justify-end gap-x-4 text-[0.7rem] uppercase tracking-[0.14em] lg:flex xl:gap-x-5 xl:text-xs xl:tracking-[0.16em] 2xl:gap-x-6 2xl:text-sm 2xl:tracking-[0.18em]">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap cursor-pointer transition-colors ${
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
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out lg:hidden ${
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
                    className={`block py-3 text-xs uppercase tracking-[0.15em] transition-colors ${
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
