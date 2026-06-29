import { PointerEvent, useState } from 'react'

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL ?? '/?enter=1'

function rememberIntroduction() {
  try {
    window.localStorage.setItem('delee_intro_seen', '1')
  } catch {
    // Browsers may block storage in privacy mode; the navigation should still work.
  }

  const isDeleeHost = window.location.hostname === 'delee.top' || window.location.hostname.endsWith('.delee.top')
  if (isDeleeHost) {
    document.cookie = 'delee_intro_seen=1; Max-Age=31536000; Domain=.delee.top; Path=/; SameSite=Lax; Secure'
  }
}

export function ArrivalArchive() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const move = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 })
  }
  return (
    <section className="arrival dark-section" onPointerMove={move} aria-label="抵达个人档案">
      <div className="section-meta micro"><span>06 / ARRIVAL</span><span>你主动抵达</span></div>
      <div className="archive-door reveal-frame" data-reveal style={{ transform: `perspective(900px) rotateY(${pointer.x * 1.6}deg) rotateX(${-pointer.y * 1.2}deg)` }}>
        <div className="door-corners"><i /><i /><i /><i /></div>
        <div className="door-title">
          <span className="micro">EST. / 2026</span>
          <span className="delee-mark delee-mark-inverse"><img src="/marks/delee.svg" alt="DELEE" /></span>
          <small>安静 · 稳定 · 清晰</small>
        </div>
        <div className="door-coordinate micro">31.2304° N<br />121.4737° E</div>
      </div>
      <div className="arrival-copy">
        <p>你不是被推送到这里。</p>
        <p>不是因为关系来到这里。</p>
        <p>而是你选择进入这里。</p>
      </div>
      <footer>
        <p className="reveal-text" data-reveal>当有人真正想看见我时，这里有一个足够安静、稳定、清晰的地方，让他们抵达。</p>
        <div className="arrival-cta">
          <span className="micro">THE ARCHIVE IS READY</span>
          <a href={MAIN_SITE_URL} onClick={rememberIntroduction}>
            <span>正式进入 delee.top</span>
            <i aria-hidden="true">→</i>
          </a>
          <small>继续前往我的个人档案</small>
        </div>
        <div className="micro"><span>END OF TRANSMISSION</span><span>DELEE / 2026</span></div>
      </footer>
    </section>
  )
}
