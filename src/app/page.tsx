import Image from "next/image";
import Link from "next/link";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";
import { buildPageMetadata, plainText } from "@/lib/seo";

const page = getPage("home");

export const metadata = buildPageMetadata({
  path: "/",
  description: plainText(page.paragraphs[0] ?? ""),
});

export default function HomePage() {

  return (
    <div className="page-shell">
      <section className="pb-14 md:pb-20">
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

      <section className="grid gap-10 pb-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex min-w-0 flex-col items-center justify-center text-center lg:py-4">
          {page.greeting && (
            <p className="mb-5 text-xl font-medium sm:text-2xl lg:mb-6 lg:text-3xl">
              {page.greeting}
            </p>
          )}
          <PageText content={page} className="max-w-prose" />
          {page.cta && (
            <Link
              href={page.cta.href}
              className="mt-8 cursor-pointer border-b border-brand-light lg:mt-10"
            >
              {page.cta.label}
            </Link>
          )}
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end">
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
