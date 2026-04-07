import React from 'react'
import { cn } from '@/lib/utils'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'

export type TextareaSize = 'lg' | 'md' | 'sm'
export type TextareaVariant = 'default' | 'glass'

type TextareaProps = {
  placeholder?: string
  disabled?: boolean
  size?: TextareaSize
  variant?: TextareaVariant
  classOverrides?: Record<string, string>
}

const variantMap: Record<TextareaVariant, string> = {
  default: 'border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus-visible:ring-[#a1a1aa]/20',
  glass: 'border-white/60 bg-white/25 text-[#1c1f23] placeholder:text-[#71717a] focus:border-white/80 focus-visible:ring-white/20 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]',
}

const sizeMap: Record<TextareaSize, string> = {
  lg: 'py-[7px] px-3 text-sm rounded-lg',
  md: 'py-[5px] px-2.5 text-sm rounded-md',
  sm: 'py-[3px] px-2 text-xs rounded-md',
}

export function Textarea({ placeholder = '请输入内容...', disabled = false, size = 'lg', variant = 'default', classOverrides }: TextareaProps) {
  const variantClass = classOverrides?.variant ?? variantMap[variant]
  const sizeClass = classOverrides?.size ?? sizeMap[size]

  return (
    <ShadcnTextarea
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        'min-h-[92px] resize-y transition-all',
        variantClass,
        sizeClass,
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    />
  )
}
