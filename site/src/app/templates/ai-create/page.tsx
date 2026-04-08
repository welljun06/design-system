import { AICreateTemplate } from '@/components/templates/AICreateTemplate'

export const metadata = {
  title: 'AI创作页 — Design System',
  description: 'AI 创作页面模板，包含居中创作输入区与推荐 Prompt/PE 区域。',
}

export default function AICreateTemplatePage() {
  return (
    <div className="px-8 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          AI创作页
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          面向 AI 创作工作台的页面模板。中间是更精致的大输入区，底部提供推荐 Prompt/PE 作为快速起稿入口。
        </p>
      </div>

      <div className="rounded-[24px] overflow-hidden border" style={{ borderColor: '#e4e4e7' }}>
        <AICreateTemplate />
      </div>
    </div>
  )
}
