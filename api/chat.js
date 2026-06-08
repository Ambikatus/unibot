import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        reply: "Método no permitido",
      });
    }

    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Eres UniBot, un asistente académico universitario.

Responde de manera clara, educativa y breve.

Si te preguntan sobre:
- Programación
- Bases de datos
- Inteligencia artificial
- Ciberseguridad
- Matemáticas
- Redes

explica los conceptos de forma sencilla.

Pregunta:
${message}
      `,
    });

    return res.status(200).json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      reply: "Error al consultar Gemini.",
    });
  }
}