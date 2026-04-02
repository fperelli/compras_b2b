"""
Tools for the B2B Procurement Negotiation Agent.
Connects to ChromaDB for RAG-based context retrieval using Local Embeddings.
"""
import os
from langchain_core.tools import tool
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from dotenv import load_dotenv

load_dotenv()

def get_supplier_tools(vector_store) -> list:
    """
    Fábrica que genera las herramientas LangChain conectadas a una instancia específica
    del almacén vectorial de ChromaDB (Inyección de Dependencias).
    """

    def _query_rag(query: str) -> str:
        """Helper internal para realizar búsquedas en el almacén vectorial."""
        if not vector_store:
            return "Aviso: Almacén vectorial RAG no conectado. Operando en base a conocimiento general y simulación."
        
        docs = vector_store.similarity_search(query, k=2)
        if not docs:
            return "No se encontró información relevante en los manuales de especificación corporativos."
        
        # Combinamos el contenido de los documentos encontrados
        context = "\n---\n".join([d.page_content for d in docs])
        return context

    @tool
    def get_supplier_history(supplier_id: str) -> str:
        """Recupera el historial de negociaciones previas y comportamiento de un proveedor específico."""
        query = f"Historial y comportamiento del proveedor {supplier_id}"
        return _query_rag(query)

    @tool
    def get_market_price(category: str) -> str:
        """Consulta benchmarks de precios de mercado y tendencias para una categoría de producto."""
        query = f"Benchmark de precios y tendencias de mercado para la categoría {category}"
        return _query_rag(query)

    @tool
    def validate_budget(request_id: str, max_price: float) -> str:
        """Valida el presupuesto asignado y los límites financieros para una solicitud de compra."""
        query = f"Políticas de validación de presupuesto y límites para {request_id}"
        context = _query_rag(query)
        return f"Límite de USD {max_price} evaluado contra políticas corporativas. Contexto: {context[:200]}..."

    @tool
    def evaluate_supplier_risk(supplier_id: str) -> str:
        """Evalúa el nivel de riesgo financiero, legal y operativo de un proveedor basándose en políticas de la empresa."""
        query = f"Evaluación de riesgo y cumplimiento (compliance) para el proveedor {supplier_id}"
        return _query_rag(query)

    return [
        get_supplier_history,
        get_market_price,
        validate_budget,
        evaluate_supplier_risk,
    ]
