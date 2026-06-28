import { RefObject, useEffect, useState } from 'react'

export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const next = distance <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / distance))
      setProgress((current) => Math.abs(current - next) > 0.003 ? next : current)
    }
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])

  return progress
}

export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.25) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold])

  return visible
}
