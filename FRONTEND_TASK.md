# Frontend Task: Gear Finder (~15 min)

A small Astro page with a React island. Customers search for gear and save items for later.

## Run it

```bash
npm run frontend
```

Open http://localhost:4321

## Files

```
src/pages/index.astro          the page (mounts the React island)
src/components/GearFinder.tsx  search + results list
src/pages/api/products.ts      search API
src/data/products.ts           product data
```

## Bug reports from customers

1. "I typed **tent** and the results included a water filter and a lantern."
2. "I saved the **Ridgeline 2 Tent**, searched for something else, and now a different product shows as saved."

Reproduce them, find the root causes, and fix them. Think out loud.
