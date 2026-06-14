import type { ReactNode } from "react";

/** Inline iso scény — spolehlivé vykreslení uvnitř SVG mapy (bez externího &lt;image&gt;) */

function Beat01() {
  return (
    <>
      <path d="M40 108 L100 78 L160 108 L100 138 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M40 108 L40 118 L100 148 L100 138 Z" fill="#e5e2dd" />
      <path d="M100 138 L100 148 L160 118 L160 108 Z" fill="#ddd9d4" />
      <path d="M62 96 L118 68 L126 72 L70 100 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.2} />
      <path d="M62 96 L62 102 L70 106 L70 100 Z" fill="#e5e2dd" />
      <path d="M70 100 L70 106 L126 78 L126 72 Z" fill="#ddd9d4" />
      <rect x={74} y={74} width={44} height={28} rx={2} fill="#202124" />
      <rect x={77} y={77} width={38} height={22} rx={1.5} fill="#f8f6f2" />
      <circle cx={96} cy={86} r={5} fill="#b50000" />
      <path d="M96 91 L96 96" stroke="#b50000" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M96 86 L93 89 M96 86 L99 89" stroke="#ffffff" strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={108} cy={80} r={4} fill="#b50000" opacity={0.85} />
      <text x={108} y={82} textAnchor="middle" fill="#fff" fontSize={5} fontFamily="Inter,sans-serif" fontWeight={700}>B</text>
      <circle cx={114} cy={86} r={3.5} fill="#202124" opacity={0.35} />
      <circle cx={110} cy={92} r={3.5} fill="#202124" opacity={0.25} />
      <path d="M88 90 Q98 78 108 80" stroke="#b50000" strokeWidth={1} strokeDasharray="2 2" opacity={0.5} />
      <path d="M66 102 L122 76 L128 79 L72 105 Z" fill="#ffffff" stroke="#202124" strokeWidth={0.8} strokeOpacity={0.15} />
    </>
  );
}

function Beat02() {
  return (
    <>
      <path d="M36 110 L100 78 L164 110 L100 142 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M36 110 L36 120 L100 152 L100 142 Z" fill="#e5e2dd" />
      <path d="M100 142 L100 152 L164 120 L164 110 Z" fill="#ddd9d4" />
      <path d="M48 104 L112 72 L120 76 L56 108 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.18} />
      <path d="M48 104 L48 110 L56 114 L56 108 Z" fill="#e5e2dd" />
      <path d="M112 72 L128 80 L120 84 L104 76 Z" fill="#f4f1ec" stroke="#202124" strokeWidth={0.8} strokeOpacity={0.12} />
      <rect x={88} y={62} width={18} height={14} rx={1.5} fill="#202124" />
      <rect x={90} y={64} width={14} height={9} rx={1} fill="#b50000" opacity={0.7} />
      <rect x={94} y={76} width={6} height={3} fill="#202124" opacity={0.5} />
      <rect x={72} y={88} width={14} height={12} rx={1} fill="#ffffff" stroke="#b50000" strokeWidth={0.8} opacity={0.9} />
      <line x1={72} y1={92} x2={86} y2={92} stroke="#b50000" strokeWidth={0.8} />
      <rect x={75} y={95} width={3} height={2} fill="#b50000" opacity={0.4} />
      <rect x={80} y={95} width={3} height={2} fill="#202124" opacity={0.15} />
      <circle cx={130} cy={88} r={5} fill="#202124" opacity={0.7} />
      <path d="M124 94 Q130 100 136 94 L134 108 Q130 112 126 108 Z" fill="#b50000" opacity={0.55} />
      <rect x={138} y={96} width={14} height={10} rx={1.5} fill="#ffffff" stroke="#202124" strokeWidth={0.8} strokeOpacity={0.2} />
      <rect x={140} y={92} width={10} height={5} rx={1} fill="#b50000" opacity={0.3} />
      <line x1={52} y1={108} x2={52} y2={100} stroke="#202124" strokeWidth={1} opacity={0.2} />
      <circle cx={52} cy={98} r={5} fill="rgba(60,100,60,0.55)" />
    </>
  );
}

function Beat03() {
  return (
    <>
      <path d="M38 108 L100 78 L162 108 L100 138 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M38 108 L38 118 L100 148 L100 138 Z" fill="#e5e2dd" />
      <path d="M100 138 L100 148 L162 118 L162 108 Z" fill="#ddd9d4" />
      <path d="M54 100 L126 64 L134 68 L62 104 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.15} />
      <rect x={78} y={68} width={32} height={24} rx={2} fill="#202124" />
      <rect x={81} y={71} width={26} height={16} rx={1} fill="#f8f6f2" />
      <rect x={84} y={74} width={16} height={2} rx={0.5} fill="#b50000" opacity={0.65} />
      <rect x={84} y={78} width={12} height={1.5} rx={0.5} fill="#202124" opacity={0.2} />
      <rect x={84} y={81} width={14} height={1.5} rx={0.5} fill="#202124" opacity={0.15} />
      <rect x={114} y={78} width={12} height={22} rx={2.5} fill="#202124" />
      <rect x={116} y={82} width={8} height={14} rx={1} fill="#f8f6f2" />
      <rect x={128} y={58} width={28} height={16} rx={4} fill="#ffffff" stroke="#202124" strokeWidth={0.8} strokeOpacity={0.18} />
      <path d="M132 64 L142 70 L152 64" stroke="#b50000" strokeWidth={1} opacity={0.5} />
      <rect x={134} y={62} width={16} height={2} rx={0.5} fill="#202124" opacity={0.15} />
      <rect x={120} y={96} width={32} height={14} rx={4} fill="#ffffff" stroke="#b50000" strokeWidth={0.9} strokeOpacity={0.45} />
      <rect x={124} y={100} width={20} height={2} rx={0.5} fill="#b50000" opacity={0.35} />
      <rect x={124} y={104} width={14} height={2} rx={0.5} fill="#202124" opacity={0.12} />
      <circle cx={66} cy={92} r={4.5} fill="#202124" opacity={0.55} />
      <path d="M61 97 Q66 102 71 97 L69 108 Q66 111 63 108 Z" fill="#202124" opacity={0.35} />
    </>
  );
}

function Beat04() {
  return (
    <>
      <path d="M40 108 L100 78 L160 108 L100 138 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M40 108 L40 118 L100 148 L100 138 Z" fill="#e5e2dd" />
      <path d="M100 138 L100 148 L160 118 L160 108 Z" fill="#ddd9d4" />
      <path d="M88 104 L112 92 L116 96 L92 108 Z" fill="#202124" opacity={0.35} />
      <rect x={78} y={52} width={44} height={58} rx={4} fill="#202124" />
      <rect x={82} y={56} width={36} height={48} rx={2} fill="#ffffff" />
      <text x={100} y={68} textAnchor="middle" fill="#202124" fontSize={6} fontFamily="Inter,sans-serif" fontWeight={600}>Check-in</text>
      <rect x={86} y={72} width={28} height={3} rx={1} fill="#202124" opacity={0.15} />
      <rect x={86} y={78} width={24} height={3} rx={1} fill="#202124" opacity={0.12} />
      <rect x={86} y={84} width={26} height={3} rx={1} fill="#202124" opacity={0.12} />
      <rect x={86} y={90} width={20} height={3} rx={1} fill="#202124" opacity={0.1} />
      <circle cx={108} cy={98} r={7} fill="none" stroke="#b50000" strokeWidth={1.8} />
      <path d="M105 98 L107 100.5 L112 95" stroke="#b50000" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={58} cy={96} r={5} fill="#202124" opacity={0.6} />
      <path d="M52 102 Q58 108 64 102 L62 114 Q58 117 54 114 Z" fill="#b50000" opacity={0.45} />
      <rect x={64} y={100} width={8} height={12} rx={1.5} fill="#202124" opacity={0.5} />
    </>
  );
}

function Beat05() {
  return (
    <>
      <path d="M34 110 L100 78 L166 110 L100 142 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M34 110 L34 120 L100 152 L100 142 Z" fill="#e5e2dd" />
      <path d="M100 142 L100 152 L166 120 L166 110 Z" fill="#ddd9d4" />
      <path d="M70 108 L100 93 L130 108 L100 123 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.2} />
      <path d="M70 108 L70 118 L78 122 L78 112 Z" fill="#e5e2dd" />
      <path d="M100 123 L100 133 L130 118 L130 108 Z" fill="#ddd9d4" />
      <rect x={82} y={98} width={36} height={28} rx={1} fill="#f8f6f2" stroke="#202124" strokeWidth={0.9} strokeOpacity={0.22} />
      <line x1={100} y1={98} x2={100} y2={126} stroke="#202124" strokeWidth={0.6} opacity={0.15} />
      <circle cx={112} cy={112} r={2.5} fill="#b50000" />
      <path d="M76 126 L124 102 L128 104 L80 128 Z" fill="#b50000" opacity={0.18} />
      <rect x={132} y={100} width={18} height={14} rx={2} fill="#ffffff" stroke="#202124" strokeWidth={0.8} strokeOpacity={0.2} />
      <rect x={135} y={95} width={12} height={7} rx={1} fill="#b50000" opacity={0.35} />
      <circle cx={136} cy={116} r={2} fill="#202124" opacity={0.2} />
      <circle cx={146} cy={116} r={2} fill="#202124" opacity={0.2} />
      <rect x={54} y={104} width={14} height={9} rx={1.5} fill="#b50000" opacity={0.85} />
      <rect x={56} y={106} width={8} height={5} rx={0.5} fill="#ffffff" opacity={0.5} />
      <circle cx={118} cy={88} r={5} fill="#202124" opacity={0.65} />
      <path d="M112 94 Q118 100 124 94 L122 106 Q118 110 114 106 Z" fill="#202124" opacity={0.4} />
    </>
  );
}

function Beat06() {
  return (
    <>
      <path d="M32 112 L100 78 L168 112 L100 146 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M32 112 L32 122 L100 156 L100 146 Z" fill="#e5e2dd" />
      <path d="M100 146 L100 156 L168 122 L168 112 Z" fill="#ddd9d4" />
      <path d="M48 104 L128 64 L136 68 L56 108 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.16} />
      <path d="M48 104 L48 110 L56 114 L56 108 Z" fill="#e5e2dd" />
      <rect x={54} y={88} width={20} height={10} rx={2} fill="#f4f1ec" stroke="#202124" strokeWidth={0.6} strokeOpacity={0.12} />
      <rect x={58} y={94} width={64} height={12} rx={2} fill="#b50000" opacity={0.1} />
      <rect x={58} y={86} width={14} height={8} rx={2} fill="#ffffff" stroke="#202124" strokeWidth={0.5} strokeOpacity={0.1} />
      <rect x={76} y={88} width={12} height={6} rx={1.5} fill="#ffffff" stroke="#202124" strokeWidth={0.4} strokeOpacity={0.08} />
      <path d="M130 92 L148 84 L152 88 L134 96 Z" fill="#ffffff" stroke="#202124" strokeWidth={0.7} strokeOpacity={0.15} />
      <line x1={140} y1={84} x2={140} y2={74} stroke="#202124" strokeWidth={0.8} opacity={0.25} />
      <path d="M134 74 Q140 68 146 74" fill="rgba(255,220,120,0.7)" stroke="#202124" strokeWidth={0.5} strokeOpacity={0.15} />
      <rect x={64} y={58} width={28} height={18} rx={1} fill="#d4e8f8" stroke="#202124" strokeWidth={0.7} strokeOpacity={0.15} />
      <line x1={78} y1={58} x2={78} y2={76} stroke="#202124" strokeWidth={0.5} opacity={0.12} />
      <line x1={64} y1={67} x2={92} y2={67} stroke="#202124" strokeWidth={0.5} opacity={0.12} />
    </>
  );
}

function Beat07() {
  return (
    <>
      <path d="M38 108 L100 78 L162 108 L100 138 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M38 108 L38 118 L100 148 L100 138 Z" fill="#e5e2dd" />
      <path d="M100 138 L100 148 L162 118 L162 108 Z" fill="#ddd9d4" />
      <path d="M52 100 L128 62 L136 66 L60 104 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.15} />
      <rect x={96} y={68} width={16} height={24} rx={2} fill="#202124" />
      <rect x={99} y={72} width={10} height={12} rx={1} fill="#f8f6f2" />
      <rect x={101} y={76} width={6} height={4} rx={0.5} fill="#b50000" opacity={0.65} />
      <rect x={100} y={88} width={8} height={2} rx={0.5} fill="#202124" opacity={0.3} />
      <rect x={118} y={78} width={14} height={18} rx={1} fill="#ffffff" stroke="#202124" strokeWidth={0.7} strokeOpacity={0.15} />
      <line x1={121} y1={83} x2={129} y2={83} stroke="#202124" strokeWidth={0.6} opacity={0.15} />
      <line x1={121} y1={87} x2={127} y2={87} stroke="#202124" strokeWidth={0.6} opacity={0.12} />
      <line x1={121} y1={91} x2={129} y2={91} stroke="#202124" strokeWidth={0.6} opacity={0.1} />
      <path d="M58 88 L72 88 L68 84 M72 88 L68 92" stroke="#b50000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={74} cy={94} r={5} fill="#202124" opacity={0.6} />
      <path d="M68 100 Q74 106 80 100 L78 112 Q74 116 70 112 Z" fill="#b50000" opacity={0.4} />
      <rect x={48} y={98} width={12} height={10} rx={1.5} fill="#ffffff" stroke="#202124" strokeWidth={0.7} strokeOpacity={0.15} />
    </>
  );
}

function Beat08() {
  return (
    <>
      <path d="M38 108 L100 78 L162 108 L100 138 Z" fill="#f0eeea" stroke="#d8d4d0" strokeWidth={1.2} />
      <path d="M38 108 L38 118 L100 148 L100 138 Z" fill="#e5e2dd" />
      <path d="M100 138 L100 148 L162 118 L162 108 Z" fill="#ddd9d4" />
      <path d="M50 100 L130 60 L138 64 L58 104 Z" fill="#ffffff" stroke="#202124" strokeWidth={1} strokeOpacity={0.15} />
      <rect x={72} y={72} width={36} height={24} rx={2} fill="#ffffff" stroke="#202124" strokeWidth={0.9} strokeOpacity={0.18} />
      <path d="M72 76 L90 88 L108 76" stroke="#b50000" strokeWidth={1.2} opacity={0.55} />
      <rect x={78} y={82} width={22} height={2} rx={0.5} fill="#202124" opacity={0.12} />
      <rect x={78} y={86} width={16} height={2} rx={0.5} fill="#202124" opacity={0.1} />
      <path d="M118 58 l2 4 l4.5 0.5 l-3.5 3 l1 4.5 l-4 -2.5 l-4 2.5 l1 -4.5 l-3.5 -3 l4.5 -0.5 Z" fill="#b50000" />
      <path d="M130 62 l1.5 3 l3.5 0.4 l-2.7 2.2 l0.8 3.5 l-3.1 -1.9 l-3.1 1.9 l0.8 -3.5 l-2.7 -2.2 l3.5 -0.4 Z" fill="#b50000" opacity={0.7} />
      <path d="M108 66 l1.5 3 l3.5 0.4 l-2.7 2.2 l0.8 3.5 l-3.1 -1.9 l-3.1 1.9 l0.8 -3.5 l-2.7 -2.2 l3.5 -0.4 Z" fill="#b50000" opacity={0.5} />
      <rect x={128} y={78} width={14} height={24} rx={2.5} fill="#202124" />
      <rect x={130} y={82} width={10} height={16} rx={1} fill="#f8f6f2" />
      <circle cx={140} cy={76} r={5} fill="#b50000" />
      <text x={140} y={78} textAnchor="middle" fill="#fff" fontSize={6} fontFamily="Inter,sans-serif" fontWeight={700}>1</text>
      <path d="M62 82 C62 78 66 76 68 80 C70 76 74 78 74 82 C74 86 68 90 68 90 C68 90 62 86 62 82 Z" fill="#b50000" opacity={0.35} />
    </>
  );
}

export const SCENE_VIEWBOX = { w: 200, h: 160 } as const;

export const SCENE_BY_BEAT: Record<number, () => ReactNode> = {
  1: Beat01,
  2: Beat02,
  3: Beat03,
  4: Beat04,
  5: Beat05,
  6: Beat06,
  7: Beat07,
  8: Beat08,
};
