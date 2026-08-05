import { useState } from "react";
import { ArrowDown, ArrowUp, Trash2, ChevronDown, ChevronRight, Plus, Star } from "lucide-react";
import { Panel, TextField, TextArea, StringList, Toggle, AdminButton, FieldLabel } from "@/components/admin/Fields";
import ImageField, { uploadSiteImage } from "@/components/admin/ImageField";
import type { ProjectDataType, SiteContent } from "@/lib/siteContent";

interface Props {
  content: SiteContent;
  patch: (p: Partial<SiteContent>) => void;
}

const slugify = (v: string) =>
  v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const blank = (): ProjectDataType => ({
  id: `new-listing-${Date.now()}`,
  propertyName: "",
  developerName: "",
  location: "",
  image: "",
  description: "",
  images: [],
  amenities: [],
  specifications: {},
});

const PropertiesPanel = ({ content, patch }: Props) => {
  const projects = content.projects;
  const [openId, setOpenId] = useState<string | null>(null);

  const set = (next: ProjectDataType[]) => patch({ projects: next });
  const update = (i: number, changes: Partial<ProjectDataType>) =>
    set(projects.map((p, j) => (j === i ? { ...p, ...changes } : p)));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= projects.length) return;
    const next = [...projects];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };

  const addGalleryImages = async (i: number, files: FileList) => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadSiteImage(file);
      if (url) urls.push(url);
    }
    if (!urls.length) return;
    const project = projects[i];
    const gallery = [...(project.images ?? []), ...urls];
    update(i, { images: gallery, image: project.image || gallery[0], heroImage: project.heroImage || gallery[0] });
  };

  const specEntries = (p: ProjectDataType) => Object.entries(p.specifications ?? {}) as [string, string[]][];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-white/45 text-sm">
          {projects.length} listings. Order here is the order visitors see.
        </p>
        <AdminButton
          variant="gold"
          onClick={() => {
            const item = blank();
            set([item, ...projects]);
            setOpenId(item.id);
          }}
        >
          <Plus className="h-3.5 w-3.5" /> Add listing
        </AdminButton>
      </div>

      {projects.map((p, i) => {
        const open = openId === p.id;
        return (
          <div key={p.id} className="border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-4 p-4">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : p.id)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left"
              >
                {open ? <ChevronDown className="h-4 w-4 text-lion-gold shrink-0" /> : <ChevronRight className="h-4 w-4 text-white/35 shrink-0" />}
                <div className="h-11 w-16 shrink-0 border border-white/10 overflow-hidden bg-white/5">
                  {(p.heroImage || p.image) && <img src={p.heroImage || p.image} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">{p.propertyName || "Untitled listing"}</p>
                  <p className="text-white/35 text-xs truncate">{p.location || "No location yet"}</p>
                </div>
              </button>
              <div className="flex items-center gap-1 shrink-0">
                {p.isFeatured && <Star className="h-3.5 w-3.5 text-lion-gold" />}
                <button type="button" onClick={() => move(i, -1)} aria-label="Move up" className="p-2 text-white/35 hover:text-lion-gold transition-colors"><ArrowUp className="h-4 w-4" /></button>
                <button type="button" onClick={() => move(i, 1)} aria-label="Move down" className="p-2 text-white/35 hover:text-lion-gold transition-colors"><ArrowDown className="h-4 w-4" /></button>
              </div>
            </div>

            {open && (
              <div className="border-t border-white/10 p-5 md:p-7 space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <TextField label="Property name" value={p.propertyName} onChange={(v) => update(i, { propertyName: v, id: p.id.startsWith("new-listing-") ? slugify(v) || p.id : p.id })} />
                  <TextField label="Developer" value={p.developerName} onChange={(v) => update(i, { developerName: v })} />
                  <TextField label="Location (shown on cards)" value={p.location} onChange={(v) => update(i, { location: v })} />
                  <TextField label="Full address" value={p.fullAddress ?? ""} onChange={(v) => update(i, { fullAddress: v })} />
                </div>

                <TextArea label="Short description (cards + listing intro)" rows={3} value={p.description} onChange={(v) => update(i, { description: v })} />
                <TextArea label="Long description (listing page)" rows={6} value={p.longDescription ?? ""} onChange={(v) => update(i, { longDescription: v })} />

                <div className="flex flex-wrap gap-6 border-y border-white/10 py-4">
                  <Toggle label="Mark as new" checked={!!p.isNew} onChange={(v) => update(i, { isNew: v })} />
                  <Toggle label="Show in highlighted projects" checked={!!p.isFeatured} onChange={(v) => update(i, { isFeatured: v })} />
                </div>

                <div>
                  <FieldLabel>Photos — the first one is the cover</FieldLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {(p.images ?? []).map((src, k) => (
                      <div key={k} className="relative group border border-white/10">
                        <img src={src} alt="" className="h-28 w-full object-cover" />
                        {k === 0 && (
                          <span className="absolute top-1 left-1 bg-lion-obsidian/85 text-lion-lightgold text-[0.5rem] uppercase tracking-[0.2em] px-2 py-1">Cover</span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 flex justify-between bg-lion-obsidian/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            className="px-2 py-1 text-white/70 hover:text-lion-gold text-xs"
                            onClick={() => {
                              const gallery = [...(p.images ?? [])];
                              if (k === 0) return;
                              [gallery[k - 1], gallery[k]] = [gallery[k], gallery[k - 1]];
                              update(i, { images: gallery, image: gallery[0], heroImage: gallery[0] });
                            }}
                          >←</button>
                          <button
                            type="button"
                            className="px-2 py-1 text-white/70 hover:text-red-300 text-xs"
                            onClick={() => {
                              const gallery = (p.images ?? []).filter((_, j) => j !== k);
                              update(i, { images: gallery, image: gallery[0] ?? "", heroImage: gallery[0] ?? "" });
                            }}
                          >Delete</button>
                          <button
                            type="button"
                            className="px-2 py-1 text-white/70 hover:text-lion-gold text-xs"
                            onClick={() => {
                              const gallery = [...(p.images ?? [])];
                              if (k === gallery.length - 1) return;
                              [gallery[k + 1], gallery[k]] = [gallery[k], gallery[k + 1]];
                              update(i, { images: gallery, image: gallery[0], heroImage: gallery[0] });
                            }}
                          >→</button>
                        </div>
                      </div>
                    ))}

                    <label className="h-28 border border-dashed border-white/15 flex items-center justify-center cursor-pointer hover:border-lion-gold transition-colors text-white/40 text-[0.6rem] uppercase tracking-[0.2em]">
                      + Upload
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) addGalleryImages(i, e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>
                </div>

                <ImageField
                  label="Listing page banner (optional — defaults to the cover)"
                  value={p.heroImage ?? null}
                  onChange={(url) => update(i, { heroImage: url ?? undefined })}
                />

                <StringList label="Amenities" items={p.amenities ?? []} onChange={(amenities) => update(i, { amenities })} placeholder="Swimming Pool" />

                <div>
                  <FieldLabel>Specification groups</FieldLabel>
                  <div className="space-y-4">
                    {specEntries(p).map(([key, values], k) => (
                      <div key={k} className="border border-white/10 p-4 space-y-3">
                        <div className="flex gap-2">
                          <input
                            className="w-full bg-white/[0.04] border border-white/12 focus:border-lion-gold outline-none px-3 py-2 text-white text-sm"
                            value={key}
                            onChange={(e) => {
                              const entries = specEntries(p);
                              entries[k] = [e.target.value, values];
                              update(i, { specifications: Object.fromEntries(entries) });
                            }}
                          />
                          <button
                            type="button"
                            className="shrink-0 border border-white/10 px-3 text-white/40 hover:text-red-300 hover:border-red-400/50 text-xs"
                            onClick={() => update(i, { specifications: Object.fromEntries(specEntries(p).filter((_, j) => j !== k)) })}
                          >✕</button>
                        </div>
                        <StringList
                          label="Points"
                          items={Array.isArray(values) ? values : []}
                          onChange={(items) => {
                            const entries = specEntries(p);
                            entries[k] = [key, items];
                            update(i, { specifications: Object.fromEntries(entries) });
                          }}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-[0.62rem] uppercase tracking-[0.22em] text-lion-gold hover:text-lion-lightgold transition-colors"
                      onClick={() =>
                        update(i, { specifications: { ...(p.specifications ?? {}), [`group ${specEntries(p).length + 1}`]: [] } })
                      }
                    >
                      + Add group
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  <AdminButton
                    variant="danger"
                    onClick={() => {
                      if (confirm(`Delete "${p.propertyName || "this listing"}"? This cannot be undone.`)) {
                        set(projects.filter((_, j) => j !== i));
                        setOpenId(null);
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete listing
                  </AdminButton>
                  <span className="text-white/25 text-xs self-center">Web address: /project/{p.id}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PropertiesPanel;
