import { PointerEvent, useState } from 'react'

export function Opening() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const move = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    })
  }

  return (
    <section className="opening dark-section" onPointerMove={move} aria-label="入口">
      <div className="opening-index micro">ENTRY — 00</div>
      <div className="opening-copy">
        <p>这里不是为了让所有人看见我。</p>
        <p>而是为了让真正想看见我的人抵达。</p>
      </div>
      <div
        className="opening-axis"
        style={{ transform: `translate3d(${pointer.x * 14}px, ${pointer.y * 10}px, 0) rotate(${pointer.x * 0.7}deg)` }}
      >
        <i /><span className="axis-point" />
      </div>
      <div className="scroll-cue micro"><i />Scroll to enter</div>
    </section>
  )
}
