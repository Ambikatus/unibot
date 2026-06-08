import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Eres UniBot, un asistente académico universitario.

Responde de manera clara, educativa y breve.
Si te preguntan sobre programación, matemáticas, bases de datos,
ciberseguridad o inteligencia artificial, explica los conceptos.

Pregunta del estudiante:
${message}
      `,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Ocurrió un error al consultar la IA.",
    });
  }
});

app.listen(3001, () => {
  console.log("Servidor iniciado en puerto 3001");
});