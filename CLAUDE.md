# Návštěvnická karta Berounska — projektový kontext

## Co je to za projekt

PWA prototyp návštěvnické karty pro region Berounsko / Brd / Podbrdsko.
Hosté sbírají body za návštěvy, uplatňují slevy a vidí local tipy.

**Živá URL:** https://navstevnicka-karta-prototype.vercel.app  
**GitHub:** https://github.com/trnkapavel/customer-journey-v2  
**Vercel projekt:** trnkapavels-projects / navstevnicka-karta-prototype

## Rychlý start (nový počítač)

```bash
git clone https://github.com/trnkapavel/customer-journey-v2.git navstevnicka-karta
cd navstevnicka-karta
npm install
npm run dev
# → http://localhost:3000/app
```

Deploy na Vercel:
```bash
npx vercel --prod --yes
```

## Technologie

| Co | Technologie |
|----|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Animace | Framer Motion |
| Ikony | Lucide React |
| Deploy | Vercel (automaticky z main větve) |
| Fonty | Inter + Outfit (Google Fonts) |

## Struktura souborů (důležité)

```
app/
  app/page.tsx          ← hlavní obrazovka (4 taby: Objevuj, Karta, Oblíbené, Menu)
  app/place/[id]/page.tsx  ← detail místa
  globals.css           ← CSS proměnné, glass třídy, Aurora animace
  layout.tsx            ← PWA meta tagy, fonty, service worker registrace

components/
  ui/Aurora.tsx         ← animované pastelové pozadí
  ui/DiscountBadge.tsx  ← odznak slevy (%, ZDARMA, BONUS)
  ui/LevelBar.tsx       ← progress bar úrovní
  AISearch.tsx          ← AI vyhledávání (mock)
  DiscountFlow.tsx      ← flow uplatnění slevy (QR kód apod.)
  SavingsHistory.tsx    ← přehled uplatněných slev

data/
  places.ts             ← 10 reálných míst z regionu (Koněpruské jeskyně, Křivoklát…)

lib/
  discounts.ts          ← logika slev, getDiscountInfo(), getLevel()
  game-context.tsx      ← React context: body, série, oblíbená, uplatněné slevy

public/
  manifest.json         ← PWA manifest
  sw.js                 ← service worker (cache-first + network-first)
  icon-192.png          ← PWA ikona 192×192
  icon-512.png          ← PWA ikona 512×512
  splash-*.png          ← iOS splash screeny pro všechny iPhone velikosti
```

## Design systém

- **Paleta:** světlý režim, přírodní zelená (`#1a7a5e`), čistá bílá
- **Background:** `#f0f5f2` (světle zelená), Aurora blobs (pastelové)
- **Glass efekt:** `rgba(255,255,255,0.60)` + `backdrop-filter: blur(20px)`
- **Base font:** 17px (Inter), display font: Outfit
- **Hlavní zelená:** `#1a7a5e`, gradientní akcent: `#1a7a5e → #2563eb`

## Místa v aplikaci

1. Koněpruské jeskyně — 20 % sleva
2. Zřícenina hradu Točník — ZDARMA
3. Hrad Žebrák — 15 % sleva
4. Aquapark Beroun — 25 % sleva
5. Hostomický pivovar — BONUS
6. Naučná stezka Brdy – Tok — ZDARMA
7. Zámek Liteň — 10 % sleva
8. Restaurace u Sv. Jana — BONUS
9. Penzion Zadní Třebaň — 20 % sleva
10. Hrad Křivoklát — 15 % sleva ⭐ HOT

## Důležitá rozhodnutí / gotchas

- **`tsconfig.json` exclude:** složky `web/`, `docs/`, `planning/` atd. jsou v excludelist — jinak TypeScript
  skenuje starý kód z původního monorepa a háže chyby
- **`vercel.json`** musí mít `ignoreCommand: "exit 1"` aby se Vercel nespoléhal na git diff
- **Bonus badge:** místa bez procent ale s `bonusText` dostávají typ `"bonus"` — viz `lib/discounts.ts`
- **iOS splash:** je nutné přidat na plochu a smazat + znovu přidat po každé změně splash screenu
- **Service worker cache:** po nasazení nové verze je potřeba zavřít a znovu otevřít PWA

## Možná další práce

- [ ] Real backend / databáze míst
- [ ] QR kód skener (uplatnění slevy u pokladny)
- [ ] Mapa regionu
- [ ] Notifikace (nová místa, body)
- [ ] Skutečné přihlášení uživatele
