import type { MetadataRoute } from "next";
import { absoluteUrl, siteRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "monthly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
