import type { MetricsResponse } from "../types/api";
import { RecentRequestsTable } from "./RecentRequestsTable";
import { StatCard } from "./StatCard";

type Props = {
  metrics: MetricsResponse | null;
  onReset: () => void;
};

export function MetricsDashboard({ metrics, onReset }: Props) {
  const providerUsage = metrics?.provider_usage ?? {};

  return (
    <section className="panel metrics-panel">
      <div className="dashboard-heading">
        <div className="section-heading">
          <p className="eyebrow">Observability</p>
          <h2>Live gateway metrics</h2>
        </div>
        <button className="secondary-button" onClick={onReset} type="button">
          Reset
        </button>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Requests" value={`${metrics?.total_requests ?? 0}`} />
        <StatCard label="Cache Hit Rate" value={`${Math.round((metrics?.cache_hit_rate ?? 0) * 100)}%`} />
        <StatCard label="Average Latency" value={`${metrics?.average_latency_ms ?? 0}ms`} />
        <StatCard label="Total Cost" value={`$${(metrics?.total_estimated_cost ?? 0).toFixed(4)}`} />
      </div>

      <div className="usage-grid">
        {Object.entries(providerUsage).map(([provider, count]) => (
          <div className="usage-row" key={provider}>
            <span>{provider}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>

      <RecentRequestsTable requests={metrics?.recent_requests ?? []} />
    </section>
  );
}
