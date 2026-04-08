import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import ResponsiveContainer from "../ResponsiveContainer";
import Section from "../Section";
import FloatingComments from "../effects/FloatingComments";
import FocusLine from "../hero/FocusLine";
import RingTimer from "../hero/RingTimer";
import { LANDING_CONFIG } from "../landingConfig";
import { LANDING_COPY } from "../landingCopy";

export default function HeroSection() {
  const [startOrbitAnimation, setStartOrbitAnimation] = useState(false);

  // Delay orbit animation start by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartOrbitAnimation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSecondaryCTA = () => {
    const { secondaryCTA } = LANDING_CONFIG.hero;
    if (secondaryCTA.action === "scroll" && secondaryCTA.scrollTarget) {
      const element = document.getElementById(secondaryCTA.scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "transparent", position: "relative" }}
    >
      {/* Floating comments — absolute, clipped inside hero section */}
      <FloatingComments />

      <ResponsiveContainer className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 py-20">
          {/* Wordmark */}
          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
            style={{
              color: "rgba(220, 235, 255, 0.95)",
              textShadow:
                "0 0 60px rgba(100,150,255,0.35), 0 0 30px rgba(150,200,255,0.2)",
            }}
          >
            KARM
          </h1>

          {/* Ring Timer */}
          <div className="py-4">
            <RingTimer
              size={280}
              progress01={0.25}
              animate={startOrbitAnimation}
              className="mx-auto"
            />
          </div>

          {/* Tagline */}
          <p
            className="text-xl md:text-2xl max-w-2xl font-light tracking-wide"
            style={{ color: "rgba(180, 210, 255, 0.65)" }}
          >
            Stop thinking. Start executing.
          </p>

          {/* Focus Line — large, prominent */}
          <FocusLine />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
            {/* Coming soon text — replaces download button */}
            <span
              style={{
                color: "rgba(150,200,255,0.45)",
                fontSize: "13px",
                letterSpacing: "2.5px",
                fontFamily: "monospace",
                textTransform: "lowercase",
              }}
            >
              coming soon. working in the shadows
            </span>

            <button
              type="button"
              onClick={handleSecondaryCTA}
              className="galaxy-glass px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 justify-center transition-all"
              style={{ color: "rgba(200, 225, 255, 0.85)" }}
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
