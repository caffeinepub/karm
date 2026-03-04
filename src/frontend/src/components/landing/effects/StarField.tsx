import { useMemo } from "react";

interface Star {
  id: string;
  left: string;
  top: string;
  size: number;
  color: string;
}

/**
 * Static star field that covers the full scrollable page height.
 * No per-star CSS animations — purely static for performance.
 */
export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    const count = 180;
    return Array.from({ length: count }).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const isBlue = Math.random() > 0.65;
      const opacity = 0.12 + Math.random() * 0.45;
      const size = 0.8 + Math.random() * 2;
      const color = isBlue
        ? `rgba(150, 200, 255, ${opacity})`
        : `rgba(255, 255, 255, ${opacity})`;
      return {
        id: `star-${i}`,
        left: `${x}%`,
        top: `${y}%`,
        size,
        color,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: star.color,
          }}
        />
      ))}
    </div>
  );
}
