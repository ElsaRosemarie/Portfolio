import Image from "next/image";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { asset } from "@/lib/paths";
import { buildPageMetadata, navTitle, plainText } from "@/lib/seo";

const page = getPage("about");

export const metadata = buildPageMetadata({
  title: navTitle("/about"),
  path: "/about",
  description: plainText(page.paragraphs[0] ?? ""),
  imagePath: "/images/ABOUT/portrait.jpg",
  imageAlt: "Elsa van Dam",
});

export default function AboutPage() {

  return (
    <div className="page-shell pb-16 md:pb-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <PageText content={page} className="min-w-0" />
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md lg:mx-0 lg:max-w-none">
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
