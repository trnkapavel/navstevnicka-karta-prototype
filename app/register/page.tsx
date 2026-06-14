"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  return (
    <main className="h-full w-full max-w-[430px] mx-auto relative overflow-hidden bg-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-14 pb-5 safe-top" style={{ background: "#0f2547" }}>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/60 mb-6 active:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Zpět</span>
        </button>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          <h1 className="text-2xl font-bold text-white mb-1">Registrace</h1>
          <p className="text-white/60 text-sm">Zaregistruj se a získej svou kartu zdarma</p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 280 }}
          className="flex flex-col gap-4"
        >
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Jméno
              </label>
              <input
                type="text"
                placeholder="Jan"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Příjmení
              </label>
              <input
                type="text"
                placeholder="Novák"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              placeholder="jan@email.cz"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Heslo
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Alespoň 8 znaků"
                className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Country / Age */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Věk
              </label>
              <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-base focus:outline-none focus:border-blue-500 transition-all appearance-none bg-white">
                <option value="">Vyberte</option>
                <option>15–25</option>
                <option>26–40</option>
                <option>41–60</option>
                <option>60+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Země
              </label>
              <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-base focus:outline-none focus:border-blue-500 transition-all appearance-none bg-white">
                <option>Česká republika</option>
                <option>Slovensko</option>
                <option>Jiná</option>
              </select>
            </div>
          </div>

          {/* GDPR */}
          <div className="flex gap-3 items-start pt-2">
            <input
              type="checkbox"
              id="gdpr"
              className="mt-0.5 w-4 h-4 rounded accent-blue-600 flex-shrink-0"
            />
            <label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed">
              Souhlasím se{" "}
              <span className="text-blue-600 underline underline-offset-2">zpracováním osobních údajů</span>{" "}
              za účelem aktivace Návštěvnické karty.
            </label>
          </div>

          {/* Newsletter */}
          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              id="newsletter"
              className="mt-0.5 w-4 h-4 rounded accent-blue-600 flex-shrink-0"
            />
            <label htmlFor="newsletter" className="text-xs text-gray-500 leading-relaxed">
              Chci dostávat novinky o akcích a slevách v regionu.
            </label>
          </div>
        </motion.div>
      </div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="flex-shrink-0 px-5 pb-8 pt-4 safe-bottom border-t border-gray-100"
      >
        <button
          onClick={() => router.push("/app")}
          className="w-full py-4 rounded-2xl font-bold text-base text-white active:scale-95 transition-transform shadow-lg"
          style={{ background: "linear-gradient(135deg, #1b3a6b, #2d5a9e)" }}
        >
          Zaregistrovat se
        </button>
      </motion.div>
    </main>
  );
}
