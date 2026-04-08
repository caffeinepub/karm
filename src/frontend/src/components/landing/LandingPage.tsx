import InstallsCounterBar from "./InstallsCounterBar";
import CursorGlow from "./effects/CursorGlow";
import GalaxyGlow from "./effects/GalaxyGlow";
import StarField from "./effects/StarField";
import AnalyticsMockSection from "./sections/AnalyticsMockSection";
import AsciiKarmSection from "./sections/AsciiKarmSection";
import CultLineSection from "./sections/CultLineSection";
import FinalCTASection from "./sections/FinalCTASection";
import HeroSection from "./sections/HeroSection";
import SocialProofSection from "./sections/SocialProofSection";
import TimerSection from "./sections/TimerSection";
import WhatItDoesSection from "./sections/WhatItDoesSection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden galaxy-page-bg">
      {/* Fixed galaxy background layers — behind everything */}
      <StarField />
      <GalaxyGlow />

      {/* Page content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <InstallsCounterBar />
        <CursorGlow />
        <HeroSection />
        <TimerSection />
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
