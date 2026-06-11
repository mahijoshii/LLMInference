import type { RoutingMode } from "../types/api";

const modes: Array<{ id: RoutingMode; label: string; description: string }> = [
  { id: "fastest", label: "Fastest", description: "Prioritize low latency." },
  { id: "cheapest", label: "Cheapest", description: "Minimize token cost." },
  { id: "highest_quality", label: "Highest Quality", description: "Choose the strongest model." },
  { id: "balanced", label: "Balanced", description: "Blend speed, cost, and quality." },
];

type Props = {
  selectedMode: RoutingMode;
  onChange: (mode: RoutingMode) => void;
};

export function RoutingModeSelector({ selectedMode, onChange }: Props) {
  return (
    <div className="mode-grid">
      {modes.map((mode) => (
        <button
          className={`mode-card ${selectedMode === mode.id ? "active" : ""}`}
          key={mode.id}
          onClick={() => onChange(mode.id)}
          type="button"
        >
          <strong>{mode.label}</strong>
          <span>{mode.description}</span>
        </button>
      ))}
    </div>
  );
}
