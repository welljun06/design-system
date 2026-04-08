import { Bot, Eye, GitBranch, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tag } from '@/ui/Tag'
import { Button } from '@/ui/Button'

export type AgentCardVariant = 'default' | 'featured' | 'list'
export type AgentCardKind = 'agent' | 'workflow'

type AgentCardProps = {
  variant?: AgentCardVariant
  kind?: AgentCardKind
  content?: Partial<{
    title: string
    description: string
    author: string
    updatedAt: string
    messageCount: string
    favoriteCount: string
  }>
  classOverrides?: Record<string, string>
}

const defaultClasses = {
  container: 'group relative isolate w-[404px] max-w-full overflow-hidden rounded-[20px] border border-[rgba(45,66,107,0.12)] bg-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(124,246,254,0.1),0_18px_38px_-18px_rgba(124,246,254,0.28),0_12px_28px_-18px_rgba(246,111,17,0.14)]',
  inner: 'flex flex-col gap-3 p-5',
  cover: 'relative size-16 shrink-0 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_20%_20%,#9ce8ff_0%,#55b6ff_30%,#3d67ff_65%,#1f2147_100%)]',
  title: 'text-base font-semibold leading-[22px] text-[#222727]',
  tag: 'inline-flex h-5 shrink-0 items-center gap-1 rounded-md border border-[rgba(45,66,107,0.12)] bg-white px-1.5 text-xs font-semibold leading-4 text-[#e72e75]',
  description: 'text-xs leading-4 text-[rgba(34,39,39,0.6)]',
  author: 'text-xs leading-[18px] text-[rgba(34,39,39,0.6)]',
  meta: 'text-xs leading-4 text-[rgba(34,39,39,0.6)]',
}

const featuredDefaults = {
  container: 'group relative isolate w-[313px] max-w-full rounded-[24px] bg-[#7da489] p-1 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(124,246,254,0.12),0_20px_40px_-20px_rgba(124,246,254,0.32),0_14px_30px_-20px_rgba(246,111,17,0.16)]',
  inner: 'relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[20px] p-4',
  title: 'text-base font-medium leading-[18px] text-white',
  description: 'text-xs leading-[18px] text-white',
  author: 'text-xs leading-[18px] text-white',
  meta: 'text-xs leading-[18px] text-white',
}

const listDefaults = {
  container: 'group relative isolate w-[404px] max-w-full overflow-hidden rounded-[20px] border border-[rgba(45,66,107,0.12)] bg-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(124,246,254,0.1),0_18px_38px_-18px_rgba(124,246,254,0.28),0_12px_28px_-18px_rgba(246,111,17,0.14)]',
  inner: 'flex flex-col gap-3 px-5 pb-4 pt-5',
  title: 'text-base font-semibold leading-[22px] text-[#222727]',
  description: 'text-xs leading-4 text-[rgba(34,39,39,0.6)]',
  author: 'text-xs leading-[18px] text-[rgba(34,39,39,0.6)]',
  meta: 'text-xs leading-4 text-[rgba(34,39,39,0.6)]',
}

function AgentTag({ kind, className }: { kind: AgentCardKind; className: string }) {
  const icon =
    kind === 'workflow' ? (
      <GitBranch className="size-3" strokeWidth={2} />
    ) : (
      <Bot className="size-3" strokeWidth={2} />
    )

  return (
    <span className={cn('shrink-0', className)}>
      <Tag color="white" type="ghost" size="md" shape="square">
        {icon}
      </Tag>
    </span>
  )
}

function CoverArtwork({ className }: { className: string }) {
  return (
    <div className={className}>
      <img
        src="/figma/agent-card-avatar-placeholder.svg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
    </div>
  )
}

function AppChip({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        'flex size-6 items-center justify-center rounded-xl text-[11px] font-semibold leading-none',
        dark ? 'bg-black text-white' : 'bg-[#f2f4f7] text-[#4b5563]'
      )}
    >
      {label}
    </div>
  )
}

export function AgentCard({ variant = 'default', kind = 'agent', content, classOverrides }: AgentCardProps) {
  if (variant === 'featured') {
    const container = featuredDefaults.container
    const inner = featuredDefaults.inner
    const title = featuredDefaults.title
    const description = featuredDefaults.description
    const author = featuredDefaults.author
    const meta = featuredDefaults.meta

    return (
      <article className={container}>
        <div className={inner}>
          <img
            src="/figma/agent-card-featured-bg.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(187.283deg, rgb(125, 164, 137) 2.0293%, rgba(125, 164, 137, 0) 22.153%, rgba(125, 164, 137, 0) 55.482%, rgb(125, 164, 137) 72.23%)',
            }}
          />
          <div className="relative z-[1] flex h-[90px] flex-col justify-end gap-2">
            <h3 className={title}>抖音账号小助手</h3>
            <p className={cn('line-clamp-2 h-9', description)}>
              服务于抖音官方 B 号，能够为 C 端用户解答抖音账号相关疑问，提供查询抖音账号相关数据的服务，实现用户与官方直接对话。
            </p>
            <div className="flex h-5 items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#8b6b57_0%,#d7dce1_46%,#93a8b2_100%)] text-[10px] font-semibold leading-none text-white">
                  S
                </div>
                <span className={author}>SSSHY99</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn('flex items-center gap-1', meta)}>
                  <Eye className="size-3" strokeWidth={1.8} />
                  <span>286k</span>
                </div>
                <span className="h-[10px] w-px bg-white/12" />
                <div className={cn('flex items-center gap-1', meta)}>
                  <Bot className="size-3" strokeWidth={1.8} />
                  <span>86</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  const container = classOverrides?.container ?? defaultClasses.container
  const inner = classOverrides?.inner ?? defaultClasses.inner
  const cover = classOverrides?.cover ?? defaultClasses.cover
  const title = classOverrides?.title ?? defaultClasses.title
  const description = classOverrides?.description ?? defaultClasses.description
  const author = classOverrides?.author ?? defaultClasses.author
  const meta = classOverrides?.meta ?? defaultClasses.meta
  const titleText = content?.title ?? '爆款短视频灵感助手'
  const descriptionText = content?.description ?? '从 0 到 1 打造爆款短视频，创意灵感源源不断，源源不断'
  const authorText = content?.author ?? 'SSSHY99'
  const updatedAtText = content?.updatedAt ?? '更新于 2022-09-21 00:00'
  const messageCount = content?.messageCount ?? '233'
  const favoriteCount = content?.favoriteCount ?? '3'

  if (variant === 'list') {
    const listContainer = classOverrides?.container ?? listDefaults.container
    const listInner = classOverrides?.inner ?? listDefaults.inner
    const listTitle = classOverrides?.title ?? listDefaults.title
    const listDescription = classOverrides?.description ?? listDefaults.description
    const listAuthor = classOverrides?.author ?? listDefaults.author

    return (
      <article className={listContainer}>
        <div className={listInner}>
          <div className="flex items-start gap-3">
            <CoverArtwork className={cover} />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex min-w-0 items-center gap-1">
                <h3 className={cn('min-w-0 max-w-full truncate', listTitle)}>{titleText}</h3>
                <Tag color="green" type="light" size="md" shape="square">
                  已发布
                </Tag>
                <AgentTag kind={kind} className="leading-none" />
              </div>
              <p className={cn('truncate', listDescription)}>{descriptionText}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#ff9968_0%,#ff5d5d_100%)] text-[10px] font-semibold leading-none text-white">
              S
            </div>
            <span className={listAuthor}>
              {authorText} ｜{updatedAtText}
            </span>
          </div>

          <div className="h-px w-full bg-[rgba(45,66,107,0.12)]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <AppChip label="抖" dark />
              <AppChip label="剪" />
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost-black"
                content="block"
                size="sm"
                radius="rounded"
                iconName="edit"
                label="做同款"
              />
              <Button
                variant="ghost-black"
                content="icon"
                size="sm"
                radius="rounded"
                iconName="star"
              />
              <Button
                variant="ghost-black"
                content="icon"
                size="sm"
                radius="rounded"
                iconName="more-horizontal"
              />
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={container}>
      <div className={inner}>
        <div className="flex items-start gap-3">
          <CoverArtwork className={cover} />
          <div className="min-w-0 flex-1">
            <div className="min-w-0 flex items-center gap-1">
              <h3 className={cn('min-w-0 max-w-full truncate', title)}>{titleText}</h3>
              <AgentTag kind={kind} className="leading-none" />
            </div>
            <p className={cn('mt-1 truncate', description)}>
              {descriptionText}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff9968_0%,#ff5d5d_100%)] text-[10px] font-semibold leading-none text-white">
              S
            </div>
            <span className={author}>{authorText}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn('flex items-center gap-1', meta)}>
              <Eye className="size-3" strokeWidth={1.8} />
              <span>{messageCount}</span>
            </div>
            <span className="h-[10px] w-px bg-[rgba(45,66,107,0.12)]" />
            <div className={cn('flex items-center gap-1', meta)}>
              <Star className="size-3" strokeWidth={1.8} />
              <span>{favoriteCount}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
