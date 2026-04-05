import React from 'react'

type DarkButtonProps = {
  variant?: 'default' | 'icon'
  children?: React.ReactNode
  onClick?: () => void
  classOverrides?: Record<string, string>
}

const defaultClasses = {
  base: 'cursor-pointer bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90 transition-transform active:scale-95',
  default: 'flex h-9 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium',
  icon: 'flex h-9 w-9 items-center justify-center rounded-full',
}

export function DarkButton({ variant = 'default', children, onClick, classOverrides }: DarkButtonProps) {
  const base = classOverrides?.base ?? defaultClasses.base
  const variantClass = variant === 'icon'
    ? (classOverrides?.variant ?? defaultClasses.icon)
    : (classOverrides?.variant ?? defaultClasses.default)

  return (
    <button className={`${base} ${variantClass}`} onClick={onClick}>
      {children ?? (variant === 'icon' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          Download
        </>
      ))}
    </button>
  )
}
