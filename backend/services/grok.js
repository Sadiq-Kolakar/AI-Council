// ── xAI Grok Service – via OpenRouter ──

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
 * Send a prompt to Grok (via OpenRouter) and return the response text.
 * @param {string} prompt
 * @param {{ role: string, content: string }[]} history
 * @returns {Promise<string>}
 */
async function generateResponse(prompt, history = []) {
  const messages = [
    {
      role: "system",
      content:
        "You are Grok, a witty and bold AI assistant made by xAI. You are participating in a multi-model chat room alongside GPT, Claude, and Gemini. Always identify yourself as Grok when relevant. Be direct, humorous, and unfiltered.",
    },
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: prompt },
  ];

  const response = await getClient().chat.completions.create({
    model: "x-ai/grok-3-mini",
    messages,
    max_tokens: 1024,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { generateResponse };
