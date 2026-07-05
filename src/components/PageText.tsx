import type { PageContent } from "@/types/content";
import RichText from "./RichText";

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
        <p key={index}>
          <RichText text={paragraph} />
        </p>
      ))}
      {content.footerCta && (
        <p className="rounded-sm border border-brand-light bg-brand-light/40 px-5 py-5 text-center font-medium text-neutral-800 md:px-6 md:py-6">
          <RichText text={content.footerCta} />
        </p>
      )}
    </div>
  );
}
