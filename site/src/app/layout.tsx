import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { registry } from '@/lib/registry'

export const metadata: Metadata = {
  title: 'Design System',
  description: 'A minimal design system showcase for vibe coding with React + Tailwind v4.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const components = registry.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description,
  }))

  return (
    <html lang="zh-CN">
      <body>
        <Header components={components} />
        <div className="flex flex-row" style={{ height: 'calc(100vh - 52px)' }}>
          <div className="hidden md:flex h-full shrink-0">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-y-auto min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
