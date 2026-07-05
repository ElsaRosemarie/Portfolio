import type { PageContent } from "@/types/content";

interface PageTextProps {
  content: PageContent;
  className?: string;
}

export default function PageText({ content, className = "" }: PageTextProps) {
  return (
    <div
      className={`space-y-5 leading-relaxed text-neutral-700 md:space-y-6 ${className}`}
    >
      {content.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
