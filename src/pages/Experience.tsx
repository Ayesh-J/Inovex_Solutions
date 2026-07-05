import { useEffect, useRef, useState } from 'react'
import { useScroll } from '@/hooks/useScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { detectGPUCapabilities, type GPUCapabilities } from '@/utils/performance'
import { MainCanvas } from '@/components/effects/MainCanvas'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { HeroSection } from '@/components/sections/HeroSection'
import { CitySection, FreezeSection } from '@/components/sections/CitySection'
import { PulseSection, CTASection, Footer } from '@/components/sections/FinalCTASection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import logoSrc from '@/assets/logo.jpeg'

function Loader({ progress }: { progress: number }) {
  return (
    <div className="loader" role="status" aria-label="Loading INOVEX Experience">
      <img
        src={logoSrc}
        alt="INOVEX Solutions"
        style={{
          width: '200px', height: 'auto', userSelect: 'none',
          opacity: 0.5 + progress * 0.5,
          filter: `drop-shadow(0 0 ${8 + progress * 28}px rgba(124,58,237,${0.25 + progress * 0.55}))`,
          transition: 'opacity 0.1s ease, filter 0.1s ease',
        }}
        draggable={false}
      />
      <div className="loader-text" style={{ marginTop: '0.5rem' }}>Initializing experience</div>
      <div className="loader-bar" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="loader-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="loader-text" style={{ fontSize: '0.58rem', letterSpacing: '0.3em' }}>
        {Math.round(progress * 100)}% — Streamline · Automate · Accelerate
      </div>
    </div>
  )
}

export function Experience() {
  const [gpu, setGpu]           = useState<GPUCapabilities | null>(null)
  const [loaded, setLoaded]     = useState(false)
  const [progress, setProgress] = useState(0)
  const loaderRef               = useRef<HTMLDivElement>(null)
  const prefersReduced          = useReducedMotion()

  useScroll()

  useEffect(() => {
    const init = async () => {
      const cap = await detectGPUCapabilities()
      setGpu(cap)
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 1) { clearInterval(interval); setTimeout(() => setLoaded(true), 400); return 1 }
          return Math.min(p + 0.035, 1)
        })
      }, 40)
    }
    init()
  }, [])

  useEffect(() => {
    if (loaded && loaderRef.current) {
      const el = loaderRef.current
      el.style.transition = 'opacity 0.9s ease'
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
      setTimeout(() => { if (el) el.style.display = 'none' }, 900)
    }
  }, [loaded])

  return (
    <>
      {/* Loader */}
      <div ref={loaderRef} style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
        <Loader progress={progress} />
      </div>

      <a href="#main-content" className="skip-link">Skip to main content</a>
      {!prefersReduced && <Cursor />}
      <ScrollProgress />

      {/* Fixed 3D canvas — shows through transparent hero, city, pulse sections */}
      {gpu && <MainCanvas particleCount={gpu.particleCount} />}

      {/* Full scrollable page */}
      <main id="scroll-container" aria-label="INOVEX Solutions">

        {/* Hero — 100vh, no fade */}
        <HeroSection />

        {/* City story — 3D scene shows through */}
        <CitySection />
        <FreezeSection />

        {/* AI Arrival — 3D scene shows through */}
        <PulseSection />

        {/* Services — solid background, fully visible */}
        <ServicesSection />

        {/* Portfolio */}
        <PortfolioSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA */}
        <CTASection />

        {/* Footer with logo */}
        <Footer />

      </main>
    </>
  )
}
