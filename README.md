#  AI Council 

A real-time multi-AI chat arena where you can converse with GPT, Claude, Gemini, and Grok — all in one interface. Ask one model or pit them all against each other.

![AI Council Chat](https://img.shields.io/badge/React-19-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

##  Features

- **Multi-Model Chat** — Talk to GPT-4o, Claude Sonnet, Gemini Flash, and Grok simultaneously
- **Mention System** — Use `@gpt`, `@claude`, `@gemini`, `@grok` to target specific models, or just send a message to query all
- **`@all` Support** — Explicitly ask all models at once and compare responses side-by-side
- **Real-time Responses** — All models respond concurrently via parallel API calls
- **Model Identity** — Each AI maintains its own personality and identifies itself correctly
- **Dark Mode UI** — Sleek, modern interface built with Tailwind CSS
- **Animated Landing Page** — Hero section with animated SVG paths and interactive image accordion
- **shadcn/ui Components** — Clean, accessible component architecture
- **Framer Motion Animations** — Smooth transitions and micro-interactions
- **Responsive Design** — Works on mobile, tablet, and desktop

---

##  Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for blazing-fast dev server and builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component architecture
- **Framer Motion** for animations
- **Radix UI** primitives

### Backend
- **Node.js** with Express
- **OpenRouter API** — single API key routes to all 4 AI models
- Concurrent request handling with `Promise.all`

---

##  Project Structure

```
ai-council-chat/
├── backend/
│   ├── server.js              # Express server entry point
│   ├── routes/
│   │   └── chat.js            # Chat API route with mention parsing
│   ├── services/
│   │   ├── openai.js          # GPT service (via OpenRouter)
│   │   ├── claude.js          # Claude service (via OpenRouter)
│   │   ├── gemini.js          # Gemini service (via OpenRouter)
│   │   └── grok.js            # Grok service (via OpenRouter)
│   ├── .env                   # API keys (not committed)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main chat application
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx # Chat message display
│   │   │   ├── InputBox.tsx   # Message input with mention support
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── background-paths.tsx
│   │   │   │   └── interactive-image-accordion.tsx
│   │   │   └── demo/          # Demo wrappers
│   │   ├── lib/
│   │   │   └── utils.ts       # cn() utility
│   │   └── pages/
│   │       └── landing.tsx    # Landing page
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
└── .gitignore
```

---

##  Getting Started

### Prerequisites

- **Node.js** 18+
- An **OpenRouter** API key — [Get one here](https://openrouter.ai/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Council.git
cd AI-Council
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
PORT=5000
```

Start the server:

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

##  How to Use

| Eg. Commands | Action |
|---|---|
| `@gpt What is gravity?` | Ask only GPT |
| `@claude Explain quantum computing` | Ask only Claude |
| `@gemini Write a poem` | Ask only Gemini |
| `@grok Tell me a joke` | Ask only Grok |
| `@all Compare React vs Vue` | Ask all 4 models |
| `What is the meaning of life?` | No mention = asks all models |
| `@gpt @claude Who's smarter?` | Ask specific multiple models |

---

##  UI Components

### Background Paths (Hero)
Animated SVG path background with spring-animated title text and CTA button. Built with Framer Motion.

### Interactive Image Accordion
Hover-to-expand image panels with smooth width transitions, gradient overlays, and Unsplash imagery. Supports horizontal scrolling on mobile.

### shadcn Button
Fully variant-based button component using Class Variance Authority (CVA) with support for `default`, `destructive`, `outline`, `secondary`, `ghost`, and `link` variants.

---

##  Configuration

### Models

Each model is routed through OpenRouter with its own system prompt:

| Model | OpenRouter ID | Persona |
|---|---|---|
| GPT | `openai/gpt-4o-mini` | Helpful, clear, informative |
| Claude | `anthropic/claude-sonnet-4` | Thoughtful, balanced, insightful |
| Gemini | `google/gemini-2.0-flash-001` | Creative, versatile, engaging |
| Grok | `x-ai/grok-3-mini` | Witty, bold, unfiltered |

---

##  License

MIT License. See [LICENSE](LICENSE) for details.

---

##  Acknowledgments

- [OpenRouter](https://openrouter.ai/) for unified AI model access
- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for animations
