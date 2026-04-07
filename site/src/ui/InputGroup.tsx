import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export type InputGroupSize = 'lg' | 'md' | 'sm'

type InputGroupProps = {
  size?: InputGroupSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<InputGroupSize, { wrapper: string; icon: number }> = {
  lg: { wrapper: 'py-[7px] px-3 text-sm rounded-lg', icon: 16 },
  md: { wrapper: 'py-[5px] px-2.5 text-sm rounded-md', icon: 14 },
  sm: { wrapper: 'py-[3px] px-2 text-xs rounded-md', icon: 12 },
}

export function InputGroup({ size = 'lg', disabled = false, classOverrides }: InputGroupProps) {
  const s = sizeMap[size]
  const base = classOverrides?.base ?? 'border border-[#e4e4e7] bg-white transition-all outline-none'
  const sizeClass = classOverrides?.size ?? s.wrapper
  const selectWidth = classOverrides?.selectWidth ?? 'w-[115px]'

  const radiusL = sizeClass.includes('rounded-lg') ? 'rounded-l-lg' : 'rounded-l-md'
  const radiusR = sizeClass.includes('rounded-lg') ? 'rounded-r-lg' : 'rounded-r-md'
  const sizeNoRadius = sizeClass.replace(/rounded-\S+/g, '').trim()

  return (
    <div className={cn('flex items-center w-full', disabled && 'opacity-50 cursor-not-allowed')}>
      <div className={cn('shrink-0 flex items-center justify-between border-r-0 cursor-pointer', base, sizeNoRadius, radiusL, selectWidth)}>
        <span className="text-[#a1a1aa] select-none">请选择</span>
        <ChevronDown size={s.icon} className="text-[#a1a1aa]" />
      </div>
      <input
        type="text"
        placeholder="请输入"
        disabled={disabled}
        className={cn('flex-1 min-w-0 text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20', base, sizeNoRadius, radiusR)}
      />
    </div>
  )
}
