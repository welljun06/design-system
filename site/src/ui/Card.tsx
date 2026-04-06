import React from 'react'
import { cn } from '@/lib/utils'

type CardProps = {
  variant?: 'default' | 'glass'
  children?: React.ReactNode
  classOverrides?: Record<string, string>
}

const defaultClasses = {
  base: 'rounded-xl p-5',
  default: 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border border-[#e4e4e7]',
  glass: 'bg-white/25 border border-white/60 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm',
}

export function Card({ variant = 'default', children, classOverrides }: CardProps) {
  const base = classOverrides?.base ?? defaultClasses.base
  const variantClass = variant === 'glass'
    ? (classOverrides?.variant ?? defaultClasses.glass)
    : (classOverrides?.variant ?? defaultClasses.default)

  return (
    <div className={cn(base, variantClass)}>
      {children ?? (
        <>
          <h3 className="text-sm font-semibold text-[#1c1f23]">Card Title</h3>
          <p className="mt-1 text-sm text-[#71717a]">Card content goes here. Add your own content.</p>
        </>
      )}
    </div>
  )
}
