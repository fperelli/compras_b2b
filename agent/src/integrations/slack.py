from typing import Any, Dict, Optional
from .base import BaseAdapter

class SlackAdapter(BaseAdapter):
    """
    Adaptador para Slack (vía Bolt o Webhooks).
    """

    async def parse_incoming(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extrae el mensaje y el canal del evento de Slack.
        """
        event = payload.get("event", {})
        return {
            "channel": event.get("channel"),
            "user": event.get("user"),
            "text": event.get("text"),
            "type": "slack"
        }

    async def format_outgoing(self, agent_response: str, context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Formatea la respuesta para la API de Slack.
        """
        return {
            "channel": context.get("channel") if context else None,
            "text": agent_response,
            "blocks": [
                {
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": agent_response}
                }
            ]
        }

    async def send_response(self, formatted_response: Dict[str, Any]) -> bool:
        """
        Aquí se haría el POST a https://slack.com/api/chat.postMessage
        """
        print(f"💬 [Slack Output] Sending to {formatted_response.get('channel')}: {formatted_response['text']}")
        return True
