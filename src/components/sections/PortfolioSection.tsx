import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioProjects } from '@/data/portfolio'
import type { PortfolioProject } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export function PortfolioSection() {
  return (
    <section
      id="scene-portfolio"
      style={{
        position: 'relative',
        background: 'var(--color-abyss)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)',
      }}
      aria-label="Portfolio"
    >
      <PortfolioHeader />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
        gap: '2rem',
        maxWidth: '1100px',
        margin: '4rem auto 0',
      }}>
        {portfolioProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function PortfolioHeader() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    )
  }, [])
  return (
    <div ref={ref} style={{ opacity: 0, maxWidth: '680px' }}>
      <div className="text-label" style={{ marginBottom: '1.2rem' }}>Our Work</div>
      <h2 className="text-display">
        Proof, not <span className="text-gradient-brand">promises</span>.
      </h2>
      <p className="text-body" style={{ marginTop: '1rem' }}>
        Real businesses. Real problems. Permanent solutions.
      </p>
    </div>
  )
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const ref     = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const color = index === 0 ? '#7C3AED' : '#A855F7'

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' } }
    )
  }, [index])

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        border: '1px solid var(--color-wire)',
        background: 'var(--color-depths)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.35s ease',
        cursor: 'default',
      }}
      onMouseEnter={() => {
        if (ref.current) ref.current.style.borderColor = color
        gsap.to(glowRef.current, { opacity: 1, duration: 0.4 })
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.borderColor = 'var(--color-wire)'
        gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
      }}
      role="article"
      aria-label={`Project: ${project.name}`}
    >
      {/* Top accent bar */}
      <div style={{ height: '2px', background: `linear-gradient(to right, ${color}, var(--color-soft))` }} />

      <div style={{ padding: '2.5rem' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'flex-start' }}>
          <span className="text-label" style={{ color: 'var(--color-text-dim)' }}>{project.year}</span>
          <span className="text-label" style={{ color }}>{project.industry}</span>
        </div>

        {/* Name */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-pure)', marginBottom: '0.6rem' }}>
          {project.name}
        </h3>

        {/* Tagline */}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color, marginBottom: '1.25rem', fontStyle: 'italic', lineHeight: '1.5' }}>
          "{project.tagline}"
        </p>

        {/* Description */}
        <p className="text-body" style={{ marginBottom: '2rem' }}>{project.description}</p>

        {/* Service tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {project.services.map(s => (
            <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-dim)', border: '1px solid var(--color-wire)', padding: '0.25rem 0.75rem' }}>
              {s}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color, textDecoration: 'none' }}
          aria-label={`Visit ${project.name}`}
          onMouseEnter={e => gsap.to(e.currentTarget, { gap: '1rem', duration: 0.3 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { gap: '0.5rem', duration: 0.3 })}
        >
          <span>View Project</span>
          <span style={{ fontSize: '1.1em' }}>→</span>
        </a>
      </div>

      {/* Hover glow */}
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 40% 40%, ${color}09, transparent 65%)`, opacity: 0, pointerEvents: 'none' }} />
    </div>
  )
}
