'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { detectLanguage } from '@/lib/utils'
import type { ChatMessage } from '@/types'

const QUICK_PROMPTS = [
  { emoji: '🍽️', label: 'Best ceviche?', text: "Where's the best ceviche in Lima?" },
  { emoji: '🗺️', label: 'Today plan', text: 'What should I do today in Lima?' },
  { emoji: '🏖️', label: 'Beaches', text: 'Tell me about the beaches near Lima.' },
  { emoji: '🎭', label: 'Nightlife', text: "What's the nightlife like in Barranco?" },
  { emoji: '🚌', label: 'Transport', text: 'How do I get around Lima safely?' },
  { emoji: '💰', label: 'Budget tips', text: 'Any money-saving tips for Lima?' },
]

export function ChatInterface({ userName }: { userName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: `¡Hola! I'm LOCA, your Lima companion 🇵🇪 I speak your language and know every corner of this city. Ask me anything — food, places, safety, hidden gems — I'm here for you, ${userName}!`,
      createdAt: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language] = useState(detectLanguage)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: m.content + chunk } : m,
          ),
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex gap-2',
              msg.role === 'user' ? 'justify-end' : 'justify-start',
            )}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#C84B31] flex items-center justify-center text-white text-sm flex-shrink-0 mt-1">
                🇵🇪
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-[#C84B31] text-white rounded-tr-sm'
                  : 'bg-white border border-[#E8DCC8] text-[#2C3E50] rounded-tl-sm shadow-sm',
              )}
            >
              {msg.content || (
                <span className="flex gap-1 items-center text-[#8B9BAD]">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:100ms]">●</span>
                  <span className="animate-bounce [animation-delay:200ms]">●</span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => sendMessage(p.text)}
                className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-[#E8DCC8] rounded-full px-3 py-1.5 text-xs text-[#2C3E50] hover:border-[#C84B31] hover:text-[#C84B31] transition-colors"
              >
                <span>{p.emoji}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-[#E8DCC8]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(input)
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask LOCA anything about Lima..."
            className="flex-1 bg-[#F5F0E8] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#C84B31]/30 placeholder:text-[#8B9BAD]"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-xl"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </Button>
        </form>
      </div>
    </div>
  )
}
