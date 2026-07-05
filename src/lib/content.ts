import siteContent from "@/data/content.json";
import type { PageContent, SiteContent } from "@/types/content";

export const content = siteContent as SiteContent;

export function getPage(name: string): PageContent {
  const page = content.pages[name];
  if (!page) {
    throw new Error(`Missing page content: ${name}`);
  }
  return page;
}
