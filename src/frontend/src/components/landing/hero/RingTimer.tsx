import { useEffect, useRef, useState } from 'react';

interface RingTimerProps {
  size?: number;
  progress01?: number;
  animate?: boolean;
  className?: string;
}

export default function RingTimer({ 
  size = 280, 
  progress01 = 0.25, 
  animate = false,
  className = '' 
}: RingTimerProps) {
  const [orbitAngle, setOrbitAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Orbit animation loop
  useEffect(() => {
    if (!animate || prefersReducedMotion) {
      setOrbitAngle(0);
      return;
    }

    const ORBIT_DURATION_MS = 1000; // 1 second per revolution
    startTimeRef.current = performance.now();

    const animateOrbit = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const angle = (elapsed / ORBIT_DURATION_MS) * 360;
      setOrbitAngle(angle % 360);

      rafRef.current = requestAnimationFrame(animateOrbit);
    };

    rafRef.current = requestAnimationFrame(animateOrbit);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, prefersReducedMotion]);

  const STROKE = 10;
  const r = size / 2 - STROKE * 1.2;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progress01);

  // Calculate orbit ball position
  const angleRad = ((orbitAngle - 90) * Math.PI) / 180;
  const ballX = cx + r * Math.cos(angleRad);
  const ballY = cy + r * Math.sin(angleRad);

  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size}
        aria-label="Focus timer indicator"
        role="img"
      >
        {/* Outer background ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={1}
          fill="rgba(0,0,0,0.25)"
        />

        {/* Background stroke ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
          fill="transparent"
        />

        {/* Progress ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="rgba(255,255,255,0.33)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />

        {/* Inner dark disk */}
        <circle
          cx={cx}
          cy={cy}
          r={r - STROKE * 1.35}
          fill="rgba(0,0,0,0.94)"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
        />

        {/* Orbiting dot */}
        {animate && !prefersReducedMotion && (
          <circle 
            cx={ballX} 
            cy={ballY} 
            r={4.5} 
            fill="rgba(255,255,255,0.95)"
            aria-label="Orbit indicator"
          />
        )}
      </svg>
    </div>
  );
}
