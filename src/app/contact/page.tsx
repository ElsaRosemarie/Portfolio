import Image from "next/image";
import PageText from "@/components/PageText";
import { getPage } from "@/lib/content";
import { buildPageMetadata, navTitle, plainText } from "@/lib/seo";
import iconImage from "@/app/icon.png";

const page = getPage("contact");

export const metadata = buildPageMetadata({
  title: navTitle("/contact"),
  path: "/contact",
  description: plainText(page.paragraphs[0] ?? ""),
});

export default function ContactPage() {
  return (
    <div className="page-shell pb-16 md:pb-20">
      <div className="flex items-stretch gap-6 md:gap-10">
        <PageText content={page} className="min-w-0 flex-1" />
        <div className="relative h-20 w-20 shrink-0 self-center sm:h-24 sm:w-24 md:h-28 md:w-28">
          <Image
            src={iconImage}
            alt=""
            fill
            className="object-contain"
            sizes="96px"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
