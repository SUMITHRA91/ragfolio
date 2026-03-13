import os
from typing import List

import chromadb
from sentence_transformers import SentenceTransformer


EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
CHROMA_DB_DIR = os.path.join(os.path.dirname(__file__), "chroma_db")
COLLECTION_NAME = "resume_chunks"


def chunk_text(text: str, max_chars: int = 500) -> List[str]:
    """
    Split the input text into chunks of roughly max_chars characters.

    This implementation prefers to break on double newlines or single newlines
    where possible so that chunks stay semantically coherent.
    """
    text = text.strip()
    if not text:
        return []

    # First split into paragraphs by double newline
    paragraphs = text.split("\n\n")
    chunks: List[str] = []
    current = ""

    def flush_current():
        nonlocal current
        if current.strip():
            chunks.append(current.strip())
        current = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # If adding this paragraph would exceed max_chars, flush and start new
        if len(current) + len(para) + 2 > max_chars:
            if len(para) > max_chars:
                # Paragraph itself is too big: split by single newlines
                lines = para.split("\n")
                for line in lines:
                    line = line.strip()
                    if not line:
                        continue
                    if len(current) + len(line) + 1 > max_chars:
                        flush_current()
                    current = (current + " " + line).strip()
                flush_current()
            else:
                flush_current()
                current = para
        else:
            # Safe to append to current chunk
            if current:
                current = current + "\n\n" + para
            else:
                current = para

    flush_current()
    return chunks


def build_vector_store(resume_path: str = None) -> None:
    """Load resume.txt, create chunks, embed them, and store in ChromaDB."""
    if resume_path is None:
        resume_path = os.path.join(os.path.dirname(__file__), "resume.txt")

    if not os.path.exists(resume_path):
        raise FileNotFoundError(f"Could not find resume file at {resume_path}")

    with open(resume_path, "r", encoding="utf-8") as f:
        text = f.read()

    chunks = chunk_text(text, max_chars=500)
    if not chunks:
        raise ValueError("No text chunks were created from resume.txt")

    print(f"Loaded resume with {len(text)} characters.")
    print(f"Created {len(chunks)} chunks.")

    model = SentenceTransformer(EMBEDDING_MODEL_NAME)

    print("Computing embeddings...")
    embeddings = model.encode(chunks, show_progress_bar=True)

    os.makedirs(CHROMA_DB_DIR, exist_ok=True)
    client = chromadb.PersistentClient(path=CHROMA_DB_DIR)

    # Create or get collection
    collection = client.get_or_create_collection(name=COLLECTION_NAME)

    # Clear any existing data so re-running ingestion replaces it
    if collection.count() > 0:
        collection.delete(where={})

    ids = [f"chunk-{i}" for i in range(len(chunks))]
    metadatas = [{"index": i} for i in range(len(chunks))]

    print("Storing embeddings in ChromaDB...")
    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist(),
        metadatas=metadatas,
    )

    print(f"Stored {len(chunks)} chunks in ChromaDB at {CHROMA_DB_DIR}.")


def main() -> None:
    build_vector_store()


if __name__ == "__main__":
    main()

