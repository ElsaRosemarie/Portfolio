import Image from "next/image";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";

export default function HomePage() {
  const page = getPage("home");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <section className="pb-16 pt-4 md:pb-24 md:pt-6">
        <Image
          src={asset("/images/HOME/hero.jpg")}
          alt={page.heroAlt ?? "Illustration by Elsa van Dam"}
          width={4651}
          height={2501}
          className="block h-auto w-full"
          priority
          sizes="(max-width: 768px) 100vw, 1440px"
        />
      </section>

      <section className="grid gap-12 pb-20 md:grid-cols-2 md:gap-16">
        <PageText content={page} />
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
