import { useState, useCallback } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import type { Message, ChatApiResult } from "./types";

let nextId = 1;
function uid() {
  return String(nextId++);
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = useCallback(
    async (text: string) => {
      // Add user message to chat
      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: text,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        const data: ChatApiResult = await res.json();

        if (data.error) {
          setMessages((prev) => [
            ...prev,
            {
              id: uid(),
              role: "assistant",
              model: "System",
              content: data.error ?? "Unknown error",
              timestamp: Date.now(),
            },
          ]);
        } else if (data.responses) {
          const aiMsgs: Message[] = data.responses.map((r) => ({
            id: uid(),
            role: "assistant",
            model: r.model,
            content: r.text,
            timestamp: Date.now(),
          }));
          setMessages((prev) => [...prev, ...aiMsgs]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            model: "System",
            content: "Failed to reach the backend. Is it running on port 5000?",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <h1 className="text-lg font-bold tracking-tight">
          🧠 AI Council Chat
        </h1>
        <span className="text-xs text-gray-500">
          Mention @gpt · @claude · @gemini · @grok · @all
        </span>
      </header>

      {/* Chat area */}
      <ChatWindow messages={messages} loading={loading} />

      {/* Input */}
      <InputBox onSend={handleSend} disabled={loading} />
    </div>
  );
}
