import Image from "next/image";
import Link from "next/link";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";

export default function HomePage() {
  const page = getPage("home");

  return (
    <div className="page-shell">
      <section className="pb-14 pt-3 md:pb-20 md:pt-5">
        <Image
          src={asset("/images/HOME/hero.jpg")}
          alt={page.heroAlt ?? "Illustration by Elsa van Dam"}
          width={4651}
          height={2501}
          className="block h-auto w-full"
          priority
          sizes="(max-width: 768px) 100vw, 1152px"
        />
      </section>

      <section className="grid gap-10 pb-16 md:grid-cols-2 md:items-center md:gap-12">
        <div className="flex flex-col items-center justify-center text-center md:py-4">
          {page.greeting && (
            <p className="mb-5 text-2xl font-medium md:mb-6 md:text-3xl">
              {page.greeting}
            </p>
          )}
          <PageText content={page} />
          {page.cta && (
            <Link
              href={page.cta.href}
              className="mt-8 border-b border-brand-light md:mt-10"
            >
              {page.cta.label}
            </Link>
          )}
        </div>
        <div className="relative aspect-[3/4] w-full max-w-md justify-self-center md:justify-self-end">
          <Image
            src={asset("/images/HOME/portrait.jpg")}
            alt="Elsa van Dam"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 400px"
          />
        </div>
      </section>
    </div>
  );
}
