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

### 4.1 组件展示（核心） ✅ 已完成

参考：21st.dev、shadcn/ui

| 功能 | 状态 | 描述 |
|------|------|------|
| 分类导航 | ✅ | 左侧边栏，基础组件分类 |
| 组件预览 | ✅ | 实时渲染组件效果，支持渐变/纯白双背景切换 |
| 代码片段 | ✅ | 展示 React + Tailwind 源码，一键复制 |
| 变体切换 | ✅ | Enum 多维度配置（variant/size/radius 等），左侧面板切换 |
| 搜索 | ✅ | ⌘K 快捷键，Fuse.js 客户端搜索 |
| 样式面板 | ✅ | 右侧 StylePanel，Tailwind class 实时编辑，含下拉选项 |
| 标注模式 | ✅ | 可视化展示 padding/height/gap/radius/fontSize/iconSize |
| 使用说明 | ✅ | 每个 enum 选项附带 description，工具栏展示使用场景 |
| 自动保存 | ✅ | 编辑后自动保存到项目 `data/` 目录（文件持久化） |
| 导出 JSON | ✅ | 导出当前组件所有变体的 classOverrides 配置 |

### 4.1.1 样式面板详细设计 ✅ 已实现

**面板布局（实际实现）：**
```
┌──────────┬─────────────────────────────┬──────────────┐
│ Enum     │  工具栏（说明 | 导出 | 背景 | 标注）│              │
│ Controls │─────────────────────────────│  StylePanel  │
│          │                             │  ┌ Variant ─┐│
│ variant  │       组件预览区              │  │ mapped   ││
│ size     │    （渐变/纯白背景）           │  │ values   ││
│ radius   │                             │  ├ Size ────┤│
│ content  │                             │  │ mapped   ││
│          │                             │  │ iconSize ││
│ loading  │                             │  ├ Padding ─┤│
│ disabled │                             │  │ px-3     ││
├──────────┴─────────────────────────────┤  └──────────┘│
│ 代码区（JSX，一键复制）                   │              │
└────────────────────────────────────────┴──────────────┘
```

**交互方式：**
- Tailwind 值以行内属性展示，支持下拉选择（预定义选项）和文本编辑
- 修改后实时更新预览区渲染效果 + 代码区 className
- 自动保存到项目文件，toast 提示保存状态
- Enum 层的自定义编辑通过 `layerMemory` 在选项切换间保持
- `editableClasses` 控制哪些属性对外开放编辑
- `groupUnder` 允许 free layer 视觉上归入 enum layer 的 Mapped values 分组

**实现方案：**
- Layer + ClassOverrides 架构，组件通过 `classOverrides` prop 接收覆盖
- `sideEffects` 系统：切换 enum 选项时自动重置关联的 free layer
- `layerMemory`：per-combination 记忆，支持 enum 和 free 双层自定义持久化

### 4.2 脚手架入口 ✅ 已完成

| 功能 | 状态 | 描述 |
|------|------|------|
| 说明页 | ✅ | 介绍脚手架内容：组件代码片段 |
| 获取命令 | ✅ | `npx degit welljun06/ai-platform-skill my-project` |

### 4.3 基础功能 ✅ 已完成
- 亮色主题，极简工具风 UI
- 预览背景可切换（渐变 / 纯白）

---

## 五、组件库规范

### 5.1 设计原则
- **最小化样式**：只保留视觉核心，无运行时 UI 框架依赖
- **纯 React + Tailwind v3**：展示网站使用 Tailwind CSS v3
- **自包含**：每个组件可独立复制使用，依赖仅为 React + Tailwind
- **语义清晰**：className 使用有意义的 Tailwind 组合，不过度抽象

### 5.2 已实现组件

```
基础组件 (Primitives) — 4 个已完成
├── Button（10 种视觉风格 × 3 尺寸 × 2 圆角 × 2 内容模式）
│   ├── solid-black / solid-blue / solid-white
│   ├── outline-blue / outline-gray
│   ├── ghost-black / ghost-blue / ghost-gray
│   ├── glass / ai（渐变文字 + 魔法图标 + 顶部微光）
│   └── 每个 variant 附带使用场景 description
├── Badge / StatusBadge（已发布/未发布/草稿/审核中，enum 配置）
├── Input（LG/MD/SM 三种尺寸，enum 配置）
└── Card（默认/玻璃两种变体，enum 配置）
```

### 5.3 待实现组件

```
基础组件 (Primitives)
├── Select
├── Checkbox / Radio
├── Tag
├── Tooltip
├── Modal / Dialog
├── Drawer
├── Table
├── Tabs
└── Avatar / ConfigIcon

业务组件 (Business)
├── GlobalNav（220px 侧边栏）
├── 页面头部
├── VibeCoding 主页布局
├── Agent 编辑器三栏布局
├── 列表页模板（Agent/MiniApps/Skills/WebApps）
└── AiAssistPanel
```

### 5.4 组件来源策略

1. **脚手架仓库直接提取**：`src/ui/` 下已有原语直接整理
2. **Figma MCP 辅助**：通过 `get_design_context` 获取各组件的视觉规范，再用 Tailwind 实现
3. **Semi 组件视觉还原**：参考现有产品页面截图，保留"形"去掉"壳"
4. **逐步积累**：按需补充，不追求一次完整覆盖

---

## 六、技术栈（展示网站本身）

| 层级 | 选型 | 理由 |
|------|------|------|
| 框架 | Next.js 15（静态导出 + dev API） | 文件路由 + 静态生成，dev 模式支持 API route |
| 样式 | Tailwind CSS v3 | 稳定版本，JIT + safelist 支持动态编辑 |
| 组件预览 | 同页面实时渲染 | 无 Sandpack，性能更好，所有组件在同一 React 树内 |
| 搜索 | Fuse.js（客户端） | 纯静态，无需后端 |
| 代码高亮 | Shiki | 高质量语法高亮 |
| 持久化 | 文件系统（`data/*.json`） | dev 模式通过 API route 读写，构建时静态读取 |
| 部署 | Vercel / 静态服务器 | `npm run build` 输出 `out/` 目录 |

---

## 七、信息架构

```
/                          首页（介绍 + 组件列表）
/components/[slug]         组件详情（预览 + 变体 + 样式面板 + 代码）
/scaffold                  脚手架说明与获取命令
```

搜索通过全局快捷键 `⌘K` 打开 Modal 触发。

---

## 八、进度追踪

### Phase 1 —— 网站框架 + 核心组件 ✅ 已完成
- [x] 搭建 Next.js 静态网站
- [x] 左侧导航 + 组件详情页布局
- [x] 实时预览 + Shiki 代码高亮
- [x] 全局搜索（⌘K）
- [x] 整理 Button、Badge、Input、Card 共 4 个基础组件
- [x] 样式面板（Layer + ClassOverrides 架构）
- [x] 标注模式
- [x] 使用场景说明（description）
- [x] 自动保存到项目文件
- [x] JSON 配置导出
- [x] 预览背景切换

### Phase 2 —— 业务组件 + 脚手架页
- [ ] 从脚手架仓库提取业务组件（GlobalNav、各页面布局）
- [ ] Figma MCP 辅助提取剩余基础组件（Select、Modal、Table 等）
- [ ] AI Prompt 模板

### Phase 3 —— 完善
- [ ] 组件总览页（卡片网格预览）
- [ ] 更多基础组件（Tabs、Drawer、Tooltip 等）
- [ ] 组件复制后的 AI 使用指引
- [ ] 深色主题支持

---

## 九、关键约束

- 组件内禁止硬编码颜色，引用 token 变量或 Tailwind 语义色
- AI 渐变色仅用于 AI 功能入口，不滥用
- 展示网站保持极简工具风 UI（参考 shadcn、Linear）
- 脚手架仓库保持独立，展示网站不修改脚手架代码
