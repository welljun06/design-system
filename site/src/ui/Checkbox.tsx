'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export type CheckboxSize = 'lg' | 'md' | 'sm'

type CheckboxProps = {
  size?: CheckboxSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<CheckboxSize, { box: string; text: string; gap: string }> = {
  lg: { box: 'h-5 w-5', text: 'text-sm', gap: 'gap-2.5' },
  md: { box: 'h-4 w-4', text: 'text-sm', gap: 'gap-2' },
  sm: { box: 'h-3.5 w-3.5', text: 'text-xs', gap: 'gap-1.5' },
}

export function Checkbox({ size = 'md', disabled = false, classOverrides }: CheckboxProps) {
  const s = sizeMap[size]
  const boxClass = classOverrides?.box ?? s.box
  const labelClass = classOverrides?.label ?? `${s.text} text-[#1c1f23]`

  return (
    <div className={cn('flex items-center gap-4 py-1', disabled && 'opacity-50')}>
      <div className={cn('flex items-center', s.gap)}>
        <ShadcnCheckbox id="cb-demo-1" defaultChecked disabled={disabled} className={boxClass} />
        <Label htmlFor="cb-demo-1" className={cn('cursor-pointer', labelClass)}>选择框标题</Label>
      </div>
      <div className={cn('flex items-center', s.gap)}>
        <ShadcnCheckbox id="cb-demo-2" disabled={disabled} className={boxClass} />
        <Label htmlFor="cb-demo-2" className={cn('cursor-pointer', labelClass)}>选择框标题</Label>
      </div>
    </div>
  )
}
