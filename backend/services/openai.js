// ── OpenAI (GPT) Service – via OpenRouter ──

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
 * Send a prompt to GPT (via OpenRouter) and return the response text.
 * @param {string} prompt
 * @param {{ role: string, content: string }[]} history
 * @returns {Promise<string>}
 */
async function generateResponse(prompt, history = []) {
  const messages = [
    {
      role: "system",
      content:
        "You are GPT, a helpful and knowledgeable AI assistant made by OpenAI. You are participating in a multi-model chat room alongside Claude, Gemini, and Grok. Always identify yourself as GPT when relevant. Be informative, clear, and helpful.",
    },
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: prompt },
  ];

  const response = await getClient().chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages,
    max_tokens: 1024,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { generateResponse };
