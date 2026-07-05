import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CitySection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="scene-city"
      ref={sectionRef}
      className="scene-section scene-section--taller"
      aria-label="The business without automation"
    >
      <div className="scene-text scene-text--left" style={{ gap: '1.5rem', maxWidth: '580px' }}>
        <div ref={labelRef} className="text-label" style={{ opacity: 0 }}>
          Act II — The Old Way
        </div>

        <h2
          ref={headlineRef}
          className="text-display"
          style={{ opacity: 0 }}
        >
          Business without systems
          <br />
          is just <span className="text-gradient-brand">managed chaos</span>.
        </h2>

        <p className="text-body">
          Manual entry. Missed follow-ups. Spreadsheets that lie.
          <br />
          Processes that break every time someone goes on leave.
        </p>

        {/* Circuit-line divider — references logo's connector lines */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.5rem',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-brand)' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--color-brand), transparent)', maxWidth: '120px' }} />
        </div>
      </div>
    </section>
  )
}

export function FreezeSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(questionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1, filter: 'blur(0px)', duration: 1.5, delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="scene-freeze"
      ref={sectionRef}
      className="scene-section scene-section--tall"
      aria-label="The cost of not automating"
    >
      <div
        ref={textRef}
        className="scene-text scene-text--center"
        style={{ gap: '2rem', opacity: 0 }}
      >
        <div className="text-label">Act III — The Cost</div>

        <h2 className="text-display" style={{ maxWidth: '700px' }}>
          Every hour without a system
          <br />
          is revenue{' '}
          <span className="text-gradient-brand">quietly leaving</span>.
        </h2>

        <p
          ref={questionRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-dim)',
            fontStyle: 'italic',
            opacity: 0,
            letterSpacing: '0.02em',
          }}
        >
          Sound familiar?
        </p>
      </div>
    </section>
  )
}
