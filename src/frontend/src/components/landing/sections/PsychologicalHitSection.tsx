import { useEffect, useRef, useState } from 'react';
import { LANDING_COPY, SECTION_IDS } from '../landingCopy';

export default function PsychologicalHitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger line animations sequentially
            const lines = LANDING_COPY.psychologicalHit.lines;
            lines.forEach((_, index) => {
              setTimeout(() => {
                setVisibleLines(index + 1);
              }, index * 800);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={SECTION_IDS.psychologicalHit}
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black px-6"
    >
      <div className="max-w-4xl mx-auto text-center space-y-16">
        {LANDING_COPY.psychologicalHit.lines.map((line, index) => (
          <h2
            key={index}
            className={`text-4xl md:text-6xl lg:text-7xl font-light transition-all duration-1000 ${
              visibleLines > index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {line}
          </h2>
        ))}
      </div>
    </section>
  );
}
