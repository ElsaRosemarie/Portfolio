import type { PageContent } from "@/types/content";

interface PageTextProps {
  content: PageContent;
  className?: string;
}

export default function PageText({ content, className = "" }: PageTextProps) {
  return (
    <div
      className={`space-y-5 text-sm leading-relaxed text-neutral-700 md:space-y-6 md:text-base ${className}`}
    >
      {content.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
