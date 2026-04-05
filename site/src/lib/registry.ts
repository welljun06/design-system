export type EnumOption = {
  key: string
  label: string
  classes: string[]
  /** Usage guidance — when to use this option */
  description?: string
  /** When this option is selected, also reset these other layers */
  sideEffects?: Record<string, string[]>
}

export type LayerDef = {
  label: string
  classes: string[]
  // If set, render a dropdown in the style panel instead of editable chips
  enumOptions?: EnumOption[]
  // The variantProps key this layer maps to (for auto-sync when switching variant tabs)
  variantPropKey?: string
  // If set, render this free layer's properties inside the named enum layer's section
  groupUnder?: string
  // If set, only these classes are shown in StylePanel for editing (others still render but are hidden from UI)
  editableClasses?: string[]
}

export type ComponentVariant = {
  label: string
  props: Record<string, string>
}

export type RegistryEntry = {
  slug: string
  name: string
  category: string
  description: string
  layers: Record<string, LayerDef>
  variants: ComponentVariant[]
  code: (classOverrides?: Record<string, string>) => string
}

// Serializable version (no functions) — safe to pass to client components
export type SerializableEntry = Omit<RegistryEntry, 'code'>

export const registry: RegistryEntry[] = [
  {
    slug: 'button',
    name: 'Button',
    category: '基础组件',
    description: '10 种视觉风格 × 2 种内容 × 3 种尺寸 × 2 种圆角的全能按钮，覆盖从主操作到辅助操作的所有场景。',
    layers: {
      base: {
        label: 'Base',
        classes: [
          'cursor-pointer',
          'transition-all',
          'active:scale-95',
          'flex',
          'items-center',
          'justify-center',
          'font-medium',
        ],
        editableClasses: ['active:scale-95', 'font-medium'],
      },
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: [
          'bg-[linear-gradient(180deg,#323232_0%,#222222_100%)]',
          'text-white',
          'hover:opacity-90',
        ],
        enumOptions: [
          { key: 'solid-black',  label: '纯黑色',   description: '主操作按钮，用于页面中最重要的行动点', classes: ['bg-[linear-gradient(180deg,#323232_0%,#222222_100%)]', 'text-white', 'hover:opacity-90'] },
          { key: 'solid-blue',   label: '纯蓝色',   description: '强调操作，用于需要引导用户注意的关键动作', classes: ['bg-[#2563eb]', 'text-white', 'hover:bg-[#1d4ed8]'] },
          { key: 'outline-blue', label: '蓝字灰框', description: '次要强调操作，视觉层级低于实心按钮', classes: ['border', 'border-[#e4e4e7]', 'text-[#2563eb]', 'bg-white', 'hover:bg-[#eff6ff]'] },
          { key: 'outline-gray', label: '灰字灰框', description: '常规次要操作，如取消、返回等辅助动作', classes: ['border', 'border-[#e4e4e7]', 'text-[#71717a]', 'bg-white', 'hover:bg-[#f4f4f5]'] },
          { key: 'ghost-black',  label: '黑字无底', description: '内联操作，融入内容区域，不抢视觉焦点', classes: ['text-[#09090b]', 'hover:bg-[#f4f4f5]'] },
          { key: 'ghost-blue',   label: '蓝字无底', description: '链接式操作，用于文本中的可点击动作', classes: ['text-[#2563eb]', 'hover:bg-[#eff6ff]'] },
          { key: 'ghost-gray',   label: '灰字无底', description: '弱化操作，用于不常用或低优先级的功能入口', classes: ['text-[#71717a]', 'hover:bg-[#f4f4f5]'] },
          { key: 'glass',        label: '玻璃',     description: '毛玻璃效果，用于图片或渐变背景之上', classes: ['border', 'border-white/60', 'bg-white/25', 'shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]', 'hover:bg-white/50', 'text-[#1c1f23]'] },
          { key: 'solid-white',  label: '纯白色',   description: '浅色容器中的操作按钮，适合卡片内使用', classes: ['bg-white', 'text-[#09090b]', 'border', 'border-transparent', 'hover:bg-[#f4f4f5]'] },
          { key: 'ai',           label: 'AI 渐变',  description: 'AI 相关功能入口，如智能生成、AI 助手等', classes: ['bg-white', 'border', 'border-[rgba(45,66,107,0.12)]', 'shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)]', 'hover:bg-[#f9f9fb]'] },
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['h-9', 'gap-2', 'text-sm'],
        enumOptions: [
          { key: 'lg', label: 'LG — 36px', classes: ['h-9', 'gap-2',   'text-sm'], sideEffects: { padding: ['px-3'], iconSize: ['size-4'] } },
          { key: 'md', label: 'MD — 32px', classes: ['h-8', 'gap-1.5', 'text-sm'], sideEffects: { padding: ['px-3'], iconSize: ['size-3.5'] } },
          { key: 'sm', label: 'SM — 24px', classes: ['h-6', 'gap-1.5', 'text-xs'], sideEffects: { padding: ['px-2'], iconSize: ['size-3'] } },
        ],
      },
      radius: {
        label: 'Radius',
        variantPropKey: 'radius',
        classes: ['rounded-lg'],
        enumOptions: [
          { key: 'rounded', label: '圆角矩形', classes: ['rounded-lg'],   sideEffects: { padding: ['px-3'] } },
          { key: 'full',    label: '全圆角',   classes: ['rounded-full'], sideEffects: { padding: ['px-5'] } },
        ],
      },
      padding: {
        label: 'Padding X',
        classes: ['px-3'],
      },
      iconSize: {
        label: 'Icon Size',
        classes: ['size-4'],
        groupUnder: 'size',
      },
    },
    variants: [
      { label: 'Solid Black',   props: { variant: 'solid-black',  content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Solid Blue',    props: { variant: 'solid-blue',   content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Outline Blue',  props: { variant: 'outline-blue', content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Outline Gray',  props: { variant: 'outline-gray', content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Ghost Black',   props: { variant: 'ghost-black',  content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Ghost Blue',    props: { variant: 'ghost-blue',   content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Ghost Gray',    props: { variant: 'ghost-gray',   content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Glass',         props: { variant: 'glass',        content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'Solid White',   props: { variant: 'solid-white',  content: 'block', size: 'lg', radius: 'rounded' } },
      { label: 'AI',            props: { variant: 'ai',           content: 'block', size: 'lg', radius: 'full'    } },
      { label: 'Icon Only',     props: { variant: 'solid-black',  content: 'icon',  size: 'lg', radius: 'rounded' } },
      { label: 'Full Radius',   props: { variant: 'solid-black',  content: 'block', size: 'lg', radius: 'full'    } },
      { label: 'Size MD',       props: { variant: 'solid-black',  content: 'block', size: 'md', radius: 'rounded' } },
      { label: 'Size SM',       props: { variant: 'solid-black',  content: 'block', size: 'sm', radius: 'rounded' } },
      { label: 'Loading',       props: { variant: 'solid-black',  content: 'block', size: 'lg', radius: 'rounded', loading: 'true' } },
      { label: 'Disabled',      props: { variant: 'solid-black',  content: 'block', size: 'lg', radius: 'rounded', disabled: 'true' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'cursor-pointer transition-all active:scale-95 flex items-center justify-center font-medium'
      const variant = overrides?.variant ?? 'bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90'
      const size = overrides?.size ?? 'h-9 px-4 gap-2 text-sm'
      const radius = overrides?.radius ?? 'rounded-lg'
      return `<button className="${base} ${variant} ${size} ${radius}">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
  Button
</button>`
    },
  },
  {
    slug: 'status-badge',
    name: 'Badge',
    category: '基础组件',
    description: '状态标签，用于展示内容发布状态。支持已发布、未发布、草稿和审核中四种状态。',
    layers: {
      base: {
        label: 'Base',
        classes: [
          'rounded-md',
          'px-2',
          'py-0.5',
          'text-xs',
          'font-medium',
        ],
      },
      status: {
        label: 'Status',
        variantPropKey: 'status',
        classes: ['bg-green-100', 'text-green-700'],
        enumOptions: [
          { key: '已发布', label: '已发布', description: '内容已上线，对外可见', classes: ['bg-green-100', 'text-green-700'] },
          { key: '未发布', label: '未发布', description: '内容已完成但未对外发布', classes: ['bg-gray-100', 'text-gray-600'] },
          { key: '草稿',   label: '草稿',   description: '编辑中的内容，尚未完成', classes: ['bg-yellow-100', 'text-yellow-700'] },
          { key: '审核中', label: '审核中', description: '内容已提交，等待审核通过', classes: ['bg-blue-100', 'text-blue-600'] },
        ],
      },
    },
    variants: [
      { label: '已发布', props: { status: '已发布' } },
      { label: '未发布', props: { status: '未发布' } },
      { label: '草稿', props: { status: '草稿' } },
      { label: '审核中', props: { status: '审核中' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'rounded-md px-2 py-0.5 text-xs font-medium'
      const status = overrides?.status ?? 'bg-green-100 text-green-700'
      return `<span className="${base} ${status}">
  已发布
</span>`
    },
  },
  {
    slug: 'input',
    name: 'Input',
    category: '基础组件',
    description: '简洁的文本输入框，支持 placeholder、focus 状态和 ring 效果。适配亮色背景场景。',
    layers: {
      base: {
        label: 'Base',
        classes: [
          'w-full',
          'border',
          'border-[#e4e4e7]',
          'bg-white',
          'text-[#1c1f23]',
          'placeholder:text-[#a1a1aa]',
          'outline-none',
          'focus:border-[#a1a1aa]',
          'focus:ring-2',
          'focus:ring-[#a1a1aa]/20',
          'transition-all',
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['px-3', 'py-2', 'text-sm', 'rounded-lg'],
        enumOptions: [
          { key: 'lg', label: 'LG', description: '大尺寸输入框，用于表单主要输入项', classes: ['px-3', 'py-2', 'text-sm', 'rounded-lg'] },
          { key: 'md', label: 'MD', description: '默认尺寸，适用于大多数表单场景', classes: ['px-2.5', 'py-1.5', 'text-sm', 'rounded-md'] },
          { key: 'sm', label: 'SM', description: '紧凑尺寸，用于空间受限的筛选、搜索等场景', classes: ['px-2', 'py-1', 'text-xs', 'rounded-md'] },
        ],
      },
    },
    variants: [
      { label: 'Default', props: { size: 'lg' } },
      { label: 'MD', props: { size: 'md' } },
      { label: 'SM', props: { size: 'sm' } },
      { label: 'Disabled', props: { size: 'lg', disabled: 'true' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'w-full border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 transition-all'
      const size = overrides?.size ?? 'px-3 py-2 text-sm rounded-lg'
      return `<input
  type="text"
  placeholder="请输入内容..."
  className="${base} ${size}"
/>`
    },
  },
  {
    slug: 'card',
    name: 'Card',
    category: '基础组件',
    description: '卡片容器组件，提供默认白色和玻璃效果两种变体，适用于内容分组和信息展示。',
    layers: {
      base: {
        label: 'Base',
        classes: [
          'rounded-xl',
          'p-5',
        ],
      },
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: ['bg-white', 'shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]', 'border', 'border-[#e4e4e7]'],
        enumOptions: [
          { key: 'default', label: '默认',   description: '标准卡片，用于内容分组和信息展示', classes: ['bg-white', 'shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]', 'border', 'border-[#e4e4e7]'] },
          { key: 'glass',   label: '玻璃',   description: '毛玻璃效果，用于图片或渐变背景之上', classes: ['bg-white/25', 'border', 'border-white/60', 'shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]', 'backdrop-blur-sm'] },
        ],
      },
    },
    variants: [
      { label: 'Default', props: { variant: 'default' } },
      { label: 'Glass', props: { variant: 'glass' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'rounded-xl p-5'
      const variant = overrides?.variant ?? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border border-[#e4e4e7]'
      return `<div className="${base} ${variant}">
  <h3 className="text-sm font-semibold text-[#1c1f23]">Card Title</h3>
  <p className="mt-1 text-sm text-[#71717a]">Card content goes here.</p>
</div>`
    },
  },
]

export function getEntry(slug: string): RegistryEntry | undefined {
  return registry.find((e) => e.slug === slug)
}

// Build a serializable entry (strips the code function)
export function toSerializable(entry: RegistryEntry): SerializableEntry {
  return {
    slug: entry.slug,
    name: entry.name,
    category: entry.category,
    description: entry.description,
    layers: entry.layers,
    variants: entry.variants,
  }
}
