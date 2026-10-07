import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const DOCS_DIR = path.join(root, "data", "docs");
export const TEST_QUESTIONS = path.join(root, "data", "test-questions.json");

/** Characters per chunk. */
export const CHUNK_SIZE = 800;

/** Number of chunks sent to the model. */
export const TOP_K = 1;
