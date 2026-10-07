/**
 * AI Playground API (part of the AI task's tooling, not a task itself).
 * GET /api/ai/tests  →  runs every test question; each runs independently,
 * so one crash shows as an error on that row instead of stopping the run.
 */
import type { APIRoute } from "astro";
import fs from "node:fs";
import { SupportBot } from "../../../../ai/src/pipeline";
import { TEST_QUESTIONS } from "../../../../ai/src/config";

export const prerender = false;

function describe(err: unknown): string {
  return err instanceof Error ? `${err.name}: ${err.message}` : String(err);
}

interface TestQuestion {
  id: string;
  question: string;
  expected: string;
}

export const GET: APIRoute = async () => {
  let questions: TestQuestion[];
  let bot: SupportBot;
  try {
    questions = JSON.parse(fs.readFileSync(TEST_QUESTIONS, "utf8"));
    bot = new SupportBot();
  } catch (err) {
    return Response.json({ error: describe(err) }, { status: 500 });
  }

  const results = questions.map((q) => {
    try {
      const reply = bot.answer(q.question);
      return { ...q, intent: reply.intent, answer: reply.answer };
    } catch (err) {
      return { ...q, error: describe(err) };
    }
  });
  return Response.json({ results });
};
