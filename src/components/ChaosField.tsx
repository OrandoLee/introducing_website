import { CSSProperties, PointerEvent, useRef, useState } from 'react'
import { useSectionProgress } from '../hooks'

const fragments = [
  { label: '文字', kind: 'text', x: 8, y: 18, r: -4 },
  { label: '图片', kind: 'image', x: 73, y: 12, r: 3 },
  { label: '视频', kind: 'video', x: 63, y: 68, r: -3 },
  { label: '音乐', kind: 'audio', x: 5, y: 74, r: 2 },
  { label: '设计', kind: 'tag', x: 45, y: 10, r: -2 },
  { label: '想法', kind: 'text', x: 25, y: 59, r: 5 },
  { label: '碎片', kind: 'tag', x: 82, y: 42, r: -5 },
  { label: '灵感', kind: 'image', x: 35, y: 78, r: 2 },
  { label: '新的板块', kind: 'text', x: 13, y: 42, r: -3 },
  { label: '新的动效', kind: 'audio', x: 70, y: 29, r: 4 },
  { label: '新的功能', kind: 'tag', x: 52, y: 83, r: -2 },
  { label: '新的内容', kind: 'video', x: 88, y: 76, r: 3 },
] as const

function FragmentVisual({ kind }: { kind: string }) {
  if (kind === 'image') return <span className="mini-image"><i /></span>
  if (kind === 'video') return <span className="mini-video"><i /></span>
  if (kind === 'audio') return <span className="mini-wave">▁▃▆▄▂▇▃▅▂</span>
  return null
}

export function ChaosField() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSectionProgress(ref)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const move = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({ x: event.clientX / rect.width - 0.5, y: event.clientY / window.innerHeight - 0.5 })
  }
  const enter = Math.min(1, progress * 2.1)
  const overload = Math.max(0, (progress - 0.42) / 0.48)

  return (
    <section className="chaos dark-section" ref={ref} onPointerMove={move} aria-label="堆砌阶段">
      <div className="sticky-stage chaos-stage">
        <div className="section-meta micro"><span>01 / ACCUMULATION</span><span>每一个「还可以」</span></div>
        <div className="chaos-grid" />
        <div
          className="chaos-title"
          style={{ filter: `blur(${overload * 9}px)`, opacity: 1 - overload * 0.72 }}
        >
          <span>最初，我想把一切</span>
          <strong className="reveal-text" data-reveal>都放进去。</strong>
        </div>
        {fragments.map((fragment, index) => {
          const delay = index * 0.045
          const local = Math.min(1, Math.max(0, (enter - delay) / 0.38))
          const fromX = fragment.x < 50 ? -90 : 90
          const fromY = fragment.y < 50 ? -60 : 60
          const parallax = (index % 3 + 1) * 3
          const style = {
            '--x': `${fragment.x}%`, '--y': `${fragment.y}%`,
            opacity: local,
            transform: `translate3d(${(1 - local) * fromX + pointer.x * parallax}px, ${(1 - local) * fromY + pointer.y * parallax}px, 0) rotate(${fragment.r * local}deg) scale(${0.82 + local * 0.18})`,
          } as CSSProperties
          return (
            <div className={`chaos-fragment fragment-${fragment.kind}`} style={style} key={fragment.label}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <FragmentVisual kind={fragment.kind} />
              <span>{fragment.label}</span>
            </div>
          )
        })}
        <p className="chaos-caption micro" style={{ opacity: overload }}>
          页面越来越丰富&nbsp;&nbsp;／&nbsp;&nbsp;表达越来越模糊
        </p>
      </div>
    </section>
  )
}
