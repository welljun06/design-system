'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { StylePanel } from './StylePanel'
import { AnnotationOverlay } from './AnnotationOverlay'
import { Button } from '@/ui/Button'
import type { ButtonVariant, ButtonContent, ButtonSize, ButtonRadius, ButtonIconName } from '@/ui/Button'
import { iconMap } from '@/ui/Button'

import { Input } from '@/ui/Input'
import type { InputSize, InputVariant } from '@/ui/Input'
import { Select } from '@/ui/Select'
import type { SelectSize, SelectVariant } from '@/ui/Select'
import { Tag } from '@/ui/Tag'
import { Tabs } from '@/ui/Tabs'
import type { TabsVariant, TabsSize } from '@/ui/Tabs'
import { Card } from '@/ui/Card'
import { Form } from '@/ui/Form'
import type { FormLayout, FormFieldType } from '@/ui/Form'
import { Textarea } from '@/ui/Textarea'
import type { TextareaSize, TextareaVariant } from '@/ui/Textarea'
import { Checkbox } from '@/ui/Checkbox'
import type { CheckboxVariant } from '@/ui/Checkbox'
import { RadioGroup } from '@/ui/RadioGroup'
import type { RadioSize } from '@/ui/RadioGroup'
import { Switch } from '@/ui/Switch'
import type { SwitchSize } from '@/ui/Switch'
import { Slider } from '@/ui/Slider'
import type { SliderSize } from '@/ui/Slider'
import { Upload } from '@/ui/Upload'
import type { UploadSize } from '@/ui/Upload'
import { InputGroup } from '@/ui/InputGroup'
import type { InputGroupSize } from '@/ui/InputGroup'
import { Nav } from '@/ui/Nav'
import { BusinessSelector } from '@/ui/BusinessSelector'
import { generateCode } from '@/lib/codeGen'
import type { SerializableEntry } from '@/lib/registry'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildOverrides(editedLayers: Record<string, string[]>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(editedLayers).map(([key, classes]) => [key, classes.join(' ')])
  )
}

/** Map variantPropKey → enum option key, from the first enum option for each layer */
function getInitialEnumState(layers: SerializableEntry['layers']): Record<string, string> {
  const state: Record<string, string> = {}
  for (const def of Object.values(layers)) {
    if (def.enumOptions && def.variantPropKey && def.enumOptions[0]) {
      state[def.variantPropKey] = def.enumOptions[0].key
    }
  }
  return state
}

/** Apply sideEffects from all selected enum options into an already-built layers map */
function applySideEffects(
  result: Record<string, string[]>,
  layers: SerializableEntry['layers'],
  getSelectedOption: (def: SerializableEntry['layers'][string]) => SerializableEntry['layers'][string]['enumOptions'] extends undefined ? never : NonNullable<SerializableEntry['layers'][string]['enumOptions']>[number] | undefined
): Record<string, string[]> {
  for (const [, def] of Object.entries(layers)) {
    if (def.enumOptions && def.variantPropKey) {
      const option = getSelectedOption(def)
      if (option?.sideEffects) {
        for (const [k, v] of Object.entries(option.sideEffects)) {
          result[k] = [...v]
        }
      }
    }
  }
  return result
}

function getDependentVariantPropKeys(
  layerKey: string,
  layers: SerializableEntry['layers']
): string[] {
  return Object.entries(layers)
    .filter(([, def]) =>
      def.enumOptions &&
      def.variantPropKey &&
      def.enumOptions.some((opt) => opt.sideEffects?.[layerKey] !== undefined)
    )
    .map(([, def]) => def.variantPropKey!)
}

/**
 * Compute the combo key for a free layer's per-combination memory.
 * Only includes enum dimensions that have sideEffects targeting the given layer,
 * so switching unrelated dims (e.g. variant) doesn't invalidate the stored value.
 */
function computeLayerComboKey(
  layerKey: string,
  layers: SerializableEntry['layers'],
  currentEnumState: Record<string, string>
): string {
  return getDependentVariantPropKeys(layerKey, layers)
    .map((variantPropKey) => `${variantPropKey}=${currentEnumState[variantPropKey] ?? ''}`)
    .sort()
    .join(',')
}

/**
 * For each free layer, derive the subtitle from the current enumState
 * (using variantPropKey directly — immune to "custom" class edits).
 */
function computeLayerSubtitles(
  layers: SerializableEntry['layers'],
  enumState: Record<string, string>
): Record<string, string> {
  const subtitles: Record<string, string> = {}

  for (const [layerKey, def] of Object.entries(layers)) {
    if (def.enumOptions) continue

    const keys = getDependentVariantPropKeys(layerKey, layers)
    if (!keys.length) continue

    subtitles[layerKey] = keys
      .map((variantPropKey) => enumState[variantPropKey])
      .filter(Boolean)
      .join(' · ')
  }

  return subtitles
}

/** Build editedLayers from a given enumState (resets each enum layer to the option's classes) */
function buildLayersFromEnumState(
  layers: SerializableEntry['layers'],
  enumState: Record<string, string>
): Record<string, string[]> {
  const result = Object.fromEntries(
    Object.entries(layers).map(([key, def]) => {
      if (def.enumOptions && def.variantPropKey) {
        const optKey = enumState[def.variantPropKey]
        const option = optKey ? def.enumOptions.find((o) => o.key === optKey) : undefined
        if (option) return [key, [...option.classes]]
      }
      return [key, [...def.classes]]
    })
  )
  return applySideEffects(result, layers, (def) => {
    const optKey = def.variantPropKey ? enumState[def.variantPropKey] : undefined
    return def.enumOptions?.find((o) => o.key === optKey)
  })
}

/** Resolve layers from a variant's props (for tab-based components) */
function buildLayersFromVariantProps(
  layers: SerializableEntry['layers'],
  variantProps: Record<string, string>
): Record<string, string[]> {
  const result = Object.fromEntries(
    Object.entries(layers).map(([key, def]) => {
      if (def.enumOptions && def.variantPropKey) {
        const propVal = variantProps[def.variantPropKey]
        const option = propVal ? def.enumOptions.find((o) => o.key === propVal) : undefined
        if (option) return [key, [...option.classes]]
      }
      return [key, [...def.classes]]
    })
  )
  return applySideEffects(result, layers, (def) => {
    const propVal = def.variantPropKey ? variantProps[def.variantPropKey] : undefined
    return def.enumOptions?.find((o) => o.key === propVal)
  })
}

function syncLayersToMemory(
  layers: SerializableEntry['layers'],
  enumState: Record<string, string>,
  editedLayers: Record<string, string[]>,
  layerMemory: Record<string, Record<string, string>>
): Record<string, Record<string, string>> {
  const next = Object.fromEntries(
    Object.entries(layerMemory).map(([layerKey, memory]) => [layerKey, { ...memory }])
  ) as Record<string, Record<string, string>>

  for (const [layerKey, def] of Object.entries(layers)) {
    const classes = editedLayers[layerKey]
    if (!classes?.length) continue

    if (def.enumOptions && def.variantPropKey) {
      const optionKey = enumState[def.variantPropKey]
      if (!optionKey) continue
      next[layerKey] = { ...(next[layerKey] ?? {}), [optionKey]: classes.join(' ') }
      continue
    }

    const comboKey = computeLayerComboKey(layerKey, layers, enumState)
    next[layerKey] = { ...(next[layerKey] ?? {}), [comboKey]: classes.join(' ') }
  }

  return next
}

function buildLayersFromDefaultMemory(
  layers: SerializableEntry['layers'],
  enumState: Record<string, string>,
  layerMemory: Record<string, Record<string, string>>
): Record<string, string[]> {
  const resolved = buildLayersFromEnumState(layers, enumState)

  for (const [layerKey, def] of Object.entries(layers)) {
    if (def.enumOptions && def.variantPropKey) {
      const optionKey = enumState[def.variantPropKey]
      const remembered = optionKey ? layerMemory[layerKey]?.[optionKey] : undefined
      if (remembered) resolved[layerKey] = remembered.split(' ')
      continue
    }

    const comboKey = computeLayerComboKey(layerKey, layers, enumState)
    const remembered = layerMemory[layerKey]?.[comboKey]
    if (remembered) resolved[layerKey] = remembered.split(' ')
  }

  return resolved
}

// ─── Preview renderer ─────────────────────────────────────────────────────────


type CardVariant = 'default' | 'glass'

function PreviewComponent({
  slug,
  variantProps,
  classOverrides,
}: {
  slug: string
  variantProps: Record<string, string>
  classOverrides: Record<string, string>
}) {
  if (slug === 'button') return (
    <Button
      variant={(variantProps.variant as ButtonVariant) ?? 'solid-black'}
      content={(variantProps.content as ButtonContent) ?? 'block'}
      size={(variantProps.size as ButtonSize) ?? 'lg'}
      radius={(variantProps.radius as ButtonRadius) ?? 'rounded'}
      iconName={(variantProps.icon as ButtonIconName) ?? 'arrow-down'}
      loading={variantProps.loading === 'true'}
      disabled={variantProps.disabled === 'true'}
      classOverrides={classOverrides}
    />
  )


  if (slug === 'input') return <div className="w-64"><Input variant={(variantProps.variant as InputVariant) ?? 'default'} size={(variantProps.size as InputSize) ?? 'lg'} disabled={variantProps.disabled === 'true'} classOverrides={classOverrides} /></div>
  if (slug === 'select') return <div className="w-64"><Select variant={(variantProps.variant as SelectVariant) ?? 'default'} size={(variantProps.size as SelectSize) ?? 'lg'} disabled={variantProps.disabled === 'true'} classOverrides={classOverrides} /></div>
  if (slug === 'tabs') return <Tabs variant={(variantProps.variant as TabsVariant) ?? 'glass'} size={(variantProps.size as TabsSize) ?? 'md'} classOverrides={classOverrides} />
  if (slug === 'tag') return <Tag color={(variantProps.color as any) ?? 'white'} type={(variantProps.type as any) ?? 'light'} size={(variantProps.size as any) ?? 'md'} shape={(variantProps.shape as any) ?? 'square'} classOverrides={classOverrides} />
  if (slug === 'card') return <div className="w-72 flex"><Card variant={(variantProps.variant as CardVariant) ?? 'default'} classOverrides={classOverrides} /></div>
  if (slug === 'form') return <Form layout={(variantProps.layout as FormLayout) ?? 'top'} fieldType={(variantProps.fieldType as FormFieldType) ?? 'input'} classOverrides={classOverrides} />
  if (slug === 'textarea') return <div className="w-64"><Textarea variant={(variantProps.variant as TextareaVariant) ?? 'default'} size={(variantProps.size as TextareaSize) ?? 'lg'} classOverrides={classOverrides} /></div>
  if (slug === 'checkbox') return <Checkbox variant={(variantProps.variant as CheckboxVariant) ?? 'default'} classOverrides={classOverrides} />
  if (slug === 'radio-group') return <RadioGroup size={(variantProps.size as RadioSize) ?? 'md'} classOverrides={classOverrides} />
  if (slug === 'switch') return <Switch size={(variantProps.size as SwitchSize) ?? 'md'} classOverrides={classOverrides} />
  if (slug === 'slider') return <div className="w-64"><Slider size={(variantProps.size as SliderSize) ?? 'md'} classOverrides={classOverrides} /></div>
  if (slug === 'upload') return <Upload size={(variantProps.size as UploadSize) ?? 'lg'} classOverrides={classOverrides} />
  if (slug === 'input-group') return <div className="w-80"><InputGroup size={(variantProps.size as InputGroupSize) ?? 'lg'} classOverrides={classOverrides} /></div>
  if (slug === 'nav') return <Nav classOverrides={classOverrides} />
  if (slug === 'business-selector') return <BusinessSelector classOverrides={classOverrides} />
  return null
}

// ─── Enum controls (left panel for enum-based components) ─────────────────────

function EnumControls({
  entry,
  enumState,
  defaultEnumState,
  contentMode,
  defaultContentMode,
  iconName,
  defaultIconName,
  loading,
  defaultLoading,
  disabled,
  defaultDisabled,
  onEnumChange,
  onContentChange,
  onIconChange,
  onLoadingChange,
  onDisabledChange,
}: {
  entry: SerializableEntry
  enumState: Record<string, string>
  defaultEnumState: Record<string, string>
  contentMode: string
  defaultContentMode: string
  iconName: string
  defaultIconName: string
  loading: boolean
  defaultLoading: boolean
  disabled: boolean
  defaultDisabled: boolean
  onEnumChange: (layerKey: string, variantPropKey: string, newKey: string, newClasses: string[]) => void
  onContentChange: (v: string) => void
  onIconChange: (v: string) => void
  onLoadingChange: (v: boolean) => void
  onDisabledChange: (v: boolean) => void
}) {
  const enumLayers = Object.entries(entry.layers).filter(([, def]) => def.enumOptions)
  const isButton = entry.slug === 'button'

  return (
    <div
      className="flex flex-col py-4 px-3 border-r shrink-0 overflow-y-auto"
      style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7', width: '160px' }}
    >
      {enumLayers.map(([layerKey, def], groupIdx) => (
        <div
          key={layerKey}
          className="pb-3 mb-3"
          style={{ borderBottom: groupIdx < enumLayers.length - 1 ? '1px solid #f0f0f0' : 'none' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#c4c4c8' }}>
            {def.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {def.enumOptions!.map((opt) => {
              const active = enumState[def.variantPropKey!] === opt.key
              return (
                <div key={opt.key}>
                  <button
                    onClick={() => def.variantPropKey && onEnumChange(layerKey, def.variantPropKey, opt.key, opt.classes)}
                    className="w-full text-left px-2.5 py-1.5 rounded-md text-[12px] transition-colors"
                    style={{
                      backgroundColor: active ? '#ffffff' : 'transparent',
                      color: active ? '#09090b' : '#71717a',
                      border: active ? '1px solid #e4e4e7' : '1px solid transparent',
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {opt.label}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Icon selector (button only) */}
      {isButton && (
        <div className="pb-3 mb-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#c4c4c8' }}>
            Icon
          </p>
          <div className="relative">
            <select
              value={iconName}
              onChange={(e) => onIconChange(e.target.value)}
              className="w-full h-7 text-[11px] font-mono rounded-md pl-2 pr-6 appearance-none outline-none cursor-pointer"
              style={{ border: '1px solid #e4e4e7', color: '#52525b', backgroundColor: '#ffffff' }}
            >
              <option value="none">无图标</option>
              {Object.keys(iconMap).map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" style={{ color: '#a1a1aa' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 2.5L4 5.5L7 2.5" />
              </svg>
            </span>
          </div>
        </div>
      )}

      {/* Content toggle (button only) */}
      {isButton && (
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#c4c4c8' }}>
            Content
          </p>
          <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid #e4e4e7' }}>
            {(['block', 'icon'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onContentChange(mode)}
                className="flex-1 h-7 text-[11px] transition-colors"
                style={{
                  backgroundColor: contentMode === mode ? '#09090b' : '#ffffff',
                  color: contentMode === mode ? '#ffffff' : '#71717a',
                  fontWeight: contentMode === mode ? 500 : 400,
                }}
              >
                {mode === 'block' ? 'Block' : 'Icon'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* State toggles (button only) */}
      {isButton && (
        <div className="mt-auto pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid #f0f0f0' }}>
          {([
            { label: 'Loading',  value: loading,  onChange: onLoadingChange },
            { label: 'Disabled', value: disabled, onChange: onDisabledChange },
          ] as const).map((item) => (
            <label key={item.label} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={item.value}
                onChange={(e) => (item.onChange as (v: boolean) => void)(e.target.checked)}
                style={{ accentColor: '#09090b', width: 12, height: 12 }}
              />
              <span className="text-[11px]" style={{ color: '#71717a' }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main viewer ──────────────────────────────────────────────────────────────

type SavedConfig = {
  enumState?: Record<string, string>
  editedLayers?: Record<string, string[]>
  contentMode?: string
  iconName?: string
  stateLoading?: boolean
  stateDisabled?: boolean
  activeVariantIndex?: number
  layerMemory?: Record<string, Record<string, string>>
} | null

type ComponentViewerProps = {
  entry: SerializableEntry
  initialHighlightedHtml?: string
  savedConfig?: SavedConfig
}

export function ComponentViewer({ entry, initialHighlightedHtml, savedConfig }: ComponentViewerProps) {
  const hasEnumLayers = useMemo(
    () => Object.values(entry.layers).some((def) => def.enumOptions),
    [entry.layers]
  )

  const defaultEnumState = useMemo(
    () => savedConfig?.enumState ?? (hasEnumLayers ? getInitialEnumState(entry.layers) : {}),
    [savedConfig?.enumState, hasEnumLayers, entry.layers]
  )
  const defaultContentMode = savedConfig?.contentMode ?? 'block'
  const defaultIconName = savedConfig?.iconName ?? 'arrow-down'
  const defaultStateLoading = savedConfig?.stateLoading ?? false
  const defaultStateDisabled = savedConfig?.stateDisabled ?? false
  const defaultActiveVariantIndex = savedConfig?.activeVariantIndex ?? 0

  const defaultEditedLayers = useMemo(
    () => savedConfig?.editedLayers
      ?? (hasEnumLayers
        ? buildLayersFromEnumState(entry.layers, defaultEnumState)
        : buildLayersFromVariantProps(entry.layers, entry.variants[defaultActiveVariantIndex]?.props ?? entry.variants[0]?.props ?? {})),
    [savedConfig?.editedLayers, hasEnumLayers, entry.layers, defaultEnumState, entry.variants, defaultActiveVariantIndex]
  )

  const defaultLayerMemory = useMemo(
    () => hasEnumLayers
      ? syncLayersToMemory(entry.layers, defaultEnumState, defaultEditedLayers, savedConfig?.layerMemory ?? {})
      : (savedConfig?.layerMemory ?? {}),
    [hasEnumLayers, entry.layers, defaultEnumState, defaultEditedLayers, savedConfig?.layerMemory]
  )

  // ── Enum-based state (for components with enumOptions layers) ──
  const [enumState, setEnumState] = useState<Record<string, string>>(
    () => defaultEnumState
  )
  const [contentMode, setContentMode] = useState<string>(defaultContentMode)
  const [iconName, setIconName] = useState<string>(defaultIconName)
  const [stateLoading, setStateLoading] = useState(defaultStateLoading)
  const [stateDisabled, setStateDisabled] = useState(defaultStateDisabled)
  const [annotationMode, setAnnotationMode] = useState(false)
  const [previewBg, setPreviewBg] = useState<'gradient' | 'white'>('gradient')

  // ── Per-combination memory for independently-configurable free layers ──
  const [layerMemory, setLayerMemory] = useState<Record<string, Record<string, string>>>(
    defaultLayerMemory
  )

  // ── Tab-based state (for components without enumOptions) ──
  const [activeVariantIndex, setActiveVariantIndex] = useState(defaultActiveVariantIndex)

  // ── Shared: editedLayers ──
  const [editedLayers, setEditedLayers] = useState<Record<string, string[]>>(
    () => defaultEditedLayers
  )

  // Per-free-layer subtitles derived from enumState (always current, unaffected by class edits)
  const layerSubtitles = useMemo(
    () => computeLayerSubtitles(entry.layers, enumState),
    [entry.layers, enumState]
  )

  // Active description from current enum selections
  const activeDescription = useMemo(() => {
    if (!hasEnumLayers) return null
    for (const def of Object.values(entry.layers)) {
      if (def.enumOptions && def.variantPropKey) {
        const key = enumState[def.variantPropKey]
        const opt = key ? def.enumOptions.find((o) => o.key === key) : undefined
        if (opt?.description) return opt.description
      }
    }
    return null
  }, [hasEnumLayers, entry.layers, enumState])

  // defaultLayers for StylePanel (reset target + change detection)
  const defaultLayers = useMemo(() => {
    if (hasEnumLayers) return buildLayersFromDefaultMemory(entry.layers, enumState, defaultLayerMemory)
    if (activeVariantIndex === defaultActiveVariantIndex) return defaultEditedLayers
    const props = (entry.variants[activeVariantIndex] ?? entry.variants[0])?.props ?? {}
    return buildLayersFromVariantProps(entry.layers, props)
  }, [hasEnumLayers, entry.layers, enumState, defaultLayerMemory, activeVariantIndex, defaultActiveVariantIndex, defaultEditedLayers, entry.variants])

  // variantProps for PreviewComponent
  const variantProps = useMemo((): Record<string, string> => {
    if (hasEnumLayers) {
      return {
        ...enumState,
        content: contentMode,
        icon: iconName,
        loading: stateLoading ? 'true' : 'false',
        disabled: stateDisabled ? 'true' : 'false',
      }
    }
    return (entry.variants[activeVariantIndex] ?? entry.variants[0])?.props ?? {}
  }, [hasEnumLayers, enumState, contentMode, iconName, stateLoading, stateDisabled, activeVariantIndex, entry.variants])

  // ── Persistence: auto-save to project file via API ──────────────────────────
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const changeCountRef = useRef(0)
  const skipCountRef = useRef(0)
  const [saveToast, setSaveToast] = useState<'saved' | 'error' | null>(null)

  // Track user interaction — only start saving after first real click/change
  const userInteractedRef = useRef(false)
  useEffect(() => {
    const mark = () => { userInteractedRef.current = true }
    window.addEventListener('pointerdown', mark, { once: true })
    return () => window.removeEventListener('pointerdown', mark)
  }, [])

  useEffect(() => {
    // Don't save until user has actually interacted with the page
    if (!userInteractedRef.current) return
    changeCountRef.current++
    const currentChange = changeCountRef.current
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      if (currentChange !== changeCountRef.current) return
      fetch(`/api/config/${entry.slug}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enumState,
          editedLayers,
          contentMode,
          iconName,
          stateLoading,
          stateDisabled,
          activeVariantIndex,
          layerMemory,
        }),
      })
        .then((r) => { if (r.ok) { setSaveToast('saved'); setTimeout(() => setSaveToast(null), 1500) } else { setSaveToast('error'); setTimeout(() => setSaveToast(null), 2000) } })
        .catch(() => { setSaveToast('error'); setTimeout(() => setSaveToast(null), 2000) })
    }, 500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumState, editedLayers, contentMode, iconName, stateLoading, stateDisabled, activeVariantIndex, layerMemory])

  // ─────────────────────────────────────────────────────────────────────────────

  const classOverrides = useMemo(() => buildOverrides(editedLayers), [editedLayers])
  const rawCode = useMemo(() => generateCode(entry.slug, classOverrides, variantProps), [entry.slug, classOverrides, variantProps])

  // ── Export all variants as JSON ──
  const handleExport = useCallback(() => {
    const variants = entry.variants.map((v) => {
      // Resolve layers for this variant's props
      const resolved = hasEnumLayers
        ? (() => {
            // Build enum state from variant props
            const es: Record<string, string> = {}
            for (const [, def] of Object.entries(entry.layers)) {
              if (def.enumOptions && def.variantPropKey && v.props[def.variantPropKey]) {
                es[def.variantPropKey] = v.props[def.variantPropKey]
              }
            }
            const layers = buildLayersFromEnumState(entry.layers, es)
            // Apply any per-combo memory
            for (const [freeKey, def] of Object.entries(entry.layers)) {
              if (!def.enumOptions) {
                const comboKey = computeLayerComboKey(freeKey, entry.layers, es)
                const remembered = layerMemory[freeKey]?.[comboKey]
                if (remembered) layers[freeKey] = remembered.split(' ')
              }
            }
            return layers
          })()
        : buildLayersFromVariantProps(entry.layers, v.props)

      const overrides = buildOverrides(resolved)

      // Collect descriptions from enum options matching this variant's props
      const descriptions: Record<string, string> = {}
      for (const [, def] of Object.entries(entry.layers)) {
        if (def.enumOptions && def.variantPropKey) {
          const propVal = v.props[def.variantPropKey]
          const opt = propVal ? def.enumOptions.find((o) => o.key === propVal) : undefined
          if (opt?.description) {
            descriptions[def.variantPropKey] = opt.description
          }
        }
      }

      return {
        label: v.label,
        props: v.props,
        ...(Object.keys(descriptions).length > 0 ? { descriptions } : {}),
        classOverrides: overrides,
      }
    })

    const json = JSON.stringify({
      component: entry.slug,
      name: entry.name,
      exportedAt: new Date().toISOString(),
      variants,
    }, null, 2)

    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${entry.slug}-variants.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [entry, hasEnumLayers, layerMemory])

  // When user changes an enum dropdown in the left panel
  const handleEnumChange = useCallback((
    layerKey: string,
    variantPropKey: string,
    newKey: string,
    newClasses: string[]
  ) => {
    const currentOptionKey = enumState[variantPropKey] ?? ''
    const newEnumState = { ...enumState, [variantPropKey]: newKey }

    // Save current enum layer classes before switching
    setLayerMemory((prev) => ({
      ...prev,
      [layerKey]: { ...(prev[layerKey] ?? {}), [currentOptionKey]: (editedLayers[layerKey] ?? []).join(' ') },
    }))

    setEnumState(newEnumState)
    setEditedLayers((prev) => {
      // Restore remembered classes for the target option, or use defaults
      const remembered = layerMemory[layerKey]?.[newKey]
      const next = { ...prev, [layerKey]: remembered ? remembered.split(' ') : [...newClasses] }

      // For every free layer that depends on any enum, recompute from memory/defaults
      for (const [freeKey, def] of Object.entries(entry.layers)) {
        if (def.enumOptions) continue
        const dependsOnKeys = getDependentVariantPropKeys(freeKey, entry.layers)
        if (!dependsOnKeys.length) continue
        const comboKey = computeLayerComboKey(freeKey, entry.layers, newEnumState)
        const rememberedCombo = layerMemory[freeKey]?.[comboKey]
        if (rememberedCombo) {
          next[freeKey] = rememberedCombo.split(' ')
        } else {
          // Build default via sideEffects chain from current enum selections
          const defaults = buildLayersFromEnumState(entry.layers, newEnumState)[freeKey]
          next[freeKey] = [...defaults]
        }
      }

      return next
    })
  }, [enumState, editedLayers, layerMemory, entry.layers])

  // When user switches variant tab (tab-based components)
  const handleVariantChange = useCallback((index: number) => {
    setActiveVariantIndex(index)
    const props = entry.variants[index]?.props ?? {}
    setEditedLayers(buildLayersFromVariantProps(entry.layers, props))
  }, [entry])

  // When user edits classes in StylePanel — store in per-combo memory
  const handleLayerChange = useCallback(
    (layerKey: string, newClasses: string[]) => {
      setEditedLayers((prev) => ({ ...prev, [layerKey]: newClasses }))
      if (newClasses.length > 0) {
        const def = entry.layers[layerKey]
        if (def?.enumOptions && def.variantPropKey) {
          // Enum layer: remember custom edits per option key
          const optionKey = enumState[def.variantPropKey] ?? ''
          setLayerMemory((prev) => ({
            ...prev,
            [layerKey]: { ...(prev[layerKey] ?? {}), [optionKey]: newClasses.join(' ') },
          }))
        } else {
          // Free layer: remember per combo
          const key = computeLayerComboKey(layerKey, entry.layers, enumState)
          setLayerMemory((prev) => ({
            ...prev,
            [layerKey]: { ...(prev[layerKey] ?? {}), [key]: newClasses.join(' ') },
          }))
        }
      }
    },
    [entry.layers, enumState]
  )



  return (
    <div className="space-y-4 relative">
      {/* Save toast */}
      {saveToast && (
        <div
          className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] shadow-xl transition-all"
          style={{
            backgroundColor: saveToast === 'saved' ? '#f0fdf4' : '#fef2f2',
            color: saveToast === 'saved' ? '#16a34a' : '#dc2626',
            border: `1px solid ${saveToast === 'saved' ? '#bbf7d0' : '#fecaca'}`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {saveToast === 'saved'
              ? <polyline points="20 6 9 17 4 12" />
              : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            }
          </svg>
          {saveToast === 'saved' ? '已保存' : '保存失败'}
        </div>
      )}

      <div
        className="rounded-xl overflow-hidden border flex flex-col lg:flex-row"
        style={{ borderColor: '#e4e4e7' }}
      >
        {/* Preview area */}
        <div className="flex-1 flex min-w-0 preview-pane">

          {/* Left panel: enum controls or variant tabs */}
          {hasEnumLayers ? (
            <EnumControls
              entry={entry}
              enumState={enumState}
              defaultEnumState={defaultEnumState}
              contentMode={contentMode}
              defaultContentMode={defaultContentMode}
              iconName={iconName}
              defaultIconName={defaultIconName}
              loading={stateLoading}
              defaultLoading={defaultStateLoading}
              disabled={stateDisabled}
              defaultDisabled={defaultStateDisabled}
              onEnumChange={handleEnumChange}
              onContentChange={setContentMode}
              onIconChange={setIconName}
              onLoadingChange={setStateLoading}
              onDisabledChange={setStateDisabled}
            />
          ) : (
            entry.variants.length > 1 && (
              <div
                className="flex flex-col gap-0.5 py-3 px-2 border-r shrink-0"
                style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7', minWidth: '120px' }}
              >
                {entry.variants.map((variant, i) => (
                  <button
                    key={variant.label}
                    onClick={() => handleVariantChange(i)}
                    className="px-2.5 py-1.5 text-xs rounded-md text-left transition-colors w-full"
                    style={{
                      backgroundColor: i === activeVariantIndex ? '#ffffff' : 'transparent',
                      color: i === activeVariantIndex ? '#09090b' : '#71717a',
                      border: i === activeVariantIndex ? '1px solid #e4e4e7' : '1px solid transparent',
                      fontWeight: i === activeVariantIndex ? 500 : 400,
                    }}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            )
          )}

          {/* Canvas */}
          <div
            className="flex-1 flex flex-col min-w-0"
            style={{ minHeight: '220px' }}
          >
            {/* Toolbar */}
            <div
              className="flex items-center justify-between px-3 py-1.5 border-b shrink-0"
              style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
            >
              {/* Description */}
              <span
                className="text-[11px] truncate py-1"
                style={{ color: '#a1a1aa' }}
                title={activeDescription ?? ''}
              >
                {activeDescription ?? ''}
              </span>

              <div className="flex items-center gap-1">
              {/* Export JSON */}
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all"
                style={{
                  color: '#a1a1aa',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.backgroundColor = '#f4f4f5' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.backgroundColor = '' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                导出
              </button>

              {/* Background toggle */}
              <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid #e4e4e7' }}>
                <button
                  onClick={() => setPreviewBg('gradient')}
                  className="flex items-center justify-center w-6 h-6 transition-colors"
                  style={{ backgroundColor: previewBg === 'gradient' ? '#f4f4f5' : 'transparent' }}
                  title="渐变背景"
                >
                  <span className="block w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #D5DAEA, #EAEDF3)' }} />
                </button>
                <button
                  onClick={() => setPreviewBg('white')}
                  className="flex items-center justify-center w-6 h-6 transition-colors"
                  style={{ backgroundColor: previewBg === 'white' ? '#f4f4f5' : 'transparent', borderLeft: '1px solid #e4e4e7' }}
                  title="白色背景"
                >
                  <span className="block w-3 h-3 rounded-sm" style={{ backgroundColor: '#fff', border: '1px solid #e4e4e7' }} />
                </button>
              </div>

              {/* Annotation toggle */}
              <button
                onClick={() => setAnnotationMode(v => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-all"
                style={{
                  backgroundColor: annotationMode ? '#fff1f2' : 'transparent',
                  color: annotationMode ? '#f43f5e' : '#a1a1aa',
                  border: `1px solid ${annotationMode ? '#fecdd3' : 'transparent'}`,
                  fontWeight: annotationMode ? 500 : 400,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="10" rx="2" />
                  <path d="M6 7v3M10 7v5M14 7v3M18 7v5" />
                </svg>
                标注
              </button>
              </div>
            </div>

            {/* Preview area */}
            <div
              className="flex-1 flex items-center justify-center overflow-hidden"
              style={{
                background: previewBg === 'white'
                  ? '#ffffff'
                  : 'radial-gradient(41.09% 51.93% at 77% 39.53%, #D5DAEA 0%, #EAEDF3 100%)',
              }}
            >
              {annotationMode ? (
                <AnnotationOverlay slug={entry.slug} editedLayers={editedLayers}>
                  <PreviewComponent
                    slug={entry.slug}
                    variantProps={variantProps}
                    classOverrides={classOverrides}
                  />
                </AnnotationOverlay>
              ) : (
                <PreviewComponent
                  slug={entry.slug}
                  variantProps={variantProps}
                  classOverrides={classOverrides}
                />
              )}
            </div>
          </div>
        </div>

        {/* Style Panel */}
        <div className="style-panel" style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}>
          <StylePanel
            layers={entry.layers}
            defaultLayers={defaultLayers}
            editedLayers={editedLayers}
            layerSubtitles={layerSubtitles}
            onChange={handleLayerChange}
          />
        </div>
      </div>

      {/* Code — always reflects current state */}
      <PlainCodeBlock rawCode={rawCode} />
    </div>
  )
}

function PlainCodeBlock({ rawCode }: { rawCode: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ border: '1px solid #e4e4e7' }}>
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ backgroundColor: '#fafafa', borderColor: '#e4e4e7' }}
      >
        <span className="text-xs" style={{ color: '#a1a1aa' }}>JSX</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all"
          style={{
            backgroundColor: copied ? '#f0fdf4' : '#f4f4f5',
            color: copied ? '#16a34a' : '#71717a',
            border: `1px solid ${copied ? '#bbf7d0' : '#e4e4e7'}`,
          }}
        >
          {copied ? (
            <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Copied</>
          ) : (
            <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy</>
          )}
        </button>
      </div>
      <pre style={{
        backgroundColor: '#f6f8fa', padding: '1rem 1.25rem', overflowX: 'auto',
        fontSize: '13px', lineHeight: '1.6', color: '#24292e', margin: 0,
        fontFamily: "'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace",
      }}>
        <code>{rawCode}</code>
      </pre>
    </div>
  )
}
