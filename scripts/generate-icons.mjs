import sharp from "sharp";
import { writeFileSync } from "fs";

// SVG icon — "průvodce do kapsy" Linear-style
// Tmavé pozadí, stylizovaný kompas s gradientem zelená→modrá
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22c98a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f2a1e"/>
      <stop offset="100%" stop-color="#0d1e35"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#1a7a5e" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#0c1810" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Pozadí -->
  <rect width="512" height="512" fill="url(#g2)"/>
  <rect width="512" height="512" fill="url(#glow)"/>

  <!-- Kompas: horní hrot (sever) — gradient, tučný -->
  <polygon
    points="256,96 288,272 256,288 224,272"
    fill="url(#g1)"
  />

  <!-- Kompas: dolní hrot (jih) — bílý, poloprůhledný -->
  <polygon
    points="256,416 288,272 256,288 224,272"
    fill="rgba(255,255,255,0.18)"
  />

  <!-- Střed kompasu — malý kroužek -->
  <circle cx="256" cy="280" r="14" fill="#0d1e35" stroke="url(#g1)" stroke-width="3"/>

  <!-- Vnější kruh — jemný, rámující -->
  <circle cx="256" cy="256" r="178" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1.5"/>

  <!-- 4 tečky na světových stranách — jemné orientační body -->
  <circle cx="256" cy="96" r="0" fill="none"/>
  <circle cx="434" cy="256" r="5" fill="rgba(255,255,255,0.12)"/>
  <circle cx="78"  cy="256" r="5" fill="rgba(255,255,255,0.12)"/>
</svg>`;

const svgBuffer = Buffer.from(svg);

for (const size of [192, 512]) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}.png`);
  console.log(`✓ icon-${size}.png`);
}
