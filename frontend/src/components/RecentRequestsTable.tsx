import type { InferenceResponse } from "../types/api";

type Props = {
  requests: InferenceResponse[];
};

export function RecentRequestsTable({ requests }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Provider</th>
            <th>Mode</th>
            <th>Cache</th>
            <th>Latency</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={6}>No requests yet.</td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.prompt}</td>
                <td>{request.selected_provider}</td>
                <td>{request.routing_mode.replace("_", " ")}</td>
                <td>{request.cache_hit ? "Hit" : "Miss"}</td>
                <td>{request.latency_ms}ms</td>
                <td>${request.estimated_cost.toFixed(4)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
