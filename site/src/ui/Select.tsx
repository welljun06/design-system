'use client'

import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SelectSize = 'lg' | 'md' | 'sm'
export type SelectVariant = 'default' | 'glass'
export type SelectShape = 'rounded' | 'full'
export type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  size?: SelectSize
  variant?: SelectVariant
  shape?: SelectShape
  disabled?: boolean
  placeholder?: string
  prefixLabel?: string
  clearable?: boolean
  options?: SelectOption[]
  classOverrides?: Record<string, string>
}

const defaultBase = 'border outline-none transition-all cursor-pointer'

const variantMap: Record<SelectVariant, string> = {
  default: 'border-[#e4e4e7] bg-white text-[#1c1f23] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20',
  glass: 'border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] text-[#1c1f23] focus:border-white/80 focus:ring-2 focus:ring-white/20 backdrop-blur-sm',
}

const sizeMap: Record<SelectSize, string> = {
  lg: 'py-[7px] text-sm',
  md: 'py-[5px] text-sm',
  sm: 'py-[3px] text-xs',
}

function getShapeClass(size: SelectSize, shape: SelectShape) {
  if (shape === 'full') return 'px-4 rounded-full'
  if (size === 'lg') return 'px-3 rounded-lg'
  if (size === 'md') return 'px-2.5 rounded-md'
  return 'px-2 rounded-md'
}

function getIconOffsetClass(size: SelectSize, shape: SelectShape) {
  if (shape === 'full') return 'right-4'
  if (size === 'lg') return 'right-3'
  if (size === 'md') return 'right-2.5'
  return 'right-2'
}

const demoOptions = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
]

export function Select({
  size = 'lg',
  variant = 'default',
  shape = 'rounded',
  disabled = false,
  placeholder,
  prefixLabel,
  clearable = false,
  options = demoOptions,
  classOverrides,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const suppressNextOpenRef = React.useRef(false)
  const base = classOverrides?.base ?? defaultBase
  const variantClass = classOverrides?.variant ?? variantMap[variant]
  const sizeClass = classOverrides?.size ?? sizeMap[size]
  const shapeClass = classOverrides?.shape || getShapeClass(size, shape)
  const iconOffsetClass = getIconOffsetClass(size, shape)
  const isSmall = size === 'sm'
  const isGlass = variant === 'glass'
  const effectivePlaceholder = prefixLabel ? placeholder : (placeholder ?? '请选择...')
  const hasSelectedValue = selectedValue !== ''
  const selectedOptionLabel = options.find((opt) => opt.value === selectedValue)?.label
  const displayText = hasSelectedValue ? (selectedOptionLabel ?? '') : (effectivePlaceholder ?? '')
  const triggerIconColor = isGlass ? '#71717a' : '#a1a1aa'

  return (
    <div className="group relative w-full">
      <SelectPrimitive.Root
        disabled={disabled}
        value={selectedValue}
        onValueChange={setSelectedValue}
        open={open}
        onOpenChange={(nextOpen) => {
          if (suppressNextOpenRef.current) {
            suppressNextOpenRef.current = false
            if (nextOpen) return
          }
          setOpen(nextOpen)
        }}
      >
        <SelectPrimitive.Trigger asChild>
          <button
            className={cn(
              'relative w-full flex items-center',
              base,
              variantClass,
              sizeClass,
              shapeClass,
              'data-[placeholder]:text-[#a1a1aa]',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <span
              className={cn(
                'flex min-w-0 flex-1 items-center pr-5 text-left',
                prefixLabel && hasSelectedValue ? 'gap-2' : 'gap-0'
              )}
            >
              {prefixLabel ? (
                <span className="shrink-0 whitespace-nowrap font-semibold leading-5 text-[rgba(34,39,39,0.8)]">
                  {prefixLabel}
                </span>
              ) : null}
              <span className="min-w-0 truncate">
                {displayText}
              </span>
            </span>
            <span
              className={cn(
                'absolute top-1/2 z-[1] inline-flex size-4 -translate-y-1/2 items-center justify-center transition-opacity',
                iconOffsetClass,
                clearable && hasSelectedValue && 'group-hover:opacity-0'
              )}
            >
              <ChevronDown size={isSmall ? 12 : 14} color={triggerIconColor} />
            </span>
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
              {options.map((opt) => (
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

      {clearable && hasSelectedValue ? (
        <button
          type="button"
          aria-label="清空选择"
          className={cn(
            'absolute top-1/2 z-[1] inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-full text-[#a1a1aa] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[rgba(45,66,107,0.08)]',
            iconOffsetClass
          )}
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            suppressNextOpenRef.current = true
            setOpen(false)
          }}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            suppressNextOpenRef.current = true
            setOpen(false)
            setSelectedValue('')
          }}
        >
          <X size={isSmall ? 10 : 12} />
        </button>
      ) : null}
    </div>
  )
}
