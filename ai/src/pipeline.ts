import { CHUNK_SIZE, DOCS_DIR, TOP_K } from "./config.js";
import { chunkDocs, loadDocs } from "./ingest.js";
import { Retriever, type Scored } from "./retriever.js";
import { detectIntent, type Intent } from "./router.js";
import { SYSTEM_PROMPT } from "./prompt.js";
import { generate } from "./vendor/mock-llm.js";

export interface BotReply {
  intent: Intent;
  answer: string;
  context: Scored[];
}

export class SupportBot {
  private retriever: Retriever;

  constructor(docsDir = DOCS_DIR) {
    const docs = loadDocs(docsDir);
    const chunks = chunkDocs(docs, CHUNK_SIZE);
    this.retriever = new Retriever(chunks);
  }

  retrieve(question: string): Scored[] {
    return this.retriever.search(question, TOP_K);
  }

  answer(message: string): BotReply {
    const intent = detectIntent(message);

    if (intent === "greeting") {
      return { intent, answer: "Hi! I'm Trailhead. How can I help with your gear today?", context: [] };
    }
    if (intent === "order_status") {
      return { intent, answer: "I can help with that! What's your order number?", context: [] };
    }
    if (intent === "escalate") {
      return { intent, answer: "I'm sorry about that. Connecting you with a member of our team now.", context: [] };
    }

    const context = this.retrieve(message);
    const answer = generate({
      system: SYSTEM_PROMPT,
      question: message,
      documents: context.map(({ id, text, title, lastUpdated }) => ({ id, text, title, lastUpdated })),
    });
    return { intent, answer, context };
  }
}
