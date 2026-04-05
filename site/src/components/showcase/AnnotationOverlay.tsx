'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { getCssValue } from '@/lib/classParser'

const C = '#f43f5e' // annotation pink

// ─── Primitives ────────────────────────────────────────────────────────────────

function Label({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        fontSize: 10,
        lineHeight: 1,
        fontFamily: "'Menlo','Monaco','Consolas',monospace",
        color: C,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// Horizontal measurement bar  ├──── label ────┤
function HBar({ width, label }: { width: number; label: string }) {
  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Label>{label}</Label>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 1, height: 5, background: C, flexShrink: 0 }} />
        <div style={{ flex: 1, height: 1, background: C }} />
        <div style={{ width: 1, height: 5, background: C, flexShrink: 0 }} />
      </div>
    </div>
  )
}

// Vertical measurement bracket  ┤ label
function VBar({ height, label }: { height: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, height }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 5, height: 1, background: C, flexShrink: 0 }} />
        <div style={{ flex: 1, width: 1, background: C }} />
        <div style={{ width: 5, height: 1, background: C, flexShrink: 0 }} />
      </div>
      <Label>{label}</Label>
    </div>
  )
}

// Corner radius arc icon
function RadiusArc({ radiusPx }: { radiusPx: number }) {
  const S = 20
  const r = Math.min(radiusPx, S - 3)
  const d = radiusPx >= 9000
    ? `M ${S} 2 L ${S / 2} 2 Q 2 2 2 ${S / 2} L 2 ${S}`
    : `M ${S} 2 L ${r + 2} 2 Q 2 2 2 ${r + 2} L 2 ${S}`
  return (
    <svg width={S} height={S} fill="none" stroke={C} strokeWidth="1.5" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function AnnotationOverlay({
  editedLayers,
  children,
}: {
  editedLayers: Record<string, string[]>
  children: ReactNode
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  // Measure the inner button element (re-runs when classes change)
  useEffect(() => {
    if (!wrapRef.current) return
    const btn = wrapRef.current.firstElementChild as HTMLElement | null
    if (!btn) return

    const measure = () => setSize({ w: btn.offsetWidth, h: btn.offsetHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(btn)
    return () => ro.disconnect()
  }, [editedLayers])

  // Extract values from ALL layers (scan every layer for relevant classes)
  const allClasses = Object.values(editedLayers).flat()

  const pxCls      = allClasses.find(c => c.startsWith('px-'))
  const hCls       = allClasses.find(c => c.startsWith('h-'))
  const gapCls     = allClasses.find(c => c.startsWith('gap-'))
  const roundedCls = allClasses.find(c => c === 'rounded' || c.startsWith('rounded-'))
  const textCls    = allClasses.find(c => /^text-(xs|sm|base|lg|xl|2xl|3xl)$/.test(c))
  const iconCls    = allClasses.find(c => c.startsWith('size-'))

  const pxPx      = pxCls     ? parseFloat(getCssValue(pxCls)     ?? '0') || 0 : 0
  const hValue    = hCls      ? getCssValue(hCls)                              : null
  const gapValue  = gapCls    ? getCssValue(gapCls)                            : null
  const radValue  = roundedCls ? getCssValue(roundedCls)                       : null
  const radPx     = radValue  ? parseFloat(radValue) || 0                      : 0
  const textValue = textCls   ? getCssValue(textCls)                           : null
  const iconValue = iconCls   ? getCssValue(iconCls)                           : null

  const OUTER = 52 // padding around button to fit annotation labels

  return (
    <div style={{ position: 'relative', display: 'inline-flex', padding: OUTER }}>

      {/* ── Button + padding bands ── */}
      <div ref={wrapRef} style={{ position: 'relative', display: 'inline-flex' }}>
        {children}

        {size && pxPx > 0 && (
          <>
            {/* Left padding band */}
            <div style={{
              position: 'absolute', left: 0, top: 0,
              width: pxPx, height: size.h,
              background: 'rgba(244,63,94,0.10)',
              borderRight: '1px dashed rgba(244,63,94,0.45)',
              pointerEvents: 'none', zIndex: 10,
            }} />
            {/* Right padding band */}
            <div style={{
              position: 'absolute', right: 0, top: 0,
              width: pxPx, height: size.h,
              background: 'rgba(244,63,94,0.10)',
              borderLeft: '1px dashed rgba(244,63,94,0.45)',
              pointerEvents: 'none', zIndex: 10,
            }} />
          </>
        )}
      </div>

      {/* ── Outer annotations (absolute, relative to outer container) ── */}
      {size && (
        <>
          {/* Padding X — left half-bar above button */}
          {pxCls && pxPx > 0 && (
            <div style={{
              position: 'absolute',
              left: OUTER,
              top: OUTER - 34,
              display: 'flex',
              gap: size.w - pxPx * 2, // skip the content area
            }}>
              <HBar width={pxPx} label={`${pxCls} · ${pxPx}px`} />
              <HBar width={pxPx} label={`${pxCls} · ${pxPx}px`} />
            </div>
          )}

          {/* Height — bracket on the right */}
          {hCls && hValue && (
            <div style={{
              position: 'absolute',
              left: OUTER + size.w + 10,
              top: OUTER,
            }}>
              <VBar height={size.h} label={`${hCls} · ${hValue}`} />
            </div>
          )}

          {/* Gap — label centered at bottom (if block content) */}
          {gapCls && gapValue && size.w > pxPx * 2 && (
            <div style={{
              position: 'absolute',
              left: OUTER + pxPx,
              top: OUTER + size.h + 8,
              width: size.w - pxPx * 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}>
              <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 1, height: 4, background: C, flexShrink: 0 }} />
                <div style={{ flex: 1, height: 1, background: C }} />
                <div style={{ width: 1, height: 4, background: C, flexShrink: 0 }} />
              </div>
              <Label>{gapCls} · {gapValue}</Label>
            </div>
          )}

          {/* Radius — arc icon + label at bottom-left corner */}
          {roundedCls && radValue && (
            <div style={{
              position: 'absolute',
              left: OUTER - 4,
              top: OUTER + size.h + (gapCls ? 40 : 10),
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <RadiusArc radiusPx={radPx} />
              <Label>{roundedCls} · {radValue}</Label>
            </div>
          )}

          {/* Font size + Icon size — labels on the left */}
          {(textCls || iconCls) && (
            <div style={{
              position: 'absolute',
              right: OUTER + size.w + 10,
              top: OUTER,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              alignItems: 'flex-end',
            }}>
              {textCls && textValue && (
                <Label>
                  <span style={{ opacity: 0.5 }}>T</span> {textCls} · {textValue}
                </Label>
              )}
              {iconCls && iconValue && (
                <Label>
                  <span style={{ opacity: 0.5 }}>◇</span> {iconCls} · {iconValue}
                </Label>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
