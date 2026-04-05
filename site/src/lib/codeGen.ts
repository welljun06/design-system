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
    return `<button className="${base} ${variant} ${size} ${radius} ${padding}">
  <svg width="${iconPx}" height="${iconPx}" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
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
    const base = classOverrides?.base ?? 'w-full border border-[#e4e4e7] bg-white text-[#1c1f23] placeholder:text-[#a1a1aa] outline-none focus:border-[#a1a1aa] focus:ring-2 focus:ring-[#a1a1aa]/20 transition-all'
    const size = classOverrides?.size ?? 'px-3 py-2 text-sm rounded-lg'
    return `<input
  type="text"
  placeholder="请输入内容..."
  className="${base} ${size}"
/>`
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
