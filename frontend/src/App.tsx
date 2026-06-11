import { useEffect, useState } from "react";
import { getMetrics, getProviders, resetSystem, runInference } from "./api/client";
import { Header } from "./components/Header";
import { InferenceResult } from "./components/InferenceResult";
import { MetricsDashboard } from "./components/MetricsDashboard";
import { PromptConsole } from "./components/PromptConsole";
import { ProviderCards } from "./components/ProviderCards";
import type { InferenceResponse, MetricsResponse, Provider, RoutingMode } from "./types/api";

function App() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [result, setResult] = useState<InferenceResponse | null>(null);
  const [prompt, setPrompt] = useState("Explain dynamic batching in simple terms");
  const [routingMode, setRoutingMode] = useState<RoutingMode>("balanced");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [providerData, metricsData] = await Promise.all([getProviders(), getMetrics()]);
        setProviders(providerData);
        setMetrics(metricsData);
      } catch {
        setError("Could not reach the InferFlow backend. Start FastAPI on port 8000 and refresh.");
      }
    }

    loadInitialData();
  }, []);

  async function handleSubmit() {
    if (!prompt.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const inferenceResult = await runInference(prompt, routingMode);
      setResult(inferenceResult);
      setMetrics(await getMetrics());
    } catch {
      setError("Inference request failed. Make sure the backend is running at http://localhost:8000.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReset() {
    setError("");

    try {
      await resetSystem();
      setResult(null);
      setMetrics(await getMetrics());
    } catch {
      setError("Reset failed. Check that the backend is still running.");
    }
  }

  return (
    <main>
      <Header />
      {error && <div className="error-banner">{error}</div>}

      <div className="layout-grid">
        <div className="left-column">
          <PromptConsole
            prompt={prompt}
            routingMode={routingMode}
            isLoading={isLoading}
            onPromptChange={setPrompt}
            onRoutingModeChange={setRoutingMode}
            onSubmit={handleSubmit}
          />
          <ProviderCards providers={providers} />
        </div>

        <div className="right-column">
          <InferenceResult result={result} />
          <MetricsDashboard metrics={metrics} onReset={handleReset} />
        </div>
      </div>
    </main>
  );
}

export default App;
