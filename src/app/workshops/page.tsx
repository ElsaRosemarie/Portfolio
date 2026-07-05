import Image from "next/image";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";

export default function WorkshopsPage() {
  const page = getPage("workshops");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 md:px-10">
      <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <Image
          src={asset("/images/WORKSHOPS/hero.jpg")}
          alt={page.heroAlt ?? "Workshops"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <PageText content={page} />
      </div>
    </div>
  );
}
