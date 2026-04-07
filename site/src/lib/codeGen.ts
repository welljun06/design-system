// Client-safe code generation (no server functions)
// Mirrors the `code` function in each registry entry, usable in client components.

export function generateCode(slug: string, classOverrides?: Record<string, string>, props?: Record<string, string>): string {
  if (slug === 'button') {
    const base = classOverrides?.base ?? 'cursor-pointer transition-all active:scale-95 flex items-center justify-center font-medium'
    const variant = classOverrides?.variant ?? 'bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90'
    const size = classOverrides?.size ?? 'h-9 gap-2 text-sm'
    const radius = classOverrides?.radius ?? 'rounded-lg'
    const padding = classOverrides?.padding ?? 'px-3'
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
    const size = classOverrides?.size ?? 'py-[7px] px-3 text-sm rounded-lg'
    return `{/* Requires: @radix-ui/react-select */}
<Select.Root>
  <Select.Trigger className="${base} ${size} flex items-center justify-between">
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
    const box = classOverrides?.box ?? 'h-4 w-4'
    const label = classOverrides?.label ?? 'text-sm text-[#1c1f23]'
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
    const track = classOverrides?.track ?? 'h-5 w-9'
    const thumb = classOverrides?.thumb ?? 'h-4 w-4'
    return `{/* Requires: @radix-ui/react-switch */}
<Switch
  defaultChecked
  className="${track} data-[state=checked]:bg-[#1c1f23] data-[state=unchecked]:bg-[rgba(83,96,143,0.07)]"
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
        <span className="text-sm font-medium leading-none">选择框标题</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox />
        <span className="text-sm font-medium leading-none">选择框标题</span>
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
      <Switch defaultChecked />
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
