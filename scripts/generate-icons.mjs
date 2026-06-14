import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <!-- Gradient aplikace: zelená nahoře → modrá dole (jako v app) -->
    <linearGradient id="appGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#34d99a"/>
      <stop offset="50%"  stop-color="#1a7a5e"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <!-- Tmavé pozadí s nádechem zelené -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#0b1f15"/>
      <stop offset="100%" stop-color="#080f1e"/>
    </linearGradient>
    <!-- Záblesk za jehlou -->
    <radialGradient id="glow" cx="50%" cy="35%" r="40%">
      <stop offset="0%"   stop-color="#1a7a5e" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#1a7a5e" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Pozadí -->
  <rect width="512" height="512" fill="url(#bg)"/>
  <!-- Záblesk -->
  <ellipse cx="256" cy="180" rx="140" ry="110" fill="url(#glow)"/>

  <!-- Kruh kompasu -->
  <circle cx="256" cy="256" r="196" fill="none"
    stroke="#1a7a5e" stroke-width="1.5" opacity="0.30"/>
  <circle cx="256" cy="256" r="196" fill="none"
    stroke="#2563eb" stroke-width="1.5" opacity="0.15"
    stroke-dasharray="4 8"/>

  <!-- Severní jehla — silná, gradient zelená→modrá -->
  <polygon points="256,52  286,264  256,286  226,264"
    fill="url(#appGrad)"/>

  <!-- Jižní jehla — kratší, bílá, tlumená -->
  <polygon points="256,460 286,264  256,286  226,264"
    fill="white" opacity="0.13"/>

  <!-- Východní a západní jehla — tenká -->
  <polygon points="460,256 268,236 268,276" fill="white" opacity="0.10"/>
  <polygon points="52,256  244,236 244,276" fill="white" opacity="0.10"/>

  <!-- Střed -->
  <circle cx="256" cy="275" r="20" fill="#080f1e"/>
  <circle cx="256" cy="275" r="12" fill="url(#appGrad)" opacity="0.95"/>
  <circle cx="256" cy="275" r="5"  fill="white" opacity="0.95"/>
</svg>`;

const buf = Buffer.from(svg);
for (const size of [192, 512]) {
  await sharp(buf).resize(size, size).png().toFile(`public/icon-${size}.png`);
  console.log(`✓ icon-${size}.png`);
}
