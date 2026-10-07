# AI Task: Trailhead Support Bot (~60 min)

## The situation

Brightleaf Outdoor Co. sells outdoor gear. Their support bot, **Trailhead**, answers customer questions using the help center (retrieval-augmented generation), and routes some messages (greetings, order status, angry customers) to special flows.

Since launch, customers report that Trailhead:

- **makes things up** (products, names, dates),
- **quotes the wrong return policy**,
- once **offered a 90%-off discount code** nobody created,
- and the nightly test run **crashes halfway through**.

You've just joined the team. Find out what's wrong, fix it, and prove it's fixed.

## Run it

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
