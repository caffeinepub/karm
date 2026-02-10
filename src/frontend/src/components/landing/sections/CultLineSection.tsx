import { LANDING_COPY, SECTION_IDS } from '../landingCopy';
import Section from '../Section';

export default function CultLineSection() {
  return (
    <Section id={SECTION_IDS.cultLine}>
      <div className="max-w-4xl mx-auto text-center space-y-8 px-6">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
          {LANDING_COPY.cultLine.main}
        </h2>
        <p className="text-sm md:text-base text-white/40 font-light tracking-wide">
          {LANDING_COPY.cultLine.sub}
        </p>
      </div>
    </Section>
  );
}
