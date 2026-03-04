import InstallsCounterBar from "./InstallsCounterBar";
import CursorGlow from "./effects/CursorGlow";
import FloatingComments from "./effects/FloatingComments";
import GalaxyGlow from "./effects/GalaxyGlow";
import StarField from "./effects/StarField";
import AnalyticsMockSection from "./sections/AnalyticsMockSection";
import AsciiKarmSection from "./sections/AsciiKarmSection";
import CultLineSection from "./sections/CultLineSection";
import FinalCTASection from "./sections/FinalCTASection";
import HeroSection from "./sections/HeroSection";
import PsychologicalHitSection from "./sections/PsychologicalHitSection";
import SocialProofSection from "./sections/SocialProofSection";
import WhatItDoesSection from "./sections/WhatItDoesSection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden galaxy-page-bg">
      {/* Fixed galaxy background layers — behind everything */}
      <StarField />
      <GalaxyGlow />

      {/* Floating TikTok-style comment bubbles */}
      <FloatingComments />

      {/* Page content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <InstallsCounterBar />
        <CursorGlow />
        <HeroSection />
        <PsychologicalHitSection />
        <WhatItDoesSection />
        <AnalyticsMockSection />
        <AsciiKarmSection />
        <CultLineSection />
        <SocialProofSection />
        <FinalCTASection />
      </div>
    </div>
  );
}
