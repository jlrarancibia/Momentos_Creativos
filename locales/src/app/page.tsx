import Link from 'next/link'
import { Button } from '@/components/ui/button'

const FEATURES = [
  { emoji: '🤖', title: 'AI in your language', desc: 'LOCA speaks English, Spanish, French, Japanese & more' },
  { emoji: '🍽️', title: 'Exclusive deals', desc: 'Up to 40% off at top Lima restaurants during off-peak hours' },
  { emoji: '🌍', title: 'Meet travelers', desc: 'Connect with tourists from around the world in Lima right now' },
  { emoji: '🗺️', title: 'Insider routes', desc: 'Curated experiences: beaches, desert, valleys & history walks' },
]

const PLANS = [
  { name: 'Starter', price: '$3', duration: '3 days', highlight: false },
  { name: 'Explorer', price: '$7', duration: '7 days', highlight: true },
  { name: 'Local Pro', price: '$19', duration: '30 days', highlight: false },
]

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#FDFAF5] text-[#2C3E50] overflow-y-auto">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🇵🇪</span>
          <span className="font-black text-xl text-[#C84B31]">Locales</span>
        </div>
        <Link href="/sign-in">
          <Button size="sm">Sign in</Button>
        </Link>
      </nav>

      <section className="px-6 pt-12 pb-16 text-center max-w-lg mx-auto">
        <div className="inline-block bg-[#C84B31]/10 text-[#C84B31] text-xs font-semibold px-3 py-1 rounded-full mb-4">
          AI-powered · Only for tourists in Lima
        </div>
        <h1 className="text-4xl font-black leading-tight mb-4">
          Explore Lima <br />
          <span className="text-[#C84B31]">like a local</span>
        </h1>
        <p className="text-[#5D6D7E] mb-8 leading-relaxed">
          Your AI travel companion speaks your language, knows every corner of Lima, and gets you exclusive deals at top restaurants.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="w-full max-w-xs">
            Start free — 24h preview
          </Button>
        </Link>
        <p className="text-xs text-[#8B9BAD] mt-3">No credit card required</p>
      </section>

      <section className="px-6 pb-16 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-[#E8DCC8] p-4 shadow-sm">
              <div className="text-2xl mb-2">{f.emoji}</div>
              <h3 className="font-bold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-[#8B9BAD] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-center mb-2">Pay for your stay, not a year</h2>
        <p className="text-sm text-[#8B9BAD] text-center mb-6">Choose a plan that matches your trip length</p>
        <div className="space-y-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`flex items-center justify-between rounded-2xl border px-5 py-4 ${
                p.highlight
                  ? 'border-[#C84B31] bg-[#C84B31]/5 shadow-md'
                  : 'border-[#E8DCC8] bg-white shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{p.name}</span>
                  {p.highlight && (
                    <span className="text-[10px] bg-[#C84B31] text-white px-2 py-0.5 rounded-full font-semibold">
                      POPULAR
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#8B9BAD]">{p.duration} access</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-[#C84B31]">{p.price}</span>
                <Link href="/sign-up">
                  <Button size="sm" variant={p.highlight ? 'default' : 'outline'}>
                    Get it
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-xs text-[#8B9BAD] border-t border-[#E8DCC8]">
        © {new Date().getFullYear()} Locales · Lima, Perú · Made with 🇵🇪
      </footer>
    </div>
  )
}
