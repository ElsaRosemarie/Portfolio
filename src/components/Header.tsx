import Link from "next/link";

const links = [
  { href: "/work", label: "work" },
  { href: "/research", label: "research" },
  { href: "/workshops", label: "workshops" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 md:px-10">
      <Link href="/" className="block w-28 md:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/HOME/Logo.png"
          alt="Elsa van Dam"
          className="h-auto w-full"
        />
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs uppercase tracking-[0.2em] text-neutral-800 md:gap-x-8 md:text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-50"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
