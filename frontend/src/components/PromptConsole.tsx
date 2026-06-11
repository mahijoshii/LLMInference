import type { RoutingMode } from "../types/api";
import { RoutingModeSelector } from "./RoutingModeSelector";

const examples = [
  "Summarize this customer support ticket",
  "Explain dynamic batching in simple terms",
  "Write a product update email",
  "Classify this bug report by priority",
];

type Props = {
  prompt: string;
  routingMode: RoutingMode;
  isLoading: boolean;
  onPromptChange: (prompt: string) => void;
  onRoutingModeChange: (mode: RoutingMode) => void;
  onSubmit: () => void;
};

export function PromptConsole({
  prompt,
  routingMode,
  isLoading,
  onPromptChange,
  onRoutingModeChange,
  onSubmit,
}: Props) {
  return (
    <section className="panel prompt-panel">
      <div className="section-heading">
        <p className="eyebrow">Prompt Console</p>
        <h2>Send a request through the gateway</h2>
      </div>

      <textarea
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder="Paste a prompt here and let InferFlow pick a backend..."
      />

      <div className="example-row">
        {examples.map((example) => (
          <button key={example} type="button" onClick={() => onPromptChange(example)}>
            {example}
          </button>
        ))}
      </div>

      <RoutingModeSelector selectedMode={routingMode} onChange={onRoutingModeChange} />

      <button className="primary-button" disabled={isLoading || !prompt.trim()} onClick={onSubmit} type="button">
        {isLoading ? "Routing..." : "Run Inference"}
      </button>
    </section>
  );
}
