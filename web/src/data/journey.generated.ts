/* eslint-disable */
/**
 * AUTO-GENERATED — neupravuj ručně.
 * Zdroj: content/journey.yaml
 * Regenerace: npm run generate:journey
 */
import type { EpilogueContent, JourneySection, FinaleCta, JourneyMeta } from "./journey.types";

export const journeyMeta: JourneyMeta = {
  "title": "Customer Journey — Previo",
  "eyebrow": "Customer Journey · Previo",
  "chapterIntro": "Víme, jak vypadá cesta Vašeho hosta, a umíme ji obsloužit",
  "hero": {
    "h1Line1": "Pomůžeme s obsluhou",
    "h1Line2Prefix": "Vašeho hosta",
    "h1Emphasis": "od A do Z,",
    "h1Line3": "a nejen to.",
    "subtitle": "Víme, jak vypadá cesta Vašeho hosta, a umíme ji obsloužit"
  }
} as const;

export const JOURNEY_BEAT_COUNT = 8 as const;

export const journeySections: JourneySection[] = [
  {
    "id": "s0",
    "index": 1,
    "tag": "Hledání a výběr",
    "h3": "Buďte vidět a spravujte vše z jednoho místa",
    "layout": "text-screen",
    "motion": {
      "profile": "constellation",
      "pinVh": 150
    },
    "features": [
      {
        "text": "Buďte vidět online na svém webu i dalších prodejních kanálech. Vytvoříme Vám <a href='#'>prodejní web</a>, nastavíme Vám perfektně rezervační formulář, abyste získali více přímých rezervací.",
        "cta": null
      },
      {
        "text": "Umožníme Vám přehledně spravovat cenu, dostupnost a celou Vaši nabídku z jednoho místa.",
        "cta": {
          "label": "Recepční systém",
          "href": "#"
        }
      },
      {
        "text": "Spustíme prezentaci na Booking, Airbnb, Expedia a dalších kanálech dle Vašeho výběru.",
        "cta": {
          "label": "Channel manager",
          "href": "#"
        }
      }
    ],
    "cards": null,
    "screenshotCta": {
      "label": "Rezervační systém",
      "href": "#"
    }
  },
  {
    "id": "s1",
    "index": 2,
    "tag": "Rezervace",
    "h3": "Mějte své ceny pod kontrolou a nabídněte hostům jednoduchou online rezervaci",
    "layout": "cards-3",
    "motion": {
      "profile": "rate-field",
      "pinVh": 150
    },
    "features": null,
    "cards": [
      {
        "text": "Spravujte a nastavujte ceny a podmínky z jednoho místa pro všechny Vaše kanály. Dostupnost mějte pod kontrolou v přehledných rezervačních štaflích.",
        "cta": {
          "label": "Recepční systém",
          "href": "#"
        }
      },
      {
        "text": "Nabídněte Vašim hostům jednoduchou a pohodlnou rezervaci online na počítači i na mobilu.",
        "cta": {
          "label": "Rezervační systém",
          "href": "#"
        }
      },
      {
        "text": "Nechte si Vaše hosty vybrat způsob platby. Nabídněte jim široký výběr platebních metod za rezervovaný pokoj.",
        "cta": {
          "label": "Platební brána a terminál",
          "href": "#"
        }
      }
    ],
    "screenshotCta": null
  },
  {
    "id": "s2",
    "index": 3,
    "tag": "Plánování cesty",
    "h3": "Poraďte jednoduše hostům, co vše u Vás mohou dělat",
    "layout": "screen-text",
    "motion": {
      "profile": "itinerary-stream",
      "pinVh": 150
    },
    "features": [
      {
        "text": "Vytvořte si šablony s doplňující nabídkou a aktivitami a pošlete je hostům automaticky v ten správný čas.",
        "cta": null
      },
      {
        "text": "Nabízíte online check-in? Nechte veškerou komunikaci ohledně check-inu na nás — jen nastavíte co a kdy chcete hostům poslat a o zbytek se postaráme my.",
        "cta": {
          "label": "Automatické mailové šablony",
          "href": "#"
        }
      },
      {
        "text": "Komunikujte s vašimi hosty z jednoho místa, ať už je to po mailu, SMS či přes Airbnb. Vytvořte si šablony odpovědí na časté dotazy a šetřete čas.",
        "cta": {
          "label": "Komunikace",
          "href": "#"
        }
      }
    ],
    "cards": null,
    "screenshotCta": {
      "label": "Komunikace",
      "href": "#"
    }
  },
  {
    "id": "s3",
    "index": 4,
    "tag": "Online check-in",
    "h3": "Zrychlete check-in, nechte hosty vše vyplnit předem a nabídněte jim další služby",
    "layout": "cards-4",
    "motion": {
      "profile": "form-morph",
      "pinVh": 250
    },
    "features": null,
    "cards": [
      {
        "text": "Automatizujte online check-in hostů — sběr povinných údajů, platbu, předání PINů a mnohé další.",
        "cta": {
          "label": "Virtuální recepční Alfréd",
          "href": "#"
        }
      },
      {
        "text": "Hlášení hostů, reporty pro ČSÚ a veškeré účetní doklady vyřešíme za Vás. Věnujte se businessu.",
        "cta": {
          "label": "Recepční systém",
          "href": "#"
        }
      },
      {
        "text": "Pošlete hostům přístupové PINy, účetní doklady a veškeré instrukce automaticky po check-inu.",
        "cta": {
          "label": "Automatizace komunikace",
          "href": "#"
        }
      },
      {
        "text": "Nabídněte hostům doplňkové služby nebo je nechte změnit rezervaci. Vše spravujte z jednoho místa.",
        "cta": {
          "label": "Minutové rezervace a služby",
          "href": "#"
        }
      }
    ],
    "screenshotCta": null
  },
  {
    "id": "s4",
    "index": 5,
    "tag": "Příjezd hosta",
    "h3": "Nezdržujte hosty administrativou, poskytněte jim perfektní zážitek a věnujte se jim",
    "layout": "text-screen",
    "motion": {
      "profile": "threshold",
      "pinVh": 200
    },
    "features": [
      {
        "text": "Automatizujte procesy, které můžete — např. <a href='#'>předání přístupových PINů</a> po online check-inu, veškeré <a href='#'>legislativní věci a hlášení hostů</a>, <a href='#'>účetní doklady</a> a mnohé další. Neztrácejte čas na recepci a věnujte se raději hostům. Ocení to.",
        "cta": null
      },
      {
        "text": "Neztrácejte čas na recepci, nechte hosty udělat check-in pomocí kiosku nebo rychle vyplňte jejich údaje díky aplikaci Scan-ID.",
        "cta": {
          "label": "Scan-ID",
          "href": "#"
        }
      }
    ],
    "cards": null,
    "screenshotCta": {
      "label": "Hotelová automatizace",
      "href": "#"
    }
  },
  {
    "id": "s5",
    "index": 6,
    "tag": "Pobyt",
    "h3": "Dopřejte hostům nerušenou dovolenou, ale zároveň jim buďte kdykoliv k dispozici",
    "layout": "cards-3",
    "motion": {
      "profile": "quiet-light",
      "pinVh": 150
    },
    "features": null,
    "cards": [
      {
        "text": "Umožněte hostům se s Vámi spojit kdykoliv to budou potřebovat — např. při <a href='#'>objednání úklidu</a>. Komunikujte online z jednoho místa.",
        "cta": {
          "label": "Komunikace",
          "href": "#"
        }
      },
      {
        "text": "Ukažte hostům, jaké služby si u Vás mohou pořídit. Nevnucujte se, ale přirozenou cestou nabízejte.",
        "cta": {
          "label": "Virtuální recepční Alfréd",
          "href": "#"
        }
      },
      {
        "text": "Poskytněte hostům informace o aktivitách u Vás i v okolí. Připravte jim nezapomenutelnou dovolenou.",
        "cta": {
          "label": "Webové stránky",
          "href": "#"
        }
      }
    ],
    "screenshotCta": null
  },
  {
    "id": "s6",
    "index": 7,
    "tag": "Check-out",
    "h3": "Bezchybný a rychlý check-out? Žádný problém!",
    "layout": "cards-3",
    "motion": {
      "profile": "swipe-complete",
      "pinVh": 150
    },
    "features": null,
    "cards": [
      {
        "text": "Zkontrolujeme za Vás účet pokoje a v případě potřeby vyzveme hosty k platbě. Vybrat si mohou z <a href='#'>široké škály platebních možností</a>.",
        "cta": {
          "label": "Virtuální recepční Alfréd",
          "href": "#"
        }
      },
      {
        "text": "Umožněte hostům provézt online check-out v <a href='#'>aplikaci Alfréd</a> nebo na recepci či v kiosku. Procesy po check-outu se spustí automaticky.",
        "cta": {
          "label": "Recepční systém",
          "href": "#"
        }
      },
      {
        "text": "S aplikací Housekeeping budete mít pod kontrolou celý proces odjezdu hosta a úklid se okamžitě dozví, kdy může začít.",
        "cta": {
          "label": "Aplikace Housekeeping",
          "href": "#"
        }
      }
    ],
    "screenshotCta": null
  },
  {
    "id": "s7",
    "index": 8,
    "tag": "Po odjezdu",
    "h3": "Věnujte se plně ubytovaným hostům, na ty minulé myslíme za Vás",
    "layout": "screen-text",
    "motion": {
      "profile": "ripple",
      "pinVh": 150
    },
    "features": [
      {
        "text": "Host již odjel? Tím naše práce nekončí. Pošleme mu za Vás poděkování za pobyt a poprosíme ho o hodnocení pobytu.",
        "cta": null
      },
      {
        "text": "Chcete, aby se k Vám hosté vraceli? Připravte si pro ně různé balíčky či promo akce. O jejich rozeslání se postaráme za Vás.",
        "cta": null
      },
      {
        "text": null,
        "cta": {
          "label": "Automatická komunikace",
          "href": "#",
          "variant": "solid"
        }
      }
    ],
    "cards": null,
    "screenshotCta": {
      "label": "Automatická komunikace",
      "href": "#"
    }
  }
];

export const finaleCta: FinaleCta = {
  "h2Line1": "Začněte s Previo.",
  "h2Em": "Previo",
  "h2Line2": "Váš host to ocení.",
  "buttonLabel": "Chci vyzkoušet Previo →",
  "buttonHref": "#",
  "motion": {
    "profile": "finale",
    "pinVh": 200
  }
} as const;

export const epilogueContent: EpilogueContent | null = {
  "bridge": {
    "h3": "A také víme, že vaše práce tímto nekončí.",
    "body": "Dokážeme Vám pomoci i s dalšími věcmi, abyste se mohli věnovat tomu důležitému — hostům."
  },
  "panels": [
    {
      "id": "ep1",
      "h3": "Previo se stane srdcem vašeho hotelu",
      "body": "Jedná se o on-line cloudové řešení, díky tomu můžete své zařízení spravovat kdykoliv a odkudkoliv. Díky Previo recepčnímu systému se pro vás každodenní provoz stane hračkou.",
      "screenshotCta": {
        "label": "Recepční systém",
        "href": "#"
      }
    },
    {
      "id": "ep2",
      "h3": "Přehled o výkonnosti na jednom místě",
      "body": "Snadno zjistíte, které OTA vám přináší největší počet rezervací či jakou platební metodou vám přicházejí nejvyšší tržby. Provozní i finanční stránku zařízení máte přehledně jako na dlani.",
      "screenshotCta": {
        "label": "Reporting",
        "href": "#"
      }
    },
    {
      "id": "ep3",
      "h3": "Jednoduchý systém, který vám sedne",
      "body": "Systém Previo je jednoduchý, intuitivní a umí se přizpůsobit Vašim potřebám. S nastavením systému Vám rádi pomůžeme. Chceme, abyste se věnovali hostům a ne Previu.",
      "screenshotCta": {
        "label": "Chci vyzkoušet Previo",
        "href": "#"
      }
    }
  ]
};
