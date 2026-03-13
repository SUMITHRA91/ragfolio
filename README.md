# ragfolio

## Resume RAG – CLI

- Navigate to the `rag/` directory:

  ```bash
  cd rag
  ```

- Ensure `resume.txt` contains the resume you want to query.
- Install Python dependencies:

  ```bash
  pip install -r requirements.txt
  ```

- Build the vector store (ChromaDB) from the resume:

  ```bash
  python ingest.py
  ```

- Export your Gemini API key (you already have it in `.env`, but for a shell session you can run):

  ```bash
  export GEMINI_API_KEY="YOUR_API_KEY_HERE"
  ```

- Start the CLI chatbot:

  ```bash
  python main.py
  ```

Then ask questions like:

- `What projects has this person worked on?`
- `What are their strongest skills?`
- `Summarize their experience.`

All answers are generated using the retrieved resume context.

## Resume RAG – FastAPI backend

- Navigate to the backend directory:

  ```bash
  cd project/backend
  ```

- Install backend dependencies:

  ```bash
  pip install -r requirements.txt
  ```

- Make sure you have already run `python ingest.py` in `rag/` so that the ChromaDB directory exists (the backend points to `rag/chroma_db`).
- Ensure `GEMINI_API_KEY` is set in your environment.
- Start the API server:

  ```bash
  uvicorn main:app --reload
  ```

The backend exposes:

- `POST /ask` with JSON body:

  ```json
  {
    "question": "What projects has this student built?"
  }
  ```

It returns:

```json
{
  "answer": "AI response"
}
```

## Resume RAG – React + Vite + Tailwind frontend

- Navigate to the frontend directory:

  ```bash
  cd project/frontend
  ```

- Install dependencies:

  ```bash
  npm install
  ```

- (Optional) Configure a custom backend URL via Vite env:

  ```bash
  # .env.local in project/frontend or exported before npm run dev
  VITE_API_URL="http://localhost:8000/ask"
  ```

  If you do not set this, the frontend defaults to `http://localhost:8000/ask`.

- Start the Vite dev server:

  ```bash
  npm run dev
  ```

- Open the printed local URL (typically `http://localhost:5173`) in your browser.

You will see a centered chat interface:

- Input box and send button.
- Message history with user messages on the right and AI responses on the left.
- All answers are produced by calling the FastAPI backend, which runs the RAG retrieval over the resume and then calls Gemini.

