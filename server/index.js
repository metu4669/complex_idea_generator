// server/index.js
import "dotenv/config"; // or require('dotenv').config() if using CommonJS
import express from "express";
import cors from "cors";
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/generate-idea", async (req, res) => {
  try {
    const { technology, level, language } = req.body;
    const prompt = `
You are an expert software architect and idea generator.
The user provides: Technology = "${technology}", Difficulty = "${
      level || "any"
    }".

Your task:
1. Generate ONE creative and realistic project idea using the chosen technology.
2. Give:
   - Project Name
   - Short elevator pitch (2 sentences)
   - Detailed features list (bullet points)
   - Suggested tech stack details (frontend, backend, DB, APIs, libraries)
   - Possible challenges & learning outcomes
3. Output in JSON with keys: name, pitch, features, stack, challenges, outcomes but do not put anything else. 
It must be only in json format nothing else. Without touching JSON keywords, give everything else in "${language}"
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });
    const raw = response.choices[0].message.content;
    const cleaned = raw
      .trim()
      .replace(/^```json/, "")
      .replace(/```$/, "");

    const idea = JSON.parse(cleaned);
    res.json(idea);
  } catch (error) {
    console.error("JSON parse error:", err);
    res.status(500).json({ error: "Failed to parse idea JSON" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
