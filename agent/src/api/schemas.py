"""
Pydantic schemas for the B2B Procurement Negotiation Agent.
"""
from pydantic import BaseModel, Field
from typing import Optional, List


class PurchaseRequest(BaseModel):
    request_id: str = Field(..., description="ID de la solicitud")
    tenant_id: str = Field("tenant_default", description="Identificador único del sub-cliente SaaS")
    supplier_id: str = Field(..., description="ID del proveedor")
    supplier_name: str = Field(..., description="Nombre del proveedor")
    category: str = Field(..., description="Categoría de la compra")
    volume: int = Field(..., description="Volumen estimado")
    target_price: float = Field(..., description="Precio objetivo por unidad")
    max_price: float = Field(..., description="Precio máximo permitido por unidad")
    payment_terms: str = Field(..., description="Condiciones de pago (ej. net_60)")
    required_date: str = Field(..., description="Fecha requerida de entrega")
    restrictions: Optional[str] = Field(None, description="Restricciones adicionales")


class CounterOfferRequest(BaseModel):
    request_id: str
    tenant_id: str = "tenant_default"
    supplier_id: str
    supplier_name: str
    category: str
    original_target_price: float
    max_price: float
    payment_terms: str
    supplier_response_price: float
    supplier_message: str
    negotiation_stage: str = "negotiation"


class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the sender: 'user' or 'assistant'")
    content: str = Field(..., description="The message content")


class ChatRequest(BaseModel):
    request_id: str
    tenant_id: str = "tenant_default"
    history: List[ChatMessage]
    user_context: Optional[dict] = None


class NegotiationResponse(BaseModel):
    request_id: str
    status: str
    output: str


class HealthResponse(BaseModel):
    status: str
    model: str
    version: str
