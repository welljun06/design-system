'use client'

import React, { useState } from 'react'
import { Button } from '@/ui/Button'
import { Tag } from '@/ui/Tag'
import { Tabs } from '@/ui/Tabs'
import {
  ChevronLeft, Headphones, UserPlus, History, Info,
  Sparkles, CirclePlus, ChevronDown, FileText, List,
  ArrowUp, Paperclip,
} from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────────────────────────── */

interface AgentInfo {
  name: string
  status: '已发布' | '未发布' | '草稿'
  avatarUrl: string
  authorName: string
  authorAvatarUrl: string
  publishedAt: string
  description: string
}

interface ConfigItem {
  bg: string
  color: string
  letter: string
  label: string
  detail: string
  badge?: number
}

interface ConfigSection {
  title?: string
  items: ConfigItem[]
}

interface GuideQuestion {
  text: string
}

/* ─── Demo data ──────────────────────────────────────────────────────────────── */

const AGENT: AgentInfo = {
  name: '平台头像-03-copy',
  status: '已发布',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=agent',
  authorName: '张俊夫',
  authorAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zjf',
  publishedAt: '2026-03-31 01:43',
  description: '直接输入你的智能体名称+描述',
}

const CONFIG_SECTIONS: ConfigSection[] = [
  {
    items: [
      { bg: 'bg-green-100', color: 'text-green-600', letter: '人', label: '人设', detail: '已配置' },
      { bg: 'bg-lime-100', color: 'text-lime-600', letter: '忆', label: '记忆', detail: '记住最近5次对话' },
    ],
  },
  {
    title: '服务逻辑',
    items: [
      { bg: 'bg-blue-100', color: 'text-blue-600', letter: '模', label: '模型', detail: 'Doubao-Seed-1.6' },
      { bg: 'bg-indigo-100', color: 'text-indigo-600', letter: '工', label: '工具', detail: '文生图片、文字+图片生图', badge: 2 },
      { bg: 'bg-purple-100', color: 'text-purple-600', letter: '流', label: '工作流', detail: '未配置' },
      { bg: 'bg-teal-100', color: 'text-teal-600', letter: '协', label: '协作智能体', detail: '未配置' },
      { bg: 'bg-pink-100', color: 'text-pink-600', letter: '触', label: '触发器', detail: '未配置' },
    ],
  },
  {
    title: '知识数据',
    items: [
      { bg: 'bg-red-100', color: 'text-red-500', letter: '知', label: '知识库', detail: '未配置' },
    ],
  },
]

const GUIDE_QUESTIONS: GuideQuestion[] = [
  { text: '名称：海报生成 / 描述：生成未来感海报' },
]


/* ─── Sub-components ─────────────────────────────────────────────────────────── */

function IconBtn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`flex h-8 w-8 items-center justify-center rounded-full text-[#1c1f23] hover:bg-gray-100 transition-transform active:scale-95 ${className}`}>
      {children}
    </button>
  )
}

function IconBtnSubtle({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex h-6 w-6 items-center justify-center rounded-full text-[#1c1f23] hover:bg-[#53608F]/10 transition-transform active:scale-95">
      {children}
    </button>
  )
}

function ConfigIcon({ bg, color, letter }: { bg: string; color: string; letter: string }) {
  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}>
      <span className={`text-sm font-bold ${color}`}>{letter}</span>
    </div>
  )
}

function ConfigListItem({ item, active, onClick }: { item: ConfigItem; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`mb-1 flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors active:scale-[0.97] ${active ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
    >
      <ConfigIcon bg={item.bg} color={item.color} letter={item.letter} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className="truncate text-xs font-bold text-gray-800">{item.label}</span>
          {item.badge != null && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-200 px-1 text-xs text-gray-600">{item.badge}</span>
          )}
        </div>
        <span className="mt-0.5 block truncate text-xs text-gray-400">{item.detail}</span>
      </div>
    </div>
  )
}

/* ─── Main template ──────────────────────────────────────────────────────────── */

export function EditorTemplate() {
  const [activeTab, setActiveTab] = useState('editor')
  const [activeConfig, setActiveConfig] = useState('人设')
  const [chatInput, setChatInput] = useState('')

  const tabs = ['编排配置', '发布渠道', '效果优化', '运营数据']
  const tabIndex = ['editor', 'publishChannel', 'optimize', 'operationalData']

  return (
    <div className="flex h-[720px] w-full flex-col overflow-hidden rounded-2xl bg-[radial-gradient(41.09%_51.93%_at_77%_39.53%,#D5DAEA_0%,#EAEDF3_100%)]">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-3">
        {/* Left: Back + Info */}
        <div className="flex items-center gap-3">
          <Button variant="glass" content="icon" size="lg" radius="full" iconName="chevron-left" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-900">{AGENT.name}</span>
              <Tag color="green" type="light" size="sm" shape="square">{AGENT.status}</Tag>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <img src={AGENT.authorAvatarUrl} alt={AGENT.authorName} className="h-4 w-4 rounded-full object-cover" />
              <span>{AGENT.authorName}</span>
              <span className="mx-1 h-2.5 w-px bg-gray-300" />
              <span>发布于{AGENT.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Center: Tabs */}
        <Tabs variant="glass" size="lg" />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <IconBtn><Headphones size={16} /></IconBtn>
            <IconBtn><UserPlus size={16} /></IconBtn>
            <IconBtn><History size={16} /></IconBtn>
            <IconBtn><Info size={16} /></IconBtn>
          </div>
          <Button variant="solid-black" size="lg" radius="full" iconName="none" label="编辑" />
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex flex-1 gap-3 overflow-hidden px-6 pb-6">
        {/* Left Panel: Config List + Editor */}
        <div className="flex h-full w-[70%] min-w-[560px] overflow-hidden rounded-3xl bg-white/70">
          {/* Config sidebar */}
          <div className="w-[290px] shrink-0 overflow-y-auto">
            <div className="px-4 py-4 pb-16">
              {/* Avatar + Name */}
              <div className="mb-4 flex items-start gap-3 rounded-lg px-3 py-3">
                <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-lg">
                  <img src={AGENT.avatarUrl} alt={AGENT.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="truncate text-sm font-semibold text-gray-900">{AGENT.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{AGENT.description}</p>
                </div>
              </div>

              {/* Config items */}
              {CONFIG_SECTIONS.map((section, sIdx) => (
                <div key={sIdx}>
                  {section.title && (
                    <h3 className="mb-1 ml-3 mt-6 text-sm font-semibold text-gray-600">{section.title}</h3>
                  )}
                  {section.items.map((item, iIdx) => (
                    <ConfigListItem
                      key={iIdx}
                      item={item}
                      active={item.label === activeConfig}
                      onClick={() => setActiveConfig(item.label)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Editor pane */}
          <div className="flex flex-1 flex-col min-w-0 overflow-hidden rounded-3xl bg-white border border-gray-100/60 shadow-[0px_1.25px_3px_0px_rgba(50,50,50,0.1)]">
            <div className="sticky top-0 z-10 bg-white">
              <div className="flex h-15 items-center justify-between px-6">
                <h2 className="text-base font-semibold leading-9 text-gray-900">{activeConfig}</h2>
                <div className="flex items-center gap-2">
                  <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-transform active:scale-95 hover:bg-gray-50">
                    <span className="text-xs font-mono">{'{x}'}</span>
                  </button>
                  <button className="group relative flex h-9 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-lg border border-[#2D426B]/12 bg-white px-3 transition-transform active:scale-95">
                    <div className="absolute left-0 right-0 top-0 h-[5px] bg-[linear-gradient(135deg,#FFBA33_7.5%,#4ED92C_23.2%,#4592F2_44.7%,#6E7CFD_66.3%,#E135F8_92.3%)] opacity-20 blur-[10px]" />
                    <div className="relative z-10 flex items-center gap-1">
                      <div className="text-[#6E7CFD]"><Sparkles size={14} /></div>
                      <span className="bg-[linear-gradient(135deg,#FFB31E_7.5%,#49D127_23.2%,#4592F2_44.7%,#6E7CFD_66.3%,#E135F8_92.3%)] bg-clip-text text-sm font-semibold text-transparent">AI帮写</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pt-1 px-6">
              <div className="prose prose-sm max-w-none text-sm text-gray-400">
                在此输入人设 Prompt...
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Chat Preview */}
        <div className="flex h-full flex-1 min-w-[360px] flex-col overflow-hidden rounded-3xl bg-white/65 border border-white">
          {/* Chat header */}
          <div className="flex items-center justify-between px-3 pt-2 pb-[3px]">
            <button className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-[rgba(28,31,35,0.8)] hover:bg-[#53608F]/10 transition-colors active:scale-95 leading-4">
              <CirclePlus size={16} /> 对话预览 <ChevronDown size={14} />
            </button>
            <div className="flex items-center">
              <IconBtnSubtle><FileText size={14} /></IconBtnSubtle>
              <IconBtnSubtle><List size={14} /></IconBtnSubtle>
            </div>
          </div>

          {/* Chat body */}
          <div className="flex flex-1 flex-col overflow-hidden bg-[#f6f7fa] rounded-b-3xl">
            <div className="flex flex-1 flex-col overflow-hidden bg-[radial-gradient(100%_100%_at_0%_100%,#f2f5ff_0%,#eaedf3_100%)] m-1.5 rounded-[18px]">
              <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 py-12">
                <div className="flex flex-col items-center w-full" style={{ marginTop: '33%' }}>
                  <div className="h-20 w-20 overflow-hidden rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.35)_100%)] p-[2px]">
                    <img src={AGENT.avatarUrl} alt={AGENT.name} className="h-full w-full object-cover rounded-full" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-[#1c1f23]">{AGENT.name}</p>
                  {GUIDE_QUESTIONS.length > 0 && (
                    <div className="max-w-[calc(100%-52px)] mt-11 flex flex-col gap-3 w-full">
                      {GUIDE_QUESTIONS.map((q, idx) => (
                        <Button key={idx} variant="glass" radius="full" size="lg" iconName="none" label={q.text} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Input area */}
              <div className="flex flex-col rounded-[18px] bg-[rgba(255,255,255,0.49)] pt-4 pb-1.5 px-3 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[rgba(255,255,255,0.4)] hover:border-white/80 transition-colors">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="请输入"
                  rows={1}
                  className="w-full resize-none border-none bg-transparent text-sm text-[#1c1f23] placeholder-[#222727]/35 outline-none mb-5 min-h-5 leading-5"
                />
                <div className="flex items-center justify-between">
                  <Button variant="glass" content="icon" size="lg" radius="full" iconName="paperclip" />
                  <Button variant="solid-black" content="icon" size="lg" radius="full" iconName="arrow-up" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
