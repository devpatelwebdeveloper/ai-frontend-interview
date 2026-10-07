# Brightleaf Technical Interview

Welcome! This project contains **two independent tasks**. They share nothing except this folder, so **you choose the order**.

| Task | Time | What it's about | Instructions |
|---|---|---|---|
| **Frontend** | ~15 min | Astro + React: fix two customer-reported bugs in a search UI | [FRONTEND_TASK.md](FRONTEND_TASK.md) |
| **AI** | ~60 min | A RAG support bot that hallucinates, crashes and quotes old policies | [AI_TASK.md](AI_TASK.md) |

Tell your interviewer which one you'd like to start with.

## Setup (once, for both tasks)

**In CodeSandbox:** dependencies install automatically and the frontend preview opens on its own. Run the commands below in a terminal.

**On your own machine:** requires Node 20+. No API keys needed; everything runs locally.

```bash
npm install
```

Then:

```bash
npm run frontend     # Frontend task → http://localhost:4321
npm run ai:test      # AI task → runs all test questions
```

## Where things are

```
FRONTEND_TASK.md   Frontend task instructions
src/               Frontend task code (Astro site + React island)

AI_TASK.md         AI task instructions
ai/                AI task code (Node + TypeScript)
```

## Ground rules (both tasks)

- **Think out loud.** We care more about how you reason than how much you fix.
- Use any docs, search, or AI assistant you like. Tell us when you do and what you asked.
- You can change anything you can justify (except `ai/src/vendor/`, see the AI task).
- Your interviewer may give you the next step as you go.
