import PageText from "@/components/PageText";
import { content, getPage } from "@/lib/content";

export default function ContactPage() {
  const page = getPage("contact");
  const { email, instagram } = content.links;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-20 sm:px-6 md:px-10">
      <div className="space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
        <PageText content={page} className="space-y-6" />
        {page.showEmail !== false && (
          <p>
            <a
              href={`mailto:${email}`}
              className="border-b border-brand-light transition-colors hover:border-brand hover:text-brand"
            >
              {email}
            </a>
          </p>
        )}
        {page.showInstagram !== false && (
          <p>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-brand-light transition-colors hover:border-brand hover:text-brand"
            >
              Instagram
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
