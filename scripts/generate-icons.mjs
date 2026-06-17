import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <!-- Světlé pozadí -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#e8f4ef"/>
      <stop offset="100%" stop-color="#ddeaf8"/>
    </linearGradient>

    <!-- Gradient jehly: zelená → teal → modrá -->
    <linearGradient id="north" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#22d48a"/>
      <stop offset="50%"  stop-color="#1a7a5e"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <!-- Stín jehly -->
    <filter id="shadow" x="-40%" y="-10%" width="180%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#0a2818" flood-opacity="0.28"/>
    </filter>
  </defs>

  <!-- Pozadí -->
  <rect width="512" height="512" fill="url(#bg)"/>

  <!-- Vnější rám kompasu -->
  <circle cx="256" cy="256" r="212"
    fill="none" stroke="#1a7a5e" stroke-width="5" opacity="0.20"/>

  <!-- Rysky — 4 kardinální (delší) + 4 mezilehlé (kratší) -->
  <!-- N -->
  <line x1="256" y1="36"  x2="256" y2="66"  stroke="#1a7a5e" stroke-width="5.5" stroke-linecap="round" opacity="0.55"/>
  <!-- S -->
  <line x1="256" y1="446" x2="256" y2="476" stroke="#1a7a5e" stroke-width="4"   stroke-linecap="round" opacity="0.20"/>
  <!-- E -->
  <line x1="446" y1="256" x2="476" y2="256" stroke="#1a7a5e" stroke-width="4"   stroke-linecap="round" opacity="0.20"/>
  <!-- W -->
  <line x1="36"  y1="256" x2="66"  y2="256" stroke="#1a7a5e" stroke-width="4"   stroke-linecap="round" opacity="0.20"/>
  <!-- NE -->
  <line x1="396" y1="116" x2="412" y2="100" stroke="#1a7a5e" stroke-width="3"   stroke-linecap="round" opacity="0.12"/>
  <!-- SE -->
  <line x1="396" y1="396" x2="412" y2="412" stroke="#1a7a5e" stroke-width="3"   stroke-linecap="round" opacity="0.12"/>
  <!-- SW -->
  <line x1="116" y1="396" x2="100" y2="412" stroke="#1a7a5e" stroke-width="3"   stroke-linecap="round" opacity="0.12"/>
  <!-- NW -->
  <line x1="116" y1="116" x2="100" y2="100" stroke="#1a7a5e" stroke-width="3"   stroke-linecap="round" opacity="0.12"/>

  <!-- "N" označení severu -->
  <text x="256" y="30"
    text-anchor="middle" dominant-baseline="auto"
    font-family="system-ui, -apple-system, sans-serif"
    font-weight="900" font-size="44"
    fill="#1a7a5e" opacity="0.62">N</text>

  <!-- Severní jehla — tučná, gradient -->
  <polygon points="256,76  296,266  256,292  216,266"
    fill="url(#north)" filter="url(#shadow)"/>

  <!-- Jižní jehla — šedá -->
  <polygon points="256,436 296,266  256,292  216,266"
    fill="#b0c4ba" opacity="0.60"/>

  <!-- Střed: bílý kroužek + gradient tečka -->
  <circle cx="256" cy="279" r="24" fill="white" opacity="0.96"/>
  <circle cx="256" cy="279" r="14" fill="url(#north)"/>
  <circle cx="256" cy="279" r="5.5" fill="white"/>
</svg>`;

const buf = Buffer.from(svg);
for (const size of [192, 512]) {
  await sharp(buf).resize(size, size).png().toFile(`public/icon-${size}.png`);
  console.log(`✓ icon-${size}.png`);
}
