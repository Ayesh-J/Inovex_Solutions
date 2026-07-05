import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  'aria-label'?: string
  id?: string
  strength?: number
}

export function MagneticButton({
  children, className = '', onClick, href,
  strength = 0.4, id, ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(el, {
        x: deltaX, y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(inner.current, {
        x: deltaX * 0.3, y: deltaY * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to([el, inner.current], {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  const Tag = href ? 'a' : 'button'

  return (
    <div ref={ref} className="inline-block" id={id}>
      <Tag
        ref={inner as any}
        href={href}
        onClick={onClick}
        className={className}
        data-magnetic
        {...props}
      >
        {children}
      </Tag>
    </div>
  )
}
