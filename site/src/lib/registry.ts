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
  <ArrowDown size={14} />
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
        editableClasses: ['rounded-md', 'px-2', 'py-0.5', 'text-xs', 'font-medium'],
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
