import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Locales — Explore Lima like a local',
  description: 'Your AI travel companion for Lima, Peru. Deals, maps, and local experiences in your language.',
  themeColor: '#C84B31',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="h-dvh overflow-hidden">{children}</body>
      </html>
    </ClerkProvider>
  )
}
