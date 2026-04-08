import { VibeCodingDetailTemplate } from '@/components/templates/VibeCodingDetailTemplate'

export const metadata = {
  title: 'AI创作详情页 — Design System',
  description: '沉浸式 vibe coding 详情页模板，左侧为透明对话流，右侧为白底产物工作区。',
}

export default function AICreateDetailTemplatePage() {
  return (
    <div className="px-8 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          AI创作详情页
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          面向 vibe coding 进入后的沉浸式工作台模板。左侧聚焦对话过程，右侧聚焦实时产物，不再展示模板内菜单导航。
        </p>
      </div>

      <div className="rounded-[24px] overflow-hidden border" style={{ borderColor: '#e4e4e7' }}>
        <VibeCodingDetailTemplate />
      </div>
    </div>
  )
}
