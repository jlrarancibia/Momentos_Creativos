import Stripe from 'stripe'

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-05-27.dahlia' })
}

export async function createCheckoutSession({
  priceId,
  userId,
  planId,
  successUrl,
  cancelUrl,
}: {
  priceId: string
  userId: string
  planId: string
  successUrl: string
  cancelUrl: string
}) {
  const stripe = getStripe()
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId, planId },
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  })
}
