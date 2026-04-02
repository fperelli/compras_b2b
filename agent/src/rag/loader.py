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
SPEC_DIR = "agent/spec"
CHROMA_PATH = "agent/chroma_db"

def load_and_ingest_docs():
    """
    Reads markdown files from agent/spec/, splits them by headers,
    and ingests them into a local ChromaDB collection using local embeddings.
    """
    # 1. Gather all .md files in spec/
    md_files = glob.glob(os.path.join(SPEC_DIR, "*.md"))
    if not md_files:
        print(f"⚠️ No markdown files found in {SPEC_DIR}")
        return

    print(f"🔍 Found {len(md_files)} specification documents. Processing...")

    all_splits = []
    
    # Header splitting strategy for better context retrieval
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]
    markdown_splitter = MarkdownHeaderTextSplitter(headers_to_split_on=headers_to_split_on)

    for file_path in md_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            splits = markdown_splitter.split_text(content)
            
            # Add metadata about source file
            for s in splits:
                s.metadata["source"] = os.path.basename(file_path)
            
            all_splits.extend(splits)

    print(f"📖 Generated {len(all_splits)} chunks from specifications.")

    # 2. Initialize Local Embeddings (MiniLM-L6-v2 is small and efficient)
    print("🧠 Initializing local embeddings (MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # 3. Create/Update ChromaDB
    print(f"🚀 Ingesting to ChromaDB at {CHROMA_PATH}...")
    
    vectorstore = Chroma.from_documents(
        documents=all_splits,
        embedding=embeddings,
        persist_directory=CHROMA_PATH,
        collection_name="procurement_spec"
    )

    print("✅ Ingestion complete. Vector store is ready (Local Embeddings used).")

if __name__ == "__main__":
    load_and_ingest_docs()

if __name__ == "__main__":
    load_and_ingest_docs()
