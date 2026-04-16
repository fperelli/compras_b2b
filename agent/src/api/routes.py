"""
FastAPI routes for the B2B Procurement Negotiation Agent.
"""
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Query
import os
import shutil
from pathlib import Path

from .schemas import (
    PurchaseRequest,
    CounterOfferRequest,
    ChatRequest,
    NegotiationResponse,
    HealthResponse,
)
from src.agent.agent import NegotiationService
from src.api.dependencies import get_negotiation_service
from src.rag.loader import ingest_tenant_docs

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
async def negotiate(request: PurchaseRequest):
    """
    Ejecuta el ciclo completo de análisis y propuesta de negociación.
    El agente usa herramientas para recuperar historial, benchmarks y validar presupuesto.
    """
    service = get_negotiation_service(request.tenant_id)
    try:
        output = await service.run_negotiation(request.model_dump())
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
async def counteroffer(request: CounterOfferRequest):
    """
    Genera una contraoferta dentro de los límites aprobados dado el mensaje del proveedor.
    """
    service = get_negotiation_service(request.tenant_id)
    try:
        output = await service.run_counteroffer(request.model_dump())
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
async def chat(request: ChatRequest):
    """
    Continúa la conversación con el asistente de estrategia.
    """
    service = get_negotiation_service(request.tenant_id)
    try:
        # Convertimos Pydantic history a lista de dicts para el agente
        history_dicts = [{"role": m.role, "content": m.content} for m in request.history]
        
        output = await service.run_chat(request.request_id, history_dicts)
        return NegotiationResponse(
            request_id=request.request_id,
            status="completed",
            output=output,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el chat: {str(e)}")

@router.post(
    "/policy/upload",
    tags=["Admin"],
    summary="Subir política de compras (RAG)",
    description="Sube un archivo Markdown con políticas para un tenant específico y actualiza el RAG.",
)
async def upload_policy(tenant_id: str, file: UploadFile = File(...)):
    """Receives a text/md file and embeds it into the tenant's collection."""
    if not file.filename.endswith(".md") and not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only .md or .txt files are supported.")

    tenant_dir = os.path.join("spec", tenant_id)
    os.makedirs(tenant_dir, exist_ok=True)
    
    file_path = os.path.join(tenant_dir, file.filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Update ChromaDB for this specific tenant
        ingest_tenant_docs(tenant_id)
        
        return {"status": "success", "message": f"File {file.filename} ingested for tenant {tenant_id}."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing error: {str(e)}")


@router.get(
    "/policy/list",
    tags=["Admin"],
    summary="Listar políticas de compras (RAG)",
    description="Lista los archivos de política cargados para un tenant específico.",
)
async def list_policies(tenant_id: str = Query(default="tenant_default")):
    """Returns a list of all policy files for the given tenant."""
    tenant_dir = Path("spec") / tenant_id
    if not tenant_dir.exists() or not tenant_dir.is_dir():
        return {"files": []}

    files = [
        {
            "name": f.name,
            "size_bytes": f.stat().st_size,
            "modified_at": f.stat().st_mtime,
        }
        for f in tenant_dir.iterdir()
        if f.is_file() and f.suffix in (".md", ".txt")
    ]
    return {"files": sorted(files, key=lambda x: x["name"])}


@router.delete(
    "/policy/delete",
    tags=["Admin"],
    summary="Eliminar política de compras (RAG)",
    description="Elimina un archivo de política y actualiza el RAG del tenant.",
)
async def delete_policy(
    tenant_id: str = Query(default="tenant_default"),
    filename: str = Query(...),
):
    """Deletes a specific policy file and re-ingests the remaining docs."""
    tenant_dir = Path("spec") / tenant_id
    file_path = tenant_dir / filename

    # Security: ensure the resolved path stays inside the tenant directory
    try:
        file_path.resolve().relative_to(tenant_dir.resolve())
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid filename (path traversal detected).")

    if not file_path.exists():
        raise HTTPException(status_code=404, detail=f"File '{filename}' not found for tenant '{tenant_id}'.")

    try:
        file_path.unlink()
        # Re-ingest remaining docs to keep ChromaDB in sync
        remaining = list(tenant_dir.glob("*.md")) + list(tenant_dir.glob("*.txt"))
        if remaining:
            ingest_tenant_docs(tenant_id)
        return {"status": "success", "message": f"File '{filename}' deleted for tenant '{tenant_id}'."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")
