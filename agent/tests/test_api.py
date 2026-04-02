import pytest
from httpx import AsyncClient, ASGITransport
from agent.src.api.main import app
from agent.src.api.dependencies import get_negotiation_service

class FakeNegotiationService:
    def run_negotiation(self, data):
        return "### 1. Tácticas\n- Mock tactic 1\n### 2. Riesgos\n- Mock risk"
        
    def run_counteroffer(self, data):
        return "Respuesta de contraoferta de prueba"
        
    def run_chat(self, req_id, hist):
        return "Respuesta del arquitecto de prueba"

def get_fake_service():
    return FakeNegotiationService()

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

@pytest.mark.asyncio
async def test_negotiate_endpoint():
    app.dependency_overrides[get_negotiation_service] = get_fake_service
    
    test_payload = {
        "request_id": "REQ-TEST",
        "supplier_id": "SUP-001",
        "supplier_name": "Test Supplier",
        "category": "laptops",
        "volume": 10,
        "target_price": 500.0,
        "max_price": 600.0,
        "payment_terms": "net_30",
        "required_date": "2026-01-01"
    }
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/negotiate", json=test_payload)
        
    assert response.status_code == 200
    assert "Mock tactic 1" in response.json()["output"]
    
    app.dependency_overrides.clear()

@pytest.mark.asyncio
async def test_chat_endpoint():
    app.dependency_overrides[get_negotiation_service] = get_fake_service
    
    test_payload = {
        "request_id": "REQ-TEST",
        "history": [
            {"role": "user", "content": "Hola arquitecto"},
            {"role": "assistant", "content": "Hola, ¿en qué ayudo?"},
            {"role": "user", "content": "¿Cuál es el riesgo?"}
        ]
    }
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/chat", json=test_payload)
        
    assert response.status_code == 200
    assert response.json()["output"] == "Respuesta del arquitecto de prueba"
    
    app.dependency_overrides.clear()
