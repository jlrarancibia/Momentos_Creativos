import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#FDFAF5] p-4">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🇵🇪</div>
        <h1 className="text-2xl font-bold text-[#C84B31]">Locales</h1>
        <p className="text-sm text-[#8B9BAD]">Explore Lima like a local</p>
      </div>
      <SignIn />
    </div>
  )
}
