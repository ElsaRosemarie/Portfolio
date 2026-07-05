import Image from "next/image";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";

export default function AboutPage() {
  const page = getPage("about");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 md:px-10">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <PageText content={page} />
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={asset("/images/ABOUT/portrait.jpg")}
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
