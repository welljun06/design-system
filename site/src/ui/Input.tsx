import React from 'react'
import { cn } from '@/lib/utils'

export type InputSize = 'lg' | 'md' | 'sm'
export type InputVariant = 'default' | 'glass'

type InputProps = {
  placeholder?: string
  disabled?: boolean
  size?: InputSize
  variant?: InputVariant
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  classOverrides?: Record<string, string>
}

const defaultBase = 'w-full border outline-none transition-all'

const variantMap: Record<InputVariant, string> = {
  default: 'border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20',
  glass: 'border-white/60 bg-white/25 text-[#1c1f23] placeholder:text-[#71717a] focus-within:border-white/80 focus-within:ring-2 focus-within:ring-white/20 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]',
}

const sizeMap: Record<InputSize, string> = {
  lg: 'py-[7px] px-3 text-sm rounded-lg',
  md: 'py-[5px] px-2.5 text-sm rounded-md',
  sm: 'py-[3px] px-2 text-xs rounded-md',
}

export function Input({ placeholder = '请输入内容...', disabled = false, size = 'lg', variant = 'default', value, onChange, classOverrides }: InputProps) {
  const base = classOverrides?.base ?? defaultBase
  const variantClass = classOverrides?.variant ?? variantMap[variant]
  const sizeClass = classOverrides?.size ?? sizeMap[size]
  const isGlass = variantClass.includes('backdrop-blur')

  if (isGlass) {
    // Wrap in a div for inset shadow — <input> doesn't render inset box-shadow in some browsers
    const wrapperClasses = 'w-full border border-white/60 bg-white/25 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] focus-within:border-white/80 focus-within:ring-2 focus-within:ring-white/20 transition-all'
    return (
      <div className={cn(wrapperClasses, sizeClass.split(' ').find(c => c.startsWith('rounded')) ?? 'rounded-lg', disabled && 'opacity-50 cursor-not-allowed')}>
        <input
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={cn(
            'w-full bg-transparent text-[#1c1f23] placeholder:text-[#71717a] outline-none',
            sizeClass.split(' ').filter(c => !c.startsWith('rounded')).join(' '),
          )}
        />
      </div>
    )
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={cn(base, variantClass, sizeClass, disabled && 'opacity-50 cursor-not-allowed')}
    />
  )
}
