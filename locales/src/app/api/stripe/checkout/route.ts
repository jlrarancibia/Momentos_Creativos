import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/payments/stripe'
import { getPlan } from '@/lib/plans'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { planId } = await req.json()
  const plan = getPlan(planId)

  if (!plan.stripePriceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const session = await createCheckoutSession({
    priceId: plan.stripePriceId,
    userId,
    planId,
    successUrl: `${baseUrl}/chat?success=true&plan=${planId}`,
    cancelUrl: `${baseUrl}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
