// components/ChatWidget.tsx
"use client"
import { useState } from "react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-96 h-96 bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col">
          <div className="p-3 border-b text-sm font-semibold bg-gray-100">Asistente Congreso-UPTA-GPT</div>
          <iframe
            src="/chat"
            className="flex-1 w-full border-none"
          ></iframe>
        </div>
      )}
    </>
  )
}
