/**
 * Vector retriever. TF-IDF stands in for an embedding model + vector DB so the round
 * runs offline. Treat it like any embedding retriever: text in, ranked chunks out.
 */
import type { Chunk } from "./ingest.js";

export interface Scored extends Chunk {
  score: number;
}

const STOP = new Set(
  "a an and are as at be by can do does for from has have how i if in is it its me my of on or our so that the this to was we what when where which who will with you your".split(" ")
);

function stem(t: string): string {
  if (t.length > 5 && t.endsWith("ing")) return t.slice(0, -3);
  if (t.length > 4 && t.endsWith("ed")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) return t.slice(0, -1);
  return t;
}

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((t) => (t.length > 1 || /\d/.test(t)) && !STOP.has(t)).map(stem);
}

export class Retriever {
  private vectors: Map<string, number>[];
  private idf = new Map<string, number>();

  constructor(private chunks: Chunk[]) {
    const tokenized = chunks.map((c) => tokenize(`${c.title ?? ""} ${c.text}`));
    const df = new Map<string, number>();
    for (const toks of tokenized) for (const t of new Set(toks)) df.set(t, (df.get(t) ?? 0) + 1);
    for (const [t, n] of df) this.idf.set(t, Math.log((1 + chunks.length) / (1 + n)) + 1);
    this.vectors = tokenized.map((toks) => this.vectorize(toks));
  }

  private vectorize(toks: string[]): Map<string, number> {
    const v = new Map<string, number>();
    for (const t of toks) v.set(t, (v.get(t) ?? 0) + 1);
    let norm = 0;
    for (const [t, c] of v) {
      const w = (1 + Math.log(c)) * (this.idf.get(t) ?? 1);
      v.set(t, w);
      norm += w * w;
    }
    norm = Math.sqrt(norm) || 1;
    for (const [t, w] of v) v.set(t, w / norm);
    return v;
  }

  /** Return the topK most relevant chunks, best first. */
  search(query: string, topK: number): Scored[] {
    const q = this.vectorize(tokenize(query));
    const scored = this.chunks.map((chunk, i) => {
      let score = 0;
      for (const [t, w] of q) score += w * (this.vectors[i].get(t) ?? 0);
      return { ...chunk, score };
    });
    return scored.sort((a, b) => a.score - b.score).slice(0, topK);
  }
}
