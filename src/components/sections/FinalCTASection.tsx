import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoSrc from '@/assets/logo.jpeg'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER  = '919209947228'
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi INOVEX! I found you through your website and I'm interested in transforming my business. Can we schedule a discovery call?"
)

/* ─── CTA Section ────────────────────────────────────────────────── */
export function CTASection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const sentenceRef = useRef<HTMLParagraphElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const btnRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sentenceRef.current,
        { opacity: 0, y: 50, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' } }
      )
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' } }
      )
      gsap.fromTo(btnRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="scene-final"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'var(--color-void)',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
      aria-label="Start building with INOVEX"
    >
      {/* Ambient background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '350px',
        background: 'radial-gradient(ellipse at center bottom, rgba(124,58,237,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Tagline label */}
      <div className="text-label" style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        Final Act
      </div>

      {/* The sentence */}
      <p
        ref={sentenceRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--color-pure)',
          lineHeight: 1.1,
          maxWidth: '760px',
          marginBottom: '1.5rem',
          opacity: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Your competitors
        <br />
        <span className="text-gradient-brand">won't wait.</span>
      </p>

      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-mid)',
          maxWidth: '460px',
          marginBottom: '3.5rem',
          lineHeight: '1.7',
          opacity: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        One conversation changes everything. Let's talk about what your business needs next.
      </p>

      {/* Buttons */}
      <div
        ref={btnRef}
        className="cta-btn-row"
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          opacity: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          className="btn-primary animate-pulse-brand"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Start building with INOVEX Solutions via WhatsApp"
          id="cta-start-building"
        >
          <span>↗&nbsp; Start Building</span>
        </a>

        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="btn-outline"
          aria-label="Call INOVEX Solutions"
          id="cta-phone"
        >
          <span>Call Us</span>
        </a>
      </div>

      {/* Phone number */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-dim)',
        marginTop: '2rem',
        letterSpacing: '0.1em',
        position: 'relative',
        zIndex: 1,
      }}>
        +91 9209947228
      </p>

      <div className="sr-only">
        <p>INOVEX Solutions — Streamline. Automate. Accelerate. Based in Goa, India. Serving businesses across India and internationally with websites, mobile apps, CRM, ERP, and AI automation.</p>
      </div>
    </section>
  )
}

/* ─── Pulse / AI Arrival Section ────────────────────────────────── */
export function PulseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' } }
      )
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="scene-pulse"
      ref={sectionRef}
      className="scene-section scene-section--taller"
      aria-label="INOVEX intelligence arrives"
    >
      <div className="scene-text scene-text--right" style={{ gap: '1.5rem' }}>
        <div ref={labelRef} className="text-label" style={{ opacity: 0 }}>
          Intelligence Arrives
        </div>
        <div ref={textRef} style={{ opacity: 0, maxWidth: '500px', textAlign: 'right' }}>
          <h2 className="text-display" style={{ marginBottom: '1rem' }}>
            Something
            <br />
            <span className="text-gradient-brand">intelligent</span>
            <br />
            has arrived.
          </h2>
          <p className="text-body">
            It scans. It understands.
            <br />
            Then it begins to rebuild.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-abyss)',
        borderTop: '1px solid var(--color-wire)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem)',
      }}
      aria-label="INOVEX Solutions footer"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top row */}
        <div
          className="footer-top-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '3rem',
          }}
        >
          {/* Logo */}
          <div>
            <img
              src={logoSrc}
              alt="INOVEX Solutions"
              style={{
                width: '180px',
                height: 'auto',
                filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.35))',
                userSelect: 'none',
              }}
              draggable={false}
            />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--color-text-dim)',
              marginTop: '0.75rem',
              textTransform: 'uppercase',
            }}>
              Streamline · Automate · Accelerate
            </p>
          </div>

          {/* Services list */}
          <div className="footer-services-cols" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <FooterCol title="Services" links={[
              'Web & Mobile',
              'CRM & ERP Systems',
              'AI Automation',
              'SEO & Google Business',
              'Analytics & Strategy',
            ]} />
            <FooterCol title="Company" links={[
              'Our Work',
              'Process',
              'Contact',
            ]} />
          </div>

          {/* Contact */}
          <div>
            <div className="text-label" style={{ marginBottom: '1rem' }}>Get In Touch</div>
            <a
              href={`https://wa.me/919209947228?text=${encodeURIComponent("Hi INOVEX! I'm interested in working with you.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', fontSize: '0.7rem', padding: '0.75rem 1.5rem' }}
              aria-label="Message INOVEX on WhatsApp"
              id="footer-cta-whatsapp"
            >
              <span>↗&nbsp; WhatsApp Us</span>
            </a>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-dim)', marginTop: '0.75rem', letterSpacing: '0.08em' }}>
              +91 9209947228
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--color-wire), transparent)', marginBottom: '1.5rem' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
            © {new Date().getFullYear()} INOVEX Solutions. All rights reserved. · Goa, India.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(109,95,166,0.35)', letterSpacing: '0.1em' }}>
            BUILT TO TRANSFORM
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-label" style={{ marginBottom: '1rem' }}>{title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {links.map(link => (
          <li key={link}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-mid)' }}>
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
