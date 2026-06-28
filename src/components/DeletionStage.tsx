import { PointerEvent, useRef, useState } from 'react'

const modules = ['Like Button', 'Comment Box', 'Trending Feed', 'View Counter', 'Floating Badge', 'Auto Recommend', 'Social Pressure', 'Noise Layer']

export function DeletionStage() {
  const [deleted, setDeleted] = useState<string[]>([])
  const dragStart = useRef<{ x: number; y: number; label: string } | null>(null)
  const remove = (label: string) => setDeleted((current) => current.includes(label) ? current : [...current, label])
  const allDeleted = deleted.length === modules.length
  const pointerDown = (event: PointerEvent<HTMLButtonElement>, label: string) => {
    dragStart.current = { x: event.clientX, y: event.clientY, label }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const pointerUp = (event: PointerEvent<HTMLButtonElement>, label: string) => {
    if (!dragStart.current || dragStart.current.label !== label) return
    const distance = Math.hypot(event.clientX - dragStart.current.x, event.clientY - dragStart.current.y)
    if (distance > 38) remove(label)
    dragStart.current = null
  }

  return (
    <section className={`deletion dark-section ${allDeleted ? 'is-complete' : ''}`} aria-label="删除比增加更难">
      <div className="section-meta micro"><span>04 / REDUCTION</span><span>{allDeleted ? '边界已建立' : '点击或拖动删除'}</span></div>
      <div className="deletion-intro">
        <p className="micro">THE DIFFICULT PART</p>
        <h2>增加，只需要一个念头。<br /><span>删除，需要一个判断。</span></h2>
      </div>
      <div className="module-field" aria-live="polite">
        {modules.map((label, index) => {
          const gone = deleted.includes(label)
          return (
            <button
              type="button"
              className={`delete-module ${gone ? 'is-deleted' : ''}`}
              onClick={() => remove(label)}
              onPointerDown={(event) => pointerDown(event, label)}
              onPointerUp={(event) => pointerUp(event, label)}
              disabled={gone}
              data-testid={`delete-${index}`}
              key={label}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
              <i aria-hidden="true">×</i>
            </button>
          )
        })}
        <div className={`deletion-result ${allDeleted ? 'is-visible' : ''}`}>
          <p>如果删掉它，会不会反而更好？</p>
          <div><span>如果答案是会。</span><strong>那它就不该存在。</strong></div>
        </div>
      </div>
    </section>
  )
}
