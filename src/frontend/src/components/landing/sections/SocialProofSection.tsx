import Section from "../Section";
import { LANDING_COPY, SECTION_IDS } from "../landingCopy";

export default function SocialProofSection() {
  return (
    <Section id={SECTION_IDS.socialProof}>
      <div className="max-w-2xl mx-auto text-center space-y-4 px-6">
        {LANDING_COPY.socialProof.lines.map((line) => (
          <p
            key={line}
            className="text-lg md:text-xl font-light"
            style={{ color: "rgba(180, 215, 255, 0.55)" }}
          >
            {line}
          </p>
        ))}
      </div>
    </Section>
  );
}
