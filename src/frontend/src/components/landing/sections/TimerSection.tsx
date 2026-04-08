import { useCallback, useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const FOCUS_LINES = [
  "HOW BAD DO YOU WANT IT?",
  "IT'S NOT LATE. YOU'RE STILL ON TIME.",
  "Start now or shut up forever.",
  "Your future is dying while you're 'thinking'.",
  "You're not tired. You're addicted to comfort.",
  "Stop acting busy. You're avoiding pain.",
  "You don't need a plan. You need a spine.",
  "If you can scroll, you can work.",
  "Nobody cares about your potential. Show results.",
  "Every delay is self-betrayal.",
  "You're not stuck. You're choosing easy.",
  "Start. Because no one is saving you.",
  "You want a different life? Earn it.",
  "Discipline isn't a feeling. It's an order.",
  "The longer you wait, the weaker you become.",
  "Your competition isn't sleeping. You are.",
  "You can suffer now or suffer forever. Pick one.",
  "You're one session away from respect.",
  "Your excuses sound cute. Your results look disgusting.",
  "Start now. Or stay average.",
  "You don't get confidence by thinking — you get it by doing.",
  "You're not procrastinating. You're sabotaging your own life.",
  "Nobody remembers intentions. They remember outcomes.",
  "This is the moment where men are made.",
  "You can't be a legend with a soft routine.",
  "If it matters, you move. If you don't move, it didn't matter.",
  "Stop asking 'how'. Do the first 5 minutes.",
  "This is your life. Not a rehearsal.",
  "Your comfort zone is your cage.",
  "Start the timer and stop being a victim.",
  "Do it tired. Do it scared. Just do it.",
  "If you don't start now, you deserve the life you're living.",
];

const COMPLETE_LINES = [
  "Good. You didn't flinch.",
  "You earned your respect back.",
  "This is what discipline looks like.",
  "You did what most people avoid.",
  "Not motivation. Execution.",
  "You kept your word to yourself.",
  "That's how you build a life.",
  "One session closer to power.",
  "You're becoming dangerous.",
  "You showed up. Again.",
];

const ENCRYPT_CHARS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const MIN_MINUTES = 1;
const MAX_MINUTES = 999;
const STROKE = 10;
const ORBIT_MS = 1000; // one full rotation per second
const ENCRYPT_MS = 2000; // scramble duration
const CLEAR_MS = 3500; // hold time
const QUOTE_CYCLE_MS = ENCRYPT_MS + CLEAR_MS; // 5500ms per cycle

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function scramble(text: string) {
  return text
    .split("")
    .map((c) => {
      if (c === " ") return " ";
      if (c === "'" || c === "\u2019" || c === "\u201C" || c === '"') return c;
      return ENCRYPT_CHARS[Math.floor(Math.random() * ENCRYPT_CHARS.length)];
    })
    .join("");
}

// ─── Ring SVG ─────────────────────────────────────────────────────────────────

interface RingTimerProps {
  size: number;
  progress01: number;
  orbitAngleDeg: number;
}

function RingSVG({ size, progress01, orbitAngleDeg }: RingTimerProps) {
  const r = size / 2 - STROKE * 1.2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - clamp(progress01, 0, 1));

  // Orbit ball position
  const angleRad = ((orbitAngleDeg - 90) * Math.PI) / 180;
  const ballX = cx + r * Math.cos(angleRad);
  const ballY = cy + r * Math.sin(angleRad);

  return (
    <svg
      width={size}
      height={size}
      style={{ display: "block" }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Outer thin ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="rgba(100,150,255,0.10)"
        strokeWidth={1}
        fill="rgba(0,0,0,0.25)"
      />
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="rgba(100,150,255,0.06)"
        strokeWidth={STROKE}
        fill="transparent"
      />
      {/* Progress arc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="rgba(100,180,255,0.33)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: `${cx}px ${cy}px`,
        }}
      />
      {/* Inner fill */}
      <circle
        cx={cx}
        cy={cy}
        r={r - STROKE * 1.35}
        fill="rgba(0,0,0,0.94)"
        stroke="rgba(100,150,255,0.05)"
        strokeWidth={1}
      />
      {/* Orbit ball */}
      <circle cx={ballX} cy={ballY} r={5} fill="rgba(150,200,255,0.95)" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Phase = "select" | "running" | "complete";

export default function TimerSection() {
  // Timer state
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedMin, setSelectedMin] = useState(15);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Ring size — responsive
  const [ringSize, setRingSize] = useState(300);
  useEffect(() => {
    const update = () => setRingSize(window.innerWidth < 640 ? 260 : 300);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Orbit animation via rAF
  const orbitAngleRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [orbitAngleDeg, setOrbitAngleDeg] = useState(0);

  const orbitRunning = phase === "select" || (phase === "running" && !isPaused);

  useEffect(() => {
    if (!orbitRunning) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const tick = (ts: number) => {
      if (lastTimeRef.current !== null) {
        const delta = ts - lastTimeRef.current;
        orbitAngleRef.current =
          (orbitAngleRef.current + (360 / ORBIT_MS) * delta) % 360;
        setOrbitAngleDeg(orbitAngleRef.current);
      }
      lastTimeRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [orbitRunning]);

  // Focus line cycling with encrypt effect
  const [focusIndex, setFocusIndex] = useState(0);
  const [encrypting, setEncrypting] = useState(false);
  const [encryptedText, setEncryptedText] = useState("");

  useEffect(() => {
    if (phase !== "running" || isPaused) return;

    const cycleFocus = setInterval(() => {
      setEncrypting(true);
      const encryptInterval = setInterval(() => {
        setEncryptedText(scramble(FOCUS_LINES[focusIndex]));
      }, 45);

      setTimeout(() => {
        clearInterval(encryptInterval);
        setFocusIndex((p) => (p + 1) % FOCUS_LINES.length);
        setEncrypting(false);
      }, ENCRYPT_MS);
    }, QUOTE_CYCLE_MS);

    return () => clearInterval(cycleFocus);
  }, [phase, isPaused, focusIndex]);

  // Elapsed timer
  const targetSeconds = selectedMin * 60;

  const handleComplete = useCallback(() => {
    setPhase("complete");
  }, []);

  useEffect(() => {
    if (phase !== "running" || isPaused) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= targetSeconds) {
          clearInterval(interval);
          handleComplete();
          return targetSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, isPaused, targetSeconds, handleComplete]);

  // Complete screen cycling quote
  const [completeIndex, setCompleteIndex] = useState(0);
  useEffect(() => {
    if (phase !== "complete") return;
    const interval = setInterval(() => {
      setCompleteIndex((p) => (p + 1) % COMPLETE_LINES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [phase]);

  // Progress for the arc
  const progress01 =
    phase === "select"
      ? clamp(selectedMin / MAX_MINUTES, 0.05, 1)
      : phase === "running"
        ? clamp(elapsed / targetSeconds, 0, 1)
        : 1;

  // Actions
  const changeTime = (dir: 1 | -1) => {
    if (phase !== "select") return;
    setSelectedMin((p) => clamp(p + dir * 5, MIN_MINUTES, MAX_MINUTES));
  };

  const onEnter = () => {
    setElapsed(0);
    setIsPaused(false);
    setFocusIndex(0);
    setEncrypting(false);
    setEncryptedText("");
    setPhase("running");
  };

  const onPauseToggle = () => setIsPaused((p) => !p);

  const onGiveUp = () => {
    setPhase("select");
    setElapsed(0);
    setIsPaused(false);
    setEncrypting(false);
    orbitAngleRef.current = 0;
    setOrbitAngleDeg(0);
  };

  const onRestart = () => {
    setPhase("select");
    setElapsed(0);
    setIsPaused(false);
    setCompleteIndex(0);
    orbitAngleRef.current = 0;
    setOrbitAngleDeg(0);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      id="timer-section"
      data-ocid="timer.section"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #030514 0%, #0A1020 50%, #141B2B 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 60px",
        position: "relative",
      }}
    >
      {/* Section label */}
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.35em",
          color: "rgba(150,200,255,0.35)",
          marginBottom: "40px",
          textTransform: "uppercase",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        Focus Session
      </p>

      {/* Ring + center text */}
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RingSVG
          size={ringSize}
          progress01={progress01}
          orbitAngleDeg={orbitAngleDeg}
        />

        {/* Center text overlay */}
        <div
          style={{
            position: "absolute",
            width: ringSize,
            height: ringSize,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {phase === "select" && (
            <>
              <span
                style={{
                  fontSize: "clamp(32px, 5vw, 46px)",
                  letterSpacing: "0.12em",
                  color: "rgba(220,235,255,0.94)",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textShadow: "0 0 20px rgba(100,150,255,0.4)",
                  lineHeight: 1,
                }}
              >
                {pad2(selectedMin)}:00
              </span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  color: "rgba(180,210,255,0.34)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                Select Time
              </span>
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => changeTime(-1)}
                  style={{
                    width: "48px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(20,30,50,0.7)",
                    border: "1px solid rgba(100,150,255,0.15)",
                    color: "rgba(220,235,255,0.8)",
                    fontSize: "20px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => changeTime(1)}
                  style={{
                    width: "48px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(20,30,50,0.7)",
                    border: "1px solid rgba(100,150,255,0.15)",
                    color: "rgba(220,235,255,0.8)",
                    fontSize: "20px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            </>
          )}

          {phase === "running" && (
            <>
              <span
                style={{
                  fontSize: "clamp(32px, 5vw, 46px)",
                  letterSpacing: "0.12em",
                  color: "rgba(220,235,255,0.94)",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textShadow: "0 0 20px rgba(100,150,255,0.4)",
                  lineHeight: 1,
                }}
              >
                {formatMMSS(elapsed)}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  color: "rgba(180,210,255,0.34)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                {isPaused ? "Paused" : "In Session"}
              </span>
            </>
          )}

          {phase === "complete" && (
            <>
              <span
                style={{
                  fontSize: "clamp(32px, 5vw, 46px)",
                  letterSpacing: "0.12em",
                  color: "rgba(220,235,255,0.94)",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  textShadow: "0 0 20px rgba(100,150,255,0.4)",
                  lineHeight: 1,
                }}
              >
                {formatMMSS(targetSeconds)}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  color: "rgba(180,210,255,0.34)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                Session Complete
              </span>
            </>
          )}
        </div>
      </div>

      {/* Below-ring content */}
      <div
        style={{
          marginTop: "32px",
          width: "100%",
          maxWidth: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* SELECT phase — Enter button */}
        {phase === "select" && (
          <button
            type="button"
            data-ocid="timer.enter_button"
            onClick={onEnter}
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(30,40,60,0.7)",
              border: "1px solid rgba(100,180,255,0.2)",
              color: "rgba(220,235,255,0.92)",
              fontSize: "14px",
              letterSpacing: "0.35em",
              fontFamily: "monospace",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(100,180,255,0.45)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(40,55,80,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(100,180,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(30,40,60,0.7)";
            }}
          >
            ENTER
          </button>
        )}

        {/* RUNNING phase */}
        {phase === "running" && (
          <>
            {/* Focus Line box */}
            <div style={{ width: "100%" }}>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "rgba(150,200,255,0.3)",
                  marginBottom: "8px",
                  textAlign: "center",
                  fontFamily: "monospace",
                }}
              >
                FOCUS LINE
              </p>
              <div
                style={{
                  width: "100%",
                  minHeight: "90px",
                  borderRadius: "16px",
                  background: "rgba(10,15,25,0.7)",
                  border: "1px solid rgba(100,150,255,0.15)",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {encrypting ? (
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: "rgba(180,220,255,0.6)",
                      fontSize: "13px",
                      letterSpacing: "0.12em",
                      textAlign: "center",
                      lineHeight: 1.55,
                      display: "block",
                    }}
                  >
                    {encryptedText}
                  </span>
                ) : (
                  <span
                    style={{
                      fontFamily: "monospace",
                      color: "rgba(220,235,255,0.86)",
                      fontSize: "14px",
                      letterSpacing: "0.08em",
                      textAlign: "center",
                      lineHeight: 1.55,
                      display: "block",
                    }}
                  >
                    "{FOCUS_LINES[focusIndex]}"
                  </span>
                )}
              </div>
            </div>

            {/* Pause / Resume */}
            <button
              type="button"
              data-ocid="timer.pause_toggle"
              onClick={onPauseToggle}
              style={{
                width: "60%",
                height: "54px",
                borderRadius: "16px",
                background: "rgba(25,35,50,0.6)",
                border: "1px solid rgba(100,180,255,0.14)",
                color: "rgba(220,235,255,0.9)",
                fontSize: "13px",
                letterSpacing: "0.35em",
                fontFamily: "monospace",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(100,180,255,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(100,180,255,0.14)";
              }}
            >
              {isPaused ? "RESUME" : "PAUSE"}
            </button>

            {/* Give Up */}
            <button
              type="button"
              data-ocid="timer.give_up_button"
              onClick={onGiveUp}
              style={{
                padding: "8px 24px",
                borderRadius: "12px",
                background: "rgba(80,40,40,0.15)",
                border: "1px solid rgba(255,100,100,0.2)",
                color: "rgba(255,140,140,0.8)",
                fontSize: "11px",
                letterSpacing: "0.3em",
                fontFamily: "monospace",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,100,100,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,100,100,0.2)";
              }}
            >
              GIVE UP
            </button>
          </>
        )}

        {/* COMPLETE phase */}
        {phase === "complete" && (
          <>
            {/* Cycling motivational line */}
            <div
              style={{
                width: "100%",
                minHeight: "80px",
                borderRadius: "16px",
                background: "rgba(10,15,25,0.7)",
                border: "1px solid rgba(100,150,255,0.15)",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "rgba(150,200,255,0.35)",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                MANTRA
              </p>
              <p
                style={{
                  fontFamily: "monospace",
                  color: "rgba(220,235,255,0.85)",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                  textAlign: "center",
                  lineHeight: 1.55,
                  transition: "opacity 0.5s",
                }}
              >
                "{COMPLETE_LINES[completeIndex]}"
              </p>
            </div>

            {/* Restart button */}
            <button
              type="button"
              onClick={onRestart}
              style={{
                width: "100%",
                height: "54px",
                borderRadius: "16px",
                background: "rgba(30,40,60,0.7)",
                border: "1px solid rgba(100,180,255,0.25)",
                color: "rgba(220,235,255,0.92)",
                fontSize: "13px",
                letterSpacing: "0.35em",
                fontFamily: "monospace",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(100,180,255,0.5)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(40,55,80,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(100,180,255,0.25)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(30,40,60,0.7)";
              }}
            >
              GO AGAIN
            </button>
          </>
        )}
      </div>

      {/* Subtle bottom label */}
      <p
        style={{
          marginTop: "48px",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: "rgba(150,200,255,0.18)",
          fontFamily: "monospace",
          textAlign: "center",
        }}
      >
        No notifications. No distractions. Just you.
      </p>
    </section>
  );
}
