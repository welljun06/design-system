export const metadata = {
  title: '快速开始 — Design System',
  description: '快速获取 AI 平台脚手架，支持项目内 vibe coding、Skill 封装调用与组件 PE 复用。',
}

const degitCommand = `npx degit welljun06/design-system my-project
cd my-project/site && npm install && npm run dev`

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
<button className="cursor-pointer border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 transition-all active:scale-95 flex h-9 items-center justify-center rounded-[39px] px-4 text-sm text-[#1c1f23] leading-[20px]">
  Click me
</button>

// 圆形
<button className="cursor-pointer border border-white/60 bg-white/25 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] hover:bg-white/50 transition-all active:scale-95 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
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
- 如果直接在项目里 vibe coding，请把新的页面设计结论持续沉淀到 CLAUDE.md 的 design / page rules 部分
`

export default function ScaffoldPage() {
  return (
    <div className="px-8 py-10 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-2xl font-bold tracking-tight mb-3"
          style={{ color: '#09090b' }}
        >
          快速开始
        </h1>
        <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.7' }}>
          这不是一个只用来“拉项目”的脚手架页面，而是一套围绕 AI 设计系统复用的工作方式说明。
          你可以直接在项目里 vibe coding、后续把能力封装成 Skills，也可以只复制组件 PE 片段快速落地到其他项目。
        </p>
      </div>

      <Section title="三种用法">
        <div className="space-y-3">
          {[
            {
              title: '1. 直接拉取项目，在项目上 vibe coding',
              description:
                '最完整的体验方式。直接拉下本项目后，以现有组件、模板、页面结构为基础继续生成和迭代。这样不仅复用组件最快，而且新的设计决定、页面样式规则还能持续沉淀到项目里的 CLAUDE.md。',
            },
            {
              title: '2. 后续封装成 Skills，按需灵活调用',
              description:
                '后面会把这套能力进一步封装成 Skills。届时可以按场景调用，例如页面生成、列表页搭建、AI 工作台布局、组件细化等，不需要每次都从完整项目开始。',
            },
            {
              title: '3. 直接复制组件 PE / Prompt 片段',
              description:
                '如果你不想完整引入项目，也可以直接拷贝某个组件、模板或页面片段的 PE，快速复用已有的结构、样式和交互表达。',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border px-4 py-4"
              style={{ borderColor: '#e4e4e7', backgroundColor: '#ffffff' }}
            >
              <p className="text-sm font-semibold mb-1.5" style={{ color: '#09090b' }}>
                {item.title}
              </p>
              <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.7' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

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

      <Section title="核心原理">
        <div className="space-y-3 text-sm" style={{ color: '#71717a', lineHeight: '1.8' }}>
          <p>
            这套脚手架的核心不是“从零生成”，而是把已经打磨过的组件代码片段、页面模板、设计 Token 和页面规则先封装好，
            让 AI 在已有资产上快速复用，而不是每次重新猜一遍。
          </p>
          <p>
            具体来说，就是把组件的结构、样式表达、交互习惯和页面布局沉淀成可直接复用的代码片段与 Prompt/PE，
            这样在做新页面时，AI 可以优先拼装和延展，而不是重新发明组件。
          </p>
          <p>
            如果你是直接在项目里 vibe coding，新的页面样式结论、布局经验和设计规则会继续记录进
            <code className="mx-1 rounded bg-[#f4f4f5] px-1.5 py-0.5 text-xs text-[#3f3f46]">CLAUDE.md</code>
            的 design / page rules 部分，形成可以持续继承的项目记忆。
          </p>
        </div>
      </Section>

      {/* Get it */}
      <Section title="获取">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #e4e4e7' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
          >
            <span className="text-xs" style={{ color: '#52525b' }}>
              Terminal
            </span>
          </div>
          <pre
            style={{
              backgroundColor: '#f6f8fa',
              color: '#24292e',
              padding: '1rem 1.25rem',
              margin: 0,
              fontSize: '13px',
              lineHeight: '1.6',
              overflowX: 'auto',
              fontFamily: "'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace",
            }}
          >
            <code>{degitCommand}</code>
          </pre>
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

      <Section title="推荐流程">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #e4e4e7' }}
        >
          <table className="w-full text-sm">
            <tbody>
              {[
                ['项目内 vibe coding', '拉取脚手架 → 启动项目 → 在已有组件/模板基础上继续生成页面与交互'],
                ['Skill 化调用', '把常见页面模式、组件片段、设计规则整理成可重复调用的 Skill 能力'],
                ['复制组件 PE', '按需复制单个组件或模板片段，快速接入到其他项目中'],
              ].map(([key, value], i) => (
                <tr
                  key={key}
                  style={{
                    borderBottom: i < 2 ? '1px solid #e4e4e7' : 'none',
                  }}
                >
                  <td
                    className="px-4 py-3 w-36 font-medium align-top"
                    style={{ color: '#52525b', backgroundColor: '#fafafa' }}
                  >
                    {key}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: '#71717a', backgroundColor: '#ffffff' }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Tech stack details */}
      <Section title="技术栈详情">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #e4e4e7' }}
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
                    borderBottom: i < 4 ? '1px solid #e4e4e7' : 'none',
                  }}
                >
                  <td
                    className="px-4 py-3 w-28 font-medium"
                    style={{ color: '#52525b', backgroundColor: '#fafafa' }}
                  >
                    {key}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{ color: '#71717a', backgroundColor: '#ffffff' }}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="最终目标">
        <div className="rounded-xl border px-4 py-4" style={{ borderColor: '#e4e4e7', backgroundColor: '#ffffff' }}>
          <p className="text-sm" style={{ color: '#71717a', lineHeight: '1.8' }}>
            这套体系的目标不是直接替代设计师，而是把重复搭建、组件拼装、样式回忆和基础页面生成这些高频工作尽量交给 AI，
            让设计师和产品团队把更多时间留给真正重要的事情：
            探索更新的交互方式、验证更大胆的概念、快速比较多个创新方案，并把精力用在更有创造力的判断上。
          </p>
        </div>
      </Section>

      {/* AI Prompt */}
      <Section title="AI Prompt 模板">
        <p className="text-sm mb-4" style={{ color: '#71717a' }}>
          将此 Prompt 提供给 AI 助手（如 Claude、Cursor、v0 等），可快速生成符合本设计系统规范的组件和页面。
          如果你只想复用单个组件/模板，也可以把里面的片段当作组件 PE 直接复制使用。
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #e4e4e7' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
          >
            <span className="text-xs" style={{ color: '#52525b' }}>
              AI Prompt
            </span>
          </div>
          <pre
            className="overflow-x-auto"
            style={{
              backgroundColor: '#f6f8fa',
              color: '#24292e',
              maxHeight: '480px',
              overflowY: 'auto',
              padding: '1rem 1.25rem',
              margin: 0,
              fontSize: '13px',
              lineHeight: '1.6',
              fontFamily: "'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace",
            }}
          >
            <code>{aiPromptTemplate}</code>
          </pre>
        </div>
      </Section>

      {/* Footer */}
      <div
        className="mt-12 pt-6 border-t flex items-center gap-2 text-sm"
        style={{ borderColor: '#e4e4e7', color: '#3f3f46' }}
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
