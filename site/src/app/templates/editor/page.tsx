import { EditorTemplate } from '@/components/templates/EditorTemplate'

export const metadata = {
  title: '编辑器页 — Design System',
  description: 'AI 智能体编辑器模板，包含配置面板、富文本编辑器和对话预览。',
}

export default function EditorTemplatePage() {
  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          编辑器页
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          AI 智能体编辑器模板。包含头部导航、配置侧栏、富文本编辑器和对话预览面板。
        </p>
      </div>

      {/* Preview */}
      <div className="rounded-[24px] overflow-hidden border" style={{ borderColor: '#e4e4e7' }}>
        <EditorTemplate />
      </div>
    </div>
  )
}
