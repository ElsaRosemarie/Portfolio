export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  categories: string[];
  section: string;
  cover: string;
  images: GalleryImage[];
  description: string;
}

export interface GallerySection {
  projects: Project[];
  filters: string[];
}

export interface GalleryData {
  work: GallerySection;
  research: GallerySection;
  generatedAt: string;
}
