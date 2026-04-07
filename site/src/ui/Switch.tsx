'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'

export type SwitchSize = 'lg' | 'md' | 'sm'

type SwitchProps = {
  size?: SwitchSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<SwitchSize, { track: string; thumb: string }> = {
  lg: { track: 'h-7 w-12', thumb: 'h-5 w-5 data-[state=checked]:translate-x-5' },
  md: { track: 'h-5 w-9', thumb: 'h-4 w-4 data-[state=checked]:translate-x-4' },
  sm: { track: 'h-4 w-7', thumb: 'h-3 w-3 data-[state=checked]:translate-x-3' },
}

export function Switch({ size = 'md', disabled = false, classOverrides }: SwitchProps) {
  const s = sizeMap[size]
  const trackClass = classOverrides?.track ?? s.track
  const thumbClass = classOverrides?.thumb ?? s.thumb

  return (
    <div className="py-1">
      <ShadcnSwitch
        defaultChecked
        disabled={disabled}
        className={cn(trackClass)}
        thumbClassName={thumbClass}
      />
    </div>
  )
}
