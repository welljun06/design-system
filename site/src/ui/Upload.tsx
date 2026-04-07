'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

export type UploadSize = 'lg' | 'md' | 'sm'

type UploadProps = {
  size?: UploadSize
  disabled?: boolean
  classOverrides?: Record<string, string>
}

const sizeMap: Record<UploadSize, string> = {
  lg: 'size-24 rounded-lg',
  md: 'size-20 rounded-lg',
  sm: 'size-16 rounded-md',
}

const iconSizeMap: Record<UploadSize, number> = { lg: 24, md: 20, sm: 16 }

export function Upload({ size = 'lg', disabled = false, classOverrides }: UploadProps) {
  const itemSize = classOverrides?.item ?? sizeMap[size]
  const trigger = classOverrides?.trigger ?? 'border border-dashed border-[#d4d4d8] bg-white flex items-center justify-center cursor-pointer hover:bg-[#fafafa] transition-colors'
  const preview = classOverrides?.preview ?? 'overflow-hidden bg-[#f0f0f0]'

  return (
    <div className={cn('flex items-start gap-2', disabled && 'opacity-50 cursor-not-allowed')}>
      <div className={cn(itemSize, preview)}>
        <div className="w-full h-full bg-gradient-to-br from-[#4a90d9] to-[#2c5f8a]" />
      </div>
      <div className={cn(itemSize, trigger, disabled && 'pointer-events-none')}>
        <Plus size={iconSizeMap[size]} className="text-[#a1a1aa]" />
      </div>
    </div>
  )
}
