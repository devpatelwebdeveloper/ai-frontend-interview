import fs from "node:fs";
import path from "node:path";

export interface Doc {
  id: string;
  title: string;
  lastUpdated: string;
  body: string;
}

export interface Chunk {
  id: string;
  text: string;
  title?: string;
  lastUpdated?: string;
}

/** Read every markdown file. Front matter is `key: value` lines between --- markers. */
export function loadDocs(dir: string): Doc[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      const meta: Record<string, string> = {};
      for (const line of (match?.[1] ?? "").split("\n")) {
        const i = line.indexOf(":");
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
      }
      return {
        id: file.replace(/\.md$/, ""),
        title: meta.title ?? file,
        lastUpdated: meta.last_updated ?? "",
        body: (match?.[2] ?? raw).trim(),
      };
    });
}

/** Split documents into chunks for retrieval. */
export function chunkDocs(docs: Doc[], chunkSize: number): Chunk[] {
  const corpus = docs.map((d) => d.body).join("\n");
  const chunks: Chunk[] = [];
  for (let i = 0; i < corpus.length; i += chunkSize) {
    chunks.push({ id: `chunk-${i / chunkSize}`, text: corpus.slice(i, i + chunkSize) });
  }
  return chunks;
}
