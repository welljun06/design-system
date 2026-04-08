import { ResourceListTemplate } from '@/components/templates/ResourceListTemplate'

export const metadata = {
  title: '列表页 — Design System',
  description: '卡片列表页面模板，左侧为导航，右侧为卡片列表内容区。',
}

export default function ResourceListTemplatePage() {
  return (
    <div className="px-8 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          列表页
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          左侧为导航，右侧为卡片列表的页面模板，适用于资源市场、内容分发和业务资源浏览场景。
        </p>
      </div>

      <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#e4e4e7' }}>
        <ResourceListTemplate />
      </div>
    </div>
  )
}
