'use client'

import React, { useId } from 'react'

// 样式：10 种视觉风格
export type ButtonVariant =
  | 'solid-black'   // 纯黑色
  | 'solid-blue'    // 纯蓝色
  | 'outline-blue'  // 蓝字灰框
  | 'outline-gray'  // 灰字灰框
  | 'ghost-black'   // 黑字无底
  | 'ghost-blue'    // 蓝字无底
  | 'ghost-gray'    // 灰字无底
  | 'glass'         // 玻璃
  | 'solid-white'   // 纯白色
  | 'ai'            // AI 渐变

// 内容：图标+文字 | 纯图标
export type ButtonContent = 'block' | 'icon'

// 尺寸：36px | 32px | 24px
export type ButtonSize = 'lg' | 'md' | 'sm'

// 圆角：圆角矩形 | 全圆角
export type ButtonRadius = 'rounded' | 'full'

type ButtonProps = {
  variant?: ButtonVariant
  content?: ButtonContent
  size?: ButtonSize
  radius?: ButtonRadius
  loading?: boolean
  disabled?: boolean
  label?: string
  classOverrides?: Record<string, string>
}

const variantClasses: Record<ButtonVariant, string> = {
  'solid-black':  'bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90',
  'solid-blue':   'bg-[#2563eb] text-white hover:bg-[#1d4ed8]',
  'outline-blue': 'border border-[#e4e4e7] text-[#2563eb] bg-white hover:bg-[#eff6ff]',
  'outline-gray': 'border border-[#e4e4e7] text-[#71717a] bg-white hover:bg-[#f4f4f5]',
  'ghost-black':  'text-[#09090b] hover:bg-[#f4f4f5]',
  'ghost-blue':   'text-[#2563eb] hover:bg-[#eff6ff]',
  'ghost-gray':   'text-[#71717a] hover:bg-[#f4f4f5]',
  'glass':        'border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 text-[#1c1f23]',
  'solid-white':  'bg-white text-[#09090b] border border-transparent hover:bg-[#f4f4f5]',
  'ai':           'bg-white border border-[rgba(45,66,107,0.12)] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] hover:bg-[#f9f9fb]',
}

const sizeMap: Record<ButtonSize, { h: string; gap: string; text: string; iconSize: string }> = {
  lg: { h: 'h-9', gap: 'gap-2',   text: 'text-sm', iconSize: 'size-4'   },
  md: { h: 'h-8', gap: 'gap-1.5', text: 'text-sm', iconSize: 'size-3.5' },
  sm: { h: 'h-6', gap: 'gap-1.5', text: 'text-xs', iconSize: 'size-3'   },
}

/** Parse a Tailwind size class to a pixel number for SVG attributes */
function parseIconSize(cls: string): number {
  const m = cls.match(/^size-(.+)$/)
  if (!m) return 14
  const n = parseFloat(m[1])
  return isNaN(n) ? 14 : n * 4
}

const paddingDefaults: Record<ButtonSize, string> = {
  lg: 'px-3',
  md: 'px-3',
  sm: 'px-2',
}

const radiusMap: Record<ButtonRadius, string> = {
  rounded: 'rounded-lg',
  full:    'rounded-full',
}

export function Button({
  variant = 'solid-black',
  content = 'block',
  size = 'lg',
  radius = 'rounded',
  loading = false,
  disabled = false,
  label = 'Button',
  classOverrides,
}: ButtonProps) {
  const s = sizeMap[size]

  const base = classOverrides?.base
    ?? 'cursor-pointer transition-all active:scale-95 flex items-center justify-center font-medium'
  const variantClass = classOverrides?.variant ?? variantClasses[variant]

  const radiusClass = classOverrides?.radius ?? radiusMap[radius]

  // size layer: height + gap + text
  const sizeClass = classOverrides?.size ?? `${s.h} ${s.gap} ${s.text}`

  // icon size layer (separate free layer, grouped under size in UI)
  const iconSizeCls = classOverrides?.iconSize ?? s.iconSize
  const iconPx = parseIconSize(iconSizeCls)

  // icon buttons: square (aspect-ratio 1:1), no padding
  const iconClass = content === 'icon' ? 'aspect-square' : ''
  const paddingClass = content === 'icon' ? '' : (classOverrides?.padding ?? paddingDefaults[size])

  const stateClass = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : loading
    ? 'opacity-70 cursor-wait'
    : ''

  const aiGradient = 'linear-gradient(155deg, #FFB31E 8%, #49D127 23%, #4592F2 45%, #6E7CFD 66%, #E135F8 92%)'
  const gradId = useId()

  const AiIcon = (
    <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="8%" stopColor="#FFB31E" />
          <stop offset="23%" stopColor="#49D127" />
          <stop offset="45%" stopColor="#4592F2" />
          <stop offset="66%" stopColor="#6E7CFD" />
          <stop offset="92%" stopColor="#E135F8" />
        </linearGradient>
      </defs>
      <path d="M9.5 2L11 7L16 8.5L11 10L9.5 15L8 10L3 8.5L8 7L9.5 2Z" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 12L19 15L22 16L19 17L18 20L17 17L14 16L17 15L18 12Z" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )

  const ArrowIcon = (
    <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )

  const Spinner = (
    <svg
      width={iconPx}
      height={iconPx}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )

  const isAi = variant === 'ai'
  const icon = isAi ? AiIcon : ArrowIcon

  const children = loading
    ? <>{Spinner}{content !== 'icon' && <span>Loading...</span>}</>
    : content === 'icon'
    ? icon
    : <>{icon}<span style={isAi ? { backgroundImage: aiGradient, WebkitBackgroundClip: 'text', color: 'transparent' } : undefined}>{label}</span></>

  return (
    <button
      className={[base, variantClass, sizeClass, radiusClass, paddingClass, iconClass, stateClass].filter(Boolean).join(' ')}
      style={isAi ? { position: 'relative', overflow: 'hidden' } : undefined}
      disabled={disabled}
    >
      {children}
      {isAi && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, rgba(255,186,51,0.10) 7.59%, rgba(78,217,44,0.10) 23.23%, rgba(69,146,242,0.10) 44.71%, rgba(110,124,253,0.10) 66.35%, rgba(225,53,248,0.10) 92.31%)',
            filter: 'blur(3px)',
            pointerEvents: 'none',
          }}
        />
      )}
    </button>
  )
}
