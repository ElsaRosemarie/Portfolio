import { content } from "@/lib/content";
import { InstagramIcon, LinkedInIcon } from "./SocialIcons";

export default function Footer() {
  const { instagram, linkedin } = content.links;

  return (
    <footer className="flex justify-center gap-8 px-6 py-12">
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-neutral-800 transition-colors hover:text-brand"
      >
        <InstagramIcon />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-neutral-800 transition-colors hover:text-brand"
      >
        <LinkedInIcon />
      </a>
    </footer>
  );
}
