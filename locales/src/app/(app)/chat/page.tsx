import { currentUser } from '@clerk/nextjs/server'
import { ChatInterface } from '@/components/chat/chat-interface'

export default async function ChatPage() {
  const user = await currentUser()
  const firstName = user?.firstName ?? 'Traveler'

  return <ChatInterface userName={firstName} />
}
