/**
 * Subtle radial galaxy glow positioned behind all content.
 * Uses pointer-events: none and sits at z-index 0.
 */
export default function GalaxyGlow() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Primary galaxy core glow - upper center */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(80,120,200,0.055) 0%, rgba(60,90,180,0.025) 40%, transparent 70%)",
        }}
      />
      {/* Secondary glow - lower area */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "30%",
          width: "50vw",
          height: "50vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(60,100,200,0.035) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
