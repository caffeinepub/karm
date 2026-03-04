import ResponsiveContainer from "../ResponsiveContainer";
import Section from "../Section";
import { LANDING_COPY } from "../landingCopy";

export default function WhatItDoesSection() {
  const blocks = LANDING_COPY.whatItDoes.blocks;

  return (
    <Section id="what-it-does" className="py-32">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="flex flex-col items-center text-center space-y-6 rounded-2xl px-6 py-8"
              style={{
                background: "rgba(10, 15, 25, 0.6)",
                border: "1px solid rgba(100, 150, 255, 0.12)",
                boxShadow: "0 0 30px rgba(60, 100, 200, 0.05)",
              }}
            >
              <div className="space-y-3">
                <h3
                  className="text-2xl font-bold"
                  style={{
                    color: "rgba(220, 235, 255, 0.92)",
                    textShadow: "0 0 20px rgba(100,150,255,0.2)",
                  }}
                >
                  {block.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "rgba(160, 195, 255, 0.55)" }}
                >
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>
    </Section>
  );
}
