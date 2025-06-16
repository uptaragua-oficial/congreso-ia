// app/chat/page.tsx
"use client"
import { useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: "user", content: "" }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)


  async function sendMessage() {
    if (!input.trim()) return

    const updatedMessages = [...messages, { role: "user", content: input }]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat-rag", {
      method: "POST",
      body: JSON.stringify({ messages: updatedMessages }),
      headers: { "Content-Type": "application/json" },
    })

    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let result = ""

    if (reader) {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        result += decoder.decode(value)
        setMessages([...updatedMessages, { role: "assistant", content: result }])
      }
    }

    setLoading(false)
  }

  return (
    <div className="h-full p-3 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
            <strong>{msg.role === "user" ? "Tú" : "UPTA-GPT"}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400">UPTA-GPT está escribiendo...</div>}
      </div>
      <div className="mt-2 flex">
        <input
          className="flex-1 border border-gray-300 rounded-l p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
