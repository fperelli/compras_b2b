import os
from functools import lru_cache
from typing import Optional
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from fastapi import Depends
from src.agent.agent import NegotiationService

# Configuración Vector Store
CHROMA_PATH = "chroma_db"
COLLECTION_NAME = "procurement_spec"

def get_vector_store(tenant_id: str) -> Optional[Chroma]:
    """
    Inicializa y devuelve el almacén vectorial de ChromaDB específico para un tenant.
    """
    try:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        tenant_collection = f"procurement_spec_{tenant_id}"
        return Chroma(
            persist_directory=CHROMA_PATH,
            embedding_function=embeddings,
            collection_name=tenant_collection
        )
    except Exception as e:
        print(f"⚠️ Warning: Could not initialize ChromaDB for tenant {tenant_id}: {e}")
        return None


from langchain_core.language_models.chat_models import BaseChatModel

@lru_cache()
def get_llm() -> BaseChatModel:
    """
    Inicializa y devuelve el modelo de lenguaje elegido según LLM_PROVIDER.
    """
    provider = os.environ.get("LLM_PROVIDER", "ollama").lower()
    
    if provider == "gemini":
        api_key = os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError(
                "GOOGLE_API_KEY no encontrada. "
                "Asegúrate de configurarla en el entorno para usar Gemini."
            )
        return ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=api_key,
            temperature=0.1,
        )
    else:
        # Default to Ollama via dedicated package that supports tool binding
        from langchain_ollama import ChatOllama
        base_url = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
        model = os.environ.get("OLLAMA_MODEL", "llama3")
        return ChatOllama(
            model=model, 
            base_url=base_url,
            temperature=0.1
        )


def get_negotiation_service(tenant_id: str) -> NegotiationService:
    """
    Instancia el servicio core de negociación con el RAG específico del tenant.
    """
    llm = get_llm()
    vector_store = get_vector_store(tenant_id)
    return NegotiationService(llm=llm, vector_store=vector_store)
