'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'

export type SwitchSize = 'md' | 'sm'

type SwitchProps = {
  size?: SwitchSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<SwitchSize, { track: string; thumb: string }> = {
  md: {
    track: 'h-5 w-10 rounded-[12px] p-[2px]',
    thumb: 'h-4 w-[22px] rounded-[9px] data-[state=checked]:translate-x-[13px]',
  },
  sm: {
    track: 'h-4 w-8 rounded-[8px] p-[2px]',
    thumb: 'h-3 w-4 rounded-[6px] data-[state=checked]:translate-x-[11px]',
  },
}

export function Switch({ size = 'md', disabled = false, classOverrides }: SwitchProps) {
  const s = sizeMap[size]
  const trackClass = classOverrides?.track ?? classOverrides?.trackOn ?? s.track
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
