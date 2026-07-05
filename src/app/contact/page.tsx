export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-20 sm:px-6 md:px-10">
      <div className="space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
        <p>
          For commissions, collaborations, or workshop requests, feel free to
          reach out.
        </p>
        <p>
          <a
            href="mailto:hello@elsavandam.nl"
            className="border-b border-brand-light transition-colors hover:border-brand hover:text-brand"
          >
            hello@elsavandam.nl
          </a>
        </p>
        <p>
          <a
            href="https://instagram.com/elsa.rosemarie"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-brand-light transition-colors hover:border-brand hover:text-brand"
          >
            Instagram
          </a>
        </p>
      </div>
    </div>
  );
}
