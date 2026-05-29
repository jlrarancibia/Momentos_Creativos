export type SupportedLocale = 'en' | 'es' | 'fr' | 'pt' | 'zh' | 'de' | 'it' | 'ja' | 'ko'

export type PlanId = 'free' | 'starter' | 'explorer' | 'local_pro'

export interface Plan {
  id: PlanId
  name: string
  price: number
  currency: string
  days: number | null
  stripePriceId: string
  features: string[]
}

export interface TouristProfile {
  userId: string
  language: SupportedLocale
  country: string
  arrivalDate: string
  departureDate: string
  interests: string[]
  planId: PlanId
  planExpiresAt: string | null
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string
  neighborhood: string
  address: string
  lat: number
  lng: number
  priceRange: 1 | 2 | 3
  images: string[]
  dealPercent: number
  dealHours: { start: string; end: string }[]
  isActive: boolean
  rating: number
}

export interface Deal {
  id: string
  restaurant: Restaurant
  discount: number
  validFrom: string
  validUntil: string
  spotsLeft: number
  qrCode?: string
}

export interface TouristCard {
  userId: string
  displayName: string
  avatar: string
  country: string
  language: SupportedLocale
  interests: string[]
  inLimaUntil: string
  isOnline: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}
