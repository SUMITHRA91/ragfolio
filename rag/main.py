from __future__ import annotations

import sys

from rag_query import answer_question


def main() -> None:
    print("Resume Q&A chatbot (CLI)")
    print("Ask questions about the resume loaded into the vector store.")
    print("Type 'exit' or 'quit' to leave.\n")

    while True:
        try:
            question = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not question:
            continue
        if question.lower() in {"exit", "quit"}:
            print("Goodbye!")
            break

        try:
            answer = answer_question(question)
        except Exception as exc:  # noqa: BLE001
            print(
                "Error while answering your question:",
                exc,
                "\n\n"
                "Hints:\n"
                "- Make sure you've run 'python ingest.py' in the rag/ directory.\n"
                "- Ensure GEMINI_API_KEY is set in your environment.",
                file=sys.stderr,
            )
            continue

        print(f"AI: {answer}\n")


if __name__ == "__main__":
    main()

