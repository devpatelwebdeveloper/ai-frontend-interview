/**
 * Ask the bot one question.
 *   npm run ai:ask -- "How long do I have to return something?"
 *   npm run ai:ask -- "..." --context      also print the retrieved chunks
 */
import { SupportBot } from "./src/pipeline.js";

const args = process.argv.slice(2);
const showContext = args.includes("--context");
const question = args.filter((a) => a !== "--context").join(" ");

if (!question) {
  console.log('Usage: npm run ai:ask -- "your question" [--context]');
  process.exit(1);
}

const reply = new SupportBot().answer(question);

if (showContext) {
  console.log("\n--- Retrieved context ---");
  for (const c of reply.context) {
    console.log(`\n[${c.id}] score=${c.score.toFixed(3)} title=${c.title ?? "-"} updated=${c.lastUpdated ?? "-"}`);
    console.log(c.text);
  }
  console.log("-------------------------\n");
}
console.log(`intent: ${reply.intent}`);
console.log(`answer: ${reply.answer}`);
