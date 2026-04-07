'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export type CheckboxVariant = 'default' | 'card'

type CheckboxProps = {
  variant?: CheckboxVariant
  disabled?: boolean
  classOverrides?: Record<string, string>
}

export function Checkbox({ variant = 'default', disabled = false, classOverrides }: CheckboxProps) {
  const boxClass = classOverrides?.box ?? 'h-4 w-4 rounded-[3px]'
  const labelClass = classOverrides?.label ?? 'text-sm leading-5 font-normal text-[#1c1f23]'
  const cardTitleClass = classOverrides?.cardTitle ?? 'text-sm leading-5 font-semibold text-[#1c1f23]'
  const descriptionClass = classOverrides?.description ?? 'text-sm leading-5 text-[rgba(28,31,35,0.6)]'

  const renderBox = (id: string, checked: boolean) => (
    <div className="relative h-5 w-4 shrink-0">
      <ShadcnCheckbox
        id={id}
        defaultChecked={checked}
        disabled={disabled}
        className={cn('absolute left-0 top-[2px]', boxClass)}
        indicatorClassName='[&>svg]:h-2.5 [&>svg]:w-2.5'
      />
    </div>
  )

  if (variant === 'card') {
    const cardBase = 'flex items-start gap-2 rounded-[8px] border px-[17px] py-[13px]'
    const cardChecked = classOverrides?.cardChecked ?? 'border-[rgba(45,66,107,0.12)] bg-[#f5f7fa]'
    const cardUnchecked = classOverrides?.cardUnchecked ?? 'border-[rgba(45,66,107,0.12)] bg-white'

    return (
      <div className="flex flex-col gap-2 py-1">
        <label className={cn(cardBase, cardChecked, disabled && 'cursor-not-allowed')}>
          {renderBox('cb-card-1', true)}
          <div className="flex flex-col gap-1">
            <span className={cn('cursor-pointer select-none', disabled ? 'text-[rgba(34,39,39,0.35)]' : cardTitleClass)}>选择框标题</span>
            <span className={cn('select-none', disabled ? 'text-[rgba(34,39,39,0.35)]' : descriptionClass)}>这里可以写选项的描述文案</span>
          </div>
        </label>
        <label className={cn(cardBase, cardUnchecked, disabled && 'cursor-not-allowed')}>
          {renderBox('cb-card-2', false)}
          <div className="flex flex-col gap-1">
            <span className={cn('cursor-pointer select-none', disabled ? 'text-[rgba(34,39,39,0.35)]' : cardTitleClass)}>选择框标题</span>
            <span className={cn('select-none', disabled ? 'text-[rgba(34,39,39,0.35)]' : descriptionClass)}>这里可以写选项的描述文案</span>
          </div>
        </label>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 py-1">
      <div className="flex items-start gap-2">
        {renderBox('cb-demo-1', true)}
        <Label htmlFor="cb-demo-1" className={cn('cursor-pointer select-none', disabled ? 'text-[rgba(34,39,39,0.35)]' : labelClass)}>选择框标题</Label>
      </div>
      <div className="flex items-start gap-2">
        {renderBox('cb-demo-2', false)}
        <Label htmlFor="cb-demo-2" className={cn('cursor-pointer select-none', disabled ? 'text-[rgba(34,39,39,0.35)]' : labelClass)}>选择框标题</Label>
      </div>
    </div>
  )
}
