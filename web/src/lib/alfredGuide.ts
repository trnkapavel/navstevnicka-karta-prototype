/** Alfred — krátké vysvětlení každé fáze pro hoteliéře */

export type AlfredBeatCopy = {
  title: string;
  body: string;
};

export const ALFRED_BEAT_COPY: Record<number, AlfredBeatCopy> = {
  0: {
    title: "Tady začíná cesta hosta",
    body: "Projdeme 8 momentů od prvního hledání až po návrat. Já vás provedu — vy se dívejte, co se děje s hostem i s vámi na recepci.",
  },
  1: {
    title: "Host vás musí najít",
    body: "Viditelnost na webu a kanálech, jedna nabídka na všech místech. Méně chaosu v datech, víc přímých rezervací.",
  },
  2: {
    title: "Rezervace bez tření",
    body: "Ceny a dostupnost pod kontrolou, host si zarezervuje sám — na mobilu i na počítači.",
  },
  3: {
    title: "Před příjezdem už komunikujete",
    body: "Šablony, tipy na aktivity a check-in info host dostane ve správný čas — automaticky.",
  },
  4: {
    title: "Check-in ještě před dveřmi",
    body: "Host vyplní údaje doma, zaplatí, dostane PIN. Na recepci jen přivítáte — ne vyplňujete formuláře.",
  },
  5: {
    title: "Příjezd bez fronty",
    body: "PIN, legislativa, doklady — vše běží samo. Vy máte čas na člověka, ne na papíry.",
  },
  6: {
    title: "Pobyt v klidu",
    body: "Host se ozve kdykoliv, objedná služby online. Vy máte přehled z jednoho místa.",
  },
  7: {
    title: "Odchod bez nepříjemných překvapení",
    body: "Účet zkontrolován, platba vyřízena, host odchází spokojený.",
  },
  8: {
    title: "Vztah nekončí odjezdem",
    body: "Poděkování, hodnocení, nabídky na návrat — host si vás pamatuje.",
  },
  9: {
    title: "A ještě víc od Previo",
    body: "Recepční systém, reporting i nastavení na míru — všechno kolem té samé cesty hosta.",
  },
};

export function getAlfredCopy(beat: number): AlfredBeatCopy {
  return ALFRED_BEAT_COPY[beat] ?? ALFRED_BEAT_COPY[0];
}
