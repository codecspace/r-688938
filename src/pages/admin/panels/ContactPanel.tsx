import { Panel, TextField, TextArea } from "@/components/admin/Fields";
import type { SiteContent } from "@/lib/siteContent";

interface Props {
  content: SiteContent;
  patch: (p: Partial<SiteContent>) => void;
}

const ContactPanel = ({ content, patch }: Props) => {
  const { contact } = content;
  const set = (k: keyof SiteContent["contact"], v: string) => patch({ contact: { ...contact, [k]: v } });

  return (
    <div className="space-y-6">
      <Panel title="Contact section" description="Shown on the homepage contact block.">
        <TextField label="Eyebrow" value={contact.eyebrow} onChange={(v) => set("eyebrow", v)} />
        <TextField label="Heading" value={contact.heading} onChange={(v) => set("heading", v)} />
        <TextArea label="Intro" rows={3} value={contact.intro} onChange={(v) => set("intro", v)} />
      </Panel>

      <Panel title="Business details" description="Used across the contact block and the footer.">
        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Phone (as shown)" value={contact.phoneDisplay} onChange={(v) => set("phoneDisplay", v)} />
          <TextField label="Phone (dialled, no spaces)" value={contact.phoneTel} onChange={(v) => set("phoneTel", v)} />
          <TextField label="WhatsApp number (country code, digits only)" value={contact.whatsapp} onChange={(v) => set("whatsapp", v)} />
          <TextField label="Email" value={contact.email} onChange={(v) => set("email", v)} />
        </div>
        <TextArea label="Office address" rows={2} value={contact.address} onChange={(v) => set("address", v)} />
        <TextField label="Office hours" value={contact.officeHours} onChange={(v) => set("officeHours", v)} />
      </Panel>
    </div>
  );
};

export default ContactPanel;
