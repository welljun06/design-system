'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import type { MenuKey } from '@/ui/Nav'
import { Nav } from '@/ui/Nav'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Tag } from '@/ui/Tag'
import { Textarea } from '@/ui/Textarea'
import heroSkyImage from '@/assets/templates/ai-create-v2-hero-sky.png'

type SuggestionItem = {
  tag: string
  title: string
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    tag: '品牌宣传',
    title: '帮我写一版新品发布海报文案',
  },
  {
    tag: '短视频脚本',
    title: '围绕产品亮点生成 30 秒口播脚本',
  },
  {
    tag: 'Prompt 优化',
    title: '把下面的需求整理成更专业的 AI 提示词',
  },
]

export function AICreateTemplateV2() {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>('toolbox')

  return (
    <div className="relative flex h-[880px] w-full items-start overflow-hidden rounded-[24px] bg-[#fbfbfd] p-2">
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
        <div className="ai-v2-scene relative min-h-[620px] overflow-hidden rounded-[30px]">
          <Image
            src={heroSkyImage}
            alt="Sky framed by trees"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="ai-v2-image-blur ai-v2-image-blur-top" />
          <div className="ai-v2-image-blur ai-v2-image-blur-bottom" />
          <div className="ai-v2-noise" />
          <div className="ai-v2-vignette" />
          <div className="ai-v2-sky-glow" />
          <div className="ai-v2-light-core" />
          <div className="ai-v2-lens ai-v2-lens-left" />
          <div className="ai-v2-lens ai-v2-lens-right" />

          <div className="relative z-[2] flex h-full flex-col justify-between p-10">
            <div className="max-w-[520px] pt-2">
              <Tag color="white" type="ghost" shape="circle" size="md">
                AI Creation v2
              </Tag>

              <h2
                className="mt-8 text-[74px] leading-[0.95] tracking-[-0.065em] text-white"
                style={{
                  fontFamily:
                    '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Times New Roman", serif',
                }}
              >
                <span>Create </span>
                <span className="italic">Next</span>
              </h2>

              <p className="mt-6 max-w-[420px] text-[17px] leading-8 text-[rgba(255,255,255,0.82)]">
                把输入与画面合在一起，直接从一条意图开始。
              </p>
            </div>

            <div className="w-full max-w-[760px] rounded-[28px] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.18)_100%)] p-[1px] shadow-[0_18px_80px_-36px_rgba(20,24,44,0.42),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-[18px]">
              <div className="rounded-[27px] bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(244,247,252,0.12)_100%)] p-4 backdrop-blur-[24px]">
                <div className="rounded-[24px] border border-[rgba(255,255,255,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(246,248,252,0.12)_100%)] px-6 pb-4 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-[18px]">
                  <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[rgba(28,31,35,0.34)]">
                    <Sparkles className="size-3.5" strokeWidth={2} />
                    <span>Create</span>
                  </div>

                  <Textarea
                    placeholder="例如：帮我生成一套适合小红书发布的春季新品海报方案。"
                    variant="glass"
                    classOverrides={{
                      variant:
                        'border-transparent bg-transparent text-[#102033] placeholder:text-[rgba(16,32,51,0.42)] focus:border-transparent focus-visible:ring-0 shadow-none backdrop-blur-none',
                      size:
                        'min-h-[56px] resize-none rounded-none px-0 py-0 text-[16px] leading-7 font-normal',
                    }}
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <Button variant="glass" content="icon" size="lg" radius="full" iconName="paperclip" />
                    <Button variant="ai" content="icon" size="lg" radius="full" iconName="send" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <style jsx>{`
          .ai-v2-scene {
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
            background: #dfe7f2;
          }

          .ai-v2-image-blur {
            position: absolute;
            left: -4%;
            right: -4%;
            z-index: 1;
            pointer-events: none;
            filter: blur(26px);
          }

          .ai-v2-image-blur-top {
            top: -10%;
            height: 26%;
            background: linear-gradient(180deg, rgba(18, 28, 24, 0.5) 0%, rgba(18, 28, 24, 0.22) 48%, transparent 100%);
          }

          .ai-v2-image-blur-bottom {
            bottom: -14%;
            height: 30%;
            background: linear-gradient(180deg, transparent 0%, rgba(20, 29, 24, 0.16) 34%, rgba(20, 29, 24, 0.42) 100%);
          }

          .ai-v2-noise {
            position: absolute;
            inset: 0;
            opacity: 0.08;
            mix-blend-mode: soft-light;
            background-image:
              radial-gradient(rgba(255, 255, 255, 0.28) 0.5px, transparent 0.75px),
              radial-gradient(rgba(0, 0, 0, 0.18) 0.55px, transparent 0.8px);
            background-size: 18px 18px, 24px 24px;
            background-position: 0 0, 12px 15px;
            animation: aiV2Noise 16s linear infinite;
          }

          .ai-v2-vignette {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0) 28%, rgba(8, 12, 11, 0.16) 72%, rgba(3, 5, 5, 0.62) 100%);
          }

          .ai-v2-sky-glow {
            position: absolute;
            inset: 8% 18% 24% 18%;
            border-radius: 50%;
            background: radial-gradient(circle at 50% 46%, rgba(243, 248, 255, 0.54) 0%, rgba(238, 244, 253, 0.32) 36%, rgba(220, 232, 245, 0.1) 62%, transparent 84%);
            filter: blur(18px);
          }

          .ai-v2-light-core {
            position: absolute;
            left: 6%;
            top: 18%;
            width: 260px;
            height: 260px;
            border-radius: 9999px;
            background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 247, 227, 0.34) 24%, rgba(255, 247, 227, 0.06) 52%, transparent 76%);
            filter: blur(18px);
            mix-blend-mode: screen;
            animation: aiV2Glow 12s ease-in-out infinite alternate;
          }

          .ai-v2-lens {
            position: absolute;
            width: 170px;
            height: 170px;
            border-radius: 9999px;
            filter: blur(4px);
            opacity: 0.52;
            mix-blend-mode: screen;
          }

          .ai-v2-lens-left {
            left: 2%;
            top: 22%;
            background: radial-gradient(circle at 50% 50%, rgba(255, 201, 141, 0.58) 0%, rgba(170, 102, 255, 0.24) 36%, rgba(78, 199, 255, 0.18) 52%, transparent 72%);
          }

          .ai-v2-lens-right {
            right: 4%;
            top: 42%;
            background: radial-gradient(circle at 50% 50%, rgba(255, 162, 123, 0.56) 0%, rgba(184, 83, 255, 0.24) 34%, rgba(48, 205, 255, 0.18) 54%, transparent 74%);
          }

          @keyframes aiV2Noise {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-10px, 8px, 0); }
          }

          @keyframes aiV2Glow {
            0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.82; }
            100% { transform: translate3d(14px, -8px, 0) scale(1.05); opacity: 0.96; }
          }

          @media (max-width: 960px) {
            .ai-v2-scene {
              min-height: 700px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .ai-v2-noise,
            .ai-v2-light-core {
              animation: none;
            }
          }
        `}</style>
      </section>
    </div>
  )
}
