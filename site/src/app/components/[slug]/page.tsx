import { notFound } from 'next/navigation'
import { registry, getEntry, toSerializable } from '@/lib/registry'
import { highlight } from '@/lib/highlight'
import { readConfig } from '@/lib/configStore'
import { ComponentViewer } from '@/components/showcase/ComponentViewer'

export const dynamicParams = false

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) return { title: 'Not Found' }
  return {
    title: `${entry.name} — Design System`,
    description: entry.description,
  }
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) notFound()

  const initialCode = entry.code()
  const highlightedHtml = await highlight(initialCode)
  const serializableEntry = toSerializable(entry)
  const savedConfig = readConfig(slug)

  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          {entry.name}
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          {entry.description}
        </p>
      </div>

      <ComponentViewer entry={serializableEntry} initialHighlightedHtml={highlightedHtml} savedConfig={savedConfig} />
    </div>
  )
}
