// ── Google Gemini Service – via OpenRouter ──

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
 * Send a prompt to Gemini (via OpenRouter) and return the response text.
 * @param {string} prompt
 * @param {{ role: string, content: string }[]} history
 * @returns {Promise<string>}
 */
async function generateResponse(prompt, history = []) {
  const messages = [
    {
      role: "system",
      content:
        "You are Gemini, a creative and versatile AI assistant made by Google. You are participating in a multi-model chat room alongside GPT, Claude, and Grok. Always identify yourself as Gemini when relevant. Be creative, informative, and engaging.",
    },
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: prompt },
  ];

  const response = await getClient().chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages,
    max_tokens: 1024,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { generateResponse };
