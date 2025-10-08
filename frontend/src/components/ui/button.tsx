import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/index"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Rosa Chic Primary - Dark elegant button
        primary:
          "bg-brand-dark text-brand-cream shadow-lg hover:bg-brand-dark/90 focus-visible:ring-brand-dark",
        // Rosa Chic Secondary - Soft beige button
        secondary:
          "bg-brand-beige text-brand-dark shadow-sm hover:bg-brand-beige-light focus-visible:ring-brand-neutral-400",
        // Rosa Chic Outline - Elegant border
        outline:
          "border-2 border-brand-neutral-400 bg-transparent text-brand-dark hover:bg-brand-neutral-100 focus-visible:ring-brand-neutral-500",
        // Rosa Chic Ghost - Minimal hover
        ghost:
          "text-brand-dark hover:bg-brand-neutral-100 hover:text-brand-dark focus-visible:ring-brand-neutral-300",
        // Rosa Chic Destructive - Error states
        destructive:
          "bg-brand-error text-white shadow-sm hover:bg-brand-error/90 focus-visible:ring-brand-error",
        // Rosa Chic Success - Success states
        success:
          "bg-brand-success text-white shadow-sm hover:bg-brand-success/90 focus-visible:ring-brand-success",
        // Rosa Chic Link - Text link style
        link:
          "text-brand-dark underline-offset-4 hover:underline focus-visible:ring-brand-neutral-400",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded-md",
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-11 px-4 py-2 text-body rounded-lg",
        lg: "h-12 px-6 text-body-lg rounded-lg",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
