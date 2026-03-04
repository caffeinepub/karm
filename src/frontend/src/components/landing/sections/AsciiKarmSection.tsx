import AsciiText from "../three/AsciiText";

export default function AsciiKarmSection() {
  return (
    <section
      className="relative w-full overflow-hidden ascii-karm-section"
      style={{
        height: "60vh",
        minHeight: "400px",
        backgroundColor: "rgba(3, 5, 20, 0.95)",
      }}
    >
      <AsciiText
        text="KARM"
        enableWaves={false}
        asciiFontSize={7}
        textFontSize={200}
        textColor="#96c8ff"
        planeBaseHeight={8}
      />
    </section>
  );
}
