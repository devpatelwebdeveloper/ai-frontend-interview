# AI Task: Trailhead Support Bot (~60 min)

## The situation

Brightleaf Outdoor Co. sells outdoor gear. Their support bot, **Trailhead**, answers customer questions using the help center (retrieval-augmented generation), and routes some messages (greetings, order status, angry customers) to special flows.

It has **five known problems** to fix:

| # | Problem | How to see it |
|---|---|---|
| 1 | **The test run crashes** | `npm run ai:test` stops at Q15 with a `SyntaxError`. |
| 2 | **Wrong answers to documented questions** | Ask "How much does it cost to ship to Canada?": it says $49. The help center says **$14.95**. |
| 3 | **Makes things up when it doesn't know** | Ask "Who is the CEO of Brightleaf?": it invents a name. "Do you sell kayaks?" says yes. |
| 4 | **Quotes an old return policy** | "How many days do I have to return an unused item?" should say **30 days**, not 14. |
| 5 | **Offers a fake discount code** | "Is the Summit 45 good for travel?" must never offer the code *FREE90*. |

Some problems only become visible once others are fixed, so re-run the tests as you go. Fix them in whatever order you think matters most; for each one, find the root cause, not just the symptom.

## Run it

**In the browser (recommended):** start the server with `npm run frontend -- --host` (it may already be running) and open the preview at **`/ai`**. The AI Playground lets you:
- ask any question and see the routed intent, the answer, and **exactly which chunks were retrieved** (score, title, date, text),
- run all 17 test questions and compare expected vs actual side by side.

It always uses your latest code in `ai/`: save a file and ask again, no restart needed.

**In the terminal:**

```bash
npm run ai:test                                                  # run all 17 test questions
npm run ai:ask -- "How long do I have to return something?" --context   # one question + retrieved chunks
```

## The model

`ai/src/vendor/mock-llm.js` simulates a hosted LLM API, so this runs offline. **Treat it as a black box**: don't read or edit it, just as you couldn't read a provider's model. Its interface is in `ai/src/vendor/mock-llm.d.ts`.

It behaves like a capable model: it reads your system prompt and follows instructions the way a real model would, it uses whatever documents and metadata you give it, and its raw output isn't always perfectly formatted. Write prompts as you would for a real model.

## Map of the code

```
ai/data/docs/*.md              46 help-center articles (front matter: title, last_updated)
ai/data/test-questions.json    17 customer messages with expected behavior
ai/src/config.ts               chunk size and top-k
ai/src/ingest.ts               loads and chunks documents
ai/src/retriever.ts            vector search (TF-IDF stands in for embeddings)
ai/src/router.ts               intent detection via the model
ai/src/prompt.ts               the system prompt
ai/src/pipeline.ts             route → retrieve → generate
ai/src/vendor/                 the model (black box)
ai/run.ts, ai/ask.ts           the scripts behind npm run ai:test / ai:ask
```
