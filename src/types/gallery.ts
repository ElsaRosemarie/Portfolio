export interface GalleryImage {
  src: string;
  alt: string;
}

export interface ProjectCredit {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  categories: string[];
  section: string;
  cover: string;
  images: GalleryImage[];
  standalone: boolean;
  description?: string;
  credit?: ProjectCredit;
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
