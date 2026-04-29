import { useEffect, useMemo, useState } from "react";
import type { NoteKind, StickyNote } from "../types";
import { seedNotes } from "../seedNotes";

const STORAGE_KEY = "ami.market.notes.v3";

// ── Unified palette by kind ─────────────────────────────────────
// Offers = warm yellow/amber (sunny, generous)
// Needs  = cool teal-blue (hopeful, asking)
// Each kind has 4 dynamic variants for visual rhythm without breaking the signal.
const OFFER_PALETTE = [
  { top: "#FFF1A8", bottom: "#FFCE52", accent: "#7a4a00" },
  { top: "#FFE99A", bottom: "#F4B83C", accent: "#7a4a00" },
  { top: "#FFE6B3", bottom: "#F0A85A", accent: "#7a3a00" },
  { top: "#FFEAB0", bottom: "#E59A40", accent: "#7a3a00" },
];

const NEED_PALETTE = [
  { top: "#C7E8FF", bottom: "#6FAEDB", accent: "#08344e" },
  { top: "#B8E0F2", bottom: "#5A9CC4", accent: "#08344e" },
  { top: "#CDE8E8", bottom: "#74B7B7", accent: "#053838" },
  { top: "#BDDDD9", bottom: "#5FA9A4", accent: "#053838" },
];

const PIN_FOR_KIND: Record<NoteKind, string> = {
  offer: "#c45a2a",  // ember pin on yellow
  need:  "#0e6b6b",  // teal pin on blue
};

function loadNotes(): StickyNote[] {
  if (typeof window === "undefined") return seedNotes;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedNotes;
    const parsed = JSON.parse(raw) as StickyNote[];
    return Array.isArray(parsed) && parsed.length ? parsed : seedNotes;
  } catch {
    return seedNotes;
  }
}

function saveNotes(notes: StickyNote[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch { /* quota */ }
}

const randId = () => `n-${Math.random().toString(36).slice(2, 9)}`;

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

function paletteFor(kind: NoteKind, id: string) {
  const palette = kind === "offer" ? OFFER_PALETTE : NEED_PALETTE;
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return palette[Math.abs(h) % palette.length];
}

type Filter = "all" | NoteKind;

export default function Market() {
  const [notes, setNotes] = useState<StickyNote[]>(() => loadNotes());
  const [filter, setFilter] = useState<Filter>("all");
  const [composerOpen, setComposerOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => { saveNotes(notes); }, [notes]);

  const visible = useMemo(() => {
    const sorted = [...notes].sort((a, b) => b.createdAt - a.createdAt);
    if (filter === "all") return sorted;
    return sorted.filter((n) => n.kind === filter);
  }, [notes, filter]);

  const stats = useMemo(() => {
    const offers = notes.filter((n) => n.kind === "offer").length;
    const needs = notes.filter((n) => n.kind === "need").length;
    const replies = notes.reduce((acc, n) => acc + n.replies.length, 0);
    return { offers, needs, replies };
  }, [notes]);

  const active = activeId ? notes.find((n) => n.id === activeId) ?? null : null;

  function addNote(input: Omit<StickyNote, "id" | "createdAt" | "replies" | "rotation" | "color">) {
    const note: StickyNote = {
      ...input,
      id: randId(),
      createdAt: Date.now(),
      replies: [],
      rotation: Math.random() * 5 - 2.5,
      color: "",
    };
    setNotes((prev) => [note, ...prev]);
    setComposerOpen(false);
  }

  function addReply(noteId: string, author: string, body: string) {
    setNotes((prev) => prev.map((n) => n.id === noteId
      ? { ...n, replies: [...n.replies, { id: `r-${Math.random().toString(36).slice(2,9)}`, author, body, createdAt: Date.now() }] }
      : n));
  }

  function resetBoard() {
    if (!confirm("Reset the Offers & Needs board to the demo seed?")) return;
    setNotes(seedNotes);
  }

  return (
    <section className="market">
      <div className="market__statbar">
        <div className="market__statTile market__statTile--offers">
          <span className="market__statKind">Offers</span>
          <span className="market__statNum">{stats.offers}</span>
        </div>
        <div className="market__statTile market__statTile--needs">
          <span className="market__statKind">Needs</span>
          <span className="market__statNum">{stats.needs}</span>
        </div>
        <div className="market__statTile market__statTile--replies">
          <span className="market__statKind">Replies</span>
          <span className="market__statNum">{stats.replies}</span>
        </div>
      </div>

      <div className="market__controls">
        <div className="market__filters" role="tablist" aria-label="Filter notes">
          <button role="tab" aria-selected={filter === "all"} className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>
            All <span>{notes.length}</span>
          </button>
          <button role="tab" aria-selected={filter === "offer"} className={`market__filterOffer ${filter === "offer" ? "is-active" : ""}`} onClick={() => setFilter("offer")}>
            <span className="dot dot--offer" /> Offers <span>{stats.offers}</span>
          </button>
          <button role="tab" aria-selected={filter === "need"} className={`market__filterNeed ${filter === "need" ? "is-active" : ""}`} onClick={() => setFilter("need")}>
            <span className="dot dot--need" /> Needs <span>{stats.needs}</span>
          </button>
        </div>
        <div className="market__actions">
          <button className="link" onClick={resetBoard}>Reset demo</button>
          <button className="btn btn--primary" onClick={() => setComposerOpen(true)}>
            <span aria-hidden>＋</span> Add a note
          </button>
        </div>
      </div>

      <div className="bulletin">
        <div className="bulletin__frame">
          <div className="bulletin__cork">
            <div className="bulletin__grid">
              {visible.map((n) => (
                <StickyCard key={n.id} note={n} onClick={() => setActiveId(n.id)} />
              ))}
              {visible.length === 0 && (
                <div className="bulletin__empty">Nothing pinned here yet — be the first to add a note.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {composerOpen && <Composer onClose={() => setComposerOpen(false)} onSubmit={addNote} />}
      {active && <NoteDetail note={active} onClose={() => setActiveId(null)} onReply={(a, b) => addReply(active.id, a, b)} />}
    </section>
  );
}

function StickyCard({ note, onClick }: { note: StickyNote; onClick: () => void }) {
  const palette = paletteFor(note.kind, note.id);
  const pinColor = PIN_FOR_KIND[note.kind];
  const style = {
    background: `linear-gradient(160deg, ${palette.top} 0%, ${palette.bottom} 100%)`,
    transform: `rotate(${note.rotation}deg)`,
    color: palette.accent,
  } as React.CSSProperties;
  return (
    <button className={`sticky sticky--${note.kind}`} style={style} onClick={onClick}>
      <span className="sticky__pin" style={{ background: pinColor, boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.4)` }} aria-hidden />
      <span className={`sticky__kind sticky__kind--${note.kind}`}>
        {note.kind === "offer" ? "I can offer" : "I need"}
      </span>
      <p className="sticky__body">{note.body}</p>
      <div className="sticky__tags">
        {note.tags.slice(0, 3).map((t) => <span key={t}>#{t}</span>)}
      </div>
      <div className="sticky__foot">
        <span className="sticky__author">{note.author}</span>
        {note.role && <span className="sticky__role">{note.role}</span>}
        <span className="sticky__replies">
          {note.replies.length > 0 ? `↩ ${note.replies.length}` : "↩ reply"}
        </span>
      </div>
    </button>
  );
}

function Composer({
  onClose, onSubmit,
}: {
  onClose: () => void;
  onSubmit: (n: Omit<StickyNote, "id" | "createdAt" | "replies" | "rotation" | "color">) => void;
}) {
  const [kind, setKind] = useState<NoteKind>("need");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;
    onSubmit({
      kind,
      author: author.trim(),
      role: role.trim() || undefined,
      body: body.trim(),
      tags: tags.split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean),
    });
  }

  return (
    <div className="modal" onClick={onClose}>
      <form className="modal__card composer" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <header>
          <h3>Pin a note to the bulletin</h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="kindToggle" role="radiogroup" aria-label="Note kind">
          <label className={kind === "need" ? "is-active is-need" : ""}>
            <input type="radio" name="kind" value="need" checked={kind === "need"} onChange={() => setKind("need")} />
            <span>I need…</span>
          </label>
          <label className={kind === "offer" ? "is-active is-offer" : ""}>
            <input type="radio" name="kind" value="offer" checked={kind === "offer"} onChange={() => setKind("offer")} />
            <span>I can offer…</span>
          </label>
        </div>

        <label className="field">
          <span>What's the ask, or the gift?</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder={kind === "need" ? "e.g. Looking for an AI ethicist to co-host a session in Raleigh." : "e.g. Happy to mentor 2 newcomers — a 30-min pre-event call."}
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Your name</span>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="First name or initials" required />
          </label>
          <label className="field">
            <span>Role (optional)</span>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Newcomer · Designer" />
          </label>
        </div>

        <label className="field">
          <span>Tags (comma separated)</span>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="onboarding, AI, mentorship" />
        </label>

        <footer>
          <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn--primary">Pin to bulletin</button>
        </footer>
      </form>
    </div>
  );
}

function NoteDetail({
  note, onClose, onReply,
}: {
  note: StickyNote;
  onClose: () => void;
  onReply: (author: string, body: string) => void;
}) {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const palette = paletteFor(note.kind, note.id);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;
    onReply(author.trim(), body.trim());
    setAuthor("");
    setBody("");
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__card detail" onClick={(e) => e.stopPropagation()}>
        <header>
          <span className={`sticky__kind sticky__kind--${note.kind}`}>
            {note.kind === "offer" ? "Offer" : "Need"}
          </span>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div
          className="detail__sticky"
          style={{
            background: `linear-gradient(160deg, ${palette.top} 0%, ${palette.bottom} 100%)`,
            color: palette.accent,
          }}
        >
          <p>{note.body}</p>
          <div className="sticky__tags">{note.tags.map((t) => <span key={t}>#{t}</span>)}</div>
          <div className="detail__byline">
            <strong>{note.author}</strong>
            {note.role && <span> · {note.role}</span>}
            <span className="detail__time"> · {timeAgo(note.createdAt)}</span>
          </div>
        </div>

        <section className="thread">
          <h4>
            {note.replies.length === 0 ? "No replies yet — start the thread." : `${note.replies.length} ${note.replies.length === 1 ? "reply" : "replies"}`}
          </h4>
          <ul>
            {note.replies.map((r) => (
              <li key={r.id} className="reply">
                <div className="reply__head">
                  <strong>{r.author}</strong>
                  <span>{timeAgo(r.createdAt)}</span>
                </div>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <form className="replyForm" onSubmit={submit}>
          <h4>{note.kind === "offer" ? `Reply to ${note.author}` : `Tell ${note.author} how you can help`}</h4>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" required />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder={note.kind === "need" ? "Here's how I can help…" : "I'd love to take you up on this…"}
            required
          />
          <div className="replyForm__actions">
            <button type="submit" className="btn btn--primary">Send reply</button>
          </div>
        </form>
      </div>
    </div>
  );
}
