import Image from "next/image";

export default function WorkshopsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-20 md:px-10">
      <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <Image
          src="/images/WORKSHOPS/hero.jpg"
          alt="Workshops"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
        <p>
          Elsa facilitates illustration and visual thinking workshops for
          communities, students, and organisations. Sessions are hands-on,
          playful, and grounded in collective making.
        </p>
        <p>
          Topics include storytelling through drawing, zine-making, visual
          research methods, and using illustration as a tool for dialogue.
          Workshops can be tailored to your group and context.
        </p>
        <p>
          For enquiries about availability and custom programmes, please get in
          touch via the contact page.
        </p>
      </div>
    </div>
  );
}
