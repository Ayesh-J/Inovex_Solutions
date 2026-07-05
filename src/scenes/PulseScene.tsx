import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import aicoreVertex from '@/shaders/aicore/vertex.glsl'
import aicoreFragment from '@/shaders/aicore/fragment.glsl'

// INOVEX Brand Colors — logo.jpeg
const COLOR_VIOLET  = new THREE.Color('#8B5CF6') // Checkmark
const COLOR_ACCENT  = new THREE.Color('#A855F7') // Circuit lines
const COLOR_BRAND   = new THREE.Color('#7C3AED') // Gear body

interface AICoreProps {
  progress?: number
}

export function AICore({ progress = 0 }: AICoreProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRefs = useRef<THREE.Mesh[]>([])
  const gearRef  = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(() => ({
    uTime:        { value: 0 },
    uProgress:    { value: 0 },
    uColorCore:   { value: COLOR_VIOLET },
    uColorAccent: { value: COLOR_ACCENT },
  }), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    uniforms.uTime.value     = t
    uniforms.uProgress.value = progress

    // Breathe — the logo's glow pulse
    const breathe = 1 + Math.sin(t * 0.8) * 0.035
    groupRef.current.scale.setScalar(breathe * progress)

    // Slow rotation — gear-inspired
    groupRef.current.rotation.y = t * 0.12
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.08

    // Gear-like outer ring rotation
    if (gearRef.current) {
      gearRef.current.rotation.z = t * 0.08
    }

    // Orbit rings — circuit paths
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = t * (0.18 + i * 0.09)
        ring.rotation.z = t * (0.09 + i * 0.06)
      }
    })
  })

  const ringCount = 6

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core — icosahedron wireframe (checkmark geometry) */}
      <mesh>
        <icosahedronGeometry args={[0.75, 2]} />
        <shaderMaterial
          vertexShader={aicoreVertex}
          fragmentShader={aicoreFragment}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color={COLOR_BRAND}
          transparent
          opacity={0.2 * progress}
        />
      </mesh>

      {/* Gear-inspired outer ring */}
      <mesh ref={gearRef}>
        <torusGeometry args={[1.5, 0.012, 6, 48]} />
        <meshBasicMaterial color={COLOR_BRAND} transparent opacity={0.5 * progress} />
      </mesh>

      {/* Circuit orbit rings */}
      {Array.from({ length: ringCount }).map((_, i) => {
        const r     = 1.1 + i * 0.25
        const angle = (i / ringCount) * Math.PI
        const color = i % 2 === 0 ? COLOR_VIOLET : COLOR_ACCENT
        return (
          <mesh
            key={i}
            ref={el => { if (el) ringRefs.current[i] = el }}
            rotation={[angle, angle * 0.6, 0]}
          >
            <torusGeometry args={[r, 0.004, 6, 100]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={(0.25 + i * 0.04) * progress}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}
