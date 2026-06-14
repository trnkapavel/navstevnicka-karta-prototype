export type Category = "Zážitky" | "Restaurace" | "Muzea" | "Ubytování" | "Příroda" | "Sport";

export interface Place {
  id: string;
  name: string;
  category: Category;
  discount: string | null;
  free: boolean;
  basePrice: number;
  pointsReward: number;
  bonusText?: string;
  hot?: boolean;
  distance: number; // km
  rating: number;
  reviewCount: number;
  img: string;
  tags: string[];
  description: string;
  address: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  aiTags: string[];
}

export const places: Place[] = [
  {
    id: "korepruske-jeskyne",
    name: "Koněpruské jeskyně",
    category: "Zážitky",
    discount: "20%",
    free: false,
    basePrice: 160,
    pointsReward: 50,
    hot: true,
    distance: 7.2,
    rating: 4.8,
    reviewCount: 1248,
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
    tags: ["Jeskyně", "Příroda", "Rodina"],
    description:
      "Největší jeskynní systém v Čechách s unikátními krápníky a pozůstatky po dávných obyvatelích. Celoroční konstantní teplota 8 °C.",
    address: "Koněprusy 40, 267 18 Koněprusy",
    hours: "9:00 – 17:00 (Út–Ne, mimo sezónu 10:00–16:00)",
    phone: "+420 311 686 035",
    lat: 49.9125,
    lng: 14.0711,
    aiTags: ["jeskyně", "krápník", "příroda", "geologie", "výlet", "rodina", "děti", "vzdělání"],
  },
  {
    id: "hrad-tocnik",
    name: "Zřícenina hradu Točník",
    category: "Zážitky",
    discount: null,
    free: true,
    basePrice: 80,
    pointsReward: 35,
    bonusText: "Vstup zdarma s návštěvnickou kartou",
    hot: false,
    distance: 4.8,
    rating: 4.5,
    reviewCount: 543,
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    tags: ["Hrad", "Historie", "Výhled"],
    description:
      "Impozantní gotická zřícenina z přelomu 14. a 15. století. Z věže se otevírá panoramatický výhled na Křivoklátsko a Brdskou pahorkatinu.",
    address: "Točník 1, 267 51 Točník",
    hours: "9:00 – 17:00 (duben – říjen), Sa–Ne 10:00–16:00 (mimo sezónu)",
    phone: "+420 311 533 745",
    lat: 49.8833,
    lng: 13.9083,
    aiTags: ["hrad", "zřícenina", "gotika", "výhled", "výlet", "kultura", "turistika", "pěší"],
  },
  {
    id: "hrad-zvikovvranany",
    name: "Hrad Žebrák",
    category: "Muzea",
    discount: "15%",
    free: false,
    basePrice: 90,
    pointsReward: 30,
    distance: 5.1,
    rating: 4.3,
    reviewCount: 312,
    img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80",
    tags: ["Hrad", "Historie", "Kultura"],
    description:
      "Románsko-gotický hrad sousedící s Točníkem. Jeden z mála hradů, kde jsou zachovány interiéry. Průvodcovské prohlídky s historickými dobovými kostýmy.",
    address: "Žebrák 1, 267 53 Žebrák",
    hours: "9:00 – 17:00 (duben – říjen)",
    phone: "+420 311 533 127",
    lat: 49.8875,
    lng: 13.9050,
    aiTags: ["hrad", "muzeum", "kultura", "gotika", "prohlídka", "průvodce", "historie", "středověk"],
  },
  {
    id: "aquapark-beroun",
    name: "Aquapark Beroun",
    category: "Sport",
    discount: "25%",
    free: false,
    basePrice: 320,
    pointsReward: 45,
    hot: true,
    distance: 2.1,
    rating: 4.6,
    reviewCount: 876,
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    tags: ["Děti", "Voda", "Léto"],
    description:
      "Moderní aquapark s venkovními a vnitřními bazény, tobogány, skluzavkami a relaxační zónou pro dospělé. Sezóna celoroční.",
    address: "Závodí 1, 266 01 Beroun",
    hours: "9:00 – 21:00",
    phone: "+420 311 622 455",
    lat: 49.9583,
    lng: 14.0706,
    aiTags: ["bazén", "aquapark", "tobogán", "voda", "rodina", "děti", "sport", "léto", "plavání"],
  },
  {
    id: "hostomicky-pivovar",
    name: "Hostomický pivovar",
    category: "Zážitky",
    discount: null,
    free: false,
    basePrice: 250,
    pointsReward: 40,
    bonusText: "Ochutnávka piv zdarma při prohlídce",
    hot: true,
    distance: 14.3,
    rating: 4.7,
    reviewCount: 621,
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=80",
    tags: ["Pivovar", "Ochutnávka", "Kultura"],
    description:
      "Historický pivovar s tradicí od roku 1770 v malebném městečku Hostomice. Prohlídka varny, sklepů a ochutnávka čerstvého ležáku přímo u zdroje.",
    address: "Náměstí Míru 1, 267 22 Hostomice",
    hours: "Po–Pá 10:00 – 18:00, Sa–Ne 10:00 – 20:00",
    phone: "+420 311 582 151",
    lat: 49.8444,
    lng: 14.0333,
    aiTags: ["pivovar", "pivo", "prohlídka", "ochutnávka", "kultura", "tradice", "řemeslo", "večer", "gastronomie"],
  },
  {
    id: "naučna-stezka-brdy",
    name: "Naučná stezka Brdy – Tok",
    category: "Příroda",
    discount: null,
    free: true,
    basePrice: 0,
    pointsReward: 25,
    bonusText: "Vstup do CHKO Brdy zdarma",
    distance: 28.5,
    rating: 4.9,
    reviewCount: 1543,
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    tags: ["Turistika", "Příroda", "CHKO"],
    description:
      "10 km okruh nejkrásnější části CHKO Brdy s informačními tabulemi, lesní říčkou a vyhlídkami na okolní vrchy. Ideální celodenní výlet.",
    address: "Parkoviště Tok, 262 42 Rožmitál pod Třemšínem",
    hours: "Otevřeno 24/7",
    phone: "",
    lat: 49.6083,
    lng: 13.8361,
    aiTags: ["turistika", "příroda", "les", "CHKO", "stezka", "pěší", "výlet", "rodina", "zdarma", "brdy"],
  },
  {
    id: "zamek-liteň",
    name: "Zámek Liteň – zahrada",
    category: "Příroda",
    discount: "10%",
    free: false,
    basePrice: 100,
    pointsReward: 20,
    distance: 9.4,
    rating: 4.4,
    reviewCount: 287,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tags: ["Zámek", "Zahrada", "Výlet"],
    description:
      "Barokní zámek s rozsáhlým anglickým parkem a zahradami. Pravidelné kulturní akce, letní divadlo a výstavy v zámeckých sálech.",
    address: "Liteň 1, 267 27 Liteň",
    hours: "Park: denně 8:00 – 19:00, Zámek: So–Ne 10:00 – 16:00",
    phone: "+420 311 672 211",
    lat: 49.9083,
    lng: 14.0083,
    aiTags: ["zámek", "park", "zahrada", "kultura", "barok", "architektura", "výlet", "romantika", "příroda"],
  },
  {
    id: "restaurace-sv-jan",
    name: "Restaurace u Sv. Jana",
    category: "Restaurace",
    discount: null,
    free: false,
    basePrice: 180,
    pointsReward: 35,
    bonusText: "Dezert zdarma k hlavnímu chodu",
    hot: false,
    distance: 1.3,
    rating: 4.5,
    reviewCount: 389,
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    tags: ["Česká kuchyně", "Obědy", "Lokální"],
    description:
      "Rodinná restaurace přímo v centru Berouna s tradiční českou kuchyní a lokálně sourced ingrediencemi. Chválené svíčkové a svatomartinská husa.",
    address: "Husovo nám. 12, 266 01 Beroun",
    hours: "11:00 – 22:00 (Út–Ne)",
    phone: "+420 311 621 855",
    lat: 49.9639,
    lng: 14.0722,
    aiTags: ["restaurace", "česká kuchyně", "oběd", "večeře", "tradiční", "lokální", "svíčková", "jídlo"],
  },
  {
    id: "penzion-zadni-trebań",
    name: "Penzion Zadní Třebaň",
    category: "Ubytování",
    discount: "20%",
    free: false,
    basePrice: 1400,
    pointsReward: 60,
    distance: 11.2,
    rating: 4.6,
    reviewCount: 143,
    img: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&q=80",
    tags: ["Řeka", "Příroda", "Kayak"],
    description:
      "Klidný penzion na břehu Berounky s půjčovnou kajaků a lodí. Oblíbené místo vodáků a cyklistů na stezce Berounka.",
    address: "Zadní Třebaň 45, 267 29 Zadní Třebaň",
    hours: "Check-in: 14:00 – 20:00",
    phone: "+420 311 691 220",
    lat: 49.9417,
    lng: 14.1333,
    aiTags: ["penzion", "ubytování", "vodáci", "kayak", "řeka", "berounka", "cyklistika", "příroda", "relax"],
  },
  {
    id: "krivoklat-hrad",
    name: "Hrad Křivoklát",
    category: "Muzea",
    discount: "15%",
    free: false,
    basePrice: 200,
    pointsReward: 55,
    hot: true,
    distance: 27.4,
    rating: 4.9,
    reviewCount: 2341,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    tags: ["Hrad", "UNESCO", "Kultura"],
    description:
      "Jeden z nejvýznamnějších a nejlépe zachovaných gotických hradů v České republice. Prohlídky interiérů, zbrojnice, mučírna a kaple se vzácnými gotickými artefakty.",
    address: "Křivoklát 47, 270 23 Křivoklát",
    hours: "9:00 – 16:00 (mimo sezónu), 9:00 – 17:00 (červen – září)",
    phone: "+420 313 558 440",
    lat: 50.0417,
    lng: 13.8694,
    aiTags: ["hrad", "gotika", "UNESCO", "kultura", "muzeum", "prohlídka", "křivoklát", "výlet", "středověk"],
  },
];

export const aiResponses: Record<string, { message: string; placeIds: string[] }> = {
  rodina: {
    message: "Pro výlet s rodinou doporučuji tato místa — mají aktivity pro děti a skvělé hodnocení rodičů:",
    placeIds: ["aquapark-beroun", "korepruske-jeskyne", "naučna-stezka-brdy"],
  },
  jidlo: {
    message: "Nejlepší gastronomické tipy v okolí s výhodami pro držitele karty:",
    placeIds: ["restaurace-sv-jan", "hostomicky-pivovar"],
  },
  priroda: {
    message: "Výlety do přírody Brdského regionu — tiché, krásné a místy zdarma:",
    placeIds: ["naučna-stezka-brdy", "zamek-liteň", "penzion-zadni-trebań"],
  },
  ubytovani: {
    message: "Ubytování s nejvýhodnějšími slevami pro držitele karty:",
    placeIds: ["penzion-zadni-trebań"],
  },
  sport: {
    message: "Aktivní vyžití v regionu — sport, pohyb a zábava:",
    placeIds: ["aquapark-beroun", "naučna-stezka-brdy", "penzion-zadni-trebań"],
  },
  kulturni: {
    message: "Kulturní tipy pro poznání regionu Berounska a Brd:",
    placeIds: ["krivoklat-hrad", "korepruske-jeskyne", "hrad-tocnik", "hostomicky-pivovar"],
  },
};
