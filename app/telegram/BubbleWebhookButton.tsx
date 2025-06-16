"use client"

import React, { useState } from "react"

export const BubbleWebhookButton = () => {
  const [isIframeVisible, setIframeVisible] = useState(false)

  const handleClick = () => {
    setIframeVisible(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        title="Contáctanos"
      >
        💬
      </button>

      {isIframeVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white w-full max-w-4xl h-3/4 rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://niurkateam.app.n8n.cloud/webhook/bf6bc2c4-bfb9-4150-88b7-6daf0e1ec516/chat"
              className="w-full h-full border-none"
              title="Chat Webhook"
            ></iframe>
            <button
              onClick={() => setIframeVisible(false)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  )
}
