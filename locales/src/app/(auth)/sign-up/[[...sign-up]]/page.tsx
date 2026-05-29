import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#FDFAF5] p-4">
      <SignUp />
    </div>
  )
}
