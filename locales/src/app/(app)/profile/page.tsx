import { currentUser } from '@clerk/nextjs/server'
import { UserProfile } from '@clerk/nextjs'
import { PLANS } from '@/lib/plans'

export default async function ProfilePage() {
  const user = await currentUser()

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      {/* Plan status */}
      <div className="bg-white rounded-2xl border border-[#E8DCC8] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-[#2C3E50]">Your Plan</span>
          <span className="text-xs bg-[#C84B31]/10 text-[#C84B31] font-semibold px-2 py-0.5 rounded-full">
            Free Preview
          </span>
        </div>
        <p className="text-xs text-[#8B9BAD] mb-4">
          Upgrade to unlock all deals, full AI conversations, and meet other tourists.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.filter((p) => p.id !== 'free').map((plan) => (
            <button
              key={plan.id}
              className="flex flex-col items-center p-2 border border-[#E8DCC8] rounded-xl hover:border-[#C84B31] transition-colors"
            >
              <span className="text-lg font-black text-[#C84B31]">${plan.price}</span>
              <span className="text-[10px] text-[#8B9BAD]">{plan.days}d</span>
              <span className="text-[10px] font-medium text-[#2C3E50] mt-0.5">{plan.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clerk profile */}
      <UserProfile routing="hash" />
    </div>
  )
}
