"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGame } from "@/lib/game-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useGame();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!firstName.trim() || !email.trim()) {
      setError("Vyplňte prosím jméno a e-mail.");
      return;
    }
    if (!gdpr) {
      setError("Potřebujeme souhlas se zpracováním údajů.");
      return;
    }
    register(`${firstName.trim()} ${lastName.trim()}`.trim(), email.trim());
    router.push("/");
  };

  return (
    <main className="h-full w-full max-w-[430px] mx-auto relative overflow-hidden shadow-2xl flex flex-col" style={{ background: "var(--bg-main)" }}>
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-14 pb-6 safe-top" style={{ background: "linear-gradient(135deg, #0a2540, #1a4570)" }}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 active:opacity-70 transition-opacity"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Zpět</span>
        </button>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <div className="text-3xl mb-3">🎟</div>
          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
            Získejte kartu zdarma
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            Sbírejte body a proměňte je za volné vstupenky do regionu.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 280 }}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                Jméno *
              </label>
              <input
                type="text"
                placeholder="Jan"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl text-base focus:outline-none"
                style={{ background: "rgba(255,255,255,0.80)", border: "1.5px solid rgba(0,0,0,0.08)", color: "var(--text-main)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
                Příjmení
              </label>
              <input
                type="text"
                placeholder="Novák"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl text-base focus:outline-none"
                style={{ background: "rgba(255,255,255,0.80)", border: "1.5px solid rgba(0,0,0,0.08)", color: "var(--text-main)" }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-muted)" }}>
              E-mail *
            </label>
            <input
              type="email"
              placeholder="jan@email.cz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl text-base focus:outline-none"
              style={{ background: "rgba(255,255,255,0.80)", border: "1.5px solid rgba(0,0,0,0.08)", color: "var(--text-main)" }}
            />
          </div>

          {/* GDPR */}
          <label className="flex gap-3 items-start cursor-pointer">
            <div
              onClick={() => setGdpr(v => !v)}
              className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: gdpr ? "#1a7a5e" : "rgba(255,255,255,0.8)", border: gdpr ? "none" : "1.5px solid rgba(0,0,0,0.15)" }}
            >
              {gdpr && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Souhlasím se{" "}
              <span style={{ color: "var(--green)", textDecoration: "underline" }}>zpracováním osobních údajů</span>{" "}
              za účelem aktivace Návštěvnické karty.
            </span>
          </label>

          {error && (
            <p className="text-sm font-medium" style={{ color: "#ef4444" }}>{error}</p>
          )}

          {/* Benefit přehled */}
          <div className="rounded-3xl p-4 mt-2" style={{ background: "rgba(26,122,94,0.07)", border: "1px solid rgba(26,122,94,0.14)" }}>
            <p className="font-bold text-sm mb-3" style={{ color: "var(--text-main)" }}>Co získáte registrací</p>
            {[
              { icon: "🎟", text: "Volné vstupenky za nasbírané body" },
              { icon: "💳", text: "Slevy 10–25 % u 20+ partnerů v regionu" },
              { icon: "🏆", text: "Body za každou návštěvu, soutěže" },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2.5 mb-2 last:mb-0">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm" style={{ color: "var(--text-sub)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Submit */}
      <div className="flex-shrink-0 px-5 pb-8 pt-4 safe-bottom" style={{ borderTop: "1px solid var(--border)", background: "rgba(240,245,242,0.95)", backdropFilter: "blur(20px)" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl font-bold text-base text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #1a7a5e, #2563eb)" }}
        >
          Zaregistrovat se a sbírat body
        </motion.button>
      </div>
    </main>
  );
}
