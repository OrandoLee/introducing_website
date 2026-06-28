import { useEffect, useState } from 'react'
import { ArrivalArchive } from './components/ArrivalArchive'
import { ChaosField } from './components/ChaosField'
import { DeletionStage } from './components/DeletionStage'
import { ManifestoBreak } from './components/ManifestoBreak'
import { Opening } from './components/Opening'
import { SocialNoise } from './components/SocialNoise'
import { ThreeLaws } from './components/ThreeLaws'

const sections = ['入口', '堆砌', '刹车', '铁律', '删除', '静音', '抵达']

function ReadingRail() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const index = Math.min(sections.length - 1, Math.floor(progress * sections.length))
  return (
    <aside className="reading-rail" aria-hidden="true">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <i><b style={{ transform: `scaleY(${progress})` }} /></i>
      <span>{sections[index]}</span>
    </aside>
  )
}

export default function App() {
  return (
    <main>
      <ReadingRail />
      <Opening />
      <ChaosField />
      <ManifestoBreak />
      <ThreeLaws />
      <DeletionStage />
      <SocialNoise />
      <ArrivalArchive />
    </main>
  )
}
