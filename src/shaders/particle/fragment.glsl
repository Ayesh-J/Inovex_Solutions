// INOVEX Brand Colors — from logo.jpeg
// ColorA: #7C3AED (Brand Purple — gear body)
// ColorB: #C084FC (Soft Violet — gear metallic sheen)
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;

varying float vDistance;
varying float vAlpha;

void main() {
  // Circular point with soft edge
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float alpha = 1.0 - smoothstep(0.25, 0.5, dist);

  // Color oscillates between brand purple and soft violet
  // Matches the gear's gradient from deep to bright
  float colorMix = sin(uTime * 0.4 + vDistance * 0.08) * 0.5 + 0.5;
  vec3 color = mix(uColorA, uColorB, colorMix);

  // Glow core — replicates the logo's purple bloom
  float glowCore = 1.0 - smoothstep(0.0, 0.15, dist);
  color += glowCore * uColorB * 0.4;

  gl_FragColor = vec4(color, alpha * vAlpha);
}
