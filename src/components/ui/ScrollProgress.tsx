import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    gsap.to(barRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        ref={barRef}
        className="scroll-progress-bar"
        style={{ transform: 'scaleY(0)' }}
      />
    </div>
  )
}
