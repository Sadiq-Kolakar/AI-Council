// ── Types shared across the frontend ──

export interface Message {
  id: string;
  role: "user" | "assistant";
  model?: string;          // e.g. "GPT", "Claude", "Gemini", "Grok"
  content: string;
  timestamp: number;
}

export interface ApiResponse {
  model: string;
  text: string;
}

export interface ChatApiResult {
  responses?: ApiResponse[];
  error?: string;
}

/** Colour map for each AI model label */
export const MODEL_COLORS: Record<string, string> = {
  GPT:    "text-green-400",
  Claude: "text-orange-400",
  Gemini: "text-blue-400",
  Grok:   "text-red-400",
};

export const MODEL_BG: Record<string, string> = {
  GPT:    "bg-green-400/10 border-green-400/20",
  Claude: "bg-orange-400/10 border-orange-400/20",
  Gemini: "bg-blue-400/10 border-blue-400/20",
  Grok:   "bg-red-400/10 border-red-400/20",
};
