import os
import glob
from typing import List
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import MarkdownHeaderTextSplitter
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

# Constants
SPEC_DIR = "spec"
CHROMA_PATH = "chroma_db"

def load_and_ingest_docs():
    """
    Lee las carpetas dentro de agent/spec/ (donde cada carpeta es un tenant_id),
    fragmenta los archivos markdown y los ingesta en ChromaDB en colecciones separadas.
    """
    if not os.path.exists(SPEC_DIR):
        print(f"⚠️ Directory {SPEC_DIR} not found.")
        return

    print("🧠 Initializing local embeddings (MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]
    markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)

    # 1. Iterate over each Tenant directory
    tenant_folders = [d for d in os.listdir(SPEC_DIR) if os.path.isdir(os.path.join(SPEC_DIR, d))]
    
    if not tenant_folders:
        print(f"⚠️ No tenant directories found inside {SPEC_DIR}")
        return

    for tenant in tenant_folders:
        tenant_path = os.path.join(SPEC_DIR, tenant)
        md_files = glob.glob(os.path.join(tenant_path, "*.md"))
        
        if not md_files:
            continue

        print(f"\n🏢 Processing Tenant: {tenant}")
        print(f"🔍 Found {len(md_files)} documents...")

        all_splits = []
        for file_path in md_files:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                splits = markdown_splitter.split_text(content)
                
                for s in splits:
                    s.metadata["source"] = os.path.basename(file_path)
                    s.metadata["tenant"] = tenant
                
                all_splits.extend(splits)

        print(f"📖 Generated {len(all_splits)} chunks. Ingesting to collection: procurement_spec_{tenant}")
        
        # Ingest to the specific collection for this tenant
        vectorstore = Chroma.from_documents(
            documents=all_splits,
            embedding=embeddings,
            persist_directory=CHROMA_PATH,
            collection_name=f"procurement_spec_{tenant}"
        )

    print("\n✅ Multi-tenant ingestion complete. All vector stores ready.")


def ingest_tenant_docs(tenant_id: str):
    """
    Lee los documentos de un tenant específico, resetea su colección en ChromaDB 
    y los ingesta nuevamente. Esto asegura que no haya duplicados tras una subida.
    """
    tenant_path = os.path.join(SPEC_DIR, tenant_id)
    if not os.path.exists(tenant_path) or not os.path.isdir(tenant_path):
        raise ValueError(f"Tenant directory not found: {tenant_path}")

    md_files = glob.glob(os.path.join(tenant_path, "*.md"))
    if not md_files:
        print(f"No markdown files found for tenant {tenant_id}")
        return

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    collection_name = f"procurement_spec_{tenant_id}"

    # Connect to Chroma and try to delete existing collection to avoid duplicates
    import chromadb
    client = chromadb.PersistentClient(path=CHROMA_PATH)
    try:
        client.delete_collection(name=collection_name)
        print(f"🗑️  Deleted existing collection: {collection_name}")
    except ValueError:
        pass # Collection didn't exist

    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]
    markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)

    all_splits = []
    for file_path in md_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            splits = markdown_splitter.split_text(content)
            
            for s in splits:
                s.metadata["source"] = os.path.basename(file_path)
                s.metadata["tenant"] = tenant_id
            
            all_splits.extend(splits)

    print(f"📖 Generated {len(all_splits)} chunks for {tenant_id}. Ingesting...")
    
    # Ingest anew
    Chroma.from_documents(
        documents=all_splits,
        embedding=embeddings,
        persist_directory=CHROMA_PATH,
        collection_name=collection_name
    )
    print(f"✅ Ingestion for {tenant_id} complete.")

if __name__ == "__main__":
    load_and_ingest_docs()
