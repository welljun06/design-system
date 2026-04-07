import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-[#e4e4e7] bg-transparent px-3 py-2 text-sm shadow-sm",
        "placeholder:text-[#a1a1aa]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#a1a1aa]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
