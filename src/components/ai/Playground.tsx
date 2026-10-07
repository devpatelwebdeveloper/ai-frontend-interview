/**
 * AI Playground: a UI for exploring the AI task.
 * This file is tooling, not part of either task, and has no planted bugs.
 */
import { useState } from "react";

interface ContextChunk {
  id: string;
  title: string | null;
  lastUpdated: string | null;
  score: number;
  text: string;
}

interface AskResult {
  intent?: string;
  answer?: string;
  context?: ContextChunk[];
  error?: string;
}

interface TestRow {
  id: string;
  question: string;
  expected: string;
  intent?: string;
  answer?: string;
  error?: string;
}

const EXAMPLES = [
  "How much does it cost to ship to Canada?",
  "Who is the CEO of Brightleaf?",
  "How many days do I have to return an unused item?",
  "Is the Summit 45 good for travel?",
  "What is the warranty on the Ridgeline 2 tent?",
  "Hi there!",
];

function AskPanel() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [result, setResult] = useState<AskResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showContext, setShowContext] = useState(true);

  async function ask(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    setQuestion(text);
    setAsked(text);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      setResult(await res.json());
    } catch (err) {
      setResult({ error: `Request failed: ${(err as Error).message}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pg-card">
      <h2>Ask Trailhead</h2>
      <form
        className="pg-ask"
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
      >
        <label htmlFor="pg-question" className="pg-visually-hidden">Question</label>
        <input
          id="pg-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a customer question…"
        />
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? "Asking…" : "Ask"}
        </button>
      </form>

      <div className="pg-chips">
        {EXAMPLES.map((q) => (
          <button key={q} type="button" className="pg-chip" onClick={() => ask(q)} disabled={loading}>
            {q}
          </button>
        ))}
      </div>

      {result && (
        <div className="pg-result" aria-live="polite">
          <p className="pg-question">“{asked}”</p>
          {result.error ? (
            <div className="pg-error">
              <strong>The bot threw an error</strong>
              <code>{result.error}</code>
            </div>
          ) : (
            <>
              <div className="pg-meta">
                <span className="pg-badge">intent: {result.intent}</span>
                <span className="pg-badge">
                  {result.context?.length ?? 0} {result.context?.length === 1 ? "chunk" : "chunks"} retrieved
                </span>
              </div>
              <div className="pg-answer">{result.answer}</div>

              {result.context && result.context.length > 0 && (
                <div className="pg-context">
                  <button type="button" className="pg-link" onClick={() => setShowContext(!showContext)}>
                    {showContext ? "▾" : "▸"} What the model saw (retrieved context)
                  </button>
                  {showContext && (
                    <ol>
                      {result.context.map((c, i) => (
                        <li key={`${c.id}-${i}`} className="pg-chunk">
                          <div className="pg-chunk-head">
                            <span><strong>[{i + 1}]</strong> {c.id}</span>
                            <span>score {c.score.toFixed(3)}</span>
                          </div>
                          <div className="pg-chunk-meta">
                            title: {c.title ?? <em>none</em>} · updated: {c.lastUpdated ?? <em>none</em>}
                          </div>
                          <pre>{c.text}</pre>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

function TestsPanel() {
  const [rows, setRows] = useState<TestRow[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ranAt, setRanAt] = useState("");

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/tests");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setRows(null);
      } else {
        setRows(data.results);
        setRanAt(new Date().toLocaleTimeString());
      }
    } catch (err) {
      setError(`Request failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  const errors = rows?.filter((r) => r.error).length ?? 0;

  return (
    <section className="pg-card">
      <div className="pg-tests-head">
        <div>
          <h2>Test questions</h2>
          <p className="pg-muted">
            Runs all 17 questions from <code>ai/data/test-questions.json</code> against your current code.
            {rows && ` Last run ${ranAt}${errors ? ` · ${errors} error${errors > 1 ? "s" : ""}` : ""}.`}
          </p>
        </div>
        <button type="button" onClick={run} disabled={loading}>
          {loading ? "Running…" : rows ? "Run again" : "Run all"}
        </button>
      </div>

      {error && (
        <div className="pg-error">
          <strong>Could not run the tests</strong>
          <code>{error}</code>
        </div>
      )}

      {rows && (
        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Question</th>
                <th scope="col">Expected</th>
                <th scope="col">Actual</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={r.error ? "pg-row-error" : ""}>
                  <td>{r.id}</td>
                  <td>{r.question}</td>
                  <td>{r.expected}</td>
                  <td>
                    {r.error ? (
                      <code>{r.error}</code>
                    ) : (
                      <>
                        <span className="pg-badge">{r.intent}</span> {r.answer}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function Playground() {
  return (
    <div className="pg">
      <AskPanel />
      <TestsPanel />
    </div>
  );
}
