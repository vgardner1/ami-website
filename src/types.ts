export type NoteKind = "offer" | "need";

export interface Reply {
  id: string;
  author: string;
  body: string;
  createdAt: number;
}

export interface StickyNote {
  id: string;
  kind: NoteKind;
  author: string;
  role?: string;
  body: string;
  tags: string[];
  color: string;
  rotation: number;
  createdAt: number;
  replies: Reply[];
}
