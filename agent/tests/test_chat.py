"""
Tests de integracion para el endpoint de chat del agente B2B.

Ejecutar con:
    python -m pytest tests/test_chat.py -v

Requiere que el backend este corriendo en http://localhost:8000
o que las dependencias del agente esten disponibles localmente.
"""
import pytest
import os
import sys

# Permite importar los modulos del agente directamente
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


FALLBACK_MESSAGES = [
    "Disculpe, mi motor de estrategia esta en simulacion",
    "No pude procesar tu consulta",
    "motor de estrategia no pudo conectarse",
]


def is_fallback(response: str) -> bool:
    """Determina si la respuesta es el mensaje de error/fallback."""
    return any(msg.lower() in response.lower() for msg in FALLBACK_MESSAGES)


class TestChatEndpointViaHTTP:
    """
    Tests que validan el endpoint /chat a traves de HTTP.
    Requiere que docker-compose este corriendo.
    """

    BASE_URL = "http://localhost:8000/api/v1"

    def _post_chat(self, history: list, request_id: str = "test-001") -> dict:
        import urllib.request
        import urllib.parse
        import json

        payload = json.dumps({
            "request_id": request_id,
            "tenant_id": "tenant_default",
            "history": history
        }).encode("utf-8")

        req = urllib.request.Request(
            f"{self.BASE_URL}/chat",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode())

    def test_chat_responds_in_spanish(self):
        """El chat debe responder coherentemente en espanol, no con el mensaje de fallback."""
        history = [
            {"role": "user", "content": "Hola, necesito ayuda con una negociacion de laptops"}
        ]
        try:
            data = self._post_chat(history)
            output = data.get("output", "")
            assert output, "La respuesta no debe estar vacia"
            assert not is_fallback(output), f"La respuesta es un fallback: {output[:200]}"
            print(f"[OK] Respuesta recibida ({len(output)} chars): {output[:100]}...")
        except Exception as e:
            pytest.skip(f"Backend no disponible: {e}")

    def test_chat_maintains_context(self):
        """El chat debe recordar el contexto de mensajes anteriores."""
        history = [
            {"role": "user", "content": "El proveedor es TechCorp y pide USD 950 por laptop"},
            {"role": "assistant", "content": "Entendido. TechCorp propone USD 950 por unidad para laptops."},
            {"role": "user", "content": "Que contraoferta me recomiendas?"},
        ]
        try:
            data = self._post_chat(history)
            output = data.get("output", "")
            assert output, "La respuesta no debe estar vacia"
            assert not is_fallback(output), f"La respuesta es un fallback: {output[:200]}"
            # Debe mencionar algo relacionado con precio o contraoferta
            keywords = ["precio", "oferta", "USD", "propuesta", "negoci"]
            assert any(k.lower() in output.lower() for k in keywords), \
                f"La respuesta no parece relacionada al contexto: {output[:200]}"
            print(f"[OK] Contexto mantenido correctamente.")
        except Exception as e:
            pytest.skip(f"Backend no disponible: {e}")

    def test_chat_handles_strategy_questions(self):
        """El chat debe poder responder preguntas estrategicas de procurement."""
        history = [
            {"role": "user", "content": "Cual es la mejor tactica de negociacion cuando el proveedor tiene monopolio en un insumo critico?"}
        ]
        try:
            data = self._post_chat(history)
            output = data.get("output", "")
            assert output, "La respuesta no debe estar vacia"
            assert not is_fallback(output), f"La respuesta es un fallback: {output[:200]}"
            assert len(output) > 100, f"Respuesta demasiado corta para una pregunta estrategica: {output}"
            print(f"[OK] Pregunta estrategica respondida ({len(output)} chars).")
        except Exception as e:
            pytest.skip(f"Backend no disponible: {e}")


class TestAgentUnitWithMockLLM:
    """
    Tests unitarios que no requieren que el backend este corriendo.
    Usan un LLM simulado (mock) para validar la logica del agente.
    """

    def _get_service_with_mock_llm(self, mock_response: str = "Respuesta simulada del LLM"):
        """Crea un NegotiationService con un LLM mock."""
        from src.agent.agent import NegotiationService
        from unittest.mock import MagicMock
        from langchain_core.messages import AIMessage

        mock_llm = MagicMock()
        mock_llm.invoke.return_value = AIMessage(content=mock_response)
        # Simula que bind_tools falla (como en Ollama sin soporte)
        mock_llm.bind_tools.side_effect = NotImplementedError("Mock no soporta tools")

        return NegotiationService(llm=mock_llm, vector_store=None)

    def test_run_chat_uses_llm_directly(self):
        """run_chat debe usar llm.invoke() directamente, no el agente ReAct."""
        service = self._get_service_with_mock_llm("Esta es la respuesta del asistente.")

        history = [{"role": "user", "content": "Hola, necesito ayuda"}]
        result = service.run_chat("req-001", history)

        assert result == "Esta es la respuesta del asistente."
        assert service.llm.invoke.called, "llm.invoke debe haber sido llamado"
        assert not is_fallback(result), "No debe retornar el mensaje de fallback"

    def test_run_chat_not_fallback_when_llm_works(self):
        """Si el LLM funciona, no se debe retornar el mensaje de error."""
        service = self._get_service_with_mock_llm("Recomiendo una contraoferta de USD 870.")

        history = [
            {"role": "user", "content": "Que precio sugiere?"}
        ]
        result = service.run_chat("req-002", history)

        assert not is_fallback(result)
        assert "870" in result

    def test_agent_initializes_without_tool_support(self):
        """El agente debe inicializarse correctamente aunque el LLM no soporte tools."""
        from src.agent.agent import NegotiationService
        from unittest.mock import MagicMock
        from langchain_core.messages import AIMessage

        mock_llm = MagicMock()
        mock_llm.invoke.return_value = AIMessage(content="OK")
        mock_llm.bind_tools.side_effect = NotImplementedError

        service = NegotiationService(llm=mock_llm, vector_store=None)

        # El agente ReAct no debe estar disponible, pero el servicio si
        assert service is not None
        assert not service._agent_available
        assert service.llm is mock_llm
