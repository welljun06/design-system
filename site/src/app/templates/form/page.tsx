import { FormTemplate } from '@/components/templates/FormTemplate'
import { CopyButton } from '@/components/templates/CopyButton'

export const metadata = {
  title: '表单页 — Design System',
  description: '基础表单页模板，包含输入框、选择器、标签和操作按钮。',
}

const code = `import { Button } from '@/ui/Button'
import { Form } from '@/ui/Form'
import { Tag } from '@/ui/Tag'
import { Card } from '@/ui/Card'

export function FormPage() {
  return (
    <div className="w-full max-w-lg">
      <Card>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1c1f23]">创建新项目</h2>
          <p className="text-sm text-[#71717a] mt-1">填写以下信息来创建一个新的项目配置。</p>
        </div>

        <div className="space-y-4">
          <Form fieldType="input" />
          <Form fieldType="textarea" />
          <Form fieldType="select" />
          <Form fieldType="checkbox" />
          <Form fieldType="radio" />
          <Form fieldType="switch" />
          <Form fieldType="datepicker" />
          <Form fieldType="slider" />

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#1c1f23] mb-1">标签</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag color="blue" type="light" />
              <Tag color="green" type="light" />
              <Tag color="violet" type="light" />
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e4e4e7' }} />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="outline-gray" label="取消" iconName="none" />
            <Button variant="solid-black" label="创建项目" iconName="check" />
          </div>
        </div>
      </Card>
    </div>
  )
}`

export default function FormTemplatePage() {
  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight mb-1.5" style={{ color: '#09090b' }}>
          表单页
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.6' }}>
          基础表单页模板。包含输入框、选择器、标签和操作按钮，适用于创建/编辑类场景。
        </p>
      </div>

      {/* Preview */}
      <div
        className="rounded-[24px] overflow-hidden border mb-6"
        style={{ borderColor: '#e4e4e7' }}
      >
        <div
          className="flex items-center justify-center px-8 py-12"
          style={{ background: 'radial-gradient(41.09% 51.93% at 77% 39.53%, #D5DAEA 0%, #EAEDF3 100%)' }}
        >
          <FormTemplate />
        </div>
      </div>

      {/* Code */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e4e4e7' }}>
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
        >
          <span className="text-xs" style={{ color: '#a1a1aa' }}>TSX</span>
          <CopyButton code={code} />
        </div>
        <pre style={{
          backgroundColor: '#f6f8fa', padding: '1rem 1.25rem', overflowX: 'auto',
          fontSize: '13px', lineHeight: '1.6', color: '#24292e', margin: 0,
          fontFamily: "'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace",
        }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
