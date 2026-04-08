'use client'

import { useState } from 'react'
import {
  Sparkles,
} from 'lucide-react'
import type { MenuKey } from '@/ui/Nav'
import { Nav } from '@/ui/Nav'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Tag } from '@/ui/Tag'
import { Textarea } from '@/ui/Textarea'

type SuggestionItem = {
  tag: string
  title: string
  description: string
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    tag: '品牌宣传',
    title: '帮我写一版新品发布海报文案',
    description: '适用于新品发布、卖点提炼和视觉海报首屏文案输出。',
  },
  {
    tag: '短视频脚本',
    title: '围绕产品亮点生成 30 秒口播脚本',
    description: '适用于口播结构拆解、节奏控制和转化导向表达。',
  },
  {
    tag: 'Prompt 优化',
    title: '把下面的需求整理成更专业的 AI 提示词',
    description: '适用于多轮创作前的指令润色、约束补全和格式整理。',
  },
]

export function AICreateTemplate() {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>('toolbox')

  return (
    <div className="ai-create-scene relative flex h-[900px] w-full items-start overflow-hidden rounded-[24px] bg-[#fbfbfd] p-2">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ai-create-noise" />
        <div className="ai-create-sunbeam ai-create-sunbeam-top" />
        <div className="ai-create-sunbeam ai-create-sunbeam-bottom" />
        <div className="ai-create-blind-shadow ai-create-blind-shadow-primary" />
        <div className="ai-create-blind-shadow ai-create-blind-shadow-secondary" />
        <div className="ai-create-blind-highlight" />
        <div className="ai-create-leaf-pass ai-create-leaf-pass-one" />
        <div className="ai-create-leaf-pass ai-create-leaf-pass-two" />
      </div>
      <div className="pointer-events-none absolute right-[-120px] top-[-160px] h-[420px] w-[540px] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(121,211,255,0.16)_0%,rgba(121,211,255,0.08)_28%,rgba(255,255,255,0)_72%)] blur-[78px]" />
      <div className="pointer-events-none absolute left-[320px] bottom-[-220px] h-[360px] w-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,232,166,0.14)_0%,rgba(255,232,166,0.06)_28%,rgba(255,255,255,0)_72%)] blur-[88px]" />

      <div className="h-full w-[220px] shrink-0">
        <Nav
          selectedMenu={selectedMenu}
          onSelectedMenuChange={setSelectedMenu}
          classOverrides={{
            container: 'w-[220px] h-full rounded-[24px] bg-[#f2f2f7] pt-6 pb-2',
          }}
        />
      </div>

      <section className="relative z-[1] flex min-w-0 flex-1 flex-col px-10 pb-8 pt-7">
        <div className="mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-start pt-20">
          <div className="mb-4">
            <Tag color="white" type="ghost" shape="circle" size="md">
              AI Creation
            </Tag>
          </div>

          <div className="text-center">
            <h2
              className="ai-create-slogan mx-auto max-w-[880px] text-[#171814]"
              style={{
                fontFamily:
                  '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Times New Roman", serif',
              }}
            >
              <span>Create </span>
              <span className="ai-create-slogan-emphasis">Next</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] text-sm leading-6 text-[rgba(28,31,35,0.54)]">
              输入一句意图，开始生成文案、脚本或提示词。
            </p>
          </div>

          <Card
            variant="glass"
            classOverrides={{
              base: 'mt-12 w-full max-w-[720px] rounded-[28px] p-[1px]',
              variant:
                'border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.66)_100%)] shadow-[0_18px_80px_-36px_rgba(83,96,143,0.35),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl',
            }}
          >
            <div className="rounded-[27px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,249,252,0.92)_100%)] p-4">
              <div className="rounded-[24px] border border-[rgba(45,66,107,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(246,248,252,0.82)_100%)] px-6 pb-4 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[rgba(28,31,35,0.34)]">
                  <Sparkles className="size-3.5" strokeWidth={2} />
                  <span>Create</span>
                </div>
                <Textarea
                  placeholder="例如：为春季新品写一版更克制的海报文案。"
                  variant="glass"
                  classOverrides={{
                    variant:
                      'border-transparent bg-transparent text-[#1c1f23] placeholder:text-[rgba(28,31,35,0.32)] focus:border-transparent focus-visible:ring-0 shadow-none backdrop-blur-none',
                    size:
                      'min-h-[52px] resize-none rounded-none px-0 py-0 text-[16px] leading-7 font-normal',
                  }}
                />

                <div className="mt-4 flex items-center justify-between">
                  <Button variant="glass" content="icon" size="lg" radius="full" iconName="paperclip" />
                  <Button variant="ai" content="icon" size="lg" radius="full" iconName="send" />
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8 w-full max-w-[920px]">
            <div className="mb-3">
              <p className="text-sm font-semibold text-[#1c1f23]">推荐意图</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {SUGGESTIONS.map((item) => (
                <Card
                  key={item.title}
                  variant="default"
                  classOverrides={{
                    base: 'rounded-[22px] p-4',
                    variant:
                      'border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(248,249,252,0.96)_100%)] shadow-[0_12px_36px_-30px_rgba(83,96,143,0.35)] backdrop-blur-sm',
                  }}
                >
                  <Tag color="white" type="ghost" shape="circle" size="sm">
                    {item.tag}
                  </Tag>
                  <h3 className="mt-3 text-sm font-semibold leading-6 text-[#1c1f23]">{item.title}</h3>
                  <div className="mt-4">
                    <Button variant="ghost-black" size="sm" radius="full" iconName="none" label="用这个" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ai-create-noise {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image:
            radial-gradient(rgba(24, 28, 34, 0.1) 0.5px, transparent 0.7px),
            radial-gradient(rgba(255, 255, 255, 0.22) 0.35px, transparent 0.55px);
          background-position: 0 0, 14px 16px;
          background-size: 18px 18px, 22px 22px;
          mix-blend-mode: multiply;
          animation: aiCreateNoiseDrift 12s linear infinite;
        }

        .ai-create-slogan {
          font-size: 60px;
          line-height: 0.98;
          letter-spacing: -0.055em;
          text-wrap: balance;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.75);
        }

        .ai-create-slogan-emphasis {
          font-style: italic;
          font-weight: 400;
        }

        .ai-create-sunbeam {
          position: absolute;
          border-radius: 9999px;
          filter: blur(28px);
          mix-blend-mode: soft-light;
          animation: aiCreateSunDrift 24s ease-in-out infinite alternate;
        }

        .ai-create-sunbeam-top {
          top: -12%;
          right: -2%;
          width: 820px;
          height: 480px;
          background:
            radial-gradient(circle at 28% 28%, rgba(248, 239, 212, 0.9) 0%, rgba(248, 239, 212, 0.34) 24%, rgba(248, 239, 212, 0) 62%),
            radial-gradient(circle at 68% 38%, rgba(255, 255, 255, 0.74) 0%, rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0) 60%);
        }

        .ai-create-sunbeam-bottom {
          left: 8%;
          bottom: -4%;
          width: 560px;
          height: 280px;
          background: radial-gradient(circle at 50% 50%, rgba(248, 232, 194, 0.18) 0%, rgba(248, 232, 194, 0.05) 42%, rgba(248, 232, 194, 0) 74%);
          animation-duration: 28s;
        }

        .ai-create-blind-shadow {
          position: absolute;
          inset: auto;
          mix-blend-mode: multiply;
          will-change: transform, opacity;
        }

        .ai-create-blind-shadow-primary {
          top: -14%;
          right: -6%;
          width: 1040px;
          height: 620px;
          opacity: 0.18;
          transform: rotate(-24deg);
          background:
            repeating-linear-gradient(
              90deg,
              rgba(122, 113, 96, 0.24) 0 44px,
              rgba(122, 113, 96, 0.045) 44px 126px,
              transparent 126px 206px
            );
          filter: blur(18px);
          animation: aiCreateBlindSweep 18s ease-in-out infinite alternate;
        }

        .ai-create-blind-shadow-secondary {
          top: -6%;
          right: -4%;
          width: 880px;
          height: 420px;
          opacity: 0.11;
          transform: rotate(-24deg);
          background:
            repeating-linear-gradient(
              90deg,
              rgba(150, 140, 118, 0.18) 0 22px,
              rgba(150, 140, 118, 0.03) 22px 82px,
              transparent 82px 148px
            );
          filter: blur(26px);
          animation: aiCreateBlindSweepSlow 24s ease-in-out infinite alternate;
        }

        .ai-create-blind-highlight {
          position: absolute;
          top: -8%;
          right: -2%;
          width: 920px;
          height: 460px;
          transform: rotate(-24deg);
          filter: blur(24px);
          mix-blend-mode: plus-lighter;
          opacity: 0.2;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(255, 249, 236, 0.34) 0 42px,
              rgba(255, 249, 236, 0.06) 42px 120px,
              transparent 120px 196px
            );
          animation: aiCreateBlindSweep 20s ease-in-out infinite alternate-reverse;
        }

        .ai-create-leaf-pass {
          position: absolute;
          border-radius: 9999px;
          filter: blur(20px);
          mix-blend-mode: multiply;
          will-change: transform, opacity;
        }

        .ai-create-leaf-pass-one {
          top: 2%;
          right: 8%;
          width: 520px;
          height: 280px;
          opacity: 0;
          transform: rotate(-23deg) translate3d(36px, -16px, 0);
          background:
            radial-gradient(ellipse 18% 8% at 16% 22%, rgba(110, 102, 82, 0.12) 0%, rgba(110, 102, 82, 0.12) 60%, transparent 72%),
            radial-gradient(ellipse 20% 9% at 34% 14%, rgba(110, 102, 82, 0.1) 0%, rgba(110, 102, 82, 0.1) 60%, transparent 72%),
            radial-gradient(ellipse 18% 8% at 54% 24%, rgba(110, 102, 82, 0.09) 0%, rgba(110, 102, 82, 0.09) 60%, transparent 72%),
            radial-gradient(ellipse 22% 9% at 76% 18%, rgba(110, 102, 82, 0.08) 0%, rgba(110, 102, 82, 0.08) 60%, transparent 72%),
            radial-gradient(ellipse 18% 8% at 30% 48%, rgba(110, 102, 82, 0.08) 0%, rgba(110, 102, 82, 0.08) 60%, transparent 72%),
            radial-gradient(ellipse 22% 9% at 62% 50%, rgba(110, 102, 82, 0.07) 0%, rgba(110, 102, 82, 0.07) 60%, transparent 72%);
          animation: aiCreateLeafFlash 22s ease-in-out infinite;
        }

        .ai-create-leaf-pass-two {
          top: 9%;
          left: 32%;
          width: 440px;
          height: 240px;
          opacity: 0;
          transform: rotate(-24deg) translate3d(-24px, 10px, 0);
          background:
            radial-gradient(ellipse 18% 8% at 18% 24%, rgba(132, 121, 100, 0.1) 0%, rgba(132, 121, 100, 0.1) 60%, transparent 72%),
            radial-gradient(ellipse 18% 8% at 42% 16%, rgba(132, 121, 100, 0.09) 0%, rgba(132, 121, 100, 0.09) 60%, transparent 72%),
            radial-gradient(ellipse 20% 8% at 66% 22%, rgba(132, 121, 100, 0.08) 0%, rgba(132, 121, 100, 0.08) 60%, transparent 72%),
            radial-gradient(ellipse 18% 8% at 32% 48%, rgba(132, 121, 100, 0.07) 0%, rgba(132, 121, 100, 0.07) 60%, transparent 72%),
            radial-gradient(ellipse 22% 9% at 72% 52%, rgba(132, 121, 100, 0.06) 0%, rgba(132, 121, 100, 0.06) 60%, transparent 72%);
          animation: aiCreateLeafFlashDelayed 26s ease-in-out infinite;
        }

        @keyframes aiCreateNoiseDrift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-12px, 10px, 0);
          }
        }

        @keyframes aiCreateBlindSweep {
          0% {
            transform: translate3d(0, 0, 0) rotate(-24deg) scale(1);
            opacity: 0.14;
          }
          50% {
            transform: translate3d(-24px, 16px, 0) rotate(-22deg) scale(1.02);
            opacity: 0.22;
          }
          100% {
            transform: translate3d(18px, -10px, 0) rotate(-26deg) scale(0.99);
            opacity: 0.18;
          }
        }

        @keyframes aiCreateBlindSweepSlow {
          0% {
            transform: translate3d(0, 0, 0) rotate(-24deg) scale(1);
            opacity: 0.08;
          }
          50% {
            transform: translate3d(18px, 12px, 0) rotate(-22deg) scale(1.03);
            opacity: 0.14;
          }
          100% {
            transform: translate3d(-14px, -8px, 0) rotate(-26deg) scale(1);
            opacity: 0.1;
          }
        }

        @keyframes aiCreateLeafFlash {
          0%,
          18%,
          100% {
            transform: rotate(-23deg) translate3d(36px, -16px, 0) scale(1.03);
            opacity: 0;
          }
          23% {
            transform: rotate(-23deg) translate3d(10px, -4px, 0) scale(1);
            opacity: 0.11;
          }
          28% {
            transform: rotate(-23deg) translate3d(-10px, 12px, 0) scale(0.98);
            opacity: 0.04;
          }
        }

        @keyframes aiCreateLeafFlashDelayed {
          0%,
          42%,
          100% {
            transform: rotate(-24deg) translate3d(-24px, 10px, 0) scale(1.03);
            opacity: 0;
          }
          48% {
            transform: rotate(-24deg) translate3d(-2px, 20px, 0) scale(1);
            opacity: 0.08;
          }
          54% {
            transform: rotate(-24deg) translate3d(18px, 30px, 0) scale(0.98);
            opacity: 0.03;
          }
        }

        @keyframes aiCreateSunDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.56;
          }
          50% {
            transform: translate3d(-20px, 18px, 0) scale(1.05);
            opacity: 0.74;
          }
          100% {
            transform: translate3d(16px, -10px, 0) scale(0.98);
            opacity: 0.6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-create-sunbeam,
          .ai-create-blind-shadow,
          .ai-create-blind-highlight,
          .ai-create-leaf-pass,
          .ai-create-noise {
            animation: none;
          }
        }

        @media (max-width: 960px) {
          .ai-create-slogan {
            font-size: 44px;
            line-height: 1.02;
          }
        }
      `}</style>
    </div>
  )
}
