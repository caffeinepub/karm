import { ArrowRight, Download } from 'lucide-react';
import Section from '../Section';
import ResponsiveContainer from '../ResponsiveContainer';
import HeroBackground from '../hero/HeroBackground';
import { downloadAPK } from '../download';
import { LANDING_CONFIG } from '../landingConfig';

export default function HeroSection() {
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
    <Section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />

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
              onClick={downloadAPK}
              className="group px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-white/90 transition-all duration-300 flex items-center gap-2 premium-cta"
            >
              <Download className="h-5 w-5" />
              Download KARM
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleSecondaryCTA}
              className="px-8 py-4 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </ResponsiveContainer>
    </Section>
  );
}
