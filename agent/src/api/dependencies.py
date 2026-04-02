import os
from functools import lru_cache
from typing import Optional
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from fastapi import Depends
from agent.src.agent.agent import NegotiationService

# Configuración Vector Store
CHROMA_PATH = "agent/chroma_db"
COLLECTION_NAME = "procurement_spec"

@lru_cache()
def get_vector_store() -> Optional[Chroma]:
    """
    Inicializa y devuelve el almacén vectorial de ChromaDB.
    Se cachea para evitar instanciaciones repetitivas.
    """
    try:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        return Chroma(
            persist_directory=CHROMA_PATH,
            embedding_function=embeddings,
            collection_name=COLLECTION_NAME
        )
    except Exception as e:
        print(f"⚠️ Warning: Could not initialize ChromaDB: {e}")
        return None


@lru_cache()
def get_llm() -> ChatGoogleGenerativeAI:
    """
    Inicializa y devuelve el modelo de lenguaje elegido.
    """
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError(
            "GOOGLE_API_KEY no encontrada. "
            "Asegúrate de configurarla en el entorno."
        )

    return ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=api_key,
        temperature=0.1,
    )


def get_negotiation_service(
    llm: ChatGoogleGenerativeAI = Depends(get_llm),
    vector_store: Optional[Chroma] = Depends(get_vector_store)
) -> NegotiationService:
    """
    Inyecta el LLM y el almacén vectorial para instanciar el servicio core de negociación.
    """
    return NegotiationService(llm=llm, vector_store=vector_store)
