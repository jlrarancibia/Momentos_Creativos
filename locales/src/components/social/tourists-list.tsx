'use client'

import { Globe, MessageCircle, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { TouristCard } from '@/types'

// Mock data — replace with Supabase realtime query
const MOCK_TOURISTS: TouristCard[] = [
  {
    userId: 'u1',
    displayName: 'Marco',
    avatar: '',
    country: 'Italy',
    language: 'it',
    interests: ['Food', 'History', 'Photography'],
    inLimaUntil: '2025-06-05',
    isOnline: true,
  },
  {
    userId: 'u2',
    displayName: 'Sophie',
    avatar: '',
    country: 'France',
    language: 'fr',
    interests: ['Surfing', 'Nightlife', 'Art'],
    inLimaUntil: '2025-06-02',
    isOnline: true,
  },
  {
    userId: 'u3',
    displayName: 'Kenji',
    avatar: '',
    country: 'Japan',
    language: 'ja',
    interests: ['Gastronomy', 'Culture', 'Markets'],
    inLimaUntil: '2025-06-08',
    isOnline: false,
  },
  {
    userId: 'u4',
    displayName: 'Anna',
    avatar: '',
    country: 'Germany',
    language: 'de',
    interests: ['Hiking', 'History', 'Ruins'],
    inLimaUntil: '2025-06-04',
    isOnline: true,
  },
]

const FLAG_BY_COUNTRY: Record<string, string> = {
  Italy: '🇮🇹', France: '🇫🇷', Japan: '🇯🇵', Germany: '🇩🇪',
  USA: '🇺🇸', Spain: '🇪🇸', Brazil: '🇧🇷', Mexico: '🇲🇽',
  UK: '🇬🇧', Australia: '🇦🇺', Canada: '🇨🇦', Argentina: '🇦🇷',
}

export function TouristsList() {
  const onlineTourists = MOCK_TOURISTS.filter((t) => t.isOnline)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Globe size={18} className="text-[#C84B31]" />
        <h2 className="font-bold text-[#2C3E50]">Tourists in Lima Now</h2>
        <span className="ml-auto flex items-center gap-1 text-xs text-[#27AE60] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
          {onlineTourists.length} online
        </span>
      </div>

      <p className="text-xs text-[#8B9BAD]">
        Connect with fellow travelers, plan group activities, and share experiences.
      </p>

      <div className="space-y-3">
        {MOCK_TOURISTS.map((tourist) => (
          <div
            key={tourist.userId}
            className="bg-white rounded-2xl border border-[#E8DCC8] p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#F5F0E8] flex items-center justify-center text-2xl">
                  {FLAG_BY_COUNTRY[tourist.country] ?? '🌍'}
                </div>
                {tourist.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2C3E50]">{tourist.displayName}</span>
                  <span className="text-xs text-[#8B9BAD]">{tourist.country}</span>
                </div>

                <div className="flex items-center gap-1 mt-0.5 text-xs text-[#8B9BAD]">
                  <Calendar size={11} />
                  <span>In Lima until {new Date(tourist.inLimaUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {tourist.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-[10px] bg-[#F5F0E8] text-[#5D6D7E] rounded-full px-2 py-0.5"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                <MessageCircle size={13} />
                Say hi
              </Button>
              <Button size="sm" variant="ghost" className="flex-1 text-xs h-8">
                Plan activity
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
