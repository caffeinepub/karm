import { ReactNode, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollReveal(sectionRef);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative py-24 md:py-32 lg:py-40 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </section>
  );
}
