import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "ami.resources.v1";

type ResourceKind = "video" | "article" | "one-pager" | "deck" | "podcast";

interface Resource {
  id: string;
  kind: ResourceKind;
  title: string;
  author: string;
  description: string;
  url?: string;
  fileName?: string;
  fileType?: string;
  // Stored as data URL for small files (< 4 MB) so the demo persists
  dataUrl?: string;
  thumbnail?: string;
  size?: number;
  createdAt: number;
}

const KIND_META: Record<ResourceKind, { label: string; icon: string; tint: string; }> = {
  video:       { label: "Video",      icon: "▶",  tint: "#c25a6a" },
  article:     { label: "Article",    icon: "✎",  tint: "#0e6b6b" },
  "one-pager": { label: "One-pager",  icon: "📄", tint: "#d96b3a" },
  deck:        { label: "Deck",       icon: "▦",  tint: "#7b3f9c" },
  podcast:     { label: "Podcast",    icon: "🎙", tint: "#1f6f8b" },
};

const SEED: Resource[] = [
  {
    id: "r-1",
    kind: "podcast",
    title: "Positive Turbulence — the AMI podcast",
    author: "Karyn Zuidinga & guests",
    description:
      "Conversations with AMI members on the periphery of innovation, ethics, and change. New episodes monthly.",
    url: "https://aminnovation.org/positive-turbulence",
    thumbnail: "/ami/Joe-Gammal-fullsizeoutput_834b.jpg",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: "r-2",
    kind: "one-pager",
    title: "Becoming Students Again — Boston 2026",
    author: "Spencer Karns & Reece Gardner",
    description:
      "The host letter and theme framing for Boston: why we're approaching this AI moment as students, not experts.",
    thumbnail: "/ami/boston-ai-hero.jpg",
    createdAt: Date.now() - 1000 * 60 * 60 * 60,
  },
  {
    id: "r-3",
    kind: "deck",
    title: "Positive Turbulence — Smart Cities track",
    author: "Nigel Jacob, City of Boston",
    description:
      "Slides and notes from Nigel's keynote on AI inside the public sector — what 'smart' really means at the neighborhood scale.",
    thumbnail: "/ami/pdf-070.jpg",
    createdAt: Date.now() - 1000 * 60 * 60 * 70,
  },
  {
    id: "r-4",
    kind: "article",
    title: "Field notes from the Beg-Brag-What-If",
    author: "Camille Newsom",
    description:
      "What got built after the Beg-Brag-What-If rounds — a write-up of the asks that turned into action.",
    thumbnail: "/ami/DSC_0916-1024x683.jpg",
    createdAt: Date.now() - 1000 * 60 * 60 * 80,
  },
];

function load(): Resource[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw) as Resource[];
    return Array.isArray(parsed) && parsed.length ? parsed : SEED;
  } catch {
    return SEED;
  }
}

function save(items: Resource[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota */
  }
}

function fmtSize(b?: number) {
  if (!b) return "";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

function timeAgo(ts: number) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

export default function Resources() {
  const [items, setItems] = useState<Resource[]>(() => load());
  const [filter, setFilter] = useState<"all" | ResourceKind>("all");
  const [open, setOpen] = useState(false);

  useEffect(() => save(items), [items]);

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt);
    return filter === "all" ? sorted : sorted.filter((r) => r.kind === filter);
  }, [items, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of items) c[r.kind] = (c[r.kind] || 0) + 1;
    return c;
  }, [items]);

  function addResource(r: Omit<Resource, "id" | "createdAt">) {
    setItems((prev) => [{ ...r, id: `r-${Math.random().toString(36).slice(2, 9)}`, createdAt: Date.now() }, ...prev]);
    setOpen(false);
  }

  function remove(id: string) {
    if (!confirm("Remove this resource?")) return;
    setItems((prev) => prev.filter((r) => r.id !== id));
  }

  function reset() {
    if (!confirm("Reset resources to the demo seed?")) return;
    setItems(SEED);
  }

  return (
    <section id="resources" className="section resources">
      <div className="resources__head">
        <span className="kicker">Resources</span>
        <h2>
          The community library.
        </h2>
        <p className="lead">
          Slide decks, one-pagers, articles, recordings — everything members
          have shared with the community, indexed and easy to find. Add your
          own to send it to the group.
        </p>
      </div>

      <div className="resources__controls">
        <div className="resources__filters" role="tablist" aria-label="Filter resources">
          <button
            role="tab"
            aria-selected={filter === "all"}
            className={filter === "all" ? "is-active" : ""}
            onClick={() => setFilter("all")}
          >
            All <span>{items.length}</span>
          </button>
          {(Object.keys(KIND_META) as ResourceKind[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={filter === k}
              className={filter === k ? "is-active" : ""}
              onClick={() => setFilter(k)}
            >
              {KIND_META[k].label} <span>{counts[k] || 0}</span>
            </button>
          ))}
        </div>
        <div className="resources__actions">
          <button className="link" onClick={reset}>Reset demo</button>
          <button className="btn btn--primary" onClick={() => setOpen(true)}>
            <span aria-hidden>＋</span> Share a resource
          </button>
        </div>
      </div>

      <div className="resources__grid">
        {filtered.map((r) => (
          <ResourceCard key={r.id} resource={r} onRemove={() => remove(r.id)} />
        ))}
        {filtered.length === 0 && (
          <p className="resources__empty">Nothing here yet — be the first to share something.</p>
        )}
      </div>

      {open && <ResourceUploader onClose={() => setOpen(false)} onSubmit={addResource} />}
    </section>
  );
}

function ResourceCard({ resource, onRemove }: { resource: Resource; onRemove: () => void }) {
  const meta = KIND_META[resource.kind];
  const href = resource.dataUrl || resource.url;
  return (
    <article className="resource">
      <div className="resource__thumb" style={{ background: resource.thumbnail ? undefined : meta.tint }}>
        {resource.thumbnail ? (
          <img src={resource.thumbnail} alt="" loading="lazy" />
        ) : (
          <span className="resource__icon" style={{ color: "white" }}>{meta.icon}</span>
        )}
        <span className="resource__badge" style={{ background: meta.tint }}>
          {meta.icon} {meta.label}
        </span>
      </div>
      <div className="resource__body">
        <h3>{resource.title}</h3>
        <p className="resource__author">by {resource.author}</p>
        <p className="resource__desc">{resource.description}</p>
        <div className="resource__foot">
          {href ? (
            <a className="resource__link" href={href} target="_blank" rel="noreferrer" download={resource.fileName}>
              {resource.fileName ? `Open ${resource.fileName}` : "Open →"}
            </a>
          ) : (
            <span className="resource__meta">No link · contact author</span>
          )}
          <span className="resource__time">
            {fmtSize(resource.size)} · {timeAgo(resource.createdAt)}
          </span>
        </div>
        <button className="resource__remove" onClick={onRemove} aria-label="Remove resource">×</button>
      </div>
    </article>
  );
}

function ResourceUploader({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (r: Omit<Resource, "id" | "createdAt">) => void;
}) {
  const [kind, setKind] = useState<ResourceKind>("article");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function readAsDataUrl(f: File): Promise<string> {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(f);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Title and author are required.");
      return;
    }
    setError(null);
    let dataUrl: string | undefined;
    let fileName: string | undefined;
    let fileType: string | undefined;
    let size: number | undefined;
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("File too big for the demo (4 MB cap). Add a URL instead.");
        return;
      }
      dataUrl = await readAsDataUrl(file);
      fileName = file.name;
      fileType = file.type;
      size = file.size;
    }
    onSubmit({
      kind,
      title: title.trim(),
      author: author.trim(),
      description: description.trim(),
      url: url.trim() || undefined,
      fileName,
      fileType,
      dataUrl,
      size,
    });
  }

  function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    setFile(files[0]);
    // Auto-detect kind
    const t = files[0].type;
    if (t.startsWith("video/")) setKind("video");
    else if (t.includes("pdf")) setKind("one-pager");
    else if (t.includes("audio")) setKind("podcast");
    else if (t.includes("presentation")) setKind("deck");
  }

  return (
    <div className="modal" onClick={onClose}>
      <form className="modal__card uploader" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <header>
          <h3>Share a resource</h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div
          className={`dropzone ${dragOver ? "is-over" : ""} ${file ? "has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*,application/pdf,.ppt,.pptx,.key,audio/*,image/*,text/*"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          {file ? (
            <>
              <strong>{file.name}</strong>
              <span>{fmtSize(file.size)} · {file.type || "file"}</span>
              <button type="button" className="link" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                Remove
              </button>
            </>
          ) : (
            <>
              <span className="dropzone__icon">⤓</span>
              <strong>Drop a file or click to browse</strong>
              <span>video, PDF, deck, image — up to 4 MB</span>
            </>
          )}
        </div>

        <label className="field">
          <span>Kind</span>
          <div className="resources__filters resources__filters--inline">
            {(Object.keys(KIND_META) as ResourceKind[]).map((k) => (
              <button
                key={k}
                type="button"
                className={kind === k ? "is-active" : ""}
                onClick={() => setKind(k)}
              >
                {KIND_META[k].label}
              </button>
            ))}
          </div>
        </label>

        <label className="field">
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Positive Turbulence — Smart Cities track" required />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Author / source</span>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name or who created it" required />
          </label>
          <label className="field">
            <span>Link (optional)</span>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
          </label>
        </div>

        <label className="field">
          <span>What is it?</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="A sentence or two so members know whether to open it."
          />
        </label>

        {error && <p className="error">{error}</p>}

        <footer>
          <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">Share with the community</button>
        </footer>
      </form>
    </div>
  );
}
