'use client'

import { useEffect, useState } from 'react'
import { Clock, MapPin, Star, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Deal } from '@/types'

export function DealsList() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [activeDeals, setActiveDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/deals')
      .then((r) => r.json())
      .then(({ deals, activeDeals }) => {
        setDeals(deals)
        setActiveDeals(activeDeals)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-[#E8DCC8] rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  const activeIds = new Set(activeDeals.map((d) => d.id))

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Tag size={18} className="text-[#C84B31]" />
        <h2 className="font-bold text-[#2C3E50]">Exclusive Deals for Locales Members</h2>
      </div>

      {activeDeals.length > 0 && (
        <div className="bg-[#27AE60]/10 border border-[#27AE60]/30 rounded-xl p-3 text-sm text-[#1e8449] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
          <span><strong>{activeDeals.length} deals active right now</strong> — go grab them!</span>
        </div>
      )}

      {deals.map((deal) => {
        const isActive = activeIds.has(deal.id)
        return (
          <div
            key={deal.id}
            className={cn(
              'bg-white rounded-2xl border overflow-hidden shadow-sm',
              isActive ? 'border-[#27AE60]' : 'border-[#E8DCC8]',
            )}
          >
            {/* Discount badge */}
            <div className="flex items-stretch">
              <div
                className={cn(
                  'w-20 flex flex-col items-center justify-center p-3 text-white flex-shrink-0',
                  isActive ? 'bg-[#27AE60]' : 'bg-[#8B9BAD]',
                )}
              >
                <span className="text-2xl font-black">{deal.discount}%</span>
                <span className="text-[10px] font-medium uppercase tracking-wide">OFF</span>
              </div>

              <div className="flex-1 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#2C3E50] text-sm leading-tight">
                      {deal.restaurant.name}
                    </h3>
                    <p className="text-xs text-[#8B9BAD] mt-0.5">{deal.restaurant.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={12} className="text-[#F39C12] fill-[#F39C12]" />
                    <span className="text-xs font-semibold text-[#2C3E50]">
                      {deal.restaurant.rating}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#5D6D7E] mt-1 line-clamp-2">
                  {deal.restaurant.description}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-xs text-[#8B9BAD]">
                    <MapPin size={11} />
                    <span>{deal.restaurant.neighborhood}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#8B9BAD]">
                    <Clock size={11} />
                    <span>
                      {deal.restaurant.dealHours.map((h) => `${h.start}–${h.end}`).join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-[#5D6D7E]">
                    {deal.spotsLeft} spots left
                  </span>
                  <Button
                    size="sm"
                    variant={isActive ? 'deal' : 'outline'}
                    className="text-xs h-7 px-3"
                  >
                    {isActive ? 'Claim Deal' : 'Set Reminder'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
