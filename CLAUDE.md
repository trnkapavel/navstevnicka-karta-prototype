# Customer Journey v2 — kořen repozitáře

Monorepo s git repozitářem v kořeni — remote: https://github.com/trnkapavel/customer-journey-v2

## Struktura

| Složka | Účel |
|--------|------|
| `content/journey.yaml` | Zdroj pravdy pro texty, CTA, motion profily |
| `docs/` | Vizuální směr, specifikace (část zastaralá — viz `web/MEMORY.md`) |
| `illustration/` | Zdrojové SVG (např. `alfred.svg`) |
| `planning/` | Projektové plánování, reference |
| `wireframe/` | v1 wireframe reference |
| `web/` | **Next.js aplikace** — hlavní vývoj zde |

## Kde je kontext pro AI

- **`web/CLAUDE.md`** — plný projektový kontext
- **`web/AGENTS.md`** — pravidla a konvence pro agenty
- **`web/MEMORY.md`** — rozhodnutí, naučené lekce, otevřené úkoly

## Rychlý start

```bash
cd web && npm run dev
# → http://localhost:3000
```

Build obsahu: `cd web && npm run build:journey` (generuje `src/data/journey.generated.ts` z YAML).
