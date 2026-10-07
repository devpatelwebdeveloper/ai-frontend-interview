/**
 * AI Playground API (part of the AI task's tooling, not a task itself).
 * POST /api/ai/ask  { question }  →  { intent, answer, context } | { error }
 *
 * A fresh SupportBot is created per request so code changes in ai/ show up
 * immediately, without restarting the server.
 */
import type { APIRoute } from "astro";
import { SupportBot } from "../../../../ai/src/pipeline";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { question } = await request.json().catch(() => ({ question: "" }));
  if (!question || typeof question !== "string") {
    return Response.json({ error: "Please enter a question." }, { status: 400 });
  }
  try {
    const reply = new SupportBot().answer(question);
    return Response.json({
      intent: reply.intent,
      answer: reply.answer,
      context: reply.context.map((c) => ({
        id: c.id,
        title: c.title ?? null,
        lastUpdated: c.lastUpdated ?? null,
        score: c.score,
        text: c.text,
      })),
    });
  } catch (err) {
    return Response.json({ error: describe(err) }, { status: 500 });
  }
};

function describe(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  return String(err);
}
