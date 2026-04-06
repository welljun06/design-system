'use client'

import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SelectSize = 'lg' | 'md' | 'sm'
export type SelectVariant = 'default' | 'glass'

type SelectProps = {
  size?: SelectSize
  variant?: SelectVariant
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const defaultBase = 'border outline-none transition-all cursor-pointer'

const variantMap: Record<SelectVariant, string> = {
  default: 'border-[#e4e4e7] bg-white text-[#1c1f23] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20',
  glass: 'border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] text-[#1c1f23] focus:border-white/80 focus:ring-2 focus:ring-white/20 backdrop-blur-sm',
}

const sizeMap: Record<SelectSize, string> = {
  lg: 'py-[7px] px-3 text-sm rounded-lg',
  md: 'py-[5px] px-2.5 text-sm rounded-md',
  sm: 'py-[3px] px-2 text-xs rounded-md',
}

const demoOptions = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
]

export function Select({ size = 'lg', variant = 'default', disabled = false, classOverrides }: SelectProps) {
  const base = classOverrides?.base ?? defaultBase
  const variantClass = classOverrides?.variant ?? variantMap[variant]
  const sizeClass = classOverrides?.size ?? sizeMap[size]
  const isSmall = size === 'sm'
  const isGlass = variant === 'glass'

  return (
    <SelectPrimitive.Root disabled={disabled}>
      <SelectPrimitive.Trigger asChild>
        <button
          className={cn(
            'w-full flex items-center justify-between',
            base,
            variantClass,
            sizeClass,
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <span className="flex-1 text-left truncate">
            <SelectPrimitive.Value placeholder="请选择..." />
          </span>
          <ChevronDown size={isSmall ? 12 : 14} color={isGlass ? '#71717a' : '#a1a1aa'} className="shrink-0 ml-2" />
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            'overflow-hidden rounded-lg shadow-lg z-50',
            isGlass
              ? 'bg-white/80 border border-white/60 backdrop-blur-md'
              : 'bg-white border border-[#e4e4e7]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          )}
          position="popper"
          sideOffset={4}
          style={{ width: 'var(--radix-select-trigger-width)' }}
        >
          <SelectPrimitive.Viewport className="p-1">
            {demoOptions.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'relative flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm text-[#1c1f23] cursor-pointer outline-none select-none',
                  'data-[highlighted]:bg-[#f4f4f5]',
                  isSmall && 'text-xs px-2 py-1',
                )}
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check size={isSmall ? 12 : 14} color="#a1a1aa" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
