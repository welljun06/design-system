'use client'

import { useState } from 'react'
import {
  Sparkles,
} from 'lucide-react'
import type { MenuKey } from '@/ui/Nav'
import { Nav } from '@/ui/Nav'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Tag } from '@/ui/Tag'
import { Textarea } from '@/ui/Textarea'

type SuggestionItem = {
  tag: string
  title: string
  description: string
}

const QUICK_ACTIONS = [
  { label: '生成文案' },
  { label: '生成配图' },
  { label: '输出提纲' },
]

const SUGGESTIONS: SuggestionItem[] = [
  {
    tag: '品牌宣传',
    title: '帮我写一版新品发布海报文案',
    description: '适用于新品发布、卖点提炼和视觉海报首屏文案输出。',
  },
  {
    tag: '短视频脚本',
    title: '围绕产品亮点生成 30 秒口播脚本',
    description: '适用于口播结构拆解、节奏控制和转化导向表达。',
  },
  {
    tag: 'Prompt 优化',
    title: '把下面的需求整理成更专业的 AI 提示词',
    description: '适用于多轮创作前的指令润色、约束补全和格式整理。',
  },
]

export function AICreateTemplate() {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>('toolbox')

  return (
    <div className="relative flex h-[900px] w-full items-start overflow-hidden rounded-[24px] bg-[#fbfbfd] p-2">
      <div className="pointer-events-none absolute right-[-120px] top-[-160px] h-[420px] w-[540px] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(121,211,255,0.16)_0%,rgba(121,211,255,0.08)_28%,rgba(255,255,255,0)_72%)] blur-[78px]" />
      <div className="pointer-events-none absolute left-[320px] bottom-[-220px] h-[360px] w-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,232,166,0.14)_0%,rgba(255,232,166,0.06)_28%,rgba(255,255,255,0)_72%)] blur-[88px]" />

      <div className="h-full w-[220px] shrink-0">
        <Nav
          selectedMenu={selectedMenu}
          onSelectedMenuChange={setSelectedMenu}
          classOverrides={{
            container: 'w-[220px] h-full rounded-[24px] bg-[#f2f2f7] pt-6 pb-2',
          }}
        />
      </div>

      <section className="relative z-[1] flex min-w-0 flex-1 flex-col px-10 pb-8 pt-7">
        <div className="mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-start pt-20">
          <div className="mb-4 flex items-center gap-2">
            <Tag color="violet" type="light" shape="circle" size="md">
              AI 创作
            </Tag>
            <Tag color="white" type="ghost" shape="circle" size="md">
              Vibe Coding
            </Tag>
          </div>

          <div className="text-center">
            <h2
              className="text-[38px] font-semibold leading-[44px] tracking-[-0.04em] text-[#1c1f23]"
              style={{
                fontFamily:
                  '"Avenir Next", "SF Pro Display", "Segoe UI", "Helvetica Neue", "Inter", ui-sans-serif, system-ui, sans-serif',
              }}
            >
              <span>Create </span>
              <span className="ai-marquee-text relative inline-block text-transparent">
                Next
              </span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-[rgba(28,31,35,0.6)]">
              输入你的目标、风格、平台和限制条件，AI 会帮你生成文案、脚本、提示词和执行方向。
            </p>
          </div>

          <Card
            variant="glass"
            classOverrides={{
              base: 'mt-12 w-full max-w-[760px] rounded-[28px] p-[1px]',
              variant:
                'border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.66)_100%)] shadow-[0_18px_80px_-36px_rgba(83,96,143,0.35),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl',
            }}
          >
            <div className="rounded-[27px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,249,252,0.92)_100%)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6E7CFD_0%,#4C9BFF_55%,#73E0FF_100%)] text-white shadow-[0_10px_24px_-16px_rgba(76,155,255,0.8)]">
                    <Sparkles className="size-4" strokeWidth={2.1} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1c1f23]">开始 AI 创作</p>
                    <p className="text-xs leading-5 text-[rgba(28,31,35,0.55)]">更像创作台，而不只是一个输入框</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {QUICK_ACTIONS.map(({ label }) => (
                    <Button
                      key={label}
                      variant="glass"
                      size="sm"
                      radius="full"
                      iconName="none"
                      label={label}
                      classOverrides={{
                        base: 'cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 font-medium',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[rgba(45,66,107,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(246,248,252,0.9)_100%)] px-6 pb-5 pt-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <Textarea
                  placeholder="例如：帮我生成一套适合小红书发布的春季新品海报方案，风格要更高级、克制，输出标题、卖点文案和配图提示词。"
                  variant="glass"
                  classOverrides={{
                    variant:
                      'border-transparent bg-transparent text-[#1c1f23] placeholder:text-[rgba(28,31,35,0.32)] focus:border-transparent focus-visible:ring-0 shadow-none backdrop-blur-none',
                    size:
                      'min-h-[64px] resize-none rounded-none px-0 py-0 text-[16px] leading-7 font-normal',
                  }}
                />

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="glass" content="icon" size="lg" radius="full" iconName="paperclip" />
                    <Button variant="glass" content="icon" size="lg" radius="full" iconName="upload" />
                    <Button
                      variant="glass"
                      size="lg"
                      radius="full"
                      iconName="none"
                      label="语音输入"
                      classOverrides={{
                        base: 'cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 font-medium',
                      }}
                    />
                  </div>

                  <Button variant="ai" content="icon" size="lg" radius="full" iconName="send" />
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8 w-full max-w-[920px]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#1c1f23]">推荐 PE</p>
                <p className="text-xs leading-5 text-[rgba(28,31,35,0.55)]">直接使用这些常见的创作意图，快速起稿。</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {SUGGESTIONS.map((item) => (
                <Card
                  key={item.title}
                  variant="default"
                  classOverrides={{
                    base: 'rounded-[22px] p-4',
                    variant:
                      'border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,249,252,0.96)_100%)] shadow-[0_12px_36px_-30px_rgba(83,96,143,0.35)] backdrop-blur-sm',
                  }}
                >
                  <Tag color="white" type="ghost" shape="circle" size="sm">
                    {item.tag}
                  </Tag>
                  <h3 className="mt-3 text-sm font-semibold leading-6 text-[#1c1f23]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[rgba(28,31,35,0.58)]">{item.description}</p>
                  <div className="mt-4">
                    <Button variant="ghost-black" size="sm" radius="full" iconName="none" label="用这个" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
