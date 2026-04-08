'use client'

import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ResourceCardVariant = 'tool' | 'skill' | 'model' | 'knowledge'

type ResourceCardProps = {
  variant?: ResourceCardVariant
  content?: Partial<{
    title: string
    description: string
    count: string
    badgeType: 'emoji' | 'emoji-text'
    emoji: string
    text?: string
    backgroundClass: string
    overlayClass: string
  }>
  classOverrides?: Record<string, string>
}

const defaultClasses = {
  container: 'group relative isolate overflow-hidden rounded-2xl border border-[#f2f2f7] bg-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(124,246,254,0.1),0_18px_38px_-18px_rgba(124,246,254,0.28),0_12px_28px_-18px_rgba(246,111,17,0.14)]',
  cover: 'relative aspect-[316/136] overflow-hidden',
  badge: 'absolute left-1/2 top-1/2 flex h-14 min-w-[112px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-[rgba(45,66,107,0.12)] bg-white px-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]',
  title: 'text-base font-semibold leading-[22px] text-[#1c1c23]',
  meta: 'text-xs leading-4 text-[rgba(34,39,39,0.6)]',
  description: 'text-xs leading-4 text-[rgba(34,39,39,0.6)]',
}

const variantContent: Record<
  ResourceCardVariant,
  {
    title: string
    description: string
    count: string
    badgeType: 'emoji' | 'emoji-text'
    emoji: string
    text?: string
    backgroundClass: string
    overlayClass: string
  }
> = {
  tool: {
    title: '视频评论智能总结',
    description: '快速提炼评论区观点、情绪和热点，适合复盘、选题和运营洞察。',
    count: '86',
    badgeType: 'emoji',
    emoji: '🔍',
    backgroundClass:
      'bg-[radial-gradient(circle_at_20%_20%,#89d6ff_0%,#62bbff_20%,#3a93ff_58%,#1f81ff_100%)]',
    overlayClass:
      'bg-[linear-gradient(234.734deg,rgba(31,129,255,0)_0%,#1f81ff_99.071%)]',
  },
  skill: {
    title: '运营话术灵感库',
    description: '沉淀高频表达模板和风格灵感，让活动、私信和内容文案输出更稳定。',
    count: '42',
    badgeType: 'emoji-text',
    emoji: '✨',
    text: '技能',
    backgroundClass:
      'bg-[radial-gradient(circle_at_18%_18%,#ffd69f_0%,#ffb866_26%,#ff8f4d_62%,#ff6a3d_100%)]',
    overlayClass:
      'bg-[linear-gradient(230deg,rgba(255,129,59,0)_0%,rgba(255,122,59,0.92)_100%)]',
  },
  model: {
    title: '多模态模型精选',
    description: '支持图文理解、内容总结与结构化抽取，适合内容生产和分析场景。',
    count: '128',
    badgeType: 'emoji-text',
    emoji: '🤖',
    text: 'GPT',
    backgroundClass:
      'bg-[radial-gradient(circle_at_18%_20%,#c6b8ff_0%,#a38dff_24%,#735cff_64%,#5640f0_100%)]',
    overlayClass:
      'bg-[linear-gradient(228deg,rgba(86,64,240,0)_0%,rgba(86,64,240,0.94)_100%)]',
  },
  knowledge: {
    title: '行业知识卡片库',
    description: '把零散知识整理成可复用卡片，适合培训、检索和知识运营沉淀。',
    count: '64',
    badgeType: 'emoji-text',
    emoji: '📚',
    text: '知识',
    backgroundClass:
      'bg-[radial-gradient(circle_at_18%_18%,#8cf0d4_0%,#56d8b4_28%,#21b494_62%,#119a86_100%)]',
    overlayClass:
      'bg-[linear-gradient(228deg,rgba(17,154,134,0)_0%,rgba(17,154,134,0.94)_100%)]',
  },
}

function BadgeContent({
  emoji,
  type,
  text,
}: {
  emoji: string
  type: 'emoji' | 'emoji-text'
  text?: string
}) {
  if (type === 'emoji-text') {
    return (
      <div className="flex items-center justify-center gap-1.5 leading-none">
        <span className="text-[16px] leading-none">{emoji}</span>
        <span className="text-[12px] text-[#1c1c23]">{text}</span>
      </div>
    )
  }

  return <span className="text-[22px] leading-none">{emoji}</span>
}

export function ResourceCard({
  variant = 'tool',
  content: contentOverrides,
  classOverrides,
}: ResourceCardProps) {
  const content = { ...variantContent[variant], ...contentOverrides }

  const container = classOverrides?.container ?? defaultClasses.container
  const cover = classOverrides?.cover ?? defaultClasses.cover
  const badge = classOverrides?.badge ?? defaultClasses.badge
  const title = classOverrides?.title ?? defaultClasses.title
  const meta = classOverrides?.meta ?? defaultClasses.meta
  const description = classOverrides?.description ?? defaultClasses.description
  const badgeClassName =
    content.badgeType === 'emoji-text'
      ? cn(
          badge,
          'h-[48px] min-w-[112px] px-4 rounded-[16px]',
          'w-auto'
        )
      : cn(badge, 'size-14 h-[56px] w-14 min-w-14 rounded-xl px-0')

  return (
    <article className={container}>
      <div className={cover}>
        <div className={cn('absolute inset-0', content.backgroundClass)} />
        <div className={cn('absolute inset-0', content.overlayClass)} />
        <div className={badgeClassName}>
          <BadgeContent
            emoji={content.emoji}
            type={content.badgeType}
            text={content.text}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className={cn('truncate', title)}>{content.title}</h3>
          </div>
          <div className={cn('flex shrink-0 items-center gap-1', meta)}>
            <Bot className="size-3" strokeWidth={1.8} />
            <span>{content.count}</span>
          </div>
        </div>
        <p className={cn('line-clamp-1', description)}>{content.description}</p>
      </div>
    </article>
  )
}
