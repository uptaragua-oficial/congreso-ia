import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { RAGProcessor } from "@/lib/rag"

import { generateText } from "ai"

export const maxDuration = 30

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
})

const ragProcessor = new RAGProcessor()

export async function POST(req: Request) {
  const { messages, model = "llama3-70b-8192" } = await req.json()


  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })


  const lastMessage = messages[messages.length - 1]?.content || ""
  console.log("🟡 Último mensaje del usuario:", lastMessage)

  let context = ""
  try {
    context = await ragProcessor.findRelevantContext(lastMessage)
    //console.log("🟢 Contexto relevante:", context)
  } catch (error) {
    console.error("❌ Error al obtener contexto RAG:", error)
  }

  // Construimos el prompt final
  const promptMessages = [
    {
      role: "system",
      content:
        "Eres Congreso-GPT, un asistente de la Universidad Politécnica de Aragua, amable y útil. Respondes en español exclusivamente sobre el Congreso de Inteligencia Artificial Generativa que se realizará en la Universidad.",
    },
    {
      role: "user",
      content:
        "Contexto del documento:\n\n" + context + "\n\nPor favor responde a la siguiente pregunta según ese contexto.",
    },
    ...messages.slice(-1), // Solo la última pregunta del usuario
  ]


  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: promptMessages,
  })
  return new Response(textStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
