import HeroSection from './sections/HeroSection';
import PsychologicalHitSection from './sections/PsychologicalHitSection';
import WhatItDoesSection from './sections/WhatItDoesSection';
import CultLineSection from './sections/CultLineSection';
import SocialProofSection from './sections/SocialProofSection';
import FinalCTASection from './sections/FinalCTASection';
import CursorGlow from './effects/CursorGlow';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <CursorGlow />
      <HeroSection />
      <PsychologicalHitSection />
      <WhatItDoesSection />
      <CultLineSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  );
}
