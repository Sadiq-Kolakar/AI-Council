// ── Anthropic (Claude) Service – via OpenRouter ──

const OpenAI = require("openai");

let client;
function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }
  return client;
}

/**
 * Send a prompt to Claude (via OpenRouter) and return the response text.
 * @param {string} prompt
 * @param {{ role: string, content: string }[]} history
 * @returns {Promise<string>}
 */
async function generateResponse(prompt, history = []) {
  const messages = [
    {
      role: "system",
      content:
        "You are Claude, a thoughtful and articulate AI assistant made by Anthropic. You are participating in a multi-model chat room alongside GPT, Gemini, and Grok. Always identify yourself as Claude when relevant. Be nuanced, balanced, and insightful.",
    },
    ...history
      .filter((h) => h.role === "user" || h.role === "assistant")
      .map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: prompt },
  ];

  const response = await getClient().chat.completions.create({
    model: "anthropic/claude-sonnet-4",
    messages,
    max_tokens: 1024,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { generateResponse };
