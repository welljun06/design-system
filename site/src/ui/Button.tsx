'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import {
  ArrowDown, ArrowRight, ArrowUp, ArrowLeft,
  Plus, Minus, X, Check,
  Search, Settings, Share2, Download,
  Upload, Send, Heart, Star,
  Edit3, Trash2, Copy, ExternalLink,
  ChevronDown, ChevronRight, ChevronLeft, ChevronUp,
  Loader2,
  type LucideIcon,
} from 'lucide-react'

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

// 可选图标
export type ButtonIconName = 'none' | keyof typeof iconMap

export const iconMap: Record<string, LucideIcon> = {
  'arrow-down': ArrowDown,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-left': ArrowLeft,
  'plus': Plus,
  'minus': Minus,
  'x': X,
  'check': Check,
  'search': Search,
  'settings': Settings,
  'share': Share2,
  'download': Download,
  'upload': Upload,
  'send': Send,
  'heart': Heart,
  'star': Star,
  'edit': Edit3,
  'trash': Trash2,
  'copy': Copy,
  'external-link': ExternalLink,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-up': ChevronUp,
}

type ButtonProps = {
  variant?: ButtonVariant
  content?: ButtonContent
  size?: ButtonSize
  radius?: ButtonRadius
  iconName?: ButtonIconName
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
  'ghost-gray':   'text-[#71717a] hover:bg-[rgba(83,96,143,0.07)]',
  'glass':        'border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 text-[#1c1f23]',
  'solid-white':  'bg-white text-[#09090b] border border-transparent hover:bg-[#f4f4f5]',
  'ai':           'bg-white border border-[rgba(45,66,107,0.12)] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] hover:bg-[#f9f9fb]',
}

const sizeMap: Record<ButtonSize, { h: string; gap: string; text: string; iconSize: string }> = {
  lg: { h: 'h-9', gap: 'gap-2',   text: 'text-sm', iconSize: 'size-4'   },
  md: { h: 'h-8', gap: 'gap-1.5', text: 'text-sm', iconSize: 'size-3.5' },
  sm: { h: 'h-6', gap: 'gap-0.5', text: 'text-xs', iconSize: 'size-3'   },
}

function parseIconSize(cls: string): number {
  const m = cls.match(/^size-(.+)$/)
  if (!m) return 14
  const n = parseFloat(m[1])
  return isNaN(n) ? 14 : n * 4
}

function defaultPadding(size: ButtonSize, radius: ButtonRadius): string {
  // Code-level fallback mapping:
  // - full: lg/md -> px-4 (16px), sm -> px-2 (8px)
  // - rounded: lg/md -> px-3 (12px), sm -> px-1 (4px)
  if (radius === 'full') {
    return size === 'sm' ? 'px-2' : 'px-4'
  }
  return size === 'sm' ? 'px-1' : 'px-3'
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
  iconName = 'arrow-down',
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
  const sizeClass = classOverrides?.size ?? `${s.h} ${s.gap} ${s.text}`
  const iconSizeCls = classOverrides?.iconSize ?? s.iconSize
  const iconPx = parseIconSize(iconSizeCls)
  const iconClass = content === 'icon' ? 'aspect-square' : ''
  const paddingClass = content === 'icon' ? '' : (classOverrides?.padding ?? defaultPadding(size, radius))

  const stateClass = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none'
    : loading
    ? 'opacity-70 cursor-wait'
    : ''

  const aiGradient = 'linear-gradient(155deg, #FFB31E 8%, #49D127 23%, #4592F2 45%, #6E7CFD 66%, #E135F8 92%)'
  const gradId = useId()
  const isAi = variant === 'ai'
  const showIcon = iconName !== 'none'

  // Resolve icon element
  let iconEl: React.ReactNode = null
  if (isAi && showIcon) {
    iconEl = (
      <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="8%" stopColor="#FFB31E" />
            <stop offset="23%" stopColor="#49D127" />
            <stop offset="45%" stopColor="#4592F2" />
            <stop offset="66%" stopColor="#6E7CFD" />
            <stop offset="92%" stopColor="#E135F8" />
          </linearGradient>
        </defs>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" stroke={`url(#${gradId})`} />
        <path d="M20 3v4M22 5h-4" stroke={`url(#${gradId})`} />
      </svg>
    )
  } else if (showIcon) {
    const Icon = iconMap[iconName] ?? ArrowDown
    iconEl = <Icon size={iconPx} />
  }

  const children = loading
    ? <><Loader2 size={iconPx} className="animate-spin" />{content !== 'icon' && <span>Loading...</span>}</>
    : content === 'icon'
    ? iconEl
    : <>{iconEl}<span style={isAi ? { backgroundImage: aiGradient, WebkitBackgroundClip: 'text', color: 'transparent' } : undefined}>{label}</span></>

  return (
    <button
      className={cn(base, variantClass, sizeClass, radiusClass, paddingClass, iconClass, stateClass)}
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
