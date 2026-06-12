# Prompt pro Claude (ovládání prohlížeče) — Spline hero scéna

Zkopíruj **celý blok níže** do nového chatu s Claude, který umí ovládat prohlížeč (Computer Use / browser automation).

---

## PROMPT (kopíruj od řádky START)

```
START

## Role
Jsi 3D design operátor. Ovládáš prohlížeč a pracuješ v aplikaci Spline (spline.design).
Tvůj úkol: vytvořit, animovat a exportovat hero 3D scénu pro web Customer Journey (Previo).
Uživatel NEMÁ platit za Spline AI ($30) — pracuj pouze s free nástroji: primitivy, materiály, animace, import zdarma.

## Kontext projektu
- B2B sales prezentace: cesta hotelového hosta ve 8 fázích
- Vizuální směr: **Signal Path** — tmavé pozadí, červená (#b50000) jako signál/energie, minimální geometrie (ne realistické textury, ne AI slop)
- Scéna bude vpravo nahoře na hero stránce; text je vlevo dole (už hotový v Next.js)
- Repo: customer-journey-v2/web — po exportu zapíšeš URL do `.env.local`

## Tvrdá pravidla
1. **NEPOUŽÍVEJ** placené Spline AI / Spell / Text-to-3D, pokud vyžaduje platbu — zavři paywall a pokračuj ručně
2. **NEPOUŽÍVEJ** stock fotky, realistické textury, HDR environment s oblohou
3. **POUŽÍVEJ** pouze: Cube, Sphere, Line/Path, Group, základní materiály
4. Každý journey bod musí mít **přesný název objektu** (viz tabulka) — web na ně později naváže eventy
5. Kamera: **fixní isometric** — neanimuj kameru scroll-em
6. Po každém větším kroku udělej screenshot a popiš, co vidíš
7. Pokud UI neodpovídá očekávání, popiš problém a zkus alternativní cestu v menu

## Design tokeny
- Pozadí scény: #050505
- Stěny / objekty hotelu: #242424 až #323232 (matte)
- Okraje / hrany: světle šedá, ~15 % opacity nebo #f4f1ec velmi jemně
- Signál / body / cesta: #b50000
- Žádná jiná barva kromě teplých světel oken: #ffe8b0 velmi jemně (volitelné, max 6 teček)

## Fáze A — Příprava (5 min)

1. Otevři https://app.spline.design (uživatel je přihlášen)
2. Pokud vidíš „How would you like to start?“ → klikni **3D Design** (modrá kostka), NE „AI 3D Generation“
3. Pojmenuj soubor: **CJ Hero — Signal Path**
4. Nastav pozadí: vyber prázdný prostor / scene → v panelu vpravo **Color** → `#050505`
5. Screenshot — potvrď tmavé pozadí

## Fáze B — Hotel z primitiv (20–30 min)

Postav **zjednodušený izometrický hotel** bez AI:

### B1 — Podlaha
- Přidej **Cube** nebo **Plane**
- Zploštit (scale Y nízko), natočit do isometric úhlu (~30° na X a Y, nebo použij isometric view v Spline)
- Barva #1a1a1a, jemný světlý okraj

### B2 — Hlavní objem (3 boxy)
Seskup boxy do tvaru „L“ nebo „U“:
- **Entrance wing** (vlevo) — recepce / vstup
- **Rooms wing** (střed) — 2×2 menší boxy jako pokoje
- **Services** (vpravo, volitelné) — menší přístavek

Každý box:
- Materiál: Color #242424, metalness 0, roughness 1 (matte)
- Skupina pojmenuj: `hotel-root`

### B3 — Detaily (minimálně)
- Recepční pult: malý zploštělý cube, barva rgba(181,0,0,0.25), název `reception-desk`
- 4–6 malých žlutých teček jako okna (tiny spheres #ffe8b0), skupina `window-lights`

### B4 — Kompozice
- Celá scéna vyplní **pravou a horní část** viewportu (jako na webu hero)
- Střed hotelu cca vpravo od středu canvasu
- Screenshot z isometric pohledu

## Fáze C — 8 journey bodů (10 min)

Přidej **Sphere** pro každý beat. Poloměr ~0.25–0.4. Barva #b50000.
**Přesně tyto názvy** (Layer panel vlevo):

| Název objektu      | Význam           | Pozice (orientačně)      |
|--------------------|------------------|--------------------------|
| beat-01-search     | Hledání          | mimo hotel, vlevo nahoře |
| beat-02-booking    | Rezervace        | u vstupu                 |
| beat-03-planning   | Plánování cesty  | u recepce                |
| beat-04-checkin    | Online check-in  | u dveří / u mobilu       |
| beat-05-arrival    | Příjezd          | recepční pult            |
| beat-06-stay       | Pobyt            | střed pokojů             |
| beat-07-checkout   | Check-out        | u výstupu                |
| beat-08-followup   | Po odjezdu       | mimo hotel, vpravo nahoře |

Skupina všech beatů: `journey-beats`

## Fáze D — Signal path (5 min)

- Vytvoř **Line** nebo **Curve** / Path, která prochází všemi 8 body v pořadí 01→08
- Barva #b50000, tloušťka tenká (1–2)
- Název: `signal-path`
- Žádný dashed styl v 3D — souvislá čára

Screenshot s viditelnou cestou.

## Fáze E — Animace (15 min)

V Spline **Events** / **Animations** (timeline dole nebo panel Actions):

### E1 — Start event (při načtení scény)
Pořadí:
1. `hotel-root`: opacity 0→1, duration 0.6s, ease easeOut (nebo scale 0.95→1)
2. `signal-path`: pokud Spline umí path reveal / trim — animuj od 0 % do 100 %, duration 1.2s, delay 0.4s
   - Pokud path reveal nejde: nech statickou, pulse jen na bodech
3. `journey-beats` children: stagger scale 0→1, delay start 0.8s, stagger 0.08s, spring

### E2 — Loop pulse na beat-01-search
- `beat-01-search`: scale 1 → 1.35 → 1, duration 2s, loop, ease inOut
- Volitelně: duplikuj sphere jako ring, scale 1→2, opacity 1→0, loop (ping)

### E3 — Jemný idle (volitelné)
- `window-lights`: velmi jemný opacity pulse 0.6↔1, random offset

**NEanimuj:** kameru, pozadí, celý hotel rotaci

### E4 — Reduced motion poznámka
Do poznámky pro vývojáře: finální stav = vše viditelné, žádný loop nutný pro pochopení

Screenshot timeline s animacemi.

## Fáze F — Export (5 min)

1. Export (tlačítko vpravo nahoře)
2. **Code** → **React**
3. Zkopíruj URL ve tvaru: `https://prod.spline.design/XXXXXXXX/scene.splinecode`
4. Ověř v novém tabu, že scéna se načte

## Fáze G — Zápis do projektu

Pokud máš přístup k filesystemu uživatele, zapiš do souboru:
`/Users/paveltrnka/Documents/GitHub/customer-journey-v2/web/.env.local`

```
NEXT_PUBLIC_SPLINE_SCENE_URL=<vlož URL ze Spline>
```

Pokud nemáš filesystem, vrať URL v chatu s instrukcí pro uživatele.

Spusť v terminálu (pokud můžeš):
```
cd /Users/paveltrnka/Documents/GitHub/customer-journey-v2/web && npm run dev
```
Otevři http://localhost:3000 a screenshot hero — 3D vpravo, text vlevo dole.

## Quality checklist (musí projít před odevzdáním)

- [ ] Pozadí #050505
- [ ] Hotel čitelný na tmavém — ne černá na černé
- [ ] 8 objektů s přesnými názvy beat-01 … beat-08
- [ ] Červená cesta signal-path propojuje body
- [ ] Animace při Start (aspoň fade hotel + stagger dots)
- [ ] beat-01 má loop pulse
- [ ] Export URL funguje
- [ ] .env.local nastaveno nebo URL vráceno uživateli

## Co vrátit uživateli na konci

1. Spline export URL
2. 2–3 screenshoty scény (editor + preview)
3. Seznam názvů objektů (ověření)
4. Co se nepovedlo / co doladit ručně
5. Potvrzení že paywall AI nebyl použit

## Pokud narazíš na blokér

| Problém | Řešení |
|---------|--------|
| AI chce $30 | Zavři, pokračuj primitivy |
| Path animace nejde | Statická čára + pulse na bodech stačí |
| Isometric úhel nejde | Srovnej ručně, důležitá je čitelnost |
| Export nefunguje | Zkus Publish → Public URL → embed link |

Začni Fází A. Po každé fázi krátce reportuj stav a screenshot.

KONEC PROMPTU
```

---

## Jak to použít

1. Otevři **Claude** s funkcí ovládání počítače / prohlížeče (např. Claude in Chrome, Computer Use)
2. **Přihlas se do Spline** v prohlížeči předem (nebo nech Clauda počkat na login)
3. Zkopíruj celý blok mezi `START` a `KONEC PROMPTU`
4. Přidej na začátek: *„Spline mám otevřený na start obrazovce“* nebo *„Jsem už v editoru 3D Design“*
5. Nech ho projít fáze A→G

## Poznámka

Claude **nemusí** zvládnout 100 % animací v Spline — pokud path reveal nejde, stačí statická scéna + pulse na `beat-01-search`. Zbytek animací doděláme v Next.js (GSAP).
