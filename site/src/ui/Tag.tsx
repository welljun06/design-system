'use client'

import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TagColor = 'white' | 'blue' | 'green' | 'red' | 'orange' | 'violet'
export type TagType = 'light' | 'solid' | 'ghost'
export type TagShape = 'square' | 'circle'
export type TagSize = 'lg' | 'md' | 'sm'

type TagProps = {
  color?: TagColor
  type?: TagType
  shape?: TagShape
  size?: TagSize
  closable?: boolean
  children?: React.ReactNode
  classOverrides?: Record<string, string>
}

const defaultBase = 'inline-flex items-center font-semibold whitespace-nowrap'

const colorTypeMap: Record<TagColor, Record<TagType, string>> = {
  white: {
    light: 'bg-[#f4f4f5] text-[#1c1f23]',
    solid: 'bg-[#1c1f23] text-white',
    ghost: 'border border-[#1c1f23]/20 text-[#1c1f23]',
  },
  blue: {
    light: 'bg-blue-50 text-blue-700',
    solid: 'bg-blue-600 text-white',
    ghost: 'border border-blue-600 text-blue-600',
  },
  green: {
    light: 'bg-green-50 text-green-700',
    solid: 'bg-green-600 text-white',
    ghost: 'border border-green-600 text-green-600',
  },
  red: {
    light: 'bg-red-50 text-red-700',
    solid: 'bg-red-600 text-white',
    ghost: 'border border-red-600 text-red-600',
  },
  orange: {
    light: 'bg-orange-50 text-orange-700',
    solid: 'bg-orange-500 text-white',
    ghost: 'border border-orange-500 text-orange-500',
  },
  violet: {
    light: 'bg-violet-50 text-violet-700',
    solid: 'bg-violet-600 text-white',
    ghost: 'border border-violet-600 text-violet-600',
  },
}

// lg: 24px = text-sm(20px) + py-[2px]*2, md: 20px = text-xs(16px) + py-[2px]*2, sm: 16px = 11px font + leading-[16px]
const sizeMap: Record<TagSize, string> = {
  lg: 'gap-1.5 px-2 py-[2px] text-sm',
  md: 'gap-1.5 px-1.5 py-[2px] text-xs',
  sm: 'gap-1 px-1 py-0 text-[11px] leading-[16px]',
}

const shapeMap: Record<TagShape, string> = {
  square: 'rounded-md',
  circle: 'rounded-full',
}

const iconSizeMap: Record<TagSize, number> = { lg: 14, md: 12, sm: 10 }

export function Tag({ color = 'white', type = 'light', shape = 'square', size = 'md', closable = false, children, classOverrides }: TagProps) {
  const base = classOverrides?.base ?? defaultBase
  // Color × Type is computed from props — not editable via classOverrides
  const colorClass = colorTypeMap[color]?.[type] ?? colorTypeMap.white.light
  const sizeClass = classOverrides?.size ?? sizeMap[size]
  const shapeClass = classOverrides?.shape ?? shapeMap[shape]

  return (
    <span className={cn(base, colorClass, sizeClass, shapeClass)}>
      {children ?? '标签'}
      {closable && <X size={iconSizeMap[size]} className="cursor-pointer opacity-60 hover:opacity-100" />}
    </span>
  )
}
