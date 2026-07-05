import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '@/data/testimonials'

gsap.registerPlugin(ScrollTrigger)

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  /* ─── Drag state ────────────────────────────────────────────────── */
  const isDragging   = useRef(false)
  const startX       = useRef(0)
  const scrollStart  = useRef(0)

  const syncArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    syncArrows()
    const el = trackRef.current
    if (el) el.addEventListener('scroll', syncArrows, { passive: true })
    return () => el?.removeEventListener('scroll', syncArrows)
  }, [syncArrows])

  /* ─── Arrow scroll ──────────────────────────────────────────────── */
  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const CARD_W = 380 + 24  // card width + gap
    el.scrollBy({ left: dir * CARD_W, behavior: 'smooth' })
  }

  /* ─── Mouse drag ────────────────────────────────────────────────── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current     = e.pageX
    scrollStart.current = trackRef.current?.scrollLeft ?? 0
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    const dx = e.pageX - startX.current
    trackRef.current.scrollLeft = scrollStart.current - dx
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  return (
    <section
      id="scene-testimonials"
      style={{
        position: 'relative',
        padding: 'clamp(5rem,10vw,9rem) 0',
        overflow: 'hidden',
      }}
      aria-label="Client testimonials"
    >
      {/* Giant TRUST watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(7rem, 18vw, 16rem)',
        fontWeight: 800,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(124, 58, 237, 0.07)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.06em',
        pointerEvents: 'none',
      }}>
        TRUST
      </div>

      {/* Header + arrows row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 6vw, 6rem)',
        marginBottom: '3rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <TestimonialsHeader />

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <ArrowBtn
            dir="left"
            disabled={!canScrollLeft}
            onClick={() => scrollBy(-1)}
          />
          <ArrowBtn
            dir="right"
            disabled={!canScrollRight}
            onClick={() => scrollBy(1)}
          />
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="testimonials-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        role="list"
        aria-label="Testimonials carousel"
      >
        {/* Left fade */}
        <div className="testimonials-fade testimonials-fade--left" aria-hidden="true" />
        {/* Right fade */}
        <div className="testimonials-fade testimonials-fade--right" aria-hidden="true" />

        {testimonials.map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>

      {/* Dot indicators */}
      <DotIndicators
        count={testimonials.length}
        trackRef={trackRef}
        syncArrows={syncArrows}
      />
    </section>
  )
}

/* ─── Header ─────────────────────────────────────────────────────── */
function TestimonialsHeader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0, position: 'relative', zIndex: 1 }}>
      <div className="text-label" style={{ marginBottom: '1rem' }}>The Proof</div>
      <h2 className="text-display">
        Results, not <span className="text-gradient-brand">promises</span>.
      </h2>
    </div>
  )
}

/* ─── Arrow button ───────────────────────────────────────────────── */
function ArrowBtn({ dir, disabled, onClick }: {
  dir: 'left' | 'right'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      className="testimonial-arrow-btn"
      style={{ opacity: disabled ? 0.25 : 1 }}
    >
      {dir === 'left' ? '←' : '→'}
    </button>
  )
}

/* ─── Dot indicators ─────────────────────────────────────────────── */
function DotIndicators({ count, trackRef, syncArrows }: {
  count: number
  trackRef: React.RefObject<HTMLDivElement>
  syncArrows: () => void
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const CARD_W = 380 + 24
      const idx = Math.round(el.scrollLeft / CARD_W)
      setActive(Math.min(idx, count - 1))
      syncArrows()
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [count, trackRef, syncArrows])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const CARD_W = 380 + 24
    el.scrollTo({ left: i * CARD_W, behavior: 'smooth' })
    setActive(i)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2.5rem',
      position: 'relative',
      zIndex: 1,
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          className={`testimonial-dot${i === active ? ' testimonial-dot--active' : ''}`}
        />
      ))}
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────────────────── */
function TestimonialCard({ testimonial, index }: {
  testimonial: typeof testimonials[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, delay: index * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [index])

  return (
    <div
      ref={ref}
      className="testimonial-card"
      style={{ opacity: 0 }}
      role="listitem"
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      {/* Star rating */}
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} style={{ color: 'var(--color-violet)', fontSize: '0.9rem' }}>★</span>
        ))}
      </div>

      <blockquote style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-base)',
        lineHeight: '1.8',
        color: 'var(--color-text-brand)',
        marginBottom: '2rem',
        fontStyle: 'italic',
        flexGrow: 1,
      }}>
        "{testimonial.quote}"
      </blockquote>

      {/* Connector line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-brand)' }} />
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, var(--color-brand), transparent)' }} />
      </div>

      <div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-base)',
          fontWeight: 600,
          color: 'var(--color-pure)',
          display: 'block',
          marginBottom: '0.25rem',
        }}>
          {testimonial.author}
        </span>
        <span className="text-label" style={{ color: 'var(--color-text-dim)', display: 'block' }}>
          {testimonial.role} · {testimonial.company}
        </span>
        <span className="text-label" style={{ color: 'var(--color-brand)', fontSize: '0.58rem', display: 'block', marginTop: '0.2rem' }}>
          {testimonial.industry}
        </span>
      </div>
    </div>
  )
}
