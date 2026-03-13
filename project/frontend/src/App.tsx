import React, { FormEvent, useState } from "react";

type Role = "user" | "assistant";

interface Message {
  id: number;
  role: Role;
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/ask";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    const id = counter + 1;
    setCounter(id);

    const userMessage: Message = {
      id,
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const detail =
          (errorBody && (errorBody.detail as string | undefined)) ??
          "Unknown error from server.";
        throw new Error(detail);
      }

      const data = (await response.json()) as { answer: string };
      const aiMessage: Message = {
        id: id + 0.1,
        role: "assistant",
        content: data.answer,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error occurred.";
      const aiMessage: Message = {
        id: id + 0.1,
        role: "assistant",
        content: `Error: ${message}`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-950/80 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[80vh]">
        <header className="px-6 py-4 border-b border-slate-800">
          <h1 className="text-lg font-semibold text-slate-50">
            Resume RAG Chatbot
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ask questions about the resume. Answers are grounded in the resume
            content using a RAG pipeline.
          </p>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 text-sm mt-8">
              Start by asking something like{" "}
              <span className="italic">
                &quot;What projects has this person worked on?&quot;
              </span>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-slate-800 text-slate-100 rounded-bl-sm"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-300 rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
                Thinking...
              </div>
            </div>
          )}
        </main>

        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-800 px-4 py-3 flex gap-2"
        >
          <input
            type="text"
            className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ask a question about the resume..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

