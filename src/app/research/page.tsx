import Gallery from "@/components/Gallery";
import galleryData from "@/data/gallery.json";
import type { GalleryData } from "@/types/gallery";

const data = galleryData as GalleryData;

export default function ResearchPage() {
  return <Gallery section={data.research} />;
}
