import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export function HeroSection() {
  const labelRef    = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const taglineRef  = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animation only — no scroll fade, section scrolls naturally
    const tl = gsap.timeline({ delay: 0.4 })

    tl.fromTo(labelRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(headlineRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.3'
    )

    // Scroll indicator bounce
    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.8,
    })
  }, [])

  const WHATSAPP_NUMBER  = '919209947228'
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi INOVEX! I found you through your website and I'm interested in transforming my business. Can we schedule a discovery call?"
  )

  return (
    <section
      id="scene-void"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="INOVEX Solutions — Hero"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 clamp(1.5rem, 6vw, 6rem)',
        gap: '0',
      }}>
        {/* Label */}
        <div
          ref={labelRef}
          className="text-label"
          style={{ marginBottom: '1.5rem', opacity: 0 }}
        >
          Goa, India · Technology That Transforms
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-hero"
          style={{ opacity: 0, maxWidth: '860px', marginBottom: '1.5rem' }}
        >
          We don't build software.
          <br />
          <span className="text-gradient-brand">We transform</span>
          <br />
          businesses.
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 300,
            color: 'var(--color-text-mid)',
            letterSpacing: '0.05em',
            opacity: 0,
            marginBottom: '3rem',
          }}
        >
          Websites.&nbsp; Apps.&nbsp; CRM.&nbsp; ERP.&nbsp; AI Automation.
        </p>

        {/* Hero CTAs */}
        <div ref={ctaRef} className="cta-btn-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', opacity: 0 }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            className="btn-primary"
            aria-label="Start a conversation on WhatsApp"
            id="hero-cta-whatsapp"
          >
            <span>↗&nbsp; Start Building</span>
          </a>
          <a
            href="#main-content"
            className="btn-outline"
            aria-label="View our services"
            id="hero-cta-services"
          >
            <span>See Our Work</span>
          </a>
        </div>

        <a href="#main-content" className="skip-link">Skip to main content</a>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <span className="text-label" style={{ fontSize: '0.55rem', color: 'var(--color-text-dim)' }}>
          Scroll to explore
        </span>
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, #7C3AED, transparent)',
        }} />
      </div>
    </section>
  )
}
