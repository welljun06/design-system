import { AICreateTemplateV2 } from '@/components/templates/AICreateTemplateV2'

export const metadata = {
  title: 'AI创作页 v2 — Design System',
  description: '更复古、更沉浸的 AI 创作页面模板，slogan 与输入区被包进同一张视觉画面中。',
}

export default function AICreateTemplateV2Page() {
  return (
    <div className="px-8 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          AI创作页 v2
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          更像一张沉浸式海报。将 slogan 与输入框一起包进主视觉图像，营造更复古的创作氛围。
        </p>
      </div>

      <div className="rounded-[24px] overflow-hidden border" style={{ borderColor: '#e4e4e7' }}>
        <AICreateTemplateV2 />
      </div>
    </div>
  )
}
