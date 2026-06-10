from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data.providers import PROVIDERS
from app.models.request_models import InferenceRequest
from app.models.response_models import HealthResponse, InferenceResponse, MetricsResponse
from app.services.cache_service import cache_service
from app.services.inference_service import inference_service
from app.services.metrics_service import metrics_service

app = FastAPI(title="InferFlow API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="InferFlow API")


@app.get("/providers")
def get_providers():
    return PROVIDERS


@app.post("/infer", response_model=InferenceResponse)
def infer(request: InferenceRequest) -> InferenceResponse:
    result = inference_service.run_inference(request)
    metrics_service.record(result)
    return result


@app.get("/metrics", response_model=MetricsResponse)
def metrics() -> MetricsResponse:
    return metrics_service.get_metrics()


@app.post("/reset")
def reset():
    cache_service.clear()
    metrics_service.clear()
    return {"status": "reset"}
