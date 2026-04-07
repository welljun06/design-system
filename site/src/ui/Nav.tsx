'use client'

import React, { useState } from 'react'
import {
  BookOpen,
  Bot,
  Boxes,
  ChevronUp,
  ClipboardCheck,
  Home,
  Inbox,
  Plus,
  Rocket,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/Button'
import { BusinessSelector } from '@/ui/BusinessSelector'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type NavProps = {
  classOverrides?: Record<string, string>
}

function NavLogo() {
  return (
    <svg width="108" height="19" viewBox="0 0 108 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[19px] w-[108px] shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M38.2991 10.9893L40.0598 10.7842V12.4629L38.2991 12.667V16.833H36.3782V12.8887L30.3811 13.5879L30.3616 13.4629L30.1467 12.041L30.1262 11.9072L30.261 11.8916L36.3782 11.1934V1.64258H38.2991V10.9893ZM28.7249 4.55566H30.4846V6.18457H28.7278V8.77832L30.4534 8.48926V10.1504L30.3469 10.1699L28.7278 10.4736V14.7939L28.7258 14.9023C28.7079 15.4351 28.556 15.8634 28.2502 16.1719C27.9456 16.4791 27.5051 16.65 26.9446 16.7051L26.8313 16.7148C26.3385 16.7479 25.8189 16.7159 25.3206 16.6221L25.2405 16.6074L25.219 16.5283L24.8 15.0107L25.0002 15.043C25.4486 15.1135 25.8904 15.1336 26.3215 15.1045H26.3225L26.3782 15.0986C26.5074 15.0796 26.6314 15.023 26.7258 14.9297C26.8319 14.8246 26.9094 14.6645 26.9094 14.4355V10.8057L24.9124 11.165L24.8899 11.0352L24.6243 9.45117L26.9075 9.07715V6.18457H25.0374L24.8792 4.55566H26.9075V1.64258H28.7249V4.55566ZM53.8547 9.17383C54.2641 9.17383 54.5963 9.27499 54.8254 9.49805C55.0552 9.72183 55.1604 10.0474 55.1604 10.4482V15.168L55.1555 15.3154C55.133 15.6522 55.0308 15.9268 54.8303 16.1221C54.6019 16.3446 54.2685 16.4424 53.8547 16.4424H43.7981C43.3808 16.4423 43.0473 16.3477 42.8196 16.126C42.6197 15.9313 42.5202 15.6565 42.4983 15.3174L42.4934 15.168V10.4482C42.4934 10.0434 42.5945 9.71725 42.8235 9.49414C43.0519 9.27174 43.3845 9.17388 43.7981 9.17383H53.8547ZM69.1917 16.0391L69.2502 16.2119H66.9407L66.9114 16.1201L65.8967 12.9062H60.4846L59.4895 16.1201L59.4612 16.2119H57.1526L61.9163 2.5498H64.5823L69.1917 16.0391ZM73.3342 16.2119H71.259V2.5498H73.3342V16.2119ZM44.4133 14.5547L44.4143 14.5898C44.43 14.7627 44.5604 14.8817 44.7463 14.8818H52.9055L52.9426 14.8799C53.1207 14.8642 53.2392 14.7344 53.2395 14.5547V13.4775H44.4133V14.5547ZM44.7463 10.7324C44.5566 10.7325 44.4134 10.8773 44.4133 11.0605V12.0703H53.2395V11.0605L53.2375 11.0264C53.2221 10.8706 53.1013 10.7498 52.9407 10.7344L52.9055 10.7324H44.7463ZM61.0276 11.0859H65.3733L63.2112 4.17773L61.0276 11.0859ZM31.554 6.66016C32.5453 6.90029 33.9003 7.25626 35.1917 7.69141L35.2805 7.72168V9.61133L35.1067 9.55176C33.8192 9.1089 32.4692 8.74013 31.4915 8.49219L31.3928 8.4668V6.62109L31.554 6.66016ZM46.5022 6.39648H51.2014L51.6672 4.96484H53.6682L53.2014 6.39648H56.4543V7.95703H41.3127L41.1545 6.39648H44.5383L44.0715 4.96484H46.054L46.5022 6.39648ZM31.5569 2.7959C32.7648 3.10977 33.9863 3.4839 35.1926 3.90723L35.2805 3.93848V5.77734L35.1067 5.71777C33.9069 5.30045 32.6922 4.93231 31.4915 4.62402L31.3928 4.59863V2.75391L31.5569 2.7959ZM49.7786 2.88672H55.5393V4.44531H42.2092L42.051 2.88672H47.8225V1.64258H49.7786V2.88672Z" fill="black" />
      <path d="M103.727 3.5804H107.524V5.35142H101.513V7.29273H105.464C105.816 7.29273 106.1 7.40058 106.315 7.61628C106.531 7.83198 106.645 8.12147 106.656 8.48476C106.747 10.7666 106.747 12.9407 106.656 15.0069C106.633 15.4496 106.463 15.8186 106.145 16.1137C105.839 16.3976 105.453 16.5565 104.987 16.5906C103.931 16.6814 102.864 16.6246 101.786 16.4203L101.411 14.6152C102.319 14.8082 103.199 14.8763 104.05 14.8195C104.425 14.7855 104.629 14.5982 104.664 14.2576C104.777 12.7477 104.777 11.1413 104.664 9.43838C104.641 9.18862 104.516 9.06374 104.289 9.06374H101.479C101.4 10.8461 101.07 12.3844 100.491 13.6786C99.8443 15.1317 98.8453 16.3465 97.4943 17.3228L97.0515 15.1942C98.7204 13.6502 99.5264 11.2264 99.4697 7.9228V5.35142H97.7157L97.5454 3.5804H101.683V1.62207H103.727V3.5804ZM95.9106 12.4185L97.6305 12.0438V13.7467L92.3686 15.0409L91.9599 13.304L93.9012 12.8782V7.30976H92.2664L92.0961 5.53874H93.9012V1.62207H95.9106V5.53874H97.5113V7.30976H95.9106V12.4185Z" fill="black" />
      <path d="M84.3311 14.3255H90.6659V16.0965H76.1061L75.9358 14.3255H82.2195V4.84035H76.9405L76.7702 3.06934H89.8996V4.84035H84.3311V14.3255Z" fill="black" />
      <path d="M4.64629 7.23566C4.64629 8.51889 3.6058 9.55933 2.32369 9.55933C1.04046 9.55933 0 8.51889 0 7.23566C0 5.95243 1.04046 4.91309 2.32369 4.91309C3.6058 4.91309 4.64629 5.95243 4.64629 7.23566Z" fill="black" />
      <path d="M4.64629 11.8569C4.64629 13.1401 3.6058 14.1795 2.32369 14.1795C1.04046 14.1795 0 13.1401 0 11.8569C0 10.5737 1.04046 9.5332 2.32369 9.5332C3.6058 9.5332 4.64629 10.5737 4.64629 11.8569Z" fill="black" />
      <path d="M4.64629 7.23566C4.64629 8.51889 3.6058 9.55933 2.32369 9.55933C1.04046 9.55933 0 8.51889 0 7.23566C0 5.95243 1.04046 4.91309 2.32369 4.91309C3.6058 4.91309 4.64629 5.95243 4.64629 7.23566Z" fill="black" />
      <path d="M6.52691 4.9923C5.61958 5.89963 4.21325 5.96452 3.38648 5.13775C2.55859 4.30986 2.62348 2.90355 3.5308 1.99623C4.43813 1.0889 5.84446 1.02401 6.67123 1.8519C7.49912 2.67867 7.43423 4.08498 6.52691 4.9923Z" fill="black" />
      <path d="M6.52691 17.0939C5.61958 18.0012 4.21325 18.0661 3.38648 17.2382C2.55859 16.4114 2.62348 15.0051 3.5308 14.0978C4.43813 13.1905 5.84446 13.1256 6.67123 13.9535C7.49912 14.7802 7.43423 16.1865 6.52691 17.0939Z" fill="black" />
      <path d="M16.2488 6.88788C17.1562 5.98055 18.0344 5.38761 18.2112 5.56438C18.3879 5.74114 17.795 6.61938 16.8877 7.52671C15.9803 8.43403 15.1021 9.02586 14.9253 8.85021C14.7497 8.67344 15.3415 7.7952 16.2488 6.88788Z" fill="black" />
      <path d="M16.3845 11.6724C17.2918 10.7651 18.1096 10.1118 18.2114 10.2136C18.3132 10.3165 17.661 11.1343 16.7536 12.0416C15.8463 12.949 15.0285 13.6012 14.9256 13.4994C14.8238 13.3976 15.4771 12.5798 16.3845 11.6724Z" fill="black" />
      <path d="M13.055 2.66021C13.9623 1.75288 15.0599 1.3792 15.5063 1.82447C15.9515 2.27086 15.5779 3.36838 14.6706 4.27571C13.7633 5.18303 12.6668 5.55671 12.2204 5.11032C11.774 4.66393 12.1477 3.56753 13.055 2.66021Z" fill="black" />
      <path d="M13.1778 14.8979C14.0851 13.9906 15.1267 13.5621 15.5059 13.9402C15.8841 14.3184 15.4556 15.3611 14.5483 16.2684C13.6409 17.1757 12.5982 17.6042 12.2201 17.2261C11.8419 16.8468 12.2704 15.8052 13.1778 14.8979Z" fill="black" />
      <path d="M8.33929 15.9313C9.24661 15.0239 10.4717 14.7789 11.0758 15.3831C11.6811 15.9872 11.4361 17.2134 10.5288 18.1207C9.62143 19.028 8.39523 19.273 7.7911 18.6689C7.18584 18.0636 7.43196 16.8386 8.33929 15.9313Z" fill="black" />
      <path d="M8.25099 0.831134C9.15831 -0.0761893 10.4349 -0.270856 11.1028 0.39705C11.7707 1.06496 11.576 2.34147 10.6687 3.2488C9.76137 4.15612 8.48482 4.34967 7.81692 3.68288C7.14901 3.01498 7.34366 1.73846 8.25099 0.831134Z" fill="black" />
    </svg>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  className,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  className: string
}) {
  return (
    <div className={className}>
      <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
      <span className={cn('text-sm leading-5', active ? 'font-semibold' : 'font-medium')}>{label}</span>
    </div>
  )
}

export function Nav({ classOverrides }: NavProps) {
  const [selectedBusiness, setSelectedBusiness] = useState('个人空间')
  const [selectorOpen, setSelectorOpen] = useState(false)
  const container = classOverrides?.container ?? 'w-[220px] h-[720px] rounded-[24px] bg-[#f2f2f7] pt-6 pb-2'
  const titleRow = classOverrides?.titleRow ?? 'h-8 px-4'
  const variantWorkspaceClass = 'text-[#71717a] hover:bg-[rgba(83,96,143,0.07)]'
  const workspace = classOverrides?.workspace ?? variantWorkspaceClass
  const createButton = classOverrides?.createButton ?? 'rounded-full bg-black px-4 py-3 text-white'
  const sectionTitle = classOverrides?.sectionTitle ?? 'px-3 py-1.5 text-xs leading-4 text-[rgba(28,31,35,0.6)]'
  const activeItem = classOverrides?.activeItem ?? 'rounded-full px-3 py-1 text-[#1c1f23] bg-[#53608f12]'
  const item = classOverrides?.item ?? 'rounded-full px-3 py-1 text-[#1c1f23]'
  const subItem = classOverrides?.subItem ?? 'rounded-full px-3 py-1 text-[#1c1f23]'

  return (
    <aside className={cn('flex flex-col justify-between overflow-hidden', container)}>
      <div className="flex flex-1 flex-col gap-6">
        <div className={cn('flex items-center', titleRow)}>
          <NavLogo />
          <div className="ml-2 mr-1 h-3 w-px shrink-0 bg-[#c6cacd]" />
          <div className="flex items-center gap-1">
            <Popover open={selectorOpen} onOpenChange={setSelectorOpen}>
              <PopoverTrigger asChild>
                <div aria-haspopup="menu">
                  <Button
                    variant="ghost-gray"
                    size="sm"
                    radius="rounded"
                    iconName="chevron-down"
                    label={selectedBusiness}
                    classOverrides={{
                      base: 'cursor-pointer transition-all active:scale-95 inline-flex flex-row-reverse items-center justify-center whitespace-nowrap font-medium',
                      variant: workspace,
                    }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                side="bottom"
                sideOffset={10}
                className="w-auto border-none bg-transparent p-0 shadow-none"
              >
                <BusinessSelector
                  selectedLabel={selectedBusiness}
                  onSelect={(label) => {
                    setSelectedBusiness(label)
                    setSelectorOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="px-3">
          <div className="rounded-full bg-black p-[1px]">
            <button className={cn('flex w-full items-center gap-2 rounded-full', createButton)}>
              <Plus className="size-[18px]" strokeWidth={2.4} />
              <span className="text-sm font-medium leading-[22px]">AI创作</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-3">
          <div>
            <div className={sectionTitle}>管理</div>
            <div className="mt-1 flex flex-col gap-2">
              <NavItem icon={<BookOpen className="size-4" strokeWidth={2} />} label="Skills" active className={cn('flex items-center gap-[6px]', activeItem)} />
              <div className="flex flex-col gap-1">
                <div className={cn('flex items-center justify-between', item)}>
                  <div className="flex items-center gap-[6px]">
                    <Inbox className="size-4" strokeWidth={2} />
                    <span className="text-sm font-medium leading-5">资源库</span>
                  </div>
                  <ChevronUp className="size-3 text-[#1c1f23]" strokeWidth={2.2} />
                </div>
                <NavItem icon={<Boxes className="size-4 opacity-0" strokeWidth={2} />} label="模型库" className={cn('flex items-center gap-[6px]', subItem)} />
                <NavItem icon={<Boxes className="size-4 opacity-0" strokeWidth={2} />} label="工具箱" className={cn('flex items-center gap-[6px]', subItem)} />
                <NavItem icon={<Boxes className="size-4 opacity-0" strokeWidth={2} />} label="知识库" className={cn('flex items-center gap-[6px]', subItem)} />
              </div>
              <NavItem icon={<Boxes className="size-4" strokeWidth={2} />} label="发布器" active className={cn('flex items-center gap-[6px]', activeItem)} />
              <NavItem icon={<ClipboardCheck className="size-4" strokeWidth={2} />} label="评估器" className={cn('flex items-center gap-[6px]', item)} />
            </div>
          </div>

          <div>
            <div className={sectionTitle}>灵感</div>
            <div className="mt-1 flex flex-col gap-2">
              <NavItem icon={<Home className="size-4" strokeWidth={2} />} label="灵感广场" active className={cn('flex items-center gap-[6px]', activeItem)} />
              <NavItem icon={<Bot className="size-4" strokeWidth={2} />} label="智能体" active className={cn('flex items-center gap-[6px]', activeItem)} />
            </div>
          </div>

          <div>
            <div className={sectionTitle}>最近</div>
            <div className="mt-1 flex flex-col gap-2">
              <NavItem icon={<Rocket className="size-4" strokeWidth={2} />} label="AI 应用" className={cn('flex items-center gap-[6px]', item)} />
              <NavItem icon={<Wrench className="size-4" strokeWidth={2} />} label="工具工作流" className={cn('flex items-center gap-[6px]', item)} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 pb-2">
        <div className="rounded-2xl bg-white/70 p-3">
          <div className="text-xs leading-4 text-[rgba(28,31,35,0.6)]">最近访问</div>
          <div className="mt-2 text-sm font-medium leading-5 text-[#1c1f23]">编辑器工作台</div>
        </div>
      </div>
    </aside>
  )
}
