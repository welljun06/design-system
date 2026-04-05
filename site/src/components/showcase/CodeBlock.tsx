'use client'

import { useState } from 'react'

type CodeBlockProps = {
  highlightedHtml: string
  rawCode: string
}

export function CodeBlock({ highlightedHtml, rawCode }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: do nothing
    }
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{ border: '1px solid #e4e4e7' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#a1a1aa' }}>
            JSX
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all"
          style={{
            backgroundColor: copied ? '#f0fdf4' : '#f4f4f5',
            color: copied ? '#16a34a' : '#71717a',
            border: `1px solid ${copied ? '#bbf7d0' : '#e4e4e7'}`,
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        style={{ backgroundColor: '#f6f8fa' }}
      />
    </div>
  )
}
