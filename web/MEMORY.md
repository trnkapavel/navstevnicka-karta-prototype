# MEMORY.md — naučené lekce a rozhodnutí

Živý log toho, co jsme zjistili během vývoje. Aktualizovat po větších pivotech.

**Poslední aktualizace:** 2026-06-12

---

## Klíčová rozhodnutí

### 1. Light SaaS, ne cinematic dark

- Původní směr v `docs/VISUAL-DIRECTION.md` („Signal Path“, tmavé pozadí, filmový launch) **neodpovídá** brandu Previo
- Implementováno: světlé `--void` / `--surface`, černý text, červená `#b50000`
- Tmavé pozadí (`--void-dark`) **pouze** u finale kapitoly
- `docs/VISUAL-DIRECTION.md` je **zastaralý** — popisuje dark směr; potřebuje revizi

### 2. Alfred = SVG, ne PNG

- Uživatel explicitně chce **původní vektor** obarvený podle referenčního bellhopa
- `alfred.png` existuje dočasně — **nepoužívat** v produkci
- Veřejná cesta: `/illustration/alfred.svg`

### 3. Alfred barvy — ruční mapa path indexů

Automatické přebarvení podle Y souřadnic **nefunguje**:
- Path 0 je obří silueta — zasáhne obličej, vlasy, vše
- Řešení: explicitní mapa 33 path indexů → barva

| Barva | Části |
|-------|-------|
| `#b50000` | Sako, čepice |
| `#ffffff` | Kalhoty, límec, košile, obličej, ruce |
| `#202124` | Vlasy, boty, motýlek, pruh čepice |

### 4. Alfred layout a animace

- Bublina **vlevo**, Alfred **vpravo**
- `scaleX(-1)` na `.alfredImg` — ukazuje do bubliny
- U PNG bylo lepší zrcadlit soubor; u SVG stačí CSS transform
- `BEAT_SETTLE_MS = 420` — debounce před změnou copy (méně nervózních skoků)
- Skrýt při scroll pin (`JourneyPage` předává `hidden`)
- Jemný stín pod nohama: `.groundShadow` v `AlfredGuide.module.css`

### 5. Ch04 orbit — spacing matters

- Příliš malý orbit radius → karty překrývají formulář a hint texty
- Funkční hodnota: `22.5rem` radius, užší karty, `line-clamp: 2` na hint
- Orbit ring: SVG `stroke-dasharray` + GSAP `strokeDashoffset` se scrubem — vizuální progress při scrollu
- Brand akcent: červená, ne fialová u `alfredMark` a orbit prvků

### 6. Obsah vs kód

- `content/journey.yaml` = zdroj pravdy pro sekce
- `alfredGuide.ts` = zatím **hardcoded** generické texty — TODO napojit na YAML
- `journey.generated.ts` = **negenerovat ručně**, vždy přes `npm run build:journey`

### 7. Git struktura

- **Git repozitář je v kořeni** monorepa (`customer-journey-v2/`), ne jen v `web/`
- Remote: https://github.com/trnkapavel/customer-journey-v2
- Obsahuje: `content/`, `docs/`, `illustration/`, `planning/`, `wireframe/`, `web/`

**Pokračování na jiném počítači:**

```bash
git clone https://github.com/trnkapavel/customer-journey-v2.git
cd customer-journey-v2/web
npm install
npm run dev
# → http://localhost:3000
```

Volitelně: zkopírovat `web/.env.local` (Spline URL) — není v repu. Šablona: `web/.env.example`.

**Stav k 2026-06-12:** light SaaS pivot, iso hero mapa (8 SVG dioram), Alfred guide (SVG + path mapa), varied section numbers, animation fixes, light epilogue.

---

## Anti-patterny (co neopakovat)

1. **Auto-recolor SVG podle bounding box / Y** — rozbije multi-color ilustrace
2. **Dark theme jako default** — uživatel odmítl, Previo = light SaaS
3. **Překrývající orbit karty** — vždy testovat s reálným copy z YAML
4. **CSS scaleX na Next/Image s PNG** — nespolehlivé; u SVG OK
5. **Editace generated souborů** — změny se přepíší při buildu
6. **Animace bez účelu** — north star test: animace musí něco komunikovat
7. **Externí SVG přes `<image href>` uvnitř SVG mapy** — broken placeholder; použít inline nested `<svg>` nebo React komponenty
8. **SVG soubory s diakritikou/novými řádky v tagu** — invalid XML, parser odmítne

---

## Co je hotové (2026-06-12)

- [x] Light SaaS pivot — tokens, ChapterShell, Nav, Hero
- [x] Editorial typografie a ScrollReveal
- [x] Hero iso mapa se SVG labely (badge stavy)
- [x] AlfredGuide — komponenta, animace, SVG barvy
- [x] Ch04FormMorph — orbit formulář, animovaný kruh
- [x] EpilogueSection, FinaleChapter (dark)
- [x] chapterTheme.ts — light/dark + pin logika
- [x] Hero atmosféra — grain, vignette, světelné vrstvy
- [x] Nav + desktop layout kompozice

---

## Otevřené / další kroky

| Priorita | Úkol | Poznámka |
|----------|------|----------|
| 🔴 | Aktualizovat `docs/VISUAL-DIRECTION.md` | Light směr, zahodit dark jako primární |
| 🟢 | Iso hero Fáze 1 — spotlight + světlé plošiny | Hotovo 2026-06-12 |
| 🟢 | Iso hero Fáze 2 — 8 SVG dioram v `public/hero/scenes/` | Hotovo 2026-06-12 |
| 🟡 | Alfred copy z YAML | Místo hardcoded `alfredGuide.ts` |
| 🟡 | Custom kapitoly pro další motion profily | Většina jde přes generic ChapterShell |
| 🟢 | Spline hero scéna | Slot hotový, obsah doladit |
| 🟢 | Smazat / ignorovat `alfred.png` | Po potvrzení SVG verze |

---

## Reference a inspirace

- **Editorial scroll:** nopan.com — ScrollReveal, chapter rhythm
- **Alfred bellhop:** referenční obrázek pro barvy saka/čepice
- **Previo DS:** `#6f2f6a` purple, `#b50000` red (Alfred 2.0 projekt — související, ale jiná app)
- **Wireframe v1:** `wireframe/` — struktura 8 fází, layout field ignorovat

---

## Historie pivotů

| Datum | Změna |
|-------|-------|
| 2026-06-12 | Start v2, YAML pipeline |
| 2026-06-12 | Cinematic dark → **light SaaS pivot** |
| 2026-06-12 | Alfred PNG pokus → **SVG + ruční path mapa** |
| 2026-06-12 | Ch04 orbit overlap fix + animovaný ring |
| 2026-06-12 | Paměťové soubory — CLAUDE.md, AGENTS.md, MEMORY.md |
| 2026-06-12 | Iso hero Fáze 1 — spotlight scény, světlé plošiny, YAML tagy, oprava beat 1/4/5/8 |
| 2026-06-12 | Iso hero Fáze 2 — 8 iso SVG dioram (`beat-01`…`08`), `IsoSceneArt.tsx` |
| 2026-06-12 | Fix scén — inline `sceneSvgs.tsx`; externí SVG v `<image>` + poškozené XML nefungovalo |
