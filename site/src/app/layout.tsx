import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: 'Design System',
  description: 'A minimal design system showcase for vibe coding with React + Tailwind v4.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="flex flex-row" style={{ height: '100vh' }}>
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
