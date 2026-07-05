export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-20 md:px-10">
      <div className="space-y-6 text-sm leading-relaxed text-neutral-700 md:text-base">
        <p>
          For commissions, collaborations, or workshop requests, feel free to
          reach out.
        </p>
        <p>
          <a
            href="mailto:hello@elsavandam.nl"
            className="border-b border-neutral-400 transition-colors hover:border-neutral-900"
          >
            hello@elsavandam.nl
          </a>
        </p>
        <p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-neutral-400 transition-colors hover:border-neutral-900"
          >
            Instagram
          </a>
        </p>
      </div>
    </div>
  );
}
