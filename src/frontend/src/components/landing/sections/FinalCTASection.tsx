import { ArrowRight } from 'lucide-react';
import Section from '../Section';
import ResponsiveContainer from '../ResponsiveContainer';
import { downloadAPK } from '../download';
import { useInstallCount } from '@/hooks/useInstallCount';

export default function FinalCTASection() {
  const { increment } = useInstallCount();

  const handleEnterKarmClick = () => {
    // Open the APK link first (synchronous, reliable)
    downloadAPK();
    // Then increment the counter (async, non-blocking)
    increment();
  };

  return (
    <Section id="final-cta" className="min-h-screen flex flex-col items-center justify-center bg-black py-20">
      <ResponsiveContainer className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-12 max-w-3xl mx-auto">
          {/* Main CTA headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            You already know
            <br />
            what you need to do.
          </h2>

          {/* CTA Button */}
          <button
            onClick={handleEnterKarmClick}
            className="group px-10 py-5 bg-white text-black rounded-full font-semibold text-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-3 mx-auto premium-cta"
          >
            Enter KARM
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </ResponsiveContainer>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5">
        <ResponsiveContainer>
          <div className="text-center text-white/40 text-sm">
            © {new Date().getFullYear()}. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline"
            >
              caffeine.ai
            </a>
          </div>
        </ResponsiveContainer>
      </footer>
    </Section>
  );
}
