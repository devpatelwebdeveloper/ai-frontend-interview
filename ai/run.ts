/**
 * Run every test question and print expected vs actual.
 *   npm run ai:test
 *
 * There is no automatic scoring yet.
 */
import fs from "node:fs";
import { TEST_QUESTIONS } from "./src/config.js";
import { SupportBot } from "./src/pipeline.js";

interface TestQuestion {
  id: string;
  question: string;
  expected: string;
}

const questions: TestQuestion[] = JSON.parse(fs.readFileSync(TEST_QUESTIONS, "utf8"));
const bot = new SupportBot();

for (const q of questions) {
  const reply = bot.answer(q.question);
  console.log("=".repeat(80));
  console.log(`[${q.id}] ${q.question}`);
  console.log(`  expected: ${q.expected}`);
  console.log(`  actual:   (${reply.intent}) ${reply.answer}`);
}
console.log("=".repeat(80));
