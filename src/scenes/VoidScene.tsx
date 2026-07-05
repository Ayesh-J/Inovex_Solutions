import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from '@/shaders/particle/vertex.glsl'
import fragmentShader from '@/shaders/particle/fragment.glsl'

interface VoidSceneProps {
  particleCount?: number
  progress?: number
}

// INOVEX Brand Colors — extracted from logo.jpeg
const BRAND_PURPLE = new THREE.Color('#7C3AED') // Gear body
const SOFT_VIOLET  = new THREE.Color('#C084FC') // Gear metallic sheen

export function VoidScene({ particleCount = 15000, progress = 0 }: VoidSceneProps) {
  const meshRef = useRef<THREE.Points>(null)
  const mouseWorld = useRef(new THREE.Vector3())
  const mouseTarget = useRef(new THREE.Vector3())

  const { positions, scales, randomness, phases } = useMemo(() => {
    const count = particleCount
    const positions  = new Float32Array(count * 3)
    const scales     = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    const phases     = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute in sphere — void of darkness with particles
      const r     = Math.random() * 7 + 0.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 1.5

      scales[i]          = Math.random() * 2.5 + 0.3
      randomness[i * 3]     = (Math.random() - 0.5) * 2
      randomness[i * 3 + 1] = (Math.random() - 0.5) * 2
      randomness[i * 3 + 2] = (Math.random() - 0.5) * 2
      phases[i]          = Math.random() * Math.PI * 2
    }

    return { positions, scales, randomness, phases }
  }, [particleCount])

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uProgress:   { value: 0 },
    uMouse:      { value: new THREE.Vector3() },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize:       { value: 100 },
    uColorA:     { value: BRAND_PURPLE },
    uColorB:     { value: SOFT_VIOLET },
  }), [])

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return

    uniforms.uTime.value     = clock.getElapsedTime()
    uniforms.uProgress.value = progress

    // Smooth mouse tracking
    mouseTarget.current.set(pointer.x * 5.5, pointer.y * 3, 0)
    mouseWorld.current.lerp(mouseTarget.current, 0.06)
    uniforms.uMouse.value.copy(mouseWorld.current)
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position"   args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale"     args={[scales, 1]} />
        <bufferAttribute attach="attributes-aRandomness" args={[randomness, 3]} />
        <bufferAttribute attach="attributes-aPhase"     args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
