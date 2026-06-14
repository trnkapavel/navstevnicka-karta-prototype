# 🗺️ Návštěvnická karta Berounska

**PWA prototyp digitální návštěvnické karty pro region Berounsko · Brdy · Podbrdsko**

Hosté sbírají body za každou návštěvu, uplatňují slevy u místních partnerů a objevují tipy na výlety — vše z jedné aplikace uložené na ploše telefonu.

🌐 **Live demo:** [navstevnicka-karta-prototype.vercel.app](https://navstevnicka-karta-prototype.vercel.app/app)

---

## ✨ Co aplikace umí

- 🏆 **Gamifikace** — body za návštěvy, úrovně, série (streak), odznaky
- 🎫 **Slevy** — procentuální sleva, vstup zdarma nebo bonusová výhoda
- ❤️ **Oblíbená místa** — uložení a rychlý přístup
- 🤖 **AI vyhledávání** — hledání míst přirozeným jazykem
- 📲 **PWA** — funguje offline, jde uložit na plochu jako nativní app
- 🍎 **iOS splash screeny** — správný startup screen pro všechny iPhone

---

## 🗺️ Místa v aplikaci

| Místo | Výhoda |
|-------|--------|
| 🏛️ Koněpruské jeskyně | 20 % sleva |
| 🏰 Zřícenina hradu Točník | Vstup zdarma |
| 🏯 Hrad Žebrák | 15 % sleva |
| 🏊 Aquapark Beroun | 25 % sleva |
| 🍺 Hostomický pivovar | Bonus |
| 🌿 Naučná stezka Brdy – Tok | Vstup zdarma |
| 🏡 Zámek Liteň | 10 % sleva |
| 🍽️ Restaurace u Sv. Jana | Bonus |
| 🛏️ Penzion Zadní Třebaň | 20 % sleva |
| ⭐ Hrad Křivoklát | 15 % sleva · HOT |

---

## 🎨 Design

- Světlý režim s přírodní zelenou paletou
- Glass morphism efekty (`backdrop-filter: blur`)
- Animované Aurora pozadí (pastelové blobs)
- Plynné přechody přes Framer Motion
- Fonty Inter + Outfit

---

## 🛠️ Technologie

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS v4 |
| **Animace** | Framer Motion |
| **Ikony** | Lucide React |
| **Deploy** | Vercel |

---

## 🚀 Spuštění

```bash
# Klonování
git clone https://github.com/trnkapavel/navstevnicka-karta-prototype.git
cd navstevnicka-karta-prototype

# Instalace závislostí
npm install

# Vývojový server
npm run dev
# → http://localhost:3000/app
```

### Deploy na Vercel

```bash
npx vercel --prod --yes
```

---

## 📁 Struktura projektu

```
app/
├── app/page.tsx              # Hlavní obrazovka (4 taby)
├── app/place/[id]/page.tsx   # Detail místa
├── globals.css               # Design systém, glass třídy
└── layout.tsx                # PWA meta tagy, fonty

components/
├── ui/Aurora.tsx             # Animované pozadí
├── ui/DiscountBadge.tsx      # Odznak slevy
├── AISearch.tsx              # AI vyhledávání
└── DiscountFlow.tsx          # Flow uplatnění slevy

data/places.ts                # 10 reálných míst z regionu
lib/
├── discounts.ts              # Logika slev a bodů
└── game-context.tsx          # Herní stav (body, série, oblíbená)

public/
├── manifest.json             # PWA manifest
├── sw.js                     # Service worker
├── icon-192.png / icon-512.png
└── splash-*.png              # iOS splash screeny
```

---

## 📋 Plánované funkce

- [ ] Skutečný backend / databáze míst
- [ ] QR kód skener pro uplatnění slevy u pokladny
- [ ] Interaktivní mapa regionu
- [ ] Push notifikace (nová místa, body)
- [ ] Přihlášení uživatele

---

*Prototyp vytvořen pro demonstraci konceptu digitální návštěvnické karty.*
