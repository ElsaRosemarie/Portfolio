import Gallery from "@/components/Gallery";
import galleryData from "@/data/gallery.json";
import { content } from "@/lib/content";
import { buildPageMetadata, navTitle } from "@/lib/seo";
import type { GalleryData } from "@/types/gallery";

const data = galleryData as GalleryData;

export const metadata = buildPageMetadata({
  title: navTitle("/work"),
  path: "/work",
  description: content.siteDescription,
});

export default function WorkPage() {
  return <Gallery section={data.work} />;
}
