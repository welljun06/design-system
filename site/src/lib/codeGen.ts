// Client-safe code generation (no server functions)
// Mirrors the `code` function in each registry entry, usable in client components.

export function generateCode(slug: string, classOverrides?: Record<string, string>): string {
  if (slug === 'button') {
    const base = classOverrides?.base ?? 'cursor-pointer transition-all active:scale-95 flex items-center justify-center font-medium'
    const variant = classOverrides?.variant ?? 'bg-[linear-gradient(180deg,#323232_0%,#222222_100%)] text-white hover:opacity-90'
    const size = classOverrides?.size ?? 'h-9 gap-2 text-sm'
    const radius = classOverrides?.radius ?? 'rounded-lg'
    const padding = classOverrides?.padding ?? 'px-4'
    const iconSizeCls = classOverrides?.iconSize ?? 'size-3.5'
    const iconPxMatch = iconSizeCls.match(/^size-(.+)$/)
    const iconPx = iconPxMatch ? parseFloat(iconPxMatch[1]) * 4 : 14
    return `{/* Requires: lucide-react */}
<button className="${base} ${variant} ${size} ${radius} ${padding}">
  <ArrowDown size={${iconPx}} />
  Button
</button>`
  }

if (slug === 'status-badge') {
    const base = classOverrides?.base ?? 'rounded-md px-2 py-0.5 text-xs font-medium'
    const status = classOverrides?.status ?? 'bg-green-100 text-green-700'
    return `<span className="${base} ${status}">
  已发布
</span>`
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
