import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <!-- Gradient aplikace: tmavá zelená → modrá -->
    <linearGradient id="needle" x1="0%" y1="0%" x2="60%" y2="100%">
      <stop offset="0%" stop-color="#34d99a"/>
      <stop offset="55%" stop-color="#1a7a5e"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>

    <!-- Pozadí: hluboká tma s nádechem zelené -->
    <linearGradient id="bg" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#071510"/>
      <stop offset="100%" stop-color="#080f1f"/>
    </linearGradient>

    <!-- Záblesk uprostřed -->
    <radialGradient id="glow" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="#1a7a5e" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="#2563eb" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>

    <!-- Jemný lesk na horním okraji ikonky -->
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="white" stop-opacity="0.07"/>
      <stop offset="40%" stop-color="white" stop-opacity="0"/>
    </linearGradient>

    <!-- Gradient pro jižní (světlý) hrot -->
    <linearGradient id="south" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="white" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="white" stop-opacity="0.06"/>
    </linearGradient>
  </defs>

  <!-- Pozadí -->
  <rect width="512" height="512" fill="url(#bg)"/>
  <rect width="512" height="512" fill="url(#glow)"/>
  <rect width="512" height="512" fill="url(#shine)"/>

  <!-- Vnější dekorativní kruh -->
  <circle cx="256" cy="248" r="176"
    fill="none"
    stroke="url(#needle)"
    stroke-width="1.2"
    stroke-opacity="0.22"/>

  <!-- Vnitřní jemný kruh -->
  <circle cx="256" cy="248" r="138"
    fill="none"
    stroke="white"
    stroke-width="0.8"
    stroke-opacity="0.06"/>

  <!-- Čtyři orientační tečky na kruhu -->
  <circle cx="256" cy="72"  r="3.5" fill="#34d99a" opacity="0.7"/>
  <circle cx="432" cy="248" r="3" fill="white" opacity="0.18"/>
  <circle cx="80"  cy="248" r="3" fill="white" opacity="0.18"/>
  <circle cx="256" cy="424" r="3" fill="white" opacity="0.12"/>

  <!-- Severní hrot (velký, gradient) -->
  <polygon points="256,72  278,258  256,274  234,258" fill="url(#needle)"/>

  <!-- Jižní hrot (kratší, světlý) -->
  <polygon points="256,424 278,258  256,274  234,258" fill="url(#south)"/>

  <!-- Východní hrot (tenký) -->
  <polygon points="432,248 262,240 262,256 262,256" fill="white" fill-opacity="0.10"/>
  <!-- Západní hrot (tenký) -->
  <polygon points="80,248  250,240 250,256 250,256" fill="white" fill-opacity="0.10"/>

  <!-- Střed — bílý kroužek s tmavým jádrem -->
  <circle cx="256" cy="266" r="11" fill="#0a1a14"/>
  <circle cx="256" cy="266" r="7"  fill="url(#needle)" opacity="0.9"/>
  <circle cx="256" cy="266" r="3"  fill="white" opacity="0.9"/>
</svg>`;

const buf = Buffer.from(svg);
for (const size of [192, 512]) {
  await sharp(buf).resize(size, size).png().toFile(`public/icon-${size}.png`);
  console.log(`✓ icon-${size}.png`);
}
