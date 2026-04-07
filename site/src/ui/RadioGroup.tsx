'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export type RadioSize = 'lg' | 'md' | 'sm'

type RadioGroupProps = {
  size?: RadioSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<RadioSize, { radio: string; text: string; gap: string }> = {
  lg: { radio: 'h-5 w-5', text: 'text-sm', gap: 'gap-2.5' },
  md: { radio: 'h-4 w-4', text: 'text-sm', gap: 'gap-2' },
  sm: { radio: 'h-3.5 w-3.5', text: 'text-xs', gap: 'gap-1.5' },
}

export function RadioGroup({ size = 'md', disabled = false, classOverrides }: RadioGroupProps) {
  const s = sizeMap[size]
  const radioClass = classOverrides?.radio ?? s.radio
  const labelClass = classOverrides?.label ?? `${s.text} text-[#1c1f23]`

  return (
    <ShadcnRadioGroup defaultValue="a" disabled={disabled} className={cn('flex items-center gap-4 py-1', disabled && 'opacity-50')}>
      <div className={cn('flex items-center', s.gap)}>
        <RadioGroupItem value="a" id="r-demo-1" className={radioClass} />
        <Label htmlFor="r-demo-1" className={cn('cursor-pointer', labelClass)}>单选框标题</Label>
      </div>
      <div className={cn('flex items-center', s.gap)}>
        <RadioGroupItem value="b" id="r-demo-2" className={radioClass} />
        <Label htmlFor="r-demo-2" className={cn('cursor-pointer', labelClass)}>单选框标题</Label>
      </div>
    </ShadcnRadioGroup>
  )
}
