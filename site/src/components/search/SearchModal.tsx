'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

type ComponentMeta = {
  slug: string
  name: string
  category: string
  description: string
}

type SearchModalProps = {
  open: boolean
  onClose: () => void
  components: ComponentMeta[]
}

export function SearchModal({ open, onClose, components }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ComponentMeta[]>(components)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const fuse = useRef(
    new Fuse(components, {
      keys: ['name', 'category', 'description'],
      threshold: 0.4,
      includeScore: true,
    })
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults(components)
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open, components])

  useEffect(() => {
    if (!query.trim()) {
      setResults(components)
      setSelectedIndex(0)
      return
    }
    const hits = fuse.current.search(query).map((r) => r.item)
    setResults(hits)
    setSelectedIndex(0)
  }, [query, components])

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/components/${slug}`)
      onClose()
    },
    [router, onClose]
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        // Handled in Header, just swallow
      }
      if (!open) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        const item = results[selectedIndex]
        if (item) navigate(item.slug)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, results, selectedIndex, navigate, onClose])

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="w-full max-w-lg rounded-xl overflow-hidden shadow-xl"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 border-b"
          style={{ borderColor: '#e4e4e7', height: '52px' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: '#a1a1aa', flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索组件..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#09090b' }}
          />
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: '#f4f4f5', color: '#a1a1aa', border: '1px solid #e4e4e7' }}
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="py-2 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ color: '#52525b' }}>
              未找到匹配组件
            </div>
          ) : (
            results.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => navigate(item.slug)}
                onMouseEnter={() => setSelectedIndex(i)}
                className="flex items-center gap-3 w-full px-4 py-3 text-left transition-colors"
                style={{
                  backgroundColor: i === selectedIndex ? '#f4f4f5' : 'transparent',
                }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                  style={{ backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: '#09090b' }}>
                      {item.name}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: '#f4f4f5', color: '#a1a1aa' }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#a1a1aa' }}>
                    {item.description}
                  </p>
                </div>
                {i === selectedIndex && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))
          )}
        </div>

        {results.length > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-2 border-t text-xs"
            style={{ borderColor: '#e4e4e7', color: '#a1a1aa' }}
          >
            <span className="flex items-center gap-1">
              <kbd style={{ backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7', padding: '1px 4px', borderRadius: '3px' }}>↑↓</kbd>
              导航
            </span>
            <span className="flex items-center gap-1">
              <kbd style={{ backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7', padding: '1px 4px', borderRadius: '3px' }}>↵</kbd>
              打开
            </span>
            <span className="flex items-center gap-1">
              <kbd style={{ backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7', padding: '1px 4px', borderRadius: '3px' }}>Esc</kbd>
              关闭
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
