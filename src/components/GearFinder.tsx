import { useEffect, useState } from "react";
import type { Product } from "../data/products";

function ProductRow({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);

  return (
    <li className="row">
      <div>
        <strong>{product.name}</strong>
        <span className="muted">{product.category}</span>
      </div>
      <span className="price">${product.price}</span>
      <button className={saved ? "save saved" : "save"} onClick={() => setSaved(!saved)}>
        {saved ? "★ Saved" : "☆ Save"}
      </button>
    </li>
  );
}

export default function GearFinder() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      });
  }, [query]);

  return (
    <section className="finder">
      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search gear…"
      />
      <p className="muted">{loading ? "Searching…" : `${results.length} results`}</p>
      <ul className="list">
        {results.map((product, index) => (
          <ProductRow key={index} product={product} />
        ))}
      </ul>
    </section>
  );
}
