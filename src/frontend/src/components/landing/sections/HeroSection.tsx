import { ArrowRight, Download } from 'lucide-react';
import Section from '../Section';
import ResponsiveContainer from '../ResponsiveContainer';
import FaultyTerminal from '../hero/FaultyTerminal';
import { downloadAPK } from '../download';
import { LANDING_CONFIG } from '../landingConfig';
import { LANDING_COPY } from '../landingCopy';
import { useInstallCount } from '@/hooks/useInstallCount';

export default function HeroSection() {
  const { increment } = useInstallCount();

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
      {/* Dark background layer to prevent white flash */}
      <div className="absolute inset-0 w-full h-full bg-black" />
      
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0 w-full h-full">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#f0a3e6"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.6}
        />
      </div>

      <ResponsiveContainer className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 py-20">
          {/* Wordmark */}
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter wordmark-glow">
            KARM
          </h1>

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
