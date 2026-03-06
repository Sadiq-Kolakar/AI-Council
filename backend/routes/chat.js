// ── Chat Router ──
// Parses mentions, fans out to the right AI services, returns aggregated responses.

const express = require("express");
const router = express.Router();

const openaiService = require("../services/openai");
const claudeService = require("../services/claude");
const geminiService = require("../services/gemini");
const grokService = require("../services/grok");

// Map of mention tag → service module (all use OPENROUTER_API_KEY)
const MODEL_MAP = {
  gpt: { name: "GPT", service: openaiService },
  claude: { name: "Claude", service: claudeService },
  gemini: { name: "Gemini", service: geminiService },
  grok: { name: "Grok", service: grokService },
};

/**
 * Extract mention tags from a message.
 * Returns an array of lowercase tags (e.g. ["gpt", "claude"]) and the cleaned prompt.
 */
function parseMentions(message) {
  const mentionRegex = /@(gpt|claude|gemini|grok|all)\b/gi;
  const mentions = [];
  let match;
  while ((match = mentionRegex.exec(message)) !== null) {
    mentions.push(match[1].toLowerCase());
  }
  // Strip mentions from the prompt
  const prompt = message.replace(mentionRegex, "").trim();
  return { mentions, prompt };
}

/**
 * POST /api/chat
 * Body: { message: string, history?: { role: string, content: string }[] }
 */
router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const { mentions, prompt } = parseMentions(message);

    // No mentions = treat as @all
    const isAll = mentions.length === 0 || mentions.includes("all");
    const targetKeys = isAll
      ? Object.keys(MODEL_MAP)
      : [...new Set(mentions)]; // deduplicate

    // Check if OpenRouter key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(400).json({
        error: "OPENROUTER_API_KEY is not configured. Check your .env file.",
      });
    }

    // Build concurrent requests
    const tasks = targetKeys
      .filter((key) => MODEL_MAP[key])
      .map(async (key) => {
        const { name, service } = MODEL_MAP[key];
        try {
          const text = await service.generateResponse(prompt, history);
          return { model: name, text };
        } catch (err) {
          console.error(`[${name}] Error:`, err.message);
          return { model: name, text: `⚠️ Error: ${err.message}` };
        }
      });

    if (tasks.length === 0) {
      return res.status(400).json({
        error: "No API keys configured for the requested models. Check your .env file.",
      });
    }

    // Fire all requests concurrently
    const responses = await Promise.all(tasks);

    return res.json({ responses });
  } catch (err) {
    console.error("Chat route error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
