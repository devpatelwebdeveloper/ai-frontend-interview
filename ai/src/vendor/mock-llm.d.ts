/**
 * Simulated LLM provider. Treat it like a hosted model API.
 * It behaves like a capable model: it reads your system prompt and follows (or doesn't follow)
 * instructions the way a real model would. Write prompts as you would for a real model.
 */
export interface LLMDocument {
  id: string;
  text: string;
  /** Optional metadata the model can use if you provide it. */
  title?: string;
  lastUpdated?: string;
}

export interface GenerateRequest {
  /** System prompt: instructions for the model. */
  system: string;
  /** The customer's question. */
  question: string;
  /** Retrieved context documents, in ranked order. */
  documents: LLMDocument[];
}

/** Generate an answer. Returns the model's text. */
export function generate(req: GenerateRequest): string;

/**
 * Classify a customer message. Returns the model's RAW text output.
 * The model was asked for JSON: {"intent": "question" | "order_status" | "escalate" | "greeting", "confidence": number}
 */
export function classify(message: string): string;
