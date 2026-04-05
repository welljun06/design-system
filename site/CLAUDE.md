# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Static export to out/ (next build with output: 'export')
npm run lint     # ESLint
```

No test framework is configured. The project is a fully static Next.js site — no API routes, no SSR.

## Architecture

A **layer-based design token editor** for showcasing UI components. Users can switch variants, edit individual Tailwind classes per layer, and see a live preview + generated JSX code.

### Core Pattern: Layers + ClassOverrides

Every UI component (`src/ui/*.tsx`) accepts `classOverrides?: Record<string, string>` and merges overrides per layer:

```
registry defines layers → ComponentViewer tracks editedLayers → buildOverrides() → classOverrides prop → UI component renders
```

**Registry** (`src/lib/registry.ts`): Each component entry defines `layers` — a map of layer keys to `LayerDef`:
- **Enum layers** have `enumOptions` (predefined choices like variant colors, sizes) and `variantPropKey` (links to component props)
- **Free layers** have just `classes` — users edit individual Tailwind classes freely

**ComponentViewer** (`src/components/showcase/ComponentViewer.tsx`): The main interactive editor. Manages:
- `enumState`: which enum option is selected per dimension (e.g., `{ variant: 'solid-blue', size: 'lg', radius: 'rounded' }`)
- `editedLayers`: current class arrays per layer (editable in StylePanel)
- `layerMemory`: per-combination memory for free layers (keyed by only the enum dims that affect them via `sideEffects`)

**StylePanel** (`src/components/showcase/StylePanel.tsx`): Right panel property editor. Routes layers to:
- `EnumLayerSection` → `EditableEnumRow` (shows mapped values with dropdowns/text inputs)
- `FreeLayerSection` → `PropertyRow` (editable class chips, uses `getEditOptions()` for dropdowns when available)

### SideEffects System

Enum options can declare `sideEffects: Record<string, string[]>` to reset free layers when selected. Example: switching size to "MD" sets padding to `['px-3']`. `computeLayerComboKey()` generates memory keys using only the relevant enum dimensions, so unrelated dimension changes (like variant) don't invalidate saved padding values.

### Key Lib Modules

- `classParser.ts`: Bridges Tailwind classes to UI — `getPropertyName()`, `getCssValue()`, `getEditOptions()`, `isColorClass()`
- `codeGen.ts`: Client-side JSX code generation from classOverrides (mirrors registry `code()` functions)
- `registry.ts`: `RegistryEntry` (server, has `code` fn) vs `SerializableEntry` (client, no fn) — use `toSerializable()` when passing to client components

### Tailwind Safelist

`tailwind.config.ts` has an explicit safelist for classes that users might create via the StylePanel editor. When adding new editable properties to `getEditOptions()`, also add the corresponding values to the safelist.

### Annotation Overlay

`AnnotationOverlay.tsx` reads `editedLayers` to extract padding/height/gap/radius values, measures the rendered component with `ResizeObserver`, and draws measurement annotations. Padding is read from the `padding` layer, height/gap from `size`, border-radius from `radius`.

### Persistence

ComponentViewer saves state to `localStorage` via an explicit Save button (`handleSave`). Load happens on mount with migration logic for breaking schema changes. The `layerMemory` (per-combination free layer values) is included in the save.

## Key Conventions

- Path alias: `@/*` → `src/*`
- Static export: `output: 'export'`, `trailingSlash: true`, no API routes
- Chinese UI labels in registry (category: '基础组件', enum labels like '蓝字灰框')
- All UI components use inline `style={}` for colors/borders (not Tailwind color classes) to avoid purge issues on the showcase shell; Tailwind classes are used for the editable preview components
