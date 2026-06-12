# Spline Hero — workflow pro Customer Journey

**Pro koho:** designér bez 3D zkušeností  
**Cíl:** brutálně profi 3D hero scéna → animace na webu  
**Rozhodnutí:** ✅ Spline · ❌ Blender (jen jako plan B)

---

## Proč Spline, ne Blender

| | Spline | Blender + MCP |
|---|--------|----------------|
| **Tvoje práce** | Prompt + klikání v browseru | Instalace, addon, MCP, ladění |
| **AI role** | Text-to-3D objekty, Spell scény | Agent ovládá Blender přes socket |
| **Export na web** | Nativní React komponenta | Render → video nebo složitý glTF pipeline |
| **Kvalita pro sales hero** | Dobrá, pokud scénu sestavíš z čistých objektů | Nepředvídatelná z promptů |
| **Kdo udělá integraci** | Já (Next.js + GSAP) | Ty + já + hodiny debugování |

**Blender MCP** existuje (Cursor ho umí ovládat), ale pro prezentaci Previo sales je to **overkill** — výsledek z „postav hotel z promptu“ často vypadá právě jako AI slop.

---

## Rozdělení práce

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  TY + Spline AI │ ──► │  Spline scéna    │ ──► │  JÁ: Next.js    │
│  (30–60 min)    │     │  export URL      │     │  hero + animace │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

- **Ty:** Spline účet, vygenerovat/zkombinovat scénu, exportovat URL  
- **AI (Spline):** generuje objekty z textu — **nesestaví** celý art direction sám  
- **Já:** `@splinetool/react-spline`, layout B, GSAP scroll, pulse na 8 bodech, `prefers-reduced-motion`

---

## Krok za krokem (Spline)

### 1. Účet a projekt
1. [spline.design](https://spline.design) — free tier stačí na start
2. Nový soubor: **CJ Hero — Signal Path**
3. Canvas: tmavé pozadí `#050505`

### 2. Vygeneruj objekty (AI Text-to-3D)
V Spline: **AI Generate** → text prompt. Generuj **po jednom**, ne celou scénu najednou.

**Prompty (zkopíruj):**

```
Minimal isometric hotel building, dark matte surfaces, 
no textures, architectural diagram style, single object, 
clean edges, low poly, dark gray #1a1a1a
```

```
Isometric hotel reception desk, minimal, dark, 
single furniture piece, clean geometry
```

```
Isometric bed room module, hotel, minimal dark, 
low poly architectural
```

```
Small isometric smartphone, dark glass screen, 
minimal, product visualization
```

Pro každý prompt: vyber **nejčistší variantu** (ne nejrealističtější).

### 3. Sestav scénu ručně (15 min)
- **Ne** Spell AI celé scény (drahé, experimentální, generické)
- Poskládej hotel z vygenerovaných modulů
- Materiály: matte dark `#242424`, edges světlejší `#f4f1ec` 15 % opacity
- **Jediný akcent:** červená `#b50000` — cesta + 8 bodů

### 4. Osm journey bodů
Přidej 8 prázdných objektů (sphere r=0.3), pojmenuj v Spline:

| Objekt | Název v Spline | Pozice v scéně |
|--------|----------------|----------------|
| 01 | `beat-01-search` | Mimo hotel, vlevo |
| 02 | `beat-02-booking` | Vstup |
| 03 | `beat-03-planning` | U recepce |
| 04 | `beat-04-checkin` | Mobil u dveří |
| 05 | `beat-05-arrival` | Recepce |
| 06 | `beat-06-stay` | Pokoje |
| 07 | `beat-07-checkout` | Výstup |
| 08 | `beat-08-followup` | Mimo hotel, vpravo |

Červená spline křivka je propojí (Tube nebo Path v Spline).

### 5. Animace v Spline (základní)
- `beat-01`: scale pulse loop (1 → 1.3 → 1, 2s)
- Path: reveal animace při Start event
- Kamera: fixed isometric — **nepohybuj kamerou** (scroll řídí web)

### 6. Export pro web
1. Export → **Code** → **React**
2. Zkopíruj URL: `https://prod.spline.design/XXXXX/scene.splinecode`
3. Pošli mi URL → zapojím do projektu

---

## Co udělám já v kódu

```tsx
// Hero.tsx — struktura
<div className="hero">
  <div className="hero__visual">
    <Spline scene={SPLINE_URL} onLoad={onSplineLoad} />
  </div>
  <div className="hero__copy">
    {/* journey.yaml copy, 88px Instrument Serif */}
  </div>
</div>
```

- `next/dynamic` + `ssr: false` — Spline neblokuje LCP
- Loading: blurred placeholder nebo dark skeleton
- `prefers-reduced-motion`: statický frame, žádný pulse
- GSAP: text reveal při scrollu; Spline eventy pro beat highlight

---

## Když Spline AI nestačí

| Možnost | Cena | Kvalita |
|---------|------|---------|
| Spline ruční sestavení | Free–$24/m | ★★★☆ |
| Fiverr „isometric hotel 3D“ | $50–150 | ★★★★ |
| Previo designér/externista | interní | ★★★★★ |
| Spell AI celá scéna | drahé, experiment | ★★☆ |

**Doporučení:** zkus Spline AI objekty + ruční sestavení. Pokud po 1 hodině nevypadá profi → Fiverr brief (pošlu text).

---

## Figma mezitím

Ve Figmě necháme **placeholder** „Spline 3D zone“ — správné rozměry a pozice, bez SVG iso. Finální vizuál = Spline export.

---

## Checklist před odevzdáním Spline URL

- [ ] Pozadí `#050505`, žádné stock textury
- [ ] 8 objektů pojmenovaných `beat-01` … `beat-08`
- [ ] Červená cesta mezi body
- [ ] Scéna vyplní ~60 % šířky, horní část viewportu
- [ ] Export URL funguje v anonymním okně
