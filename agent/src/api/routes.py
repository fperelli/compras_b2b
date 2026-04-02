"""
FastAPI routes for the B2B Procurement Negotiation Agent.
"""
from fastapi import APIRouter, HTTPException, Depends

from .schemas import (
    PurchaseRequest,
    CounterOfferRequest,
    ChatRequest,
    NegotiationResponse,
    HealthResponse,
)
from agent.src.agent.agent import NegotiationService
from agent.src.api.dependencies import get_negotiation_service

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["Sistema"])
async def health_check():
    """Verifica que el servicio esté operativo."""
    return HealthResponse(
        status="ok",
        model="gemini-2.0-flash",
        version="1.0.0",
    )


@router.post(
    "/negotiate",
    response_model=NegotiationResponse,
    tags=["Negociación"],
    summary="Iniciar negociación",
    description=(
        "Analiza un requerimiento de compra y genera una estrategia de negociación "
        "completa con oferta inicial, riesgos y mensaje sugerido para el proveedor."
    ),
)
async def negotiate(request: PurchaseRequest, service: NegotiationService = Depends(get_negotiation_service)):
    """
    Ejecuta el ciclo completo de análisis y propuesta de negociación.
    El agente usa herramientas para recuperar historial, benchmarks y validar presupuesto.
    """
    try:
        output = service.run_negotiation(request.model_dump())
        return NegotiationResponse(
            request_id=request.request_id,
            status="completed",
            output=output,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el agente: {str(e)}")


@router.post(
    "/counteroffer",
    response_model=NegotiationResponse,
    tags=["Negociación"],
    summary="Generar contraoferta",
    description=(
        "Genera una contraoferta basada en la respuesta del proveedor, "
        "respetando el playbook de negociación y los límites comerciales aprobados."
    ),
)
async def counteroffer(request: CounterOfferRequest, service: NegotiationService = Depends(get_negotiation_service)):
    """
    Genera una contraoferta dentro de los límites aprobados dado el mensaje del proveedor.
    """
    try:
        output = service.run_counteroffer(request.model_dump())
        return NegotiationResponse(
            request_id=request.request_id,
            status="completed",
            output=output,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el agente: {str(e)}")


@router.post(
    "/chat",
    response_model=NegotiationResponse,
    tags=["Asistente"],
    summary="Chat interactivo con el arquitecto",
    description=(
        "Permite conversar con el agente sobre la estrategia, riesgos "
        "o consultas específicas sobre las políticas de compra."
    ),
)
async def chat(request: ChatRequest, service: NegotiationService = Depends(get_negotiation_service)):
    """
    Continúa la conversación con el asistente de estrategia.
    """
    try:
        # Convertimos Pydantic history a lista de dicts para el agente
        history_dicts = [{"role": m.role, "content": m.content} for m in request.history]
        
        output = service.run_chat(request.request_id, history_dicts)
        return NegotiationResponse(
            request_id=request.request_id,
            status="completed",
            output=output,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el chat: {str(e)}")
