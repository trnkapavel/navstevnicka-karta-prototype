import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <!-- Světlé pozadí — stejná barva jako app bg -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#e8f4ef"/>
      <stop offset="100%" stop-color="#ddeaf8"/>
    </linearGradient>

    <!-- Gradient jehly: zelená → teal → modrá (barvy aplikace) -->
    <linearGradient id="north" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#22d48a"/>
      <stop offset="50%"  stop-color="#1a7a5e"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <!-- Jemný stín pod kompasem -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="14" flood-color="#1a7a5e" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Pozadí -->
  <rect width="512" height="512" fill="url(#bg)"/>

  <!-- Kruh — rám kompasu, jemný -->
  <circle cx="256" cy="256" r="192"
    fill="none"
    stroke="#1a7a5e"
    stroke-width="3"
    opacity="0.14"/>

  <!-- Čtyři orientační tečky -->
  <circle cx="256" cy="64"  r="6" fill="#1a7a5e" opacity="0.30"/>
  <circle cx="448" cy="256" r="5" fill="#1a7a5e" opacity="0.14"/>
  <circle cx="64"  cy="256" r="5" fill="#1a7a5e" opacity="0.14"/>
  <circle cx="256" cy="448" r="5" fill="#1a7a5e" opacity="0.10"/>

  <!-- Severní jehla — tučná, gradient -->
  <polygon
    points="256,64  292,274  256,296  220,274"
    fill="url(#north)"
    filter="url(#shadow)"
  />

  <!-- Jižní jehla — kratší, neutrální šedá -->
  <polygon
    points="256,448 292,274  256,296  220,274"
    fill="#b0c4ba"
    opacity="0.7"
  />

  <!-- Střed: bílý kroužek + barevná tečka -->
  <circle cx="256" cy="285" r="22" fill="white" opacity="0.95"/>
  <circle cx="256" cy="285" r="13" fill="url(#north)"/>
  <circle cx="256" cy="285" r="5"  fill="white"/>
</svg>`;

const buf = Buffer.from(svg);
for (const size of [192, 512]) {
  await sharp(buf).resize(size, size).png().toFile(`public/icon-${size}.png`);
  console.log(`✓ icon-${size}.png`);
}
