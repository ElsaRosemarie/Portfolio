import PageText from "@/components/PageText";
import { content, getPage } from "@/lib/content";

export default function ContactPage() {
  const page = getPage("contact");
  const { instagram, linkedin } = content.links;

  return (
    <div className="page-shell pb-16 md:pb-20">
      <PageText
        content={{
          ...page,
          paragraphs: [
            ...page.paragraphs,
            `[Instagram](${instagram})`,
            `[LinkedIn](${linkedin})`,
          ],
        }}
      />
    </div>
  );
}
