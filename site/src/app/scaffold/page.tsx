import { highlight } from '@/lib/highlight'

export const metadata = {
  title: '项目脚手架 — Design System',
  description: '快速部署 AI 平台基础框架，在此基础上 vibe coding。',
}

const degitCommand = `npx degit welljun06/ai-platform-skill my-project
cd my-project && npm install && npm run dev`

const aiPromptTemplate = `你是一位专业的前端工程师，正在基于以下设计系统构建 UI。

## 设计 Token
- 页面背景: radial-gradient(41.09% 51.93% at 77% 39.53%, #D5DAEA 0%, #EAEDF3 100%)
- 主文字色: #1c1f23
- 深色渐变: linear-gradient(180deg, #323232 0%, #222222 100%)
- AI 渐变: linear-gradient(135deg, #FFB31E 7.5%, #4ED92C 23.2%, #4592F2 44.7%, #6E7CFD 66.3%, #E135F8 92.3%)
- 玻璃边框: rgba(255, 255, 255, 0.6)
- 玻璃背景: rgba(255, 255, 255, 0.25)
- 玻璃阴影: inset 1px 1px 4px 2px rgba(0,0,0,0.03)
- 深色按钮阴影: 0 2px 4px 0 rgba(0,0,0,0.14), 0 0 1px 0 rgba(0,0,0,0.16)

## 可用组件

### GlassButton
\`\`\`tsx
// 胶囊形
<button className="cursor-pointer border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 transition-colors transition-transform active:scale-95 flex h-9 items-center justify-center rounded-[39px] px-4 text-sm text-[#1c1f23] leading-[20px]">
  Click me
</button>

// 圆形
<button className="cursor-pointer border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 transition-colors transition-transform active:scale-95 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
  <Icon />
</button>
\`\`\`

### DarkButton
\`\`\`tsx
// 默认
<button className="cursor-pointer bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90 transition-transform active:scale-95 flex h-9 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
  Download
</button>

// 图标
<button className="cursor-pointer bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90 transition-transform active:scale-95 flex h-9 w-9 items-center justify-center rounded-full">
  <Icon />
</button>
\`\`\`

### Input
\`\`\`tsx
<input
  type="text"
  placeholder="请输入内容..."
  className="w-full rounded-lg border border-[#e4e4e7] bg-white px-3 py-2 text-sm text-[#1c1f23] placeholder:text-[#a1a1aa] outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 transition-all"
/>
\`\`\`

### Tabs
\`\`\`tsx
{/* Glass */}
<div className="inline-flex items-center rounded-full border border-white/60 bg-white/50 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] h-9 p-1 gap-0.5">
  <button className="px-4 py-0.5 text-sm rounded-full bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] text-[#1c1f23] font-semibold">标签一</button>
  <button className="px-4 py-0.5 text-sm rounded-full text-[#1c1f23]/60">标签二</button>
</div>

{/* Line */}
<div className="inline-flex items-center border-b border-[#e4e4e7] h-9">
  <button className="px-4 py-0.5 text-sm border-b-2 border-[#1c1f23] text-[#1c1f23] font-medium -mb-px">标签一</button>
  <button className="px-4 py-0.5 text-sm text-[#71717a] -mb-px">标签二</button>
</div>

{/* Button */}
<div className="inline-flex items-center bg-[#f4f4f5] rounded-lg h-9 p-1 gap-0.5">
  <button className="px-4 py-0.5 text-sm rounded-md bg-white text-[#1c1f23] font-medium shadow-sm">标签一</button>
  <button className="px-4 py-0.5 text-sm rounded-md text-[#71717a]">标签二</button>
</div>
\`\`\`

### Tag
\`\`\`tsx
{/* light */}
<span className="inline-flex items-center font-semibold bg-blue-50 text-blue-700 gap-1.5 px-1.5 py-[2px] text-xs rounded-md">标签</span>
{/* solid */}
<span className="inline-flex items-center font-semibold bg-blue-600 text-white gap-1.5 px-1.5 py-[2px] text-xs rounded-md">标签</span>
{/* ghost */}
<span className="inline-flex items-center font-semibold border border-blue-600 text-blue-600 gap-1.5 px-1.5 py-[2px] text-xs rounded-md">标签</span>
\`\`\`

### Select
\`\`\`tsx
<div className="relative inline-flex w-full">
  <select className="w-full border border-[#e4e4e7] bg-white text-[#1c1f23] outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 transition-all appearance-none cursor-pointer py-[7px] px-3 pr-8 text-sm rounded-lg">
    <option>请选择...</option>
  </select>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"
    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
    <path d="M6 9l6 6 6-6"/>
  </svg>
</div>
\`\`\`

### Card
\`\`\`tsx
// 默认
<div className="rounded-xl p-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border border-[#e4e4e7]">
  内容
</div>

// 玻璃效果
<div className="rounded-xl p-5 bg-white/25 border border-white/60 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] backdrop-blur-sm">
  内容
</div>
\`\`\`

## 规范
- 使用 Tailwind CSS v4 语法
- 优先使用系统字体栈
- 图标使用内联 SVG，不引入图标库
- 所有交互状态：hover、active:scale-95、transition-colors
- 页面背景使用上述 radial-gradient
`

export default async function ScaffoldPage() {
  const [degitHtml, promptHtml] = await Promise.all([
    highlight(degitCommand, 'bash'),
    highlight(aiPromptTemplate, 'typescript'),
  ])

  return (
    <div className="px-8 py-10 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-2xl font-bold tracking-tight mb-3"
          style={{ color: '#fafafa' }}
        >
          项目脚手架
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.7' }}>
          快速部署 AI 平台基础框架，在此基础上 vibe coding。已内置本设计系统的所有 Token 和组件规范。
        </p>
      </div>

      {/* Includes */}
      <Section title="包含内容">
        <ul className="space-y-2 text-sm" style={{ color: '#71717a' }}>
          {[
            'React 19 + TypeScript + Vite',
            'Tailwind CSS v4',
            '6个页面：VibeCoding、Agent编辑器、Agent列表、小程序、技能、Web应用',
            '设计 Token 系统 (tokens.ts)',
            '无外部 UI 库，所有组件自建',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="mt-0.5 shrink-0"
                style={{ color: '#4ade80' }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Get it */}
      <Section title="获取">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #1a1a1a' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ backgroundColor: '#0d0d0d', borderColor: '#1a1a1a' }}
          >
            <span className="text-xs" style={{ color: '#52525b' }}>
              Terminal
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: degitHtml }}
            style={{ backgroundColor: '#0d0d0d' }}
          />
        </div>
        <p className="text-xs mt-3" style={{ color: '#52525b' }}>
          需要安装{' '}
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: '#71717a' }}
          >
            Node.js 18+
          </a>
        </p>
      </Section>

      {/* Tech stack details */}
      <Section title="技术栈详情">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #1a1a1a' }}
        >
          <table className="w-full text-sm">
            <tbody>
              {[
                ['框架', 'React 19 + TypeScript + Vite 6'],
                ['样式', 'Tailwind CSS v4'],
                ['状态管理', '原生 React hooks（无外部库）'],
                ['图标', '内联 SVG'],
                ['部署', '静态导出，支持 Vercel / Netlify / GitHub Pages'],
              ].map(([key, value], i) => (
                <tr
                  key={key}
                  style={{
                    borderBottom: i < 4 ? '1px solid #1a1a1a' : 'none',
                  }}
                >
                  <td
                    className="px-4 py-3 w-28 font-medium"
                    style={{ color: '#71717a', backgroundColor: '#0d0d0d' }}
                  >
                    {key}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: '#a1a1aa', backgroundColor: '#09090b' }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* AI Prompt */}
      <Section title="AI Prompt 模板">
        <p className="text-sm mb-4" style={{ color: '#71717a' }}>
          将此 Prompt 提供给 AI 助手（如 Claude、Cursor、v0 等），可快速生成符合本设计系统规范的组件和页面。
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #1a1a1a' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ backgroundColor: '#0d0d0d', borderColor: '#1a1a1a' }}
          >
            <span className="text-xs" style={{ color: '#52525b' }}>
              AI Prompt
            </span>
          </div>
          <div
            className="overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: promptHtml }}
            style={{ backgroundColor: '#0d0d0d', maxHeight: '480px', overflowY: 'auto' }}
          />
        </div>
      </Section>

      {/* Footer */}
      <div
        className="mt-12 pt-6 border-t flex items-center gap-2 text-sm"
        style={{ borderColor: '#1a1a1a', color: '#3f3f46' }}
      >
        <a
          href="https://github.com/welljun06/ai-platform-skill"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#71717a] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          welljun06/ai-platform-skill
        </a>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: '#71717a' }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
