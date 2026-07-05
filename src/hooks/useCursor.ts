import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
}

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const trailPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [state, setState] = useState<CursorState>({
    x: 0, y: 0, isHovering: false, isClicking: false,
  })

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setState(prev => ({ ...prev, x: e.clientX, y: e.clientY }))

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const onDown = () => setState(prev => ({ ...prev, isClicking: true }))
    const onUp   = () => setState(prev => ({ ...prev, isClicking: false }))

    const onEnterLink = () => setState(prev => ({ ...prev, isHovering: true }))
    const onLeaveLink = () => setState(prev => ({ ...prev, isHovering: false }))

    // Animate trail with lag
    const animate = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.12
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.12

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    // Track hoverable elements
    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    addHoverListeners()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { cursorRef, trailRef, state }
}
