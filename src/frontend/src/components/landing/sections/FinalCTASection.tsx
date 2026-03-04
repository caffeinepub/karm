import { useInstallCount } from "@/hooks/useInstallCount";
import { ArrowRight } from "lucide-react";
import ResponsiveContainer from "../ResponsiveContainer";
import Section from "../Section";
import { downloadAPK } from "../download";

export default function FinalCTASection() {
  const { increment } = useInstallCount();

  const handleEnterKarmClick = () => {
    downloadAPK();
    increment();
  };

  return (
    <Section
      id="final-cta"
      className="min-h-screen flex flex-col items-center justify-center py-20"
      style={{ background: "transparent" }}
    >
      <ResponsiveContainer className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-12 max-w-3xl mx-auto">
          {/* Main CTA headline */}
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            style={{
              color: "rgba(220, 235, 255, 0.92)",
              textShadow: "0 0 60px rgba(100,150,255,0.25)",
            }}
          >
            You already know
            <br />
            what you need to do.
          </h2>

          {/* CTA Button */}
          <button
            type="button"
            onClick={handleEnterKarmClick}
            className="group px-10 py-5 rounded-full font-semibold text-xl flex items-center gap-3 mx-auto galaxy-cta"
          >
            Enter KARM
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </ResponsiveContainer>

      {/* Footer */}
      <footer
        className="w-full py-8"
        style={{ borderTop: "1px solid rgba(100,150,255,0.1)" }}
      >
        <ResponsiveContainer>
          <div
            className="text-center text-sm"
            style={{ color: "rgba(100, 150, 255, 0.4)" }}
          >
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "rgba(150,200,255,0.6)" }}
            >
              caffeine.ai
            </a>
          </div>
        </ResponsiveContainer>
      </footer>
    </Section>
  );
}
