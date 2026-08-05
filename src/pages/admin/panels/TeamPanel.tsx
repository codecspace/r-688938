import { Panel, TextField, TextArea, AdminButton } from "@/components/admin/Fields";
import ImageField from "@/components/admin/ImageField";
import type { SiteContent, TeamMember } from "@/lib/siteContent";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

interface Props {
  content: SiteContent;
  patch: (p: Partial<SiteContent>) => void;
}

const empty: TeamMember = { name: "", role: "", image: null, bio: "" };

const TeamPanel = ({ content, patch }: Props) => {
  const { team, teamSection } = content;
  const set = (next: TeamMember[]) => patch({ team: next });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= team.length) return;
    const next = [...team];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };

  return (
    <div className="space-y-6">
      <Panel title="Section heading">
        <TextField label="Eyebrow" value={teamSection.eyebrow} onChange={(v) => patch({ teamSection: { ...teamSection, eyebrow: v } })} />
        <TextField label="Heading" value={teamSection.heading} onChange={(v) => patch({ teamSection: { ...teamSection, heading: v } })} />
      </Panel>

      {team.map((m, i) => (
        <Panel key={i} title={m.name || "New member"} description={m.role}>
          <div className="grid md:grid-cols-2 gap-5">
            <TextField label="Name" value={m.name} onChange={(v) => set(team.map((x, j) => (j === i ? { ...x, name: v } : x)))} />
            <TextField label="Role" value={m.role} onChange={(v) => set(team.map((x, j) => (j === i ? { ...x, role: v } : x)))} />
            <TextField label="Phone (optional)" value={m.phoneNumber ?? ""} onChange={(v) => set(team.map((x, j) => (j === i ? { ...x, phoneNumber: v } : x)))} />
            <TextField label="Email (optional)" value={m.email ?? ""} onChange={(v) => set(team.map((x, j) => (j === i ? { ...x, email: v } : x)))} />
          </div>
          <TextArea label="Profile (blank line starts a new paragraph)" rows={8} value={m.bio} onChange={(v) => set(team.map((x, j) => (j === i ? { ...x, bio: v } : x)))} />
          <ImageField label="Photo — leave empty to show gold initials" value={m.image} onChange={(url) => set(team.map((x, j) => (j === i ? { ...x, image: url } : x)))} />
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            <AdminButton onClick={() => move(i, -1)}><ArrowUp className="h-3.5 w-3.5" /> Up</AdminButton>
            <AdminButton onClick={() => move(i, 1)}><ArrowDown className="h-3.5 w-3.5" /> Down</AdminButton>
            <AdminButton variant="danger" onClick={() => set(team.filter((_, j) => j !== i))}>
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </AdminButton>
          </div>
        </Panel>
      ))}

      <AdminButton variant="gold" onClick={() => set([...team, { ...empty }])}>+ Add team member</AdminButton>
    </div>
  );
};

export default TeamPanel;
