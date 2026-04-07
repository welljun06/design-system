'use client'

import React from 'react'
import {
  AlertTriangle,
  Archive,
  AppWindow,
  BadgeDollarSign,
  Blocks,
  Brush,
  Camera,
  CheckSquare,
  Clapperboard,
  FileSearch,
  Flag,
  Flashlight,
  Gamepad2,
  Gift,
  Image,
  MessageCircleHeart,
  MessageSquare,
  MessageSquareText,
  MessageSquareWarning,
  MonitorPlay,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareUser,
  Telescope,
  Type,
  UserRound,
  UsersRound,
  Video,
  WandSparkles,
  PencilLine,
  BriefcaseBusiness,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type BusinessSelectorProps = {
  classOverrides?: Record<string, string>
  selectedLabel?: string
  onSelect?: (label: string) => void
}

type Item = {
  label: string
  icon: React.ReactNode
}

type Section = {
  title: string
  items: Item[]
}

const COLOR_PURPLE = 'text-[#8b5cf6]'
const COLOR_PINK = 'text-[#e72e75]'
const COLOR_ORANGE = 'text-[#fa8b14]'
const COLOR_BLUE = 'text-[#3b82f6]'

function BusinessOption({
  icon,
  label,
  className,
  selected = false,
  onSelect,
}: {
  icon: React.ReactNode
  label: string
  className: string
  selected?: boolean
  onSelect?: (label: string) => void
}) {
  return (
    <button
      type="button"
      className={cn(
        className,
        'cursor-pointer transition-colors duration-150',
        selected
          ? 'border-[rgba(83,96,143,0.24)] bg-[#eef3ff]'
          : 'hover:border-[rgba(83,96,143,0.18)] hover:bg-[#f8f9fc]'
      )}
      aria-pressed={selected}
      onClick={() => onSelect?.(label)}
    >
      <span className="flex size-[14px] shrink-0 items-center justify-center">{icon}</span>
      <span className="whitespace-nowrap text-sm leading-5 text-[#1c1f23]">{label}</span>
    </button>
  )
}

const sections: Section[] = [
  {
    title: '我的',
    items: [
      { label: '个人空间', icon: <UserRound className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
    ],
  },
  {
    title: '平台',
    items: [
      { label: '解决方案', icon: <CheckSquare className={cn('size-[14px]', COLOR_PINK)} strokeWidth={2} /> },
      { label: '前沿实验室', icon: <Telescope className={cn('size-[14px]', COLOR_PINK)} strokeWidth={2} /> },
    ],
  },
  {
    title: '运营',
    items: [
      { label: '作者运营', icon: <UsersRound className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '资金结算', icon: <BadgeDollarSign className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '版权运营', icon: <Archive className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '敏感词运营', icon: <Type className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '群聊', icon: <MessageSquareText className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '抖音搜索', icon: <Search className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '垂类运营', icon: <MessageCircleHeart className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '抖音游戏', icon: <Gamepad2 className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '调研中台', icon: <FileSearch className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '热点资讯运营', icon: <Flashlight className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '抖音直播运营', icon: <Video className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '抖音UGC', icon: <Clapperboard className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '社交互动', icon: <Camera className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '直播用户平台', icon: <SquareUser className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
      { label: '效果与创作', icon: <Brush className={cn('size-[14px]', COLOR_ORANGE)} strokeWidth={2} /> },
    ],
  },
  {
    title: '治理',
    items: [
      { label: '视频治理', icon: <MonitorPlay className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '直播治理', icon: <Video className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '账号治理', icon: <SquareUser className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: 'IM治理', icon: <MessageSquare className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '小程序治理', icon: <Smartphone className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: 'AIGC治理', icon: <Image className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '版权治理', icon: <ShieldCheck className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '短剧治理', icon: <Clapperboard className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '游戏治理', icon: <Gamepad2 className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '资金安全', icon: <BadgeDollarSign className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: 'ZL治理', icon: <AlertTriangle className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '评论治理', icon: <MessageSquareWarning className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '生态治理', icon: <Blocks className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '舆情', icon: <MessageSquareText className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
      { label: '投稿道具', icon: <Gift className={cn('size-[14px]', COLOR_BLUE)} strokeWidth={2} /> },
    ],
  },
  {
    title: '职能',
    items: [
      { label: '开放平台', icon: <Sparkles className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
      { label: '智能标注', icon: <PencilLine className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
      { label: '数据BP', icon: <Flag className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
      { label: 'MagicX', icon: <WandSparkles className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
      { label: '体验', icon: <MessageSquare className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
      { label: '产品研发', icon: <AppWindow className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
      { label: '劳动力管理', icon: <BriefcaseBusiness className={cn('size-[14px]', COLOR_PURPLE)} strokeWidth={2} /> },
    ],
  },
]

export function BusinessSelector({ classOverrides, selectedLabel, onSelect }: BusinessSelectorProps) {
  const container = classOverrides?.container ?? 'rounded-2xl bg-white p-3 shadow-[0_4px_14px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.3)]'
  const section = classOverrides?.section ?? 'rounded-xl p-3'
  const title = classOverrides?.title ?? 'text-xs leading-4 text-[rgba(28,28,35,0.6)]'
  const option = classOverrides?.option ?? 'w-[136px] rounded-lg border border-[rgba(45,66,107,0.12)] bg-white p-3'

  return (
    <div className={cn('inline-flex flex-col items-center justify-center', container)}>
      {sections.map((sectionData) => (
        <div key={sectionData.title} className={cn('flex w-full flex-col items-start justify-center', section)}>
          <p className={cn('mb-2 w-full', title)}>{sectionData.title}</p>
          <div className="flex w-[576px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
            {sectionData.items.map((item) => (
              <BusinessOption
                key={item.label}
                icon={item.icon}
                label={item.label}
                className={cn('flex items-center gap-2', option)}
                selected={selectedLabel === item.label}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
