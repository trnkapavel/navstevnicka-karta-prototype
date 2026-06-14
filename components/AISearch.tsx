"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MapPin } from "lucide-react";
import { places, aiResponses, Place } from "@/data/places";
import { useRouter } from "next/navigation";

interface AISearchProps {
  onClose: () => void;
}

interface Message {
  role: "user" | "ai";
  text: string;
  places?: Place[];
}

const suggestions = [
  "Výlet s rodinou na víkend",
  "Levná restaurace s pivem",
  "Ubytování v přírodě",
  "Sport a zábava dnes večer",
  "Kulturní tip na odpoledne",
];

function classifyQuery(query: string): keyof typeof aiResponses | null {
  const q = query.toLowerCase();
  if (q.match(/rodin|dět|kluk|holka|syn|dcera/)) return "rodina";
  if (q.match(/jídl|restaurac|jíst|večeř|oběd|pivo|pít/)) return "jidlo";
  if (q.match(/příroda|les|stezka|výlet|turistik|hory/)) return "priroda";
  if (q.match(/ubytov|hotel|penzion|spát|nocovat/)) return "ubytovani";
  if (q.match(/sport|aktivní|pohyb|bowling|bazén|plavání/)) return "sport";
  if (q.match(/kultur|muzeum|umění|výstav|historick/)) return "kulturni";
  return null;
}

export default function AISearch({ onClose }: AISearchProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Ahoj! Jsem váš AI průvodce regionem. Co pro vás mohu najít? Zkuste napsat třeba 'výlet s rodinou' nebo 'dobré jídlo blízko'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const key = classifyQuery(text);
      let aiMsg: Message;

      if (key && aiResponses[key]) {
        const resp = aiResponses[key];
        const matchedPlaces = resp.placeIds
          .map((id) => places.find((p) => p.id === id))
          .filter(Boolean) as Place[];
        aiMsg = { role: "ai", text: resp.message, places: matchedPlaces };
      } else {
        const allPlaces = places.slice(0, 3);
        aiMsg = {
          role: "ai",
          text: "Nenašel jsem přesnou shodu, ale tady jsou naše nejoblíbenější tipy pro vás:",
          places: allPlaces,
        };
      }
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(10,20,45,0.97)", backdropFilter: "blur(16px)" }}
    >
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-14 pb-4 flex items-center gap-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}>
          <Sparkles size={18} color="white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-base leading-tight">AI Průvodce regionem</p>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Online
          </p>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <X size={18} color="white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} flex-col gap-2`}>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm ml-auto"
                  : "bg-white/10 text-white rounded-bl-sm"
              }`}
            >
              {msg.text}
            </motion.div>

            {/* Place cards in AI message */}
            {msg.places && msg.places.length > 0 && (
              <div className="flex flex-col gap-2 max-w-full">
                {msg.places.map((place, pi) => (
                  <motion.button
                    key={place.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: pi * 0.1, type: "spring", stiffness: 350 }}
                    onClick={() => { onClose(); router.push(`/app/place/${place.id}`); }}
                    className="flex items-center gap-3 bg-white/8 border border-white/12 rounded-2xl p-3 text-left active:scale-95 transition-transform"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <img src={place.img} alt={place.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{place.name}</p>
                      <p className="text-white/50 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin size={10} />
                        {place.distance} km · {place.category}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {place.free ? (
                        <span className="text-green-400 text-xs font-bold bg-green-400/15 px-2 py-1 rounded-lg">FREE</span>
                      ) : (
                        <span className="text-blue-300 text-xs font-bold bg-blue-400/15 px-2 py-1 rounded-lg">{place.discount}</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1.5 px-4 py-3 bg-white/10 rounded-2xl rounded-bl-sm w-fit"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                className="w-2 h-2 bg-white/60 rounded-full"
              />
            ))}
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-4 pb-2">
          <p className="text-white/40 text-xs mb-2 font-medium">Zkuste se zeptat:</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="flex-shrink-0 text-xs text-white/70 border border-white/20 rounded-full px-3 py-1.5 active:bg-white/10 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 px-4 pb-8 pt-3 border-t border-white/10 safe-bottom">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Napište co hledáte…"
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
            autoFocus
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-40 transition-opacity active:scale-90 transition-transform"
            style={{ background: "linear-gradient(135deg, #3d9970, #2d7dd2)" }}
          >
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
