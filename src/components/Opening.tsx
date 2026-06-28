import { CSSProperties, PointerEvent, useState } from 'react'

export function Opening() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const move = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      className="opening dark-section"
      style={{ '--cursor-x': `${pointer.x}%`, '--cursor-y': `${pointer.y}%` } as CSSProperties}
      onPointerMove={move}
      aria-label="入口"
    >
      <div className="opening-index micro">ENTRY — 00</div>
      <div className="opening-crosshair" aria-hidden="true"><i /><i /><span /></div>
      <div className="opening-copy">
        <p>这里不是为了让所有人看见我。</p>
        <p>而是为了让真正想看见我的人抵达。</p>
      </div>
      <div className="scroll-cue micro"><i />Scroll to enter</div>
    </section>
  )
}
