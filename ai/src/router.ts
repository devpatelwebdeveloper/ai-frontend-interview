import { classify } from "./vendor/mock-llm.js";

export type Intent = "question" | "order_status" | "escalate" | "greeting";

/** Ask the model what kind of message this is. */
export function detectIntent(message: string): Intent {
  const raw = classify(message);
  const parsed = JSON.parse(raw);
  return parsed.intent;
}
