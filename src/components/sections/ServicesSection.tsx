import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'

gsap.registerPlugin(ScrollTrigger)

const BRAND_COLORS = ['#7C3AED', '#8B5CF6', '#A855F7', '#6D28D9', '#C084FC']

export function ServicesSection() {
  return (
    <section
      id="main-content"
      style={{
        position: 'relative',
        background: 'var(--color-void)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)',
      }}
      aria-label="Our services"
    >
      <ServicesHeader />
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {services.map((service, i) => (
          <ServiceStrip
            key={service.id}
            service={service}
            index={i}
            color={BRAND_COLORS[i % BRAND_COLORS.length]}
          />
        ))}
      </div>
    </section>
  )
}

function ServicesHeader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}>
      <div className="text-label" style={{ marginBottom: '1.2rem' }}>
        What We Build
      </div>
      <h2 className="text-display">
        Not features.&nbsp;
        <span className="text-gradient-brand">Transformations.</span>
      </h2>
      <p className="text-body" style={{ maxWidth: '460px', margin: '1.2rem auto 0' }}>
        Every system replaces a real problem with a permanent solution —
        built on one principle:{' '}
        <span style={{ color: 'var(--color-text-brand)', fontStyle: 'italic' }}>
          Streamline. Automate. Accelerate.
        </span>
      </p>
    </div>
  )
}

function ServiceStrip({ service, index, color }: {
  service: typeof services[0]
  index: number
  color: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [index])

  return (
    <div
      ref={ref}
      className="service-strip"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        padding: '3.5rem 0',
        borderBottom: '1px solid var(--color-wire-dim)',
        opacity: 0,
      }}
    >
      {/* Before → After */}
      <div className="service-before-after" style={{ order: index % 2 === 0 ? 1 : 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-wire)', border: `1px solid ${color}` }} />
          <span className="text-label" style={{ color: 'var(--color-text-dim)' }}>Before INOVEX</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
          color: 'var(--color-text-dim)', lineHeight: '1.65',
          textDecoration: 'line-through', textDecorationColor: 'rgba(76,29,149,0.4)',
          marginBottom: '1.75rem',
        }}>
          {service.before}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }} />
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, ${color}, transparent)` }} />
          <span className="text-label" style={{ color }}>After INOVEX</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
          color: 'var(--color-pure)', lineHeight: '1.65',
        }}>
          {service.after}
        </p>
      </div>

      {/* Service info */}
      <div className="service-info" style={{ order: index % 2 === 0 ? 2 : 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color, marginTop: '0.6rem', letterSpacing: '0.15em' }}>
            {service.index}
          </span>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 5vw, 1.953rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--color-pure)', marginBottom: '0.2rem' }}>
              {service.title}
            </h3>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color, fontWeight: 500, letterSpacing: '0.06em' }}>
              {service.verb}
            </span>
          </div>
        </div>
        <p className="text-body">{service.description}</p>
      </div>
    </div>
  )
}
