// AI Core fragment — Gear-inspired intelligence
// Colors from logo: #8B5CF6 (violet checkmark) + #A855F7 (circuit lavender)
uniform float uTime;
uniform float uProgress;
uniform vec3 uColorCore;   // #8B5CF6 — violet (checkmark)
uniform vec3 uColorAccent; // #A855F7 — lavender (circuit lines)

varying vec3 vPosition;
varying float vNoise;

void main() {
  float noise = vNoise * 0.5 + 0.5;

  // Scanning line effect — circuit data flowing (logo's circuit-line DNA)
  float scanY = sin(vPosition.y * 18.0 - uTime * 2.5) * 0.5 + 0.5;
  scanY = smoothstep(0.35, 0.65, scanY);

  // Pulse rings — like the gear's circular form
  float dist = length(vPosition);
  float pulse = sin(dist * 6.0 - uTime * 1.8) * 0.5 + 0.5;
  pulse = smoothstep(0.3, 0.7, pulse);

  // Compose color from checkmark violet + circuit lavender
  vec3 color = mix(uColorCore, uColorAccent, noise * 0.6 + pulse * 0.25 + scanY * 0.15);

  // Fresnel — the logo's glow bleeding at edges
  float fresnel = pow(1.0 - abs(dot(normalize(vPosition), vec3(0.0, 0.0, 1.0))), 2.5);
  color += uColorAccent * fresnel * 0.9;

  // Bright core spot — the checkmark center
  float core = 1.0 - smoothstep(0.0, 0.4, dist);
  color += uColorCore * core * 0.5;

  float alpha = (0.6 + fresnel * 0.4 + core * 0.3) * uProgress;

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
