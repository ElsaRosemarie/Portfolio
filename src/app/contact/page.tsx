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
      <div className="flex max-w-3xl gap-4 md:gap-6">
        <div className="relative w-8 shrink-0 self-stretch sm:w-9 md:w-10">
          <Image
            src={iconImage}
            alt=""
            fill
            className="object-contain object-left"
            sizes="40px"
            aria-hidden
          />
        </div>
        <PageText content={page} className="min-w-0 flex-1" />
      </div>
    </div>
  );
}
