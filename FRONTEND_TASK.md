# Frontend Task: Gear Finder (~15 min)

A small Astro page with a React island. Customers search for gear and save items for later.

## Run it

```bash
npm run frontend -- --host
```

Open the preview on port 4321 (locally: http://localhost:4321).

## Files

```
src/pages/index.astro          the page (mounts the React island)
src/components/GearFinder.tsx  search + results list
src/pages/api/products.ts      search API
src/data/products.ts           product data
```

## The two bugs

| # | Bug | How to see it |
|---|---|---|
| 1 | **Search shows results for the wrong query** | Type `tent` quickly. The results include a water filter and a lantern. |
| 2 | **"Saved" moves to the wrong product** | Search `tents`, click **Save** on *Ridgeline 2 Tent*, then search `stove`. *Basecamp Stove* now shows as saved. |

For each bug, find the root cause and fix it properly. Think out loud.
