"use client"

import { useState } from "react"

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  const handleAsk = async () => {
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message }),
    })
    const data = await res.json()
    setResponse(data.reply)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 p-4 bg-white dark:bg-black border rounded-xl shadow-lg">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pose ta question ici..."
            className="w-full h-24 p-2 border rounded text-black dark:text-white bg-white dark:bg-black"
          />
          <button
            onClick={handleAsk}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Envoyer
          </button>
          <div className="mt-4 text-sm text-black dark:text-white">
            <strong>Réponse :</strong>
            <p>{response}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="mt-2 text-red-600 underline">
            Fermer
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700"
        >
          💬 Assistant IA
        </button>
      )}
    </div>
  )
}
