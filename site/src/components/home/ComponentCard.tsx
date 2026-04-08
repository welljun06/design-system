'use client'

import Link from 'next/link'
import { Button } from '@/ui/Button'
import { cn } from '@/lib/utils'

import { Input } from '@/ui/Input'
import { Select } from '@/ui/Select'
import { Tag } from '@/ui/Tag'
import { Tabs } from '@/ui/Tabs'
import { Card } from '@/ui/Card'
import { AgentCard } from '@/ui/AgentCard'
import { ResourceCard } from '@/ui/ResourceCard'
import { Form } from '@/ui/Form'
import { Textarea } from '@/ui/Textarea'
import { Checkbox } from '@/ui/Checkbox'
import { RadioGroup } from '@/ui/RadioGroup'
import { Switch } from '@/ui/Switch'
import { Slider } from '@/ui/Slider'
import { Upload } from '@/ui/Upload'
import { InputGroup } from '@/ui/InputGroup'
import { Nav } from '@/ui/Nav'
import { BusinessSelector } from '@/ui/BusinessSelector'
import { Filter } from '@/ui/Filter'

function usesTopCropPreview(slug: string) {
  return slug === 'nav'
}

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
  if (slug === 'resource-card') return (
    <div className="w-[180px]">
      <ResourceCard />
    </div>
  )
  if (slug === 'agent-card') return (
    <div className="scale-[0.46] origin-center">
      <AgentCard />
    </div>
  )
  if (slug === 'form') return (
    <div className="scale-[0.85] origin-center">
      <Form fieldType="input" />
    </div>
  )
  if (slug === 'textarea') return (
    <div className="w-52 scale-[0.92] origin-center">
      <Textarea />
    </div>
  )
  if (slug === 'checkbox') return (
    <div className="scale-[0.82] origin-center">
      <Checkbox variant="default" />
    </div>
  )
  if (slug === 'radio-group') return (
    <div className="scale-[0.82] origin-center">
      <RadioGroup size="sm" />
    </div>
  )
  if (slug === 'switch') return (
    <div className="flex items-center gap-3">
      <Switch size="md" />
      <Switch size="sm" />
    </div>
  )
  if (slug === 'slider') return (
    <div className="w-52">
      <Slider size="sm" />
    </div>
  )
  if (slug === 'upload') return (
    <div className="scale-[0.9] origin-center">
      <Upload size="sm" />
    </div>
  )
  if (slug === 'input-group') return (
    <div className="w-56 scale-[0.9] origin-center">
      <InputGroup size="sm" />
    </div>
  )
  if (slug === 'nav') return (
    <div className="scale-[0.42] origin-top">
      <Nav />
    </div>
  )
  if (slug === 'business-selector') return (
    <div className="relative h-full w-[188px] overflow-hidden">
      <div
        className="absolute left-1/2 top-3 origin-top"
        style={{ transform: 'translateX(-50%) scale(0.3)' }}
      >
        <BusinessSelector />
      </div>
    </div>
  )
  if (slug === 'filter') return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 w-[560px] origin-center"
        style={{ transform: 'translate(-50%, -50%) scale(0.42)' }}
      >
        <Filter
          searchPlaceholder="搜索"
          filters={['更新时间', '模式']}
          filterOptions={[
            [
              { value: 'updated-desc', label: '最近更新' },
              { value: 'created-desc', label: '最近创建' },
            ],
            [
              { value: 'all', label: '全部模式' },
              { value: 'agent', label: '智能体' },
            ],
          ]}
          ownershipLabel="我创建的"
          actionLabel="新增智能体"
        />
      </div>
    </div>
  )
  return null
}

export function ComponentCard({ slug, name, description }: { slug: string; name: string; description: string }) {
  const topCropPreview = usesTopCropPreview(slug)

  return (
    <Link
      href={`/components/${slug}`}
      className="group flex flex-col rounded-xl border overflow-hidden transition-all hover:shadow-md hover:border-[#d4d4d8]"
      style={{ borderColor: '#e4e4e7' }}
    >
      {/* Preview area */}
      <div
        className={cn(
          'flex justify-center overflow-hidden px-6 pointer-events-none',
          topCropPreview ? 'items-start pt-4' : 'items-center'
        )}
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
