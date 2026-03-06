// ── AI Council Chat – Express Server ──

const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const chatRouter = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRouter);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "AI Council Chat backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
