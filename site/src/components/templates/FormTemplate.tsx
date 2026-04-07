'use client'

import React from 'react'
import { Button } from '@/ui/Button'
import { Form } from '@/ui/Form'
import { Card } from '@/ui/Card'
import { Tag } from '@/ui/Tag'

export function FormTemplate() {
  return (
    <div className="w-full max-w-lg">
      <Card>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1c1f23]">创建新项目</h2>
          <p className="text-sm text-[#71717a] mt-1">填写以下信息来创建一个新的项目配置。</p>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          <Form fieldType="input" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />
          <Form fieldType="textarea" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />
          <Form fieldType="select" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />
          <Form fieldType="checkbox" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />
          <Form fieldType="radio" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />
          <Form fieldType="switch" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />
          <Form fieldType="slider" classOverrides={{ label: 'text-sm font-medium text-[#1c1f23] leading-5' }} />

          {/* Tags (still standalone) */}
          <div>
            <label className="block text-sm font-medium text-[#1c1f23] mb-1">标签</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag color="blue" type="light" />
              <Tag color="green" type="light" />
              <Tag color="violet" type="light" />
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #e4e4e7' }} />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="outline-gray" label="取消" iconName="none" />
            <Button variant="solid-black" label="创建项目" iconName="check" />
          </div>
        </div>
      </Card>
    </div>
  )
}
