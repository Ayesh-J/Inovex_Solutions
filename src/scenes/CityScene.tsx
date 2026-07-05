import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// INOVEX Brand Colors — logo.jpeg
const COLOR_BUILDING  = new THREE.Color('#140F20')
const COLOR_WIRE_CITY = new THREE.Color('#2D1B4E')

const BUILDING_COUNT = 80

interface CitySceneProps {
  progress?: number
  frozen?: number
}

export function CityScene({ progress = 0, frozen = 0 }: CitySceneProps) {
  const groupRef    = useRef<THREE.Group>(null)
  const buildingRef = useRef<THREE.InstancedMesh>(null)
  const wireRef     = useRef<THREE.InstancedMesh>(null)

  const { originalHeights, positions } = useMemo(() => {
    const heights   = new Float32Array(BUILDING_COUNT)
    const positions = new Float32Array(BUILDING_COUNT * 2)

    for (let i = 0; i < BUILDING_COUNT; i++) {
      positions[i * 2]     = (Math.random() - 0.5) * 22
      positions[i * 2 + 1] = (Math.random() - 0.5) * 22
      heights[i] = Math.random() * 2.8 + 0.4
    }

    return { originalHeights: heights, positions }
  }, [])

  useFrame(({ clock }) => {
    if (!buildingRef.current || !wireRef.current) return
    const t = clock.getElapsedTime()
    const dummy = new THREE.Object3D()

    for (let i = 0; i < BUILDING_COUNT; i++) {
      const x = positions[i * 2]
      const z = positions[i * 2 + 1]
      let h   = originalHeights[i] * progress

      const crackFactor = frozen * (0.4 + (i % 3) * 0.2)
      h *= Math.max(0.1, 1 - crackFactor * 0.5)

      const sway = Math.sin(t * 0.4 + i * 1.3) * 0.015 * (1 - frozen)

      dummy.position.set(x + sway, h / 2, z)
      dummy.scale.set(0.35 + (i % 4) * 0.08, h, 0.35 + (i % 3) * 0.06)
      dummy.updateMatrix()
      buildingRef.current.setMatrixAt(i, dummy.matrix)
      wireRef.current.setMatrixAt(i, dummy.matrix)
    }

    buildingRef.current.instanceMatrix.needsUpdate = true
    wireRef.current.instanceMatrix.needsUpdate = true

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.015
    }
  })

  return (
    <group ref={groupRef} position={[0, -2.5, -2]}>
      {/* Buildings — solid, dim */}
      <instancedMesh ref={buildingRef} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={COLOR_BUILDING} />
      </instancedMesh>

      {/* Wireframe overlay */}
      <instancedMesh ref={wireRef} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={COLOR_WIRE_CITY}
          wireframe
          transparent
          opacity={0.4 * progress}
        />
      </instancedMesh>

      {/* Ground grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[35, 35, 35, 35]} />
        <meshBasicMaterial
          color={COLOR_WIRE_CITY}
          wireframe
          transparent
          opacity={0.3 * progress}
        />
      </mesh>
    </group>
  )
}
