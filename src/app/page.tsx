import Image from "next/image";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
      <section className="pb-16 pt-4 md:pb-24 md:pt-6">
        <Image
          src="/images/HOME/hero.jpg"
          alt="Illustration by Elsa van Dam"
          width={4651}
          height={2501}
          className="block h-auto w-full"
          priority
          sizes="(max-width: 768px) 100vw, 1440px"
        />
      </section>

      <section className="grid gap-12 pb-20 md:grid-cols-2 md:gap-16">
        <div className="space-y-5 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            Elsa van Dam is an illustrator and visual researcher based in the
            Netherlands. Her work moves between editorial illustration,
            participatory design, and narrative image-making.
          </p>
          <p>
            With a background in design research, she creates images that help
            people see complex stories more clearly — from zines and reports to
            workshops and visual tools.
          </p>
          <p>
            This portfolio brings together selected work, ongoing research, and
            creative collaborations. Welcome.
          </p>
        </div>
        <div className="relative aspect-[3/4] w-full max-w-md justify-self-center md:justify-self-end">
          <Image
            src="/images/HOME/portrait.jpg"
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
