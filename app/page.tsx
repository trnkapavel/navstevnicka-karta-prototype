"use client";

import { useState, useMemo } from "react";
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
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [activeCategory, setActiveCategory] = useState<Category | "Vše">("Vše");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAI, setShowAI] = useState(false);
  const router = useRouter();
  const {
    points, savingsKc, visits, streak,
    favorites, toggleFavorite, isFavorite,
    achievements, challenges,
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

          {/* ── KARTA ── */}
          {activeTab === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="px-5 header-top pb-8">
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Vaše karta</p>
              <h1 className="font-black text-2xl mb-4" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>
                Přehled výhod
              </h1>

              <LevelBar />

              {/* Holographic card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 280 }}
                className="relative rounded-3xl overflow-hidden mb-6 select-none shadow-xl"
                style={{ aspectRatio: "1.6", background: "linear-gradient(135deg, #0a2540 0%, #1a4570 40%, #0d3d2a 100%)" }}
              >
                <div className="absolute inset-0 holo-shine opacity-60 pointer-events-none" />
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute top-4 left-5 right-5">
                  <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-0.5">Návštěvnická karta</p>
                  <p className="text-white font-bold text-sm">Berounsko · Brd · Podbrdsko</p>
                </div>
                <div className="absolute top-4 right-5 px-3 py-1.5 rounded-2xl flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
                  <Trophy size={12} color="#fbbf24" />
                  <span className="text-amber-300 font-black text-sm">{points}</span>
                  <span className="text-white/50 text-xs">bodů</span>
                </div>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-white/40 text-\[11px\] mb-0.5 tracking-widest uppercase">Číslo karty</p>
                    <p className="text-white font-mono text-sm tracking-widest">•••• •••• 1234</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-\[11px\] mb-0.5">Jan Novák</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-green-300 text-xs font-bold">Aktivní</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Berounské body", value: points, icon: Trophy, color: "#d97706", suffix: "" },
                  { label: "Ušetřeno", value: savingsKc, icon: Sparkles, color: "#1a7a5e", suffix: "Kč" },
                  { label: "Navštíveno", value: visits, icon: MapPin, color: "#2563eb", suffix: "×" },
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm"
                    >
                      <Icon size={16} color={stat.color} />
                      <p className="font-black text-lg leading-none" style={{ color: "var(--text-main)" }}>
                        {stat.value}
                        <span className="text-xs font-bold ml-0.5" style={{ color: stat.color }}>{stat.suffix}</span>
                      </p>
                      <p className="text-\[11px\] text-center leading-tight" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Streak */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-3xl px-4 py-4 mb-5 flex items-center gap-3 shadow-sm"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl" style={{ background: "rgba(251,191,36,0.12)" }}>
                  🔥
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "var(--text-main)" }}>
                  {streak === 0 ? "Začněte sérii dnes!" : `${streak}denní série!`}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {streak >= 7 ? "Bonus +50 bodů aktivní" : streak === 0 ? "Navštivte partnera a získejte bonus" : "Pokračuj zítra pro bonus +50 bodů"}
                </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: i < streak ? "#fbbf24" : "rgba(0,0,0,0.08)" }} />
                  ))}
                </div>
              </motion.div>

              <SavingsHistory />

              {/* Achievements */}
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Odznaky</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, type: "spring" as const, stiffness: 400 }}
                    className="glass rounded-2xl p-3 shadow-sm"
                    style={a.earned ? { border: "1px solid rgba(26,122,94,0.3)", background: "rgba(26,122,94,0.06)" } : {}}
                  >
                    <div className="text-2xl mb-2" style={{ filter: a.earned ? "none" : "grayscale(100%) opacity(0.4)" }}>{a.icon}</div>
                    <p className="font-bold text-xs mb-0.5" style={{ color: "var(--text-main)" }}>{a.label}</p>
                    <p className="text-xs leading-tight mb-2" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
                    {!a.earned && a.progress !== undefined && (
                      <div>
                        <div className="h-1 rounded-full mb-1" style={{ background: "rgba(0,0,0,0.08)" }}>
                          <div className="h-full rounded-full" style={{ width: `${(a.progress / (a.total ?? 1)) * 100}%`, background: "linear-gradient(90deg, #1a7a5e, #2563eb)" }} />
                        </div>
                        <p className="text-\[11px\]" style={{ color: "var(--text-muted)" }}>{a.progress}/{a.total}</p>
                      </div>
                    )}
                    {a.earned && <p className="text-\[11px\] font-bold" style={{ color: "var(--green)" }}>✓ Získáno</p>}
                  </motion.div>
                ))}
              </div>

              {/* Challenges */}
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Výzvy tohoto týdne</p>
              <div className="flex flex-col gap-2 mb-5">
                {challenges.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm"
                    style={c.done ? { opacity: 0.45 } : {}}
                  >
                    <span className="text-xl">{c.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm" style={{ color: "var(--text-main)", textDecoration: c.done ? "line-through" : "none" }}>{c.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{c.done ? "Splněno ✓" : `Zbývá: ${c.deadline}`}</p>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl flex items-center gap-1" style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(217,119,6,0.2)" }}>
                      <Zap size={10} color="#d97706" />
                      <span className="font-black text-xs" style={{ color: "#d97706" }}>+{c.reward}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* QR */}
              <div className="glass rounded-3xl p-5 flex flex-col items-center shadow-sm">
                <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                  <QrCode size={56} color="#0f2547" strokeWidth={1.5} />
                </div>
                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>Ukažte QR kód u partnera</p>
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
