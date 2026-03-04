import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export default function GlassPanel({
  children,
  className = "",
  strong = false,
}: GlassPanelProps) {
  return (
    <div
      className={`${strong ? "galaxy-glass-strong" : "galaxy-glass"} ${className}`}
    >
      {children}
    </div>
  );
}
