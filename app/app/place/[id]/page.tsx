"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Clock, Phone, Star, Heart, Share2,
  Navigation, Tag, Sparkles, X, Coins,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { places } from "@/data/places";
import { getDiscountInfo } from "@/lib/discounts";
import { useGame } from "@/lib/game-context";
import Aurora from "@/components/ui/Aurora";
import DiscountBadge from "@/components/ui/DiscountBadge";
import DiscountFlow from "@/components/DiscountFlow";

export default function PlaceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const place = places.find((p) => p.id === id);
  const { isFavorite, toggleFavorite, hasRedeemed } = useGame();
  const [showDiscount, setShowDiscount] = useState(false);

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
    place.discount,
    place.free,
    place.basePrice,
    place.pointsReward,
    place.bonusText,
  );
  const liked = isFavorite(place.id);
  const redeemed = hasRedeemed(place.id);
  const related = places.filter((p) => p.id !== place.id && p.category === place.category).slice(0, 2);

  return (
    <main
      className="h-full w-full max-w-[430px] mx-auto relative overflow-hidden shadow-2xl flex flex-col"
      style={{ background: "var(--bg-main)" }}
    >
      <Aurora />

      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-none">
        {/* Hero */}
        <div className="relative h-72 flex-shrink-0">
          <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(15,25,18,0.75) 100%)",
            }}
          />

          <div className="absolute top-0 left-0 right-0 px-5 pt-14 safe-top flex items-center justify-between">
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

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <DiscountBadge info={discountInfo} size="lg" />
            {redeemed && (
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-xl"
                style={{ background: "rgba(26,122,94,0.9)", color: "white", backdropFilter: "blur(8px)" }}
              >
                ✓ Uplatněno
              </span>
            )}
          </div>
        </div>

        <div className="px-5 pt-5 pb-36">
          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(26,122,94,0.1)", color: "var(--green)", border: "1px solid rgba(26,122,94,0.2)" }}
            >
              {place.category}
            </span>
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full glass"
                style={{ color: "var(--text-sub)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black mb-2 leading-tight"
            style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}
          >
            {place.name}
          </motion.h1>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  color={i < Math.floor(place.rating) ? "#d97706" : "#e5e7eb"}
                  fill={i < Math.floor(place.rating) ? "#d97706" : "#e5e7eb"}
                />
              ))}
              <span className="font-bold text-sm ml-1" style={{ color: "var(--text-main)" }}>{place.rating}</span>
            </div>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>({place.reviewCount} hodnocení)</span>
          </div>

          {/* Savings card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-4 mb-5 relative overflow-hidden shadow-sm"
            style={{
              background: "linear-gradient(135deg, rgba(26,122,94,0.08), rgba(37,99,235,0.06))",
              border: "1px solid rgba(26,122,94,0.15)",
            }}
          >
            <div className="absolute inset-0 holo-shine opacity-25 pointer-events-none" />
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(26,122,94,0.1)" }}
              >
                <Coins size={22} color="var(--green)" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>S kartou ušetříte cca</p>
                <p className="text-2xl font-black" style={{ color: "var(--green)" }}>{discountInfo.estimatedSaving} Kč</p>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>+ body</p>
                <p className="font-black text-sm" style={{ color: "#d97706" }}>+{place.pointsReward} BB</p>
              </div>
            </div>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>{discountInfo.description}</p>
          </motion.div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-sub)" }}>{place.description}</p>

          {/* Info cards */}
          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { icon: MapPin, color: "#2563eb", bg: "rgba(37,99,235,0.08)", label: "Adresa", value: place.address, extra: `${place.distance} km` },
              { icon: Clock, color: "var(--green)", bg: "rgba(26,122,94,0.08)", label: "Otevírací doba", value: place.hours },
              ...(place.phone
                ? [{ icon: Phone, color: "#7c3aed", bg: "rgba(124,58,237,0.08)", label: "Telefon", value: place.phone, extra: undefined }]
                : []),
            ].map(({ icon: Icon, color, bg, label, value, extra }) => (
              <motion.div
                key={label}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={16} color={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="text-sm font-medium line-clamp-2" style={{ color: "var(--text-main)" }}>{value}</p>
                </div>
                {extra && (
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ background: "rgba(37,99,235,0.1)", color: "#2563eb" }}
                  >
                    {extra}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Related places */}
          {related.length > 0 && (
            <div>
              <p className="font-bold text-sm mb-3" style={{ color: "var(--text-main)" }}>Podobná místa</p>
              <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-none">
                {related.map((r) => {
                  const ri = getDiscountInfo(r.discount, r.free, r.basePrice, r.pointsReward, r.bonusText);
                  return (
                    <motion.button
                      key={r.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => router.push(`/app/place/${r.id}`)}
                      className="flex-shrink-0 w-40 glass rounded-2xl overflow-hidden text-left shadow-sm"
                    >
                      <img src={r.img} alt={r.name} className="w-full h-24 object-cover" />
                      <div className="p-3">
                        <p className="font-semibold text-xs line-clamp-1" style={{ color: "var(--text-main)" }}>{r.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.distance} km</span>
                          <DiscountBadge info={ri} size="sm" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      {!showDiscount && (
        <div className="absolute bottom-0 left-0 right-0 z-20 safe-bottom">
          <div
            className="border-t px-5 pt-4 pb-6"
            style={{
              background: "rgba(240,245,242,0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex items-center gap-2 mb-3 rounded-2xl px-3 py-2.5 glass"
            >
              <Tag size={14} color="#d97706" />
              <p className="text-xs flex-1" style={{ color: "var(--text-sub)" }}>
                {redeemed ? "Sleva u tohoto místa již byla uplatněna" : discountInfo.description}
              </p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="flex-1 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 glass shadow-sm"
                style={{ color: "var(--text-sub)" }}
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

      {/* Discount overlay */}
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
              className="w-full glass rounded-t-[32px] p-5 pb-10 safe-bottom max-h-[85vh] overflow-y-auto scrollbar-none shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-black text-lg" style={{ color: "var(--text-main)" }}>Uplatnit slevu</p>
                <button
                  onClick={() => setShowDiscount(false)}
                  className="glass w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
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
