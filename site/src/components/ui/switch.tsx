"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { thumbClassName?: string }
>(({ className, thumbClassName, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative inline-flex shrink-0 cursor-pointer items-center border border-transparent transition-colors duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a1a1aa]/20 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      "data-[state=checked]:bg-[#0275f4] hover:data-[state=checked]:bg-[#175cd3]",
      "data-[state=unchecked]:bg-[rgba(83,96,143,0.12)]",
      "disabled:data-[state=checked]:bg-[#84caff]",
      "disabled:data-[state=unchecked]:border-[rgba(45,66,107,0.12)] disabled:data-[state=unchecked]:bg-[rgba(83,96,143,0.15)]",
      "h-5 w-10 rounded-[12px] p-[2px]",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block bg-white ring-0 shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-out will-change-transform",
        "data-[state=unchecked]:translate-x-0",
        "h-4 w-[22px] rounded-[9px]",
        thumbClassName
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
