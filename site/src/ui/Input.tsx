import React from 'react'

export type InputSize = 'lg' | 'md' | 'sm'

type InputProps = {
  placeholder?: string
  disabled?: boolean
  size?: InputSize
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  classOverrides?: Record<string, string>
}

const defaultBase = 'w-full border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 transition-all'

const sizeMap: Record<InputSize, string> = {
  lg: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-2.5 py-1.5 text-sm rounded-md',
  sm: 'px-2 py-1 text-xs rounded-md',
}

export function Input({ placeholder = '请输入内容...', disabled = false, size = 'lg', value, onChange, classOverrides }: InputProps) {
  const base = classOverrides?.base ?? defaultBase
  const sizeClass = classOverrides?.size ?? sizeMap[size]

  return (
    <input
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={`${base} ${sizeClass}${disabled ? ' opacity-50 cursor-not-allowed' : ''}`}
    />
  )
}
