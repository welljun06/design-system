import Link from 'next/link'
import { registry } from '@/lib/registry'

export default function HomePage() {
  const primitives = registry.filter((c) => c.category === '基础组件')

  return (
    <div className="px-8 py-12 max-w-5xl">
      <div className="mb-14">
        <h1 className="text-2xl font-semibold tracking-tight mb-3" style={{ color: '#09090b' }}>
          Design System
        </h1>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: '#71717a' }}>
          AI 平台 vibe coding 组件库。React 19 + Tailwind v4，附带实时样式编辑器。
        </p>
        <div className="flex items-center gap-4 mt-6">
          <Link
            href="/components/button"
            className="flex items-center gap-1.5 px-4 h-8 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: 'linear-gradient(180deg, #323232 0%, #222222 100%)', color: '#fafafa' }}
          >
            浏览组件
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/scaffold"
            className="text-sm transition-colors hover:text-[#09090b]"
            style={{ color: '#71717a' }}
          >
            获取脚手架 →
          </Link>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-medium mb-3 uppercase tracking-wider" style={{ color: '#a1a1aa' }}>
          基础组件
        </p>
        <div style={{ borderTop: '1px solid #e4e4e7' }}>
          {primitives.map((c) => (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className="group flex items-center justify-between py-3 border-b transition-colors hover:bg-[#fafafa] -mx-2 px-2 rounded"
              style={{ borderColor: '#e4e4e7', color: '#71717a' }}
            >
              <span className="text-sm font-medium" style={{ color: '#09090b' }}>{c.name}</span>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a1a1aa' }}>
                查看 →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
