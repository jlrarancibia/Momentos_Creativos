import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#C84B31] text-white hover:bg-[#a33a23] shadow-md hover:shadow-lg active:scale-95',
        outline: 'border-2 border-[#C84B31] text-[#C84B31] hover:bg-[#C84B31] hover:text-white',
        ghost: 'text-[#2C3E50] hover:bg-[#F5F0E8]',
        secondary: 'bg-[#2C3E50] text-white hover:bg-[#1a252f]',
        deal: 'bg-[#27AE60] text-white hover:bg-[#1e8449] shadow-md active:scale-95',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-5 py-2',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
