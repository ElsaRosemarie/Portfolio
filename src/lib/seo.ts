import type { Metadata } from "next";
import { content } from "@/lib/content";
import { asset } from "@/lib/paths";

const DEFAULT_OG_IMAGE = "/og.jpg";
const DEFAULT_OG_ALT = "Elsa Rosemarie";

export function getSiteUrl(): string {
  const domain = content.customDomain?.trim();
  if (domain) {
    return `https://${domain.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }

  const basePath = content.basePath || "";
  return `https://elsarosemarie.github.io${basePath}`;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? asset(path) : asset(`/${path}`);
  return `${getSiteUrl()}${normalizedPath}`;
}

export function plainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function capitalizeLabel(label: string): string {
  if (!label) return label;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function navTitle(href: string): string | undefined {
  const label = content.navigation.find((item) => item.href === href)?.label;
  return label ? capitalizeLabel(label) : undefined;
}

export function buildPageMetadata({
  title,
  path,
  description,
  imagePath = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
}: {
  title?: string;
  path: string;
  description?: string;
  imagePath?: string;
  imageAlt?: string;
}): Metadata {
  const pageDescription = description ?? content.siteDescription;
  const pageTitle = title ?? content.siteName;
  const fullTitle =
    title && title !== content.siteName
      ? `${title} | ${content.siteName}`
      : content.siteName;
  const canonicalPath = path === "/" ? "/" : path;
  const pageUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl(imagePath);

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: asset(canonicalPath),
    },
    keywords: [
      "Elsa van Dam",
      "illustrator",
      "graphic designer",
      "anthropologist",
      "illustration",
      "visual identity",
      "publications",
      "Utrecht",
      "Netherlands",
    ],
    authors: [{ name: "Elsa van Dam", url: getSiteUrl() }],
    creator: "Elsa van Dam",
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: content.siteName,
      locale: "en_NL",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
          type: "image/jpeg",
          width: 1200,
          height: 1200,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildSiteJsonLd() {
  const { email, instagram, linkedin } = content.links;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        url: getSiteUrl(),
        name: content.siteName,
        description: content.siteDescription,
        inLanguage: "en-NL",
      },
      {
        "@type": "ProfilePage",
        "@id": `${getSiteUrl()}/#profile`,
        url: getSiteUrl(),
        name: content.siteName,
        description: content.siteDescription,
        mainEntity: {
          "@type": "Person",
          "@id": `${getSiteUrl()}/#person`,
          name: "Elsa van Dam",
          url: getSiteUrl(),
          email,
          jobTitle: ["Illustrator", "Graphic Designer", "Anthropologist"],
          homeLocation: {
            "@type": "Place",
            name: "Utrecht, Netherlands",
          },
          sameAs: [instagram, linkedin],
          image: absoluteUrl(DEFAULT_OG_IMAGE),
        },
      },
    ],
  };
}

export const siteRoutes = [
  "/",
  "/work",
  "/research",
  "/workshops",
  "/about",
  "/contact",
] as const;
