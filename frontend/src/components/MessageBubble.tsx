import type { Message } from "../types";
import { MODEL_COLORS, MODEL_BG } from "../types";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] bg-indigo-600 rounded-2xl rounded-br-sm px-4 py-2.5 shadow">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <span className="block text-[10px] text-indigo-300 text-right mt-1">
            {time}
          </span>
        </div>
      </div>
    );
  }

  // AI response
  const model = message.model ?? "AI";
  const colorClass = MODEL_COLORS[model] ?? "text-gray-300";
  const bgClass = MODEL_BG[model] ?? "bg-gray-800/50 border-gray-700";

  return (
    <div className="flex justify-start">
      <div
        className={`max-w-[75%] border rounded-2xl rounded-bl-sm px-4 py-2.5 shadow ${bgClass}`}
      >
        <span className={`text-xs font-semibold ${colorClass}`}>{model}</span>
        <p className="text-sm whitespace-pre-wrap mt-1 text-gray-100">
          {message.content}
        </p>
        <span className="block text-[10px] text-gray-500 text-right mt-1">
          {time}
        </span>
      </div>
    </div>
  );
}
