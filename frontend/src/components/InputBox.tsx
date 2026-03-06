import { useState, type FormEvent, type KeyboardEvent } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

const MENTION_TAGS = ["@gpt", "@claude", "@gemini", "@grok", "@all"];

export default function InputBox({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
      {/* Quick mention buttons */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {MENTION_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className="text-xs px-2.5 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
            onClick={() => setText((prev) => `${tag} ${prev}`)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <textarea
          className="flex-1 bg-gray-800 rounded-xl px-4 py-2.5 text-sm resize-none outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          rows={1}
          placeholder="Type a message… e.g. @all what is recursion?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl text-sm font-medium transition"
        >
          Send
        </button>
      </div>
    </form>
  );
}
