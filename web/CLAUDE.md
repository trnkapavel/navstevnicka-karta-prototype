@AGENTS.md

# Customer Journey v2 — Previo

Interaktivní sales stránka: cesta hotelového hosta od A do Z. Editorial layout + scroll choreografie + Alfred jako průvodce.

**Jazyk komunikace s uživatelem:** česky s diakritikou.

---

## Tech stack

- **Next.js 16** (App Router), TypeScript
- **CSS Modules** — bez Tailwind
- **Motion** (`motion/react`) — UI animace Alfreda, ScrollReveal
- **GSAP + ScrollTrigger** — pin, scrub (Ch04 orbit, finale)
- **Spline** — hero scéna (slot existuje, scéna nemusí být hotová)

Git repozitář je **jen ve složce `web/`** (ne v kořeni monorepa).

---

## Obsah a build pipeline

```
content/journey.yaml
  → scripts/build-journey.mjs
  → src/data/journey.generated.ts
```

- YAML = texty, tagy, CTA, `motion.profile` per sekce
- Pole `layout` z wireframe v1 se **nepoužívá** pro design
- Po úpravě YAML: `npm run build:journey`

---

## Vizuální směr (aktuální — 2026-06)

**Důležité:** Původní „Cinematic Dark / Signal Path“ z `docs/VISUAL-DIRECTION.md` byl **odmítnut**. Previo je **light SaaS**, ne tmavý film.

### Paleta (`src/styles/tokens.css`)

| Token | Hodnota | Použití |
|-------|---------|---------|
| `--void` | `#f8f6f2` | Pozadí stránky |
| `--surface` | `#ffffff` | Karty, panely |
| `--ink` | `#1a1a1a` | Primární text |
| `--red-core` | `#b50000` | Previo červená, akcenty |
| `--brand-purple` | `#6f2f6a` | Sekundární (DS Alfred) |
| `--void-dark` | `#050505` | **Jen finale** kapitola |

### Typografie

- Display: **Instrument Serif**
- UI/body: **Inter**
- Editorial škála v `tokens.css` (`--display-hero`, `--text-base`, …)

### Kapitoly — light vs dark

`src/lib/chapterTheme.ts`:
- Většina kapitol = **light**
- `finale` profil = **dark** (`--void-dark`)
- Pin scroll: jen `form-morph` (Ch04) a `finale`

---

## Architektura komponent

```
JourneyPage.tsx
├── Hero (editorial copy + IsoJourneyMap / SplineScene)
├── ChapterRenderer → per motion.profile
│   ├── form-morph → Ch04FormMorph (orbit formulář)
│   └── default → ChapterShell (intro + content + visual)
├── EpilogueSection
├── FinaleChapter (dark CTA)
└── AlfredGuide (skrytý při pin scroll)
```

### Hero — izometrická mapa

`src/components/Hero/iso/`:
- `IsoJourneyMap`, `IsoLabelBadge`, `IsoSignalPath`, …
- Badge: neaktivní = číslo v kolečku; aktivní = bílá karta s labelem
- Scény: **inline** v `iso/sceneSvgs.tsx` (ne externí `<image href>` — nespolehlivé v SVG)
- `IsoSceneArt.tsx` — vnořený `<svg viewBox>` per beat; aktivní = plná, neaktivní = mini + desaturate
- `public/hero/scenes/*.svg` = reference export (ne runtime)

### Alfred průvodce

- SVG: `illustration/alfred.svg` + `public/illustration/alfred.svg`
- Komponenta: `Guide/AlfredGuide.tsx`
- Copy: `lib/alfredGuide.ts` (zatím hardcoded, ne z YAML)
- Layout: bublina vlevo, Alfred vpravo, `scaleX(-1)` na obrázku
- Debounce 420 ms na změnu beatu (`BEAT_SETTLE_MS`)
- Motion: `springAlfred` z `lib/motion/presets.ts`
- Skrytý když `JourneyPage` pinuje kapitolu

**Barvy Alfred SVG** (ruční mapa 33 path indexů — viz `MEMORY.md`):
- Sako, čepice: `#b50000`
- Kalhoty, límec, košile, obličej, ruce: `#ffffff`
- Vlasy, boty, motýlek, pruh čepice: `#202124`

### Ch04 Form Morph

`chapters/Ch04FormMorph.tsx`:
- Bílý formulář uprostřed, orbit karty kolem
- Orbit radius `22.5rem` (menší = překryv textů)
- SVG kruh: `orbitRingTrack` + `orbitRingFill`, GSAP `strokeDashoffset` + scrub
- Červená (`--red-core`), ne fialová

### Editorial scroll

- `ScrollReveal.tsx` + `lib/scrollReveal.ts`
- `ChapterContent`, `ChapterIntro`, `ChapterShell` — nopan.com inspirace

---

## Motion profily (z YAML)

| Profil | Komponenta | Pin |
|--------|------------|-----|
| `constellation` | ChapterShell | ne |
| `rate-field` | ChapterShell (light) | ne |
| `quiet-light` | ChapterShell (light) | ne |
| `form-morph` | Ch04FormMorph | ano |
| `finale` | FinaleChapter (dark) | ano |

Většina profilů zatím sdílí `ChapterShell` — custom kapitoly přidávat do `ChapterRenderer.tsx`.

---

## Dev příkazy

```bash
npm run dev              # localhost:3000
npm run build:journey    # YAML → journey.generated.ts
npm run build            # produkční build
npm run lint
```

---

## Související dokumenty

| Soubor | Stav |
|--------|------|
| `docs/VISUAL-DIRECTION.md` | ⚠️ Částečně zastaralý (dark směr) — viz `MEMORY.md` |
| `../content/journey.yaml` | Aktuální obsah |
| `MEMORY.md` | Rozhodnutí a lekce |
| `AGENTS.md` | Konvence pro agenty |

---

## Otevřené úkoly (priorita)

1. Iso mapa — plné zesvětlení
2. Alfred copy napojit na YAML nebo content layer
3. Aktualizovat `docs/VISUAL-DIRECTION.md` na light SaaS směr
4. Další custom kapitoly dle motion profilů
5. Spline hero scéna — doplnit / doladit
