// components/ChatWidget.tsx
"use client"
import { useState } from "react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-bold mr-2">UPTA-GPT</span>
        💬
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-96 h-96 bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col">
          <div className="p-3 border-b text-sm font-semibold text-gray-800 bg-gray-100 flex justify-between">
            UPTA-GPT
            <button className="text-gray-600 hover:text-gray-800" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
          <iframe
            src="/chat"
            className="flex-1 w-full border-none"
          ></iframe>
        </div>
      )}
    </>
  )
}

