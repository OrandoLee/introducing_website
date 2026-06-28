import { useState } from 'react'

const laws = [
  ['相关性', 'RELEVANCE', '任何存在于这里的内容，都必须与整体表达发生关系。'],
  ['稳定性', 'STABILITY', '这里不是一时兴起的作品，而是长期存在、长期维护、长期更新的空间。'],
  ['简洁性', 'SIMPLICITY', '不是删减内容，而是拒绝无意义的复杂，让内容真正成为主体。'],
] as const

export function ThreeLaws() {
  const [active, setActive] = useState(0)
  return (
    <section className="laws light-section" aria-label="三项铁律">
      <div className="section-meta micro"><span>03 / PRINCIPLES</span><span>三项铁律</span></div>
      <div className="laws-heading">
        <p className="micro">BOUNDARIES CREATE FORM</p>
        <h2>边界不是限制。<br />边界让表达成立。</h2>
      </div>
      <div className="laws-list">
        {laws.map(([name, en, description], index) => (
          <button
            type="button"
            className={`law-row ${active === index ? 'is-active' : ''}`}
            onClick={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
            aria-expanded={active === index}
            key={name}
          >
            <span className="law-number">0{index + 1}</span>
            <strong>{name}</strong>
            <span className="law-en micro">{en}</span>
            <span className="law-description">{description}</span>
            <i />
          </button>
        ))}
      </div>
    </section>
  )
}
