import type { Provider } from "../types/api";

type Props = {
  providers: Provider[];
};

export function ProviderCards({ providers }: Props) {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Model Backends</p>
        <h2>Provider lineup</h2>
      </div>

      <div className="provider-grid">
        {providers.map((provider) => (
          <article className="provider-card" key={provider.name} style={{ borderColor: provider.color }}>
            <div className="provider-topline">
              <h3>{provider.name}</h3>
              <span style={{ backgroundColor: provider.color }}>{provider.speed}</span>
            </div>
            <p>{provider.best_use_case}</p>
            <div className="provider-stats">
              <span>Latency {provider.base_latency_ms}ms</span>
              <span>${provider.cost_per_1k_tokens.toFixed(4)}/1K</span>
              <span>{Math.round(provider.reliability * 100)}% reliable</span>
              <span>Q{provider.quality_score}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
