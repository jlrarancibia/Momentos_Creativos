'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, MapPin, Tag, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'

const NAV = [
  { href: '/chat', icon: MessageCircle, label: 'LOCA AI' },
  { href: '/deals', icon: Tag, label: 'Deals' },
  { href: '/social', icon: Users, label: 'Tourists' },
  { href: '/map', icon: MapPin, label: 'Map' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-dvh bg-[#FDFAF5] text-[#2C3E50]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#E8DCC8] bg-white">
        <Link href="/chat" className="flex items-center gap-2">
          <span className="text-2xl">🇵🇪</span>
          <span className="font-bold text-lg tracking-tight text-[#C84B31]">Locales</span>
        </Link>
        <UserButton />
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>

      {/* Bottom nav */}
      <nav className="border-t border-[#E8DCC8] bg-white px-2 pb-safe">
        <ul className="flex justify-around">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-colors',
                    active ? 'text-[#C84B31]' : 'text-[#8B9BAD] hover:text-[#2C3E50]',
                  )}
                >
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.5 : 1.8}
                    className={active ? 'scale-110 transition-transform' : ''}
                  />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
