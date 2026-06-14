"use client";

import { use, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Phone, Star, Heart, Share2,
  Navigation, Sparkles, X, Coins,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { places } from "@/data/places";
import { getDiscountInfo } from "@/lib/discounts";
import { useGame } from "@/lib/game-context";
import DiscountFlow from "@/components/DiscountFlow";

export default function PlaceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const place = places.find((p) => p.id === id);
  const { isFavorite, toggleFavorite, hasRedeemed } = useGame();
  const [showDiscount, setShowDiscount] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const dragStartY = useRef(0);

  if (!place) {
    return (
      <main className="h-full w-full max-w-[430px] mx-auto flex items-center justify-center" style={{ background: "var(--bg-main)" }}>
        <div className="text-center px-8">
          <p className="font-bold text-lg mb-2" style={{ color: "var(--text-main)" }}>Místo nenalezeno</p>
          <button onClick={() => router.back()} className="text-sm font-semibold" style={{ color: "var(--green)" }}>← Zpět</button>
        </div>
      </main>
    );
  }

  const discountInfo = getDiscountInfo(
    place.discount, place.free, place.basePrice, place.pointsReward, place.bonusText,
  );
  const liked = isFavorite(place.id);
  const redeemed = hasRedeemed(place.id);
  const related = places.filter((p) => p.id !== place.id && p.category === place.category).slice(0, 4);

  return (
    <main
      className="h-full w-full max-w-[430px] mx-auto relative overflow-hidden shadow-2xl"
      style={{ background: "var(--bg-main)" }}
    >
      {/* ── Hero – fixed behind content ── */}
      <div className="absolute top-0 left-0 right-0" style={{ height: "62%" }}>
        <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 35%, rgba(8,16,12,0.60) 70%, rgba(8,16,12,0.90) 100%)" }}
        />

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 px-5 header-top flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" }}
          >
            <ArrowLeft size={18} color="#1a2332" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(place.id)}
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" }}
            >
              <Heart size={18} color={liked ? "#ef4444" : "#6b7280"} fill={liked ? "#ef4444" : "transparent"} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)" }}
            >
              <Share2 size={18} color="#6b7280" />
            </motion.button>
          </div>
        </div>

        {/* Place info on hero — text ends ~5vh above content card (53vh) */}
        <div className="absolute left-5 right-5" style={{ bottom: "14vh" }}>
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(26,122,94,0.85)", color: "white", backdropFilter: "blur(8px)" }}
            >
              {place.category}
            </span>
            {redeemed && (
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.18)", color: "white", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                ✓ Uplatněno
              </span>
            )}
          </div>
          <h1
            className="text-2xl font-black leading-tight mb-2.5"
            style={{ color: "white", fontFamily: "var(--font-outfit)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            {place.name}
          </h1>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} color={i < Math.floor(place.rating) ? "#fbbf24" : "rgba(255,255,255,0.25)"} fill={i < Math.floor(place.rating) ? "#fbbf24" : "rgba(255,255,255,0.25)"} />
              ))}
              <span className="text-white font-bold text-sm ml-1">{place.rating}</span>
            </div>
            <span className="text-white/30">·</span>
            <div className="flex items-center gap-1">
              <MapPin size={10} color="rgba(255,255,255,0.55)" />
              <span className="text-white/60 text-sm">{place.distance} km</span>
            </div>
            <span className="text-white/30">·</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{place.reviewCount} hodnocení</span>
          </div>
        </div>
      </div>

      {/* ── Content card – slides over hero, expandable ── */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 flex flex-col"
        animate={{ top: sheetExpanded ? "12%" : "53%" }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        style={{
          borderRadius: "32px 32px 0 0",
          background: "var(--bg-main)",
          boxShadow: "0 -12px 48px rgba(8,16,12,0.20)",
        }}
      >
        {/* Drag handle – tap or swipe to expand/collapse */}
        <div
          className="flex justify-center pt-3 pb-2 flex-shrink-0 cursor-pointer select-none touch-none"
          onClick={() => setSheetExpanded(e => !e)}
          onPointerDown={e => { dragStartY.current = e.clientY; }}
          onPointerUp={e => {
            const delta = dragStartY.current - e.clientY;
            if (delta > 30) setSheetExpanded(true);
            else if (delta < -30) setSheetExpanded(false);
          }}
        >
          <div className="w-9 h-1 rounded-full" style={{ background: "rgba(0,0,0,0.14)" }} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="px-5 pb-36">
          {/* Quick actions */}
          <div className="flex gap-2 mb-5 mt-1">
            {[
              { icon: Navigation, label: "Navigovat", color: "#2563eb", bg: "rgba(37,99,235,0.08)" },
              { icon: Phone, label: "Volat", color: "#7c3aed", bg: "rgba(124,58,237,0.08)" },
              { icon: Share2, label: "Sdílet", color: "#1a7a5e", bg: "rgba(26,122,94,0.08)" },
            ].map(({ icon: Icon, label, color, bg }) => (
              <motion.button
                key={label}
                whileTap={{ scale: 0.93 }}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl shadow-sm"
                style={{ background: "rgba(255,255,255,0.70)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.88)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={15} color={color} />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-sub)" }}>{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Savings card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl p-4 mb-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(26,122,94,0.09), rgba(37,99,235,0.06))",
              border: "1px solid rgba(26,122,94,0.16)",
            }}
          >
            <div className="absolute inset-0 holo-shine opacity-25 pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(26,122,94,0.1)" }}>
                <Coins size={22} color="var(--green)" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>S kartou ušetříte cca</p>
                <p className="text-2xl font-black" style={{ color: "var(--green)" }}>{discountInfo.estimatedSaving} Kč</p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>+ body</p>
                <p className="font-black text-sm" style={{ color: "#d97706" }}>+{place.pointsReward} bodů</p>
              </div>
            </div>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>{discountInfo.description}</p>
          </motion.div>

          {/* Tags */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {place.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.70)", border: "1px solid rgba(255,255,255,0.88)", color: "var(--text-sub)", backdropFilter: "blur(16px)" }}>
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-sub)" }}>{place.description}</p>

          {/* Info rows */}
          <div className="flex flex-col gap-2 mb-6">
            {[
              { icon: MapPin, color: "#2563eb", bg: "rgba(37,99,235,0.08)", label: "Adresa", value: place.address, extra: `${place.distance} km` },
              { icon: Clock, color: "var(--green)", bg: "rgba(26,122,94,0.08)", label: "Otevírací doba", value: place.hours },
              ...(place.phone ? [{ icon: Phone, color: "#7c3aed", bg: "rgba(124,58,237,0.08)", label: "Telefon", value: place.phone, extra: undefined }] : []),
            ].map(({ icon: Icon, color, bg, label, value, extra }) => (
              <motion.div key={label} whileTap={{ scale: 0.98 }} className="rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.70)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.88)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={16} color={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="text-sm font-medium line-clamp-2" style={{ color: "var(--text-main)" }}>{value}</p>
                </div>
                {extra && (
                  <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0" style={{ background: "rgba(37,99,235,0.10)", color: "#2563eb" }}>{extra}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Related places */}
          {related.length > 0 && (
            <div>
              <p className="font-bold text-sm mb-3" style={{ color: "var(--text-main)" }}>Podobná místa</p>
              <div className="grid grid-cols-2 gap-2.5">
                {related.map((r) => (
                  <motion.button
                    key={r.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => router.push(`/place/${r.id}`)}
                    className="rounded-2xl overflow-hidden relative text-left"
                    style={{ height: 130 }}
                  >
                    <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,20,15,0.90) 0%, transparent 55%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="font-bold text-xs text-white line-clamp-2 leading-tight">{r.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={8} color="#fbbf24" fill="#fbbf24" />
                        <span className="text-white/70 text-xs">{r.rating}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-white/50 text-xs">{r.distance} km</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </motion.div>

      {/* ── Sticky CTA ── */}
      {!showDiscount && (
        <div className="absolute bottom-0 left-0 right-0 z-20 safe-bottom">
          <div
            className="px-5 pt-3 pb-6"
            style={{
              background: "rgba(240,245,242,0.94)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                style={{ background: "rgba(255,255,255,0.70)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.88)", color: "var(--text-sub)" }}
              >
                <Navigation size={16} />
                Navigovat
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowDiscount(true)}
                disabled={redeemed}
                className="flex-[1.4] py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-40 shadow-md"
                style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}
              >
                <Sparkles size={16} />
                {redeemed ? "Uplatněno" : "Uplatnit slevu"}
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* ── Discount overlay ── */}
      <AnimatePresence>
        {showDiscount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center max-w-[430px] mx-auto"
            style={{ background: "rgba(10,20,15,0.55)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowDiscount(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring" as const, stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-[32px] p-5 pb-10 safe-bottom max-h-[85vh] overflow-y-auto scrollbar-none shadow-2xl"
              style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(24px)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-black text-lg" style={{ color: "var(--text-main)" }}>Uplatnit slevu</p>
                <button
                  onClick={() => setShowDiscount(false)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <X size={16} color="var(--text-muted)" />
                </button>
              </div>
              <DiscountFlow
                placeId={place.id}
                placeName={place.name}
                category={place.category}
                discountInfo={discountInfo}
                onClose={() => setShowDiscount(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
