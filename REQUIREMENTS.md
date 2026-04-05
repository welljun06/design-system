# 设计系统网站 —— 需求文档

> 面向设计师的 Vibe Coding 平台，提供组件代码片段与项目脚手架，让设计师能够借助 AI 快速构建符合产品规范的页面。

---

## 一、项目背景与目标

### 背景
- 现有产品平台基于 **Semi Design** 组件库构建
- 团队自研了一套 UI 风格（glassmorphism + 深色 Solid），有 Figma 组件库维护
- 脚手架仓库 [ai-platform-skill](https://github.com/welljun06/ai-platform-skill) 已有多个页面的基础实现
- 设计师希望能够以 vibe coding 方式（通过 AI 辅助）快速生产符合系统风格的页面

### 核心目标
1. 将平台的 UI 组件整理为**纯 React + Tailwind** 的最小化实现，去除 Semi 依赖
2. 构建一个类 21st.dev 的组件展示网站，支持实时预览与代码复制
3. 脚手架仓库可供 AI 一键拉取，在此基础上 vibe coding

---

## 二、目标用户

**主要用户：产品设计师**
- 场景：想要快速实现某个页面或功能，借助 Claude / Cursor 生成符合系统风格的代码
- 诉求：不需要从零配置环境，不需要理解复杂组件依赖，能直接复用系统组件

---

## 三、现有资产盘点

### 3.1 脚手架仓库（ai-platform-skill）

**仓库地址：** https://github.com/welljun06/ai-platform-skill

**技术栈：**
- React 19 + TypeScript + Vite
- Tailwind CSS v4（通过 `@tailwindcss/vite` 插件，无单独 config 文件）
- 无外部 UI 组件库（无 antd、shadcn 等）
- 路由：`useState<Page>` 简单字符串路由

**现有页面：**
| 页面 | 说明 |
|------|------|
| VibeCodingPage | AI 编码主页（双阶段：输入态 → 生成/完成态） |
| AgentEditorPage | Agent 编辑器（三栏：配置 + 编辑器 + 预览） |
| AgentListPage | Agent 管理列表 |
| MiniAppsPage | 小程序列表 |
| SkillsPage | 技能列表 |
| WebAppsPage | Web 应用列表 |

**现有 UI 原语（`src/ui/`）：**
| 组件 | 说明 |
|------|------|
| `tokens.ts` | 设计 token 单一来源（颜色、渐变、阴影） |
| `GlassButton` | 玻璃风格按钮（circle / pill shape） |
| `DarkButton` | 深色主 CTA 按钮 |
| `IconButton` | 工具栏图标按钮 |
| `StatusBadge` | 发布/草稿/审核状态标签 |
| `ConfigIcon` | 彩色字符配置图标 |
| `CardGradientBg` | 渐变背景卡片 |
| `ThemeContext` | 主题 Context Provider |

**设计 Token 规范：**
- 玻璃风：`border: white/60` + `bg: white/25` + inset shadow
- AI 渐变：`#FFB31E → #4ED92C → #4592F2 → #6E7CFD → #E135F8`（仅用于 AI 入口）
- 所有颜色、渐变、阴影均在 `tokens.ts` 中定义，禁止在组件内硬编码

### 3.2 Figma 组件库

**文件：** ♦️ AI平台-Variants  
**地址：** https://www.figma.com/design/CBQKBDLu5aN87bycBA1kcn/

**已有组件（Button 为例，node-id: 187:846）：**

Button 变体维度：
- **设计使用**：黑色 / 蓝色 / 玻璃
- **Type**：Primary / Secondary
- **Theme**：深色 Solid / glass
- **Content**：Label / Only icon
- **Size**：Default / Small
- **Shape**：square / circle
- **State**：Default / Hover / ...

> 后续可通过 Figma MCP 逐步提取各组件的视觉规范，辅助编写 Tailwind 实现

---

## 四、网站功能需求

### 4.1 组件展示（核心）

参考：21st.dev、shadcn/ui

| 功能 | 描述 |
|------|------|
| 分类导航 | 左侧边栏，分基础组件 / 业务组件两大类 |
| 组件预览 | 实时渲染组件效果（深色背景，与产品风格一致） |
| 代码片段 | 展示 React + Tailwind 源码，一键复制 |
| 变体切换 | 同一组件展示多个 variant |
| 搜索 | 按组件名、分类、关键词检索（Fuse.js，纯客户端） |
| **样式面板** | 展示组件各层的 Tailwind 属性值，支持直接在网站上修改，实时同步预览和代码 |

### 4.1.1 样式面板详细设计

目标：让设计师在不写代码的情况下，能够直观地调整组件样式并拿到对应代码。

**面板布局：**
```
┌─────────────────────────────────────────────────────┐
│  组件预览区                                           │
├──────────────────────┬──────────────────────────────┤
│  代码区（只读高亮）    │  样式面板                     │
│                      │  ┌─ 容器层 ─────────────────┐ │
│                      │  │ padding     px-4  py-2   │ │
│                      │  │ border-radius  rounded-lg│ │
│                      │  │ background  bg-white/25  │ │
│                      │  └──────────────────────────┘ │
│                      │  ┌─ 文字层 ─────────────────┐ │
│                      │  │ font-size   text-sm      │ │
│                      │  │ color       text-white   │ │
│                      │  └──────────────────────────┘ │
└──────────────────────┴──────────────────────────────┘
```

**交互方式：**
- Tailwind 值以 **tag 形式**展示，点击可编辑
- 修改后实时更新预览区渲染效果
- 同步更新代码区对应的 className
- 提供"复制修改后代码"按钮

**实现方案：**
- 组件通过 props 接收 className 覆盖，面板控制这些 props
- 每个组件附带一份 `styleMap`，描述各层的 Tailwind token 分组（如 spacing、color、border 等）
- 不依赖 Sandpack，全部在同一页面内实现，性能更好

### 4.2 脚手架入口

| 功能 | 描述 |
|------|------|
| 说明页 | 介绍脚手架内容：路由结构、设计 token、基础页面 |
| 获取命令 | `npx degit welljun06/ai-platform-skill my-project` |
| AI Prompt 模板 | 可直接粘贴给 AI 的系统规范描述，帮助 AI 理解组件约束 |

### 4.3 基础功能
- 深色主题（与产品风格一致，不需要明暗切换）
- 极简工具风 UI（参考 shadcn、Linear）
- 部署到外网，供团队使用

---

## 五、组件库规范

### 5.1 设计原则
- **最小化样式**：只保留视觉核心，无运行时 UI 框架依赖
- **纯 React + Tailwind v4**：与脚手架一致
- **自包含**：每个组件可独立复制使用，依赖仅为 React + Tailwind
- **语义清晰**：className 使用有意义的 Tailwind 组合，不过度抽象

### 5.2 组件分类（初步）

```
基础组件 (Primitives)
├── Button（黑色/蓝色/玻璃，多 shape/size/variant）
├── IconButton
├── Badge / StatusBadge
├── Input
├── Select
├── Checkbox / Radio
├── Tag
├── Tooltip
├── Modal / Dialog
├── Drawer
├── Table
├── Tabs
├── Card（含渐变背景变体）
└── Avatar / ConfigIcon

业务组件 (Business)
├── GlobalNav（220px 侧边栏）
├── 页面头部
├── VibeCoding 主页布局
├── Agent 编辑器三栏布局
├── 列表页模板（Agent/MiniApps/Skills/WebApps）
└── AiAssistPanel
```

### 5.3 组件来源策略

1. **脚手架仓库直接提取**：`src/ui/` 下已有原语直接整理
2. **Figma MCP 辅助**：通过 `get_design_context` 获取各组件的视觉规范，再用 Tailwind 实现
3. **Semi 组件视觉还原**：参考现有产品页面截图，保留"形"去掉"壳"
4. **逐步积累**：按需补充，不追求一次完整覆盖

---

## 六、技术栈（展示网站本身）

| 层级 | 选型 | 理由 |
|------|------|------|
| 框架 | Next.js 15（静态导出） | 文件路由 + 静态生成，未来可扩展 |
| 样式 | Tailwind CSS v4 | 与脚手架保持一致 |
| 组件预览 | Sandpack（@codesandbox/sandpack-react） | 支持交互式实时预览与代码编辑 |
| 搜索 | Fuse.js（客户端） | 纯静态，无需后端 |
| 代码高亮 | Shiki | 高质量语法高亮，支持主题 |
| 内容管理 | 手动维护 `.tsx` 组件文件 + JSON 元数据 | 简单直接 |
| 部署 | Vercel | 静态导出，免费，GitHub 自动触发 |

---

## 七、信息架构

```
/                          首页（介绍 + 快速开始）
/components                组件总览（卡片网格）
/components/[name]         组件详情（预览 + 变体 + 代码）
/scaffold                  脚手架说明与获取命令
```

搜索通过全局快捷键 `⌘K` 打开 Modal 触发。

---

## 八、MVP 计划

### Phase 1 —— 网站框架 + 核心组件（优先）
- [ ] 搭建 Next.js 静态网站
- [ ] 左侧导航 + 组件详情页布局
- [ ] Sandpack 预览 + Shiki 代码高亮
- [ ] 全局搜索（⌘K）
- [ ] 整理 Button、IconButton、Badge、Card、Input 共 5 个基础组件

### Phase 2 —— 业务组件 + 脚手架页
- [ ] 从脚手架仓库提取业务组件（GlobalNav、各页面布局）
- [ ] Figma MCP 辅助提取剩余基础组件
- [ ] 脚手架说明页 + AI Prompt 模板

### Phase 3 —— 完善
- [ ] 组件总览页（卡片网格）
- [ ] 更多组件（Table、Modal、Drawer、Tabs 等）
- [ ] 组件复制后的 AI 使用指引

---

## 九、关键约束

- 组件内禁止硬编码颜色，引用 token 变量或 Tailwind 语义色
- AI 渐变色仅用于 AI 功能入口，不滥用
- 展示网站本身也要遵循组件库的设计语言（深色、极简、工具风）
- 脚手架仓库保持独立，展示网站不修改脚手架代码
