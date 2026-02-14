import { useEffect, useRef, useState } from 'react';

interface SnowDot {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function SnowDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<SnowDot[]>([]);
  const rafRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize dots on resize
      initDots();
    };

    const initDots = () => {
      const dotCount = prefersReducedMotion ? 20 : 50; // Fewer dots if reduced motion
      dotsRef.current = [];
      
      for (let i = 0; i < dotCount; i++) {
        dotsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1, // 1-3px
          speed: prefersReducedMotion ? 0 : Math.random() * 0.3 + 0.1, // Static if reduced motion
          opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity (subtle)
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update dots
      dotsRef.current.forEach((dot) => {
        // Draw dot
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position (only if not reduced motion)
        if (!prefersReducedMotion) {
          dot.y += dot.speed;

          // Reset to top when dot goes off screen
          if (dot.y > canvas.height + dot.size) {
            dot.y = -dot.size;
            dot.x = Math.random() * canvas.width;
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
