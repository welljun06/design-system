'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// Project components
import { Input } from '@/ui/Input'
import { Select } from '@/ui/Select'
import { Textarea } from '@/ui/Textarea'
import { Checkbox } from '@/ui/Checkbox'
import { RadioGroup } from '@/ui/RadioGroup'
import { Switch } from '@/ui/Switch'
import { Slider } from '@/ui/Slider'
import { Upload } from '@/ui/Upload'
import { InputGroup } from '@/ui/InputGroup'

export type FormLayout = 'top' | 'left'
export type FormFieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'slider'
  | 'upload'
  | 'inputgroup'
  | 'taginput'

type FormProps = {
  layout?: FormLayout
  fieldType?: FormFieldType
  classOverrides?: Record<string, string>
}

const needsFieldWrapperTypes = new Set(['input', 'textarea', 'select', 'inputgroup', 'taginput'])

export function Form({ layout = 'top', fieldType = 'input', classOverrides }: FormProps) {
  const labelClass = classOverrides?.label ?? 'text-sm font-semibold text-[rgba(28,31,35,0.8)] leading-5'
  const layoutClass = classOverrides?.layout ?? (layout === 'left' ? 'flex items-start' : 'flex flex-col gap-1')
  const needsWrapper = needsFieldWrapperTypes.has(fieldType)

  const renderField = () => {
    switch (fieldType) {
      case 'input': return <Input placeholder="请输入" />
      case 'textarea': return <Textarea placeholder="请输入" />
      case 'select': return <Select />
      case 'checkbox': return <Checkbox />
      case 'radio': return <RadioGroup />
      case 'switch': return <Switch />
      case 'slider': return <Slider />
      case 'upload': return <Upload />
      case 'inputgroup': return <InputGroup />
      case 'taginput': return <Input placeholder="请输入" />
      default: return <Input placeholder="请输入" />
    }
  }

  if (layout === 'left') {
    return (
      <div className={cn(layoutClass, needsWrapper ? 'w-[500px]' : '')}>
        <div className="shrink-0 w-[120px] pr-4 py-2">
          <span className={labelClass}>字段标题</span>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {renderField()}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(layoutClass, needsWrapper ? 'w-[300px]' : '')}>
      <span className={labelClass}>字段标题</span>
      <div className="flex flex-col gap-1">
        {renderField()}
      </div>
    </div>
  )
}
