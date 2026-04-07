"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { indicatorClassName?: string }
>(({ className, indicatorClassName, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-[3px] border border-[rgba(28,31,35,0.35)] bg-white transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a1a1aa]/20",
      "disabled:cursor-not-allowed",
      "disabled:border-[rgba(28,31,35,0.08)] disabled:bg-[rgba(52,59,58,0.04)]",
      "data-[state=checked]:border-[#1c1f23] data-[state=checked]:bg-[#1c1f23] data-[state=checked]:text-white",
      "disabled:data-[state=checked]:bg-[rgba(34,39,39,0.35)] disabled:data-[state=checked]:text-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current", indicatorClassName)}
    >
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
