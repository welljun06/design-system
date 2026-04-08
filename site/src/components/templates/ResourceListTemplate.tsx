'use client'

import { useMemo, useState } from 'react'
import { ResourceCard } from '@/ui/ResourceCard'
import type { ResourceCardVariant } from '@/ui/ResourceCard'
import { AgentCard } from '@/ui/AgentCard'
import type { MenuKey } from '@/ui/Nav'
import { Nav } from '@/ui/Nav'
import type { SelectOption } from '@/ui/Select'
import { Filter } from '@/ui/Filter'

type ResourceListItem = {
  id: string
  variant: ResourceCardVariant
  content?: {
    title: string
    description: string
    count: string
  }
}

type AgentListItem = {
  id: string
  kind: 'agent' | 'workflow'
  content: {
    title: string
    description: string
    author: string
    messageCount: string
    favoriteCount: string
  }
}

type HeaderConfig = {
  title: string
  searchPlaceholder: string
  filters: [string, string]
  filterOptions: [SelectOption[], SelectOption[]]
  ownershipLabel: string
  actionLabel: string
}

const resourceContentMap: Record<ResourceCardVariant, ResourceListItem['content'][]> = {
  tool: [
    { title: '评论洞察助手', description: '自动归纳评论区观点与情绪，帮助快速复盘内容反馈。', count: '86' },
    { title: '封面标题生成器', description: '根据视频主题生成更有点击率的封面标题和备选文案。', count: '64' },
    { title: '选题对比工具', description: '横向比较多个选题方向，快速定位更值得投入的内容方向。', count: '39' },
  ],
  skill: [
    { title: '热点追更话术库', description: '沉淀热点场景下的高频表达模板，提升运营回复效率。', count: '42' },
    { title: '直播转化表达集', description: '整理直播间高转化表达方式，适合话术训练和灵感调用。', count: '57' },
    { title: '活动预热文案感知', description: '面向活动预热场景提供更统一、更稳定的内容表达风格。', count: '33' },
  ],
  model: [
    { title: '图文理解模型精选', description: '适合图文内容解析、信息提取和结构化理解场景。', count: '128' },
    { title: '长文本总结模型', description: '面向长内容总结、提纲提炼和重点抽取的高效模型集合。', count: '96' },
    { title: '营销意图识别模型', description: '帮助快速识别用户意图与需求，适合营销和服务对话场景。', count: '74' },
  ],
  knowledge: [
    { title: '行业知识卡片库', description: '将零散行业知识整理成可复用卡片，便于检索和共享。', count: '64' },
    { title: '运营案例知识集', description: '汇总历史运营案例和方法论，支持团队沉淀与复用。', count: '48' },
    { title: '培训问答知识库', description: '适合新成员培训、常见问题查询和内部经验管理。', count: '52' },
  ],
}

const agentItems: AgentListItem[] = [
  {
    id: 'agent-1',
    kind: 'agent',
    content: {
      title: '爆款短视频灵感助手',
      description: '围绕选题、脚本和封面方向提供成体系的短视频创作灵感支持。',
      author: 'SSSHY99',
      messageCount: '233',
      favoriteCount: '18',
    },
  },
  {
    id: 'agent-2',
    kind: 'workflow',
    content: {
      title: '投放素材复盘工作流',
      description: '自动串联素材整理、数据汇总和复盘结论生成，减少重复操作。',
      author: 'Luna',
      messageCount: '156',
      favoriteCount: '9',
    },
  },
  {
    id: 'agent-3',
    kind: 'agent',
    content: {
      title: '账号诊断顾问',
      description: '根据账号表现输出内容优化建议，适合创作者日常巡检与增长复盘。',
      author: 'Aven',
      messageCount: '312',
      favoriteCount: '21',
    },
  },
  {
    id: 'agent-4',
    kind: 'agent',
    content: {
      title: '评论区互动助手',
      description: '帮助整理高价值评论并生成回复建议，提升内容互动效率。',
      author: 'Mika',
      messageCount: '189',
      favoriteCount: '14',
    },
  },
  {
    id: 'agent-5',
    kind: 'workflow',
    content: {
      title: '热点监测分发工作流',
      description: '抓取热点线索后自动分类分发，适用于内容团队协同流转。',
      author: 'Nora',
      messageCount: '98',
      favoriteCount: '7',
    },
  },
  {
    id: 'agent-6',
    kind: 'agent',
    content: {
      title: '直播脚本共创助手',
      description: '根据活动主题快速共创直播脚本结构、节奏和关键表达。',
      author: 'Kite',
      messageCount: '274',
      favoriteCount: '16',
    },
  },
  {
    id: 'agent-7',
    kind: 'workflow',
    content: {
      title: '线索收集归档工作流',
      description: '自动汇总调研线索、归档信息并生成可追踪的结构化记录。',
      author: 'Timo',
      messageCount: '121',
      favoriteCount: '8',
    },
  },
  {
    id: 'agent-8',
    kind: 'agent',
    content: {
      title: '品牌内容调性助手',
      description: '帮助品牌团队统一表达语气和内容调性，减少文案风格偏差。',
      author: 'Rita',
      messageCount: '143',
      favoriteCount: '11',
    },
  },
  {
    id: 'agent-9',
    kind: 'agent',
    content: {
      title: '创作者成长教练',
      description: '从内容方向、节奏安排到复盘建议，陪伴式支持创作者成长。',
      author: 'Owen',
      messageCount: '205',
      favoriteCount: '13',
    },
  },
]

function getVariantByMenu(menu: MenuKey): ResourceCardVariant {
  if (menu === 'skills') return 'skill'
  if (menu === 'model') return 'model'
  if (menu === 'knowledge') return 'knowledge'
  return 'tool'
}

function getPageContent(menu: MenuKey): HeaderConfig {
  if (menu === 'skills') {
    return {
      title: 'Skills',
      searchPlaceholder: '搜索',
      filters: ['更新时间', '模式'],
      filterOptions: [
        [
          { value: 'updated-desc', label: '最近更新' },
          { value: 'created-desc', label: '最近创建' },
          { value: 'updated-asc', label: '最早更新' },
        ],
        [
          { value: 'all', label: '全部模式' },
          { value: 'draft', label: '草稿' },
          { value: 'published', label: '已发布' },
        ],
      ],
      ownershipLabel: '我创建的',
      actionLabel: '新建技能',
    }
  }

  if (menu === 'model') {
    return {
      title: '模型库',
      searchPlaceholder: '搜索',
      filters: ['更新时间', '模式'],
      filterOptions: [
        [
          { value: 'updated-desc', label: '最近更新' },
          { value: 'created-desc', label: '最近创建' },
          { value: 'updated-asc', label: '最早更新' },
        ],
        [
          { value: 'all', label: '全部模式' },
          { value: 'chat', label: '对话模型' },
          { value: 'reasoning', label: '推理模型' },
        ],
      ],
      ownershipLabel: '我创建的',
      actionLabel: '新增模型',
    }
  }

  if (menu === 'toolbox') {
    return {
      title: '工具箱',
      searchPlaceholder: '搜索',
      filters: ['更新时间', '模式'],
      filterOptions: [
        [
          { value: 'updated-desc', label: '最近更新' },
          { value: 'created-desc', label: '最近创建' },
          { value: 'updated-asc', label: '最早更新' },
        ],
        [
          { value: 'all', label: '全部模式' },
          { value: 'plugin', label: '插件工具' },
          { value: 'workflow', label: '工作流工具' },
        ],
      ],
      ownershipLabel: '我创建的',
      actionLabel: '新增工具',
    }
  }

  if (menu === 'knowledge') {
    return {
      title: '知识库',
      searchPlaceholder: '搜索',
      filters: ['更新时间', '模式'],
      filterOptions: [
        [
          { value: 'updated-desc', label: '最近更新' },
          { value: 'created-desc', label: '最近创建' },
          { value: 'updated-asc', label: '最早更新' },
        ],
        [
          { value: 'all', label: '全部模式' },
          { value: 'team', label: '团队共享' },
          { value: 'private', label: '个人私有' },
        ],
      ],
      ownershipLabel: '我创建的',
      actionLabel: '新增知识库',
    }
  }

  if (menu === 'agent') {
    return {
      title: '智能体',
      searchPlaceholder: '搜索',
      filters: ['更新时间', '模式'],
      filterOptions: [
        [
          { value: 'updated-desc', label: '最近更新' },
          { value: 'created-desc', label: '最近创建' },
          { value: 'updated-asc', label: '最早更新' },
        ],
        [
          { value: 'all', label: '全部模式' },
          { value: 'agent', label: '智能体' },
          { value: 'workflow', label: '工作流' },
        ],
      ],
      ownershipLabel: '我创建的',
      actionLabel: '新增智能体',
    }
  }

  return {
    title: '资源库',
    searchPlaceholder: '搜索',
    filters: ['更新时间', '模式'],
    filterOptions: [
      [
        { value: 'updated-desc', label: '最近更新' },
        { value: 'created-desc', label: '最近创建' },
        { value: 'updated-asc', label: '最早更新' },
      ],
      [
        { value: 'all', label: '全部模式' },
        { value: 'standard', label: '标准模式' },
        { value: 'advanced', label: '高级模式' },
      ],
    ],
    ownershipLabel: '我创建的',
    actionLabel: '新增资源',
  }
}

export function ResourceListTemplate() {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>('skills')
  const pageContent = useMemo(() => getPageContent(selectedMenu), [selectedMenu])
  const resources = useMemo<ResourceListItem[]>(() => {
    const variant = getVariantByMenu(selectedMenu)
    const variants = resourceContentMap[variant]
    return Array.from({ length: 9 }, (_, index) => ({
      id: `${variant}-${index + 1}`,
      variant,
      content: variants[index % variants.length],
    }))
  }, [selectedMenu])

  return (
    <div className="relative flex h-[900px] w-full items-start overflow-hidden rounded-[24px] bg-white p-2">
      <div className="pointer-events-none absolute right-[-150px] top-[-190px] h-[480px] w-[640px] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(121,211,255,0.18)_0%,rgba(121,211,255,0.09)_24%,rgba(255,255,255,0)_68%)] blur-[72px]" />
      <div className="pointer-events-none absolute right-[-110px] top-[-150px] h-[420px] w-[560px] rounded-full bg-[radial-gradient(circle_at_40%_38%,rgba(255,232,166,0.12)_0%,rgba(255,232,166,0.06)_28%,rgba(255,255,255,0)_72%)] blur-[76px]" />
      <div className="h-full w-[220px] shrink-0">
        <Nav
          selectedMenu={selectedMenu}
          onSelectedMenuChange={setSelectedMenu}
          classOverrides={{
            container: 'w-[220px] h-full rounded-[24px] bg-[#f2f2f7] pt-6 pb-2',
          }}
        />
      </div>

      <section className="relative z-[1] flex min-w-0 flex-1 flex-col overflow-hidden px-8 pb-5 pt-2">
        <div className="relative z-[1] flex h-16 items-center">
          <h2 className="text-[20px] font-semibold leading-6 text-[#1c1f23]">{pageContent.title}</h2>
        </div>

        <Filter
          searchPlaceholder={pageContent.searchPlaceholder}
          filters={pageContent.filters}
          filterOptions={pageContent.filterOptions}
          ownershipLabel={pageContent.ownershipLabel}
          actionLabel={pageContent.actionLabel}
        />

        <div className="relative z-[1] min-h-0 flex-1 pt-8">
          {selectedMenu === 'agent' ? (
            <div className="grid grid-cols-3 gap-3">
              {agentItems.map((item) => (
                <AgentCard key={item.id} variant="list" kind={item.kind} content={item.content} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} variant={resource.variant} content={resource.content} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
