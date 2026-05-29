import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function getDaysRemaining(expiresAt: string | null): number {
  if (!expiresAt) return 0
  const diff = new Date(expiresAt).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function detectLanguage(): string {
  if (typeof window === 'undefined') return 'en'
  const lang = navigator.language.split('-')[0]
  const supported = ['en', 'es', 'fr', 'pt', 'zh', 'de', 'it', 'ja', 'ko']
  return supported.includes(lang) ? lang : 'en'
}
