import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

// All opacity steps (0–100 in 5-step increments)
const OP = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  safelist: [
    // ── white / black with all opacity steps ──
    ...OP.flatMap((o) => [
      `bg-white/${o}`, `bg-black/${o}`,
      `border-white/${o}`, `border-black/${o}`,
      `text-white/${o}`, `text-black/${o}`,
      `hover:bg-white/${o}`, `hover:bg-black/${o}`,
    ]),
    // ── sizing / spacing from getEditOptions dropdowns ──
    ...Array.from({ length: 16 }, (_, i) => `h-${i + 1}`),
    ...Array.from({ length: 16 }, (_, i) => `w-${i + 1}`),
    'px-0', 'px-1', 'px-1.5', 'px-2', 'px-2.5', 'px-3', 'px-3.5',
    'px-4', 'px-5', 'px-6', 'px-7', 'px-8',
    'py-0', 'py-1', 'py-1.5', 'py-2', 'py-2.5', 'py-3', 'py-4',
    'gap-0', 'gap-1', 'gap-1.5', 'gap-2', 'gap-2.5', 'gap-3', 'gap-4', 'gap-5', 'gap-6',
    // ── border-width ──
    'border', 'border-0', 'border-2',
    // ── border-color ──
    'border-transparent',
    'border-[#e4e4e7]', 'border-[#d4d4d8]', 'border-[#a1a1aa]', 'border-[#71717a]',
    'border-[#52525b]', 'border-[#27272a]', 'border-[#09090b]',
    'border-[#2563eb]', 'border-[#dc2626]',
    // ── border-radius ──
    'rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg',
    'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full',
    // ── typography ──
    'text-[11px]', 'leading-[16px]',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'font-normal', 'font-medium', 'font-semibold', 'font-bold',
    // ── opacity ──
    ...OP.map((o) => `opacity-${o}`),
    // ── size (width + height) ──
    'size-2.5', 'size-3', 'size-3.5', 'size-4', 'size-5', 'size-6',
    // ── aspect ──
    'aspect-square',
  ],
  plugins: [tailwindcssAnimate],
}

export default config
