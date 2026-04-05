// Maps a Tailwind class to a human-readable property name (Figma-style)

const STATE_PREFIXES: Record<string, string> = {
  'hover': 'Hover',
  'focus': 'Focus',
  'active': 'Active',
  'dark': 'Dark',
  'disabled': 'Disabled',
  'placeholder': 'Placeholder',
  'group-hover': 'Group Hover',
  'focus-visible': 'Focus Visible',
}

function stripStatePrefix(cls: string): { base: string; stateLabel: string } {
  for (const [prefix, label] of Object.entries(STATE_PREFIXES)) {
    if (cls.startsWith(prefix + ':')) {
      return { base: cls.slice(prefix.length + 1), stateLabel: label + ' ' }
    }
  }
  return { base: cls, stateLabel: '' }
}

function basePropertyName(base: string): string {
  // Display
  if (['flex', 'grid', 'block', 'inline', 'inline-flex', 'inline-block', 'hidden', 'contents'].includes(base)) return 'Display'

  // Spacing
  if (base.startsWith('px-')) return 'Padding X'
  if (base.startsWith('py-')) return 'Padding Y'
  if (base.startsWith('pt-')) return 'Padding Top'
  if (base.startsWith('pb-')) return 'Padding Bottom'
  if (base.startsWith('pl-')) return 'Padding Left'
  if (base.startsWith('pr-')) return 'Padding Right'
  if (base === 'p-' || /^p-/.test(base) && base.length > 2) return 'Padding'
  if (base.startsWith('mx-')) return 'Margin X'
  if (base.startsWith('my-')) return 'Margin Y'
  if (base.startsWith('mt-')) return 'Margin Top'
  if (base.startsWith('mb-')) return 'Margin Bottom'
  if (base.startsWith('ml-')) return 'Margin Left'
  if (base.startsWith('mr-')) return 'Margin Right'
  if (/^m-/.test(base) && base.length > 2) return 'Margin'
  if (base.startsWith('gap-')) return 'Gap'
  if (base.startsWith('space-x-')) return 'Space X'
  if (base.startsWith('space-y-')) return 'Space Y'

  // Sizing
  if (base.startsWith('w-')) return 'Width'
  if (base.startsWith('h-')) return 'Height'
  if (base.startsWith('min-w-')) return 'Min Width'
  if (base.startsWith('min-h-')) return 'Min Height'
  if (base.startsWith('max-w-')) return 'Max Width'
  if (base.startsWith('max-h-')) return 'Max Height'
  if (base.startsWith('size-')) return 'Icon Size'

  // Border
  if (base === 'border') return 'Border'
  if (base.startsWith('border-') ) {
    const val = base.slice('border-'.length)
    if (/^\d+$/.test(val)) return 'Border Width'
    return 'Border Color'
  }
  if (base === 'rounded' || base.startsWith('rounded-')) return 'Border Radius'
  if (base.startsWith('ring-') || base === 'ring') return 'Ring'
  if (base.startsWith('outline')) return 'Outline'
  if (base.startsWith('divide-')) return 'Divide'

  // Background
  if (base.startsWith('bg-')) return 'Background'

  // Typography
  if (base.startsWith('text-')) {
    const val = base.slice('text-'.length)
    const sizeTokens = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
    if (sizeTokens.includes(val)) return 'Font Size'
    if (val.startsWith('[') && (val.includes('px') || val.includes('rem') || val.includes('em'))) return 'Font Size'
    return 'Text Color'
  }
  if (base.startsWith('font-')) {
    const weightTokens = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
    if (weightTokens.includes(base.slice('font-'.length))) return 'Font Weight'
    return 'Font Family'
  }
  if (base.startsWith('leading-')) return 'Line Height'
  if (base.startsWith('tracking-')) return 'Letter Spacing'
  if (base.startsWith('truncate') || base.startsWith('line-clamp') || base.startsWith('whitespace') || base.startsWith('break')) return 'Text Overflow'
  if (base.startsWith('uppercase') || base.startsWith('lowercase') || base.startsWith('capitalize') || base.startsWith('normal-case')) return 'Text Transform'
  if (base.startsWith('underline') || base.startsWith('no-underline') || base.startsWith('line-through')) return 'Text Decoration'
  if (base.startsWith('antialiased') || base.startsWith('subpixel-antialiased')) return 'Font Smoothing'
  if (base.startsWith('italic') || base.startsWith('not-italic')) return 'Font Style'

  // Shadow
  if (base.startsWith('shadow')) return 'Shadow'

  // Opacity / Visibility
  if (base.startsWith('opacity-')) return 'Opacity'
  if (base === 'visible' || base === 'invisible') return 'Visibility'

  // Flex / Grid layout
  if (['items-start', 'items-center', 'items-end', 'items-baseline', 'items-stretch'].includes(base)) return 'Align Items'
  if (base.startsWith('justify-')) return 'Justify'
  if (base.startsWith('self-')) return 'Align Self'
  if (base.startsWith('flex-')) return 'Flex'
  if (base === 'shrink' || base.startsWith('shrink-')) return 'Flex Shrink'
  if (base === 'grow' || base.startsWith('grow-')) return 'Flex Grow'
  if (base.startsWith('grid-cols-')) return 'Grid Columns'
  if (base.startsWith('grid-rows-')) return 'Grid Rows'
  if (base.startsWith('col-')) return 'Grid Col Span'
  if (base.startsWith('place-')) return 'Place'

  // Position
  if (['static', 'relative', 'absolute', 'fixed', 'sticky'].includes(base)) return 'Position'
  if (base.startsWith('top-')) return 'Top'
  if (base.startsWith('bottom-')) return 'Bottom'
  if (base.startsWith('left-')) return 'Left'
  if (base.startsWith('right-')) return 'Right'
  if (base.startsWith('inset-')) return 'Inset'
  if (base.startsWith('z-')) return 'Z Index'

  // Transform / Transition / Animation
  if (base.startsWith('scale-')) return 'Scale'
  if (base.startsWith('translate-')) return 'Translate'
  if (base.startsWith('rotate-')) return 'Rotate'
  if (base === 'transition' || base.startsWith('transition-')) return 'Transition'
  if (base.startsWith('duration-')) return 'Duration'
  if (base.startsWith('ease-')) return 'Easing'
  if (base.startsWith('delay-')) return 'Delay'
  if (base.startsWith('animate-')) return 'Animation'

  // Interaction
  if (base.startsWith('cursor-')) return 'Cursor'
  if (base.startsWith('pointer-events-')) return 'Pointer Events'
  if (base.startsWith('select-')) return 'User Select'
  if (base.startsWith('resize')) return 'Resize'

  // Overflow / Scroll
  if (base.startsWith('overflow-')) return 'Overflow'
  if (base.startsWith('overscroll-')) return 'Overscroll'
  if (base.startsWith('scroll-')) return 'Scroll'

  // Misc
  if (base.startsWith('aspect-')) return 'Aspect Ratio'
  if (base.startsWith('object-')) return 'Object Fit'

  return base // fallback
}

export function getPropertyName(cls: string): string {
  const { base, stateLabel } = stripStatePrefix(cls)
  return stateLabel + basePropertyName(base)
}

// ─── CSS value mapping ────────────────────────────────────────────────────────

const ROUNDED_VALUES: Record<string, string> = {
  'rounded-none': '0px',
  'rounded-sm':   '2px',
  'rounded':      '4px',
  'rounded-md':   '6px',
  'rounded-lg':   '8px',
  'rounded-xl':   '12px',
  'rounded-2xl':  '16px',
  'rounded-3xl':  '24px',
  'rounded-full': '9999px',
}

const TEXT_SIZE_VALUES: Record<string, string> = {
  'text-xs':   '12px',
  'text-sm':   '14px',
  'text-base': '16px',
  'text-lg':   '18px',
  'text-xl':   '20px',
  'text-2xl':  '24px',
  'text-3xl':  '30px',
}

const FONT_WEIGHT_VALUES: Record<string, string> = {
  'font-thin':       '100',
  'font-extralight': '200',
  'font-light':      '300',
  'font-normal':     '400',
  'font-medium':     '500',
  'font-semibold':   '600',
  'font-bold':       '700',
  'font-extrabold':  '800',
  'font-black':      '900',
}

const LEADING_VALUES: Record<string, string> = {
  'leading-none':    '1',
  'leading-tight':   '1.25',
  'leading-snug':    '1.375',
  'leading-normal':  '1.5',
  'leading-relaxed': '1.625',
  'leading-loose':   '2',
}

// Convert a spacing token value like "4" or "3.5" to px
function spacingToPx(token: string): string | null {
  if (token === 'px') return '1px'
  if (token === 'auto') return 'auto'
  if (token === 'full') return '100%'
  const n = parseFloat(token)
  if (isNaN(n)) return null
  return `${n * 4}px`
}

/** Returns the actual CSS value for a Tailwind utility class, e.g. "rounded-lg" → "8px" */
export function getCssValue(cls: string): string | null {
  const { base } = stripStatePrefix(cls)

  if (base in ROUNDED_VALUES) return ROUNDED_VALUES[base]
  if (base in TEXT_SIZE_VALUES) return TEXT_SIZE_VALUES[base]
  if (base in FONT_WEIGHT_VALUES) return FONT_WEIGHT_VALUES[base]
  if (base in LEADING_VALUES) return LEADING_VALUES[base]

  // Spacing utilities: h-, w-, px-, py-, p-, mx-, my-, m-, gap-, top-, etc.
  const spacingPattern = /^(?:h|w|min-h|min-w|max-h|max-w|px|py|pt|pb|pl|pr|p|mx|my|mt|mb|ml|mr|m|gap|gap-x|gap-y|top|bottom|left|right|inset|size|space-x|space-y|translate-x|translate-y)-(.+)$/
  const spacingMatch = base.match(spacingPattern)
  if (spacingMatch) {
    const px = spacingToPx(spacingMatch[1])
    if (px) return px
  }

  // Opacity
  const opacityMatch = base.match(/^opacity-(\d+)$/)
  if (opacityMatch) return `${opacityMatch[1]}%`

  // Scale
  const scaleMatch = base.match(/^scale-(\d+)$/)
  if (scaleMatch) return `${parseInt(scaleMatch[1]) / 100}`

  return null
}

// ─── Edit options (dropdown choices per property type) ────────────────────────

export type EditOption = { value: string; label: string }

/** Returns dropdown options for a class if it has a fixed set of meaningful values, else null */
export function getEditOptions(cls: string): EditOption[] | null {
  const { base } = stripStatePrefix(cls)

  // Border color
  if (base.startsWith('border-[') || base === 'border-transparent' || base.match(/^border-(white|black|gray|zinc|slate|neutral|red|blue|green|yellow|orange|pink|purple|indigo|emerald)-/)) {
    return [
      { value: 'border-transparent',  label: 'transparent' },
      { value: 'border-[#e4e4e7]',    label: '#e4e4e7 — zinc-200' },
      { value: 'border-[#d4d4d8]',    label: '#d4d4d8 — zinc-300' },
      { value: 'border-[#a1a1aa]',    label: '#a1a1aa — zinc-400' },
      { value: 'border-[#71717a]',    label: '#71717a — zinc-500' },
      { value: 'border-[#52525b]',    label: '#52525b — zinc-600' },
      { value: 'border-[#27272a]',    label: '#27272a — zinc-800' },
      { value: 'border-[#09090b]',    label: '#09090b — zinc-950' },
      { value: 'border-[#2563eb]',    label: '#2563eb — blue-600' },
      { value: 'border-[#dc2626]',    label: '#dc2626 — red-600' },
    ]
  }

  // Border width
  if (base === 'border' || base.match(/^border-[0-9]/)) {
    return [
      { value: 'border',   label: 'border — 1px' },
      { value: 'border-0', label: 'border-0 — 0px' },
      { value: 'border-2', label: 'border-2 — 2px' },
    ]
  }

  // Border radius
  if (base === 'rounded' || base.startsWith('rounded-')) {
    return [
      { value: 'rounded-none', label: 'none — 0px' },
      { value: 'rounded-sm',   label: 'sm — 2px' },
      { value: 'rounded',      label: 'DEFAULT — 4px' },
      { value: 'rounded-md',   label: 'md — 6px' },
      { value: 'rounded-lg',   label: 'lg — 8px' },
      { value: 'rounded-xl',   label: 'xl — 12px' },
      { value: 'rounded-2xl',  label: '2xl — 16px' },
      { value: 'rounded-3xl',  label: '3xl — 24px' },
      { value: 'rounded-full', label: 'full — 9999px' },
    ]
  }

  // Height
  if (base.match(/^h-\d/)) {
    return [
      { value: 'h-5',  label: 'h-5 — 20px' },
      { value: 'h-6',  label: 'h-6 — 24px' },
      { value: 'h-7',  label: 'h-7 — 28px' },
      { value: 'h-8',  label: 'h-8 — 32px' },
      { value: 'h-9',  label: 'h-9 — 36px' },
      { value: 'h-10', label: 'h-10 — 40px' },
      { value: 'h-11', label: 'h-11 — 44px' },
      { value: 'h-12', label: 'h-12 — 48px' },
    ]
  }

  // Width (square icon buttons)
  if (base.match(/^w-\d/) && !base.startsWith('w-full') && !base.startsWith('w-screen')) {
    return [
      { value: 'w-5',  label: 'w-5 — 20px' },
      { value: 'w-6',  label: 'w-6 — 24px' },
      { value: 'w-7',  label: 'w-7 — 28px' },
      { value: 'w-8',  label: 'w-8 — 32px' },
      { value: 'w-9',  label: 'w-9 — 36px' },
      { value: 'w-10', label: 'w-10 — 40px' },
    ]
  }

  // Padding X
  if (base.match(/^px-/)) {
    return [
      { value: 'px-2',   label: 'px-2 — 8px' },
      { value: 'px-2.5', label: 'px-2.5 — 10px' },
      { value: 'px-3',   label: 'px-3 — 12px' },
      { value: 'px-3.5', label: 'px-3.5 — 14px' },
      { value: 'px-4',   label: 'px-4 — 16px' },
      { value: 'px-5',   label: 'px-5 — 20px' },
      { value: 'px-6',   label: 'px-6 — 24px' },
    ]
  }

  // Padding Y
  if (base.match(/^py-/)) {
    return [
      { value: 'py-1',   label: 'py-1 — 4px' },
      { value: 'py-1.5', label: 'py-1.5 — 6px' },
      { value: 'py-2',   label: 'py-2 — 8px' },
      { value: 'py-2.5', label: 'py-2.5 — 10px' },
      { value: 'py-3',   label: 'py-3 — 12px' },
    ]
  }

  // Gap
  if (base.match(/^gap-/)) {
    return [
      { value: 'gap-1',   label: 'gap-1 — 4px' },
      { value: 'gap-1.5', label: 'gap-1.5 — 6px' },
      { value: 'gap-2',   label: 'gap-2 — 8px' },
      { value: 'gap-2.5', label: 'gap-2.5 — 10px' },
      { value: 'gap-3',   label: 'gap-3 — 12px' },
      { value: 'gap-4',   label: 'gap-4 — 16px' },
    ]
  }

  // Size (width + height, for icons)
  if (base.match(/^size-/)) {
    return [
      { value: 'size-2.5', label: 'size-2.5 — 10px' },
      { value: 'size-3',   label: 'size-3 — 12px' },
      { value: 'size-3.5', label: 'size-3.5 — 14px' },
      { value: 'size-4',   label: 'size-4 — 16px' },
      { value: 'size-5',   label: 'size-5 — 20px' },
      { value: 'size-6',   label: 'size-6 — 24px' },
    ]
  }

  // Font size
  if (base.match(/^text-(xs|sm|base|lg|xl|2xl|3xl)$/)) {
    return [
      { value: 'text-xs',   label: 'xs — 12px' },
      { value: 'text-sm',   label: 'sm — 14px' },
      { value: 'text-base', label: 'base — 16px' },
      { value: 'text-lg',   label: 'lg — 18px' },
      { value: 'text-xl',   label: 'xl — 20px' },
    ]
  }

  // Font weight
  if (base.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/)) {
    return [
      { value: 'font-normal',   label: 'normal — 400' },
      { value: 'font-medium',   label: 'medium — 500' },
      { value: 'font-semibold', label: 'semibold — 600' },
      { value: 'font-bold',     label: 'bold — 700' },
    ]
  }

  // Opacity
  if (base.match(/^opacity-\d+$/)) {
    return [
      { value: 'opacity-10', label: '10%' },
      { value: 'opacity-20', label: '20%' },
      { value: 'opacity-25', label: '25%' },
      { value: 'opacity-40', label: '40%' },
      { value: 'opacity-50', label: '50%' },
      { value: 'opacity-60', label: '60%' },
      { value: 'opacity-70', label: '70%' },
      { value: 'opacity-75', label: '75%' },
      { value: 'opacity-80', label: '80%' },
      { value: 'opacity-90', label: '90%' },
      { value: 'opacity-100','label': '100%' },
    ]
  }

  return null
}

// Detect if a class represents a color (for showing a swatch)
export function isColorClass(cls: string): string | null {
  const { base } = stripStatePrefix(cls)
  // bg-white/25, bg-[#fff], text-green-700, border-white/60
  const colorPrefixes = ['bg-', 'text-', 'border-', 'ring-', 'from-', 'to-', 'via-', 'shadow']
  for (const prefix of colorPrefixes) {
    if (base.startsWith(prefix)) {
      // Try to extract a color value
      const val = base.slice(prefix.length)
      // Named colors or hex
      if (/^#[0-9a-fA-F]{3,8}$/.test(val)) return val
      // white, black, transparent
      if (val === 'white' || val.startsWith('white/')) return 'rgba(255,255,255,' + (val.includes('/') ? parseInt(val.split('/')[1]) / 100 : '1') + ')'
      if (val === 'black' || val.startsWith('black/')) return 'rgba(0,0,0,' + (val.includes('/') ? parseInt(val.split('/')[1]) / 100 : '1') + ')'
      if (val === 'transparent') return 'transparent'
      // Tailwind named color (e.g. green-700)
      const namedMatch = val.match(/^([a-z]+)-(\d+)/)
      if (namedMatch) return null // can't resolve statically
      // Arbitrary values [#hex]
      const arbitraryMatch = val.match(/^\[#([0-9a-fA-F]{3,8})\]/)
      if (arbitraryMatch) return `#${arbitraryMatch[1]}`
      const arbitraryMatch2 = val.match(/^\[rgba?\([^)]+\)\]/)
      if (arbitraryMatch2) return val.slice(1, -1)
    }
  }
  return null
}
