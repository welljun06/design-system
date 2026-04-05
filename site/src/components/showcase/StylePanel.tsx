'use client'

import { useState, useRef, useEffect } from 'react'
import type { LayerDef } from '@/lib/registry'
import { getPropertyName, isColorClass, getCssValue, getEditOptions, type EditOption } from '@/lib/classParser'

type StylePanelProps = {
  layers: Record<string, LayerDef>
  originalLayers: Record<string, string[]>
  editedLayers: Record<string, string[]>
  layerSubtitles?: Record<string, string>
  onChange: (layerKey: string, newClasses: string[]) => void
}

export function StylePanel({ layers, originalLayers, editedLayers, layerSubtitles, onChange }: StylePanelProps) {
  const hasChanges = Object.entries(editedLayers).some(
    ([key, classes]) => JSON.stringify(classes) !== JSON.stringify(originalLayers[key] ?? [])
  )

  const handleReset = () => {
    Object.keys(layers).forEach((key) => onChange(key, [...(originalLayers[key] ?? layers[key].classes)]))
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: '#e4e4e7', backgroundColor: '#ffffff' }}
      >
        <span className="text-[11px] font-medium" style={{ color: '#a1a1aa' }}>
          Properties
        </span>
        {hasChanges && (
          <button
            onClick={handleReset}
            className="text-[11px] transition-colors hover:text-[#09090b]"
            style={{ color: '#a1a1aa' }}
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(layers)
          .filter(([, def]) => !def.groupUnder)
          .map(([key, def], i) => (
          <LayerSection
            key={key}
            layerKey={key}
            def={def}
            classes={editedLayers[key] ?? def.classes}
            originalClasses={originalLayers[key] ?? def.classes}
            onChange={(newClasses) => onChange(key, newClasses)}
            isFirst={i === 0}
            subtitle={!def.enumOptions ? layerSubtitles?.[key] : undefined}
            groupedLayers={Object.entries(layers)
              .filter(([, d]) => d.groupUnder === key)
              .map(([k, d]) => ({
                key: k,
                def: d,
                classes: editedLayers[k] ?? d.classes,
                originalClasses: originalLayers[k] ?? d.classes,
              }))}
            onGroupedChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Layer section router ─────────────────────────────────────────────────────

type GroupedLayer = {
  key: string
  def: LayerDef
  classes: string[]
  originalClasses: string[]
}

function LayerSection({
  layerKey,
  def,
  classes,
  originalClasses,
  onChange,
  isFirst,
  subtitle,
  groupedLayers,
  onGroupedChange,
}: {
  layerKey: string
  def: LayerDef
  classes: string[]
  originalClasses: string[]
  onChange: (classes: string[]) => void
  isFirst: boolean
  subtitle?: string
  groupedLayers?: GroupedLayer[]
  onGroupedChange?: (layerKey: string, newClasses: string[]) => void
}) {
  if (def.enumOptions) {
    return (
      <EnumLayerSection
        def={def}
        classes={classes}
        onChange={onChange}
        isFirst={isFirst}
        groupedLayers={groupedLayers}
        onGroupedChange={onGroupedChange}
      />
    )
  }
  return (
    <FreeLayerSection
      def={def}
      classes={classes}
      originalClasses={originalClasses}
      onChange={onChange}
      isFirst={isFirst}
      subtitle={subtitle}
    />
  )
}

// ─── Enum layer: dropdown + read-only class list ──────────────────────────────

function EnumLayerSection({
  def,
  classes,
  onChange,
  isFirst,
  groupedLayers,
  onGroupedChange,
}: {
  def: LayerDef
  classes: string[]
  onChange: (classes: string[]) => void
  isFirst: boolean
  groupedLayers?: GroupedLayer[]
  onGroupedChange?: (layerKey: string, newClasses: string[]) => void
}) {
  const options = def.enumOptions!

  // Find the active option by matching classes (order-insensitive)
  const currentSig = [...classes].sort().join('|')
  const activeOption = options.find(
    (opt) => [...opt.classes].sort().join('|') === currentSig
  )

  return (
    <div style={{ borderTop: isFirst ? 'none' : '1px solid #f4f4f5' }}>
      {/* Layer header — shows label + active enum key */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#c4c4c8' }}>
          {def.label}
        </span>
        {activeOption ? (
          <span className="text-[10px] font-mono" style={{ color: '#a1a1aa' }}>
            {activeOption.key}
          </span>
        ) : (
          <span className="text-[10px] font-mono" style={{ color: '#c4c4c8' }}>
            custom
          </span>
        )}
      </div>

      {/* Mapped classes (editable) */}
      <div className="pb-2" style={{ borderTop: '1px solid #f9f9f9' }}>
        <div className="px-4 pt-2 pb-0.5">
          <span className="text-[9px] uppercase tracking-wider font-medium" style={{ color: '#d4d4d8' }}>
            Mapped values
          </span>
        </div>
        {classes.map((cls) => (
          <EditableEnumRow
            key={cls}
            cls={cls}
            onChange={(newCls) => onChange(classes.map((c) => (c === cls ? newCls : c)))}
          />
        ))}
        {/* Grouped free layers rendered inline */}
        {groupedLayers?.map((gl) =>
          gl.classes.map((cls) => (
            <EditableEnumRow
              key={`${gl.key}-${cls}`}
              cls={cls}
              onChange={(newCls) =>
                onGroupedChange?.(gl.key, gl.classes.map((c) => (c === cls ? newCls : c)))
              }
            />
          ))
        )}
      </div>
    </div>
  )
}

function EditableEnumRow({ cls, onChange }: { cls: string; onChange: (newCls: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(cls)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setEditValue(cls) }, [cls])
  useEffect(() => {
    if (editing && inputRef.current) { inputRef.current.focus(); inputRef.current.select() }
  }, [editing])

  const propertyName = getPropertyName(cls)
  const cssValue = getCssValue(cls)
  const editOptions = getEditOptions(cls)
  const colorSwatch = isColorClass(cls)

  const commitEdit = () => {
    const trimmed = editValue.trim()
    if (trimmed) onChange(trimmed)
    setEditing(false)
  }

  // ── Has predefined options → show a compact select ──
  if (editOptions) {
    // If current value not in options, add a "custom" entry so it still shows
    const inList = editOptions.some((o) => o.value === cls)
    return (
      <div className="flex items-center gap-2 px-4 py-[4px] group">
        <span
          className="text-[11px] shrink-0 truncate"
          style={{ width: '80px', color: '#a1a1aa' }}
          title={propertyName}
        >
          {propertyName}
        </span>
        <div className="flex-1 flex items-center gap-1.5 min-w-0">
          <div className="relative flex-1 min-w-0">
            <select
              value={cls}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-[22px] text-[11px] font-mono rounded pl-1.5 pr-5 appearance-none outline-none transition-colors"
              style={{
                border: '1px solid #e4e4e7',
                color: '#52525b',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#a1a1aa' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e4e4e7' }}
            >
              {!inList && <option value={cls}>{cls} (custom)</option>}
              {editOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" style={{ color: '#a1a1aa' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 2.5L4 5.5L7 2.5" />
              </svg>
            </span>
          </div>
          {cssValue && (
            <span className="text-[10px] font-mono shrink-0 tabular-nums" style={{ color: '#c4c4c8', minWidth: '28px', textAlign: 'right' }}>
              {cssValue}
            </span>
          )}
        </div>
      </div>
    )
  }

  // ── No predefined options → click-to-edit text input ──
  return (
    <div className="flex items-center gap-2 px-4 py-[4px] group">
      <span
        className="text-[11px] shrink-0 truncate"
        style={{ width: '80px', color: '#a1a1aa' }}
        title={propertyName}
      >
        {propertyName}
      </span>
      <div className="flex-1 flex items-center gap-1.5 min-w-0">
        {colorSwatch && (
          <span
            className="shrink-0 w-3 h-3 rounded-sm border"
            style={{ backgroundColor: colorSwatch, borderColor: '#d4d4d8' }}
          />
        )}
        {editing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit()
              if (e.key === 'Escape') { setEditValue(cls); setEditing(false) }
            }}
            className="flex-1 h-[22px] rounded px-1.5 text-[11px] font-mono outline-none"
            style={{ border: '1px solid #3b82f6', color: '#09090b', backgroundColor: '#ffffff' }}
          />
        ) : (
          <button
            onClick={() => { setEditValue(cls); setEditing(true) }}
            className="flex-1 text-left text-[11px] font-mono truncate"
            style={{ color: '#52525b' }}
            title={cls}
          >
            {cls}
          </button>
        )}
        {cssValue && !editing && (
          <span className="text-[10px] font-mono shrink-0 tabular-nums" style={{ color: '#c4c4c8', minWidth: '28px', textAlign: 'right' }}>
            {cssValue}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Free layer: editable chip list ──────────────────────────────────────────

function FreeLayerSection({
  def,
  classes,
  originalClasses,
  onChange,
  isFirst,
  subtitle,
}: {
  def: LayerDef
  classes: string[]
  originalClasses: string[]
  onChange: (classes: string[]) => void
  isFirst: boolean
  subtitle?: string
}) {
  const [adding, setAdding] = useState(false)
  const [addValue, setAddValue] = useState('')
  const addInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (adding && addInputRef.current) addInputRef.current.focus()
  }, [adding])

  const handleAddSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = addValue.trim()
    if (trimmed && !classes.includes(trimmed)) onChange([...classes, trimmed])
    setAddValue('')
    setAdding(false)
  }

  const handleRemove = (cls: string) => onChange(classes.filter((c) => c !== cls))

  const handleEdit = (oldCls: string, newCls: string) => {
    const trimmed = newCls.trim()
    if (!trimmed) { handleRemove(oldCls); return }
    onChange(classes.map((c) => (c === oldCls ? trimmed : c)))
  }

  return (
    <div style={{ borderTop: isFirst ? 'none' : '1px solid #f4f4f5' }}>
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#c4c4c8' }}>
          {def.label}
        </span>
        {subtitle && (
          <span className="text-[10px] font-mono" style={{ color: '#a1a1aa' }}>
            {subtitle}
          </span>
        )}
      </div>

      <div>
        {classes
          .filter((cls) => {
            if (!def.editableClasses) return true
            // Show if class is in editable list, or if it's a user modification (not in original hidden set)
            const hiddenOriginals = def.classes.filter((c) => !def.editableClasses!.includes(c))
            return !hiddenOriginals.includes(cls)
          })
          .map((cls) => (
          <PropertyRow
            key={cls}
            cls={cls}
            isModified={!originalClasses.includes(cls)}
            onEdit={(newVal) => handleEdit(cls, newVal)}
            onRemove={() => handleRemove(cls)}
          />
        ))}

        {!def.editableClasses && (adding ? (
          <form onSubmit={handleAddSubmit} className="flex items-center gap-2 px-4 py-1.5">
            <span className="text-[11px] shrink-0" style={{ width: '90px', color: '#c4c4c8' }}>
              New class
            </span>
            <input
              ref={addInputRef}
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              onBlur={() => handleAddSubmit()}
              onKeyDown={(e) => { if (e.key === 'Escape') { setAdding(false); setAddValue('') } }}
              className="flex-1 h-6 rounded px-2 text-[11px] font-mono outline-none"
              style={{ backgroundColor: '#f4f4f5', border: '1px solid #3b82f6', color: '#09090b' }}
              placeholder="e.g. px-6"
            />
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 w-full px-4 py-1.5 text-[11px] transition-colors text-left"
            style={{ color: '#c4c4c8' }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 1v8M1 5h8" />
            </svg>
            Add property
          </button>
        ))}
      </div>
    </div>
  )
}

function PropertyRow({
  cls,
  isModified,
  onEdit,
  onRemove,
}: {
  cls: string
  isModified: boolean
  onEdit: (newVal: string) => void
  onRemove: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(cls)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const commitEdit = () => { onEdit(editValue); setEditing(false) }
  const propertyName = getPropertyName(cls)
  const cssValue = getCssValue(cls)
  const editOptions: EditOption[] | null = getEditOptions(cls)
  const colorSwatch = isColorClass(cls)

  // Has predefined options → compact select (same as EditableEnumRow)
  if (editOptions) {
    const inList = editOptions.some((o) => o.value === cls)
    return (
      <div
        className="group flex items-center gap-2 px-4 py-[4px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="text-[11px] shrink-0 truncate" style={{ width: '90px', color: '#a1a1aa' }} title={propertyName}>
          {propertyName}
        </span>
        <div className="flex-1 flex items-center gap-1.5 min-w-0">
          <div className="relative flex-1 min-w-0">
            <select
              value={cls}
              onChange={(e) => onEdit(e.target.value)}
              className="w-full h-[22px] text-[11px] font-mono rounded pl-1.5 pr-5 appearance-none outline-none transition-colors"
              style={{ border: '1px solid #e4e4e7', color: '#52525b', backgroundColor: '#f9f9f9', cursor: 'pointer' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#a1a1aa' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e4e4e7' }}
            >
              {!inList && <option value={cls}>{cls} (custom)</option>}
              {editOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" style={{ color: '#a1a1aa' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 2.5L4 5.5L7 2.5" />
              </svg>
            </span>
          </div>
          {cssValue && (
            <span className="text-[10px] font-mono shrink-0 tabular-nums" style={{ color: '#c4c4c8', minWidth: '28px', textAlign: 'right' }}>
              {cssValue}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="group flex items-center gap-2 px-4 py-[5px] transition-colors"
      style={{ backgroundColor: hovered ? '#f4f4f5' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="text-[11px] shrink-0 truncate"
        style={{ width: '90px', color: '#a1a1aa' }}
        title={propertyName}
      >
        {propertyName}
      </span>

      <div className="flex-1 flex items-center gap-1.5 min-w-0">
        {colorSwatch && (
          <span
            className="shrink-0 w-3 h-3 rounded-sm border"
            style={{ backgroundColor: colorSwatch, borderColor: '#d4d4d8' }}
          />
        )}

        {editing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit()
              if (e.key === 'Escape') { setEditValue(cls); setEditing(false) }
            }}
            className="w-full h-5 rounded px-1.5 text-[11px] font-mono outline-none"
            style={{ backgroundColor: '#ffffff', border: '1px solid #3b82f6', color: '#09090b' }}
          />
        ) : (
          <button
            onClick={() => { setEditValue(cls); setEditing(true) }}
            className="flex-1 text-left text-[11px] font-mono truncate transition-colors"
            style={{ color: isModified ? '#7c3aed' : '#52525b' }}
            title={cls}
          >
            {cls}
          </button>
        )}
      </div>

      <button
        onClick={onRemove}
        className="shrink-0 flex items-center justify-center w-4 h-4 rounded transition-all opacity-0 group-hover:opacity-100"
        style={{ color: '#a1a1aa' }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l6 6M7 1L1 7" />
        </svg>
      </button>
    </div>
  )
}
