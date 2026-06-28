import { useRef } from 'react'
import { useInView } from '../hooks'

export function ManifestoBreak() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, 0.24)
  const lines = [
    '表达也不是把一切塞进去。',
    '真正重要的，不是能做多少。',
    '而是知道什么不该做。',
  ]
  return (
    <section className={`manifesto light-section ${visible ? 'is-visible' : ''}`} ref={ref} aria-label="意识到问题">
      <div className="brake-line"><i /></div>
      <div className="section-meta micro"><span>02 / INTERRUPTION</span><span>停止增加</span></div>
      <div className="manifesto-copy">
        <h2>设计从来不是<br />元素数量的竞赛。</h2>
        <div className="manifesto-sequence">
          {lines.map((line, index) => <p style={{ '--delay': `${index * 160 + 300}ms` } as React.CSSProperties} key={line}>{line}</p>)}
        </div>
      </div>
    </section>
  )
}
