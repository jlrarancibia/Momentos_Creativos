import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { Deal } from '@/types'

// Seed data — replace with DB query once Railway DB is connected
const MOCK_DEALS: Deal[] = [
  {
    id: 'd1',
    restaurant: {
      id: 'r1',
      name: 'Cevichería El Puerto',
      description: 'Authentic Limeño ceviche since 1985. Family recipes, fresh catch daily.',
      cuisine: 'Peruvian / Seafood',
      neighborhood: 'Miraflores',
      address: 'Av. Comandante Espinar 168, Miraflores',
      lat: -12.1219,
      lng: -77.0284,
      priceRange: 2,
      images: [],
      dealPercent: 30,
      dealHours: [{ start: '14:30', end: '17:00' }],
      isActive: true,
      rating: 4.7,
    },
    discount: 30,
    validFrom: '14:30',
    validUntil: '17:00',
    spotsLeft: 8,
  },
  {
    id: 'd2',
    restaurant: {
      id: 'r2',
      name: 'La Cantina de Barranco',
      description: 'Bohemian bar-restaurant with traditional Peruvian comfort food and craft pisco.',
      cuisine: 'Peruvian / Bar',
      neighborhood: 'Barranco',
      address: 'Av. Pedro de Osma 301, Barranco',
      lat: -12.1536,
      lng: -77.0205,
      priceRange: 2,
      images: [],
      dealPercent: 25,
      dealHours: [{ start: '12:00', end: '15:00' }, { start: '17:00', end: '19:00' }],
      isActive: true,
      rating: 4.5,
    },
    discount: 25,
    validFrom: '17:00',
    validUntil: '19:00',
    spotsLeft: 12,
  },
  {
    id: 'd3',
    restaurant: {
      id: 'r3',
      name: 'Anticuchería Don Carlos',
      description: 'Street food legend serving anticuchos and picarones. A Lima institution.',
      cuisine: 'Peruvian Street Food',
      neighborhood: 'Surco',
      address: 'Av. Angamos Este 1430, Surco',
      lat: -12.1086,
      lng: -77.0017,
      priceRange: 1,
      images: [],
      dealPercent: 20,
      dealHours: [{ start: '15:00', end: '18:00' }],
      isActive: true,
      rating: 4.8,
    },
    discount: 20,
    validFrom: '15:00',
    validUntil: '18:00',
    spotsLeft: 20,
  },
]

export async function GET() {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  // Filter deals that are currently valid (by hour)
  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  const activeDeals = MOCK_DEALS.filter((deal) => {
    const restaurant = deal.restaurant
    return restaurant.dealHours.some(
      (h) => currentTime >= h.start && currentTime <= h.end,
    )
  })

  return NextResponse.json({ deals: MOCK_DEALS, activeDeals })
}
