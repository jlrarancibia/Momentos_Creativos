import { auth, currentUser } from '@clerk/nextjs/server'
import { OpenAI } from 'openai'
import { buildSystemPrompt } from '@/lib/ai/system-prompt'
import type { SupportedLocale } from '@/types'

function getOpenAI(): OpenAI {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY is not set')
  return new OpenAI({ apiKey: key })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const user = await currentUser()
  const { messages, language } = await req.json()

  const systemPrompt = buildSystemPrompt(
    (language as SupportedLocale) ?? 'en',
    user?.firstName ?? 'Traveler',
  )

  const openai = getOpenAI()
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    max_tokens: 600,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) controller.enqueue(encoder.encode(text))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
