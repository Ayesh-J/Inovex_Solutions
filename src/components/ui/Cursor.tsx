import { useRef, useEffect } from 'react'
import { useCursor } from '@/hooks/useCursor'

export function Cursor() {
  const { cursorRef, trailRef, state } = useCursor()

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${state.isHovering ? 'cursor--hover' : ''} ${state.isClicking ? 'cursor--click' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={trailRef}
        className="cursor-trail"
        aria-hidden="true"
      />
    </>
  )
}
