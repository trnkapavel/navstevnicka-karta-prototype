# AGENTS.md — Customer Journey v2

Pravidla pro AI agenty pracující v `web/`.

---

## Projektové konvence

### Scope a styl změn

- **Minimální diff** — neměnit nesouvisející soubory
- **CSS Modules** — žádný Tailwind, žádné inline styly kromě výjimek (SVG attrs)
- **Světlý SaaS** — default light; dark jen u `finale` profilu
- **Previo červená** `#b50000` pro akcenty, ne generická fialová u brand prvků
- **Komunikace s uživatelem:** česky s diakritikou

### Obsah

- Texty a CTA editovat v `../content/journey.yaml`, pak `npm run build:journey`
- Nepřidávat marketing copy přímo do komponent bez YAML (výjimka: dočasný `alfredGuide.ts`)

### Animace

- UI micro-interactions: **Motion** (`motion/react`)
- Scroll pin / scrub: **GSAP ScrollTrigger**
- Vždy respektovat `prefers-reduced-motion` (vzor v `AlfredGuide.tsx`, `tokens.css`)
- Animace musí mít **důvod** — ne dekorace

### Alfred

- Používat **SVG** (`/illustration/alfred.svg`), ne PNG
- Barvy path = ruční index mapa v komponentě — **ne** automatické přebarvení podle Y
- `scaleX(-1)` v CSS na `.alfredImg` pro orientaci do bubliny

### Git

- Repozitář je v `web/` — commitovat odtud
- Commitovat jen na explicitní žádost uživatele

---

## Klíčové cesty

```
src/
  app/                    # Next.js App Router
  components/
    Guide/                # AlfredGuide
    Hero/                 # Hero, iso mapa, Spline
    Journey/              # JourneyPage, kapitoly, scroll
    Nav/
  data/
    journey.generated.ts  # generováno — needitovat ručně
    journeyData.ts        # typy a helpery
  lib/
    alfredGuide.ts
    chapterTheme.ts
    motion/presets.ts
    scrollReveal.ts
  styles/
    tokens.css            # design tokeny
scripts/
  build-journey.mjs
public/
  illustration/alfred.svg
```

---

## Přidání nové kapitoly

1. Sekce v `content/journey.yaml` s `motion.profile`
2. `npm run build:journey`
3. Pokud custom vizuál: nová komponenta v `components/Journey/chapters/`
4. Registrace v `ChapterRenderer.tsx` switch
5. Pin logika: `chapterTheme.ts` → `isChapterPinned()`

---

## Co nedělat

| ❌ | ✅ |
|----|-----|
| Tmavé pozadí všude (cinematic dark) | Light `--void` / `--surface`, dark jen finale |
| PNG pro Alfreda | SVG s ruční path mapou |
| Auto-recolor SVG podle Y souřadnic | Explicitní path index → barva |
| Editovat `journey.generated.ts` | Editovat YAML + build script |
| Tailwind / styled-components | CSS Modules |
| Force push na main | Normální PR workflow |

---

## Next.js Agent Rules (oficiální)

<!-- next-agent-rules:start -->

## Next.js Agent Rules

> **For AI agents working in this Next.js codebase.**

### Before You Start

- **Environment:** Never edit `.env` or `.env.*` — use `.env.example` and tell the user to create their own `.env.local`.
- **Node version:** Use the version in `.nvmrc` (run `nvm use` before install/build).
- **Package manager:** Use **npm** (matches `package-lock.json`).

### Project structure

- **`src/app/`** — App Router pages and layouts only.
- **`src/components/`** — Reusable UI; prefer Server Components unless the component needs hooks, browser APIs, or event handlers.
- **`src/lib/`** — Utilities, API clients, shared types.
- **`public/`** — Static assets (paths from site root, e.g. `/illustration/alfred.svg`).

### TypeScript

- Keep **strict** typing; avoid `any` unless unavoidable and commented.
- Prefer `interface` for object shapes; use `type` for unions and mapped types.
- Colocate types with features or under `src/lib/` / `src/types/` when shared.

### React & components

- Default to **Server Components**; add `"use client"` only when needed (state, effects, browser-only APIs, Motion, GSAP).
- One main component per file; name the file after the component (PascalCase).
- Use semantic HTML and accessible patterns (labels, focus, alt text).

### Styling

- **CSS Modules** (`*.module.css`) — scope styles to the component.
- Global tokens in `src/styles/tokens.css`.
- No Tailwind unless the project explicitly adopts it later.

### Data & API

- **Server:** Fetch in Server Components or Route Handlers (`src/app/api/.../route.ts`).
- **Client:** Use `fetch` or a small client in `src/lib/`; don't duplicate server-only secrets on the client.
- Validate external input (query, body) before use.

### Routing & files

- **Pages:** `src/app/<segment>/page.tsx`
- **Layouts:** `src/app/<segment>/layout.tsx`
- **Loading / error:** `loading.tsx`, `error.tsx` next to the segment that needs them.
- **Metadata:** Export `metadata` or `generateMetadata` from layouts/pages.

### Performance

- Use `next/image` for images; use `next/font` for fonts (already configured).
- Lazy-load heavy client components with `dynamic(..., { ssr: false })` when appropriate (Spline, GSAP-heavy blocks).
- Avoid large client bundles on pages that can stay mostly server-rendered.

### Common commands

```bash
npm run dev          # dev server (Turbopack)
npm run build        # production build
npm run start        # run production build locally
npm run lint         # ESLint
npm run build:journey # regenerate journey data from YAML
```

### Do not

- Commit `.env`, `.env.local`, or secrets.
- Disable ESLint/TypeScript checks in `next.config` to "make build pass."
- Add dependencies without a clear need; prefer built-ins and existing stack.
- Put business logic in `page.tsx` — extract to `src/lib/` or components.

### When unsure

- Match existing patterns in neighboring files.
- Prefer small, focused changes over large refactors unless asked.
- See `CLAUDE.md` and `MEMORY.md` for project-specific context.

<!-- next-agent-rules:end -->
