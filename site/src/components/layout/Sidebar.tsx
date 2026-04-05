'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { registry } from '@/lib/registry'

export function Sidebar() {
  const pathname = (usePathname() ?? '').replace(/\/$/, '')
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  const primitives = registry.filter((c) => c.category === '基础组件')

  const isActive = (href: string) => pathname === href

  const getLinkStyle = (href: string, activeStyle: React.CSSProperties) => {
    const active = isActive(href)
    if (active) return activeStyle
    const hovered = hoveredHref === href
    return {
      color: '#71717a',
      backgroundColor: hovered ? '#ebebeb' : 'transparent',
    }
  }

  return (
    <aside
      className="h-full overflow-y-auto border-r flex flex-col"
      style={{ width: '220px', backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
    >
      <div className="px-3 py-5 flex-1">
        <p className="px-3 mb-1.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: '#a1a1aa' }}>
          基础组件
        </p>
        <nav>
          {primitives.map((item) => {
            const href = `/components/${item.slug}`
            return (
              <Link
                key={item.slug}
                href={href}
                className="flex items-center px-3 py-1.5 text-sm rounded-md transition-all"
                style={getLinkStyle(href, { color: '#09090b', fontWeight: 500, backgroundColor: 'transparent' })}
                onMouseEnter={() => setHoveredHref(href)}
                onMouseLeave={() => setHoveredHref(null)}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e4e4e7' }}>
          <nav>
            {(() => {
              const href = '/scaffold'
              return (
                <Link
                  href={href}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all"
                  style={getLinkStyle(href, { backgroundColor: '#18181b', color: '#ffffff', fontWeight: 500 })}
                  onMouseEnter={() => setHoveredHref(href)}
                  onMouseLeave={() => setHoveredHref(null)}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                  脚手架
                </Link>
              )
            })()}
          </nav>
        </div>
      </div>
    </aside>
  )
}
