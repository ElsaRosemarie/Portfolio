import Image from "next/image";
import Link from "next/link";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";
import { buildPageMetadata, navTitle, plainText } from "@/lib/seo";

const page = getPage("workshops");

export const metadata = buildPageMetadata({
  title: navTitle("/workshops"),
  path: "/workshops",
  description: plainText(page.paragraphs[0] ?? ""),
  imagePath: "/images/WORKSHOPS/hero.jpg",
  imageAlt: page.heroAlt ?? "Workshops",
});

export default function WorkshopsPage() {

  return (
    <div className="page-shell pb-16 md:pb-20">
      <div className="relative mb-10 aspect-[4/3] w-full overflow-hidden bg-neutral-100 sm:mb-12 sm:aspect-[16/9]">
        <Image
          src={asset("/images/WORKSHOPS/hero.jpg")}
          alt={page.heroAlt ?? "Workshops"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      <div className="mx-auto min-w-0 max-w-2xl">
        <PageText content={page} />
      </div>
    </div>
  );
}
