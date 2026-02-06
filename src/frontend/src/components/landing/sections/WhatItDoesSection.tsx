import Section from '../Section';
import ResponsiveContainer from '../ResponsiveContainer';
import { LANDING_COPY } from '../landingCopy';

export default function WhatItDoesSection() {
  const blocks = LANDING_COPY.whatItDoes.blocks;

  return (
    <Section id="what-it-does" className="py-32 bg-black">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Block 1 */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{blocks[0].title}</h3>
              <p className="text-white/50 leading-relaxed">{blocks[0].description}</p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{blocks[1].title}</h3>
              <p className="text-white/50 leading-relaxed">{blocks[1].description}</p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{blocks[2].title}</h3>
              <p className="text-white/50 leading-relaxed">{blocks[2].description}</p>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </Section>
  );
}
