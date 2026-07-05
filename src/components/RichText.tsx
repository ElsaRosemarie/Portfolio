import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const TOKEN_PATTERN =
  /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;

const linkClassName = "border-b border-brand-light";

function renderLink(label: string, href: string, key: number): ReactNode {
  if (href.startsWith("/")) {
    return (
      <Link key={key} href={href} className={linkClassName}>
        {label}
      </Link>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a key={key} href={href} className={linkClassName}>
        {label}
      </a>
    );
  }

  return (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {label}
    </a>
  );
}

function parseTokens(text: string, keyPrefix = ""): ReactNode[] {
  const parts = text.split(TOKEN_PATTERN).filter((part) => part.length > 0);

  return parts.map((part, index) => {
    const key = `${keyPrefix}${index}`;

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return renderLink(linkMatch[1], linkMatch[2], index);
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key}>{parseTokens(part.slice(2, -2), `${key}-`)}</strong>
      );
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{parseTokens(part.slice(1, -1), `${key}-`)}</em>;
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function renderRichText(text: string): ReactNode {
  if (!text.match(/[*[]/)) {
    return text;
  }

  return <Fragment>{parseTokens(text)}</Fragment>;
}

interface RichTextProps {
  text: string;
  className?: string;
  as?: "p" | "span";
}

export default function RichText({
  text,
  className = "",
  as: Tag = "span",
}: RichTextProps) {
  return <Tag className={className}>{renderRichText(text)}</Tag>;
}
