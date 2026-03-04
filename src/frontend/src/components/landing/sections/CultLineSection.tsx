import Section from "../Section";
import { LANDING_COPY, SECTION_IDS } from "../landingCopy";

export default function CultLineSection() {
  return (
    <Section id={SECTION_IDS.cultLine}>
      <div className="max-w-4xl mx-auto text-center space-y-8 px-6">
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight"
          style={{
            color: "rgba(220, 235, 255, 0.9)",
            textShadow: "0 0 50px rgba(100,150,255,0.2)",
          }}
        >
          {LANDING_COPY.cultLine.main}
        </h2>
        <p
          className="text-sm md:text-base font-light tracking-wide"
          style={{ color: "rgba(150, 195, 255, 0.45)" }}
        >
          {LANDING_COPY.cultLine.sub}
        </p>
      </div>
    </Section>
  );
}
