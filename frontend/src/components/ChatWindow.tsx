import { useRef, useEffect } from "react";
import type { Message } from "../types";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: Message[];
  loading: boolean;
}

export default function ChatWindow({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-3">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
          <span className="text-4xl">🤖</span>
          <p className="text-lg font-medium">Welcome to AI Council Chat</p>
          <p className="text-sm text-gray-600">
            Mention <code className="text-indigo-400">@gpt</code>,{" "}
            <code className="text-indigo-400">@claude</code>,{" "}
            <code className="text-indigo-400">@gemini</code>,{" "}
            <code className="text-indigo-400">@grok</code>, or{" "}
            <code className="text-indigo-400">@all</code> to start chatting.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-400 pl-2">
          <span className="flex gap-1">
            <span className="animate-bounce [animation-delay:0ms] w-2 h-2 rounded-full bg-indigo-400" />
            <span className="animate-bounce [animation-delay:150ms] w-2 h-2 rounded-full bg-indigo-400" />
            <span className="animate-bounce [animation-delay:300ms] w-2 h-2 rounded-full bg-indigo-400" />
          </span>
          <span className="text-sm">AI models are thinking…</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
