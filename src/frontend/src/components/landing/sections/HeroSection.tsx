import { ArrowRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import Section from '../Section';
import ResponsiveContainer from '../ResponsiveContainer';
import SnowDotsBackground from '../hero/SnowDotsBackground';
import RingTimer from '../hero/RingTimer';
import { downloadAPK } from '../download';
import { LANDING_CONFIG } from '../landingConfig';
import { LANDING_COPY } from '../landingCopy';
import { useInstallCount } from '@/hooks/useInstallCount';

export default function HeroSection() {
  const { increment } = useInstallCount();
  const [startOrbitAnimation, setStartOrbitAnimation] = useState(false);

  // Delay orbit animation start by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartOrbitAnimation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadClick = () => {
    // Open the APK link first (synchronous, reliable)
    downloadAPK();
    // Then increment the counter (async, non-blocking)
    increment();
  };

  const handleSecondaryCTA = () => {
    const { secondaryCTA } = LANDING_CONFIG.hero;
    if (secondaryCTA.action === 'scroll' && secondaryCTA.scrollTarget) {
      const element = document.getElementById(secondaryCTA.scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Solid black background - no terminal/glitch effects */}
      <div className="absolute inset-0 w-full h-full bg-black" />
      
      {/* Snow dots overlay - subtle falling animation */}
      <SnowDotsBackground />

      <ResponsiveContainer className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 py-20">
          {/* Wordmark */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter wordmark-glow">
            KARM
          </h1>

          {/* Ring Timer - positioned above tagline */}
          <div className="py-4">
            <RingTimer 
              size={280}
              progress01={0.25}
              animate={startOrbitAnimation}
              className="mx-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light tracking-wide">
            Stop thinking. Start executing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleDownloadClick}
              className="premium-cta px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 justify-center"
            >
              <Download className="w-5 h-5" />
              Download KARM
            </button>

            <button
              onClick={handleSecondaryCTA}
              className="glass-panel px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 justify-center text-white/90 hover:text-white hover:bg-white/5 transition-all"
            >
              {LANDING_COPY.hero.secondaryCTA}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ResponsiveContainer>
    </Section>
  );
}
