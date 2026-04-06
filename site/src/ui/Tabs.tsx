'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export type TabsVariant = 'glass' | 'glass-rounded' | 'button' | 'button-rounded' | 'line' | 'card'
export type TabsSize = 'lg' | 'md' | 'sm'

type TabsProps = {
  variant?: TabsVariant
  size?: TabsSize
  classOverrides?: Record<string, string>
}

const demoTabs = ['标签一', '标签二', '标签三']

const sizeMap: Record<TabsSize, { container: string; item: string; text: string }> = {
  lg: { container: 'h-9 p-1 gap-0.5', item: 'px-4 gap-1', text: 'text-sm' },
  md: { container: 'h-8 p-0.5 gap-0.5', item: 'px-3 gap-0.5', text: 'text-sm' },
  sm: { container: 'h-6 p-0.5 gap-0.5', item: 'px-2.5 gap-0.5', text: 'text-xs' },
}

const variantStyles: Record<TabsVariant, {
  container: string
  item: string
  active: string
  inactive: string
}> = {
  glass: {
    container: 'rounded-full border border-white/60 bg-white/50 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]',
    item: 'rounded-full transition-all',
    active: 'bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] text-[#1c1f23] font-semibold',
    inactive: 'text-[#1c1f23]/50 hover:text-[#1c1f23]/80',
  },
  'glass-rounded': {
    container: 'rounded-lg border border-white/60 bg-white/50 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]',
    item: 'rounded-md transition-all',
    active: 'bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] text-[#1c1f23] font-semibold',
    inactive: 'text-[#1c1f23]/50 hover:text-[#1c1f23]/80',
  },
  button: {
    container: 'bg-[#f4f4f5] rounded-full',
    item: 'rounded-full transition-all',
    active: 'bg-white text-[#1c1f23] font-medium shadow-sm',
    inactive: 'text-[#71717a] hover:text-[#1c1f23]',
  },
  'button-rounded': {
    container: 'bg-[#f4f4f5] rounded-lg',
    item: 'rounded-md transition-all',
    active: 'bg-white text-[#1c1f23] font-medium shadow-sm',
    inactive: 'text-[#71717a] hover:text-[#1c1f23]',
  },
  line: {
    container: 'rounded-none',
    item: 'border-b-2 border-transparent transition-all',
    active: 'border-[#1c1f23] text-[#1c1f23] font-medium',
    inactive: 'text-[#71717a] hover:text-[#1c1f23]',
  },
  card: {
    container: 'rounded-none',
    item: 'border border-transparent transition-all',
    active: 'border-[#e4e4e7] bg-white text-[#1c1f23] font-medium rounded-t-lg',
    inactive: 'text-[#71717a] hover:text-[#1c1f23]',
  },
}

export function Tabs({ variant = 'glass', size = 'md', classOverrides }: TabsProps) {
  const [active, setActive] = useState(0)
  const s = sizeMap[size]
  const v = variantStyles[variant]

  const containerClass = classOverrides?.variant || v.container
  const sizeClass = classOverrides?.size || s.container

  return (
    <div className={cn('inline-flex items-center', containerClass, sizeClass)}>
      {demoTabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={cn(
            'cursor-pointer flex items-center justify-center whitespace-nowrap self-stretch',
            s.text,
            v.item,
            s.item,
            i === active ? v.active : v.inactive,
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
