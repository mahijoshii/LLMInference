import type { InferenceResponse } from "../types/api";

type Props = {
  result: InferenceResponse | null;
};

export function InferenceResult({ result }: Props) {
  if (!result) {
    return (
      <section className="panel result-panel empty-state">
        <p className="eyebrow">Routing Decision</p>
        <h2>Awaiting first request</h2>
        <p>Submit a prompt to see provider selection, cost, cache status, retries, and token estimates.</p>
      </section>
    );
  }

  return (
    <section className={`panel result-panel ${result.cache_hit ? "cache-glow" : ""}`}>
      <div className="result-header">
        <div>
          <p className="eyebrow">Routing Decision</p>
          <h2>{result.selected_provider}</h2>
        </div>
        <span className={result.cache_hit ? "cache-badge" : "fresh-badge"}>
          {result.cache_hit ? "Semantic Cache Hit - saved one model call" : "Fresh Model Call"}
        </span>
      </div>

      <p className="response-text">{result.response}</p>
      <p className="reason">{result.routing_reason}</p>

      <div className="result-metrics">
        <span>{result.latency_ms}ms latency</span>
        <span>{result.input_tokens + result.output_tokens} tokens</span>
        <span>${result.estimated_cost.toFixed(4)} cost</span>
        <span>{result.retry_count} retries</span>
      </div>
    </section>
  );
}
