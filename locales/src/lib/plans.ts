import type { Plan } from '@/types'

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Preview',
    price: 0,
    currency: 'USD',
    days: 1,
    stripePriceId: '',
    features: [
      '24h access',
      'AI companion (limited)',
      'Top 10 restaurant deals',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 3,
    currency: 'USD',
    days: 3,
    stripePriceId: process.env.STRIPE_PRICE_STARTER ?? '',
    features: [
      '3-day access',
      'Full AI companion in your language',
      'All restaurant deals',
      'Interactive map',
      'Meet other tourists',
    ],
  },
  {
    id: 'explorer',
    name: 'Explorer',
    price: 7,
    currency: 'USD',
    days: 7,
    stripePriceId: process.env.STRIPE_PRICE_EXPLORER ?? '',
    features: [
      '7-day access',
      'Everything in Starter',
      'Exclusive off-peak deals',
      'Historical walking tours',
      'Priority restaurant reservations',
    ],
  },
  {
    id: 'local_pro',
    name: 'Local Pro',
    price: 19,
    currency: 'USD',
    days: 30,
    stripePriceId: process.env.STRIPE_PRICE_LOCAL_PRO ?? '',
    features: [
      '30-day access',
      'Everything in Explorer',
      'Unlimited AI conversations',
      'VIP restaurant deals (up to 40% off)',
      'Curated experience bundles',
    ],
  },
]

export const getPlan = (id: string) => PLANS.find((p) => p.id === id) ?? PLANS[0]
