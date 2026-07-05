uniform float uTime;
uniform float uProgress;
uniform vec3 uMouse;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;
attribute float aPhase;

varying float vDistance;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Mouse attraction — particles gravitate toward cursor in the void
  float mouseInfluence = uProgress < 0.15 ? (1.0 - uProgress / 0.15) : 0.0;
  float distToMouse = length(pos.xy - uMouse.xy);
  float attraction = mouseInfluence * (0.8 / (distToMouse * distToMouse + 0.6));
  vec3 mouseDir = normalize(uMouse - pos + vec3(0.001));
  pos += mouseDir * attraction * 0.4;

  // Organic breathing (from logo's living glow)
  float breathe = sin(uTime * 0.7 + aPhase * 2.3) * 0.025;
  pos += aRandomness * breathe;

  // Assembly drift — particles search for their place
  float driftStrength = smoothstep(0.0, 0.35, uProgress) * (1.0 - smoothstep(0.35, 0.65, uProgress));
  pos += aRandomness * driftStrength * 2.5;

  // Explosion — logo shatters, camera dives
  float explodeStart = 0.65;
  float explodeProgress = smoothstep(explodeStart, 1.0, uProgress);
  pos += aRandomness * explodeProgress * 18.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float dist = -mvPosition.z;
  gl_PointSize = uSize * aScale * uPixelRatio * (300.0 / dist);
  gl_PointSize = clamp(gl_PointSize, 0.5, 14.0);

  vDistance = dist;
  vAlpha = 1.0 - explodeProgress * 0.6;
}
