// GPU performance detection and particle count management

export type GPUTier = 'high' | 'mid' | 'low' | 'minimal'

export interface GPUCapabilities {
  tier: GPUTier
  particleCount: number
  usePostProcessing: boolean
  useBloom: boolean
  maxTextureSize: number
  isMobile: boolean
}

let cachedCapabilities: GPUCapabilities | null = null

export async function detectGPUCapabilities(): Promise<GPUCapabilities> {
  if (cachedCapabilities) return cachedCapabilities

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')

  if (!gl) {
    return {
      tier: 'minimal',
      particleCount: 2000,
      usePostProcessing: false,
      useBloom: false,
      maxTextureSize: 512,
      isMobile,
    }
  }

  const renderer = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).RENDERER) as string
  const maxTextureSize = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_TEXTURE_SIZE) as number

  // Classify GPU
  const isHighEnd = /RTX|RX 6|RX 7|M1|M2|M3|Apple/.test(renderer)
  const isMidRange = /GTX|RX 5|Intel Iris|Radeon|Adreno 6|Mali-G7/.test(renderer)

  let tier: GPUTier
  let particleCount: number
  let usePostProcessing: boolean
  let useBloom: boolean

  if (isMobile) {
    tier = 'low'
    particleCount = 5000
    usePostProcessing = false
    useBloom = false
  } else if (isHighEnd) {
    tier = 'high'
    particleCount = 50000
    usePostProcessing = true
    useBloom = true
  } else if (isMidRange) {
    tier = 'mid'
    particleCount = 20000
    usePostProcessing = true
    useBloom = true
  } else {
    tier = 'low'
    particleCount = 8000
    usePostProcessing = false
    useBloom = false
  }

  cachedCapabilities = {
    tier,
    particleCount,
    usePostProcessing,
    useBloom,
    maxTextureSize,
    isMobile,
  }

  return cachedCapabilities
}

export function getPixelRatio(tier: GPUTier): [number, number] {
  switch (tier) {
    case 'high':    return [1, 2]
    case 'mid':     return [1, 1.5]
    case 'low':     return [1, 1]
    case 'minimal': return [0.5, 1]
  }
}
