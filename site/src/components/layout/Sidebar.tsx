'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SearchModal } from '@/components/search/SearchModal'
import { registry } from '@/lib/registry'

export function Sidebar() {
  const pathname = (usePathname() ?? '').replace(/\/$/, '')
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const primitives = registry.filter((c) => c.category === '基础组件')
  const business = registry.filter((c) => c.category === '业务组件')
  const components = registry.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description,
  }))

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

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <aside
        className="h-full overflow-y-auto border-r flex flex-col"
        style={{ width: '220px', backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
      >
        <div className="px-3 py-5 flex-1">
          <div className="px-3 mb-4">
            <Link href="/" className="text-sm font-semibold" style={{ color: '#09090b' }}>
              Design System
            </Link>
          </div>

          <nav className="mb-6 space-y-1">
            <Link
              href="/"
              className="flex items-center px-3 py-1.5 text-sm rounded-md transition-all"
              style={getLinkStyle('/', { color: '#09090b', fontWeight: 500, backgroundColor: 'transparent' })}
              onMouseEnter={() => setHoveredHref('/')}
              onMouseLeave={() => setHoveredHref(null)}
            >
              首页
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center justify-between px-3 py-1.5 text-sm rounded-md transition-all"
              style={{
                color: hoveredHref === '__search__' ? '#09090b' : '#71717a',
                backgroundColor: hoveredHref === '__search__' ? '#ebebeb' : 'transparent',
              }}
              onMouseEnter={() => setHoveredHref('__search__')}
              onMouseLeave={() => setHoveredHref(null)}
            >
              <span>搜索</span>
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ backgroundColor: '#e4e4e7', color: '#a1a1aa' }}
              >
                ⌘K
              </kbd>
            </button>
            <Link
              href="/scaffold"
              className="flex items-center px-3 py-1.5 text-sm rounded-md transition-all"
              style={getLinkStyle('/scaffold', { color: '#09090b', fontWeight: 500, backgroundColor: 'transparent' })}
              onMouseEnter={() => setHoveredHref('/scaffold')}
              onMouseLeave={() => setHoveredHref(null)}
            >
              快速开始
            </Link>
          </nav>

          <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e4e4e7' }}>
            <p className="px-3 mb-1.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: '#a1a1aa' }}>
              界面模板
            </p>
            <nav>
              {[
                { href: '/templates/ai-create', name: 'AI创作页' },
                { href: '/templates/ai-create-v2', name: 'AI创作页 v2' },
                { href: '/templates/ai-create-detail', name: 'AI创作详情页' },
                { href: '/templates/form', name: '表单页' },
                { href: '/templates/editor', name: '编辑器页' },
                { href: '/templates/resource-list', name: '列表页' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-1.5 text-sm rounded-md transition-all"
                  style={getLinkStyle(item.href, { color: '#09090b', fontWeight: 500, backgroundColor: 'transparent' })}
                  onMouseEnter={() => setHoveredHref(item.href)}
                  onMouseLeave={() => setHoveredHref(null)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {business.length > 0 && (
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e4e4e7' }}>
              <p className="px-3 mb-1.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: '#a1a1aa' }}>
                业务组件
              </p>
              <nav>
                {business.map((item) => {
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
            </div>
          )}

          <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e4e4e7' }}>
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
          </div>
        </div>
      </aside>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} components={components} />
    </>
  )
}
