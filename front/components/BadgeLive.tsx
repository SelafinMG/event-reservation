"use client";

interface BadgeLiveProps {
  size?: "sm" | "md" | "lg";
}

export default function BadgeLive({ size = "md" }: BadgeLiveProps) {
  const sizes = {
    sm: "px-1.5 py-0.5 text-[9px] gap-1.5",
    md: "px-2 py-1 text-[10px] gap-1.5",
    lg: "px-2.5 py-1 text-xs gap-2",
  };
  const dot = { sm: "w-1.5 h-1.5", md: "w-1.5 h-1.5", lg: "w-2 h-2" };

  return (
    <span
      className={`inline-flex items-center ${sizes[size]} rounded-full font-semibold uppercase tracking-widest`}
      style={{
        background: "rgba(220,55,45,0.18)",
        border: "1px solid rgba(220,55,45,0.35)",
        color: "rgba(255,130,120,0.92)",
        letterSpacing: "0.1em",
      }}
    >
      <span className={`relative flex ${dot[size]}`}>
        <span className={`absolute ${dot[size]} rounded-full bg-red-400 opacity-60 animate-ping`} />
        <span className={`${dot[size]} rounded-full bg-red-400`} />
      </span>
      Live
    </span>
  );
}