from typing import Any, Dict, Optional
from .base import BaseAdapter

class WhatsAppAdapter(BaseAdapter):
    """
    Adaptador para WhatsApp (vía Meta Graph API o Twilio).
    """

    async def parse_incoming(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extrae el mensaje y el número del remitente del JSON de WhatsApp.
        """
        # Estructura simplificada de un webhook de Meta
        try:
            entry = payload.get("entry", [{}])[0]
            change = entry.get("changes", [{}])[0]
            value = change.get("value", {})
            message = value.get("messages", [{}])[0]
            
            return {
                "sender": message.get("from"),
                "text": message.get("text", {}).get("body"),
                "id": message.get("id"),
                "type": "whatsapp"
            }
        except (IndexError, KeyError):
            return {"error": "Invalid WhatsApp payload"}

    async def format_outgoing(self, agent_response: str, context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Formatea la respuesta para la API de WhatsApp.
        """
        recipient = context.get("sender") if context else None
        return {
            "messaging_product": "whatsapp",
            "to": recipient,
            "type": "text",
            "text": {"body": agent_response}
        }

    async def send_response(self, formatted_response: Dict[str, Any]) -> bool:
        """
        Aquí se haría el POST a https://graph.facebook.com/v17.0/FROM_PHONE_NUMBER_ID/messages
        """
        print(f"📱 [WhatsApp Output] Sending to {formatted_response.get('to')}: {formatted_response['text']['body']}")
        # Simulación de éxito
        return True
