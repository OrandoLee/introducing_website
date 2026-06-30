import { useRef } from 'react'
import { useSectionProgress } from '../hooks'

const social = ['Like', 'Comment', 'Share', 'Views 2.4K', 'Algorithm', 'Feed', 'Notification 12']
const archiveMarks = [
  { name: 'DOCUMENT', src: '/marks/document.svg?v=2' },
  { name: 'IMAGE', src: '/marks/image.svg' },
  { name: 'lab', src: '/marks/lab.svg' },
  { name: 'orask', src: '/marks/orask.svg' },
]

export function SocialNoise() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSectionProgress(ref)
  const quiet = Math.min(1, Math.max(0, (progress - 0.1) / 0.72))
  const noiseOpacity = Math.max(0.04, 1 - quiet * 0.96)
  const showArchiveOnMobile = quiet >= 0.58

  return (
    <section className="social light-section" ref={ref} aria-label="从社交平台到个人档案">
      <div className="sticky-stage social-stage">
        <div className="section-meta micro"><span>05 / OWNERSHIP</span><span>{quiet > 0.78 ? '表达，不是反馈' : '反馈正在介入'}</span></div>
        <div className="social-columns">
          <div className={`noise-side${showArchiveOnMobile ? ' mobile-panel-hidden' : ''}`} style={{ opacity: noiseOpacity, filter: `blur(${quiet * 8}px)`, transform: `translateX(${-quiet * 36}px)` }}>
            <div className="column-label micro"><i />PLATFORM / LIVE FEEDBACK</div>
            <div className="feed-shell">
              <div className="feed-lines"><i /><i /><i /></div>
              <div className="social-tags">
                {social.map((item, index) => <span style={{ transform: `translateX(${Math.sin(index) * quiet * 24}px)` }} key={item}>{item}</span>)}
              </div>
            </div>
          </div>
          <div className={`archive-side${showArchiveOnMobile ? '' : ' mobile-panel-hidden'}`} style={{ opacity: 0.18 + quiet * 0.82, transform: `translateX(${(1 - quiet) * 34}px)` }}>
            <div className="column-label micro"><i />QUIET / ARCHIVE</div>
            <div className="archive-index">
              {archiveMarks.map((item, index) => (
                <div key={item.name}>
                  <span>0{index + 1}</span>
                  <span className={`archive-mark archive-mark-${item.name.toLowerCase()}`}>
                    <img src={item.src} alt={item.name} />
                  </span>
                  <i />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="social-narrative">
          <div className="noise-copy" style={{ opacity: 1 - quiet }}>
            <p>点赞变成人情。</p><p>评论变成礼貌。</p><p>浏览变成关系维护。</p>
            <strong>表达开始被社交吞没。</strong>
          </div>
          <div className="quiet-copy" style={{ opacity: quiet }}>
            <p>这里没有即时反馈。</p><p>没有数字奖励。</p><p>没有社交压力。</p>
            <strong>内容只是安静地存在。</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
