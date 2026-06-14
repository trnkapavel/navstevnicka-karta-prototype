"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, CreditCard, Heart, Menu, MapPin, Star,
  ChevronRight, Sparkles, Search, X,
  Flame, Trophy, Zap, Clock, QrCode, Map, Users,
} from "lucide-react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });
import { useRouter } from "next/navigation";
import { places, type Category } from "@/data/places";
import { useGame } from "@/lib/game-context";
import AISearch from "@/components/AISearch";
import Aurora from "@/components/ui/Aurora";
import LevelBar from "@/components/ui/LevelBar";
import SavingsHistory from "@/components/SavingsHistory";

type Tab = "discover" | "map" | "card" | "favorites" | "menu";

const tabs = [
  { id: "discover" as Tab, label: "Objevuj", icon: Compass },
  { id: "map" as Tab, label: "Mapa", icon: Map },
  { id: "card" as Tab, label: "Karta", icon: CreditCard },
  { id: "favorites" as Tab, label: "Oblíbené", icon: Heart },
  { id: "menu" as Tab, label: "Menu", icon: Menu },
];

const categories: { label: string; value: Category | "Vše"; emoji: string }[] = [
  { label: "Vše", value: "Vše", emoji: "✦" },
  { label: "Zážitky", value: "Zážitky", emoji: "🎭" },
  { label: "Jídlo", value: "Restaurace", emoji: "🍺" },
  { label: "Muzea", value: "Muzea", emoji: "🏛" },
  { label: "Ubytování", value: "Ubytování", emoji: "🏡" },
  { label: "Příroda", value: "Příroda", emoji: "🌿" },
  { label: "Sport", value: "Sport", emoji: "⚡" },
];

function FeaturedCard({ place, onClick }: { place: typeof places[0]; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full rounded-3xl overflow-hidden relative text-left shadow-lg"
      style={{ height: 220 }}
    >
      <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,18,12,0.92) 0%, rgba(8,18,12,0.15) 55%, transparent 100%)" }} />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.28)" }}>
        <Flame size={12} color="#fbbf24" />
        <span className="text-xs font-bold text-white">Výběr týdne</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "rgba(26,122,94,0.8)", color: "white" }}>{place.category}</span>
        <p className="text-white font-black text-lg leading-tight mb-1.5" style={{ fontFamily: "var(--font-outfit)" }}>{place.name}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <Star size={10} color="#fbbf24" fill="#fbbf24" />
            <span className="text-white font-bold text-xs ml-0.5">{place.rating}</span>
          </div>
          <span className="text-white/30">·</span>
          <MapPin size={9} color="rgba(255,255,255,0.55)" />
          <span className="text-white/60 text-xs">{place.distance} km</span>
          <span className="text-white/30">·</span>
          <span className="text-xs text-white/50">{place.reviewCount} hodnocení</span>
        </div>
      </div>
    </motion.button>
  );
}

const seasonLabel: Record<string, { label: string; color: string }> = {
  leto:      { label: "☀️ Léto",  color: "rgba(217,119,6,0.85)" },
  zima:      { label: "❄️ Zima",  color: "rgba(37,99,235,0.85)" },
  jaro:      { label: "🌸 Jaro",  color: "rgba(236,72,153,0.85)" },
  celorocne: { label: "✦ Vždy",  color: "rgba(26,122,94,0.85)" },
};

function PlaceGridCard({ place, onClick, onFav, faved }: { place: typeof places[0]; onClick: () => void; onFav: () => void; faved: boolean }) {
  const season = seasonLabel[place.season];
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="rounded-3xl overflow-hidden relative cursor-pointer shadow-md"
      style={{ height: 200 }}
    >
      <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,18,12,0.90) 0%, transparent 55%)" }} />
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-lg" style={{ background: season.color, backdropFilter: "blur(8px)" }}>
        <span className="text-white text-[10px] font-bold">{season.label}</span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onFav(); }}
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
      >
        <Heart size={12} color={faved ? "#ef4444" : "#9ca3af"} fill={faved ? "#ef4444" : "transparent"} />
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-[10px] font-bold mb-0.5" style={{ color: "rgba(52,211,153,0.85)" }}>{place.category}</p>
        <p className="font-bold text-xs text-white line-clamp-2 leading-tight mb-1">{place.name}</p>
        <div className="flex items-center gap-1">
          <Star size={8} color="#fbbf24" fill="#fbbf24" />
          <span className="text-white/80 text-[10px] font-semibold">{place.rating}</span>
          <span className="text-white/30 text-[10px]">·</span>
          <Users size={8} color="rgba(255,255,255,0.45)" />
          <span className="text-white/50 text-[10px]">{place.monthlyVisits >= 1000 ? `${(place.monthlyVisits/1000).toFixed(1)}k` : place.monthlyVisits}/měs.</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AppPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [activeCategory, setActiveCategory] = useState<Category | "Vše">("Vše");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAI, setShowAI] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("nk-session")) {
      router.replace("/onboarding");
    } else {
      setSessionReady(true);
    }
  }, [router]);

  const {
    points, savingsKc, visits, streak,
    favorites, toggleFavorite, isFavorite,
    achievements, challenges,
    isRegistered, userName, unlockTicket, isTicketUnlocked,
  } = useGame();

  const hotDeals = useMemo(() => places.filter(p => p.hot).slice(0, 5), []);

  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      const matchCat = activeCategory === "Vše" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.aiTags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const favoritePlaces = places.filter(p => favorites.includes(p.id));

  if (!sessionReady) return <div className="h-full w-full" style={{ background: "var(--bg-main)" }} />;

  return (
    <>
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring" as const, stiffness: 350, damping: 35 }}
            className="fixed inset-0 z-50"
          >
            <AISearch onClose={() => setShowAI(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main
        className="h-full w-full max-w-[430px] mx-auto relative flex flex-col overflow-hidden shadow-2xl"
        style={{ background: "var(--bg-main)" }}
      >
        <Aurora />

        {/* ── MAPA (non-scrollable) ── */}
        {activeTab === "map" && (
          <div className="relative z-10 flex-1 overflow-hidden">
            <MapView />
          </div>
        )}

        <div className={`relative z-10 flex-1 overflow-y-auto scrollbar-none ${activeTab === "map" ? "hidden" : ""}`}>
          <AnimatePresence mode="wait" initial={false}>

          {/* ── DISCOVER ── */}
          {activeTab === "discover" && (
          <motion.div
            key="discover"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
          <div className="pb-4">
              {/* Header */}
              <div className="px-5 header-top pb-5">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
                      Berounsko · Brd · Podbrdsko
                    </p>
                    <h1 className="font-black text-2xl leading-tight" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>
                      Co dnes{" "}
                      <span style={{ background: "linear-gradient(90deg, #1a7a5e, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        zažiješ?
                      </span>
                    </h1>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAI(true)}
                    className="glass w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                  >
                    <Sparkles size={19} color="var(--green)" />
                  </motion.button>
                </div>

                {/* Search */}
                <div className="glass rounded-2xl flex items-center gap-2 px-4 py-3 shadow-sm">
                  <Search size={15} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Hledat místa, slevy, aktivity…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                    style={{ color: "var(--text-main)" }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                      <X size={14} color="var(--text-muted)" />
                    </button>
                  )}
                </div>
              </div>

              {/* Featured card – top pick */}
              {!searchQuery && activeCategory === "Vše" && hotDeals[0] && (
                <div className="px-5 mb-5">
                  <FeaturedCard place={hotDeals[0]} onClick={() => router.push(`/place/${hotDeals[0].id}`)} />
                </div>
              )}

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto px-5 mb-5 scrollbar-none pb-1">
                {categories.map(cat => (
                  <motion.button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value as Category | "Vše")}
                    whileTap={{ scale: 0.92 }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold"
                    style={cat.value === activeCategory
                      ? { background: "linear-gradient(135deg, #1a7a5e, #2563eb)", color: "white", boxShadow: "0 4px 16px rgba(26,122,94,0.28)" }
                      : { background: "rgba(255,255,255,0.72)", color: "var(--text-sub)", border: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(12px)" }
                    }
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* AI banner – compact */}
              <div className="px-5 mb-5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAI(true)}
                  className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3"
                  style={{ background: "linear-gradient(135deg, rgba(26,122,94,0.08), rgba(37,99,235,0.06))", border: "1px solid rgba(26,122,94,0.14)" }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}>
                    <Sparkles size={15} color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm" style={{ color: "var(--text-main)" }}>AI Průvodce</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>„Chci výlet s rodinou na víkend…"</p>
                  </div>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </motion.button>
              </div>

              {/* Section label */}
              <div className="px-5 mb-3 flex items-center justify-between">
                <p className="font-bold text-sm" style={{ color: "var(--text-main)" }}>
                  {searchQuery ? `„${searchQuery}"` : activeCategory === "Vše" ? "Všechna místa" : activeCategory}
                </p>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{filteredPlaces.length} míst</span>
              </div>

              {/* Visual grid */}
              <div className="px-4">
                <AnimatePresence mode="popLayout">
                  {filteredPlaces.length === 0 ? (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Žádná místa</p>
                      <button onClick={() => { setSearchQuery(""); setActiveCategory("Vše"); }} className="text-sm font-semibold" style={{ color: "var(--green)" }}>
                        Zobrazit vše
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {filteredPlaces.map((place, i) => (
                        <motion.div
                          key={place.id}
                          layout
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.90 }}
                          transition={{ delay: i * 0.035, type: "spring" as const, stiffness: 380 }}
                        >
                          <PlaceGridCard
                            place={place}
                            onClick={() => router.push(`/place/${place.id}`)}
                            onFav={() => toggleFavorite(place.id)}
                            faved={isFavorite(place.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
          </div>
          </motion.div>
          )}

          {/* ── KARTA / ODMĚNY ── */}
          {activeTab === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="header-top pb-8">

              {/* Registrace výzva nebo uvítání */}
              {!isRegistered ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-5 mb-5 rounded-3xl overflow-hidden shadow-lg"
                  style={{ background: "linear-gradient(135deg, #0a2540, #1a4570 60%, #0d3d2a)" }}
                >
                  <div className="p-5">
                    <div className="text-3xl mb-3">🎟</div>
                    <p className="font-black text-lg text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                      Proměňte body za volné vstupenky
                    </p>
                    <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.60)" }}>
                      Zaregistrujte se, sbírejte body za návštěvy a získejte vstupenky zdarma do Koněpruských jeskyní, na Karlštejn a dalších míst.
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => router.push("/register")}
                      className="w-full py-3.5 rounded-2xl font-bold text-sm"
                      style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(12px)" }}
                    >
                      Zaregistrovat se zdarma →
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <div className="px-5 mb-5">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>Přihlášen jako</p>
                  <h1 className="font-black text-2xl" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>
                    {userName}
                  </h1>
                </div>
              )}

              {/* Body přehled */}
              <div className="px-5 mb-6">
                <div className="glass rounded-3xl p-4 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(251,191,36,0.12)" }}>
                    🏆
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>Vaše body</p>
                    <p className="font-black text-3xl leading-none" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>
                      {points} <span className="text-base font-bold" style={{ color: "var(--text-muted)" }}>bodů</span>
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Ušetřeno</p>
                    <p className="font-black text-base" style={{ color: "var(--green)" }}>{savingsKc} Kč</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{visits}× navštíveno</p>
                  </div>
                </div>
              </div>

              {/* Volné vstupenky */}
              <div className="px-5 mb-2">
                <p className="font-black text-lg mb-1" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>Volné vstupenky</p>
                <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Nasbírejte body a odemkněte vstup zdarma</p>
              </div>

              {/* Ticket cards */}
              <div className="px-5 flex flex-col gap-3 mb-6">
                {places.filter(p => p.ticketCost).sort((a, b) => (a.ticketCost ?? 0) - (b.ticketCost ?? 0)).map((place, i) => {
                  const cost = place.ticketCost!;
                  const unlocked = isTicketUnlocked(place.id);
                  const progress = Math.min(points / cost, 1);
                  const canUnlock = points >= cost && !unlocked;

                  return (
                    <motion.div
                      key={place.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, type: "spring" as const, stiffness: 380 }}
                      className="glass rounded-3xl overflow-hidden shadow-sm"
                      style={unlocked ? { border: "1.5px solid rgba(26,122,94,0.35)", background: "rgba(26,122,94,0.05)" } : {}}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative flex-shrink-0">
                          <img src={place.img} alt={place.name} className="w-16 h-16 rounded-2xl object-cover" style={{ filter: unlocked ? "none" : "brightness(0.85)" }} />
                          {unlocked && (
                            <div className="absolute inset-0 rounded-2xl flex items-center justify-center" style={{ background: "rgba(26,122,94,0.55)" }}>
                              <span className="text-xl">🎟</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm leading-tight mb-0.5" style={{ color: "var(--text-main)" }}>{place.name}</p>
                          <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                            {unlocked ? "Vstupenka odemčena ✓" : `${points} / ${cost} bodů`}
                          </p>
                          {!unlocked && (
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress * 100}%` }}
                                transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{ background: canUnlock ? "linear-gradient(90deg, #1a7a5e, #2563eb)" : "linear-gradient(90deg, #34d399, #059669)" }}
                              />
                            </div>
                          )}
                        </div>
                        {unlocked ? (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(`/place/${place.id}`)}
                            className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold"
                            style={{ background: "rgba(26,122,94,0.12)", color: "var(--green)" }}
                          >
                            Zobrazit
                          </motion.button>
                        ) : canUnlock ? (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => unlockTicket(place.id, cost)}
                            className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold text-white"
                            style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}
                          >
                            Odemknout
                          </motion.button>
                        ) : (
                          <div className="flex-shrink-0 text-right">
                            <p className="text-xs font-black" style={{ color: "var(--text-main)" }}>{cost}</p>
                            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>bodů</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Jak sbírat body */}
              <div className="px-5 mb-6">
                <p className="font-bold text-sm mb-3" style={{ color: "var(--text-main)" }}>Jak sbírat body</p>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "🏛", text: "Navštivte místo a uplatněte slevu", points: "+20–65 bodů" },
                    { icon: "🔥", text: "Zachovejte sérii návštěv (7 dní)", points: "+50 bodů bonus" },
                    { icon: "❤️", text: "Přidejte místo do oblíbených", points: "+5 bodů" },
                  ].map(item => (
                    <div key={item.text} className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <p className="flex-1 text-sm" style={{ color: "var(--text-sub)" }}>{item.text}</p>
                      <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--green)" }}>{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR kód pro slevy */}
              <div className="px-5">
                <div className="glass rounded-3xl p-5 flex flex-col items-center shadow-sm">
                  <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                    <QrCode size={56} color="#0f2547" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-main)" }}>QR kód pro slevy</p>
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>Ukažte u pokladny pro uplatnění slevy</p>
                </div>
              </div>
            </div>
          </motion.div>
          )}

          {/* ── OBLÍBENÉ ── */}
          {activeTab === "favorites" && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="header-top pb-6">
              <div className="px-5 mb-5">
                <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>Vaše sbírka</p>
                <h1 className="font-black text-2xl" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>Oblíbená místa</h1>
              </div>
              {favoritePlaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-8 pt-12 text-center">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 300 }}>
                    <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center mx-auto mb-6 text-4xl shadow-sm">❤️</div>
                    <h2 className="font-black text-xl mb-2" style={{ color: "var(--text-main)" }}>Prázdná sbírka</h2>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>Klepněte na srdíčko u libovolného místa.</p>
                    <button
                      onClick={() => setActiveTab("discover")}
                      className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white active:scale-95 transition-transform shadow-md"
                      style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}
                    >
                      Objevit místa
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div className="px-4">
                  <div className="grid grid-cols-2 gap-3">
                    {favoritePlaces.map((place, i) => (
                      <motion.div
                        key={place.id}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, type: "spring" as const, stiffness: 380 }}
                      >
                        <PlaceGridCard
                          place={place}
                          onClick={() => router.push(`/place/${place.id}`)}
                          onFav={() => toggleFavorite(place.id)}
                          faved={true}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          )}

          {/* ── MENU ── */}
          {activeTab === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="px-5 header-top pb-8">
              <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>Aplikace</p>
              <h1 className="font-black text-2xl mb-6" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>Menu</h1>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  { label: "O návštěvnické kartě", sub: "Co je karta a jak funguje", icon: "ℹ️" },
                  { label: "Kde kartu získat", sub: "Partneři a výdejní místa", icon: "📍" },
                  { label: "Obchodní podmínky", sub: "", icon: "📋" },
                  { label: "Kontakty", sub: "Máte dotaz? Napište nám", icon: "✉️" },
                ].map(item => (
                  <button
                    key={item.label}
                    className="glass rounded-2xl px-4 py-4 flex items-center gap-3 active:opacity-70 transition-opacity text-left shadow-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: "var(--text-main)" }}>{item.label}</p>
                      {item.sub && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.sub}</p>}
                    </div>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center py-4">
                {["Berounsko", "Brdy", "Podbrdsko"].map(p => (
                  <span key={p} className="text-xs px-3 py-1 rounded-full" style={{ color: "var(--text-muted)", border: "1px solid var(--border)", background: "rgba(255,255,255,0.5)" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          )}

          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="relative z-10 flex-shrink-0 safe-bottom">
          <div
            className="border-t px-2 pt-2 pb-5"
            style={{
              background: "rgba(255,255,255,0.80)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex flex-col items-center gap-1 py-1 active:scale-90 transition-transform relative"
                  >
                    {tab.id === "favorites" && favorites.length > 0 && (
                      <span className="absolute top-0.5 right-5 w-4 h-4 bg-red-500 rounded-full text-white text-\[11px\] font-black flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                    <motion.div
                      animate={{ scale: isActive ? 1.12 : 1, y: isActive ? -1 : 0 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                    >
                      <Icon
                        size={22}
                        color={isActive ? "var(--green)" : "#c4cdd8"}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                    </motion.div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: isActive ? "var(--green)" : "#c4cdd8" }}
                    >
                      {tab.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute -bottom-1 w-6 h-0.5 rounded-full"
                        style={{ background: "var(--green)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
