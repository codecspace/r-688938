import { Panel, TextField, TextArea, StringList } from "@/components/admin/Fields";
import ImageField from "@/components/admin/ImageField";
import VideoField from "@/components/admin/VideoField";
import type { SiteContent } from "@/lib/siteContent";

interface Props {
  content: SiteContent;
  patch: (p: Partial<SiteContent>) => void;
}

const HomepagePanel = ({ content, patch }: Props) => {
  const { hero, about, stats, projectsSection, portfolioSection } = content;

  return (
    <div className="space-y-6">
      <Panel title="Hero" description="The first screen visitors see.">
        <TextField label="Small line above the headline" value={hero.eyebrow} onChange={(v) => patch({ hero: { ...hero, eyebrow: v } })} />
        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Headline — first line" value={hero.headlineLine1} onChange={(v) => patch({ hero: { ...hero, headlineLine1: v } })} />
          <TextField label="Headline — second line (italic gold)" value={hero.headlineLine2} onChange={(v) => patch({ hero: { ...hero, headlineLine2: v } })} />
        </div>
        <TextArea label="Intro paragraph" value={hero.intro} onChange={(v) => patch({ hero: { ...hero, intro: v } })} />
        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Main button text" value={hero.primaryCta} onChange={(v) => patch({ hero: { ...hero, primaryCta: v } })} />
          <TextField label="Second button text" value={hero.secondaryCta} onChange={(v) => patch({ hero: { ...hero, secondaryCta: v } })} />
        </div>
        <ImageField label="Background photo" value={hero.image} clearable={false} onChange={(url) => patch({ hero: { ...hero, image: url ?? hero.image } })} />
        <VideoField
          label="Background video (optional — replaces the photo; MP4/WebM/MOV up to 40 MB)"
          value={hero.video ?? ""}
          onChange={(url) => patch({ hero: { ...hero, video: url ?? "" } })}
        />
      </Panel>

      <Panel title="About the firm">
        <TextField label="Small line above the heading" value={about.eyebrow} onChange={(v) => patch({ about: { ...about, eyebrow: v } })} />
        <TextArea label="Heading" rows={2} value={about.heading} onChange={(v) => patch({ about: { ...about, heading: v } })} />
        <StringList label="Paragraphs" multiline items={about.paragraphs} onChange={(paragraphs) => patch({ about: { ...about, paragraphs } })} />
        <div>
          <span className="block text-[0.6rem] uppercase tracking-[0.25em] text-white/40 mb-2">Four values</span>
          <div className="space-y-3">
            {about.traits.map((t, i) => (
              <div key={i} className="grid md:grid-cols-[70px_1fr_2fr] gap-2">
                <TextField value={t.n} onChange={(v) => patch({ about: { ...about, traits: about.traits.map((x, j) => (j === i ? { ...x, n: v } : x)) } })} />
                <TextField value={t.label} onChange={(v) => patch({ about: { ...about, traits: about.traits.map((x, j) => (j === i ? { ...x, label: v } : x)) } })} />
                <TextField value={t.desc} onChange={(v) => patch({ about: { ...about, traits: about.traits.map((x, j) => (j === i ? { ...x, desc: v } : x)) } })} />
              </div>
            ))}
          </div>
        </div>
        <TextArea label="Closing paragraph" value={about.closing} onChange={(v) => patch({ about: { ...about, closing: v } })} />
        <ImageField label="Side photo" value={about.image} clearable={false} onChange={(url) => patch({ about: { ...about, image: url ?? about.image } })} />
      </Panel>

      <Panel title="Numbers strip">
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="grid md:grid-cols-[100px_80px_1fr] gap-2">
              <TextField value={String(s.value)} onChange={(v) => patch({ stats: stats.map((x, j) => (j === i ? { ...x, value: Number(v.replace(/\D/g, "")) || 0 } : x)) })} />
              <TextField value={s.suffix} onChange={(v) => patch({ stats: stats.map((x, j) => (j === i ? { ...x, suffix: v } : x)) })} />
              <TextField value={s.label} onChange={(v) => patch({ stats: stats.map((x, j) => (j === i ? { ...x, label: v } : x)) })} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Section headings" description="Titles above the two property sections.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Highlighted projects</p>
            <TextField label="Eyebrow" value={projectsSection.eyebrow} onChange={(v) => patch({ projectsSection: { ...projectsSection, eyebrow: v } })} />
            <TextField label="Heading" value={projectsSection.heading} onChange={(v) => patch({ projectsSection: { ...projectsSection, heading: v } })} />
            <TextArea label="Intro" rows={3} value={projectsSection.intro} onChange={(v) => patch({ projectsSection: { ...projectsSection, intro: v } })} />
          </div>
          <div className="space-y-4">
            <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Full portfolio grid</p>
            <TextField label="Eyebrow" value={portfolioSection.eyebrow} onChange={(v) => patch({ portfolioSection: { ...portfolioSection, eyebrow: v } })} />
            <TextField label="Heading" value={portfolioSection.heading} onChange={(v) => patch({ portfolioSection: { ...portfolioSection, heading: v } })} />
            <TextArea label="Intro" rows={3} value={portfolioSection.intro} onChange={(v) => patch({ portfolioSection: { ...portfolioSection, intro: v } })} />
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default HomepagePanel;
