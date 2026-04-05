import React from 'react'

type GlassButtonProps = {
  shape?: 'circle' | 'pill'
  children?: React.ReactNode
  onClick?: () => void
  classOverrides?: Record<string, string>
}

const defaultClasses = {
  base: 'cursor-pointer border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 transition-colors transition-transform active:scale-95',
  circle: 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
  pill: 'flex h-9 items-center justify-center rounded-[39px] px-4 text-sm text-[#1c1f23] leading-[20px]',
}

export function GlassButton({ shape = 'pill', children, onClick, classOverrides }: GlassButtonProps) {
  const base = classOverrides?.base ?? defaultClasses.base
  const shapeClass = shape === 'circle'
    ? (classOverrides?.shape ?? defaultClasses.circle)
    : (classOverrides?.shape ?? defaultClasses.pill)

  return (
    <button className={`${base} ${shapeClass}`} onClick={onClick}>
      {children ?? (shape === 'circle' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      ) : 'Click me')}
    </button>
  )
}
