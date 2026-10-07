# Brightleaf Technical Interview

Welcome! Today you'll work through two short, hands-on tasks in a real codebase. There are no trick questions. We want to see how you think, debug and make decisions, just like a normal day on the team.

## The format

This project contains **two independent tasks**. They share no code, so **you choose the order**.

| Task | Time | What it's about | Instructions |
|---|---|---|---|
| **Frontend** | ~15 min | An Astro page with a React component. Fix bugs customers have reported. | [FRONTEND_TASK.md](FRONTEND_TASK.md) |
| **AI** | ~60 min | An AI customer-support chatbot that's misbehaving. Find out why, fix it, and show it's fixed. | [AI_TASK.md](AI_TASK.md) |

Tell your interviewer which task you'd like to start with. There's a short break between tasks, and time for your questions at the end.

## Getting started

**In CodeSandbox:** dependencies install automatically when the project opens (this takes a minute or two), and the frontend preview may already be running.

**On your own machine:** requires Node 20+. Run `npm install` once.

No API keys or accounts are needed. Everything runs locally.

## Commands

Run these in a terminal:

| Command | What it does |
|---|---|
| `npm run frontend -- --host` | Starts the web server on port 4321: the frontend task at `/` and the **AI Playground** at `/ai` |
| `npm run ai:test` | Runs all the AI task's test questions in the terminal |
| `npm run ai:ask -- "your question" --context` | Asks the chatbot one question in the terminal and shows what it looked up |

## Where things are

```
README.md          You are here
FRONTEND_TASK.md   Frontend task instructions
src/               Frontend task code (Astro site + React island)
src/pages/ai.astro, src/components/ai/, src/pages/api/ai/
                   AI Playground UI (tooling for the AI task, no bugs here)

AI_TASK.md         AI task instructions
ai/                AI task code (Node + TypeScript)
ai/src/vendor/     The simulated AI model: do not open or edit
```

## Task 1: Frontend (~15 minutes)

A product search page ("Gear Finder") has **two bugs** to fix. Start it with `npm run frontend -- --host`.

| # | Bug | How to see it |
|---|---|---|
| 1 | **Search shows results for the wrong query** | Type `tent` quickly. The results include a water filter and a lantern. |
| 2 | **"Saved" moves to the wrong product** | Search `tents`, click **Save** on *Ridgeline 2 Tent*, then search `stove`. *Basecamp Stove* now shows as saved. |

For each bug, find the root cause and fix it properly. Details are in [FRONTEND_TASK.md](FRONTEND_TASK.md).

## Task 2: AI (~60 minutes)

**Trailhead** is a customer-support chatbot that answers questions from a company's help center. It has **five known problems** to fix.

The easiest way to explore it is the **AI Playground**: open the preview at **`/ai`** (port 4321). Ask questions, see exactly what the bot retrieved, and run all 17 test questions with expected vs actual answers side by side. It always uses your latest code, so save a file and ask again. You can also use the terminal commands above.

| # | Problem | How to see it |
|---|---|---|
| 1 | **The test run crashes** | `npm run ai:test` stops at Q15 with a `SyntaxError`. |
| 2 | **Wrong answers to documented questions** | Ask "How much does it cost to ship to Canada?": it says $49. The help center says **$14.95**. |
| 3 | **Makes things up when it doesn't know** | Ask "Who is the CEO of Brightleaf?": it invents a name. "Do you sell kayaks?" says yes. |
| 4 | **Quotes an old return policy** | "How many days do I have to return an unused item?" should say **30 days**, not 14. |
| 5 | **Offers a fake discount code** | "Is the Summit 45 good for travel?" must never offer the code *FREE90*. |

Some problems only become visible once others are fixed, so re-run the tests as you go. Fix them in whatever order you think matters most; for each one, find the root cause, not just the symptom. Details are in [AI_TASK.md](AI_TASK.md).

Your interviewer will give you the next step partway through.

**About the AI model:** the project includes a simulated AI model, so everything runs without API keys. Treat it like a real hosted model: **don't open or edit anything in `ai/src/vendor/`**. It reads your instructions and behaves the way a real model would.

## Ground rules

- **Think out loud.** We care more about how you reason than how many things you fix. It's fine not to finish.
- **Ask questions.** If something is unclear, ask, just as you would with a teammate.
- **Use your normal tools.** Documentation, search engines and AI assistants are all allowed. Just tell us when you use one and what you asked it.
- **Change anything you can justify**, except the `ai/src/vendor/` folder.
- **No need to rush or be perfect.** A clear explanation of a partial fix is better than a silent complete one.

## What we're looking for

- How you investigate a problem before changing code.
- Whether you find root causes rather than patching symptoms.
- How you check that a fix really works.
- How you explain your decisions and tradeoffs.

We're looking forward to working through this with you. Good luck, and have fun with it!
