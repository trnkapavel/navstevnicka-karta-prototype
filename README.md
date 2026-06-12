# Customer Journey v2

Interaktivní prezentace cesty hotelového hosta od A do Z pro **Previo**. Editorial layout, scroll choreografie a Alfred jako průvodce.

Monorepo s git repozitářem v kořeni — remote: [github.com/trnkapavel/customer-journey-v2](https://github.com/trnkapavel/customer-journey-v2)

## Struktura monorepa

| Složka | Účel |
|--------|------|
| `content/` | Zdroj pravdy pro texty, CTA, motion profily (`journey.yaml`) |
| `docs/` | Vizuální směr a specifikace (část zastaralá — viz `web/MEMORY.md`) |
| `illustration/` | Zdrojové SVG (např. `alfred.svg`) |
| `planning/` | Projektové plánování a reference |
| `wireframe/` | Wireframe reference z v1 |
| `web/` | **Next.js aplikace** — hlavní vývoj zde |

## Rychlý start

```bash
git clone https://github.com/trnkapavel/customer-journey-v2.git
cd customer-journey-v2/web
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

## Skripty (`web/`)

| Příkaz | Popis |
|--------|-------|
| `npm run dev` | Dev server (před spuštěním automaticky regeneruje obsah) |
| `npm run generate:journey` | YAML → `src/data/journey.generated.ts` |
| `npm run build` | Produkční build |
| `npm run start` | Spuštění produkčního buildu lokálně |
| `npm run lint` | ESLint |

## Obsah

Texty, tagy, CTA a motion profily kapitol jsou v `content/journey.yaml`. Po úpravě YAML spusťte:

```bash
npm run generate:journey
```

Příkazy `dev` a `build` obsah regenerují automaticky (`predev` / `prebuild`). Soubor `web/src/data/journey.generated.ts` se negeneruje ručně.

## Hero vizuál

Výchozí hero je **izometrická mapa** (`iso`). Alternativně lze zapnout **Spline** scénu přes proměnné prostředí.

Zkopírujte šablonu a upravte podle potřeby:

```bash
cp .env.example .env.local
```

| Proměnná | Hodnota |
|----------|---------|
| `NEXT_PUBLIC_HERO_VISUAL` | `iso` (výchozí) nebo `spline` |
| `NEXT_PUBLIC_SPLINE_SCENE_URL` | URL Spline exportu — jen při `spline` |

## AI kontext

Pro práci s AI agenty ve složce `web/`:

- [`web/CLAUDE.md`](web/CLAUDE.md) — plný projektový kontext
- [`web/AGENTS.md`](web/AGENTS.md) — pravidla a konvence pro agenty
- [`web/MEMORY.md`](web/MEMORY.md) — rozhodnutí, naučené lekce, otevřené úkoly

## Vizuální směr

**Light SaaS** — světlé pozadí, černý text, editorial typografie. Previo červená **`#b50000`** pro akcenty a brand prvky. Tmavé pozadí jen u finale kapitoly.

Design tokeny: `web/src/styles/tokens.css`

## Co není v repozitáři

Tyto soubory a složky jsou v `.gitignore` a je třeba je vytvořit lokálně:

- `web/.env.local` — lokální konfigurace (viz `.env.example`)
- `web/node_modules/` — závislosti (`npm install`)
- `web/.next/` — build cache Next.js
