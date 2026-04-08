'use client'

import {
  ArrowLeft,
  ArrowUp,
  Code2,
  PanelLeft,
  Play,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Input } from '@/ui/Input'
import { Tag } from '@/ui/Tag'

const CHAT_ITEMS = [
  {
    role: 'system',
    title: '系统理解',
    content:
      '已进入 Vibe Coding 工作台。我会根据你的目标，持续生成页面结构、交互建议与实现方案。',
  },
  {
    role: 'user',
    title: '你',
    content:
      '帮我做一个 AI 创作详情页，左边是对话，右边是实时产物区域，风格要沉浸、克制、偏平台感。',
  },
  {
    role: 'assistant',
    title: 'Create Next',
    content:
      '我建议采用左右双栏：左侧保留透明对话流与上下文操作，右侧使用白底工作区承载页面、代码和预览，整体弱化噪音信息。',
  },
  {
    role: 'assistant',
    title: 'Create Next',
    content:
      '首屏产物先输出“AI 创作工作台”页面草图，包含 Hero 输入框、推荐 Prompt 区以及结果操作区。',
  },
]

const ARTIFACT_TABS = ['页面', '代码', '预览']

const ARTIFACT_BLOCKS = [
  {
    title: 'Hero 输入区',
    description: '大输入框改成更克制的创作工作台风格，保留大容器，正文输入字号回到正常阅读尺度。',
  },
  {
    title: '推荐 Prompt',
    description: '底部用三张白底轻玻璃卡承载常用 Prompt/PE，作为快速起稿入口。',
  },
  {
    title: '界面氛围',
    description: '背景用低饱和青蓝与暖黄模糊光斑，只挂在页面根层，避免内容局部被渐变污染。',
  },
]

export function VibeCodingDetailTemplate() {
  return (
    <div className="relative flex h-[900px] w-full overflow-hidden rounded-[24px] bg-[#f6f7fb] p-3">
      <div className="pointer-events-none absolute left-[-120px] top-[120px] h-[320px] w-[420px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(121,211,255,0.14)_0%,rgba(121,211,255,0.06)_32%,rgba(255,255,255,0)_72%)] blur-[88px]" />
      <div className="pointer-events-none absolute right-[-90px] top-[-80px] h-[340px] w-[420px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,232,166,0.14)_0%,rgba(255,232,166,0.06)_30%,rgba(255,255,255,0)_74%)] blur-[96px]" />

      <section className="relative z-[1] min-w-0 flex-1">
        <div className="grid h-full min-w-0 grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] gap-4">
        <div className="flex min-w-0 flex-col rounded-[24px] px-5 pb-4 pt-5">
          <div className="mb-5">
            <Button
              variant="ghost-black"
              size="sm"
              radius="full"
              iconName="arrow-left"
              label="返回创作页"
            />
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#1c1f23]">产物工作台</p>
              <p className="mt-1 text-xs leading-5 text-[rgba(28,31,35,0.55)]">对话生成过程与实时产物在同一视图协同推进</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag color="violet" type="light" shape="circle" size="md">
                Vibe Coding
              </Tag>
              <Tag color="white" type="ghost" shape="circle" size="md">
                详情页
              </Tag>
            </div>
            <Button variant="ghost-black" size="sm" radius="full" iconName="none" label="上下文" />
          </div>

          <div className="mt-5">
            <h2
              className="text-[30px] font-semibold leading-[38px] tracking-[-0.03em] text-[#1c1f23]"
              style={{
                fontFamily:
                  '"Avenir Next", "SF Pro Display", "Segoe UI", "Helvetica Neue", "Inter", ui-sans-serif, system-ui, sans-serif',
              }}
            >
              Create Next
            </h2>
            <p className="mt-2 max-w-[420px] text-sm leading-6 text-[rgba(28,31,35,0.58)]">
              进入创作详情后，左侧聚焦对话与上下文推进，右侧承载结构化产物，让工作流更沉浸。
            </p>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto pr-2">
            <div className="space-y-4">
              {CHAT_ITEMS.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className="rounded-[20px] border border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0.18)_100%)] px-4 py-3 backdrop-blur-[10px]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={`flex size-7 items-center justify-center rounded-full ${
                        item.role === 'assistant'
                          ? 'bg-[linear-gradient(135deg,#6E7CFD_0%,#4C9BFF_55%,#73E0FF_100%)] text-white'
                          : item.role === 'user'
                            ? 'bg-[#1c1f23] text-white'
                            : 'bg-white/75 text-[#1c1f23]'
                      }`}
                    >
                      {item.role === 'assistant' ? (
                        <Sparkles className="size-3.5" strokeWidth={2} />
                      ) : item.role === 'user' ? (
                        <Wand2 className="size-3.5" strokeWidth={2} />
                      ) : (
                        <PanelLeft className="size-3.5" strokeWidth={2} />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-[#1c1f23]">{item.title}</span>
                  </div>
                  <p className="text-sm leading-6 text-[rgba(28,31,35,0.72)]">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[22px] border border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.22)_100%)] p-3 backdrop-blur-[12px]">
            <div className="flex items-center gap-2">
              <Input
                variant="glass"
                size="lg"
                placeholder="继续追加你的页面想法、交互约束或风格要求..."
                classOverrides={{
                  base: 'w-full outline-none transition-all',
                  variant:
                    'border-transparent bg-transparent text-[#1c1f23] placeholder:text-[rgba(28,31,35,0.36)] focus-within:border-transparent focus-within:ring-0 backdrop-blur-none shadow-none',
                }}
              />
              <Button variant="ai" content="icon" size="lg" radius="full" iconName="send" />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <Card
            variant="default"
            classOverrides={{
              base: 'flex h-full flex-col rounded-[24px] p-0 overflow-hidden',
              variant:
                'border border-[rgba(45,66,107,0.08)] bg-white shadow-[0_18px_44px_-36px_rgba(83,96,143,0.4)]',
            }}
          >
            <div className="flex items-center justify-between border-b border-[rgba(45,66,107,0.08)] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#1c1f23]">实时产物</p>
                <p className="text-xs leading-5 text-[rgba(28,31,35,0.55)]">页面结构、代码片段与预览结果在这里持续更新。</p>
              </div>
              <div className="flex items-center gap-2">
                {ARTIFACT_TABS.map((tab, index) => (
                  <Button
                    key={tab}
                    variant={index === 0 ? 'solid-white' : 'ghost-gray'}
                    size="sm"
                    radius="full"
                    iconName="none"
                    label={tab}
                  />
                ))}
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-0">
              <div className="border-b border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,#fbfcff_0%,#f6f8fc_100%)] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag color="white" type="ghost" shape="circle" size="md">
                      AI 创作工作台
                    </Tag>
                    <Tag color="white" type="light" shape="circle" size="md">
                      Draft v1
                    </Tag>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost-black" content="icon" size="sm" radius="full" iconName="copy" />
                    <Button variant="ghost-black" content="icon" size="sm" radius="full" iconName="download" />
                    <Button variant="solid-black" size="sm" radius="full" iconName="none" label="继续生成" />
                  </div>
                </div>
              </div>

              <div className="grid min-h-0 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-0">
                <div className="border-r border-[rgba(45,66,107,0.08)] bg-[#fcfcfe] px-5 py-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1c1f23]">
                    <Code2 className="size-4" />
                    当前结构
                  </div>
                  <div className="mt-4 space-y-3">
                    {ARTIFACT_BLOCKS.map((block) => (
                      <div
                        key={block.title}
                        className="rounded-[18px] border border-[rgba(45,66,107,0.08)] bg-white px-4 py-3"
                      >
                        <p className="text-sm font-semibold text-[#1c1f23]">{block.title}</p>
                        <p className="mt-1 text-xs leading-5 text-[rgba(28,31,35,0.58)]">
                          {block.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-h-0 overflow-y-auto bg-white px-6 py-5">
                  <div className="rounded-[20px] border border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,#fbfbfd_0%,#f5f7fb_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#1c1f23]">页面预览区</p>
                      <Button variant="ghost-black" size="sm" radius="full" iconName="play" label="预览" />
                    </div>

                    <div className="mt-5 rounded-[22px] border border-[rgba(45,66,107,0.08)] bg-white p-5 shadow-[0_14px_36px_-30px_rgba(83,96,143,0.35)]">
                      <div className="flex items-center gap-2">
                        <Tag color="violet" type="light" shape="circle" size="md">
                          AI 创作
                        </Tag>
                        <Tag color="white" type="ghost" shape="circle" size="md">
                          工作台
                        </Tag>
                      </div>
                      <h3
                        className="mt-4 text-[28px] font-semibold leading-[34px] tracking-[-0.03em] text-[#1c1f23]"
                        style={{
                          fontFamily:
                            '"Avenir Next", "SF Pro Display", "Segoe UI", "Helvetica Neue", "Inter", ui-sans-serif, system-ui, sans-serif',
                        }}
                      >
                        Create Next
                      </h3>
                      <div className="mt-4 rounded-[18px] border border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)] px-4 py-4">
                        <p className="text-sm leading-6 text-[rgba(28,31,35,0.68)]">
                          帮我做一个沉浸式 AI 创作详情页，左边是对话推进，右边实时展示页面结构与产物结果。
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {['品牌宣传', 'Prompt 优化', '页面生成'].map((label) => (
                          <div
                            key={label}
                            className="rounded-[16px] border border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f9fc_100%)] px-3 py-3"
                          >
                            <p className="text-xs font-semibold text-[#1c1f23]">{label}</p>
                            <p className="mt-1 text-[11px] leading-5 text-[rgba(28,31,35,0.56)]">
                              快速生成对应创作模板
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        </div>
      </section>
    </div>
  )
}
