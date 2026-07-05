// Math utilities for particle systems, shaders, and 3D calculations

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomSign(): number {
  return Math.random() > 0.5 ? 1 : -1
}

export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI)
}

// Generate points on a sphere (Fibonacci sphere for even distribution)
export function fibonacciSphere(count: number, radius: number = 1): Float32Array {
  const positions = new Float32Array(count * 3)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i

    positions[i * 3]     = Math.cos(theta) * radiusAtY * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius
  }

  return positions
}

// Generate positions for text-shaped particle arrangement
export function generateLogoPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const spread = 8

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.4
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2
  }

  return positions
}

// Smooth step
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

// Easing functions
export const ease = {
  inQuad:    (t: number) => t * t,
  outQuad:   (t: number) => t * (2 - t),
  inOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic:   (t: number) => t * t * t,
  outCubic:  (t: number) => (--t) * t * t + 1,
  inOutCubic:(t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  spring:    (t: number) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
}
