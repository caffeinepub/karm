import { useEffect, useState, RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement | null>, intensity = 0.1) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height + window.innerHeight);
      const parallaxOffset = scrollProgress * window.innerHeight * intensity;
      
      setOffset(parallaxOffset);
    };

    // Throttle scroll events
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, intensity]);

  return offset;
}
