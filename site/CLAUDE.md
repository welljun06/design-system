# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
cd site
npm run dev      # Start dev server (http://localhost:3000), API routes available
npm run build    # Static export to out/ (API routes auto-excluded during build)
npm run lint     # ESLint
```

No test framework is configured. After code changes, always clear `.next` and restart the dev server to avoid "Cannot find module" cache corruption errors:
```bash
rm -rf .next && npm run dev
```

## Architecture

A **layer-based design token editor** for showcasing UI components. Users can switch variants, edit individual Tailwind classes per layer, and see a live preview + generated JSX code.

### Core Pattern: Layers + ClassOverrides

Every UI component (`src/ui/*.tsx`) accepts `classOverrides?: Record<string, string>` and merges overrides per layer:

```
registry defines layers → ComponentViewer tracks editedLayers → buildOverrides() → classOverrides prop → UI component renders
```

**Registry** (`src/lib/registry.ts`): Each component entry defines `layers` — a map of layer keys to `LayerDef`:
- **Enum layers** have `enumOptions` (predefined choices like variant colors, sizes), `variantPropKey` (links to component props), and optional `description` per option (usage guidance shown in the toolbar)
- **Free layers** have just `classes` — users edit individual Tailwind classes freely
- `groupUnder`: renders a free layer's properties inside another enum layer's "Mapped values" section (e.g., `iconSize` grouped under `size`)
- `editableClasses`: restricts which classes are shown in StylePanel (others still render but are hidden from the editor UI)

**ComponentViewer** (`src/components/showcase/ComponentViewer.tsx`): The main interactive editor. Manages:
- `enumState`: which enum option is selected per dimension
- `editedLayers`: current class arrays per layer (editable in StylePanel)
- `layerMemory`: per-combination memory for both free layers AND enum layers — preserves custom edits when switching between enum options

**StylePanel** (`src/components/showcase/StylePanel.tsx`): Right panel property editor. Routes layers to:
- `EnumLayerSection` → `EditableEnumRow` (shows mapped values with dropdowns/text inputs, plus grouped free layers inline)
- `FreeLayerSection` → `PropertyRow` (editable class chips, uses `getEditOptions()` for dropdowns when available)

### SideEffects System

Enum options can declare `sideEffects: Record<string, string[]>` to reset free layers when selected. Example: switching size to "SM" sets padding to `['px-2']` and iconSize to `['size-3']`. `computeLayerComboKey()` generates memory keys using only the relevant enum dimensions, so unrelated dimension changes don't invalidate saved values.

### Persistence

Two-layer system — file-based (primary) with server-side hydration:

1. **Server read**: Page component calls `readConfig(slug)` from `src/lib/configStore.ts` to read `data/{slug}.json` at render time, passed as `savedConfig` prop to initialize state without hydration mismatch
2. **Client write**: Auto-save via debounced `PUT /api/config/{slug}/` writes to the same `data/` files (dev mode only — API route excluded from static export)
3. **Static export**: `npm run build` temporarily hides the `api/` directory, so `output: 'export'` works. The exported HTML uses whatever config was in `data/` at build time

The `next.config.ts` conditionally sets `output: 'export'` only in production (`NODE_ENV === 'production'`), so API routes work during development.

### Key Lib Modules

- `classParser.ts`: Bridges Tailwind classes to UI — `getPropertyName()`, `getCssValue()`, `getEditOptions()`, `isColorClass()`. When adding new editable properties to `getEditOptions()`, also add the values to the safelist in `tailwind.config.ts`
- `codeGen.ts`: Client-side JSX code generation from classOverrides (mirrors registry `code()` functions)
- `registry.ts`: `RegistryEntry` (server, has `code` fn) vs `SerializableEntry` (client, no fn) — use `toSerializable()` when passing to client components

### Annotation Overlay

`AnnotationOverlay.tsx` scans ALL layers (not specific keys) for padding/height/gap/radius/fontSize/iconSize classes, measures the rendered component with `ResizeObserver`, and draws measurement annotations.

## Key Conventions

- Path alias: `@/*` → `src/*`
- Chinese UI labels in registry (category: '基础组件', enum labels like '蓝字灰框', descriptions like '主操作按钮，用于页面中最重要的行动点')
- All UI components use inline `style={}` for colors/borders on the showcase shell; Tailwind classes are used for the editable preview components
- `trailingSlash: true` — API fetch URLs must include trailing slash (e.g., `/api/config/button/`)
- Button component uses `useId()` for SVG gradient IDs and is a client component (`'use client'`)

## Page UI Rules

- For new page templates, prefer existing business/layout components first (`Nav`, `Filter`, `Card`, `Button`, `Tag`, `Textarea`, etc.) and only customize the central hero/input area when necessary.
- On non-white or tinted surfaces, secondary actions should prefer `ghost-black` or be removed entirely. Avoid `outline-gray` on translucent/glass sections unless the background is clearly white.
- Filter-style inline groups should use `8px` internal spacing by default.
- Background atmosphere effects should be subtle: use low-opacity blurred gradients attached to the page root/background layer, not content-local overlays. Favor soft cyan + warm light accents over saturated purple glows.
- Hover effects for cards should preserve clipping and radius first. Prefer slight lift plus outer shadow; do not use internal glow layers that break rounded-corner masking or let underlying colors bleed through.
- Large prompt/input areas should stay refined rather than poster-like. Keep the input container large, but default the typed text itself to normal reading scale first (around `16px / 28px`), and only increase beyond that when the text is functioning as a headline rather than an editable prompt body.
- Headline motion effects should be restrained and localized. If a hero title needs animation, apply it only to the key word (for example a subtle marquee/shine sweep on one word), keep the speed slow, and avoid turning the whole heading into a high-frequency animated banner.
- Hero slogans may use a more designed display-style font stack, but prefer platform-safe/system-available display fonts first (`Avenir Next`, `SF Pro Display`, `Segoe UI`, `Helvetica Neue`, `Inter`, etc.) and do not introduce a new font dependency just for one page headline.
- For immersive workflow detail pages (such as vibe coding after entering the workspace), remove template-internal menu navigation, use a transparent or lightly frosted conversation area on the left, and keep the artifact/workspace area on the right inside a clear white framed panel so the output stays visually stable and readable.
