# Visual Direction v2 — Customer Journey · Previo

**Verze:** 2.0 — čistý restart  
**Datum:** 2026-06-12  
**Status:** Schválený směr, před hi-fi

---

## Restart manifest

| Bereme | Zahazujeme |
|--------|------------|
| Copy z `content/journey.yaml` (8 fází, CTA) | Wireframe layout (A/B/C/D, timeline vpravo) |
| Sales intent (B2B hotelier, CZ) | v1 HTML prototyp jako vizuální reference |
| Ambice Apple-tier prezentace | v1 isometric spec jako hotový návod — jen inspirace struktury |
| Hero koncept: editorial vlevo + journey scéna vpravo | „Premium SaaS landing“ estetika (Mews, Cloudbeds) |
| Předchozí Figma pokus | Iterace na polovičatém frame — nový soubor |

**North star:** Stránka musí vypadat jako **launch film produktu**, ne jako marketing page hotelového PMS.

**Brutální profi test** (všechny 4 musí projít):
1. Screenshot hero funguje samostatně na LinkedIn bez kontextu
2. Sales kolega řekne „wow“ do 3 sekund — bez vysvětlení
3. Na první pohled **nejde poznat**, že jde o předělaný wireframe
4. Animace na webu má **důvod** — ne dekorace

---

## Koncept: SIGNAL PATH

Hostova cesta = **signál** procházející tmavým prostorem. Previo červená není brand barva na tlaíítkách — je to **energie**, která propojuje 8 momentů.

```
Chaos ──●──●──●──●──●──●──●──●── Klid
        01  02  03  04  05  06  07  08
```

- **Tmavo** dominuje (90 %+ viewportu)
- **Světlo** je vzácné a významné
- **Typografie** je primární vizuál — ne ilustrace jako náhrada za nápad
- **Jeden hero moment** ukáže celou cestu najednou — zbytek stránky ji rozebere

---

## Hero — jediný quality bar (stavíme první)

### Layout (desktop 1440)

```
┌────────────────────────────────────────────────────────────┐
│  Previo          ● ○ ○ ○ ○ ○ ○ ○                    01/08 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  CUSTOMER JOURNEY · PREVIO          ┌──────────────────┐ │
│                                       │                  │ │
│  Pomůžeme s obsluhou                  │  ISOMETRIC       │ │
│  Vašeho hosta                         │  JOURNEY MAP     │ │
│  od A do Z,                           │                  │ │
│  a nejen to.                          │  8 beatů v jedné │ │
│                                       │  scéně + červená │ │
│  Víme, jak vypadá cesta…              │  signal path     │ │
│                                       │                  │ │
│  scroll ↓                             └──────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
     40% šířky — editorial              60% — living scene
```

- Text **vlevo dole** (Apple keynote), ne centrovaný
- Scéna **vpravo** — izometrická mapa hotelu + cesta hosta přes všech 8 bodů
- Na webu: scéna **živá** (path draw, pulse dots, parallax layers) — ve Figmě statický „final frame“ + motion annotations

### Typografie

| Role | Font | Poznámka |
|------|------|----------|
| Display | **Instrument Serif** Regular + Italic | „od A do Z,“ v italic, ne `<em>` červené |
| UI | **Inter** Medium | Eyebrow, nav, labels |
| Body | **Inter** Regular | Subtitle |

**Scale hero:** H1 `clamp(56px, 5vw, 88px)` — velké, ale ne přes celou šířku.

### Barvy

```css
--void:       #050505;
--surface:    #0e0e0e;
--warm:       #f4f1ec;
--warm-dim:   rgba(244, 241, 236, 0.42);
--red-core:   #b50000;
--red-signal: rgba(181, 0, 0, 0.65);  /* path, active dot */
--red-aura:   rgba(181, 0, 0, 0.25);  /* ambient glow */
```

**Glow pravidlo:** Červená svítí — nikdy flat fill na velké ploše. H1 italic = 3 vrstvy shadow (24 / 64 / 120px blur).

### Isometric journey map (pravá strana)

**Co ukazuje:** Zjednodušený hotel (vstup → recepce → pokoje → služby) + 8 bodů mimo/uvnitř budovy.

| # | Tag | Pozice ve scéně | Vizuální hint |
|---|-----|-----------------|---------------|
| 01 | Hledání | Mimo hotel, vlevo nahoře | Globální body / kanály |
| 02 | Rezervace | Vstup / recepce | Kalendář / booking |
| 03 | Plánování | U recepce | Mobil / zprávy |
| 04 | Online check-in | Dveře / mobil | Formulář |
| 05 | Příjezd | Recepční pult | Klíč / PIN |
| 06 | Pobyt | Střed pokojů | Postel / klid |
| 07 | Check-out | Výstup | Platba / check |
| 08 | Po odjezdu | Mimo hotel, vpravo | Hvězda / email |

**Styl scény (Cinematic Dark, ne v1 off-white):**
- Stěny: `#141414`, stroke `rgba(244,241,236,0.12)`
- Plochy/střechy: `rgba(255,255,255,0.05)`
- Signal path: červená čára, glow, tečkovaná → na webu animovaný stroke
- Body: červené kruhy `r=5` + ping ring (scale 1→2.5, fade)

**Web animace (hero only):**
1. Podlaha fade in (0.3s)
2. Stěny stagger shora (0.5s + i×0.04s)
3. Path `pathLength` 0→1 (0.9s, 1.2s duration)
4. Dots scale in stagger (1.2s + i×0.08s, spring)
5. Kontinuální pulse na každém bodu

### Co hero NEMÁ

- Centrovaný text přes celou šířku
- CSS booking chart z wireframe
- WebGL shader z v1 (pokud nepřinese jasný upgrade)
- Generický stock hotel foto

---

## 8 kapitol — každá unikátní (po hero)

Hero je **mapa celé cesty**. Kapitoly 01–08 jsou **zoom-in** na jednotlivý beat — žádný opakující se layout.

| # | Vizuální režim | Princip |
|---|----------------|---------|
| 01 | Constellation | Kanály se propojí do jednoho uzlu |
| 02 | Rate field | Chaos → strukturovaný grid |
| 03 | Itinerary stream | Mobil, zprávy tečou |
| 04 | Form morph ⭐ PINNED | Alfréd — formulář se vyplní sám |
| 05 | Threshold | Cinematic dveře + PIN |
| 06 | Quiet light | Jediná světlá sekce — klid |
| 07 | Swipe complete | Apple Pay moment |
| 08 | Ripple | Vlny review / email |
| Finale | Red mesh CTA | Pinned závěr |

Detail kapitol: viz. původní sekce 7 v tomto docu (zachováno níže).

---

## Tech stack (web)

```
Next.js 15 + TypeScript
GSAP + ScrollTrigger  — scroll choreografie
Lenis                 — smooth scroll
Hero iso: SVG + Framer Motion NEBO Rive (rozhodnout po hero hi-fi)
CSS Modules + design tokens
content/journey.yaml
```

**Pořadí implementace:** Hero perfektní → Ch.04 → Finale → zbytek.

---

## Figma workflow (restart)

1. **Nový soubor:** `CJ-v2 Signal Path` (starý `CJ-v2 Cinematic Dark` archivovat)
2. **Stránka 1:** Foundations (tokeny)
3. **Stránka 2:** Hero Desktop 1440 — final frame
4. **Stránka 3:** Hero Mobile 390
5. **Stránka 4:** Motion annotations
6. **Quality gate:** Hero schválen → teprve kapitoly

---

## Reference tier

| Ano | Ne |
|-----|-----|
| apple.com/iphone (scroll, type) | mews.com |
| stripe.com (depth, restraint) | cloudbeds.com |
| linear.app (dark craft) | wireframe v1 |
| raycast.com (precision, glow) | generic isometric SaaS |

---

## Kapitoly — detail (zachováno)

### 01 Constellation
Kanály jako světelné body → propojení do Previo hubu. Scroll pin 150vh.

### 02 Rate field
3D grid dostupnosti, floating labels místo karet.

### 03 Itinerary stream
iPhone mock, zprávy scrubované scroll-em.

### 04 Form morph (pinned 250vh)
Centrální panel, orbit 4 capabilities kolem Alfréda.

### 05 Threshold
Full-bleed foto dveří, Ken Burns, PIN ve světle.

### 06 Quiet presence
`--warm-white` pozadí, jedna Alfred notifikace, extrémní whitespace.

### 07 Swipe complete
3 kroky checkoutu v jednom horizontálním swipe.

### 08 Ripple
Koncentrické vlny nesou review / email / promo ikony.

### Finale
Pinned CTA, red mesh, fade to black.

---

## Changelog

| Verze | Změna |
|-------|-------|
| 1.0 | Cinematic Dark — první návrh |
| 2.0 | **Restart** — Signal Path, hero-first, zahození v1 vizuálu |
