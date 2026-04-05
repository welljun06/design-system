import React from 'react'

type StatusType = '已发布' | '未发布' | '草稿' | '审核中'

type StatusBadgeProps = {
  status?: StatusType
  classOverrides?: Record<string, string>
}

const defaultClasses = {
  base: 'rounded-md px-2 py-0.5 text-xs font-medium',
  '已发布': 'bg-green-100 text-green-700',
  '未发布': 'bg-gray-100 text-gray-600',
  '草稿': 'bg-yellow-100 text-yellow-700',
  '审核中': 'bg-blue-100 text-blue-600',
}

export function StatusBadge({ status = '已发布', classOverrides }: StatusBadgeProps) {
  const base = classOverrides?.base ?? defaultClasses.base
  const statusClass = classOverrides?.status ?? defaultClasses[status]

  return (
    <span className={`${base} ${statusClass}`}>
      {status}
    </span>
  )
}
