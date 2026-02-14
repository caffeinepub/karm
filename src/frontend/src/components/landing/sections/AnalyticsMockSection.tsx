import { useState, useEffect, useRef } from 'react';
import Section from '../Section';
import ResponsiveContainer from '../ResponsiveContainer';
import SnowDotsBackground from '../hero/SnowDotsBackground';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  delay: number;
}

function StatCard({ title, value, subtitle, delay }: StatCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative w-full h-56 perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-out transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden glass-panel-strong rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="w-10 h-10 mb-3 opacity-90">
            <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/60" />
            </div>
          </div>
          <p className="text-[10px] tracking-[0.3em] text-white/40 font-medium">KARM</p>
          <p className="text-[9px] tracking-[0.25em] text-white/25 font-light mt-1">ANALYTICS</p>
        </div>

        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel-strong rounded-2xl p-4 flex flex-col justify-between border border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-black/25 w-fit">
            <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
            <span className="text-[9px] tracking-[0.25em] text-white/60 font-medium">{title}</span>
          </div>

          <div className="text-center">
            <p className="text-4xl tracking-wider text-white/95 font-light mb-1">{value}</p>
            {subtitle && (
              <p className="text-[9px] tracking-[0.2em] text-white/50 font-light">{subtitle}</p>
            )}
          </div>

          <div className="h-px w-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsMockSection() {
  const [isDeckExpanded, setIsDeckExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsDeckExpanded(!isDeckExpanded);
  };

  // Fake stats as specified
  const stats = {
    level: 23,
    karm: 23 * 3600, // 82800
    habits: 4,
    challenges: 24,
  };

  return (
    <Section id="analytics" style={{ position: 'relative', overflow: 'hidden' }}>
      <div ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-20">
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
          <SnowDotsBackground />
        </div>

        {/* Subtle vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />

        <ResponsiveContainer>
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 px-4">
              <h2 className="text-sm tracking-[0.3em] text-white/90 font-medium">ANALYTICS</h2>
              <p className="text-xs tracking-[0.2em] text-white/40 font-light">KARM</p>
            </div>

            {/* Main content area */}
            <div className="relative flex flex-col items-center justify-center min-h-[500px]">
              {/* Blur overlay when expanded */}
              {isDeckExpanded && (
                <div className="absolute inset-0 backdrop-blur-sm bg-black/20 rounded-3xl transition-opacity duration-300" />
              )}

              {/* Cards grid - shown when expanded */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  isDeckExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-2 gap-6 max-w-md w-full px-4">
                  <StatCard title="HABITS" value={`${stats.habits}`} subtitle="ACTIVE" delay={600} />
                  <StatCard title="LEVEL" value={`${stats.level}`} delay={700} />
                  <StatCard title="CHALLENGES" value={`${stats.challenges}`} subtitle="COMPLETED" delay={800} />
                  <StatCard title="TIME" value={`${Math.floor(stats.karm / 60)}`} subtitle="MINUTES" delay={900} />
                </div>
              </div>

              {/* Deck - center piece */}
              <div
                className={`relative transition-all duration-500 ${
                  isDeckExpanded ? 'opacity-20 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-opacity duration-300 ${
                      isDeckExpanded ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      filter: 'blur(20px)',
                      transform: 'scale(1.1)',
                    }}
                  />

                  {/* Deck card */}
                  <button
                    onClick={handleToggle}
                    className="relative glass-panel-strong rounded-3xl p-8 w-80 h-44 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-100"
                  >
                    <div className="w-9 h-9 mb-3 opacity-95">
                      <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/70" />
                      </div>
                    </div>
                    <h3 className="text-lg tracking-[0.4em] text-white/85 font-medium mb-2">STATS</h3>
                    <p className="text-[11px] tracking-[0.3em] text-white/25 font-light mb-4">ANALYTICS DECK</p>

                    <div className="flex gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-white/60" />
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Karm points display */}
            <div className="text-center mt-12 mb-8">
              <p className="text-xs tracking-[0.35em] text-white/35 font-light mb-3">TOTAL KARM</p>
              <p className="text-5xl tracking-[0.5em] text-white/95 font-light">
                {stats.karm.toLocaleString()} <span className="text-2xl text-white/60">pts</span>
              </p>
            </div>

            {/* Toggle button */}
            <div className="flex justify-center">
              <button
                onClick={handleToggle}
                className="glass-panel rounded-xl px-8 py-4 transition-all duration-300 hover:bg-white/5 active:scale-95"
              >
                <span className="text-xs tracking-[0.4em] text-white/95 font-medium">
                  {isDeckExpanded ? 'HIDE DECK' : 'SHOW YOUR DECK'}
                </span>
              </button>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
