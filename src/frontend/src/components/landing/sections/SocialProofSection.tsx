import { LANDING_COPY, SECTION_IDS } from '../landingCopy';
import Section from '../Section';

export default function SocialProofSection() {
  return (
    <Section id={SECTION_IDS.socialProof}>
      <div className="max-w-2xl mx-auto text-center space-y-4 px-6">
        {LANDING_COPY.socialProof.lines.map((line, index) => (
          <p key={index} className="text-lg md:text-xl text-white/50 font-light">
            {line}
          </p>
        ))}
      </div>
    </Section>
  );
}
