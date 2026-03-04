import { useEffect, useRef, useState } from "react";

const FOCUS_LINES = [
  "How hungry are you for success?",
  "It's not late to start now.",
  "Execution beats intention. Every time.",
  "The clock is running. Are you?",
];

const SCRAMBLE_CHARS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function scramble(text: string): string {
  return text
    .split("")
    .map((c) => {
      if (c === " ") return " ";
      if (c === "'" || c === '"') return c;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

export default function FocusLine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [displayText, setDisplayText] = useState(FOCUS_LINES[0]);
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const mainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const encryptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount; index is tracked inside the recursive closure
  useEffect(() => {
    const run = (index: number) => {
      mainTimerRef.current = setTimeout(() => {
        // Start scramble phase
        setIsEncrypting(true);

        encryptTimerRef.current = setTimeout(() => {
          // End scramble, show next quote
          setIsEncrypting(false);
          const nextIndex = (index + 1) % FOCUS_LINES.length;
          setCurrentIndex(nextIndex);
          setDisplayText(FOCUS_LINES[nextIndex]);
          run(nextIndex);
        }, 1000);
      }, 3500);
    };

    run(currentIndex);

    return () => {
      if (mainTimerRef.current) clearTimeout(mainTimerRef.current);
      if (encryptTimerRef.current) clearTimeout(encryptTimerRef.current);
    };
  }, []);

  // Scramble animation via setInterval
  useEffect(() => {
    if (isEncrypting) {
      scrambleIntervalRef.current = setInterval(() => {
        setDisplayText(scramble(FOCUS_LINES[currentIndex]));
      }, 45);
    } else {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
    }

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
        scrambleIntervalRef.current = null;
      }
    };
  }, [isEncrypting, currentIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div
        className="focus-line-container relative rounded-2xl px-8 py-7 flex flex-col items-center justify-center"
        style={{
          background: "rgba(10, 15, 25, 0.75)",
          border: "1px solid rgba(100, 150, 255, 0.18)",
          boxShadow:
            "0 0 40px rgba(80, 120, 200, 0.08), inset 0 1px 0 rgba(100,150,255,0.08)",
          minHeight: "110px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Corner accents */}
        <span
          className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
          style={{
            borderTop: "1.5px solid rgba(100,150,255,0.35)",
            borderLeft: "1.5px solid rgba(100,150,255,0.35)",
            borderRadius: "2px 0 0 0",
          }}
        />
        <span
          className="absolute top-0 right-0 w-6 h-6 pointer-events-none"
          style={{
            borderTop: "1.5px solid rgba(100,150,255,0.35)",
            borderRight: "1.5px solid rgba(100,150,255,0.35)",
            borderRadius: "0 2px 0 0",
          }}
        />
        <span
          className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none"
          style={{
            borderBottom: "1.5px solid rgba(100,150,255,0.35)",
            borderLeft: "1.5px solid rgba(100,150,255,0.35)",
            borderRadius: "0 0 0 2px",
          }}
        />
        <span
          className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
          style={{
            borderBottom: "1.5px solid rgba(100,150,255,0.35)",
            borderRight: "1.5px solid rgba(100,150,255,0.35)",
            borderRadius: "0 0 2px 0",
          }}
        />

        {/* Label */}
        <p
          className="text-xs tracking-[0.35em] mb-4 font-medium"
          style={{ color: "rgba(150, 200, 255, 0.4)" }}
        >
          FOCUS LINE
        </p>

        {/* Quote text */}
        {isEncrypting ? (
          <p
            className="text-center leading-relaxed"
            style={{
              fontFamily: "SF Mono, Monaco, Inconsolata, Fira Code, monospace",
              fontSize: "1.1rem",
              letterSpacing: "0.12em",
              color: "rgba(180, 220, 255, 0.55)",
              minHeight: "2.5rem",
            }}
          >
            {displayText}
          </p>
        ) : (
          <p
            className="text-center leading-relaxed font-light"
            style={{
              fontSize: "1.15rem",
              letterSpacing: "0.06em",
              color: "rgba(220, 235, 255, 0.88)",
              minHeight: "2.5rem",
              textShadow: "0 0 20px rgba(100,150,255,0.2)",
            }}
          >
            &ldquo;{FOCUS_LINES[currentIndex]}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
