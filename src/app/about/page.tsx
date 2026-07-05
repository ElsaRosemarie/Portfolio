import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 md:px-10">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
          <p>
            Elsa van Dam is an illustrator with a love for hand-drawn lines,
            soft colour palettes, and stories rooted in everyday life. She works
            across editorial, cultural, and social projects.
          </p>
          <p>
            Her practice is informed by design research: listening carefully,
            making together, and translating complex ideas into accessible
            visual language. She believes illustration can open conversations
            and make space for new perspectives.
          </p>
          <p>
            When she is not drawing, you will find her walking, reading, or
            collecting small observations that later find their way back into
            her sketchbooks.
          </p>
        </div>
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/images/ABOUT/portrait.jpg"
            alt="Elsa van Dam"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
