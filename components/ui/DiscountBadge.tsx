import type { DiscountInfo } from "@/lib/discounts";

interface DiscountBadgeProps {
  info: DiscountInfo;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const bgColors: Record<string, string> = {
  percent: "linear-gradient(135deg, #d97706, #f59e0b)",
  free:    "linear-gradient(135deg, #1a7a5e, #22a87a)",
  bonus:   "linear-gradient(135deg, #7c3aed, #9f5cf0)",
  one_plus_one: "linear-gradient(135deg, #2563eb, #4a9ede)",
};

export default function DiscountBadge({ info, size = "md", className = "" }: DiscountBadgeProps) {
  const sizes = {
    sm: "text-[10px] px-2 py-0.5 rounded-lg",
    md: "text-[11px] px-2.5 py-1.5 rounded-xl",
    lg: "text-sm px-3 py-2 rounded-xl",
  };

  return (
    <span
      className={`font-black tracking-wide inline-block text-white shadow-md ${sizes[size]} ${className}`}
      style={{ background: bgColors[info.type] ?? bgColors.percent }}
    >
      {info.shortLabel}
    </span>
  );
}
