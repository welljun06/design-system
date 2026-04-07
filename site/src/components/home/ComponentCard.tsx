'use client'

import Link from 'next/link'
import { Button } from '@/ui/Button'

import { Input } from '@/ui/Input'
import { Select } from '@/ui/Select'
import { Tag } from '@/ui/Tag'
import { Tabs } from '@/ui/Tabs'
import { Card } from '@/ui/Card'

function PreviewThumbnail({ slug }: { slug: string }) {
  // Simplified previews — non-interactive, just for visual display
  if (slug === 'button') return (
    <div className="flex items-center gap-2">
      <Button variant="solid-black" label="Button" />
      <Button variant="outline-gray" label="Button" />
      <Button variant="ai" label="AI" radius="full" />
    </div>
  )
  if (slug === 'input') return (
    <div className="w-52">
      <Input />
    </div>
  )
  if (slug === 'select') return (
    <div className="w-52">
      <Select />
    </div>
  )
  if (slug === 'tag') return (
    <div className="flex items-center gap-1.5">
      <Tag color="blue" type="light" />
      <Tag color="green" type="solid" />
      <Tag color="red" type="ghost" />
    </div>
  )
  if (slug === 'tabs') return (
    <Tabs variant="button-rounded" />
  )
  if (slug === 'card') return (
    <div className="w-48">
      <Card />
    </div>
  )
  return null
}

export function ComponentCard({ slug, name, description }: { slug: string; name: string; description: string }) {
  return (
    <Link
      href={`/components/${slug}`}
      className="group flex flex-col rounded-xl border overflow-hidden transition-all hover:shadow-md hover:border-[#d4d4d8]"
      style={{ borderColor: '#e4e4e7' }}
    >
      {/* Preview area */}
      <div
        className="flex items-center justify-center px-6 pointer-events-none"
        style={{ background: 'radial-gradient(41.09% 51.93% at 77% 39.53%, #D5DAEA 0%, #EAEDF3 100%)', height: 160 }}
      >
        <PreviewThumbnail slug={slug} />
      </div>

      {/* Info */}
      <div className="px-4 py-3 bg-white">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: '#09090b' }}>{name}</span>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a1a1aa' }}>
            查看 →
          </span>
        </div>
        <p className="text-xs mt-1 line-clamp-1" style={{ color: '#a1a1aa' }}>{description}</p>
      </div>
    </Link>
  )
}
