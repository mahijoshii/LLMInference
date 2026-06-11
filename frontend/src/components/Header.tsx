export function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">LLM Inference Gateway</p>
        <h1>InferFlow</h1>
        <p className="subtitle">
          Route prompts across simulated LLM backends with caching, retries, and live inference metrics.
        </p>
      </div>
      <div className="status-pill">
        <span className="pulse" />
        Local simulation
      </div>
    </header>
  );
}
