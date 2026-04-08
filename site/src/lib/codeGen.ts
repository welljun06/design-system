// Client-safe code generation (no server functions)
// Mirrors the `code` function in each registry entry, usable in client components.

export function generateCode(slug: string, classOverrides?: Record<string, string>, props?: Record<string, string>): string {
  if (slug === 'button') {
    const base = classOverrides?.base ?? 'cursor-pointer transition-all active:scale-95 flex items-center justify-center font-medium'
    const variant = classOverrides?.variant ?? 'bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90'
    const size = classOverrides?.size ?? 'h-9 gap-2 text-sm'
    const radius = classOverrides?.radius ?? 'rounded-lg'
    const sizeProp = props?.size ?? 'lg'
    const radiusProp = props?.radius ?? 'rounded'
    const padding = classOverrides?.padding
      ?? (radiusProp === 'full'
        ? (sizeProp === 'sm' ? 'px-2' : 'px-4')
        : (sizeProp === 'sm' ? 'px-1' : 'px-3'))
    const iconSizeCls = classOverrides?.iconSize ?? 'size-4'
    const iconPxMatch = iconSizeCls.match(/^size-(.+)$/)
    const iconPx = iconPxMatch ? parseFloat(iconPxMatch[1]) * 4 : 16
    const iconName = props?.icon ?? 'arrow-down'
    // Convert kebab-case to PascalCase for Lucide component name
    const iconComponent = iconName === 'none' ? '' : iconName.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
    const iconLine = iconName === 'none' ? '' : `\n  <${iconComponent} size={${iconPx}} />`
    return `{/* Requires: lucide-react */}
<button className="${base} ${variant} ${size} ${radius} ${padding}">${iconLine}
  Button
</button>`
  }

  if (slug === 'input') {
    const base = classOverrides?.base ?? 'w-full border outline-none transition-all'
    const variant = classOverrides?.variant ?? 'border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20'
    const size = classOverrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
    return `<input
  type="text"
  placeholder="请输入内容..."
  className="${base} ${variant} ${size}"
/>`
  }

  if (slug === 'select') {
    const base = classOverrides?.base ?? 'border border-[#e4e4e7] bg-white text-[#1c1f23] outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 transition-all cursor-pointer'
    const size = classOverrides?.size ?? 'py-[7px] text-sm'
    const shape = classOverrides?.shape || (props?.shape === 'full' ? 'px-4 rounded-full' : 'px-3 rounded-lg')
    return `{/* Requires: @radix-ui/react-select */}
<Select.Root>
  <Select.Trigger className="${base} ${size} ${shape} flex items-center justify-between">
    <Select.Value placeholder="请选择..." />
    <Select.Icon>
      <ChevronDown size={14} color="#a1a1aa" />
    </Select.Icon>
  </Select.Trigger>
  <Select.Portal>
    <Select.Content className="bg-white rounded-lg border border-[#e4e4e7] shadow-lg p-1">
      <Select.Viewport>
        <Select.Item value="1" className="px-2.5 py-1.5 text-sm rounded-md cursor-pointer data-[highlighted]:bg-[#f4f4f5]">
          <Select.ItemText>选项一</Select.ItemText>
        </Select.Item>
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>`
  }

  if (slug === 'tabs') {
    return `{/* Glass variant example */}
<div className="inline-flex items-center rounded-full border border-white/60 bg-white/50 backdrop-blur-sm shadow-[inset_1px_1px_4px_2px_rgba(0,0,0,0.03)] h-9 p-1 gap-0.5">
  <button className="px-4 py-0.5 text-sm rounded-full bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.05)] text-[#1c1f23] font-semibold">
    标签一
  </button>
  <button className="px-4 py-0.5 text-sm rounded-full text-[#1c1f23]/60">
    标签二
  </button>
</div>`
  }

  if (slug === 'tag') {
    const base = classOverrides?.base ?? 'inline-flex items-center font-semibold'
    const color = classOverrides?.color ?? 'bg-[#f4f4f5] text-[#1c1f23]'
    const size = classOverrides?.size ?? 'gap-1.5 px-1.5 py-[2px] text-xs'
    const shape = classOverrides?.shape ?? 'rounded-md'
    return `<span className="${base} ${color} ${size} ${shape}">
  标签
</span>`
  }

  if (slug === 'form') {
    const layout = props?.layout ?? 'top'
    const fieldType = props?.fieldType ?? 'input'
    const label = classOverrides?.label ?? 'text-sm font-semibold text-[rgba(28,31,35,0.8)] leading-5'
    const field = classOverrides?.field ?? 'w-full bg-white border border-[rgba(45,66,107,0.12)] rounded-lg px-3 py-2'
    return generateFormCode(layout, fieldType, label, field)
  }

  if (slug === 'textarea') {
    const base = classOverrides?.base ?? 'w-full border outline-none transition-all resize-y min-h-[92px]'
    const variant = classOverrides?.variant ?? 'border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20'
    const size = classOverrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
    return `<textarea
  placeholder="请输入内容..."
  className="${base} ${variant} ${size}"
/>`
  }

  if (slug === 'checkbox') {
    const box = classOverrides?.box ?? 'h-4 w-4 rounded-[3px]'
    const label = classOverrides?.label ?? 'text-sm leading-5 font-normal text-[#1c1f23] select-none'
    const cardTitle = classOverrides?.cardTitle ?? 'text-sm leading-5 font-semibold text-[#1c1f23] select-none'
    const description = classOverrides?.description ?? 'text-sm leading-5 text-[rgba(28,31,35,0.6)] select-none'
    const variant = props?.variant ?? 'default'
    if (variant === 'card') {
      return `{/* Requires: @radix-ui/react-checkbox, @radix-ui/react-label, lucide-react */}
<div className="flex flex-col gap-2 py-1">
  <label className="flex items-start gap-2 rounded-[8px] border border-[rgba(45,66,107,0.12)] bg-[#f5f7fa] px-[17px] py-[13px]">
    <Checkbox id="cb1" defaultChecked className="${box}" />
    <div className="flex flex-col gap-1">
      <span className="cursor-pointer ${cardTitle}">选择框标题</span>
      <span className="${description}">这里可以写选项的描述文案</span>
    </div>
  </label>
  <label className="flex items-start gap-2 rounded-[8px] border border-[rgba(45,66,107,0.12)] bg-white px-[17px] py-[13px]">
    <Checkbox id="cb2" className="${box}" />
    <div className="flex flex-col gap-1">
      <span className="cursor-pointer ${cardTitle}">选择框标题</span>
      <span className="${description}">这里可以写选项的描述文案</span>
    </div>
  </label>
</div>`
    }
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
  }

  if (slug === 'radio-group') {
    const radio = classOverrides?.radio ?? 'h-4 w-4'
    const label = classOverrides?.label ?? 'text-sm text-[#1c1f23]'
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
  }

  if (slug === 'switch') {
    const track = classOverrides?.track
      ?? 'h-5 w-10 rounded-[12px] p-[2px] border border-transparent data-[state=checked]:bg-[#0275f4] hover:data-[state=checked]:bg-[#175cd3] data-[state=unchecked]:bg-[rgba(83,96,143,0.12)] disabled:data-[state=checked]:bg-[#84caff] disabled:data-[state=unchecked]:bg-[rgba(83,96,143,0.15)] disabled:data-[state=unchecked]:border-[rgba(45,66,107,0.12)]'
    const thumb = classOverrides?.thumb
      ?? 'h-4 w-[22px] rounded-[9px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.1)] data-[state=checked]:translate-x-[13px]'
    return `{/* Requires: @radix-ui/react-switch */}
<Switch
  defaultChecked
  className="${track}"
  thumbClassName="${thumb}"
/>`
  }

  if (slug === 'slider') {
    return `{/* Requires: @radix-ui/react-slider */}
<Slider defaultValue={[30]} max={100} step={1} />`
  }


  if (slug === 'upload') {
    const item = classOverrides?.item ?? 'size-24 rounded-lg'
    const trigger = classOverrides?.trigger ?? 'border border-dashed border-[#d4d4d8] bg-white flex items-center justify-center cursor-pointer hover:bg-[#fafafa] transition-colors'
    const preview = classOverrides?.preview ?? 'overflow-hidden bg-[#f0f0f0]'
    return `{/* Requires: lucide-react */}
<div className="flex items-start gap-2">
  <div className="${item} ${preview}">
    <img src="..." alt="" className="w-full h-full object-cover" />
  </div>
  <div className="${item} ${trigger}">
    <Plus size={24} className="text-[#a1a1aa]" />
  </div>
</div>`
  }

  if (slug === 'input-group') {
    const base = classOverrides?.base ?? 'border border-[#e4e4e7] bg-white transition-all outline-none'
    const size = classOverrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
    const selectWidth = classOverrides?.selectWidth ?? 'w-[115px]'
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
  }

  if (slug === 'card') {
    const base = classOverrides?.base ?? 'rounded-xl p-5'
    const variant = classOverrides?.variant ?? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] border border-[#e4e4e7]'
    return `<div className="${base} ${variant}">
  <h3 className="text-sm font-semibold text-[#1c1f23]">Card Title</h3>
  <p className="mt-1 text-sm text-[#71717a]">Card content goes here.</p>
</div>`
  }

  if (slug === 'resource-card') {
    const container = classOverrides?.container ?? 'overflow-hidden rounded-2xl border border-[#f2f2f7] bg-white'
    const cover = classOverrides?.cover ?? 'relative aspect-[316/136] overflow-hidden'
    const badge = classOverrides?.badge ?? 'absolute left-1/2 top-1/2 flex h-14 min-w-[112px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[20px] border border-[rgba(45,66,107,0.12)] bg-white px-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
    const title = classOverrides?.title ?? 'text-base font-semibold leading-[22px] text-[#1c1c23]'
    const meta = classOverrides?.meta ?? 'text-xs leading-4 text-[rgba(34,39,39,0.6)]'
    const description = classOverrides?.description ?? 'text-xs leading-4 text-[rgba(34,39,39,0.6)]'
    return `{/* Requires: lucide-react */}
<article className="${container}">
  <div className="${cover}">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#89d6ff_0%,#62bbff_20%,#3a93ff_58%,#1f81ff_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(234.734deg,rgba(31,129,255,0)_0%,#1f81ff_99.071%)]" />
    <div className="${badge}">
      <span className="text-[22px] leading-none">🔍</span>
    </div>
  </div>
  <div className="flex flex-col gap-2 px-4 pb-4 pt-3">
    <div className="flex items-center justify-between gap-3">
      <h3 className="${title} truncate">视频评论智能总结</h3>
      <div className="${meta} flex shrink-0 items-center gap-1">
        <Bot size={12} />
        <span>86</span>
      </div>
    </div>
    <p className="${description} line-clamp-1">快速提炼评论区观点、情绪和热点，适合复盘、选题和运营洞察。</p>
  </div>
</article>`
  }

  if (slug === 'agent-card') {
    const container = classOverrides?.container ?? 'w-[404px] max-w-full overflow-hidden rounded-[20px] border border-[rgba(45,66,107,0.12)] bg-white'
    const inner = classOverrides?.inner ?? 'flex flex-col gap-3 p-5'
    const cover = classOverrides?.cover ?? 'relative size-16 shrink-0 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_20%_20%,#9ce8ff_0%,#55b6ff_30%,#3d67ff_65%,#1f2147_100%)]'
    const title = classOverrides?.title ?? 'text-base font-semibold leading-[22px] text-[#222727]'
    const description = classOverrides?.description ?? 'text-xs leading-4 text-[rgba(34,39,39,0.6)]'
    const author = classOverrides?.author ?? 'text-xs leading-[18px] text-[rgba(34,39,39,0.6)]'
    const meta = classOverrides?.meta ?? 'text-xs leading-4 text-[rgba(34,39,39,0.6)]'
    const kind = props?.kind === 'workflow' ? 'workflow' : 'agent'
    const tagIcon = kind === 'workflow'
      ? '<GitBranch className="size-3" strokeWidth={2} />'
      : '<Bot className="size-3" strokeWidth={2} />'
    if (props?.variant === 'featured') {
      const featuredContainer = 'w-[313px] max-w-full overflow-hidden rounded-[24px] bg-[#7da489] p-1'
      const featuredInner = 'relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[20px] p-4'
      const featuredTitle = 'text-base font-medium leading-[18px] text-white'
      const featuredDescription = 'text-xs leading-[18px] text-white'
      const featuredAuthor = 'text-xs leading-[18px] text-white'
      const featuredMeta = 'text-xs leading-[18px] text-white'
      return `{/* Requires: lucide-react */}
<article className="${featuredContainer}">
  <div className="${featuredInner}">
    <img src="/figma/agent-card-featured-bg.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover" />
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(187.283deg, rgb(125, 164, 137) 2.0293%, rgba(125, 164, 137, 0) 22.153%, rgba(125, 164, 137, 0) 55.482%, rgb(125, 164, 137) 72.23%)',
      }}
    />
    <div className="relative z-[1] flex h-[90px] flex-col justify-end gap-2">
      <h3 className="${featuredTitle}">抖音账号小助手</h3>
      <p className="${featuredDescription} line-clamp-2 h-9">服务于抖音官方 B 号，能够为 C 端用户解答抖音账号相关疑问，提供查询抖音账号相关数据的服务，实现用户与官方直接对话。</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8b6b57_0%,#d7dce1_46%,#93a8b2_100%)] text-[10px] font-semibold leading-none text-white">S</div>
          <span className="${featuredAuthor}">SSSHY99</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="${featuredMeta} flex items-center gap-1">
            <Eye size={12} />
            <span>286k</span>
          </div>
          <span className="h-[10px] w-px bg-white/12" />
          <div className="${featuredMeta} flex items-center gap-1">
            <Sparkles size={12} />
            <span>86</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`
    }
    if (props?.variant === 'list') {
      const listInner = classOverrides?.inner ?? 'flex flex-col gap-3 px-5 pb-4 pt-5'
      return `{/* Requires: lucide-react, Tag */}
<article className="${container}">
  <div className="${listInner}">
    <div className="flex items-start gap-3">
      <div className="${cover}">
        <img
          src="/figma/agent-card-avatar-placeholder.svg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex min-w-0 items-center gap-1">
          <h3 className="${title} min-w-0 max-w-full truncate">爆款短视频灵感助手</h3>
          <Tag color="green" type="light" size="md" shape="square">已发布</Tag>
          <Tag color="white" type="ghost" size="md" shape="square">
            ${tagIcon}
          </Tag>
        </div>
        <p className="${description} truncate">围绕选题、脚本和封面方向提供成体系的短视频创作灵感支持。</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#ff9968_0%,#ff5d5d_100%)] text-[10px] font-semibold leading-none text-white">S</div>
      <span className="${author}">SSSHY99 ｜更新于 2022-09-21 00:00</span>
    </div>
    <div className="h-px w-full bg-[rgba(45,66,107,0.12)]" />
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="flex size-6 items-center justify-center rounded-xl bg-black text-[11px] font-semibold leading-none text-white">抖</div>
        <div className="flex size-6 items-center justify-center rounded-xl bg-[#f2f4f7] text-[11px] font-semibold leading-none text-[#4b5563]">剪</div>
      </div>
      <div className="flex items-center gap-1">
        <button type="button" className="inline-flex h-6 items-center justify-center gap-1 rounded-lg px-2 text-xs font-semibold leading-4 text-[rgba(34,39,39,0.8)] transition-colors hover:bg-[#f5f7fa]">
          <Paintbrush size={16} />
          <span>做同款</span>
        </button>
        <button type="button" className="inline-flex size-6 items-center justify-center rounded-lg text-[rgba(34,39,39,0.8)] transition-colors hover:bg-[#f5f7fa]">
          <Star size={16} />
        </button>
        <button type="button" className="inline-flex size-6 items-center justify-center rounded-lg text-[rgba(34,39,39,0.8)] transition-colors hover:bg-[#f5f7fa]">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  </div>
</article>`
    }
    return `{/* Requires: lucide-react, Tag */}
<article className="${container}">
  <div className="${inner}">
    <div className="flex items-start gap-3">
      <div className="${cover}">
        <img
          src="/figma/agent-card-avatar-placeholder.svg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="min-w-0 flex items-center gap-1">
          <h3 className="${title} min-w-0 max-w-full truncate">爆款短视频灵感助手</h3>
            <Tag
              color="white"
              type="ghost"
              size="md"
              shape="square"
            >
              ${tagIcon}
            </Tag>
        </div>
        <p className="${description} mt-1 truncate">从 0 到 1 打造爆款短视频，创意灵感源源不断，源源不断</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex size-5 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff9968_0%,#ff5d5d_100%)] text-[10px] font-semibold leading-none text-white">S</div>
        <span className="${author}">SSSHY99</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="${meta} flex items-center gap-1">
          <Eye size={12} />
          <span>233</span>
        </div>
        <span className="h-[10px] w-px bg-[rgba(45,66,107,0.12)]" />
        <div className="${meta} flex items-center gap-1">
          <Star size={12} />
          <span>3</span>
        </div>
      </div>
    </div>
  </div>
</article>`
  }

  if (slug === 'nav') {
    const container = classOverrides?.container ?? 'w-[220px] h-[720px] rounded-[24px] bg-[#f2f2f7] pt-6 pb-2'
    const titleRow = classOverrides?.titleRow ?? 'h-8 px-4'
    const workspace = classOverrides?.workspace ?? 'rounded-md px-[6px] py-[2px] text-[#1c1f23] hover:bg-transparent'
    const createButton = classOverrides?.createButton ?? 'rounded-full bg-black px-4 py-3 text-white'
    const sectionTitle = classOverrides?.sectionTitle ?? 'px-4 py-1.5 text-xs leading-4 text-[rgba(28,31,35,0.6)]'
    const activeItem = classOverrides?.activeItem ?? 'rounded-full px-4 py-1 text-[#1c1f23] bg-[#53608f12]'
    const item = classOverrides?.item ?? 'rounded-full px-4 py-1 text-[#1c1f23]'
    const subItem = classOverrides?.subItem ?? 'rounded-full px-4 pl-9 py-1 text-[#1c1f23]'
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
      <div className="rounded-full glow-button">
        <button className="flex w-full items-center gap-2 rounded-full glow-button ${createButton}">
          <Plus size={18} />
          <span className="text-sm font-medium leading-[22px]">AI创作</span>
        </button>
      </div>
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
  <style jsx>{\`
    @property --nav-glow-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    @keyframes navGlowRotation {
      0% { --nav-glow-angle: 0deg; }
      100% { --nav-glow-angle: 360deg; }
    }

    .glow-button {
      position: relative;
      isolation: isolate;
      overflow: visible;
    }

    .glow-button::after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      background: conic-gradient(from var(--nav-glow-angle), #7cf6fe, #fff20d, #f66f11, #fff20d, #7cf6fe);
      opacity: 0;
      transition: opacity 0.3s ease;
      animation: navGlowRotation 2s linear infinite paused;
      pointer-events: none;
      filter: blur(8px);
      z-index: -1;
    }

    .glow-button:hover::after {
      opacity: 1;
      animation-play-state: running;
    }
  \`}</style>
</aside>`
  }

  if (slug === 'business-selector') {
    const container = classOverrides?.container ?? 'rounded-2xl bg-white p-3 shadow-[0_4px_14px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.3)]'
    const section = classOverrides?.section ?? 'rounded-xl p-3'
    const title = classOverrides?.title ?? 'text-xs leading-4 text-[rgba(28,28,35,0.6)]'
    const option = classOverrides?.option ?? 'w-[136px] rounded-lg border border-[rgba(45,66,107,0.12)] bg-white p-3'
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
  }

  return '// Unknown component'
}

// ─── Form: full-markup code generation ───────────────────────────────────────

const formFieldCode: Record<string, string> = {
  input: `<input
      type="text"
      placeholder="请输入"
      className="w-full border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 outline-none transition-all py-[7px] px-3 text-sm rounded-lg"
    />`,

  textarea: `<textarea
      placeholder="请输入"
      className="w-full min-h-[92px] resize-y border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 outline-none transition-all py-[7px] px-3 text-sm rounded-lg"
    />`,

  select: `{/* Requires: @radix-ui/react-select, lucide-react */}
    <Select.Root>
      <Select.Trigger className="w-full flex items-center justify-between border border-[#e4e4e7] bg-white text-[#1c1f23] outline-none transition-all cursor-pointer py-[7px] px-3 text-sm rounded-lg">
        <Select.Value placeholder="请选择..." />
        <ChevronDown size={14} color="#a1a1aa" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white rounded-lg border border-[#e4e4e7] shadow-lg p-1">
          <Select.Viewport>
            <Select.Item value="1" className="px-2.5 py-1.5 text-sm rounded-md cursor-pointer data-[highlighted]:bg-[#f4f4f5]">
              <Select.ItemText>选项一</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>`,

  checkbox: `{/* Requires: @radix-ui/react-checkbox, lucide-react */}
    <div className="flex items-center gap-4 py-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox defaultChecked />
        <span className="text-sm leading-5">选择框标题</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox />
        <span className="text-sm leading-5">选择框标题</span>
      </label>
    </div>`,

  radio: `{/* Requires: @radix-ui/react-radio-group */}
    <RadioGroup defaultValue="a" className="flex items-center gap-4 py-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="a" />
        <span className="text-sm font-medium leading-none">单选框标题</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <RadioGroupItem value="b" />
        <span className="text-sm font-medium leading-none">单选框标题</span>
      </label>
    </RadioGroup>`,

  switch: `{/* Requires: @radix-ui/react-switch */}
    <div className="py-1">
      <Switch defaultChecked size="md" />
    </div>`,


  slider: `{/* Requires: @radix-ui/react-slider */}
    <div className="py-2">
      <Slider defaultValue={[30]} max={100} step={1} />
    </div>`,

  upload: `{/* Requires: lucide-react */}
    <div className="flex items-start gap-2 pb-2">
      <div className="size-24 rounded-lg overflow-hidden bg-[#f0f0f0]">
        <img src="..." alt="" className="w-full h-full object-cover" />
      </div>
      <div className="size-24 rounded-lg border border-dashed border-[#d4d4d8] bg-white flex items-center justify-center cursor-pointer hover:bg-[#fafafa] transition-colors">
        <Plus size={24} className="text-[#a1a1aa]" />
      </div>
    </div>`,

  inputgroup: `{/* Requires: lucide-react */}
    <div className="flex items-center w-full">
      <div className="w-[115px] shrink-0 flex items-center justify-between border border-[#e4e4e7] bg-white rounded-l-lg px-3 py-[7px] border-r-0">
        <span className="text-sm text-[#a1a1aa]">请选择</span>
        <ChevronDown size={16} className="text-[#a1a1aa]" />
      </div>
      <input
        type="text"
        placeholder="请输入"
        className="flex-1 border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 outline-none transition-all py-[7px] px-3 text-sm rounded-r-lg"
      />
    </div>`,

  taginput: `<input
      type="text"
      placeholder="请输入"
      className="w-full border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 outline-none transition-all py-[7px] px-3 text-sm rounded-lg"
    />`,
}

function generateFormCode(layout: string, fieldType: string, label: string, field: string) {
  // For field types that use the field class wrapper (datepicker, timepicker), replace classes if overridden
  let fieldContent = formFieldCode[fieldType] ?? formFieldCode.input

  const isTop = layout === 'top'

  if (isTop) {
    return `<div className="flex flex-col gap-1 w-[300px]">
  <span className="${label}">字段标题</span>
  <div className="flex flex-col gap-1">
    ${fieldContent.split('\n').map(l => l.trim() ? l : l).join('\n    ')}
  </div>
</div>`
  }

  return `<div className="flex items-start w-[500px]">
  <div className="shrink-0 w-[120px] pr-4 py-2">
    <span className="${label}">字段标题</span>
  </div>
  <div className="flex-1 flex flex-col gap-1">
    ${fieldContent.split('\n').map(l => l.trim() ? l : l).join('\n    ')}
  </div>
</div>`
}
