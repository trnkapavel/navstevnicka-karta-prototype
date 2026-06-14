"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, X, Sparkles, Navigation } from "lucide-react";
import { places } from "@/data/places";
import { useRouter } from "next/navigation";

const categoryEmoji: Record<string, string> = {
  "Zážitky": "🎭",
  "Restaurace": "🍺",
  "Muzea": "🏛",
  "Ubytování": "🏡",
  "Příroda": "🌿",
  "Sport": "⚡",
};

const categoryColor: Record<string, string> = {
  "Zážitky": "#7c3aed",
  "Restaurace": "#d97706",
  "Muzea": "#2563eb",
  "Ubytování": "#ec4899",
  "Příroda": "#1a7a5e",
  "Sport": "#ef4444",
};

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const router = useRouter();
  const [selected, setSelected] = useState<typeof places[0] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamicky importujeme Leaflet (SSR safe)
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: [49.965, 13.97],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      // Custom attribution malý
      L.control.attribution({ position: "bottomleft", prefix: false })
        .addAttribution('© <a href="https://openstreetmap.org">OSM</a>')
        .addTo(map);

      // Zoom tlačítka vpravo dole
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Markery
      places.forEach((place) => {
        const color = categoryColor[place.category] || "#1a7a5e";
        const emoji = categoryEmoji[place.category] || "📍";

        const icon = L.divIcon({
          html: `
            <div style="
              width: 36px; height: 36px;
              background: white;
              border-radius: 50%;
              border: 2.5px solid ${color};
              display: flex; align-items: center; justify-content: center;
              font-size: 15px;
              box-shadow: 0 3px 12px rgba(0,0,0,0.18);
              cursor: pointer;
              transition: transform 0.15s;
            ">${emoji}</div>
          `,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

        const marker = L.marker([place.lat, place.lng], { icon }).addTo(map);
        marker.on("click", () => {
          setSelected(place);
        });
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Legenda kategorií */}
      <div
        className="absolute top-4 left-4 right-4 z-[400] flex gap-1.5 overflow-x-auto scrollbar-none"
        style={{ pointerEvents: "none" }}
      >
        {Object.entries(categoryEmoji).map(([cat, emoji]) => (
          <div
            key={cat}
            className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(12px)",
              color: categoryColor[cat],
              border: `1.5px solid ${categoryColor[cat]}30`,
              pointerEvents: "all",
            }}
          >
            <span>{emoji}</span>
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Počet míst */}
      <div
        className="absolute top-14 left-4 z-[400] px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", color: "var(--text-sub)" }}
      >
        {places.length} míst v regionu
      </div>

      {/* Bottom sheet – vybrané místo */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute bottom-0 left-0 right-0 z-[500] rounded-t-[28px] overflow-hidden shadow-2xl"
            style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex items-start gap-3 p-4">
              <img
                src={selected.img}
                alt={selected.name}
                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${categoryColor[selected.category]}18`, color: categoryColor[selected.category] }}
                  >
                    {selected.category}
                  </span>
                  {selected.hot && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(217,119,6,0.12)", color: "#d97706" }}>
                      🔥 HOT
                    </span>
                  )}
                </div>
                <p className="font-black text-base leading-tight mb-1.5 line-clamp-2" style={{ color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>
                  {selected.name}
                </p>
                <div className="flex items-center gap-2">
                  <Star size={11} color="#d97706" fill="#d97706" />
                  <span className="font-bold text-xs" style={{ color: "var(--text-main)" }}>{selected.rating}</span>
                  <span style={{ color: "var(--border)" }}>·</span>
                  <MapPin size={9} color="var(--text-muted)" />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{selected.distance} km</span>
                  <span style={{ color: "var(--border)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{selected.monthlyVisits.toLocaleString("cs")} / měs.</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,0,0,0.06)" }}
              >
                <X size={14} color="var(--text-muted)" />
              </button>
            </div>

            <div className="px-4 pb-5 flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelected(null)}
                className="flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                style={{ background: "rgba(0,0,0,0.05)", color: "var(--text-sub)" }}
              >
                <Navigation size={15} />
                Navigovat
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push(`/place/${selected.id}`)}
                className="flex-[1.5] py-3 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md"
                style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}
              >
                <Sparkles size={15} />
                Zobrazit detail
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
