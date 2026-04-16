"""
Main negotiation agent using LangGraph ReAct + Dependency Injection.

Architecture:
    SystemMessage + HumanMessage -> NegotiationService -> create_react_agent (tool loop) -> final AIMessage
    For chat: messages -> llm.invoke() directly (compatible with all Ollama models)
"""
from typing import List, Optional
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from langgraph.prebuilt import create_react_agent
from langchain_chroma import Chroma

from .tools import get_supplier_tools
from .prompts import build_system_prompt, build_chat_system_prompt

from langchain_core.language_models.chat_models import BaseChatModel

class NegotiationService:
    """
    Servicio Core que encapsula la logica de negociacion B2B.
    Utiliza Inyeccion de Dependencias para el LLM y el almacen vectorial.
    """
    def __init__(self, llm: BaseChatModel, vector_store: Optional[Chroma]):
        self.llm = llm
        self.vector_store = vector_store
        self.tools = get_supplier_tools(self.vector_store)
        self.system_prompt = build_system_prompt()
        self.chat_system_prompt = build_chat_system_prompt()
        self._agent_available = False

        # El agente ReAct con herramientas requiere soporte de tool-calling en el LLM.
        # La mayoria de los modelos base de Ollama no lo soportan, asi que lo intentamos
        # de forma resiliente y degradamos gracefully si falla.
        try:
            self.agent = create_react_agent(
                model=self.llm,
                tools=self.tools,
            )
            self._agent_available = True
            print("[OK] ReAct Agent con herramientas inicializado correctamente.")
        except Exception as e:
            self.agent = None
            print(f"[WARN] ReAct Agent no disponible (el modelo no soporta tool-calling): {e}")
            print("    -> Modo conversacional activo. El chat funcionara correctamente.")

    def _format_negotiation_message(self, r: dict) -> str:
        """Formatea el requerimiento de compra como mensaje de entrada para el agente."""
        restrictions = r.get("restrictions") or "Ninguna especifica"
        return f"""Analiza el siguiente requerimiento de compra B2B y ejecuta el proceso completo de negociacion.

PROVEEDOR: {r['supplier_name']} (ID: {r['supplier_id']})
CATEGORIA: {r['category']}
VOLUMEN: {r['volume']} unidades
PRECIO OBJETIVO: ${r['target_price']:,.2f} por unidad
PRECIO MAXIMO: ${r['max_price']:,.2f} por unidad
PAGO: {r['payment_terms']}
FECHA: {r['required_date']}
ID: {r['request_id']}
RESTRICCIONES: {restrictions}

Si tienes herramientas disponibles, ejecutalas en orden:
1. get_supplier_history con supplier_id="{r['supplier_id']}"
2. get_market_price con category="{r['category']}"
3. validate_budget con request_id="{r['request_id']}" y max_price={r['max_price']}
4. evaluate_supplier_risk con supplier_id="{r['supplier_id']}"

Luego genera una respuesta estructurada con: analisis de contexto, hacks tacticos, riesgos, mensaje al proveedor, oferta inicial recomendada y matriz de concesion.

LIMITE ABSOLUTO: No exceder ${r['max_price']:,.2f} por unidad."""

    def _format_counteroffer_message(self, r: dict) -> str:
        """Formatea una solicitud de contraoferta como mensaje para el agente."""
        return f"""El proveedor respondio a nuestra oferta inicial. Genera una contraoferta.

PROVEEDOR: {r['supplier_name']} (ID: {r['supplier_id']})
CATEGORIA: {r['category']}
PRECIO OBJETIVO ORIGINAL: ${r['original_target_price']:,.2f}
PRECIO MAXIMO PERMITIDO: ${r['max_price']:,.2f}
PAGO: {r['payment_terms']}
ETAPA: {r.get('negotiation_stage', 'negotiation')}

RESPUESTA DEL PROVEEDOR:
Precio propuesto: ${r['supplier_response_price']:,.2f}
Mensaje: "{r['supplier_message']}"

Evalua si el precio del proveedor es aceptable. Genera contraoferta con concesiones graduales del 1-3%.
LIMITE ABSOLUTO: No puede exceder ${r['max_price']:,.2f} por unidad."""

    async def run_negotiation(self, request_data: dict) -> str:
        """Ejecuta una negociacion completa para un requerimiento de compra."""
        message = self._format_negotiation_message(request_data)
        messages = [
            SystemMessage(content=self.system_prompt),
            HumanMessage(content=message),
        ]

        if self._agent_available and self.agent:
            try:
                # Usamos ainvoke para no bloquear el hilo principal
                result = await self.agent.ainvoke({"messages": messages})
                return result["messages"][-1].content
            except Exception as e:
                print(f"[ERROR] Agent failed: {e}")
                return f"Error en el agente: {str(e)}"
        
        # Fallback si el agente no esta disponible (modelos sin tool-calling)
        return await self._run_llm_direct(messages)

    async def run_counteroffer(self, request_data: dict) -> str:
        """Genera una contraoferta basada en la respuesta del proveedor."""
        message = self._format_counteroffer_message(request_data)
        messages = [
            SystemMessage(content=self.system_prompt),
            HumanMessage(content=message),
        ]

        if self._agent_available and self.agent:
            try:
                result = await self.agent.ainvoke({"messages": messages})
                return result["messages"][-1].content
            except Exception as e:
                print(f"[ERROR] Counteroffer failed: {e}")
                return f"Error en el agente: {str(e)}"
        
        return await self._run_llm_direct(messages)

    async def _run_llm_direct(self, messages: List) -> str:
        """Helper para ejecutar LLM directo de forma asincrona."""
        try:
            result = await self.llm.ainvoke(messages)
            return result.content
        except Exception as e:
            print(f"[ERROR] LLM directo fallo: {e}")
            return "No se pudo generar la respuesta. Verifique la conexion con el modelo de lenguaje."

    async def run_chat(self, request_id: str, history: List[dict]) -> str:
        """
        Continua una conversacion interactiva con el asistente de estrategia.

        Usa llm.invoke() DIRECTAMENTE (no el agente ReAct con herramientas),
        por lo que es compatible con cualquier modelo Ollama, incluyendo los que
        no soportan tool-calling (Llama3 base, Mistral base, etc.).
        """
        messages = [SystemMessage(content=self.chat_system_prompt)]

        for msg in history:
            if msg['role'] == 'user':
                messages.append(HumanMessage(content=msg['content']))
            elif msg['role'] == 'assistant':
                messages.append(AIMessage(content=msg['content']))

        try:
            result = await self.llm.ainvoke(messages)
            return result.content
        except Exception as e:
            print(f"[ERROR] Chat LLM Error: {e}")
            return (
                "No pude procesar tu consulta en este momento. "
                "Asegurate de que el modelo este disponible: "
                "`docker exec -it b2b-ollama ollama pull llama3`"
            )
