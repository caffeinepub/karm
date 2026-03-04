import { useEffect, useRef, useState } from "react";
import ResponsiveContainer from "../ResponsiveContainer";
import Section from "../Section";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  delay: number;
}

function StatCard({ title, value, subtitle, delay }: StatCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative w-full h-56 perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-out transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl p-4 flex flex-col items-center justify-center"
          style={{
            background: "rgba(10, 15, 28, 0.8)",
            border: "1px solid rgba(100, 150, 255, 0.12)",
          }}
        >
          <div className="w-10 h-10 mb-3 opacity-90">
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: "rgba(100,150,255,0.08)" }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "rgba(150,200,255,0.6)" }}
              />
            </div>
          </div>
          <p
            className="text-[10px] tracking-[0.3em] font-medium"
            style={{ color: "rgba(150,200,255,0.4)" }}
          >
            KARM
          </p>
          <p
            className="text-[9px] tracking-[0.25em] font-light mt-1"
            style={{ color: "rgba(100,150,255,0.3)" }}
          >
            ANALYTICS
          </p>
        </div>

        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 flex flex-col justify-between"
          style={{
            background: "rgba(10, 15, 28, 0.85)",
            border: "1px solid rgba(100, 150, 255, 0.18)",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
            style={{
              border: "1px solid rgba(100,150,255,0.15)",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "rgba(150,200,255,0.8)" }}
            />
            <span
              className="text-[9px] tracking-[0.25em] font-medium"
              style={{ color: "rgba(150,200,255,0.65)" }}
            >
              {title}
            </span>
          </div>

          <div className="text-center">
            <p
              className="text-4xl tracking-wider font-light mb-1"
              style={{
                color: "rgba(220, 235, 255, 0.95)",
                textShadow: "0 0 20px rgba(100,150,255,0.3)",
              }}
            >
              {value}
            </p>
            {subtitle && (
              <p
                className="text-[9px] tracking-[0.2em] font-light"
                style={{ color: "rgba(150,200,255,0.5)" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div
            className="h-px w-full"
            style={{ background: "rgba(100,150,255,0.12)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsMockSection() {
  const [isDeckExpanded, setIsDeckExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsDeckExpanded(!isDeckExpanded);
  };

  const stats = {
    level: 23,
    karm: 23 * 3600,
    habits: 4,
    challenges: 24,
  };

  return (
    <Section
      id="analytics"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center py-20"
      >
        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(3,5,20,0.5) 100%)",
          }}
        />

        <ResponsiveContainer>
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 px-4">
              <h2
                className="text-sm tracking-[0.3em] font-medium"
                style={{ color: "rgba(220, 235, 255, 0.9)" }}
              >
                ANALYTICS
              </h2>
              <p
                className="text-xs tracking-[0.2em] font-light"
                style={{ color: "rgba(100, 150, 255, 0.45)" }}
              >
                KARM
              </p>
            </div>

            {/* Main content area */}
            <div className="relative flex flex-col items-center justify-center min-h-[500px]">
              {isDeckExpanded && (
                <div
                  className="absolute inset-0 backdrop-blur-sm rounded-3xl transition-opacity duration-300"
                  style={{ background: "rgba(3,5,20,0.3)" }}
                />
              )}

              {/* Cards grid */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  isDeckExpanded
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-2 gap-6 max-w-md w-full px-4">
                  <StatCard
                    title="HABITS"
                    value={`${stats.habits}`}
                    subtitle="ACTIVE"
                    delay={600}
                  />
                  <StatCard
                    title="LEVEL"
                    value={`${stats.level}`}
                    delay={700}
                  />
                  <StatCard
                    title="CHALLENGES"
                    value={`${stats.challenges}`}
                    subtitle="COMPLETED"
                    delay={800}
                  />
                  <StatCard
                    title="TIME"
                    value={`${Math.floor(stats.karm / 60)}`}
                    subtitle="MINUTES"
                    delay={900}
                  />
                </div>
              </div>

              {/* Deck center piece */}
              <div
                className={`relative transition-all duration-500 ${
                  isDeckExpanded
                    ? "opacity-20 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-3xl transition-opacity duration-300 ${
                      isDeckExpanded ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      background: "rgba(80,120,200,0.04)",
                      filter: "blur(20px)",
                      transform: "scale(1.1)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleToggle}
                    className="relative rounded-3xl p-8 w-80 h-44 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-100"
                    style={{
                      background: "rgba(10, 15, 28, 0.85)",
                      border: "1px solid rgba(100, 150, 255, 0.18)",
                      boxShadow: "0 0 40px rgba(80,120,200,0.08)",
                    }}
                  >
                    <div className="w-9 h-9 mb-3 opacity-95">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ background: "rgba(100,150,255,0.08)" }}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ background: "rgba(150,200,255,0.7)" }}
                        />
                      </div>
                    </div>
                    <h3
                      className="text-lg tracking-[0.4em] font-medium mb-2"
                      style={{ color: "rgba(220,235,255,0.85)" }}
                    >
                      STATS
                    </h3>
                    <p
                      className="text-[11px] tracking-[0.3em] font-light mb-4"
                      style={{ color: "rgba(100,150,255,0.35)" }}
                    >
                      ANALYTICS DECK
                    </p>

                    <div className="flex gap-2.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "rgba(150,200,255,0.6)" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "rgba(150,200,255,0.4)" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "rgba(150,200,255,0.3)" }}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Karm points display */}
            <div className="text-center mt-12 mb-8">
              <p
                className="text-xs tracking-[0.35em] font-light mb-3"
                style={{ color: "rgba(100,150,255,0.4)" }}
              >
                TOTAL KARM
              </p>
              <p
                className="text-5xl tracking-[0.5em] font-light"
                style={{
                  color: "rgba(220,235,255,0.95)",
                  textShadow: "0 0 30px rgba(100,150,255,0.25)",
                }}
              >
                {stats.karm.toLocaleString()}{" "}
                <span
                  style={{ fontSize: "1.5rem", color: "rgba(150,200,255,0.6)" }}
                >
                  pts
                </span>
              </p>
            </div>

            {/* Toggle button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleToggle}
                className="rounded-xl px-8 py-4 transition-all duration-300 active:scale-95"
                style={{
                  background: "rgba(10,15,28,0.7)",
                  border: "1px solid rgba(100,150,255,0.15)",
                }}
              >
                <span
                  className="text-xs tracking-[0.4em] font-medium"
                  style={{ color: "rgba(220,235,255,0.9)" }}
                >
                  {isDeckExpanded ? "HIDE DECK" : "SHOW YOUR DECK"}
                </span>
              </button>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
