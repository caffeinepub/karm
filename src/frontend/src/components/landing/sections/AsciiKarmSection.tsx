import AsciiText from '../three/AsciiText';

export default function AsciiKarmSection() {
  return (
    <section 
      className="relative w-full overflow-hidden ascii-karm-section" 
      style={{ 
        height: '60vh', 
        minHeight: '400px',
        backgroundColor: '#000000'
      }}
    >
      <AsciiText
        text="KARM"
        enableWaves={false}
        asciiFontSize={7}
        textFontSize={200}
        textColor="#fdf9f3"
        planeBaseHeight={8}
      />
    </section>
  );
}
