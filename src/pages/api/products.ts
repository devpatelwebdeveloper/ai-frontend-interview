/**
 * GET /api/products?q=<search>
 * Returns products whose name or category contains the search text.
 *
 * Like a real search backend, response time varies: broad queries take longer
 * than specific ones.
 */
import type { APIRoute } from "astro";
import { products } from "../../data/products";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const results = products.filter(
    (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  // Broad queries (few characters) are slower.
  const delay = q.length <= 2 ? 900 : 150;
  await new Promise((r) => setTimeout(r, delay + Math.random() * 100));

  return Response.json({ query: q, results });
};
