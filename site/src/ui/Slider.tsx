'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Slider as ShadcnSlider } from '@/components/ui/slider'

export type SliderSize = 'lg' | 'md' | 'sm'

type SliderProps = {
  size?: SliderSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<SliderSize, string> = {
  lg: 'h-10',
  md: 'h-8',
  sm: 'h-6',
}

export function Slider({ size = 'md', disabled = false, classOverrides }: SliderProps) {
  const wrapper = classOverrides?.wrapper ?? sizeMap[size]

  return (
    <div className={cn('py-2', wrapper)}>
      <ShadcnSlider
        defaultValue={[30]}
        max={100}
        step={1}
        disabled={disabled}
        className={cn(disabled && 'opacity-50')}
      />
    </div>
  )
}
