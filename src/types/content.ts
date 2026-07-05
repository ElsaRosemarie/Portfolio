export interface NavLink {
  href: string;
  label: string;
}

export interface SiteLinks {
  email: string;
  instagram: string;
}

export interface PageContent {
  paragraphs: string[];
  heroAlt?: string;
  showEmail?: boolean;
  showInstagram?: boolean;
  cta?: {
    label: string;
    href: string;
  };
}

export interface SiteContent {
  siteName: string;
  siteDescription: string;
  basePath: string;
  customDomain: string;
  links: SiteLinks;
  navigation: NavLink[];
  pages: Record<string, PageContent>;
  generatedAt: string;
}
