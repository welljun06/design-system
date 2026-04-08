'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/ui/Button'
import { Checkbox } from '@/ui/Checkbox'
import { Input } from '@/ui/Input'
import { Select } from '@/ui/Select'
import type { SelectOption } from '@/ui/Select'

export type FilterProps = {
  searchPlaceholder: string
  filters: [string, string]
  filterOptions: [SelectOption[], SelectOption[]]
  ownershipLabel: string
  actionLabel: string
}

export function Filter({
  searchPlaceholder,
  filters,
  filterOptions,
  ownershipLabel,
  actionLabel,
}: FilterProps) {
  const [ownedOnly, setOwnedOnly] = useState(false)

  return (
    <div className="relative z-[1] flex h-9 items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <div className="relative w-[200px]">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#a1a1aa]"
            strokeWidth={1.8}
          />
          <Input
            size="lg"
            placeholder={searchPlaceholder}
            classOverrides={{
              base: 'w-full border outline-none transition-all',
              size: 'py-[7px] pl-9 pr-3 text-sm rounded-full',
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            prefixLabel={filters[0]}
            options={filterOptions[0]}
            clearable
            size="lg"
            shape="full"
          />
          <Select
            prefixLabel={filters[1]}
            options={filterOptions[1]}
            clearable
            size="lg"
            shape="full"
          />
        </div>

        <div className="inline-flex h-9 items-center rounded-full border border-[rgba(45,66,107,0.12)] bg-[rgba(255,255,255,0.5)] px-4 py-2">
          <Checkbox
            mode="single"
            label={ownershipLabel}
            checked={ownedOnly}
            onCheckedChange={setOwnedOnly}
            classOverrides={{
              label: 'whitespace-nowrap text-sm leading-5 font-semibold text-[rgba(34,39,39,0.8)]',
            }}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <Button
          variant="glass"
          size="lg"
          radius="full"
          iconName="plus"
          label={actionLabel}
        />
      </div>
    </div>
  )
}
