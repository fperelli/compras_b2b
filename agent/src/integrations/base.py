from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class BaseAdapter(ABC):
    """
    Clase base abstracta para todos los adaptadores de integración.
    Define el contrato para recibir mensajes de canales externos y 
    enviar respuestas de vuelta.
    """

    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id

    @abstractmethod
    async def parse_incoming(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Toma el payload crudo del canal (WhatsApp, Slack, etc.) y lo
        convierte a un formato interno estándar (ChatRequest).
        """
        pass

    @abstractmethod
    async def format_outgoing(self, agent_response: str, context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Toma la respuesta del agente y la formatea según los requisitos
        específicos del canal de salida.
        """
        pass

    @abstractmethod
    async def send_response(self, formatted_response: Dict[str, Any]) -> bool:
        """
        Envía la respuesta final al servicio externo (ej. llamada a la API de Meta).
        """
        pass
