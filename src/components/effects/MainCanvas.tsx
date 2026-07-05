import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CityScene } from '@/scenes/CityScene'
import { AICore } from '@/scenes/PulseScene'

gsap.registerPlugin(ScrollTrigger)

interface SceneState {
  cityProgress:   number
  cityFrozen:     number
  aiCoreProgress: number
}

export function MainCanvas({ particleCount: _particleCount = 15000 }: { particleCount?: number }) {
  const [scene, setScene] = useState<SceneState>({
    cityProgress:   0,
    cityFrozen:     0,
    aiCoreProgress: 0,
  })

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    triggers.push(ScrollTrigger.create({
      trigger: '#scene-city',
      start: 'top bottom',
      end: 'center center',
      scrub: 1.5,
      onUpdate: self => setScene(prev => ({ ...prev, cityProgress: self.progress })),
    }))

    triggers.push(ScrollTrigger.create({
      trigger: '#scene-freeze',
      start: 'top center',
      end: 'bottom center',
      scrub: 2,
      onUpdate: self => setScene(prev => ({ ...prev, cityFrozen: self.progress })),
    }))

    triggers.push(ScrollTrigger.create({
      trigger: '#scene-pulse',
      start: 'top bottom',
      end: 'center center',
      scrub: 2,
      onUpdate: self => setScene(prev => ({ ...prev, aiCoreProgress: self.progress })),
    }))

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <div id="canvas-container" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 8], near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        {/* INOVEX brand void — matches logo background exactly */}
        <color attach="background" args={['#050508']} />
        <fog attach="fog" args={['#050508', 12, 50]} />

        <Suspense fallback={null}>
          <CityScene
            progress={scene.cityProgress}
            frozen={scene.cityFrozen}
          />

          <AICore progress={scene.aiCoreProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
