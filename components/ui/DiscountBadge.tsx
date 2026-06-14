import type { DiscountInfo } from "@/lib/discounts";

interface DiscountBadgeProps {
  info: DiscountInfo;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function DiscountBadge({ info, size = "md", className = "" }: DiscountBadgeProps) {
  const sizes = {
    sm: "text-[10px] px-2 py-0.5 rounded-lg",
    md: "text-[11px] px-2.5 py-1.5 rounded-xl",
    lg: "text-sm px-3 py-2 rounded-xl",
  };

  return (
    <span
      className={`glass font-black tracking-wide inline-block ${sizes[size]} ${className}`}
      style={{ color: info.color }}
    >
      {info.shortLabel}
    </span>
  );
}
