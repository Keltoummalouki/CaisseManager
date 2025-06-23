"use client"

import { useState } from "react"

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [history, setHistory] = useState<string[]>([])

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMsg = `🧑‍💻: ${message}`
    setHistory(prev => [...prev, userMsg])
    setMessage("")

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })

    const data = await res.json()
    setHistory(prev => [...prev, `🤖: ${data.response}`])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-[400px] p-4 bg-white dark:bg-black border dark:border-gray-700 border-gray-300 rounded-xl shadow-lg flex flex-col">
          <div className="overflow-auto flex-1 space-y-2 mb-2">
            {history.map((msg, idx) => (
              <div key={idx} className="text-sm text-black dark:text-white whitespace-pre-wrap">{msg}</div>
            ))}
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pose ta question..."
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={sendMessage}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Envoyer
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-500 hover:underline"
            >
              Fermer
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700"
        >
          💬 ChatGPT
        </button>
      )}
    </div>
  )
}
