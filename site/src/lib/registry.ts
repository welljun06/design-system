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
          { key: 'sm', label: 'SM — 24px', classes: ['h-6', 'gap-0.5', 'text-xs'], sideEffects: { padding: ['px-1'], iconSize: ['size-3'] } },
        ],
      },
      radius: {
        label: 'Radius',
        variantPropKey: 'radius',
        classes: ['rounded-lg'],
        enumOptions: [
          { key: 'rounded', label: '圆角矩形', classes: ['rounded-lg'] },
          { key: 'full',    label: '全圆角',   classes: ['rounded-full'], sideEffects: { padding: ['px-4'] } },
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
      const size = overrides?.size ?? 'h-9 gap-2 text-sm'
      const radius = overrides?.radius ?? 'rounded-lg'
      const padding = overrides?.padding ?? 'px-3'
      return `<button className="${base} ${variant} ${size} ${radius} ${padding}">
  <ArrowDown size={14} />
  Button
</button>`
    },
  },
  {
    slug: 'input',
    name: 'Input',
    category: '基础组件',
    description: '简洁的文本输入框，支持多种尺寸和视觉风格。',
    layers: {
      base: {
        label: 'Base',
        classes: [
          'w-full',
          'border',
          'outline-none',
          'transition-all',
        ],
        editableClasses: [],
      },
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: ['border-[#e4e4e7]', 'bg-white', 'text-[#1c1f23]', 'placeholder:text-[#a1a1aa]', 'focus:border-[#a1a1aa]', 'focus:ring-2', 'focus:ring-[#a1a1aa]/20'],
        enumOptions: [
          { key: 'default', label: '默认',  description: '标准输入框，白底灰边，适用于亮色背景', classes: ['border-[#e4e4e7]', 'bg-white', 'text-[#1c1f23]', 'placeholder:text-[#a1a1aa]', 'focus:border-[#a1a1aa]', 'focus:ring-2', 'focus:ring-[#a1a1aa]/20'] },
          { key: 'glass',   label: '玻璃',  description: '毛玻璃效果，适用于图片或渐变背景之上', classes: ['border-white/60', 'bg-white/25', 'shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]', 'text-[#1c1f23]', 'placeholder:text-[#71717a]', 'focus:border-white/80', 'focus:ring-2', 'focus:ring-white/20', 'backdrop-blur-sm'] },
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'],
        enumOptions: [
          { key: 'lg', label: 'LG — 36px', description: '大尺寸输入框，用于表单主要输入项', classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'] },
          { key: 'md', label: 'MD — 32px', description: '默认尺寸，适用于大多数表单场景', classes: ['py-[5px]', 'px-2.5', 'text-sm', 'rounded-md'] },
          { key: 'sm', label: 'SM — 24px', description: '紧凑尺寸，用于空间受限的筛选、搜索等场景', classes: ['py-[3px]', 'px-2', 'text-xs', 'rounded-md'] },
        ],
      },
    },
    variants: [
      { label: 'Default', props: { variant: 'default', size: 'lg' } },
      { label: 'Glass', props: { variant: 'glass', size: 'lg' } },
      { label: 'MD', props: { variant: 'default', size: 'md' } },
      { label: 'SM', props: { variant: 'default', size: 'sm' } },
      { label: 'Disabled', props: { variant: 'default', size: 'lg', disabled: 'true' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'w-full border outline-none transition-all'
      const variant = overrides?.variant ?? 'border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20'
      const size = overrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
      return `<input
  type="text"
  placeholder="请输入内容..."
  className="${base} ${variant} ${size}"
/>`
    },
  },
  {
    slug: 'select',
    name: 'Select',
    category: '基础组件',
    description: '下拉选择器，支持多种尺寸和视觉风格。基于 Radix UI 构建。',
    layers: {
      base: {
        label: 'Base',
        classes: [
          'border',
          'outline-none',
          'transition-all',
          'cursor-pointer',
        ],
        editableClasses: [],
      },
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: ['border-[#e4e4e7]', 'bg-white', 'text-[#1c1f23]', 'focus:border-[#a1a1aa]', 'focus:ring-2', 'focus:ring-[#a1a1aa]/20'],
        enumOptions: [
          { key: 'default', label: '默认',  description: '标准选择器，白底灰边，适用于亮色背景', classes: ['border-[#e4e4e7]', 'bg-white', 'text-[#1c1f23]', 'focus:border-[#a1a1aa]', 'focus:ring-2', 'focus:ring-[#a1a1aa]/20'] },
          { key: 'glass',   label: '玻璃',  description: '毛玻璃效果，适用于图片或渐变背景之上', classes: ['border-white/60', 'bg-white/25', 'shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]', 'text-[#1c1f23]', 'focus:border-white/80', 'focus:ring-2', 'focus:ring-white/20', 'backdrop-blur-sm'] },
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'],
        enumOptions: [
          { key: 'lg', label: 'LG — 36px', description: '大尺寸选择器，用于表单主要选择项', classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'] },
          { key: 'md', label: 'MD — 32px', description: '默认尺寸，适用于大多数表单场景', classes: ['py-[5px]', 'px-2.5', 'text-sm', 'rounded-md'] },
          { key: 'sm', label: 'SM — 24px', description: '紧凑尺寸，用于筛选栏或工具栏', classes: ['py-[3px]', 'px-2', 'text-xs', 'rounded-md'] },
        ],
      },
    },
    variants: [
      { label: 'Default', props: { variant: 'default', size: 'lg' } },
      { label: 'Glass', props: { variant: 'glass', size: 'lg' } },
      { label: 'MD', props: { variant: 'default', size: 'md' } },
      { label: 'SM', props: { variant: 'default', size: 'sm' } },
      { label: 'Disabled', props: { variant: 'default', size: 'lg', disabled: 'true' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'border outline-none transition-all cursor-pointer'
      const variant = overrides?.variant ?? 'border-[#e4e4e7] bg-white text-[#1c1f23] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20'
      const size = overrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
      return `{/* Requires: @radix-ui/react-select, lucide-react */}
<Select.Root>
  <Select.Trigger className="w-full flex items-center justify-between ${base} ${variant} ${size}">
    <Select.Value placeholder="请选择..." />
    <ChevronDown size={14} color="#a1a1aa" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content className="bg-white rounded-lg border border-[#e4e4e7] shadow-lg p-1">
      <Select.Viewport>
        <Select.Item value="1" className="flex items-center justify-between px-2.5 py-1.5 text-sm rounded-md cursor-pointer data-[highlighted]:bg-[#f4f4f5]">
          <Select.ItemText>选项一</Select.ItemText>
          <Select.ItemIndicator><Check size={14} color="#a1a1aa" /></Select.ItemIndicator>
        </Select.Item>
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>`
    },
  },
  {
    slug: 'tag',
    name: 'Tag',
    category: '基础组件',
    description: '标签组件，支持 6 种颜色 × 3 种类型 × 3 种尺寸 × 2 种形状，用于信息分类和状态标记。',
    layers: {
      base: {
        label: 'Base',
        classes: ['inline-flex', 'items-center', 'font-semibold'],
        editableClasses: ['font-semibold'],
      },
      color: {
        label: 'Color',
        variantPropKey: 'color',
        classes: [],
        enumOptions: [
          { key: 'white',  label: '白色',  description: '默认中性标签，适用于通用信息标记', classes: [] },
          { key: 'blue',   label: '蓝色',  description: '信息类标签，标记链接或可操作项', classes: [] },
          { key: 'green',  label: '绿色',  description: '成功/正向状态标签', classes: [] },
          { key: 'red',    label: '红色',  description: '错误/危险状态标签', classes: [] },
          { key: 'orange', label: '橙色',  description: '警告/待处理状态标签', classes: [] },
          { key: 'violet', label: '紫色',  description: '特殊分类标签，如高级功能、实验特性', classes: [] },
        ],
      },
      type: {
        label: 'Type',
        variantPropKey: 'type',
        classes: [],
        enumOptions: [
          { key: 'light', label: '浅色', description: '浅色背景，最常用，视觉柔和', classes: [] },
          { key: 'solid', label: '填充', description: '实心填充，视觉最强', classes: [] },
          { key: 'ghost', label: '描边', description: '仅边框无底色，轻量透明', classes: [] },
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['gap-1.5', 'px-1.5', 'py-[2px]', 'text-xs'],
        enumOptions: [
          { key: 'lg', label: 'LG — 24px', description: '大尺寸标签，用于页面标题区域', classes: ['gap-1.5', 'px-2', 'py-[2px]', 'text-sm'] },
          { key: 'md', label: 'MD — 20px', description: '默认尺寸，适用于大多数场景', classes: ['gap-1.5', 'px-1.5', 'py-[2px]', 'text-xs'] },
          { key: 'sm', label: 'SM — 16px', description: '紧凑尺寸，用于列表或表格内', classes: ['gap-1', 'px-1', 'py-0', 'text-[11px]', 'leading-[16px]'] },
        ],
      },
      shape: {
        label: 'Shape',
        variantPropKey: 'shape',
        classes: ['rounded-md'],
        enumOptions: [
          { key: 'square', label: '方角', description: '标准圆角矩形', classes: ['rounded-md'] },
          { key: 'circle', label: '圆角', description: '全圆角胶囊形', classes: ['rounded-full'] },
        ],
      },
    },
    variants: [
      { label: '白 · 描边', props: { color: 'white', type: 'light', size: 'md', shape: 'square' } },
      { label: '白 · 填充', props: { color: 'white', type: 'solid', size: 'md', shape: 'square' } },
      { label: '蓝 · 描边', props: { color: 'blue', type: 'light', size: 'md', shape: 'square' } },
      { label: '绿 · 描边', props: { color: 'green', type: 'light', size: 'md', shape: 'square' } },
      { label: '红 · 填充', props: { color: 'red', type: 'solid', size: 'md', shape: 'square' } },
      { label: 'LG', props: { color: 'white', type: 'light', size: 'lg', shape: 'square' } },
      { label: 'SM', props: { color: 'white', type: 'light', size: 'sm', shape: 'square' } },
      { label: '圆角', props: { color: 'blue', type: 'light', size: 'md', shape: 'circle' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'inline-flex items-center font-medium'
      const color = overrides?.color ?? 'border border-[rgba(45,66,107,0.12)] bg-white text-[#1c1f23]'
      const size = overrides?.size ?? 'gap-1.5 px-1.5 py-[2px] text-xs'
      const shape = overrides?.shape ?? 'rounded-md'
      return `<span className="${base} ${color} ${size} ${shape}">
  标签
</span>`
    },
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: '基础组件',
    description: '选项卡切换组件，支持 6 种视觉风格 × 3 种尺寸，用于内容分组切换。',
    layers: {
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: [],
        enumOptions: [
          { key: 'glass',          label: '玻璃 · 全圆',  description: '毛玻璃胶囊风格，适用于渐变或图片背景之上', classes: [] },
          { key: 'glass-rounded',  label: '玻璃 · 矩形',  description: '毛玻璃圆角矩形，适合嵌入页面布局', classes: [] },
          { key: 'button',         label: '按钮 · 全圆',  description: '填充胶囊风格，视觉独立', classes: [] },
          { key: 'button-rounded', label: '按钮 · 矩形',  description: '填充圆角矩形，适用于工具栏或紧凑布局', classes: [] },
          { key: 'line',           label: '下划线',       description: '经典下划线风格，适用于内容区域顶部', classes: [] },
          { key: 'card',           label: '卡片',         description: '卡片式标签，适用于面板或容器顶部', classes: [] },
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['h-8', 'p-0.5', 'gap-0.5'],
        enumOptions: [
          { key: 'lg', label: 'LG — 36px', description: '大尺寸，用于页面级导航', classes: ['h-9', 'p-1', 'gap-0.5'] },
          { key: 'md', label: 'MD — 32px', description: '默认尺寸，适用于大多数场景', classes: ['h-8', 'p-0.5', 'gap-0.5'] },
          { key: 'sm', label: 'SM — 24px', description: '紧凑尺寸，用于面板或弹窗内', classes: ['h-6', 'p-0.5', 'gap-0.5'] },
        ],
      },
    },
    variants: [
      { label: 'Glass', props: { variant: 'glass', size: 'md' } },
      { label: 'Glass · 矩形', props: { variant: 'glass-rounded', size: 'md' } },
      { label: 'Button', props: { variant: 'button', size: 'md' } },
      { label: 'Button · 矩形', props: { variant: 'button-rounded', size: 'md' } },
      { label: 'Line', props: { variant: 'line', size: 'md' } },
      { label: 'Card', props: { variant: 'card', size: 'md' } },
    ],
    code: (overrides) => {
      return `{/* Glass variant example */}
<div className="inline-flex items-center rounded-full border border-white bg-white/40 shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] h-9 p-1 gap-0.5">
  <button className="px-4 py-0.5 text-sm rounded-full bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] text-[#1c1f23] font-semibold">
    标签一
  </button>
  <button className="px-4 py-0.5 text-sm rounded-full text-[#1c1f23]/60">
    标签二
  </button>
</div>`
    },
  },
  {
    slug: 'form',
    name: 'Form',
    category: '基础组件',
    description: '表单字段组件，支持 12 种字段类型 × 2 种标签布局，涵盖输入、选择、开关、日期、上传等常见表单场景。',
    layers: {
      layout: {
        label: 'Layout',
        variantPropKey: 'layout',
        classes: ['flex', 'flex-col', 'gap-1'],
        enumOptions: [
          { key: 'top',  label: '标签在上', description: '标签位于字段上方，适用于标准表单', classes: ['flex', 'flex-col', 'gap-1'] },
          { key: 'left', label: '标签在左', description: '标签位于字段左侧，适用于紧凑横向表单', classes: ['flex', 'items-start'] },
        ],
      },
      fieldType: {
        label: 'Field Type',
        variantPropKey: 'fieldType',
        classes: [],
        enumOptions: [
          { key: 'input',       label: '输入框',     description: '单行文本输入', classes: [] },
          { key: 'textarea',    label: '文本域',     description: '多行文本输入，带字数统计', classes: [] },
          { key: 'select',      label: '选择器',     description: '下拉选择', classes: [] },
          { key: 'checkbox',    label: '多选框',     description: '多选复选框组', classes: [] },
          { key: 'radio',       label: '单选框',     description: '单选按钮组', classes: [] },
          { key: 'switch',      label: '开关',       description: '切换开关', classes: [] },
          { key: 'slider',      label: '滑块',       description: '范围滑块', classes: [] },
          { key: 'upload',      label: '上传',       description: '图片上传', classes: [] },
          { key: 'inputgroup',  label: '组合输入',   description: '选择器 + 输入框组合', classes: [] },
          { key: 'taginput',    label: '标签输入',   description: '标签式输入框', classes: [] },
        ],
      },
      label: {
        label: 'Label',
        classes: ['text-sm', 'font-semibold', 'text-[rgba(28,31,35,0.8)]', 'leading-5'],
      },
      field: {
        label: 'Field',
        classes: ['w-full', 'bg-white', 'border', 'border-[rgba(45,66,107,0.12)]', 'rounded-lg', 'px-3', 'py-2'],
      },
    },
    variants: [
      { label: '输入框 · 上',     props: { layout: 'top',  fieldType: 'input' } },
      { label: '输入框 · 左',     props: { layout: 'left', fieldType: 'input' } },
      { label: '文本域',          props: { layout: 'top',  fieldType: 'textarea' } },
      { label: '选择器',          props: { layout: 'top',  fieldType: 'select' } },
      { label: '多选框',          props: { layout: 'top',  fieldType: 'checkbox' } },
      { label: '单选框',          props: { layout: 'top',  fieldType: 'radio' } },
      { label: '开关',            props: { layout: 'top',  fieldType: 'switch' } },
      { label: '滑块',            props: { layout: 'top',  fieldType: 'slider' } },
      { label: '上传',            props: { layout: 'top',  fieldType: 'upload' } },
      { label: '组合输入',        props: { layout: 'top',  fieldType: 'inputgroup' } },
      { label: '标签输入',        props: { layout: 'top',  fieldType: 'taginput' } },
    ],
    code: (overrides) => {
      const label = overrides?.label ?? 'text-sm font-semibold text-[rgba(28,31,35,0.8)] leading-5'
      return `<div className="flex flex-col gap-1 w-[300px]">
  <span className="${label}">字段标题</span>
  <div className="flex flex-col gap-1">
    <input
      type="text"
      placeholder="请输入"
      className="w-full border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 outline-none transition-all py-[7px] px-3 text-sm rounded-lg"
    />
  </div>
</div>`
    },
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: '基础组件',
    description: '多行文本输入框，支持多种尺寸和视觉风格，适用于描述、备注等长文本输入。',
    layers: {
      base: {
        label: 'Base',
        classes: ['w-full', 'border', 'outline-none', 'transition-all', 'resize-y', 'min-h-[92px]'],
        editableClasses: ['min-h-[92px]'],
      },
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: ['border-[#e4e4e7]', 'bg-white', 'text-[#1c1f23]', 'placeholder:text-[#a1a1aa]', 'focus:border-[#a1a1aa]', 'focus:ring-2', 'focus:ring-[#a1a1aa]/20'],
        enumOptions: [
          { key: 'default', label: '默认', description: '标准文本域，白底灰边', classes: ['border-[#e4e4e7]', 'bg-white', 'text-[#1c1f23]', 'placeholder:text-[#a1a1aa]', 'focus:border-[#a1a1aa]', 'focus:ring-2', 'focus:ring-[#a1a1aa]/20'] },
          { key: 'glass', label: '玻璃', description: '毛玻璃效果，适用于图片或渐变背景之上', classes: ['border-white/60', 'bg-white/25', 'shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)]', 'text-[#1c1f23]', 'placeholder:text-[#71717a]', 'focus:border-white/80', 'focus:ring-2', 'focus:ring-white/20', 'backdrop-blur-sm'] },
        ],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'],
        enumOptions: [
          { key: 'lg', label: 'LG — 36px', classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'] },
          { key: 'md', label: 'MD — 32px', classes: ['py-[5px]', 'px-2.5', 'text-sm', 'rounded-md'] },
          { key: 'sm', label: 'SM — 24px', classes: ['py-[3px]', 'px-2', 'text-xs', 'rounded-md'] },
        ],
      },
    },
    variants: [
      { label: 'Default', props: { variant: 'default', size: 'lg' } },
      { label: 'Glass', props: { variant: 'glass', size: 'lg' } },
      { label: 'MD', props: { variant: 'default', size: 'md' } },
      { label: 'SM', props: { variant: 'default', size: 'sm' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'w-full border outline-none transition-all resize-y min-h-[92px]'
      const variant = overrides?.variant ?? 'border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20'
      const size = overrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
      return `<textarea
  placeholder="请输入内容..."
  className="${base} ${variant} ${size}"
/>`
    },
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: '基础组件',
    description: '复选框组，支持多种尺寸，用于多选场景。',
    layers: {
      checked: {
        label: 'Checked',
        classes: ['size-4', 'rounded-[3px]', 'border', 'border-[#1c1f23]', 'bg-[#1c1f23]', 'text-white'],
      },
      unchecked: {
        label: 'Unchecked',
        classes: ['size-4', 'rounded-[3px]', 'border', 'border-[rgba(28,31,35,0.35)]', 'bg-white'],
      },
      label: {
        label: 'Label',
        classes: ['text-sm', 'leading-5', 'font-normal', 'text-[#1c1f23]', 'select-none'],
      },
      cardTitle: {
        label: 'Card Title',
        classes: ['text-sm', 'leading-5', 'font-semibold', 'text-[#1c1f23]', 'select-none'],
      },
      description: {
        label: 'Description',
        classes: ['text-sm', 'leading-5', 'text-[rgba(28,31,35,0.6)]', 'select-none'],
      },
      cardChecked: {
        label: 'Card · Checked',
        classes: ['rounded-[8px]', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-[#f5f7fa]', 'px-[17px]', 'py-[13px]'],
      },
      cardUnchecked: {
        label: 'Card · Unchecked',
        classes: ['rounded-[8px]', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white', 'px-[17px]', 'py-[13px]'],
      },
      variant: {
        label: 'Variant',
        variantPropKey: 'variant',
        classes: [],
        enumOptions: [
          { key: 'default', label: 'Default', classes: [], sideEffects: {} },
          { key: 'card', label: 'Card', classes: [], sideEffects: { cardTitle: ['text-sm', 'leading-5', 'font-semibold', 'text-[#1c1f23]', 'select-none'], description: ['text-sm', 'leading-5', 'text-[rgba(28,31,35,0.6)]', 'select-none'], cardChecked: ['rounded-[8px]', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-[#f5f7fa]', 'px-[17px]', 'py-[13px]'], cardUnchecked: ['rounded-[8px]', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white', 'px-[17px]', 'py-[13px]'] } },
        ],
      },
    },
    variants: [
      { label: 'Default', props: { variant: 'default' } },
      { label: 'Card', props: { variant: 'card' } },
    ],
    code: (overrides) => {
      const box = overrides?.box ?? 'h-4 w-4 rounded-[3px]'
      const label = overrides?.label ?? 'text-sm leading-5 font-normal text-[#1c1f23] select-none'
      return `{/* Requires: @radix-ui/react-checkbox, @radix-ui/react-label, lucide-react */}
<div className="flex items-center gap-4 py-1">
  <div className="flex items-center gap-2">
    <Checkbox id="cb1" defaultChecked className="${box}" />
    <Label htmlFor="cb1" className="cursor-pointer ${label}">选择框标题</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="cb2" className="${box}" />
    <Label htmlFor="cb2" className="cursor-pointer ${label}">选择框标题</Label>
  </div>
</div>`
    },
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    category: '基础组件',
    description: '单选按钮组，支持多种尺寸，用于互斥选择场景。',
    layers: {
      selected: {
        label: 'Selected',
        classes: ['size-4', 'rounded-full', 'border-[5px]', 'border-[#1c1f23]', 'bg-white'],
      },
      unselected: {
        label: 'Unselected',
        classes: ['size-4', 'rounded-full', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white'],
      },
      label: {
        label: 'Label',
        classes: ['text-sm', 'text-[#1c1f23]', 'select-none'],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: [],
        enumOptions: [
          { key: 'lg', label: 'LG', classes: [], sideEffects: { selected: ['size-5', 'rounded-full', 'border-[6px]', 'border-[#1c1f23]', 'bg-white'], unselected: ['size-5', 'rounded-full', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white'] } },
          { key: 'md', label: 'MD', classes: [], sideEffects: { selected: ['size-4', 'rounded-full', 'border-[5px]', 'border-[#1c1f23]', 'bg-white'], unselected: ['size-4', 'rounded-full', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white'] } },
          { key: 'sm', label: 'SM', classes: [], sideEffects: { selected: ['size-3.5', 'rounded-full', 'border-[4px]', 'border-[#1c1f23]', 'bg-white'], unselected: ['size-3.5', 'rounded-full', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white'] } },
        ],
      },
    },
    variants: [
      { label: 'MD', props: { size: 'md' } },
      { label: 'LG', props: { size: 'lg' } },
      { label: 'SM', props: { size: 'sm' } },
    ],
    code: (overrides) => {
      const radio = overrides?.radio ?? 'h-4 w-4'
      const label = overrides?.label ?? 'text-sm text-[#1c1f23]'
      return `{/* Requires: @radix-ui/react-radio-group, @radix-ui/react-label */}
<RadioGroup defaultValue="a" className="flex items-center gap-4 py-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="r1" className="${radio}" />
    <Label htmlFor="r1" className="cursor-pointer ${label}">单选框标题</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="b" id="r2" className="${radio}" />
    <Label htmlFor="r2" className="cursor-pointer ${label}">单选框标题</Label>
  </div>
</RadioGroup>`
    },
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: '基础组件',
    description: '开关组件，支持多种尺寸，用于布尔值切换场景。',
    layers: {
      track: {
        label: 'Track',
        classes: [
          'w-10',
          'h-5',
          'rounded-[12px]',
          'p-[2px]',
          'border',
          'border-transparent',
          'data-[state=checked]:bg-[#0275f4]',
          'hover:data-[state=checked]:bg-[#175cd3]',
          'data-[state=unchecked]:bg-[rgba(83,96,143,0.12)]',
          'disabled:data-[state=checked]:bg-[#84caff]',
          'disabled:data-[state=unchecked]:bg-[rgba(83,96,143,0.15)]',
          'disabled:data-[state=unchecked]:border-[rgba(45,66,107,0.12)]',
        ],
      },
      thumb: {
        label: 'Thumb',
        classes: ['h-4', 'w-[22px]', 'rounded-[9px]', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]', 'data-[state=checked]:translate-x-[13px]'],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: [],
        enumOptions: [
          { key: 'md', label: 'MD', classes: [], sideEffects: { track: ['w-10', 'h-5', 'rounded-[12px]', 'p-[2px]', 'border', 'border-transparent', 'data-[state=checked]:bg-[#0275f4]', 'hover:data-[state=checked]:bg-[#175cd3]', 'data-[state=unchecked]:bg-[rgba(83,96,143,0.12)]', 'disabled:data-[state=checked]:bg-[#84caff]', 'disabled:data-[state=unchecked]:bg-[rgba(83,96,143,0.15)]', 'disabled:data-[state=unchecked]:border-[rgba(45,66,107,0.12)]'], thumb: ['h-4', 'w-[22px]', 'rounded-[9px]', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]', 'data-[state=checked]:translate-x-[13px]'] } },
          { key: 'sm', label: 'SM', classes: [], sideEffects: { track: ['w-8', 'h-4', 'rounded-[8px]', 'p-[2px]', 'border', 'border-transparent', 'data-[state=checked]:bg-[#0275f4]', 'hover:data-[state=checked]:bg-[#175cd3]', 'data-[state=unchecked]:bg-[rgba(83,96,143,0.12)]', 'disabled:data-[state=checked]:bg-[#84caff]', 'disabled:data-[state=unchecked]:bg-[rgba(83,96,143,0.15)]', 'disabled:data-[state=unchecked]:border-[rgba(45,66,107,0.12)]'], thumb: ['h-3', 'w-4', 'rounded-[6px]', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]', 'data-[state=checked]:translate-x-[11px]'] } },
        ],
      },
    },
    variants: [
      { label: 'MD', props: { size: 'md' } },
      { label: 'SM', props: { size: 'sm' } },
    ],
    code: (overrides) => {
      const track = overrides?.track ?? 'h-5 w-10 rounded-[12px] p-[2px] border border-transparent data-[state=checked]:bg-[#0275f4] hover:data-[state=checked]:bg-[#175cd3] data-[state=unchecked]:bg-[rgba(83,96,143,0.12)] disabled:data-[state=checked]:bg-[#84caff] disabled:data-[state=unchecked]:bg-[rgba(83,96,143,0.15)] disabled:data-[state=unchecked]:border-[rgba(45,66,107,0.12)]'
      const thumb = overrides?.thumb ?? 'h-4 w-[22px] rounded-[9px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)] data-[state=checked]:translate-x-[12px]'
      return `{/* Requires: @radix-ui/react-switch */}
<Switch
  defaultChecked
  className="${track}"
  thumbClassName="${thumb}"
/>`
    },
  },
  {
    slug: 'slider',
    name: 'Slider',
    category: '基础组件',
    description: '滑块组件，支持多种尺寸，用于数值范围选择。',
    layers: {
      track: {
        label: 'Track',
        classes: ['h-1', 'rounded-full', 'bg-[rgba(83,96,143,0.07)]'],
      },
      range: {
        label: 'Range',
        classes: ['h-1', 'rounded-full', 'bg-[#1c1f23]'],
      },
      thumb: {
        label: 'Thumb',
        classes: ['size-6', 'rounded-full', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]'],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: [],
        enumOptions: [
          { key: 'lg', label: 'LG', classes: [], sideEffects: { track: ['h-1.5', 'rounded-full', 'bg-[rgba(83,96,143,0.07)]'], range: ['h-1.5', 'rounded-full', 'bg-[#1c1f23]'], thumb: ['size-6', 'rounded-full', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]'] } },
          { key: 'md', label: 'MD', classes: [], sideEffects: { track: ['h-1', 'rounded-full', 'bg-[rgba(83,96,143,0.07)]'], range: ['h-1', 'rounded-full', 'bg-[#1c1f23]'], thumb: ['size-6', 'rounded-full', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]'] } },
          { key: 'sm', label: 'SM', classes: [], sideEffects: { track: ['h-1', 'rounded-full', 'bg-[rgba(83,96,143,0.07)]'], range: ['h-1', 'rounded-full', 'bg-[#1c1f23]'], thumb: ['size-4', 'rounded-full', 'bg-white', 'shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)]'] } },
        ],
      },
    },
    variants: [
      { label: 'MD', props: { size: 'md' } },
      { label: 'LG', props: { size: 'lg' } },
      { label: 'SM', props: { size: 'sm' } },
    ],
    code: () => {
      return `{/* Requires: @radix-ui/react-slider */}
<Slider defaultValue={[30]} max={100} step={1} />`
    },
  },
  {
    slug: 'upload',
    name: 'Upload',
    category: '基础组件',
    description: '图片上传组件，支持多种尺寸，展示预览缩略图和上传触发区域。',
    layers: {
      item: {
        label: 'Item Size',
        classes: ['size-24', 'rounded-lg'],
      },
      trigger: {
        label: 'Trigger',
        classes: ['border', 'border-dashed', 'border-[#d4d4d8]', 'bg-white', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'hover:bg-[#fafafa]', 'transition-colors'],
      },
      preview: {
        label: 'Preview',
        classes: ['overflow-hidden', 'bg-[#f0f0f0]'],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: [],
        enumOptions: [
          { key: 'lg', label: 'LG — 96px', classes: [], sideEffects: { item: ['size-24', 'rounded-lg'] } },
          { key: 'md', label: 'MD — 80px', classes: [], sideEffects: { item: ['size-20', 'rounded-lg'] } },
          { key: 'sm', label: 'SM — 64px', classes: [], sideEffects: { item: ['size-16', 'rounded-md'] } },
        ],
      },
    },
    variants: [
      { label: 'LG', props: { size: 'lg' } },
      { label: 'MD', props: { size: 'md' } },
      { label: 'SM', props: { size: 'sm' } },
    ],
    code: (overrides) => {
      const item = overrides?.item ?? 'size-24 rounded-lg'
      const trigger = overrides?.trigger ?? 'border border-dashed border-[#d4d4d8] bg-white flex items-center justify-center cursor-pointer hover:bg-[#fafafa] transition-colors'
      const preview = overrides?.preview ?? 'overflow-hidden bg-[#f0f0f0]'
      return `{/* Requires: lucide-react */}
<div className="flex items-start gap-2">
  <div className="${item} ${preview}">
    <img src="..." alt="" className="w-full h-full object-cover" />
  </div>
  <div className="${item} ${trigger}">
    <Plus size={24} className="text-[#a1a1aa]" />
  </div>
</div>`
    },
  },
  {
    slug: 'input-group',
    name: 'InputGroup',
    category: '基础组件',
    description: '组合输入组件，将选择器与输入框合并为一个控件，用于带前缀分类的输入。',
    layers: {
      base: {
        label: 'Base',
        classes: ['border', 'border-[#e4e4e7]', 'bg-white', 'transition-all', 'outline-none'],
        editableClasses: [],
      },
      size: {
        label: 'Size',
        variantPropKey: 'size',
        classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'],
        enumOptions: [
          { key: 'lg', label: 'LG', classes: ['py-[7px]', 'px-3', 'text-sm', 'rounded-lg'] },
          { key: 'md', label: 'MD', classes: ['py-[5px]', 'px-2.5', 'text-sm', 'rounded-md'] },
          { key: 'sm', label: 'SM', classes: ['py-[3px]', 'px-2', 'text-xs', 'rounded-md'] },
        ],
      },
      selectWidth: {
        label: 'Select Width',
        classes: ['w-[115px]'],
      },
    },
    variants: [
      { label: 'LG', props: { size: 'lg' } },
      { label: 'MD', props: { size: 'md' } },
      { label: 'SM', props: { size: 'sm' } },
    ],
    code: (overrides) => {
      const base = overrides?.base ?? 'border border-[#e4e4e7] bg-white transition-all outline-none'
      const size = overrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
      const selectWidth = overrides?.selectWidth ?? 'w-[115px]'
      return `{/* Requires: lucide-react */}
<div className="flex items-center w-full">
  <div className="shrink-0 flex items-center justify-between border-r-0 cursor-pointer ${base} ${size} rounded-l-lg ${selectWidth}">
    <span className="text-[#a1a1aa]">请选择</span>
    <ChevronDown size={16} className="text-[#a1a1aa]" />
  </div>
  <input
    type="text"
    placeholder="请输入"
    className="flex-1 min-w-0 text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 ${base} ${size} rounded-r-lg"
  />
</div>`
    },
  },
  {
    slug: 'business-selector',
    name: 'Business Selector',
    category: '业务组件',
    description: '业务方选择浮窗组件，对应个人空间点击后的业务入口选择面板。',
    layers: {
      container: {
        label: 'Container',
        classes: ['rounded-2xl', 'bg-white', 'p-3', 'shadow-[0_4px_14px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.3)]'],
      },
      section: {
        label: 'Section',
        classes: ['rounded-xl', 'p-3'],
      },
      title: {
        label: 'Title',
        classes: ['text-xs', 'leading-4', 'text-[rgba(28,28,35,0.6)]'],
      },
      option: {
        label: 'Option',
        classes: ['w-[136px]', 'rounded-lg', 'border', 'border-[rgba(45,66,107,0.12)]', 'bg-white', 'p-3'],
      },
    },
    variants: [
      { label: 'Default', props: {} },
    ],
    code: (overrides) => {
      const container = overrides?.container ?? 'rounded-2xl bg-white p-3 shadow-[0_4px_14px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.3)]'
      const section = overrides?.section ?? 'rounded-xl p-3'
      const title = overrides?.title ?? 'text-xs leading-4 text-[rgba(28,28,35,0.6)]'
      const option = overrides?.option ?? 'w-[136px] rounded-lg border border-[rgba(45,66,107,0.12)] bg-white p-3'
      return `{/* Requires: lucide-react */}
<div className="inline-flex flex-col items-center justify-center ${container}">
  <div className="flex w-full flex-col ${section}">
    <p className="mb-2 w-full ${title}">我的</p>
    <div className="flex w-[576px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
      <div className="flex items-center gap-2 ${option}">
        <UserRound size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">个人空间</span>
      </div>
    </div>
  </div>
  <div className="flex w-full flex-col ${section}">
    <p className="mb-2 w-full ${title}">平台</p>
    <div className="flex w-[576px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
      <div className="flex items-center gap-2 ${option}">
        <CheckSquare size={14} className="text-[#e72e75]" />
        <span className="text-sm leading-5 text-[#1c1f23]">解决方案</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Telescope size={14} className="text-[#e72e75]" />
        <span className="text-sm leading-5 text-[#1c1f23]">前沿实验室</span>
      </div>
    </div>
  </div>
  <div className="flex w-full flex-col ${section}">
    <p className="mb-2 w-full ${title}">运营</p>
    <div className="flex w-[576px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
      <div className="flex items-center gap-2 ${option}">
        <UsersRound size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">作者运营</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <BadgeDollarSign size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">资金结算</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Archive size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">版权运营</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Type size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">敏感词运营</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <MessageSquareText size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">群聊</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Search size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">抖音搜索</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <MessageCircleHeart size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">垂类运营</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Gamepad2 size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">抖音游戏</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <FileSearch size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">调研中台</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Flashlight size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">热点资讯运营</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Video size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">抖音直播运营</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Clapperboard size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">抖音UGC</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Camera size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">社交互动</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <SquareUser size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">直播用户平台</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Brush size={14} className="text-[#fa8b14]" />
        <span className="text-sm leading-5 text-[#1c1f23]">效果与创作</span>
      </div>
    </div>
  </div>
  <div className="flex w-full flex-col ${section}">
    <p className="mb-2 w-full ${title}">治理</p>
    <div className="flex w-[576px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
      <div className="flex items-center gap-2 ${option}">
        <MonitorPlay size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">视频治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Video size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">直播治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <SquareUser size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">账号治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <MessageSquare size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">IM治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Smartphone size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">小程序治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Image size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">AIGC治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <ShieldCheck size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">版权治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Clapperboard size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">短剧治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Gamepad2 size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">游戏治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <BadgeDollarSign size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">资金安全</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <AlertTriangle size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">ZL治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <MessageSquareWarning size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">评论治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Blocks size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">生态治理</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <MessageSquareText size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">舆情</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Gift size={14} className="text-[#3b82f6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">投稿道具</span>
      </div>
    </div>
  </div>
  <div className="flex w-full flex-col ${section}">
    <p className="mb-2 w-full ${title}">职能</p>
    <div className="flex w-[576px] flex-wrap items-center gap-x-[10px] gap-y-[10px]">
      <div className="flex items-center gap-2 ${option}">
        <Sparkles size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">开放平台</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <PencilLine size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">智能标注</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <Flag size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">数据BP</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <WandSparkles size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">MagicX</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <MessageSquare size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">体验</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <AppWindow size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">产品研发</span>
      </div>
      <div className="flex items-center gap-2 ${option}">
        <BriefcaseBusiness size={14} className="text-[#8b5cf6]" />
        <span className="text-sm leading-5 text-[#1c1f23]">劳动力管理</span>
      </div>
    </div>
  </div>
</div>`
    },
  },
  {
    slug: 'nav',
    name: 'Nav',
    category: '基础组件',
    description: '编辑器左侧导航组件，包含品牌区、AI 创作入口、分组标题和多级导航项。',
    layers: {
      container: {
        label: 'Container',
        classes: ['w-[220px]', 'h-[720px]', 'rounded-[24px]', 'bg-[#f2f2f7]', 'pt-6', 'pb-2'],
      },
      titleRow: {
        label: 'Title Row',
        classes: ['h-8', 'px-4'],
      },
      workspace: {
        label: 'Workspace',
        classes: ['rounded-md', 'px-[6px]', 'py-[2px]'],
      },
      createButton: {
        label: 'Create Button',
        classes: ['rounded-full', 'bg-black', 'px-4', 'py-3', 'text-white'],
      },
      sectionTitle: {
        label: 'Section Title',
        classes: ['px-3', 'py-1.5', 'text-xs', 'leading-4', 'text-[rgba(28,31,35,0.6)]'],
      },
      activeItem: {
        label: 'Active Item',
        classes: ['rounded-full', 'px-3', 'py-1', 'text-[#1c1f23]', 'bg-[#53608f12]'],
      },
      item: {
        label: 'Item',
        classes: ['rounded-full', 'px-3', 'py-1', 'text-[#1c1f23]'],
      },
      subItem: {
        label: 'Sub Item',
        classes: ['rounded-full', 'px-3', 'py-1', 'text-[#1c1f23]'],
      },
    },
    variants: [
      { label: 'Default', props: {} },
    ],
    code: (overrides) => {
      const container = overrides?.container ?? 'w-[220px] h-[720px] rounded-[24px] bg-[#f2f2f7] pt-6 pb-2'
      const titleRow = overrides?.titleRow ?? 'h-8 px-4'
      const workspace = overrides?.workspace ?? 'rounded-md px-[6px] py-[2px] text-[#71717a] hover:bg-[rgba(83,96,143,0.07)]'
      const createButton = overrides?.createButton ?? 'rounded-full bg-black px-4 py-3 text-white'
      const sectionTitle = overrides?.sectionTitle ?? 'px-3 py-1.5 text-xs leading-4 text-[rgba(28,31,35,0.6)]'
      const activeItem = overrides?.activeItem ?? 'rounded-full px-3 py-1 text-[#1c1f23] bg-[#53608f12]'
      const item = overrides?.item ?? 'rounded-full px-3 py-1 text-[#1c1f23]'
      const subItem = overrides?.subItem ?? 'rounded-full px-3 py-1 text-[#1c1f23]'
      return `{/* Requires: lucide-react, @radix-ui/react-popover */}
const [selectedBusiness, setSelectedBusiness] = useState('个人空间')
const [selectorOpen, setSelectorOpen] = useState(false)

<aside className="flex flex-col justify-between overflow-hidden ${container}">
  <div className="flex flex-1 flex-col gap-6">
    <div className="flex items-center ${titleRow}">
      <div className="text-sm font-semibold leading-5 text-[#1c1f23]">Trae AI</div>
      <div className="ml-2 mr-1 h-3 w-px shrink-0 bg-[#c6cacd]" />
      <Popover open={selectorOpen} onOpenChange={setSelectorOpen}>
        <PopoverTrigger asChild>
          <button className="cursor-pointer transition-all active:scale-95 inline-flex flex-row-reverse items-center justify-center whitespace-nowrap font-medium h-6 gap-1 text-xs rounded-lg px-2 ${workspace}">
            <ChevronDown size={12} />
            {selectedBusiness}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" side="bottom" sideOffset={10} className="w-auto border-none bg-transparent p-0 shadow-none">
          <BusinessSelector
            selectedLabel={selectedBusiness}
            onSelect={(label) => {
              setSelectedBusiness(label)
              setSelectorOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
    <div className="px-3">
      <button className="flex w-full items-center gap-2 ${createButton}">
        <Plus size={18} />
        <span className="text-sm font-medium leading-[22px]">AI创作</span>
      </button>
    </div>
    <div className="flex flex-col gap-3 px-3">
      <div>
        <div className="${sectionTitle}">管理</div>
        <div className="mt-1 flex flex-col gap-2">
          <div className="flex items-center gap-[6px] ${activeItem}"><BookOpen size={16} />Skills</div>
          <div className="flex items-center justify-between ${item}">
            <div className="flex items-center gap-[6px]"><Inbox size={16} />资源库</div>
            <ChevronUp size={12} />
          </div>
          <div className="flex items-center gap-[6px] ${subItem}">模型库</div>
          <div className="flex items-center gap-[6px] ${subItem}">工具箱</div>
          <div className="flex items-center gap-[6px] ${subItem}">知识库</div>
          <div className="flex items-center gap-[6px] ${activeItem}"><Boxes size={16} />发布器</div>
          <div className="flex items-center gap-[6px] ${item}"><ClipboardCheck size={16} />评估器</div>
        </div>
      </div>
    </div>
  </div>
</aside>`
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
